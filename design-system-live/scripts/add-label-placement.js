#!/usr/bin/env node
/**
 * 1. Wraps all component HTML <body> content in <form class="form-table label-left">
 * 2. Updates index.html:
 *    - Adds label placement tabs to each component-section__header
 *    - Wraps form-field elements in <form class="form-table label-left">
 *    - Adds CSS for label-left, label-right, label-top, label-inplace
 *    - Adds JS for tab switching
 */
var fs = require('fs');
var path = require('path');
var FORMS = path.join(__dirname, '..', 'src', 'components', 'forms');

// ═══════════════════════════════════════════════════
// STEP 1: Wrap component HTML files in <form> tag
// ═══════════════════════════════════════════════════
var SKIP_DIRS = ['section-separator', 'form-buttons'];

var dirs = fs.readdirSync(FORMS).filter(function(d) {
  return fs.statSync(path.join(FORMS, d)).isDirectory() && SKIP_DIRS.indexOf(d) === -1;
});

dirs.forEach(function(dir) {
  var htmlFile = path.join(FORMS, dir, dir + '.html');
  if (!fs.existsSync(htmlFile)) return;
  
  var html = fs.readFileSync(htmlFile, 'utf8');
  
  // Skip if already wrapped
  if (html.indexOf('form-table') !== -1) {
    console.log('  · ' + dir + ' (already wrapped)');
    return;
  }
  
  // Find <body> content and wrap it
  html = html.replace(/<body>\n([\s\S]*?)\n<\/body>/, function(match, body) {
    // Indent body content inside form
    return '<body>\n<form class="form-table label-left">\n' + body + '\n</form>\n</body>';
  });
  
  fs.writeFileSync(htmlFile, html, 'utf8');
  console.log('  ✓ ' + dir);
});

// ═══════════════════════════════════════════════════
// STEP 2: Update index.html
// ═══════════════════════════════════════════════════
var indexFile = path.join(__dirname, '..', 'index.html');
var indexHtml = fs.readFileSync(indexFile, 'utf8');

// --- 2a: Add CSS for label placement tabs and form-table styles ---
var placementCSS = `
    /* ===== Label Placement Tabs ===== */
    .label-placement-tabs {
      display: inline-flex;
      align-items: center;
      gap: 0;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      overflow: hidden;
      margin: 0 auto 0 24px;
    }

    .label-placement-tab {
      padding: 5px 14px;
      font-family: var(--font-family);
      font-size: 12px;
      font-weight: 600;
      color: var(--color-text-secondary);
      background-color: var(--color-bg-white);
      border: none;
      border-right: 1px solid var(--color-border);
      cursor: pointer;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .label-placement-tab:last-child {
      border-right: none;
    }

    .label-placement-tab:hover {
      background-color: var(--primary-opacity);
      color: var(--color-primary);
    }

    .label-placement-tab.is-active {
      background-color: var(--color-primary);
      color: #fff;
    }

    /* ===== Form Table – Label-Left (default) ===== */
    .form-table {
      margin: 0;
      padding: 0;
      border: none;
    }

    .form-table.label-left .form-field {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 4px 16px;
    }
    .form-table.label-left .form-label {
      min-width: 140px;
      text-align: right;
      line-height: var(--input-height);
    }
    .form-table.label-left .form-field > .form-hint,
    .form-table.label-left .form-field > .fieldErrorMsg {
      flex: 0 0 100%;
      padding-left: 156px;
      box-sizing: border-box;
    }

    /* ===== Form Table – Label-Right ===== */
    .form-table.label-right .form-field {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 4px 16px;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }
    .form-table.label-right .form-label {
      min-width: 140px;
      text-align: left;
      line-height: var(--input-height);
    }
    .form-table.label-right .form-input-wrapper {
      flex: 0 0 240px;
      max-width: 240px;
    }
    .form-table.label-right .form-field > .form-hint,
    .form-table.label-right .form-field > .fieldErrorMsg {
      flex: 0 0 100%;
      padding-left: 0;
      box-sizing: border-box;
    }

    /* ===== Form Table – Label-Top ===== */
    .form-table.label-top .form-field {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }
    .form-table.label-top fieldset.form-field {
      align-items: flex-start;
    }
    .form-table.label-top .form-label {
      min-width: unset;
      text-align: left;
      line-height: 1.4;
      font-weight: 600;
    }
    .form-table.label-top .form-input-wrapper {
      width: 100%;
      max-width: 340px;
    }
    .form-table.label-top .form-field > .form-hint,
    .form-table.label-top .form-field > .fieldErrorMsg {
      flex: unset;
      padding-left: 0;
    }

    /* ===== Form Table – Label-Inplace (floating / inside input) ===== */
    .form-table.label-inplace .form-field {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      position: relative;
    }
    .form-table.label-inplace .form-label {
      position: absolute;
      min-width: unset;
      text-align: left;
      font-size: 12px;
      font-weight: 400;
      color: var(--tertiary-text-color);
      top: 0;
      left: 12px;
      line-height: 1;
      z-index: 1;
      pointer-events: none;
      background: var(--color-bg-white);
      padding: 0 4px;
      transform: translateY(-50%);
    }
    .form-table.label-inplace .form-input-wrapper {
      width: 100%;
      max-width: 340px;
    }
    .form-table.label-inplace .form-input,
    .form-table.label-inplace .form-textarea,
    .form-table.label-inplace .form-select {
      padding-top: 6px;
    }
    .form-table.label-inplace .form-field > .form-hint,
    .form-table.label-inplace .form-field > .fieldErrorMsg {
      flex: unset;
      padding-left: 0;
    }
    .form-table.label-inplace .form-label-spacer {
      display: none;
    }
`;

