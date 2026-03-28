#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FORMS_DIR = path.join(ROOT, 'src', 'components', 'forms');
const UPPERCASE_TOKENS = new Set([
  'api', 'css', 'html', 'http', 'https', 'js', 'json', 'otp', 'qr', 'ui', 'url', 'uuid'
]);
const FILLER_TOKENS = new Set([
  'a', 'an', 'the', 'please', 'create', 'generate', 'build', 'make', 'add',
  'new', 'component', 'components', 'scaffold', 'starter', 'for', 'to', 'me'
]);
const IMAGE_FILENAME_FILLER_TOKENS = new Set([
  'attachment', 'capture', 'component', 'crop', 'cropped', 'design', 'example',
  'field', 'image', 'img', 'mockup', 'reference', 'screen', 'screenshot', 'shot',
  'sample', 'ui', 'untitled', 'wireframe'
]);
const GENERATED_STATES = ['default', 'required', 'disabled'];
const OTP_LENGTH = 6;

function titleCase(value) {
  return String(value || '')
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map(function(part) {
      var lower = part.toLowerCase();
      if (UPPERCASE_TOKENS.has(lower)) return lower.toUpperCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

function normalizePrompt(prompt) {
  return String(prompt || '').replace(/\s+/g, ' ').trim();
}

function normalizeIntentText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function uniqueValues(values) {
  const seen = new Set();
  return (values || []).filter(function(value) {
    const normalized = String(value || '').trim();
    const key = normalized.toLowerCase();
    if (!normalized || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map(function(value) {
    return String(value || '').trim();
  });
}

function normalizeList(values) {
  return uniqueValues(Array.isArray(values) ? values : []).map(function(value) {
    return normalizeIntentText(value);
  }).filter(Boolean);
}

function normalizeTextList(values) {
  return uniqueValues(Array.isArray(values) ? values : []);
}

function sanitizeImageReference(imageReference) {
  if (!imageReference || typeof imageReference !== 'object') return null;

  const width = Number(imageReference.width) > 0 ? Math.round(Number(imageReference.width)) : 0;
  const height = Number(imageReference.height) > 0 ? Math.round(Number(imageReference.height)) : 0;
  const aspectRatio = width && height
    ? Number((width / height).toFixed(3))
    : (Number(imageReference.aspectRatio) > 0 ? Number(Number(imageReference.aspectRatio).toFixed(3)) : 0);
  const confidence = String(imageReference.confidence || '').toLowerCase();

  return {
    fileName: String(imageReference.fileName || '').trim(),
    mimeType: String(imageReference.mimeType || '').trim(),
    width: width,
    height: height,
    aspectRatio: aspectRatio,
    inferredType: normalizeIntentText(imageReference.inferredType),
    inferredName: String(imageReference.inferredName || '').trim(),
    layout: String(imageReference.layout || '').trim(),
    confidence: confidence === 'high' || confidence === 'medium' ? confidence : 'low',
    detectedStates: normalizeList(imageReference.detectedStates),
    assumptions: normalizeTextList(imageReference.assumptions),
    ambiguities: normalizeTextList(imageReference.ambiguities)
  };
}

function normalizeScaffoldRequest(requestInput) {
  if (typeof requestInput === 'string' || requestInput == null) {
    return {
      prompt: normalizePrompt(requestInput),
      imageReference: null
    };
  }

  return {
    prompt: normalizePrompt(requestInput.prompt),
    imageReference: sanitizeImageReference(requestInput.imageReference)
  };
}

function stripImageExtension(fileName) {
  return String(fileName || '').replace(/\.[a-z0-9]+$/i, '');
}

function deriveImageFileLabel(fileName) {
  const tokens = normalizeIntentText(stripImageExtension(fileName))
    .split(/\s+/)
    .filter(Boolean)
    .filter(function(token) {
      return !IMAGE_FILENAME_FILLER_TOKENS.has(token) && !/^\d+$/.test(token);
    });

  return tokens.join(' ');
}

function detectPromptScaffoldType(prompt, componentId) {
  const values = [normalizeIntentText(prompt), normalizeIntentText(componentId)];

  function matches(pattern) {
    return values.some(function(value) { return pattern.test(value); });
  }

  if (
    matches(/\botp\b/) ||
    matches(/\bone time password\b/) ||
    matches(/\bone time passcode\b/) ||
    matches(/\bverification code\b/)
  ) {
    return 'otp';
  }

  if (matches(/\brating\b/) || matches(/\bstar rating\b/)) {
    return 'rating';
  }

  return 'generic';
}

function detectImageScaffoldType(imageReference) {
  if (!imageReference) return 'generic';

  const values = [
    normalizeIntentText(imageReference.inferredType),
    normalizeIntentText(imageReference.inferredName),
    normalizeIntentText(imageReference.layout),
    normalizeIntentText(deriveImageFileLabel(imageReference.fileName))
  ];

  function matches(pattern) {
    return values.some(function(value) { return pattern.test(value); });
  }

  if (
    matches(/\botp\b/) ||
    matches(/\bone time password\b/) ||
    matches(/\bone time passcode\b/) ||
    matches(/\bverification code\b/) ||
    matches(/\b6 box\b/) ||
    matches(/\bsix box\b/) ||
    matches(/\b6 digit\b/) ||
    matches(/\bsix digit\b/)
  ) {
    return 'otp';
  }

  if (
    matches(/\brating\b/) ||
    matches(/\bstar\b/) ||
    matches(/\bscore\b/) ||
    matches(/\b5 option\b/) ||
    matches(/\bfive option\b/)
  ) {
    return 'rating';
  }

  return 'generic';
}

function getDefaultComponentLabel(scaffoldType) {
  if (scaffoldType === 'otp') return 'OTP Field';
  if (scaffoldType === 'rating') return 'Rating Field';
  return 'Text Input Field';
}

function getDefaultLayout(scaffoldType) {
  if (scaffoldType === 'otp') return OTP_LENGTH + ' horizontally arranged single-character input boxes';
  if (scaffoldType === 'rating') return '5 horizontally arranged choice controls';
  return 'single form control with standard label, help text, and validation states';
}

function detectPromptStates(prompt) {
  const normalized = normalizeIntentText(prompt);
  const states = [];
  if (!normalized) return states;
  if (/\brequired\b|\bmandatory\b/.test(normalized)) states.push('required');
  if (/\bdisabled\b|\breadonly\b|\bread only\b/.test(normalized)) states.push('disabled');
  if (/\berror\b|\bvalidation\b/.test(normalized)) states.push('error');
  return states;
}

function deriveImageComponentLabel(imageReference, scaffoldType) {
  if (!imageReference) return '';
  const nameHint = String(imageReference.inferredName || '').trim();
  if (nameHint) return nameHint;

  const fileLabel = deriveImageFileLabel(imageReference.fileName);
  if (fileLabel) return fileLabel;

  if (scaffoldType !== 'generic') return getDefaultComponentLabel(scaffoldType);
  if (imageReference.layout) return 'Text Input Field';
  return '';
}

function deriveComponentId(prompt) {
  const normalized = normalizePrompt(prompt).toLowerCase();
  if (!normalized) return '';

  const tokens = normalized
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .filter(function(token) { return !FILLER_TOKENS.has(token); });

  return tokens
    .join('-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isValidComponentId(componentId) {
  return /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(String(componentId || ''));
}

function detectScaffoldType(prompt, componentId, imageReference) {
  const promptType = detectPromptScaffoldType(prompt, componentId);
  if (promptType !== 'generic') return promptType;

  const imageType = detectImageScaffoldType(imageReference);
  if (imageType !== 'generic') return imageType;

  return 'generic';
}

function discoverFormComponents(formsDir) {
  const baseDir = formsDir || FORMS_DIR;
  if (!fs.existsSync(baseDir)) return [];

  return fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(function(entry) { return entry.isDirectory(); })
    .map(function(entry) { return entry.name; })
    .filter(function(componentId) {
      return fs.existsSync(path.join(baseDir, componentId, componentId + '.html'));
    })
    .sort();
}

function getPreviewData(requestInput) {
  const request = normalizeScaffoldRequest(requestInput);
  const normalizedPrompt = request.prompt;
  const imageReference = request.imageReference;

  if (!normalizedPrompt && !imageReference) {
    return {
      ok: false,
      code: 'EMPTY_PROMPT',
      message: 'Enter a prompt or attach an image to preview a new component scaffold.',
      prompt: '',
      imageReference: null,
      componentId: '',
      componentTitle: '',
      scaffoldType: 'generic',
      inferredComponentType: 'generic',
      inferredLayout: '',
      inferenceSource: 'none',
      confidence: 'low',
      detectedStates: [],
      generatedStates: GENERATED_STATES.slice(),
      assumptions: [],
      ambiguities: [],
      folderPath: '',
      files: [],
      exists: false
    };
  }

  const promptComponentId = normalizedPrompt ? deriveComponentId(normalizedPrompt) : '';
  const promptScaffoldType = detectPromptScaffoldType(normalizedPrompt, promptComponentId);
  const imageScaffoldType = detectImageScaffoldType(imageReference);
  const scaffoldType = detectScaffoldType(normalizedPrompt, promptComponentId, imageReference);
  const imageComponentLabel = deriveImageComponentLabel(imageReference, scaffoldType);
  const componentId = promptComponentId || deriveComponentId(imageComponentLabel);
  const componentTitle = titleCase(componentId);
  const detectedStates = uniqueValues(['default'].concat(detectPromptStates(normalizedPrompt), imageReference ? imageReference.detectedStates : []));
  const assumptions = uniqueValues((imageReference ? imageReference.assumptions : []).concat([
    imageReference && !normalizedPrompt ? 'The component name was derived from the image reference.' : '',
    imageReference && promptScaffoldType === 'generic' && imageScaffoldType !== 'generic'
      ? 'The text prompt was generic, so the image reference refined the scaffold type.'
      : '',
    imageReference && detectedStates.length === 1
      ? 'The image did not expose every state clearly, so the starter scaffold keeps the repo-standard default, required, and disabled examples.'
      : ''
  ]));
  const ambiguities = uniqueValues((imageReference ? imageReference.ambiguities : []).concat([
    normalizedPrompt && imageReference && promptScaffoldType !== 'generic' && imageScaffoldType !== 'generic' && promptScaffoldType !== imageScaffoldType
      ? 'The prompt and image suggest different specialized field types. The prompt was treated as the primary intent.'
      : ''
  ]));
  const inferredLayout = imageReference && imageReference.layout ? imageReference.layout : getDefaultLayout(scaffoldType);
  const inferenceSource = normalizedPrompt
    ? (imageReference ? 'prompt+image' : 'prompt')
    : 'image';
  const confidence = imageReference ? imageReference.confidence : 'high';
  const folderPath = componentId ? 'src/components/forms/' + componentId + '/' : '';
  const files = componentId ? [
    folderPath + componentId + '.html',
    folderPath + componentId + '.css',
    folderPath + componentId + '.js'
  ] : [];

  if (!componentId) {
    return {
      ok: false,
      code: 'NEEDS_CLARIFICATION',
      message: 'The image reference is not specific enough to derive a safe component name. Add a short prompt to clarify the intended field.',
      prompt: normalizedPrompt,
      imageReference: imageReference,
      componentId: '',
      componentTitle: '',
      scaffoldType: scaffoldType,
      inferredComponentType: scaffoldType,
      inferredLayout: inferredLayout,
      inferenceSource: inferenceSource,
      confidence: confidence,
      detectedStates: detectedStates,
      generatedStates: GENERATED_STATES.slice(),
      assumptions: assumptions,
      ambiguities: ambiguities,
      folderPath: '',
      files: [],
      exists: false
    };
  }

  if (!isValidComponentId(componentId)) {
    return {
      ok: false,
      code: 'INVALID_COMPONENT_ID',
      message: 'Could not derive a valid kebab-case component name from the supplied prompt or image reference.',
      prompt: normalizedPrompt,
      imageReference: imageReference,
      componentId: componentId,
      componentTitle: componentTitle,
      scaffoldType: scaffoldType,
      inferredComponentType: scaffoldType,
      inferredLayout: inferredLayout,
      inferenceSource: inferenceSource,
      confidence: confidence,
      detectedStates: detectedStates,
      generatedStates: GENERATED_STATES.slice(),
      assumptions: assumptions,
      ambiguities: ambiguities,
      folderPath: folderPath,
      files: files,
      exists: false
    };
  }

  const exists = fs.existsSync(path.join(FORMS_DIR, componentId));
  const readyMessage = imageReference
    ? (normalizedPrompt
      ? 'Ready to create a new component scaffold. The text prompt defines the primary intent and the image reference refines the structure.'
      : 'Ready to create a new component scaffold from the attached image reference.')
    : 'Ready to create a new component scaffold.';

  return {
    ok: !exists,
    code: exists ? 'COMPONENT_EXISTS' : 'READY',
    message: exists
      ? 'A component with this name already exists. Choose a different prompt or refine the image-guided name.'
      : readyMessage,
    prompt: normalizedPrompt,
    imageReference: imageReference,
    componentId: componentId,
    componentTitle: componentTitle,
    scaffoldType: scaffoldType,
    inferredComponentType: scaffoldType,
    inferredLayout: inferredLayout,
    inferenceSource: inferenceSource,
    confidence: confidence,
    detectedStates: detectedStates,
    generatedStates: GENERATED_STATES.slice(),
    assumptions: assumptions,
    ambiguities: ambiguities,
    folderPath: folderPath,
    files: files,
    exists: exists
  };
}

function buildHtml(componentId, componentTitle) {
  const fieldName = componentId.replace(/-/g, '_');
  const placeholder = 'Enter ' + componentTitle;
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>' + componentTitle + ' Component</title>',
    '  <link rel="stylesheet" href="' + componentId + '.css">',
    '</head>',
    '<body>',
    '<form class="form-table label-left">',
    '  <script defer src="' + componentId + '.js"></script>',
    '  <div class="form-group">',
    '    <label for="' + componentId + '-default" class="form-label"><span class="zc-label-text">' + componentTitle + '</span></label>',
    '    <div class="form-field"><div class="form-field"><input type="text" id="' + componentId + '-default" name="' + fieldName + '" class="form-control form-control" placeholder="' + placeholder + '" aria-describedby="' + componentId + '-hint"></div></div>',
    '    <span id="' + componentId + '-hint" class="zc-help-txt zc-help-txt">Starter scaffold generated from the design library.</span>',
    '  </div>',
    '  <div class="form-group">',
    '    <label for="' + componentId + '-required" class="form-label"><span class="zc-label-text">' + componentTitle + '</span><span class="fieldMandate" aria-hidden="true">*</span><span class="zc-sr-only">(required)</span></label>',
    '    <div class="form-field validationError"><div class="form-field"><input type="text" id="' + componentId + '-required" name="' + fieldName + '_required" class="form-control form-control" placeholder="' + placeholder + '" required aria-required="true" aria-invalid="true" aria-describedby="' + componentId + '-required-error"></div></div>',
    '    <div id="' + componentId + '-required-error" class="fieldErrorMsg fieldErrorMsg" role="alert" aria-live="assertive" hidden><i class="zc-field-error-msg-icon zc-li-outline ui-3-alert" aria-hidden="true"></i><span>This field is mandatory. Enter a value.</span></div>',
    '  </div>',
    '  <div class="form-group form-field-disabled">',
    '    <label for="' + componentId + '-disabled" class="form-label"><span class="zc-label-text">' + componentTitle + ' (Disabled)</span></label>',
    '    <div class="form-field"><div class="form-field"><input type="text" id="' + componentId + '-disabled" name="' + fieldName + '_disabled" class="form-control form-control" placeholder="Disabled field" disabled aria-disabled="true"></div></div>',
    '  </div>',
    '</form>',
    '</body>',
    '</html>'
  ].join('\n');
}

function buildBaseCss(extraRules) {
  return [
    '@import url(\'https://fonts.googleapis.com/css2?family=Lato:wght@400;600;700&display=swap\');',
    '',
    ':root {',
    '  --color-primary: var(--primary-color, #5051F9);',
    '  --color-text-primary: var(--primary-text-color, #12132b);',
    '  --color-text-placeholder: #999999;',
    '  --color-border: var(--primary-border-color, #cbcbdc);',
    '  --color-border-focus: var(--primary-color, #5051F9);',
    '  --color-bg-white: #ffffff;',
    '  --color-bg-disabled: #f0f0f4;',
    '  --color-error: #ff0000;',
    '  --font-family: \'Lato\', sans-serif;',
    '  --font-size-base: 14.5px;',
    '  --input-height: 36px;',
    '  --input-border-radius: 8px;',
    '  --field-margin-bottom: 24px;',
    '}',
    '',
    '*, *::before, *::after { box-sizing: border-box; }',
    'body { font-family: var(--font-family); background-color: #f7f6f9; padding: 24px; color: var(--color-text-primary); }',
    '.zc-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }',
    '.form-group, .form-field { margin-bottom: var(--field-margin-bottom); }',
    '.form-group::after, .form-field::after { content: ""; display: table; clear: both; }',
    '.form-group > .form-field { margin-bottom: 0; margin-left: 156px; max-width: 240px; }',
    '.form-label { font-size: var(--font-size-base); font-weight: 400; color: var(--color-text-primary); line-height: var(--input-height); float: left; width: 140px; margin-right: 16px; text-align: right; }',
    '.fieldMandate { color: var(--color-error); margin-left: 2px; }',
    '.form-field { display: block; margin-left: 156px; max-width: 240px; }',
    '.form-group > .form-field > .form-field { margin-left: 0; max-width: none; }',
    '.form-control { width: 100%; height: var(--input-height); padding: 0 12px; font-size: var(--font-size-base); color: var(--color-text-primary); background-color: var(--color-bg-white); border: 1px solid var(--color-border); border-radius: var(--input-border-radius); line-height: 34px; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }',
    '.form-control::placeholder { color: var(--color-text-placeholder); }',
    '.form-control:hover { border-color: var(--color-primary); }',
    '.form-control:focus { border-color: var(--color-border-focus); box-shadow: 0 0 0 0.5px var(--color-primary); }',
    '.form-control:disabled { background-color: var(--color-bg-disabled); color: var(--disable-text-color, #606189); cursor: not-allowed; border-color: var(--color-border); }',
    '.form-control[aria-invalid="true"] { border-color: var(--color-error); box-shadow: 0 0 0 0.5px var(--color-error); }',
    '.zc-help-txt, .zc-help-txt { font-size: 12px; color: var(--tertiary-text-color, #606189); margin-top: 4px; display: block; }',
    '.form-group > .zc-help-txt, .form-group > .zc-help-txt, .form-group > .fieldErrorMsg, .form-group > .fieldErrorMsg { clear: both; padding-left: 156px; box-sizing: border-box; }',
    '.fieldErrorMsg, .fieldErrorMsg { display: flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 12px; color: var(--color-error); line-height: 1.4; }',
    '.fieldErrorMsg[hidden], .fieldErrorMsg[hidden] { display: none; }',
    '.zc-field-error-msg-icon { width: 14px; height: 14px; flex-shrink: 0; stroke: var(--color-error); }',
    '.validationError .form-control, .validationError .form-control { border-color: var(--color-error); box-shadow: 0 0 0 0.5px var(--color-error); }'
  ].concat(extraRules || []).join('\n');
}

function buildCss() {
  return buildBaseCss();
}

function buildJs() {
  return [
    'document.addEventListener(\'DOMContentLoaded\', function() {',
    '  var requiredInputs = document.querySelectorAll(\'.form-control[required]\');',
    '  requiredInputs.forEach(function(input) {',
    '    var errorId = input.getAttribute(\'aria-describedby\');',
    '    var errorEl = errorId ? document.getElementById(errorId) : null;',
    '    var field = input.closest(\'.form-field\');',
    '    input.addEventListener(\'blur\', function() { validateInput(input, errorEl, field); });',
    '    input.addEventListener(\'input\', function() {',
    '      if (input.getAttribute(\'aria-invalid\') === \'true\') validateInput(input, errorEl, field);',
    '    });',
    '  });',
    '  function validateInput(input, errorEl, field) {',
    '    var hasError = !input.value.trim();',
    '    input.toggleAttribute(\'aria-invalid\', hasError);',
    '    if (!hasError) input.removeAttribute(\'aria-invalid\');',
    '    if (errorEl) errorEl.hidden = !hasError;',
    '    if (field) {',
    '      field.classList.toggle(\'validationError\', hasError);',
    '      field.classList.toggle(\'validationError\', hasError);',
    '    }',
    '  }',
    '});'
  ].join('\n');
}

function buildOtpInputRow(componentId, fieldName, variant, options) {
  const inputCount = OTP_LENGTH;
  const labelId = componentId + '-' + variant + '-label';
  const describedBy = options.describedBy || '';
  const namePrefix = fieldName + '_' + variant + '_digit_';
  const inputAttrs = [
    'type="text"',
    'inputmode="numeric"',
    'pattern="[0-9]*"',
    'maxlength="1"',
    'class="form-control form-control zc-otp-input"'
  ];

  if (options.required) {
    inputAttrs.push('required');
    inputAttrs.push('aria-required="true"');
    inputAttrs.push('aria-invalid="true"');
  }

  if (options.disabled) {
    inputAttrs.push('disabled');
    inputAttrs.push('aria-disabled="true"');
  }

  const baseAttrText = inputAttrs.join(' ');
  const lines = [
    '      <div class="zc-otp-inputs" role="group" aria-labelledby="' + labelId + '">'
  ];

  for (let index = 0; index < inputCount; index += 1) {
    const inputId = componentId + '-' + variant + '-' + (index + 1);
    const describedByAttr = describedBy ? ' aria-describedby="' + describedBy + '"' : '';
    const autoComplete = index === 0 && !options.disabled ? ' autocomplete="one-time-code"' : ' autocomplete="off"';
    lines.push(
      '        <input ' + baseAttrText + ' id="' + inputId + '" name="' + namePrefix + (index + 1) + '" data-otp-index="' + index + '" aria-label="' + componentTitleForAria(options.componentTitle, index + 1) + '"' + describedByAttr + autoComplete + '>'
    );
  }

  lines.push('      </div>');
  return lines.join('\n');
}

function componentTitleForAria(componentTitle, index) {
  return componentTitle + ' digit ' + index + ' of ' + OTP_LENGTH;
}

function buildOtpHtml(componentId, componentTitle) {
  const fieldName = componentId.replace(/-/g, '_');
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>' + componentTitle + ' Component</title>',
    '  <link rel="stylesheet" href="' + componentId + '.css">',
    '</head>',
    '<body>',
    '<form class="form-table label-left">',
    '  <script defer src="' + componentId + '.js"></script>',
    '  <div class="form-group zc-otp-component">',
    '    <label for="' + componentId + '-default-1" id="' + componentId + '-default-label" class="form-label"><span class="zc-label-text">' + componentTitle + '</span></label>',
    '    <div class="form-field">',
    '      <div class="form-field">',
           buildOtpInputRow(componentId, fieldName, 'default', {
             componentTitle: componentTitle,
             describedBy: componentId + '-hint'
           }),
    '      </div>',
    '    </div>',
    '    <span id="' + componentId + '-hint" class="zc-help-txt zc-help-txt">Enter the ' + OTP_LENGTH + '-digit verification code.</span>',
    '  </div>',
    '  <div class="form-group zc-otp-component" data-otp-required="true">',
    '    <label for="' + componentId + '-required-1" id="' + componentId + '-required-label" class="form-label"><span class="zc-label-text">' + componentTitle + '</span><span class="fieldMandate" aria-hidden="true">*</span><span class="zc-sr-only">(required)</span></label>',
    '    <div class="form-field validationError">',
    '      <div class="form-field">',
           buildOtpInputRow(componentId, fieldName, 'required', {
             componentTitle: componentTitle,
             describedBy: componentId + '-required-error',
             required: true
           }),
    '      </div>',
    '    </div>',
    '    <div id="' + componentId + '-required-error" class="fieldErrorMsg fieldErrorMsg" role="alert" aria-live="assertive" hidden><i class="zc-field-error-msg-icon zc-li-outline ui-3-alert" aria-hidden="true"></i><span>This field is mandatory. Enter all ' + OTP_LENGTH + ' digits.</span></div>',
    '  </div>',
    '  <div class="form-group form-field-disabled zc-otp-component">',
    '    <label for="' + componentId + '-disabled-1" id="' + componentId + '-disabled-label" class="form-label"><span class="zc-label-text">' + componentTitle + ' (Disabled)</span></label>',
    '    <div class="form-field">',
    '      <div class="form-field">',
           buildOtpInputRow(componentId, fieldName, 'disabled', {
             componentTitle: componentTitle + ' disabled',
             disabled: true
           }),
    '      </div>',
    '    </div>',
    '  </div>',
    '</form>',
    '</body>',
    '</html>'
  ].join('\n');
}

function buildOtpCss() {
  return buildBaseCss([
    '.zc-otp-component > .form-field { max-width: 320px; }',
    '.zc-otp-component .form-field { max-width: 320px; }',
    '.zc-otp-inputs { display: flex; gap: 8px; }',
    '.zc-otp-input { width: 40px; min-width: 40px; padding: 0; text-align: center; font-weight: 700; font-size: 16px; letter-spacing: 0; }',
    '.zc-otp-input::placeholder { color: transparent; }',
    '.validationError .zc-otp-input, .validationError .zc-otp-input { border-color: var(--color-error); box-shadow: 0 0 0 0.5px var(--color-error); }',
    '.form-field-disabled .zc-otp-input { background-color: var(--color-bg-disabled); color: var(--disable-text-color, #606189); cursor: not-allowed; }'
  ]);
}

function buildOtpJs() {
  return [
    'document.addEventListener(\'DOMContentLoaded\', function() {',
    '  var groups = document.querySelectorAll(\'.zc-otp-component\');',
    '  groups.forEach(function(root) {',
    '    var inputs = Array.prototype.slice.call(root.querySelectorAll(\'.zc-otp-input\'));',
    '    var errorEl = root.querySelector(\'.fieldErrorMsg, .fieldErrorMsg\');',
    '    var field = root.querySelector(\'.form-field\');',
    '    var isRequired = root.getAttribute(\'data-otp-required\') === \'true\' || inputs.some(function(input) { return input.required; });',
    '    var isDisabled = inputs.every(function(input) { return input.disabled; });',
    '',
    '    if (!inputs.length || !field) {',
    '      return;',
    '    }',
    '',
    '    function getDigits(value) {',
    '      return String(value || \"\").replace(/[^0-9]/g, \"\");',
    '    }',
    '',
    '    function setInvalidState(hasError, showError) {',
    '      inputs.forEach(function(input) {',
    '        if (hasError) {',
    '          input.setAttribute(\'aria-invalid\', \'true\');',
    '        } else {',
    '          input.removeAttribute(\'aria-invalid\');',
    '        }',
    '      });',
    '      field.classList.toggle(\'validationError\', hasError);',
    '      field.classList.toggle(\'validationError\', hasError);',
    '      if (errorEl) {',
    '        if (!hasError) {',
    '          errorEl.hidden = true;',
    '        } else if (showError !== false) {',
    '          errorEl.hidden = false;',
    '        }',
    '      }',
    '    }',
    '',
    '    function isComplete() {',
    '      return inputs.every(function(input) { return /^[0-9]$/.test(input.value); });',
    '    }',
    '',
    '    function focusIndex(index) {',
    '      if (inputs[index]) {',
    '        inputs[index].focus();',
    '        inputs[index].select();',
    '      }',
    '    }',
    '',
    '    function applyDigits(startIndex, rawDigits) {',
    '      var digits = getDigits(rawDigits);',
    '      var targetIndex = digits.length >= inputs.length ? 0 : startIndex;',
    '      var lastFilled = targetIndex;',
    '',
    '      if (!digits) {',
    '        inputs[startIndex].value = \"\";',
    '        return;',
    '      }',
    '',
    '      for (var index = 0; index < inputs.length; index += 1) {',
    '        if (index >= targetIndex) {',
    '          inputs[index].value = \"\";',
    '        }',
    '      }',
    '',
    '      for (var digitIndex = 0; digitIndex < digits.length && targetIndex + digitIndex < inputs.length; digitIndex += 1) {',
    '        inputs[targetIndex + digitIndex].value = digits.charAt(digitIndex);',
    '        lastFilled = targetIndex + digitIndex;',
    '      }',
    '',
    '      if (isComplete()) {',
    '        focusIndex(inputs.length - 1);',
    '      } else {',
    '        focusIndex(Math.min(lastFilled + 1, inputs.length - 1));',
    '      }',
    '    }',
    '',
    '    function validate(showError) {',
    '      if (!isRequired || isDisabled) {',
    '        setInvalidState(false, false);',
    '        return true;',
    '      }',
    '',
    '      var valid = isComplete();',
    '      setInvalidState(!valid, showError);',
    '      return valid;',
    '    }',
    '',
    '    inputs.forEach(function(input, index) {',
    '      input.addEventListener(\'focus\', function() {',
    '        input.select();',
    '      });',
    '',
    '      input.addEventListener(\'keydown\', function(event) {',
    '        if (input.disabled) return;',
    '',
    '        if (event.key === \'Backspace\') {',
    '          if (input.value) {',
    '            input.value = \"\";',
    '            event.preventDefault();',
    '            if (field.classList.contains(\'validationError\')) {',
    '              validate(true);',
    '            }',
    '            return;',
    '          }',
    '',
    '          if (index > 0) {',
    '            event.preventDefault();',
    '            focusIndex(index - 1);',
    '          }',
    '          return;',
    '        }',
    '',
    '        if (event.key.length === 1 && !/[0-9]/.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {',
    '          event.preventDefault();',
    '        }',
    '      });',
    '',
    '      input.addEventListener(\'input\', function() {',
    '        if (input.disabled) return;',
    '        var digits = getDigits(input.value);',
    '        if (digits.length !== 1 || digits !== input.value) {',
    '          applyDigits(index, digits);',
    '        } else {',
    '          input.value = digits;',
    '          if (digits && index < inputs.length - 1) {',
    '            focusIndex(index + 1);',
    '          }',
    '        }',
    '',
    '        if (field.classList.contains(\'validationError\')) {',
    '          validate(true);',
    '        }',
    '      });',
    '',
    '      input.addEventListener(\'paste\', function(event) {',
    '        if (input.disabled) return;',
    '        var clipboard = event.clipboardData || window.clipboardData;',
    '        var pasted = clipboard ? getDigits(clipboard.getData(\'text\')) : \"\";',
    '        if (!pasted) return;',
    '        event.preventDefault();',
    '        applyDigits(index, pasted);',
    '        validate(field.classList.contains(\'validationError\'));',
    '      });',
    '    });',
    '',
    '    root.addEventListener(\'focusout\', function() {',
    '      setTimeout(function() {',
    '        if (!root.contains(document.activeElement)) {',
    '          validate(true);',
    '        }',
    '      }, 0);',
    '    });',
    '',
    '    if (!isRequired) {',
    '      setInvalidState(false, false);',
    '    }',
    '  });',
    '});'
  ].join('\n');
}

function buildRatingOptions(componentId, fieldName, variant, options) {
  const describedBy = options.describedBy || '';
  const lines = ['        <div class="zc-rating-options">'];

  for (let index = 1; index <= 5; index += 1) {
    const inputId = componentId + '-' + variant + '-' + index;
    const inputAttrs = [
      'type="radio"',
      'id="' + inputId + '"',
      'name="' + fieldName + '_' + variant + '"',
      'value="' + index + '"',
      'class="form-control zc-rating-input"'
    ];

    if (options.required) {
      inputAttrs.push('aria-required="true"');
      inputAttrs.push('aria-invalid="true"');
    }

    if (options.disabled) {
      inputAttrs.push('disabled');
      inputAttrs.push('aria-disabled="true"');
    }

    if (describedBy) {
      inputAttrs.push('aria-describedby="' + describedBy + '"');
    }

    lines.push('          <div class="zc-rating-option">');
    lines.push('            <input ' + inputAttrs.join(' ') + '>');
    lines.push('            <label for="' + inputId + '" class="zc-rating-label" aria-label="' + index + (index === 1 ? ' star' : ' stars') + '"><span aria-hidden="true">★</span><span class="zc-sr-only">' + index + (index === 1 ? ' star' : ' stars') + '</span></label>');
    lines.push('          </div>');
  }

  lines.push('        </div>');
  return lines.join('\n');
}

function buildRatingHtml(componentId, componentTitle) {
  const fieldName = componentId.replace(/-/g, '_');
  return [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '  <title>' + componentTitle + ' Component</title>',
    '  <link rel="stylesheet" href="' + componentId + '.css">',
    '</head>',
    '<body>',
    '<form class="form-table label-left">',
    '  <script defer src="' + componentId + '.js"></script>',
    '  <fieldset class="form-group zc-rating-group" role="radiogroup" aria-labelledby="' + componentId + '-default-label" aria-describedby="' + componentId + '-hint">',
    '    <legend id="' + componentId + '-default-label" class="form-label"><span class="zc-label-text">' + componentTitle + '</span></legend>',
    '    <div class="form-field">',
    '      <div class="form-field">',
           buildRatingOptions(componentId, fieldName, 'default', { describedBy: componentId + '-hint' }),
    '      </div>',
    '    </div>',
    '    <span id="' + componentId + '-hint" class="zc-help-txt zc-help-txt">Select a rating from 1 to 5.</span>',
    '  </fieldset>',
    '  <fieldset class="form-group zc-rating-group" role="radiogroup" aria-labelledby="' + componentId + '-required-label" aria-required="true" aria-describedby="' + componentId + '-required-error">',
    '    <legend id="' + componentId + '-required-label" class="form-label"><span class="zc-label-text">' + componentTitle + '</span><span class="fieldMandate" aria-hidden="true">*</span><span class="zc-sr-only">(required)</span></legend>',
    '    <div class="form-field validationError">',
    '      <div class="form-field">',
           buildRatingOptions(componentId, fieldName, 'required', {
             describedBy: componentId + '-required-error',
             required: true
           }),
    '      </div>',
    '    </div>',
    '    <div id="' + componentId + '-required-error" class="fieldErrorMsg fieldErrorMsg" role="alert" aria-live="assertive" hidden><i class="zc-field-error-msg-icon zc-li-outline ui-3-alert" aria-hidden="true"></i><span>Please select a rating.</span></div>',
    '  </fieldset>',
    '  <fieldset class="form-group form-field-disabled zc-rating-group" role="radiogroup" aria-labelledby="' + componentId + '-disabled-label" disabled>',
    '    <legend id="' + componentId + '-disabled-label" class="form-label"><span class="zc-label-text">' + componentTitle + ' (Disabled)</span></legend>',
    '    <div class="form-field">',
    '      <div class="form-field">',
           buildRatingOptions(componentId, fieldName, 'disabled', { disabled: true }),
    '      </div>',
    '    </div>',
    '  </fieldset>',
    '</form>',
    '</body>',
    '</html>'
  ].join('\n');
}

function buildRatingCss() {
  return buildBaseCss([
    '.zc-rating-group .form-field { max-width: 280px; }',
    '.zc-rating-options { display: inline-flex; gap: 8px; flex-wrap: wrap; padding-top: 2px; }',
    '.zc-rating-option { position: relative; }',
    '.zc-rating-input { position: absolute; inset: 0; opacity: 0; margin: 0; }',
    '.zc-rating-label { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border: 1px solid var(--color-border); border-radius: var(--input-border-radius); background-color: var(--color-bg-white); color: var(--color-text-placeholder); cursor: pointer; font-size: 18px; transition: border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, background-color 0.2s ease; }',
    '.zc-rating-label:hover { border-color: var(--color-primary); color: var(--color-primary); }',
    '.zc-rating-input:focus-visible + .zc-rating-label { outline: 2px solid var(--color-primary); outline-offset: 2px; }',
    '.zc-rating-input:checked + .zc-rating-label { border-color: var(--color-primary); background-color: rgba(80, 81, 249, 0.08); color: var(--color-primary); }',
    '.validationError .zc-rating-label, .validationError .zc-rating-label { border-color: var(--color-error); }',
    '.form-field-disabled .zc-rating-label, .zc-rating-input:disabled + .zc-rating-label { background-color: var(--color-bg-disabled); color: var(--disable-text-color, #606189); cursor: not-allowed; }'
  ]);
}

function buildRatingJs() {
  return [
    'document.addEventListener(\'DOMContentLoaded\', function() {',
    '  var groups = document.querySelectorAll(\'.zc-rating-group\');',
    '  groups.forEach(function(group) {',
    '    var inputs = Array.prototype.slice.call(group.querySelectorAll(\'.zc-rating-input\'));',
    '    var field = group.querySelector(\'.form-field\');',
    '    var errorEl = group.querySelector(\'.fieldErrorMsg, .fieldErrorMsg\');',
    '    var isRequired = group.getAttribute(\'aria-required\') === \'true\';',
    '    var isDisabled = group.hasAttribute(\'disabled\') || inputs.every(function(input) { return input.disabled; });',
    '',
    '    if (!inputs.length || !field) {',
    '      return;',
    '    }',
    '',
    '    function hasSelection() {',
    '      return inputs.some(function(input) { return input.checked; });',
    '    }',
    '',
    '    function setInvalidState(hasError, showError) {',
    '      inputs.forEach(function(input) {',
    '        if (hasError) {',
    '          input.setAttribute(\'aria-invalid\', \'true\');',
    '        } else {',
    '          input.removeAttribute(\'aria-invalid\');',
    '        }',
    '      });',
    '      field.classList.toggle(\'validationError\', hasError);',
    '      field.classList.toggle(\'validationError\', hasError);',
    '      if (errorEl) {',
    '        if (!hasError) {',
    '          errorEl.hidden = true;',
    '        } else if (showError !== false) {',
    '          errorEl.hidden = false;',
    '        }',
    '      }',
    '    }',
    '',
    '    function validate(showError) {',
    '      if (!isRequired || isDisabled) {',
    '        setInvalidState(false, false);',
    '        return true;',
    '      }',
    '      var valid = hasSelection();',
    '      setInvalidState(!valid, showError);',
    '      return valid;',
    '    }',
    '',
    '    inputs.forEach(function(input) {',
    '      input.addEventListener(\'change\', function() {',
    '        validate(true);',
    '      });',
    '    });',
    '',
    '    group.addEventListener(\'focusout\', function() {',
    '      setTimeout(function() {',
    '        if (!group.contains(document.activeElement)) {',
    '          validate(true);',
    '        }',
    '      }, 0);',
    '    });',
    '',
    '    if (!isRequired) {',
    '      setInvalidState(false, false);',
    '    }',
    '  });',
    '});'
  ].join('\n');
}

function getScaffoldBuilders(scaffoldType) {
  if (scaffoldType === 'otp') {
    return {
      buildHtml: buildOtpHtml,
      buildCss: buildOtpCss,
      buildJs: buildOtpJs
    };
  }

  if (scaffoldType === 'rating') {
    return {
      buildHtml: buildRatingHtml,
      buildCss: buildRatingCss,
      buildJs: buildRatingJs
    };
  }

  return {
    buildHtml: buildHtml,
    buildCss: buildCss,
    buildJs: buildJs
  };
}

function createComponentFromRequest(requestInput) {
  const preview = getPreviewData(requestInput);
  if (preview.code !== 'READY') {
    const error = new Error(preview.message);
    error.code = preview.code;
    error.details = preview;
    throw error;
  }

  const dir = path.join(FORMS_DIR, preview.componentId);
  fs.mkdirSync(dir, { recursive: false });

  const htmlPath = path.join(dir, preview.componentId + '.html');
  const cssPath = path.join(dir, preview.componentId + '.css');
  const jsPath = path.join(dir, preview.componentId + '.js');
  const builders = getScaffoldBuilders(preview.scaffoldType);

  fs.writeFileSync(htmlPath, builders.buildHtml(preview.componentId, preview.componentTitle), 'utf8');
  fs.writeFileSync(cssPath, builders.buildCss(preview.componentId, preview.componentTitle), 'utf8');
  fs.writeFileSync(jsPath, builders.buildJs(preview.componentId, preview.componentTitle), 'utf8');

  return preview;
}

function createComponentFromPrompt(prompt) {
  return createComponentFromRequest(prompt);
}

function removeComponentScaffold(componentId) {
  if (!componentId) return;
  const dir = path.join(FORMS_DIR, componentId);
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

module.exports = {
  FORMS_DIR,
  titleCase,
  normalizePrompt,
  detectScaffoldType,
  deriveComponentId,
  isValidComponentId,
  discoverFormComponents,
  getPreviewData,
  createComponentFromRequest,
  createComponentFromPrompt,
  removeComponentScaffold
};