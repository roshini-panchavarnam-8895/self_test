#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');
const componentScaffold = require('./component-scaffold');

const ROOT = path.join(__dirname, '..');
const BUILD_SCRIPT = path.join(__dirname, 'build-design-library.js');
const OUTPUT_FILE = path.join(ROOT, 'dist', 'design-library.html');

function fail(message) {
  console.error('Verification failed:', message);
  process.exit(1);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function runBuild() {
  console.log('==> Building design-library.html');
  const result = spawnSync(process.execPath, [BUILD_SCRIPT], {
    cwd: ROOT,
    encoding: 'utf8'
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  if (result.status !== 0) {
    fail('Build exited with code ' + result.status);
  }
}

function readOutputHtml() {
  if (!fs.existsSync(OUTPUT_FILE)) {
    fail('Missing build output: ' + OUTPUT_FILE);
  }
  return fs.readFileSync(OUTPUT_FILE, 'utf8');
}

function countMatches(value, pattern) {
  const matches = String(value || '').match(pattern);
  return matches ? matches.length : 0;
}

function extractMainScript(html) {
  const matches = Array.from(html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi));
  if (!matches.length) {
    fail('No <script> blocks found in design-library.html');
  }
  return matches[matches.length - 1][1];
}

function checkScriptSyntax(script) {
  try {
    new vm.Script(script, { filename: 'design-library-main.js' });
  } catch (error) {
    fail('Generated main script has invalid syntax.\n' + error.stack);
  }
}

function findDuplicateIds(html) {
  const counts = new Map();
  const ids = html.matchAll(/\bid=["']([^"']+)["']/gi);

  for (const match of ids) {
    const id = match[1];
    counts.set(id, (counts.get(id) || 0) + 1);
  }

  return Array.from(counts.entries())
    .filter(function(entry) { return entry[1] > 1; })
    .sort(function(a, b) {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    });
}

function checkDuplicateIds(html) {
  const duplicates = findDuplicateIds(html);
  if (duplicates.length) {
    const summary = duplicates
      .slice(0, 10)
      .map(function(entry) { return entry[0] + ' (' + entry[1] + ')'; })
      .join(', ');
    fail('Duplicate IDs found: ' + summary);
  }
}

function checkScaffoldWorkflow() {
  console.log('==> Verifying scaffold workflow');

  const exampleId = componentScaffold.deriveComponentId('Create a new QR code field component');
  assert(exampleId === 'qr-code-field', 'Expected sample prompt to derive qr-code-field, got ' + exampleId);
  assert(componentScaffold.titleCase(exampleId) === 'QR Code Field', 'Expected qr-code-field title to preserve QR acronym');
  assert(componentScaffold.titleCase('api-client-url') === 'API Client URL', 'Expected API and URL acronyms to remain uppercase');
  assert(componentScaffold.titleCase('otp-field') === 'OTP Field', 'Expected OTP acronym to remain uppercase');
  assert(componentScaffold.detectScaffoldType('Create a new OTP field component', 'otp-field') === 'otp', 'Expected OTP prompt to resolve to otp scaffold type');
  assert(componentScaffold.detectScaffoldType('Create a new one-time password component', 'one-time-password') === 'otp', 'Expected one-time password prompt to resolve to otp scaffold type');
  assert(componentScaffold.detectScaffoldType('Create a new rating field component', 'rating-field') === 'rating', 'Expected rating prompt to resolve to rating scaffold type');
  assert(componentScaffold.detectScaffoldType('Create a new verification note field component', 'verification-note-field') === 'generic', 'Expected unrelated prompt to use generic scaffold type');

  const qrPreview = componentScaffold.getPreviewData('Create a new QR code field component');
  assert(qrPreview.componentTitle === 'QR Code Field', 'Expected sample preview title to be QR Code Field, got ' + qrPreview.componentTitle);

  const committedOtpPath = path.join(componentScaffold.FORMS_DIR, 'otp-field', 'otp-field.html');
  assert(fs.existsSync(committedOtpPath), 'Expected committed forms/otp-field/otp-field.html output to exist');
  const committedOtpHtml = fs.readFileSync(committedOtpPath, 'utf8');
  assert(countMatches(committedOtpHtml, /class="zc-(?:form|field)-input zc-form-control zc-otp-input"/g) === 18, 'Expected committed otp-field HTML to render 18 OTP boxes across default/required/disabled states');
  assert(countMatches(committedOtpHtml, /autocomplete="one-time-code"/g) === 2, 'Expected committed otp-field HTML to enable one-time-code autocomplete on active OTP groups');
  assert(committedOtpHtml.includes('Enter all 6 digits.'), 'Expected committed otp-field HTML to include six-digit required-state messaging');

  const otpPreview = componentScaffold.getPreviewData('Create a new OTP field component');
  assert(otpPreview.scaffoldType === 'otp', 'Expected OTP preview to expose otp scaffold type');
  assert(otpPreview.code === 'COMPONENT_EXISTS', 'Expected committed otp-field preview to report COMPONENT_EXISTS');

  const ratingPreview = componentScaffold.getPreviewData('Create a new rating field component');
  assert(ratingPreview.scaffoldType === 'rating', 'Expected rating preview to expose rating scaffold type');

  const emptyPreview = componentScaffold.getPreviewData('   ');
  assert(emptyPreview.code === 'EMPTY_PROMPT', 'Expected empty prompt preview to fail with EMPTY_PROMPT');

  const imageOnlyOtpPreview = componentScaffold.getPreviewData({
    imageReference: {
      fileName: 'otp-reference.png',
      width: 960,
      height: 220,
      inferredType: 'otp',
      inferredName: 'OTP Field',
      layout: '6 horizontally arranged single-character input boxes',
      confidence: 'high',
      detectedStates: ['default'],
      assumptions: ['The image shows a repeated six-box verification pattern.'],
      ambiguities: []
    }
  });
  assert(imageOnlyOtpPreview.code === 'COMPONENT_EXISTS', 'Expected image-only OTP preview to resolve to the committed otp-field scaffold');
  assert(imageOnlyOtpPreview.scaffoldType === 'otp', 'Expected image-only OTP preview to infer otp scaffold type');
  assert(imageOnlyOtpPreview.inferenceSource === 'image', 'Expected image-only OTP preview to report image inference source');
  assert(imageOnlyOtpPreview.detectedStates.includes('default'), 'Expected image-only OTP preview to expose detected states');

  const promptAndImagePreview = componentScaffold.getPreviewData({
    prompt: 'Create a new customer feedback field component',
    imageReference: {
      fileName: 'feedback-stars.png',
      width: 920,
      height: 240,
      inferredType: 'rating',
      inferredName: 'Rating Field',
      layout: '5 horizontally arranged choice controls',
      confidence: 'medium',
      detectedStates: ['default', 'required'],
      assumptions: [],
      ambiguities: []
    }
  });
  assert(promptAndImagePreview.code === 'READY', 'Expected prompt+image preview to remain READY');
  assert(promptAndImagePreview.scaffoldType === 'rating', 'Expected image reference to refine a generic prompt toward rating scaffold');
  assert(promptAndImagePreview.inferenceSource === 'prompt+image', 'Expected prompt+image preview to report merged inference source');

  const conflictPreview = componentScaffold.getPreviewData({
    prompt: 'Create a new OTP verification field component',
    imageReference: {
      fileName: 'rating-stars.png',
      width: 920,
      height: 240,
      inferredType: 'rating',
      inferredName: 'Rating Field',
      layout: '5 horizontally arranged choice controls',
      confidence: 'medium',
      detectedStates: ['default'],
      assumptions: [],
      ambiguities: []
    }
  });
  assert(conflictPreview.scaffoldType === 'otp', 'Expected prompt intent to win when prompt and image conflict');
  assert(conflictPreview.ambiguities.some(function(item) { return /primary intent/i.test(item); }), 'Expected conflicting prompt+image preview to explain prompt priority');

  const ambiguousImagePreview = componentScaffold.getPreviewData({
    imageReference: {
      fileName: 'screenshot-1234.png',
      width: 800,
      height: 400,
      inferredType: 'generic',
      inferredName: '',
      layout: '',
      confidence: 'low',
      detectedStates: [],
      assumptions: [],
      ambiguities: ['The image is too ambiguous to identify a specialized field safely.']
    }
  });
  assert(ambiguousImagePreview.code === 'NEEDS_CLARIFICATION', 'Expected ambiguous image-only preview to request clarification');

  const genericPrompt = 'Create a new verification smoke field component ' + process.pid;
  const otpPrompt = 'Create a new OTP smoke field component ' + process.pid;
  const ratingPrompt = 'Create a new rating smoke field component ' + process.pid;
  const genericId = componentScaffold.deriveComponentId(genericPrompt);
  const otpId = componentScaffold.deriveComponentId(otpPrompt);
  const ratingId = componentScaffold.deriveComponentId(ratingPrompt);
  const createdIds = [];

  try {
    const genericPreview = componentScaffold.getPreviewData(genericPrompt);
    assert(genericPreview.code === 'READY', 'Expected generic scaffold preview to be READY, got ' + genericPreview.code);
    assert(genericPreview.scaffoldType === 'generic', 'Expected generic prompt to keep generic scaffold type');
    assert(genericPreview.files.length === 3, 'Expected generic scaffold preview to list 3 files');

    const otpSmokePreview = componentScaffold.getPreviewData(otpPrompt);
    assert(otpSmokePreview.code === 'READY', 'Expected OTP scaffold preview to be READY, got ' + otpSmokePreview.code);
    assert(otpSmokePreview.scaffoldType === 'otp', 'Expected OTP smoke prompt to use otp scaffold type');

    const ratingSmokePreview = componentScaffold.getPreviewData(ratingPrompt);
    assert(ratingSmokePreview.code === 'READY', 'Expected rating scaffold preview to be READY, got ' + ratingSmokePreview.code);
    assert(ratingSmokePreview.scaffoldType === 'rating', 'Expected rating smoke prompt to use rating scaffold type');

    [genericPrompt, otpPrompt, ratingPrompt].forEach(function(prompt) {
      const created = componentScaffold.createComponentFromPrompt(prompt);
      createdIds.push(created.componentId);

      const tempDir = path.join(componentScaffold.FORMS_DIR, created.componentId);
      assert(fs.existsSync(tempDir), 'Expected scaffold directory to be created: ' + tempDir);
      assert(fs.existsSync(path.join(tempDir, created.componentId + '.html')), 'Expected generated HTML scaffold file');
      assert(fs.existsSync(path.join(tempDir, created.componentId + '.css')), 'Expected generated CSS scaffold file');
      assert(fs.existsSync(path.join(tempDir, created.componentId + '.js')), 'Expected generated JS scaffold file');
    });

    const genericHtml = fs.readFileSync(path.join(componentScaffold.FORMS_DIR, genericId, genericId + '.html'), 'utf8');
    assert(genericHtml.includes('type="text"'), 'Expected generic scaffold HTML to retain a text input starter');

    const otpHtml = fs.readFileSync(path.join(componentScaffold.FORMS_DIR, otpId, otpId + '.html'), 'utf8');
    const otpJs = fs.readFileSync(path.join(componentScaffold.FORMS_DIR, otpId, otpId + '.js'), 'utf8');
    assert(countMatches(otpHtml, /class="zc-(?:form|field)-input zc-form-control zc-otp-input"/g) === 18, 'Expected OTP scaffold HTML to render 18 OTP boxes across all states');
    assert(countMatches(otpHtml, /data-otp-index="/g) === 18, 'Expected OTP scaffold HTML to tag each OTP box with an index');
    assert(countMatches(otpHtml, /autocomplete="one-time-code"/g) === 2, 'Expected OTP scaffold HTML to expose one-time-code autocomplete on active OTP variants');
    assert(otpHtml.includes('Enter the 6-digit verification code.'), 'Expected OTP scaffold hint text to mention the six-digit verification code');
    assert(otpHtml.includes('Enter all 6 digits.'), 'Expected OTP scaffold required text to mention all six digits');
    assert(otpJs.includes("var groups = document.querySelectorAll('.zc-otp-component');"), 'Expected OTP scaffold JS to initialize OTP component groups');
    assert(otpJs.includes('applyDigits'), 'Expected OTP scaffold JS to distribute pasted digits across inputs');

    const ratingHtml = fs.readFileSync(path.join(componentScaffold.FORMS_DIR, ratingId, ratingId + '.html'), 'utf8');
    const ratingJs = fs.readFileSync(path.join(componentScaffold.FORMS_DIR, ratingId, ratingId + '.js'), 'utf8');
    assert(countMatches(ratingHtml, /class="zc-form-control zc-rating-input"/g) === 15, 'Expected rating scaffold HTML to render 15 rating radio inputs across all states');
    assert(ratingHtml.includes('Please select a rating.'), 'Expected rating scaffold HTML to include rating-specific required messaging');
    assert(!ratingHtml.includes('placeholder="Enter Rating'), 'Expected rating scaffold HTML to avoid falling back to the generic text-input placeholder');
    assert(ratingJs.includes("var groups = document.querySelectorAll('.zc-rating-group');"), 'Expected rating scaffold JS to initialize rating groups');

    const genericCollisionPreview = componentScaffold.getPreviewData(genericPrompt);
    assert(genericCollisionPreview.code === 'COMPONENT_EXISTS', 'Expected generic collision preview after creation');

    let collisionThrown = false;
    try {
      componentScaffold.createComponentFromPrompt(genericPrompt);
    } catch (error) {
      collisionThrown = !!(error && error.details && error.details.code === 'COMPONENT_EXISTS');
    }
    assert(collisionThrown, 'Expected createComponentFromPrompt to reject collisions');

    runBuild();
    const html = readOutputHtml();
    checkScriptSyntax(extractMainScript(html));
    checkDuplicateIds(html);

    assert(html.includes('view-form-fields-otp-field'), 'Generated design library is missing the committed otp-field detail view');
    assert(html.includes('data-detail="form-fields/otp-field"'), 'Generated design library is missing the committed otp-field card');
    assert(html.includes('view-form-fields-' + genericId), 'Generated design library is missing the generic smoke component detail view');
    assert(html.includes('data-detail="form-fields/' + genericId + '"'), 'Generated design library is missing the generic smoke component card');
    assert(html.includes('view-form-fields-' + otpId), 'Generated design library is missing the OTP smoke component detail view');
    assert(html.includes('data-detail="form-fields/' + otpId + '"'), 'Generated design library is missing the OTP smoke component card');
    assert(html.includes('view-form-fields-' + ratingId), 'Generated design library is missing the rating smoke component detail view');
    assert(html.includes('data-detail="form-fields/' + ratingId + '"'), 'Generated design library is missing the rating smoke component card');
    assert(html.includes('Attach image reference'), 'Generated design library is missing the image reference input copy');
    assert(html.includes('createComponentImageInput'), 'Generated design library is missing the image reference input control');
  } finally {
    createdIds.forEach(function(componentId) {
      componentScaffold.removeComponentScaffold(componentId);
    });
    runBuild();
  }
}

function main() {
  try {
    runBuild();

    console.log('==> Validating generated HTML');
    const html = readOutputHtml();
    const mainScript = extractMainScript(html);

    checkScriptSyntax(mainScript);
    console.log('PASS: generated main script syntax is valid');

    checkDuplicateIds(html);
    console.log('PASS: no duplicate IDs found in design-library.html');

    checkScaffoldWorkflow();
    console.log('PASS: scaffold workflow smoke test passed');

    console.log('Verification passed');
  } catch (error) {
    fail(error && error.message ? error.message : String(error));
  }
}

main();