// Insert placement CSS before the "Show Code Panel" section
indexHtml = indexHtml.replace(
  '    /* ===== Show Code Panel ===== */',
  placementCSS + '\n    /* ===== Show Code Panel ===== */'
);

// --- 2b: Add label placement tabs to each component-section__header ---
var PLACEMENT_TABS_HTML = 
  '<div class="label-placement-tabs" role="tablist" aria-label="Label placement">' +
    '<button type="button" class="label-placement-tab is-active" data-placement="label-left">Left</button>' +
    '<button type="button" class="label-placement-tab" data-placement="label-right">Right</button>' +
    '<button type="button" class="label-placement-tab" data-placement="label-top">Top</button>' +
    '<button type="button" class="label-placement-tab" data-placement="label-inplace">Inline</button>' +
  '</div>';

// For each component header, add tabs after the title and wrap form-fields in form.form-table
// Pattern: <div class="component-section__header">
//            <h2 ...>Title</h2>
//            <button class="show-code-btn" ...>
//          </div>
// Replace to insert tabs between title and button
indexHtml = indexHtml.replace(
  /(<h2 class="component-section__title">[^<]*<\/h2>\s*)\n(\s*<button type="button" class="show-code-btn")/g,
  '$1\n        ' + PLACEMENT_TABS_HTML + '\n$2'
);

// --- 2c: Wrap form-field elements in <form class="form-table label-left"> ---
// Each section structure is:
//   </div> (end of header)
//   <blank line>
//   <div class="form-field ..."> ... multiple form-fields ... 
//   <textarea class="code-source-html" ...>
// We add <form class="form-table label-left"> after header closes and </form> before code-source

// Match the closing </div> of component-section__header followed by form-fields
indexHtml = indexHtml.replace(
  /(<\/div>\s*<!-- end header -->\s*)(\s*<(?:div|fieldset) class="form-field)/g,
  '$1\n      <form class="form-table label-left">\n$2'
);

// Since the header div doesn't have an end comment, let's be more precise:
// After each component-section__header's close, before first form-field
// The pattern is: show-code-btn></div>\n\n      <div class="form-field
// But now we've added placement tabs, so the pattern changed.
// Let me just look for the </div> (header end) + whitespace + first form-field

// Actually, let me try wrapping by looking for each section's form-fields block.
// Each component section between header </div> and <textarea class="code-source-html"> 
// needs to be wrapped in a form.

// Let me use a function-based replace for precision:
indexHtml = indexHtml.replace(
  /(class="show-code-btn"[^>]*>[\s\S]*?<\/button>\s*<\/div>)\s*\n(\s*<(?:div|fieldset) class="form-field)/g,
  '$1\n\n      <form class="form-table label-left">\n$2'
);

// Close the form before each code-source-html textarea
indexHtml = indexHtml.replace(
  /(\s*)(    <textarea class="code-source-html")/g,
  '$1      </form>\n$1$2'
);

// Also handle sections that might not have code-source (like section-separator, form-buttons)
// Those don't have form-fields so they won't be affected.

// --- 2d: Add JS for label placement tab switching ---
var placementJS = `
      // ===== Label Placement Tabs =====
      (function() {
        document.addEventListener('click', function(e) {
          var tab = e.target.closest('.label-placement-tab');
          if (!tab) return;

          var section = tab.closest('.component-section');
          if (!section) return;

          var tabGroup = tab.closest('.label-placement-tabs');
          tabGroup.querySelectorAll('.label-placement-tab').forEach(function(t) {
            t.classList.remove('is-active');
          });
          tab.classList.add('is-active');

          var placement = tab.getAttribute('data-placement');
          var formEl = section.querySelector('.form-table');
          if (formEl) {
            formEl.className = 'form-table ' + placement;
          }
        });
      })();
`;

// Insert before the Show Code Button Logic
indexHtml = indexHtml.replace(
  "      // ===== Show Code Button Logic =====",
  placementJS + "\n      // ===== Show Code Button Logic ====="
);

// Write back
fs.writeFileSync(indexFile, indexHtml, 'utf8');
console.log('\n✓ index.html updated with label placement tabs, form wrappers, CSS, and JS');
console.log('  Lines: ' + indexHtml.split('\n').length);
