#!/usr/bin/env node
/**
 * Ensures every component CSS file has the standard rules for:
 * - .sr-only
 * - .form-required
 * - .form-hint
 * - .fieldErrorMsg / .fieldErrorMsg[hidden] / .fieldErrorMsg-icon
 * - .form-field-disabled / :disabled styles
 * - --color-bg-disabled & --color-error in :root
 */
var fs = require('fs');
var path = require('path');
var FORMS = path.join(__dirname, '..', 'src', 'components', 'forms');

// Components that need CSS updates (skip text-input which is already complete, section-separator & form-buttons which aren't fields)
var SKIP = ['text-input', 'section-separator', 'form-buttons'];

var SR_ONLY = `
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}`;

var FORM_REQUIRED = `
.form-required {
  color: var(--color-error);
  margin-left: 2px;
}`;

var FORM_HINT = `
.form-hint {
  font-size: 12px;
  color: var(--tertiary-text-color, #606189);
  margin-top: 4px;
  display: block;
}`;

var FIELD_ERROR = `
.fieldErrorMsg {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  font-size: 12px;
  color: var(--color-error);
  line-height: 1.4;
}

.fieldErrorMsg[hidden] {
  display: none;
}

.fieldErrorMsg-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  stroke: var(--color-error);
}`;

var FORM_FIELD_DISABLED = `
.form-field-disabled .form-label {
  color: var(--disable-text-color, #606189);
}`;

// For form-input-based components
var INPUT_DISABLED = `
.form-input:disabled,
.form-textarea:disabled,
.form-select:disabled {
  background-color: var(--color-bg-disabled, #f0f0f4);
  color: var(--disable-text-color, #606189);
  cursor: not-allowed;
  border-color: var(--color-border);
}`;

// For checkbox/radio disabled
var CHECKBOX_DISABLED = `
.checkbox-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.checkbox-input:disabled + .checkbox-label {
  color: var(--disable-text-color, #606189);
  cursor: not-allowed;
}`;

var RADIO_DISABLED = `
.radio-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.radio-input:disabled + .radio-label {
  color: var(--disable-text-color, #606189);
  cursor: not-allowed;
}`;

var DECISION_DISABLED = `
.decision-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.decision-input:disabled + .decision-label {
  color: var(--disable-text-color, #606189);
  cursor: not-allowed;
}`;

var FILE_UPLOAD_DISABLED = `
.file-upload-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}`;

var SIGNATURE_DISABLED = `
.signature-field-disabled {
  opacity: 0.6;
  pointer-events: none;
}`;

var RICH_TEXT_DISABLED = `
.rich-text-disabled {
  opacity: 0.6;
  pointer-events: none;
}`;

var SELECT2_DISABLED = `
.select2-container-disabled .select2-choice {
  background-color: var(--color-bg-disabled, #f0f0f4);
  color: var(--disable-text-color, #606189);
  cursor: not-allowed;
  border-color: var(--color-border, #cbcbdc);
}`;

// Map of components to their specific disabled styles
var disabledExtraMap = {
  'checkbox': CHECKBOX_DISABLED,
  'radio-button': RADIO_DISABLED,
  'decision-box': DECISION_DISABLED,
  'file-upload': FILE_UPLOAD_DISABLED,
  'image-upload': FILE_UPLOAD_DISABLED.replace('file-upload', 'image-upload'),
  'audio-upload': FILE_UPLOAD_DISABLED,
  'video-upload': FILE_UPLOAD_DISABLED,
  'signature-field': SIGNATURE_DISABLED,
  'rich-text': RICH_TEXT_DISABLED,
  'dropdown': SELECT2_DISABLED,
  'multi-select': SELECT2_DISABLED
};

var dirs = fs.readdirSync(FORMS).filter(function(d) {
  return fs.statSync(path.join(FORMS, d)).isDirectory() && SKIP.indexOf(d) === -1;
});

dirs.forEach(function(dir) {
  var cssFile = path.join(FORMS, dir, dir + '.css');
  if (!fs.existsSync(cssFile)) return;
  
  var css = fs.readFileSync(cssFile, 'utf8');
  var additions = [];
  
  // Check :root for missing variables
  if (css.indexOf('--color-bg-disabled') === -1) {
    css = css.replace(':root {', ':root {\n  --color-bg-disabled: #f0f0f4;');
  }
  if (css.indexOf('--color-error') === -1) {
    css = css.replace(':root {', ':root {\n  --color-error: #ff0000;');
  }
  
  // Add missing standard rules
  if (css.indexOf('.sr-only') === -1) {
    additions.push(SR_ONLY);
  }
  if (css.indexOf('.form-required') === -1) {
    additions.push(FORM_REQUIRED);
  }
  if (css.indexOf('.form-hint') === -1) {
    additions.push(FORM_HINT);
  }
  if (css.indexOf('.fieldErrorMsg') === -1) {
    additions.push(FIELD_ERROR);
  }
  if (css.indexOf('.form-field-disabled') === -1) {
    additions.push(FORM_FIELD_DISABLED);
  }
  
  // Add input disabled styles for input-based components  
  var simpleInputComponents = ['textarea', 'number-input', 'decimal-input', 'currency-input', 
    'percent-input', 'email-input', 'url-input', 'date-input', 'datetime-input', 'time-input',
    'name-field', 'address-field'];
  if (simpleInputComponents.indexOf(dir) !== -1 && css.indexOf(':disabled') === -1) {
    additions.push(INPUT_DISABLED);
  }
  
  // Add component-specific disabled styles
  if (disabledExtraMap[dir] && css.indexOf(dir === 'dropdown' || dir === 'multi-select' ? 'select2-container-disabled' : (dir + '-disabled').replace(/^(file|image|audio|video)-upload$/, '$&')) === -1) {
    // Simpler check: just check if the specific disabled class is missing
    var disabledCss = disabledExtraMap[dir];
    var checkFor = '';
    if (dir === 'checkbox') checkFor = 'checkbox-input:disabled';
    else if (dir === 'radio-button') checkFor = 'radio-input:disabled';
    else if (dir === 'decision-box') checkFor = 'decision-input:disabled';
    else if (dir === 'dropdown' || dir === 'multi-select') checkFor = 'select2-container-disabled';
    else if (dir === 'rich-text') checkFor = 'rich-text-disabled';
    else if (dir === 'signature-field') checkFor = 'signature-field-disabled';
    else checkFor = 'upload-disabled';
    
    if (css.indexOf(checkFor) === -1) {
      additions.push(disabledCss);
    }
  }
  
  // Also ensure phone-input has its disabled styles
  if (dir === 'phone-input') {
    if (css.indexOf('form-field-disabled') === -1) {
      additions.push('\n.form-field-disabled .selected-flag {\n  pointer-events: none;\n  opacity: 0.6;\n}\n\n.form-field-disabled .form-control {\n  background-color: var(--color-bg-disabled, #f0f0f4);\n  color: var(--disable-text-color, #606189);\n  cursor: not-allowed;\n}');
    }
  }

  if (additions.length > 0) {
    css = css.trimEnd() + '\n' + additions.join('\n') + '\n';
    fs.writeFileSync(cssFile, css, 'utf8');
    console.log('  ✓ ' + dir + ' (added ' + additions.length + ' rule blocks)');
  } else {
    console.log('  · ' + dir + ' (no changes needed)');
  }
});

console.log('\nDone! CSS updates complete.');
