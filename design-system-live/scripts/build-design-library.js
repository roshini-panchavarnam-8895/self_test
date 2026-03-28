#!/usr/bin/env node
/**
 * Build script: generates design-library.html
 * Multi-view SPA matching the Creator Design System visual style.
 * Views: Home, Design Tokens, Form Fields (grid + detail), Reports (grid + detail), All Components
 */
const fs = require('fs');
const path = require('path');
const componentScaffold = require('./component-scaffold');

const ROOT = path.join(__dirname, '..');
const FORMS_DIR = path.join(ROOT, 'src', 'components', 'forms');
const REPORTS_DIR = path.join(ROOT, 'src', 'layouts');

/* ── Helpers ── */
function read(f) { return fs.readFileSync(f, 'utf8'); }
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function writeIfChanged(filePath, content) {
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8') === content) return;
  fs.writeFileSync(filePath, content, 'utf8');
}

function getComponentStyleFiles(dir, compId) {
  return {
    scssFile: path.join(dir, compId + '.scss'),
    cssFile: path.join(dir, compId + '.css')
  };
}

function compileComponentScss(scssFile, cssFile) {
  var sass = require('sass');
  var result = sass.compile(scssFile, {
    style: 'expanded',
    loadPaths: [ROOT, FORMS_DIR]
  });
  var css = String(result.css || '').trim() + '\n';
  writeIfChanged(cssFile, css);
  return css;
}

function resolveComponentCss(dir, compId) {
  var cssFile = getComponentStyleFiles(dir, compId).cssFile;
  return fs.existsSync(cssFile) ? read(cssFile) : '';
}

/* Pretty-print HTML with proper indentation */
function formatHtml(html) {
  // Normalize: collapse whitespace, ensure tags are separated
  var s = html.replace(/>\s+</g,'><').trim();
  var out = '', indent = 0, pad = '';
  // Void (self-closing) elements
  var voidTags = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
  // Split around tags
  var tokens = s.split(/(<\/?[^>]+>)/g).filter(function(t){ return t.length > 0; });
  tokens.forEach(function(tok) {
    if (/^<\//.test(tok)) {
      // Closing tag — dedent first
      indent = Math.max(0, indent - 1);
      pad = '  '.repeat(indent);
      out += pad + tok + '\n';
    } else if (/^<[a-zA-Z]/.test(tok)) {
      // Opening tag
      pad = '  '.repeat(indent);
      out += pad + tok + '\n';
      // Extract tag name
      var tn = (tok.match(/^<([a-zA-Z][a-zA-Z0-9-]*)/)||[])[1]||'';
      // Don't indent after void or self-closing tags
      if (!voidTags.test(tn) && !/\/>$/.test(tok)) {
        indent++;
      }
    } else {
      // Text node
      var txt = tok.trim();
      if (txt) {
        pad = '  '.repeat(indent);
        out += pad + txt + '\n';
      }
    }
  });
  return out.trimEnd();
}

/* Pretty-print CSS with proper indentation */
function formatCss(css) {
  var s = css.trim();
  if (!s) return '';
  var out = '', indent = 0;
  // Insert newlines around { } ; for splitting
  s = s.replace(/\{/g, ' {\n').replace(/\}/g, '\n}\n').replace(/;\s*/g, ';\n');
  var lines = s.split('\n');
  lines.forEach(function(raw) {
    var line = raw.trim();
    if (!line) return;
    if (line === '}') {
      indent = Math.max(0, indent - 1);
      out += '  '.repeat(indent) + '}\n';
    } else if (/\{$/.test(line)) {
      out += '  '.repeat(indent) + line + '\n';
      indent++;
    } else {
      out += '  '.repeat(indent) + line + '\n';
    }
  });
  return out.trimEnd();
}

/* Format then HTML-escape for <pre> display */
function escHtml(s) { return esc(formatHtml(s)); }
function escCss(s) { return esc(formatCss(s)); }

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripHtmlScripts(html) {
  return String(html || '').replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();
}

function rewriteFunctionCalls(source, fnMap) {
  Object.keys(fnMap || {}).forEach(function(fnName) {
    var re = new RegExp('\\b' + escapeRegExp(fnName) + '\\s*\\(', 'g');
    source = source.replace(re, fnMap[fnName] + '(');
  });
  return source;
}

function scopeHtmlIds(html, scopeKey) {
  var source = String(html || '');
  var idMap = {};
  var idCounts = {};
  var scope = String(scopeKey || 'preview').replace(/[^a-z0-9_-]+/gi, '-');

  function replaceIdRefs(value) {
    return value.split(/\s+/).map(function(token) {
      return idMap[token] || token;
    }).join(' ');
  }

  function replaceAttr(attrName, isList, isFragment) {
    var re = new RegExp('\\b' + attrName + '=(["\'])([^"\']+)\\1', 'gi');
    source = source.replace(re, function(match, quote, value) {
      var nextValue = value;
      if (isFragment) {
        if (value.charAt(0) === '#' && idMap[value.slice(1)]) nextValue = '#' + idMap[value.slice(1)];
      } else if (isList) {
        nextValue = replaceIdRefs(value);
      } else {
        nextValue = idMap[value] || value;
      }
      return attrName + '=' + quote + nextValue + quote;
    });
  }

  source = source.replace(/\bid=(["\'])([^"\']+)\1/gi, function(match, quote, id) {
    var count = (idCounts[id] || 0) + 1;
    var nextId = id + '--' + scope + (count > 1 ? '-' + count : '');
    idCounts[id] = count;
    if (!idMap[id]) idMap[id] = nextId;
    return 'id=' + quote + nextId + quote;
  });

  ['for', 'list', 'form', 'aria-activedescendant', 'aria-errormessage'].forEach(function(attrName) {
    replaceAttr(attrName, false, false);
  });
  ['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns'].forEach(function(attrName) {
    replaceAttr(attrName, true, false);
  });
  ['href', 'xlink:href'].forEach(function(attrName) {
    replaceAttr(attrName, false, true);
  });

  return { html: source, idMap: idMap };
}

function scopeReportJs(js, idMap, scopeKey) {
  var source = String(js || '');
  var fnMap = {};
  var jsScope = String(scopeKey || 'report').replace(/[^a-z0-9_$]+/gi, '_');

  if (!/^[A-Za-z_$]/.test(jsScope)) jsScope = 'sc_' + jsScope;

  source = source.replace(/window\.([A-Za-z_$][A-Za-z0-9_$]*)\s*=/g, function(match, fnName) {
    var nextName = fnMap[fnName];
    if (!nextName) {
      nextName = fnName + '__' + jsScope;
      fnMap[fnName] = nextName;
    }
    return 'window.' + nextName + ' =';
  });

  source = source.replace(/getElementById\(\s*(["\'])([^"\']+)\1\s*\)/g, function(match, quote, id) {
    return 'getElementById(' + quote + (idMap[id] || id) + quote + ')';
  });

  source = rewriteFunctionCalls(source, fnMap);

  return { js: source, fnMap: fnMap };
}

function buildReportRenderInstance(html, js, scopeKey) {
  var scopedHtml = scopeHtmlIds(stripHtmlScripts(html), scopeKey);
  var scopedJs = js ? scopeReportJs(js, scopedHtml.idMap, scopeKey) : { js: '', fnMap: {} };
  return {
    html: rewriteFunctionCalls(scopedHtml.html, scopedJs.fnMap),
    js: scopedJs.js
  };
}

function uniquifyHtmlIds(html, scopeKey) {
  var idMap = {};
  var scope = String(scopeKey || 'preview').replace(/[^a-z0-9_-]+/gi, '-');

  function replaceIdRefs(value) {
    return value.split(/\s+/).map(function(token) {
      return idMap[token] || token;
    }).join(' ');
  }

  function replaceAttr(attrName, isList, isFragment) {
    var re = new RegExp('\\b' + attrName + '=(["\'])([^"\']+)\\1', 'gi');
    html = html.replace(re, function(match, quote, value) {
      var nextValue = value;
      if (isFragment) {
        if (value.charAt(0) === '#' && idMap[value.slice(1)]) nextValue = '#' + idMap[value.slice(1)];
      } else if (isList) {
        nextValue = replaceIdRefs(value);
      } else {
        nextValue = idMap[value] || value;
      }
      return attrName + '=' + quote + nextValue + quote;
    });
  }

  html = html.replace(/\bid=(["'])([^"']+)\1/gi, function(match, quote, id) {
    var nextId = idMap[id];
    if (!nextId) {
      nextId = id + '--' + scope;
      idMap[id] = nextId;
    }
    return 'id=' + quote + nextId + quote;
  });

  ['for', 'list', 'form', 'aria-activedescendant', 'aria-errormessage'].forEach(function(attrName) {
    replaceAttr(attrName, false, false);
  });
  ['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns'].forEach(function(attrName) {
    replaceAttr(attrName, true, false);
  });
  ['href', 'xlink:href'].forEach(function(attrName) {
    replaceAttr(attrName, false, true);
  });

  return html;
}

function extractBody(html) { var m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i); return m ? m[1].trim() : html; }
function extractStyle(html) { var out = []; var re = /<style[^>]*>([\s\S]*?)<\/style>/gi; var m; while((m=re.exec(html))!==null) out.push(m[1].trim()); return out.join('\n'); }
function extractScript(html) { var out = []; var re = /<script[^>]*>([\s\S]*?)<\/script>/gi; var m; while((m=re.exec(html))!==null) out.push(m[1].trim()); return out.join('\n'); }
/* Strip DOMContentLoaded wrapper so extracted JS runs immediately inside build output IIFE */
function stripDCL(js) {
  var m = js.match(/document\.addEventListener\(\s*['"]DOMContentLoaded['"]\s*,\s*function\s*\(\s*\)\s*\{([\s\S]*)\}\s*\)\s*;?\s*$/);
  return m ? m[1].trim() : js;
}
function stripBP(css) {
  return css
    .replace(/@charset\s+[^;]+;?\s*/gi,'')
    .replace(/@import\s+url\([^)]+\)\s*;?\s*/g,'')
    .replace(/:root\s*\{[^}]*\}/g,'')
    .replace(/\*[\s,]*\*::before[\s,]*\*::after\s*\{[^}]*\}/g,'')
    .replace(/body\s*\{[^}]*\}/g,'')
    .replace(/\.sr-only\s*\{[^}]*\}/g,'')
    .replace(/\.zc-report-actions[\s\S]*?\}\s*/g,'')
    .replace(/\.zc-report-header\s*\{[^}]*\}/g,'')
    .replace(/\.zc-report-title\s*\{[^}]*\}/g,'')
    .replace(/\.zc-btn-add\s*\{[^}]*\}/g,'')
    .replace(/\.zc-btn-search\s*\{[^}]*\}/g,'')
    .replace(/\.zc-btn-more\s*\{[^}]*\}/g,'')
    .replace(/\/\*\s*Report Header\s*\*\/\s*/g,'')
    .trim();
}

function scopeCss(css, scopes) {
  if (!css || !scopes || !scopes.length) return css;
  return css.replace(/(^|\}|\s)([^@{}][^{}]*)\{/g, function(match, prefix, selectorText) {
    var selectors = selectorText.split(',').map(function(selector) {
      return selector.trim();
    }).filter(Boolean);
    if (!selectors.length) return match;

    var scopedSelectors = [];
    scopes.forEach(function(scope) {
      selectors.forEach(function(selector) {
        if (/^(from|to|\d+%)$/.test(selector)) scopedSelectors.push(selector);
        else scopedSelectors.push(scope + ' ' + selector);
      });
    });

    return prefix + scopedSelectors.join(', ') + ' {';
  });
}

function scopeFormComponentCss(css, compId) {
  return scopeCss(css, [
    '.variant-card[data-component="' + compId + '"] .variant-preview',
    '#view-all .all-comp-item[data-component="' + compId + '"] .variant-preview'
  ]);
}

function stripHTMLBP(html) {
  return html
    .replace(/<!DOCTYPE[^>]*>/gi,'')
    .replace(/<html[^>]*>/gi,'').replace(/<\/html>/gi,'')
    .replace(/<head>[\s\S]*?<\/head>/gi,'')
    .replace(/<body[^>]*>/gi,'').replace(/<\/body>/gi,'')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi,'')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'')
    .trim();
}
function titleCase(s) { return componentScaffold.titleCase(s); }
function stripReportActions(html) {
  return html
    .replace(/<div class="zc-report-actions">[\s\S]*?<\/div>\s*/g, '')
    .replace(/<div class="zc-report-header">[\s\S]*?<\/div>\s*<\/div>\s*/g, '');
}
function cardReportTitle(filename) {
  // e.g. '05-card3-square-left' -> 'Card 3 — Square Left'
  var base = filename.replace(/^\d+-/, '');  // remove leading number prefix
  var m = base.match(/^card(\d+)-(.+)$/);
  if (!m) return titleCase(base);
  var num = m[1];
  var rest = m[2].replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
  return 'Card ' + num + ' \u2014 ' + rest;
}

var SMOOTH_ICON_ALIASES = {
  outline: {
    'zc-li-alert-triangle': 'ui-3-alert',
    'zc-li-upload': 'arrows-1-cloud-upload-94',
    'zc-li-mic': 'media-2-mic',
    'zc-li-align-left': 'text-align-left',
    'zc-li-align-center': 'text-align-center',
    'zc-li-align-right': 'text-align-right',
    'zc-li-list-bullet': 'text-list-bullet',
    'zc-li-list-number': 'text-list-numbers'
  }
};

function loadSmoothIconData() {
  var source = read(path.join(ROOT, 'src', 'icons', 'icon-data.js')).trim();
  source = source.replace(/^var\s+ICON_DATA\s*=\s*/, '').replace(/;\s*$/, '');
  return JSON.parse(source);
}

function normalizeSmoothIconClassName(iconName) {
  return String(iconName || '')
    .replace(/-outline-/g, '-')
    .replace(/-solid-/g, '-')
    .replace(/_/g, '-');
}

function escapeCssClassName(className) {
  return String(className || '').replace(/[^A-Za-z0-9_-]/g, function(ch) {
    return '\\' + ch.charCodeAt(0).toString(16) + ' ';
  });
}

function buildSmoothIconCss() {
  var iconData = loadSmoothIconData();
  var fontCss = read(path.join(ROOT, 'src', 'icons', 'zc-live-smooth-fonticons.css'))
    .replace(/\.\.\/fonts\/smooth-icons\//g, 'src/icons/');
  var familyMeta = {
    outline: { selector: 'zc-li-outline', fontFamily: 'ZC Live Outline' },
    solid: { selector: 'zc-li-solid', fontFamily: 'ZC Live Solid' }
  };
  var css = [fontCss.trim()];

  css.push('.zc-li-outline, .zc-li-solid { display: inline-block; font-style: normal; font-variant: normal; font-weight: normal; line-height: 1; text-transform: none; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }');
  css.push('.zc-li-outline::before { font-family: "ZC Live Outline"; }');
  css.push('.zc-li-solid::before { font-family: "ZC Live Solid"; }');
  css.push('.zc-li-outline::before, .zc-li-solid::before { display: inline-block; }');

  Object.keys(familyMeta).forEach(function(family) {
    var familyIcons = iconData[family] || {};
    var classCodeMap = {};

    Object.keys(familyIcons).forEach(function(iconName) {
      classCodeMap[normalizeSmoothIconClassName(iconName)] = familyIcons[iconName];
    });

    Object.keys(classCodeMap).forEach(function(className) {
      css.push('.' + familyMeta[family].selector + '.' + escapeCssClassName(className) + '::before { content: "\\' + classCodeMap[className] + '"; }');
    });

    Object.keys(SMOOTH_ICON_ALIASES[family] || {}).forEach(function(aliasClass) {
      var targetClass = SMOOTH_ICON_ALIASES[family][aliasClass];
      var code = classCodeMap[targetClass];
      if (!code) return;
      css.push('.' + familyMeta[family].selector + '.' + escapeCssClassName(aliasClass) + '::before { content: "\\' + code + '"; }');
    });
  });

  return css.join('\n');
}

/* ── Dummy previews for card grid (simplified UI element only) ── */
var CARD_PREVIEWS = {
  'text-input':       '<div class="cp-field"><label>Name</label><input type="text" placeholder="Enter text" readonly></div>',
  'textarea':         '<div class="cp-field"><label>Description</label><textarea placeholder="Enter details..." readonly rows="3"></textarea></div>',
  'number-input':     '<div class="cp-field"><label>Quantity</label><input type="text" value="1,024" readonly></div>',
  'decimal-input':    '<div class="cp-field"><label>Amount</label><input type="text" value="99.50" readonly></div>',
  'currency-input':   '<div class="cp-field cp-addon"><label>Price</label><div class="cp-input-group"><span class="cp-prefix">\u00A3</span><input type="text" value="6,990.00" readonly></div></div>',
  'percent-input':    '<div class="cp-field cp-addon"><label>Rate</label><div class="cp-input-group"><input type="text" value="85" readonly><span class="cp-suffix">%</span></div></div>',
  'email-input':      '<div class="cp-field"><label>Email</label><input type="text" value="user@example.com" readonly></div>',
  'phone-input':      '<div class="cp-field cp-addon"><label>Phone</label><div class="cp-input-group"><span class="cp-prefix">+91 \u25BE</span><input type="text" value="98765 43210" readonly></div></div>',
  'url-input':        '<div class="cp-field"><label>Website</label><input type="text" value="https://example.com" readonly></div>',
  'date-input':       '<div class="cp-field cp-icon-field"><label>Date</label><div class="cp-input-group"><input type="text" value="15-Mar-2026" readonly><span class="cp-icon"><i class="fa-regular fa-calendar"></i></span></div></div>',
  'datetime-input':   '<div class="cp-field cp-icon-field"><label>Date &amp; Time</label><div class="cp-input-group"><input type="text" value="15-Mar-2026 10:30 AM" readonly><span class="cp-icon"><i class="fa-regular fa-calendar"></i></span></div></div>',
  'time-input':       '<div class="cp-field cp-icon-field"><label>Time</label><div class="cp-input-group"><input type="text" value="10:30 AM" readonly><span class="cp-icon"><i class="fa-regular fa-clock"></i></span></div></div>',
  'dropdown':         '<div class="cp-field cp-icon-field"><label>Status</label><div class="cp-input-group"><input type="text" value="Select option" readonly class="cp-placeholder"><span class="cp-icon"><i class="fa-solid fa-chevron-down"></i></span></div></div>',
  'multi-select':     '<div class="cp-field"><label>Tags</label><fieldset class="cp-ms-fieldset"><legend class="cp-ms-legend">Multi Select</legend><div class="cp-tags"><span class="cp-tag">Design<i class="fa-solid fa-xmark"></i></span><span class="cp-tag">Dev<i class="fa-solid fa-xmark"></i></span><span class="cp-tag-more">+2</span></div></fieldset></div>',
  'checkbox':         '<div class="cp-field cp-checks"><label>Options</label><div class="cp-check-group"><label class="cp-check"><input type="checkbox" checked disabled><span>Option A</span></label><label class="cp-check"><input type="checkbox" disabled><span>Option B</span></label></div></div>',
  'radio-button':     '<div class="cp-field cp-checks"><label>Choice</label><div class="cp-check-group"><label class="cp-check"><input type="radio" name="cp-r" checked disabled><span>Option 1</span></label><label class="cp-check"><input type="radio" name="cp-r" disabled><span>Option 2</span></label></div></div>',
  'decision-box':     '<div class="cp-field"><label>Approved</label><div class="cp-toggle"><div class="cp-toggle-track active"><div class="cp-toggle-thumb"></div></div><span>Yes</span></div></div>',
  'name-field':       '<div class="cp-field cp-multi"><label>Full Name</label><div class="cp-multi-row"><input type="text" value="John" readonly><input type="text" value="Doe" readonly></div></div>',
  'address-field':    '<div class="cp-field cp-multi"><label>Address</label><div class="cp-multi-col"><input type="text" value="123 Main St" readonly><div class="cp-multi-row"><input type="text" value="Chennai" readonly><input type="text" value="600001" readonly></div></div></div>',
  'file-upload':      '<div class="cp-field"><label>Attachment</label><div class="cp-upload"><i class="fa-solid fa-cloud-arrow-up"></i><span>Drop files here or <b>browse</b></span></div></div>',
  'image-upload':     '<div class="cp-field"><label>Photo</label><div class="cp-upload cp-upload-img"><i class="fa-regular fa-image"></i><span>Upload image</span></div></div>',
  'audio-upload':     '<div class="cp-field"><label>Audio</label><div class="cp-upload"><i class="fa-solid fa-microphone"></i><span>Upload audio</span></div></div>',
  'video-upload':     '<div class="cp-field"><label>Video</label><div class="cp-upload"><i class="fa-solid fa-video"></i><span>Upload video</span></div></div>',
  'rich-text':        '<div class="cp-field"><label>Content</label><div class="cp-rte"><div class="cp-rte-toolbar"><i class="fa-solid fa-bold"></i><i class="fa-solid fa-italic"></i><i class="fa-solid fa-underline"></i><i class="fa-solid fa-list-ul"></i></div><div class="cp-rte-body">Type here...</div></div></div>',
  'signature-field':  '<div class="cp-field"><label>Signature</label><div class="cp-signature"><svg viewBox="0 0 120 40"><path d="M10 30C20 10 40 35 55 20S80 10 110 25" stroke="#333" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg></div></div>',
  'section-separator':'<div class="cp-separator"><hr><span>Section Title</span></div>',
  'form-buttons':     '<div class="cp-buttons"><button class="cp-btn-primary">Submit</button><button class="cp-btn-secondary">Reset</button></div>'
};

/* ── Component Data ── */
var KNOWN_COMPONENTS = [
  { id:'text-input', icon:'fa-font', desc:'Single-line text entry for names, labels, and short content.' },
  { id:'textarea', icon:'fa-align-left', desc:'Multi-line text area for longer content and descriptions.' },
  { id:'number-input', icon:'fa-hashtag', desc:'Numeric input field with validation for whole numbers.' },
  { id:'decimal-input', icon:'fa-superscript', desc:'Input field for decimal numbers with precision control.' },
  { id:'currency-input', icon:'fa-dollar-sign', desc:'Money input with currency symbol and formatting.' },
  { id:'percent-input', icon:'fa-percent', desc:'Percentage value input with % symbol.' },
  { id:'email-input', icon:'fa-at', desc:'Email address input with format validation.' },
  { id:'phone-input', icon:'fa-phone', desc:'Phone number input with country code support.' },
  { id:'url-input', icon:'fa-link', desc:'URL/website address input with protocol validation.' },
  { id:'date-input', icon:'fa-calendar-day', desc:'Date picker for selecting calendar dates.' },
  { id:'datetime-input', icon:'fa-calendar-check', desc:'Combined date and time selection input.' },
  { id:'time-input', icon:'fa-clock', desc:'Time picker for selecting hours and minutes.' },
  { id:'dropdown', icon:'fa-chevron-down', desc:'Single-select dropdown menu with options.' },
  { id:'multi-select', icon:'fa-list-check', desc:'Multiple selection dropdown with tag display.' },
  { id:'checkbox', icon:'fa-square-check', desc:'Checkbox group for selecting multiple options.' },
  { id:'radio-button', icon:'fa-circle-dot', desc:'Radio button group for single option selection.' },
  { id:'decision-box', icon:'fa-toggle-on', desc:'Yes/No toggle for boolean decisions.' },
  { id:'name-field', icon:'fa-user', desc:'Structured name input with prefix, first, and last name.' },
  { id:'address-field', icon:'fa-map-pin', desc:'Multi-part address input with street, city, and zip.' },
  { id:'file-upload', icon:'fa-file-arrow-up', desc:'File attachment upload with drag-and-drop support.' },
  { id:'image-upload', icon:'fa-image', desc:'Image upload with preview and format validation.' },
  { id:'audio-upload', icon:'fa-music', desc:'Audio file upload with playback preview.' },
  { id:'video-upload', icon:'fa-video', desc:'Video file upload with thumbnail preview.' },
  { id:'rich-text', icon:'fa-text-height', desc:'Rich text editor with formatting toolbar.' },
  { id:'signature-field', icon:'fa-pen-nib', desc:'Digital signature capture with canvas drawing.' },
  { id:'section-separator', icon:'fa-minus', desc:'Visual divider to organize form sections.' },
  { id:'form-buttons', icon:'fa-hand-pointer', desc:'Submit, reset, and action buttons for forms.' }
];

function buildFormComponentIndex() {
  var knownById = {};
  var ordered = [];
  var discoveredIds = componentScaffold.discoverFormComponents(FORMS_DIR);

  KNOWN_COMPONENTS.forEach(function(comp) {
    knownById[comp.id] = comp;
    if (discoveredIds.indexOf(comp.id) !== -1) ordered.push(Object.assign({}, comp));
  });

  discoveredIds.forEach(function(id) {
    if (knownById[id]) return;
    ordered.push({
      id: id,
      icon: 'fa-puzzle-piece',
      desc: 'Starter scaffold for ' + titleCase(id) + ' generated from the Create New Component workflow.'
    });
  });

  return ordered;
}

var COMPONENTS = buildFormComponentIndex();

var REPORTS = [
  { id:'calendar-report', title:'Calendar Report', icon:'fa-calendar', desc:'Month, week and day calendar views with event display.', file:path.join(REPORTS_DIR,'calendar_report.html') },
  { id:'kanban-report', title:'Kanban Report', icon:'fa-columns', desc:'Board view with columns, drag-and-drop cards, and avatar display.', file:path.join(REPORTS_DIR,'kanban.html') },
  { id:'timeline-report', title:'Timeline Report', icon:'fa-timeline', desc:'Week and day timeline views with hourly time slots.', file:path.join(REPORTS_DIR,'timeline.html') },
  { id:'list-report', title:'List Report', icon:'fa-list', desc:'Tabular list view with grouped rows, column headers, and record data.', file:path.join(REPORTS_DIR,'listreport.html') }
];

/* ── Card Report Template Generator ── */
/* Generates 54 card report variants from DOM templates (Creator DOM structure) */
var IMG_PH = "data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20200%20200'%3E%3Crect%20width%3D'200'%20height%3D'200'%20fill%3D'%23f0f1f5'%2F%3E%3Cpath%20d%3D'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z'%20fill%3D'%23b0b0c2'%2F%3E%3C%2Fsvg%3E";
var S = {
  t1:'TVS Emerald Elements', t2:'Budget Sai Jailakshmi Gardens Construction',
  t3:'Appaswamy Parkhouse Mews', t4:'Zoho Corporation',
  ds1:'1, 2, 3, 4 BHK', ds2:'New Launch and it will be ready on upcoming months.',
  ds3:'3, 4 BHK Apartments', ds4:'IT Park, Chennai',
  dl1:'Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29',
  dl2:'Budget Sai Jailakshmi Gardens offers beautifully designed 2 BHK Villa, 3 BHK Villa and Land in Thiruvallur, Chennai North. Budget Sai Jailakshmi Gardens is a Ready To Move project. Prices here start from Rs. 11.43 L. Earthquake Resistant, Vastu Compliant and 24/7 Water Supply',
  dl3:'Beautiful 3,4 BHK apartments in Guindy, are now available in Appaswamy Parkhouse Mews housing project. Apartment prices in this housing society vary in the range of Rs. 2.83 - 3.91 Cr. Appaswamy Parkhouse Mews apartments are available in multiples sizes, ranging from 1,886 - 2,608 sq.ft. B',
  dl4:'Estancia IT Park, Vallancherry Plot No. 140 &amp; 151, Grand Southern Trunk Road, Chengalpattu, Tamil Nadu.',
  f1:'\u00A3 6,990,000.00', f2:'20-October-23 10:19:28 PM', f3:'New Launch and it will be ready on upcoming months.',
  f4:'\u00A3 4,572,000.00', f5:'1, 1.5, 2, 2.5, 3, 4 BHK'
};
var STIT = [S.t1,S.t2,S.t3,S.t4], SDSC_S = [S.ds1,S.ds2,S.ds3,S.ds4], SDSC_L = [S.dl1,S.dl2,S.dl3,S.dl4];

function imgEl() { return '<img src="'+IMG_PH+'" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;">'; }
function imgCol() { return '<div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20">'+imgEl()+'</a></div></div>'; }
function noImgEl() { return '<div class="noRecImage zc-flex zc-align-items-center zc-justify-center"><div class="noRecImageCrop"><i class="fa fa-image"></i><span class="noRecImageLabel"> No image available</span></div></div>'; }

function makeDesc(lt, i) { i=i||0; return lt==='single' ? '<div class="gridCont vT-Spacer">'+SDSC_S[i%4]+'</div>' : '<div class="gridCont vT-Spacer"><span class="zc-multi-line-space">'+SDSC_L[i%4]+'</span></div>'; }
function tinyFields3(i) { i=i||0; return '<div class="zc-dem-qv-tinylight zc-dem-qv-tinylight-three-column zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">'+(i%2?S.f4:S.f1)+'</div><div class="qv-tinylight">'+(i%2?S.f5:S.f2)+'</div><div class="qv-tinylight">'+S.f3+'</div></div>'; }
function tinyFields2(i) { i=i||0; return '<div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">'+(i%2?S.f4:S.f1)+'</div><div class="qv-tinylight">'+S.f3+'</div></div>'; }

function makeRecord(ct, sh, pos, lt, i, align) {
  i = i || 0;
  align = align || 'left';
  var cls = ['record','recordlive'];
  cls.push(lt === 'single' ? 'zc-single-line' : 'zc-multiline');
  if (ct === 4) cls.push('recordTinyView');
  if (ct === 5) cls.push('recordKanban','rImg');
  if (sh === 'circle') cls.push('rImg');
  if (sh === 'full') cls.push('hImg');
  if (pos === 'right') cls.push('record-img-right');
  if (pos === 'top') cls.push('record-img-top');
  if (pos === 'bottom') cls.push('record-img-btm');
  if (align === 'centre') cls.push('record-text-center');
  var ti = STIT[i%4], inner = '';

  if (ct === 1) {
    inner = '<div class="recordTab"><div class="gridpad"><div class="gridTitle">'+ti+'</div>'+makeDesc(lt,i)+'</div></div>';
  } else if (ct === 2) {
    inner = '<div class="recordTab"><div class="gridpad"><div class="gridTitle">'+ti+'</div>'+makeDesc(lt,i)+'</div>'+tinyFields3(i)+'</div>';
  } else if (ct === 3 || ct === 4) {
    var hasFields = (ct === 4);
    if (pos === 'top' || pos === 'bottom') {
      var imgPart = '<div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center">'+imgEl()+'</div>';
      var textPart = '<div class="gridTitle elp v-Spacer">'+ti+'</div>'+(lt==='single'?'<div class="gridCont">'+SDSC_S[i%4]+'</div>':'<div class="gridCont"><span class="zc-multi-line-space">'+SDSC_L[i%4]+'</span></div>');
      inner = '<div class="recordCen">'+(pos==='top'?imgPart:'')+textPart+(pos==='bottom'?imgPart:'')+'</div>'+(hasFields?tinyFields2(i):'');
    } else if (pos === 'right') {
      inner = '<div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">'+ti+'</div>'+makeDesc(lt,i)+(hasFields?tinyFields2(i):'')+'</div></div>'+imgCol()+'</div></div>';
    } else {
      inner = '<div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start">'+imgCol()+'<div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">'+ti+'</div>'+makeDesc(lt,i)+(hasFields?tinyFields2(i):'')+'</div></div></div></div>';
    }
  } else if (ct === 5) {
    inner = '<div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">'+ti+'</div>'+makeDesc(lt,i)+'</div></div></div></div>'
      +'<div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">'+S.f3+'</div><div class="qv-tinylight recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20">'+imgEl()+'</a></div></div></div>';
  }
  return '<div class="'+cls.join(' ')+'">'+inner+'</div>';
}

function makeCardLayout(ct, sh, pos, lt, align) {
  return '<div class="zc-card-list zc-flex zc-direction-column zc-gap-12">' + makeRecord(ct, sh, pos, lt, 0, align) + '</div>';
}

/* Card DOM CSS (styles for Creator record classes) */
var cardDomCss = '/* Card Record Base */\n'
+ '.zc-card-list { }\n'
+ '.record { background: #fff; border-radius: 10px; box-shadow: 0 1px 0 0 rgba(176,176,194,0.36); cursor: pointer; transition: box-shadow 0.2s; position: relative; overflow: hidden; }\n'
+ '.record:hover { box-shadow: 0 2px 8px rgba(176,176,194,0.4); }\n'
+ '.zc-dem-card-more { display: none; }\n'
+ '.recordTab { }\n'
+ '.gridpad { padding: 14px; }\n'
+ '.gridpad-table { }\n'
+ '.gridTitle { font-size: 16px; font-weight: 600; color: #12132b; overflow: hidden; text-overflow: ellipsis; }\n'
+ '.gridTitle.elp { white-space: nowrap; }\n'
+ '.gridCont { font-size: 14px; color: #2f305d; line-height: 1.5; }\n'
+ '.vT-Spacer { margin-top: 6px; }\n'
+ '.v-Spacer { margin-bottom: 6px; }\n'
+ '.hL-spacer { }\n'
+ '.recordCol { min-width: 0; }\n'
+ '.recTxtRight { }\n'
+ '.zc-multi-line-space { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }\n'
+ '.zc-single-line .gridCont { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n'
+ '/* Images */\n'
+ '.recImgCont { width: 64px; height: 64px; }\n'
+ '.recImg { width: 64px; height: 64px; min-width: 64px; border-radius: 10px; overflow: hidden; background: #f0f1f5; }\n'
+ '.recImg img, .recImg .zc-image-view { width: 100%; height: 100%; object-fit: cover; display: block; }\n'
+ '.zc-image-placeholder { display: block; width: 100%; height: 100%; }\n'
+ '/* Circle image */\n'
+ '.rImg .recImg { border-radius: 50%; }\n'
+ '/* Full/tall image */\n'
+ '.hImg .recImgCont { width: 123px; height: 123px; }\n'
+ '.hImg .recImgCont .recImg { width: 123px; min-width: 123px; height: 123px; align-self: stretch; }\n'
+ '.hImg .recordTab { display: flex; }\n'
+ '.hImg .gridpad-table { flex: 1; }\n'
+ '/* Right image */\n'
+ '.record-img-right .gridpad-table { justify-content: space-between; }\n'
+ '/* Top image */\n'
+ '.record-img-top .recordCen { display: flex; flex-direction: column; align-items: center; padding: 14px; text-align: center; }\n'
+ '.record-img-top .recImg.recImgCont { width: 123px; height: 123px; min-width: 123px; border-radius: 14px; margin-bottom: 12px; overflow: hidden; }\n'
+ '/* Bottom image */\n'
+ '.record-img-btm .recordCen { display: flex; flex-direction: column-reverse; align-items: center; padding: 14px; text-align: center; }\n'
+ '.record-img-btm .recImg.recImgCont { width: 123px; height: 123px; min-width: 123px; border-radius: 14px; margin-top: 12px; overflow: hidden; }\n'
+ '/* Tinylight fields */\n'
+ '.zc-dem-qv-tinylight { padding: 8px 14px; border-top: 1px solid #f0f1f5; }\n'
+ '.zc-dem-qv-tinylight-three-column .qv-tinylight { flex: 1; }\n'
+ '.qv-tinylight { font-size: 13px; color: #12132b; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\n'
+ '.zc-dem-clearfix::after { content: ""; display: table; clear: both; }\n'
+ '/* Kanban (Card 5) */\n'
+ '.recordKanban .zc-dem-qv-tinylight { padding: 10px 14px; }\n'
+ '.recordKanban .zc-dem-qv-tinylight .recImgCont { width: 64px; height: 64px; }\n'
+ '.recordKanban .zc-dem-qv-tinylight .recImg { width: 64px; height: 64px; min-width: 64px; border-radius: 50%; }\n'
+ '/* TinyView (Card 4) */\n'
+ '.recordTinyView .hL-spacer { }\n'
+ '/* No image placeholder */\n'
+ '.noRecImage { width: 100%; height: 100%; background: #f0f1f5; }\n'
+ '.noRecImageCrop { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #b0b0c2; }\n'
+ '.noRecImageCrop i { font-size: 24px; }\n'
+ '.noRecImageLabel { font-size: 11px; }\n'
+ '/* Text Centre alignment (Card 1 & 2) */\n'
+ '.record-text-center .gridpad { text-align: center; }\n'
+ '.record-text-center .zc-dem-qv-tinylight { justify-content: center; }\n';

/* Generate all 54 card report variants */
var shapes = ['square','circle','full'];
var positions = ['left','right','top','bottom'];
var lineTypes = ['single','multi'];

var CARD_TYPE_META = [
  { type:1, title:'Card 1', icon:'fa-address-card',
    desc:'Text-only card with title and description lines. Supports left and centre text alignment.',
    svg:'<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="118" height="78" rx="6" stroke="#CBD5E1" stroke-width="1.5" fill="#fff"/><rect x="12" y="14" width="50" height="6" rx="2" fill="#334155"/><rect x="12" y="28" width="96" height="4" rx="1.5" fill="#94A3B8"/><rect x="12" y="38" width="80" height="4" rx="1.5" fill="#94A3B8"/><rect x="12" y="48" width="60" height="4" rx="1.5" fill="#CBD5E1"/></svg>' },
  { type:2, title:'Card 2', icon:'fa-table-list',
    desc:'Card with title, description, and 3-column detail fields at bottom. Supports left and centre alignment.',
    svg:'<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="118" height="78" rx="6" stroke="#CBD5E1" stroke-width="1.5" fill="#fff"/><rect x="12" y="12" width="50" height="6" rx="2" fill="#334155"/><rect x="12" y="24" width="96" height="4" rx="1.5" fill="#94A3B8"/><rect x="12" y="34" width="80" height="4" rx="1.5" fill="#94A3B8"/><line x1="12" y1="48" x2="108" y2="48" stroke="#E2E8F0" stroke-width="1"/><rect x="12" y="54" width="26" height="4" rx="1.5" fill="#64748B"/><rect x="46" y="54" width="26" height="4" rx="1.5" fill="#64748B"/><rect x="80" y="54" width="26" height="4" rx="1.5" fill="#64748B"/></svg>' },
  { type:3, title:'Card 3', icon:'fa-image',
    desc:'Card with image thumbnail, title, and description. Configurable image shape (square, circle, full) and position (left, right, top, bottom).',
    svg:'<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="118" height="78" rx="6" stroke="#CBD5E1" stroke-width="1.5" fill="#fff"/><rect x="12" y="16" width="32" height="32" rx="6" fill="#E2E8F0"/><path d="M22 36l6-8 6 8z M20 40h16l-4-5-3 3-2-1z" fill="#94A3B8"/><rect x="52" y="18" width="56" height="6" rx="2" fill="#334155"/><rect x="52" y="30" width="56" height="4" rx="1.5" fill="#94A3B8"/><rect x="52" y="40" width="40" height="4" rx="1.5" fill="#94A3B8"/></svg>' },
  { type:4, title:'Card 4', icon:'fa-table-cells',
    desc:'Card with image, title, description, and 2-column detail fields. Configurable image shape and position.',
    svg:'<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="118" height="78" rx="6" stroke="#CBD5E1" stroke-width="1.5" fill="#fff"/><rect x="12" y="10" width="28" height="28" rx="5" fill="#E2E8F0"/><path d="M20 28l5-7 5 7z M19 31h14l-3-4-3 3-2-1z" fill="#94A3B8"/><rect x="48" y="12" width="60" height="5" rx="2" fill="#334155"/><rect x="48" y="22" width="56" height="3" rx="1.5" fill="#94A3B8"/><rect x="48" y="30" width="40" height="3" rx="1.5" fill="#94A3B8"/><line x1="12" y1="48" x2="108" y2="48" stroke="#E2E8F0" stroke-width="1"/><rect x="12" y="54" width="30" height="4" rx="1.5" fill="#64748B"/><rect x="50" y="54" width="30" height="4" rx="1.5" fill="#64748B"/></svg>' },
  { type:5, title:'Card 5', icon:'fa-grip',
    desc:'Kanban-style card with title and description at top, circular image thumbnail in the detail row at bottom-right.',
    svg:'<svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="118" height="78" rx="6" stroke="#CBD5E1" stroke-width="1.5" fill="#fff"/><rect x="12" y="12" width="56" height="6" rx="2" fill="#334155"/><rect x="12" y="24" width="96" height="4" rx="1.5" fill="#94A3B8"/><rect x="12" y="34" width="72" height="4" rx="1.5" fill="#94A3B8"/><line x1="12" y1="48" x2="108" y2="48" stroke="#E2E8F0" stroke-width="1"/><rect x="12" y="54" width="50" height="4" rx="1.5" fill="#64748B"/><circle cx="94" cy="58" r="12" fill="#E2E8F0"/><path d="M89 61l5-6 5 6z" fill="#94A3B8"/></svg>' }
];

var allCardVariants = [];
function addVariant(ct, sh, pos, lt, align) {
  align = align || null;
  var parts = ['card'+ct];
  if (sh) parts.push(sh);
  if (pos) parts.push(pos);
  if (align) parts.push(align);
  parts.push(lt+'-line');
  var id = parts.join('-');
  var titleParts = ['Card '+ct+' \u2014'];
  if (sh) titleParts.push(titleCase(sh));
  if (pos) titleParts.push(titleCase(pos));
  if (align) titleParts.push(titleCase(align));
  titleParts.push(titleCase(lt)+' Line');
  allCardVariants.push({
    cardType: ct, shape: sh, position: pos, lineType: lt, textAlign: align,
    id: id, title: titleParts.join(' '), groupId: 'card'+ct,
    icon: CARD_TYPE_META[ct-1].icon,
    desc: titleParts.join(' ')+' layout variant.',
    body: makeCardLayout(ct, sh, pos, lt, align || 'left'),
    cleanCss: cardDomCss,
    isCardReport: true
  });
}
var textAligns = ['left','centre'];
// Card 1: 4 variants (2 lineTypes × 2 alignments)
textAligns.forEach(function(al){ lineTypes.forEach(function(lt){ addVariant(1,null,null,lt,al); }); });
// Card 2: 4 variants (2 lineTypes × 2 alignments)
textAligns.forEach(function(al){ lineTypes.forEach(function(lt){ addVariant(2,null,null,lt,al); }); });
// Card 3: 24 variants
shapes.forEach(function(sh){ positions.forEach(function(pos){ lineTypes.forEach(function(lt){ addVariant(3,sh,pos,lt); }); }); });
// Card 4: 24 variants
shapes.forEach(function(sh){ positions.forEach(function(pos){ lineTypes.forEach(function(lt){ addVariant(4,sh,pos,lt); }); }); });
// Card 5: 2 variants
lineTypes.forEach(function(lt){ addVariant(5,null,null,lt); });

/* Group variants by card type */
var cardTypeGroups = {};
CARD_TYPE_META.forEach(function(m){ cardTypeGroups['card'+m.type] = { meta: m, variants: [] }; });
allCardVariants.forEach(function(v){ cardTypeGroups[v.groupId].variants.push(v); });

/* ── Read & parse all form components ── */
var formAllCss = '';
var formAllJs = '';
var formData = [];
var compileScssOnly = process.argv.indexOf('--compile-scss-only') !== -1;
COMPONENTS.forEach(function(comp) {
  var dir = path.join(FORMS_DIR, comp.id);
  if (!fs.existsSync(dir)) return;
  if (compileScssOnly) {
    var styleFiles = getComponentStyleFiles(dir, comp.id);
    if (fs.existsSync(styleFiles.scssFile)) compileComponentScss(styleFiles.scssFile, styleFiles.cssFile);
    return;
  }
  var htmlFile = path.join(dir, comp.id+'.html');
  var jsFile = path.join(dir, comp.id+'.js');
  var htmlRaw = fs.existsSync(htmlFile) ? read(htmlFile) : '';
  var cssRaw = resolveComponentCss(dir, comp.id);
  var jsRaw = '';
  if (fs.existsSync(jsFile)) jsRaw = stripDCL(read(jsFile));
  else { var inlineJs = extractScript(htmlRaw); if (inlineJs) jsRaw = stripDCL(inlineJs); }
  var body = stripHTMLBP(htmlRaw);
  var cleanCss = stripBP(cssRaw);
  var scopedCss = scopeFormComponentCss(cleanCss, comp.id);
  comp.body = body;
  comp.cleanCss = cleanCss;
  comp.scopedCss = scopedCss;
  comp.js = jsRaw;
  comp.title = titleCase(comp.id);
  formData.push(comp);
  if (scopedCss) formAllCss += '\n/* -- ' + comp.title + ' -- */\n' + scopedCss + '\n';
  if (jsRaw) formAllJs += '\n// -- ' + comp.title + ' --\n(function(){try{\n' + jsRaw + '\n}catch(e){console.warn("' + comp.id + ' JS error:",e);}})();\n';
});

if (compileScssOnly) {
  console.log('Compiled SCSS sources to component CSS. Default library builds still consume component CSS.');
  process.exit(0);
}

/* ── Read & parse all reports ── */
var reportAllCss = '';
var reportAllJs = '';
var reportData = [];
REPORTS.forEach(function(rpt) {
  if (!fs.existsSync(rpt.file)) return;
  var raw = read(rpt.file);
  var body = extractBody(raw);
  body = stripReportActions(body);
  var css = extractStyle(raw);
  var js = extractScript(raw);
  rpt.body = body;
  rpt.cleanCss = stripBP(css);
  rpt.js = js;
  rpt.gridRender = buildReportRenderInstance(body, js, 'grid-' + rpt.id);
  rpt.detailRender = buildReportRenderInstance(body, js, 'detail-' + rpt.id);
  rpt.allRender = buildReportRenderInstance(body, js, 'all-' + rpt.id);
  reportData.push(rpt);
  if (rpt.cleanCss) reportAllCss += '\n/* -- ' + rpt.title + ' -- */\n' + rpt.cleanCss + '\n';
  [
    ['grid', rpt.gridRender.js],
    ['detail', rpt.detailRender.js],
    ['all', rpt.allRender.js]
  ].forEach(function(renderEntry) {
    if (renderEntry[1]) reportAllJs += '\n// -- ' + rpt.title + ' [' + renderEntry[0] + '] --\n' + renderEntry[1] + '\n';
  });
});

/* Add card DOM CSS */
reportAllCss = '\n/* -- Card Report DOM Styles -- */\n' + cardDomCss + '\n' + reportAllCss;

/* Core reports (calendar/kanban/timeline) */
var coreReportData = reportData.slice();
/* Card report variants (generated from templates) */
var cardReportData = allCardVariants;

/* Card layout configurator (added as a pseudo-report for sidebar listing) */
var cardConfiguratorEntry = {
  id: 'card-layout-types',
  title: 'Card Report Layout Types',
  icon: 'fa-sliders',
  desc: 'Interactive configurator to preview all card layout variants by card type, shape, position, and line type.'
};

/* ── Parse color variables ── */
var colorCss = read(path.join(ROOT, 'src', 'tokens', 'color_variables.css'));
var curGroup = '';
var groupVars = [];
var allColorGroups = [];
colorCss.split('\n').forEach(function(line) {
  var cm = line.match(/\/\*\s*(.+?)\s*\*\//);
  if (cm && !line.match(/--[\w-]+/)) {
    if (curGroup && groupVars.length) allColorGroups.push({name:curGroup,vars:groupVars.slice()});
    curGroup = cm[1].trim();
    groupVars = [];
  }
  var vm = line.match(/--([\w-]+)\s*:\s*([^;]+);/);
  if (vm) groupVars.push({name:'--'+vm[1], value:vm[2].trim()});
});
if (curGroup && groupVars.length) allColorGroups.push({name:curGroup,vars:groupVars.slice()});

var smoothIconCss = buildSmoothIconCss();

var formVisualParityCss = `
/* ── Index Visual Parity Overrides ── */
.zc-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
.form-group { margin-bottom: var(--field-margin-bottom); }
.form-group::after { content: ''; display: table; clear: both; }
fieldset.form-group { border: none; padding: 0; }
.form-group > .zc-help-txt,
.form-group > .fieldErrorMsg,
.form-group > .fieldErrorMsg { clear: both; padding-top: 4px; padding-left: 156px; box-sizing: border-box; }
.form-label { float: left; width: 140px; margin-right: 16px; font-family: var(--font-family); font-size: var(--font-size-base); font-weight: 400; color: var(--color-text-primary); line-height: var(--input-height); text-align: right; padding: 0; letter-spacing: 0; }
.zc-label-text { display: inline; width: auto; text-align: inherit; float: none; }
.fieldMandate { display: inline; color: var(--color-error); margin-left: 2px; }
.form-field { display: block; margin-left: 156px; max-width: 240px; }
.form-group > .form-field { display: block; margin: 0; max-width: none; }
.form-field.smallSizeLive  { --zc-input-width: 250px; }
.form-field.mediumSizeLive { --zc-input-width: 300px; }
.form-field.largeSizeLive  { --zc-input-width: 400px; }
.form-control,
input.form-control:not(.zc-checkbox-input):not(.zc-radio-input):not(.zc-decision-input):not(.zc-otp-input):not(.zc-select2-input),
select.form-control,
.form-control,
textarea.form-control,
.form-control { height: var(--input-height); padding: 0 12px; font-family: var(--font-family); font-size: var(--font-size-base); color: var(--color-text-primary); background-color: var(--color-bg-white); border: 1px solid var(--color-border); border-radius: var(--input-border-radius); line-height: 34px; outline: none; margin: 0; min-height: 30px; min-width: var(--zc-input-width); max-width: var(--zc-input-width); transition: border-color 0.2s ease, box-shadow 0.2s ease; -webkit-appearance: none; -moz-appearance: none; appearance: none; }
.form-control::placeholder,
input.form-control:not(.zc-checkbox-input):not(.zc-radio-input):not(.zc-decision-input):not(.zc-otp-input):not(.zc-select2-input)::placeholder,
.form-control::placeholder,
textarea.form-control::placeholder { color: var(--color-text-placeholder); }
.form-control:hover,
input.form-control:not(.zc-checkbox-input):not(.zc-radio-input):not(.zc-decision-input):not(.zc-otp-input):not(.zc-select2-input):hover,
select.form-control:hover,
.form-control:hover,
textarea.form-control:hover,
.form-control:hover { border-color: var(--color-primary); }
.form-control:focus,
input.form-control:not(.zc-checkbox-input):not(.zc-radio-input):not(.zc-decision-input):not(.zc-otp-input):not(.zc-select2-input):focus,
select.form-control:focus,
.form-control:focus,
textarea.form-control:focus,
.form-control:focus { border-color: var(--color-border-focus); box-shadow: 0 0 0 0.5px var(--color-primary); }
.form-control:disabled,
input.form-control:not(.zc-checkbox-input):not(.zc-radio-input):not(.zc-decision-input):not(.zc-otp-input):not(.zc-select2-input):disabled,
select.form-control:disabled,
.form-control:disabled,
textarea.form-control:disabled,
.form-control:disabled,
.zc-field-disabled .form-control,
.zc-field-disabled input.form-control:not(.zc-checkbox-input):not(.zc-radio-input):not(.zc-decision-input):not(.zc-otp-input):not(.zc-select2-input),
.zc-field-disabled select.form-control,
.zc-field-disabled .form-control { background-color: var(--color-bg-disabled); color: var(--disable-text-color); cursor: not-allowed; border-color: var(--color-border); opacity: 1; }
.zc-checkbox-input.form-control,
.zc-radio-input.form-control,
.zc-decision-input.form-control,
.zc-select2-input.form-control { width: auto; min-height: 0; padding: 0; line-height: normal; background-color: transparent; }
.form-control[aria-invalid="true"],
select.form-control[aria-invalid="true"],
textarea.form-control[aria-invalid="true"],
.form-control[aria-invalid="true"],
.validationError .form-control,
.validationError input.form-control:not(.zc-checkbox-input):not(.zc-radio-input):not(.zc-decision-input):not(.zc-otp-input):not(.zc-select2-input),
.validationError select.form-control,
.validationError textarea.form-control,
.validationError .form-control { background: var(--color-bg-white) !important; border-color: var(--color-error) !important; box-shadow: 0 0 0 0.5px var(--color-error); }
.zc-help-txt { font-size: 12px; color: var(--tertiary-text-color); margin-top: 4px; display: block; line-height: 1.4; }
.fieldErrorMsg,
.fieldErrorMsg { display: flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 12px; color: var(--color-error); line-height: 1.4; }
.fieldErrorMsg[hidden], .fieldErrorMsg[hidden] { display: none; }
.zc-field-error-msg-icon { width: 14px; height: 14px; flex-shrink: 0; color: var(--color-error); stroke: currentColor; }
.form-control,
textarea.form-control { min-height: 200px; padding: 7px 12px; line-height: 1.5; resize: vertical; }
.zc-checkbox-group,
.zc-radio-group { display: flex; flex-direction: column; gap: 8px; padding-top: 6px; }
.zc-checkbox-option,
.zc-radio-option { display: inline-flex; align-items: center; gap: 8px; }
.zc-checkbox-input { appearance: none; -webkit-appearance: none; width: 17px; height: 17px; border: 1.5px solid var(--color-border); border-radius: 4px; cursor: pointer; position: relative; flex-shrink: 0; transition: border-color 0.2s ease, background-color 0.2s ease; }
.zc-checkbox-input:hover { border-color: var(--color-primary); }
.zc-checkbox-input:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.zc-checkbox-input:checked { background-color: var(--color-primary); border-color: var(--color-primary); }
.zc-checkbox-input:checked::after { content: ''; position: absolute; top: 1px; left: 5px; width: 5px; height: 10px; border: solid #fff; border-width: 0 1.5px 1.5px 0; transform: rotate(45deg); }
.zc-radio-input { appearance: none; -webkit-appearance: none; width: 18px; height: 18px; border: 2px solid var(--color-border); border-radius: 50%; cursor: pointer; position: relative; flex-shrink: 0; transition: border-color 0.2s ease; }
.zc-radio-input:hover { border-color: var(--color-primary); }
.zc-radio-input:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.zc-radio-input:checked { border-color: var(--color-primary); }
.zc-radio-input:checked::after { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; background-color: var(--color-primary); border-radius: 50%; }
.zc-checkbox-label,
.zc-radio-label { font-family: var(--font-family); font-size: var(--font-size-base); color: var(--color-text-primary); cursor: pointer; line-height: 1.4; }
.zc-select2-container { position: relative; width: 100%; border: none; background: transparent; box-shadow: none; }
.zc-select2-choice { display: flex; align-items: center; width: 100%; height: var(--input-height); padding: 0 12px; font-family: var(--font-family); font-size: var(--font-size-base); color: var(--color-text-placeholder); background-color: var(--color-bg-white); border: 1px solid var(--color-border); border-radius: var(--input-border-radius); cursor: pointer; text-decoration: none; outline: none; min-width: var(--zc-input-width); max-width: var(--zc-input-width); transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.zc-select2-container:hover .zc-select2-choice { border-color: var(--color-primary); }
.zc-select2-container:focus-within .zc-select2-choice,
.zc-select2-container.zc-select2-container-active .zc-select2-choice,
.zc-select2-container.zc-select2-dropdown-open .zc-select2-choice { border-color: var(--color-border-focus); box-shadow: 0 0 0 0.5px var(--color-primary); }
.zc-select2-container.zc-select2-container-disabled .zc-select2-choice,
.zc-field-disabled .zc-select2-choice { background-color: var(--color-bg-disabled); cursor: not-allowed; }
.validationError .zc-select2-choice { border-color: var(--color-error) !important; box-shadow: 0 0 0 0.5px var(--color-error); }
.zc-select2-chosen { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.zc-select2-arrow { display: flex; align-items: center; margin-left: 8px; position: static; width: auto; }
.zc-select2-arrow b { display: block; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid var(--color-text-secondary); position: static; margin: 0; }
.zc-select2-drop { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background-color: var(--color-bg-white); border: 1px solid var(--color-border); border-radius: var(--input-border-radius); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); z-index: 100; }
.zc-select2-display-none { display: none !important; }
.zc-select2-search { padding: 8px; border-bottom: 1px solid var(--color-border); }
.zc-select2-search .zc-select2-input { width: 100%; height: 30px; padding: 0 8px; font-family: var(--font-family); font-size: 13px; color: var(--color-text-primary); background-color: var(--color-bg-white); border: 1px solid var(--color-border); border-radius: 6px; outline: none; box-sizing: border-box; }
.zc-select2-search .zc-select2-input:focus { border-color: var(--color-primary); }
.zc-select2-results { list-style: none; padding: 4px 0; margin: 0; overflow-y: auto; max-height: 200px; }
.zc-select2-result { cursor: pointer; transition: background-color 0.15s ease; }
.zc-select2-result-label { padding: 8px 12px; font-family: var(--font-family); font-size: var(--font-size-base); color: var(--color-text-primary); }
.zc-select2-result:hover .zc-select2-result-label,
.zc-select2-result.zc-select2-highlighted .zc-select2-result-label,
.zc-select2-result.zc-select2-result-selected .zc-select2-result-label { background-color: var(--primary-opacity); }
.zc-file-upload { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 12px; width: 100%; min-height: var(--input-height); padding: 0 12px; background-color: var(--color-bg-white); border: 1px solid var(--color-border); border-radius: var(--input-border-radius); transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease; }
.zc-file-upload:hover { border-color: var(--color-primary); }
.zc-file-upload:focus-within,
.zc-file-upload.is-dragover { border-color: var(--color-border-focus); box-shadow: 0 0 0 0.5px var(--color-primary); }
.zc-file-upload.is-dragover { background-color: var(--primary-opacity); }
.zc-file-upload-input { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
.zc-file-upload-text { font-family: var(--font-family); font-size: var(--font-size-base); color: var(--color-text-placeholder); }
.zc-file-upload-icon { display: flex; align-items: center; color: var(--color-text-secondary); }
.zc-file-upload__filename { font-size: 12px; color: var(--color-text-primary); margin-top: 4px; display: block; }
.zc-signature-field { border: 1px solid var(--color-border); border-radius: var(--input-border-radius); overflow: hidden; background-color: var(--color-bg-white); transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.zc-signature-field:focus-within { border-color: var(--color-border-focus); box-shadow: 0 0 0 0.5px var(--color-primary); }
.zc-signature-pad-header { padding: 8px 12px; border-bottom: 1px solid var(--color-border); }
.zc-signature-placeholder { font-size: var(--font-size-base); color: var(--color-text-placeholder); font-family: var(--font-family); }
.zc-signature-canvas { display: block; width: 100%; cursor: crosshair; touch-action: none; background: var(--color-bg-white); }
.zc-signature-actions { display: flex; justify-content: flex-end; padding: 6px 8px; border-top: 1px solid var(--color-border); gap: 8px; }
.zc-signature-btn { font-family: var(--font-family); font-size: 13px; color: var(--color-text-secondary); background: none; border: none; cursor: pointer; padding: 4px 8px; border-radius: 4px; transition: background-color 0.15s ease, color 0.15s ease; }
.zc-signature-btn:hover { background-color: var(--primary-opacity); color: var(--color-primary); }
.zc-form-actions { display: flex; align-items: center; gap: 12px; padding: 24px 0; }
.zc-btn { font-family: var(--font-family); font-size: var(--font-size-base); font-weight: 600; padding: 8px 24px; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; line-height: 1.4; min-height: 36px; }
.zc-btn:focus-visible,
.zc-signature-btn:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.zc-btn-primary { background-color: var(--color-primary); color: var(--color-bg-white); border: 1px solid var(--color-primary); }
.zc-btn-primary:hover { background-color: var(--color-primary-dark); border-color: var(--color-primary-dark); }
.zc-btn-secondary { background-color: var(--color-bg-white); color: var(--color-text-primary); border: 1px solid var(--color-border); }
.zc-btn-secondary:hover { background-color: #f5f5f5; border-color: #999; }
.zc-btn-ghost { background-color: transparent; color: var(--color-text-secondary); border: 1px solid transparent; }
.zc-btn-ghost:hover { background-color: var(--primary-opacity); color: var(--color-primary); }
.form-table.label-left .form-label { text-align: left; line-height: var(--input-height); }
.form-table.label-left .form-group > .zc-help-txt,
.form-table.label-left .form-group > .fieldErrorMsg,
.form-table.label-left .form-group > .fieldErrorMsg { clear: both; padding-left: 156px; box-sizing: border-box; }
.form-table.label-right .form-label { text-align: right; line-height: var(--input-height); }
.form-table.label-right .form-group > .zc-help-txt,
.form-table.label-right .form-group > .fieldErrorMsg,
.form-table.label-right .form-group > .fieldErrorMsg { clear: both; padding-left: 156px; box-sizing: border-box; }
.form-table.label-top .form-label { float: none !important; display: block; width: auto; margin-right: 0 !important; margin-bottom: 6px; text-align: left; line-height: 1.4; font-weight: 600; }
.form-table.label-top .zc-label-text { display: inline; text-align: left; }
.form-table.label-top .form-field { margin-left: 0 !important; width: 100% !important; max-width: 340px !important; }
.form-table.label-top .form-field.smallSizeLive { max-width: 290px !important; }
.form-table.label-top .form-field.mediumSizeLive { max-width: 340px !important; }
.form-table.label-top .form-field.largeSizeLive { max-width: 440px !important; }
.form-table.label-top .form-group > .zc-help-txt,
.form-table.label-top .form-group > .fieldErrorMsg,
.form-table.label-top .form-group > .fieldErrorMsg { padding-left: 0; }
.form-table.label-inplace .form-group { position: relative; }
.form-table.label-inplace .form-label { float: none !important; display: block; position: absolute; width: auto; margin-right: 0 !important; box-sizing: border-box; color: #b7b7b7; font-size: 13px; font-weight: 400; left: 0; padding: 0 3px; pointer-events: none; top: 0; transform: translate3d(10px, 10px, 0) scale(1); transform-origin: left top; transition: transform .25s cubic-bezier(.25,.8,.25,1); z-index: 1; }
.form-table.label-inplace .form-group.zc-label-float .form-label { font-size: 13px; padding: 0 3px; transform: translate3d(10px, 5px, 0) scale(1); width: auto; }
.form-table.label-inplace .form-group.zc-label-float .form-label.zc-focus { transform: translate3d(10px, -13px, 0) scale(1); background: #fff; transition: all .2s ease; }
.form-table.label-inplace .zc-label-text { display: inline; text-align: left; }
.form-table.label-inplace .form-field { margin-left: 0 !important; width: 100% !important; max-width: 340px !important; }
.form-table.label-inplace .form-field.smallSizeLive { max-width: 290px !important; }
.form-table.label-inplace .form-field.mediumSizeLive { max-width: 340px !important; }
.form-table.label-inplace .form-field.largeSizeLive { max-width: 440px !important; }
.form-table.label-inplace .form-group > .zc-help-txt,
.form-table.label-inplace .form-group > .fieldErrorMsg,
.form-table.label-inplace .form-group > .fieldErrorMsg { padding-left: 0; }
.form-table.label-inplace .zc-label-float .form-control,
.form-table.label-inplace .zc-label-float input.form-control:not(.zc-checkbox-input):not(.zc-radio-input):not(.zc-decision-input):not(.zc-otp-input):not(.zc-select2-input),
.form-table.label-inplace .zc-label-float select.form-control,
.form-table.label-inplace .zc-label-float textarea.form-control,
.form-table.label-inplace .zc-label-float .zc-select2-choice { padding-top: 5px; }
.form-table.label-inplace .fieldMandate { display: none; }
`;

/* ═══════════════════════════════════════
   BUILD OUTPUT HTML
   ═══════════════════════════════════════ */
var O = [];
function w(s) { O.push(s); }

w('<!DOCTYPE html>');
w('<html lang="en" data-theme="creator">');
w('<head>');
w('<meta charset="UTF-8">');
w('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
w('<title>Live App \u2014 Design System</title>');
w('<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;600;700&display=swap" rel="stylesheet">');
w('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">');
w('<style>');

/* ═══ grid.css utility classes ═══ */
w(read(path.join(ROOT, 'src', 'grid', 'grid.css')));
w(smoothIconCss);

/* ═══ CSS ═══ */
w(':root {');
w('  --bg-white: #FFFFFF;');
w('  --bg-light: #F8FAFC;');
w('  --bg-dark: #0F172A;');
w('  --text-primary: #0F172A;');
w('  --text-secondary: #475569;');
w('  --text-tertiary: #94A3B8;');
w('  --text-white: #FFFFFF;');
w('  --border-light: #E2E8F0;');
w('  --border-default: #CBD5E1;');
w('  --brand-primary: #0D4EF2;');
w('  --brand-light: #E8EFFF;');
w('  --brand-lighter: #F3F6FF;');
w('  --brand-dark: #0A3BC2;');
w('  --brand-gradient: linear-gradient(135deg, #001857 0%, #001752 35%, #002481 70%, #08329B 100%);');
w('  --brand-gradient-vibrant: linear-gradient(135deg, #001857 0%, #001752 35%, #002481 70%, #08329B 100%);');
w('  --font-family: "Lato", -apple-system, BlinkMacSystemFont, sans-serif;');
w('  --font-size-base: 14.5px;');
w('  --input-height: 36px;');
w('  --input-border-radius: 8px;');
w('  --field-margin-bottom: 24px;');
w('}');

/* Color system variables for form components */
w(':root {');
w('  --secondary-color: #F6F6F6; --disable-color: #F3F4F8; --tertiary-color: #EDEDF4;');
w('  --primary-bg-color: #F3F4F8; --secondary-bg-color: #F8F8FB; --tertiary-bg-color: #F8F8FB;');
w('  --quaternary-bg-color: #FAFBFF; --primary-background-text-color: #fff;');
w('  --primary-text-color: #12132B; --secondary-text-color: #2F305D; --tertiary-text-color: #606189;');
w('  --disable-text-color: var(--tertiary-text-color); --primary-bg-text-color: #fff;');
w('  --error-bg-color: #ffffff; --error-text-color: #E61F1F; --error-border-color: var(--error-text-color);');
w('  --error-hover-bg-color: #FFF3F3; --warning-bg-color: #FFF8E0; --warning-text-color: #2C291D;');
w('  --warning-border-color: #ECD790;');
w('  --primary-border-color: #CBCBDC; --secondary-border-color: #DCDCE7;');
w('  --tertiary-border-color: #E7E7EE; --quaternary-border-color: #F6F6F9;');
w('  --primary-icons-color: #71718C; --secondary-icons-color: #727793; --tertiary-icons-color: #606189;');
w('  --light-box-shadow-color: rgba(176,176,194,0.36); --dark-box-shadow-color: #F1F1F5;');
w('  --card-bg-color: #fff; --card-border-color: var(--secondary-border-color);');
w('  --card-container-bg-color: #FAFBFF; --form-label-text-color: #111136;');
w('  --custom-card-image-border-color: #D2D9DB; --custom-card-image-bg-color: #FAFCFC;');
w('  --count-badge-bg-color: #E9E9F3; --scrollbar-default-bg-color: #B7B8BF;');
w('  --scrollbar-hover-bg-color: #A3A4AA; --default-img-color: #96A4AA;');
w('  --tooltip-bg-color: var(--primary-text-color);');
/* Primary color + opacity */
w('  --primary-color: #5051F9;');
w('  --primary-opacity: #5353f91f;');
/* Component-level aliases used by form field CSS files */
w('  --color-primary: var(--primary-color);');
w('  --color-primary-dark: var(--primary-color);');
w('  --color-text-primary: var(--primary-text-color);');
w('  --color-text-secondary: var(--tertiary-text-color);');
w('  --color-text-placeholder: #999999;');
w('  --color-border: var(--primary-border-color);');
w('  --color-border-focus: var(--primary-color);');
w('  --color-bg-white: #ffffff;');
w('  --color-bg-disabled: #f0f0f4;');
w('  --color-error: #ff0000;');
w('  --zc-color-primary: var(--primary-color);');
w('  --zc-color-primary-opacity: var(--primary-opacity);');
w('  --zc-color-text-primary: var(--primary-text-color);');
w('  --zc-color-text-secondary: var(--tertiary-text-color);');
w('  --zc-color-text-placeholder: var(--color-text-placeholder);');
w('  --zc-color-text-disabled: var(--disable-text-color);');
w('  --zc-color-border: var(--primary-border-color);');
w('  --zc-color-border-focus: var(--primary-color);');
w('  --zc-color-bg-white: var(--color-bg-white);');
w('  --zc-color-bg-page: #f7f6f9;');
w('  --zc-color-bg-disabled: var(--color-bg-disabled);');
w('  --zc-color-bg-flag: #dddddd;');
w('  --zc-color-arrow: #999999;');
w('  --zc-color-error: var(--color-error);');
w('  --zc-shadow-dropdown: 0 4px 12px rgba(0, 0, 0, 0.1);');
w('  --zc-font-family: var(--font-family);');
w('  --zc-font-size: var(--font-size-base);');
w('  --zc-font-size-base: var(--font-size-base);');
w('  --zc-input-height: var(--input-height);');
w('  --zc-input-border-radius: var(--input-border-radius);');
w('  --zc-input-width: 240px;');
w('  --zc-border-radius: var(--input-border-radius);');
w('  --zc-field-margin-bottom: var(--field-margin-bottom);');
w('  --zc-color-text: var(--primary-text-color);');
w('  --zc-color-label: #333333;');
w('  --zc-color-error-text: #c04543;');
w('  --zc-color-mandatory: #ff0000;');
w('  --zc-color-help-text: #2F305D;');
w('  --zc-color-subfield-label: #70738F;');
w('  --zc-color-bg: var(--color-bg-white);');
w('  --zc-color-icon: #606189;');
w('  --submenu-hover-bg-color: #F3F4F8;');
w('}');

w('*, *::before, *::after { box-sizing: border-box; }');
w('body { font-family: var(--font-family); background: var(--bg-light); color: var(--text-primary); line-height: 1.6; font-size: 14px; margin: 0; overflow: hidden; }');
w('.app-layout { display: flex; height: 100vh; }');

/* ── Sidebar ── */
w('.sidebar { width: 200px; min-width: 200px; background: var(--brand-gradient-vibrant); height: 100%; display: flex; flex-direction: column; box-shadow: 8px 0 40px rgba(0,0,0,0.15); z-index: 100; position: relative; overflow-y: auto; }');
w('.brand-section { text-align: center; padding: 28px 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); }');
w('.brand-logo-container { width: 80px; height: 80px; background: rgba(255,255,255,0.98); border-radius: 22px; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.2); cursor: pointer; overflow: hidden; }');
w('.brand-logo-container img { width: 100%; height: 100%; object-fit: cover; }');
w('.brand-name { font-size: 22px; font-weight: 600; color: #FFFFFF; letter-spacing: -0.5px; margin-bottom: 4px; }');
w('.brand-tagline { font-size: 10px; color: rgba(255,255,255,0.6); font-weight: 600; letter-spacing: 2px; text-transform: uppercase; }');

w('.sidebar-nav { padding: 16px 12px; flex: 1; }');
w('.nav-section-title { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 1.5px; padding: 12px 12px 8px; margin: 0; }');
w('.nav-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; color: rgba(255,255,255,0.7); text-decoration: none; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer; position: relative; transition: all 0.25s ease; margin-bottom: 2px; }');
w('.nav-item i { font-size: 15px; width: 20px; text-align: center; }');
w('.nav-item:hover { background: rgba(255,255,255,0.12); color: #fff; }');
w('.nav-item.active { background: rgba(255,255,255,0.2); color: #fff; font-weight: 600; box-shadow: 0 4px 16px rgba(0,0,0,0.15); }');
w('.nav-item.active::before { content: ""; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 24px; background: #fff; border-radius: 0 4px 4px 0; }');
w('.nav-badge { margin-left: auto; font-size: 11px; font-weight: 600; background: rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); padding: 2px 8px; border-radius: 8px; min-width: 24px; text-align: center; }');

/* ── Main wrapper ── */
w('.main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; height: 100%; }');

/* ── Inline Search Bar ── */
w('.inline-search { display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: #fff; border: 1px solid var(--border-light); border-radius: 12px; margin-bottom: 20px; max-width: 460px; transition: border-color .2s, box-shadow .2s; }');
w('.inline-search:focus-within { border-color: var(--brand-primary); box-shadow: 0 0 0 3px var(--brand-lighter); }');
w('.inline-search i { color: var(--text-tertiary); font-size: 14px; flex-shrink: 0; }');
w('.inline-search input { flex: 1; border: none; background: transparent; font-size: 14px; color: var(--text-primary); outline: none; font-family: var(--font-family); }');
w('.inline-search input::placeholder { color: var(--text-tertiary); }');
w('.inline-search .search-shortcut { padding: 3px 8px; background: var(--bg-light); border-radius: 4px; font-size: 11px; color: var(--text-tertiary); font-weight: 500; flex-shrink: 0; }');
w('.sidebar-search { padding: 8px 10px; margin-bottom: 4px; }');
w('.sidebar-search input { width: 100%; padding: 7px 10px 7px 32px; border: 1px solid rgba(0,0,0,0.08); border-radius: 8px; font-size: 12.5px; color: var(--text-primary); background: var(--bg-light) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 512 512\' fill=\'%2394A3B8\'%3E%3Cpath d=\'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z\'/%3E%3C/svg%3E") no-repeat 10px center / 13px; outline: none; font-family: var(--font-family); transition: border-color .2s; }');
w('.sidebar-search input:focus { border-color: var(--brand-primary); }')

/* ── Content wrapper ── */
w('.content-wrapper { display: flex; flex: 1; overflow: hidden; }');

/* ── Secondary Sidebar ── */
w('.secondary-sidebar { width: 220px; min-width: 220px; background: #fff; border-right: 1px solid rgba(0,0,0,0.06); overflow-y: auto; display: none; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.06) transparent; }');
w('.secondary-sidebar.visible { display: block; }');
w('.secondary-sidebar-header { padding: 20px 16px 12px; }');
w('.secondary-sidebar-title { font-size: 10px; font-weight: 700; color: rgba(0,0,0,0.35); text-transform: uppercase; letter-spacing: 1.2px; margin: 0; }');
w('.category-nav { list-style: none; padding: 0 8px; margin: 0; }');
w('.category-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; color: rgba(0,0,0,0.65); cursor: pointer; font-size: 13.5px; font-weight: 500; border-radius: 10px; position: relative; transition: all 0.2s ease; margin-bottom: 1px; }');
w('.category-item i { width: 24px; height: 24px; background: rgba(0,0,0,0.04); border-radius: 7px; font-size: 11px; color: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; transition: all 0.2s; }');
w('.category-item:hover { background: var(--brand-light); color: var(--brand-primary); }');
w('.category-item:hover i { background: var(--brand-lighter); color: var(--brand-primary); }');
w('.category-item.active { background: var(--brand-primary); color: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }');
w('.category-item.active i { background: rgba(255,255,255,0.2); color: #fff; }');

/* sidebar accordion */
w('.sidebar-accordion { margin: 4px 0; }');
w('.sidebar-accordion-trigger { display: flex; align-items: center; gap: 10px; padding: 8px 12px; width: 100%; background: none; border: none; color: rgba(0,0,0,0.65); cursor: pointer; font-family: var(--font-family); font-size: 13.5px; font-weight: 600; border-radius: 10px; transition: all 0.2s; }');
w('.sidebar-accordion-trigger:hover { background: var(--brand-light); color: var(--brand-primary); }');
w('.sidebar-accordion-trigger i.sa-icon { width: 24px; height: 24px; background: rgba(0,0,0,0.04); border-radius: 7px; font-size: 11px; color: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }');
w('.sidebar-accordion-trigger:hover i.sa-icon { background: var(--brand-lighter); color: var(--brand-primary); }');
w('.sidebar-accordion-trigger .sa-chevron { font-size: 9px; color: rgba(0,0,0,0.3); margin-left: auto; transition: transform 0.3s ease; }');
w('.sidebar-accordion.open .sidebar-accordion-trigger .sa-chevron { transform: rotate(180deg); }');
w('.sidebar-accordion.open .sidebar-accordion-trigger { color: var(--brand-primary); background: var(--brand-light); }');
w('.sidebar-accordion.open .sidebar-accordion-trigger i.sa-icon { background: var(--brand-lighter); color: var(--brand-primary); }');
w('.sidebar-accordion-body { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }');
w('.sidebar-accordion.open .sidebar-accordion-body { max-height: 100%; overflow: auto; }');
w('.sidebar-accordion-body .category-item { padding-left: 24px; font-size: 12.5px; }');
w('.sidebar-accordion-body .category-item i { width: 20px; height: 20px; font-size: 10px; }');

/* ── Content column ── */
w('.content-col { display: flex; flex-direction: column; flex: 1; min-width: 0; overflow: hidden; }');

/* ── Top header bar (outside scroll) ── */
w('.top-header-bar { display: none; background: #fff; border-bottom: 1px solid var(--border-light); flex-shrink: 0; }');
w('.top-header-bar.visible { display: block; }');
w('.top-header-bar > .detail-header { display: flex; align-items: center; gap: 14px; padding: 14px 40px; margin: 0; border-bottom: none; }');
w('.top-header-bar > .page-header { padding: 20px 40px; margin: 0; }');

/* ── Content area ── */
w('.content { flex: 1; min-width: 0; padding: 32px 40px; background: var(--bg-light); overflow-y: auto; }');
w('.view { display: none; }');
w('.view.active { display: block; animation: fadeInUp 0.4s ease; }');
w('@keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }');

/* ── Home page ── */
w('.page-header { margin-bottom: 32px; display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; flex-wrap: wrap; }');
w('.page-header .page-header-text { flex: 1; min-width: 200px; }');
w('.page-title { font-size: 22px; font-weight: 700; color: var(--text-primary); margin: 0 0 8px; }');
w('.page-description { font-size: 15px; color: var(--text-secondary); margin: 0; max-width: 700px; }');
w('.page-header .inline-search { margin-bottom: 0; flex-shrink: 0; align-self: flex-end; }');
w('.home-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; margin-top: 24px; }');
w('.home-card { display: flex; align-items: center; gap: 16px; padding: 24px; background: #fff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.25s ease; text-decoration: none; }');
w('.home-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); border-color: transparent; }');
w('.home-card-icon { width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 14px; color: #fff; font-size: 22px; flex-shrink: 0; }');
w('.home-card-content { flex: 1; }');
w('.home-card-content h3 { font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0 0 4px; }');
w('.home-card-content p { font-size: 13px; color: var(--text-secondary); margin: 0; }');
w('.home-card-arrow { color: var(--text-tertiary); font-size: 14px; transition: transform 0.2s; }');
w('.home-card:hover .home-card-arrow { transform: translateX(4px); color: var(--brand-primary); }');

/* ── Component Card Grid ── */
w('.component-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 22px; }');
w('.component-card { background: #fff; border-radius: 18px; overflow: hidden; cursor: pointer; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); border: 1px solid var(--border-light); position: relative; }');
w('.component-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.1); border-color: var(--brand-primary); }');
w('.component-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--brand-primary); opacity: 0; transition: opacity 0.3s; }');
w('.component-card:hover::before { opacity: 1; }');
w('.component-card-preview { height: 150px; background: var(--bg-light); display: flex; align-items: center; justify-content: center; padding: 20px 24px; border-bottom: 1px solid var(--border-light); overflow: hidden; position: relative; }');
w('.component-card-preview i.card-icon-fallback { font-size: 36px; color: var(--brand-primary); opacity: 0.7; }');
w('.component-card-preview .card-live-preview { transform: scale(0.55); transform-origin: top left; width: 182%; pointer-events: none; max-height: 291px; overflow: hidden; }');
w('.component-card-preview .card-dummy-preview { width: 100%; pointer-events: none; }');
/* Card dummy preview element styles */
w('.cp-field { display: flex; flex-direction: column; gap: 6px; width: 100%; }');
w('.cp-field > label { font-size: 12px; font-weight: 500; color: #555; white-space: nowrap; line-height: 1; text-align: left; }');
w('.cp-field input[type="text"], .cp-field textarea { width: 100%; height: 32px; padding: 0 10px; font-size: 12px; color: #333; background: #fff; border: 1px solid #d0d5dd; border-radius: 6px; outline: none; font-family: inherit; box-sizing: border-box; }');
w('.cp-field textarea { height: 56px; padding: 6px 10px; resize: none; line-height: 1.4; }');
w('.cp-field input.cp-placeholder { color: #999; }');
w('.cp-input-group { width: 100%; display: flex; align-items: center; background: #fff; border: 1px solid #d0d5dd; border-radius: 6px; overflow: hidden; height: 32px; box-sizing: border-box; }');
w('.cp-input-group input[type="text"] { border: none; border-radius: 0; height: 100%; flex: 1; min-width: 0; background: transparent; box-shadow: none; }');
w('.cp-prefix { padding: 0 8px; font-size: 12px; color: #555; background: #f8f9fb; border-right: 1px solid #d0d5dd; height: 100%; display: flex; align-items: center; white-space: nowrap; }');
w('.cp-suffix { padding: 0 8px; font-size: 12px; color: #555; background: #f8f9fb; border-left: 1px solid #d0d5dd; height: 100%; display: flex; align-items: center; }');
w('.cp-icon { padding: 0 8px; font-size: 12px; color: #888; display: flex; align-items: center; }');
w('.cp-tags { width: 100%; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }');
w('.cp-tag { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; background: #f0edfa; color: #333; border: 1px solid #e0dce8; border-radius: 6px; font-size: 11px; font-weight: 500; }');
w('.cp-tag i { font-size: 8px; color: #888; opacity: 0.8; }');
w('.cp-tag-more { font-size: 11px; color: #888; font-weight: 500; }');
w('.cp-ms-fieldset { width: 100%; border: 2px solid #d0d5dd; border-radius: 6px; padding: 6px 8px 8px; margin: 0; background: #fff; }');
w('.cp-ms-legend { font-size: 10px; font-weight: 500; color: var(--brand-primary); padding: 0 4px; margin-left: -2px; line-height: 1; }');
w('.cp-check-group { width: 100%; display: flex; flex-direction: column; gap: 6px; }');
w('.cp-check { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #444; cursor: default; }');
w('.cp-check input { width: 14px; height: 14px; accent-color: var(--brand-primary); }');
w('.cp-toggle { width: 100%; display: flex; align-items: center; gap: 8px; }');
w('.cp-toggle-track { width: 36px; height: 20px; background: #d0d5dd; border-radius: 10px; position: relative; transition: background 0.2s; }');
w('.cp-toggle-track.active { background: var(--brand-primary); }');
w('.cp-toggle-thumb { width: 16px; height: 16px; background: #fff; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: left 0.2s; }');
w('.cp-toggle-track.active .cp-toggle-thumb { left: 18px; }');
w('.cp-toggle span { font-size: 12px; color: #444; }');
w('.cp-multi-row { width: 100%; display: flex; gap: 8px; }');
w('.cp-multi-row input { flex: 1; min-width: 0; }');
w('.cp-multi-col { width: 100%; display: flex; flex-direction: column; gap: 6px; }');
w('.cp-multi-col input { width: 100%; box-sizing: border-box; }');
w('.cp-upload { width: 100%; border: 2px dashed #d0d5dd; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; color: #888; box-sizing: border-box; }');
w('.cp-upload i { font-size: 20px; color: var(--brand-primary); opacity: 0.6; }');
w('.cp-upload span { font-size: 11px; }');
w('.cp-upload b { color: var(--brand-primary); }');
w('.cp-rte { width: 100%; border: 1px solid #d0d5dd; border-radius: 6px; overflow: hidden; box-sizing: border-box; }');
w('.cp-rte-toolbar { display: flex; gap: 2px; padding: 4px 8px; background: #f8f9fb; border-bottom: 1px solid #d0d5dd; }');
w('.cp-rte-toolbar i { font-size: 11px; color: #666; padding: 3px 5px; cursor: default; }');
w('.cp-rte-body { padding: 8px 10px; font-size: 12px; color: #999; min-height: 28px; }');
w('.cp-signature { width: 100%; border: 1px dashed #d0d5dd; border-radius: 6px; padding: 4px 8px; background: #fafbfc; display: flex; align-items: center; justify-content: center; box-sizing: border-box; }');
w('.cp-signature svg { width: 100%; max-width: 120px; height: auto; }');
w('.cp-separator { width: 100%; text-align: center; position: relative; }');
w('.cp-separator hr { border: none; border-top: 1px solid #d0d5dd; }');
w('.cp-separator span { position: relative; top: -10px; background: var(--bg-light); padding: 0 12px; font-size: 12px; color: #666; font-weight: 600; }');
w('.cp-buttons { display: flex; gap: 10px; justify-content: center; }');
w('.cp-btn-primary { padding: 8px 24px; font-size: 12px; font-weight: 600; color: #fff; background: var(--brand-primary); border: none; border-radius: 6px; cursor: default; }');
w('.cp-btn-secondary { padding: 8px 24px; font-size: 12px; font-weight: 600; color: #555; background: #fff; border: 1px solid #d0d5dd; border-radius: 6px; cursor: default; }');
w('.component-card-info { padding: 18px 20px; position: relative; }');
w('.component-card-name { font-size: 15px; font-weight: 700; color: var(--text-primary); margin: 0 0 5px; }');
w('.component-card-desc { font-size: 12.5px; color: var(--text-secondary); line-height: 1.5; margin: 0; }');
w('.component-card-arrow { position: absolute; bottom: 16px; right: 16px; width: 28px; height: 28px; background: var(--bg-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-tertiary); font-size: 11px; transition: all 0.3s; }');
w('.component-card:hover .component-card-arrow { background: var(--brand-primary); color: #fff; transform: translateX(3px); }');

/* ── Section headers ── */
w('.section-header { display: flex; align-items: center; gap: 14px; margin-bottom: 24px; padding-bottom: 10px; border-bottom: 1px solid var(--border-light); }');
w('.section-icon { width: 34px; height: 34px; background: var(--brand-primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 16px; }');
w('.section-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.3px; margin: 0; }');

/* ── Headers hidden inside views (moved to external bar via JS) ── */
w('.view .detail-header { display: none; }');
w('.view .page-header { display: none; }');
w('.detail-icon { width: 36px; height: 36px; background: var(--brand-gradient); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 15px; flex-shrink: 0; }');
w('.detail-info { flex: 1; }');
w('.detail-title { font-size: 18px; font-weight: 700; color: var(--text-primary); margin: 0; letter-spacing: -0.3px; }');
w('.detail-description { font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin: 2px 0 0; max-width: 600px; }');
w('.detail-meta { display: inline-flex; gap: 8px; flex-wrap: wrap; margin-left: auto; }');
w('.meta-tag { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; background: var(--bg-light); border-radius: 16px; font-size: 11.5px; color: var(--text-secondary); font-weight: 500; }');
w('.meta-tag i { font-size: 9px; color: var(--brand-primary); }');

/* ── Variant cards (demo sections) ── */
w('.variant-card { background: #fff; border-radius: 16px; border: 1px solid var(--border-light); margin-bottom: 20px; overflow: hidden; }');
w('.variant-card[data-component="dropdown"] .variant-preview, .variant-card[data-component="multi-select"] .variant-preview { overflow: visible; }');
w('.variant-card[data-component="dropdown"], .variant-card[data-component="multi-select"] { overflow: visible; }');
w('.variant-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-bottom: 1px solid var(--border-light); }');
w('.variant-name { font-size: 15px; font-weight: 600; color: var(--text-primary); margin: 0; }');
w('.variant-code-toggle { display: inline-flex; align-items: center; gap: 6px; padding: 7px 16px; background: transparent; border: 1px solid var(--border-light); border-radius: 10px; font-family: var(--font-family); font-size: 13px; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }');
w('.variant-code-toggle:hover { border-color: var(--brand-primary); color: var(--brand-primary); background: var(--brand-lighter); }');
w('.variant-code-toggle.active { background: var(--brand-primary); color: #fff; border-color: var(--brand-primary); }');
w('.variant-code-toggle i { font-size: 13px; }');
w('.variant-preview { padding: 24px 28px; min-height: 64px; }');
w('.variant-code { display: none; border-top: 1px solid var(--border-light); background: #1e1e2e; max-height: 400px; overflow: auto; }');
w('.variant-card.code-visible .variant-code { display: block; }');
w('.code-tabs { display: flex; background: #2d2d3d; border-bottom: 1px solid #3a3a4e; }');
w('.code-tab { padding: 10px 20px; font-family: var(--font-family); font-size: 13px; color: #888; background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }');
w('.code-tab:hover { color: #ccc; }');
w('.code-tab.active { color: #fff; border-bottom-color: var(--brand-primary); }');
w('.code-tab-content { display: none; padding: 16px 20px; }');
w('.code-tab-content.active { display: block; }');
w('.code-tab-content pre { margin: 0; font-family: "Monaco","Menlo","Courier New",monospace; font-size: 12.5px; line-height: 1.6; color: #e0e0e0; white-space: pre-wrap; word-break: break-all; }');
w('.code-copy-btn { float: right; padding: 4px 14px; font-size: 11px; font-family: var(--font-family); color: #aaa; background: #3a3a4e; border: 1px solid #4a4a5e; border-radius: 6px; cursor: pointer; transition: all 0.15s; }');
w('.code-copy-btn:hover { background: #4a4a5e; color: #fff; }');

/* ── Color picker (variant header) ── */
w('.primary-color-picker-wrap { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: var(--text-secondary); font-family: var(--font-family); }');
w('.primary-color-picker { -webkit-appearance: none; appearance: none; width: 28px; height: 28px; border: 2px solid var(--border-light); border-radius: 6px; cursor: pointer; padding: 0; background: none; }');
w('.primary-color-picker::-webkit-color-swatch-wrapper { padding: 2px; }');
w('.primary-color-picker::-webkit-color-swatch { border: none; border-radius: 3px; }');
w('.primary-color-picker::-moz-color-swatch { border: none; border-radius: 3px; }');
w('.variant-header-actions { display: flex; align-items: center; gap: 16px; }');

/* ── Label Placement Tabs ── */
w('.label-placement-tabs { display: inline-flex; align-items: center; gap: 0; border: 1px solid var(--border-light); border-radius: 6px; overflow: hidden; margin: 0; }');
w('.label-placement-tab { padding: 5px 14px; font-family: var(--font-family); font-size: 12px; font-weight: 600; color: var(--text-secondary); background-color: #fff; border: none; border-right: 1px solid var(--border-light); cursor: pointer; transition: all 0.15s ease; white-space: nowrap; }');
w('.label-placement-tab:last-child { border-right: none; }');
w('.label-placement-tab:hover { background-color: var(--brand-lighter); color: var(--brand-primary); }');
w('.label-placement-tab.is-active { background-color: var(--brand-primary); color: #fff; }');

/* ── Token tables ── */
w('.token-group-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 28px 0 12px; }');
w('.token-group-title:first-child { margin-top: 0; }');
w('.token-desc { font-size: 13.5px; color: var(--text-secondary); margin: 0 0 14px; line-height: 1.6; }');
w('.token-desc code { background: var(--brand-lighter); padding: 1px 6px; border-radius: 4px; font-size: 12px; color: var(--brand-primary); }');
w('.token-table-wrap { overflow-x: auto; margin-bottom: 8px; }');
w('.token-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }');
w('.token-table th { text-align: left; padding: 10px 14px; background: var(--bg-light); border: 1px solid var(--border-light); font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }');
w('.token-table td { padding: 10px 14px; border: 1px solid var(--border-light); vertical-align: middle; }');
w('.token-table code { background: var(--brand-lighter); padding: 2px 7px; border-radius: 4px; font-size: 12px; color: var(--brand-dark); white-space: nowrap; }');

/* ── Color swatches ── */
w('.color-swatch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px; }');
w('.color-swatch-card { border: 1px solid var(--border-light); border-radius: 12px; overflow: hidden; background: #fff; }');
w('.color-swatch { height: 56px; border-bottom: 1px solid var(--border-light); }');
w('.color-swatch-info { padding: 10px 12px; }');
w('.color-swatch-name { font-size: 12px; margin-bottom: 2px; }');
w('.color-swatch-name code { background: var(--brand-lighter); padding: 1px 5px; border-radius: 3px; font-size: 11px; color: var(--brand-dark); }');
w('.color-swatch-value { font-size: 11.5px; color: var(--text-tertiary); font-family: monospace; }');

/* ── Grid demos ── */
w('.grid-demo { margin-bottom: 20px; }');
w('.grid-demo-row { display: flex; gap: 4px; margin-bottom: 6px; }');
w('.grid-demo-col { background: var(--brand-lighter); border: 1px solid var(--brand-light); border-radius: 6px; padding: 10px; text-align: center; font-size: 12px; color: var(--brand-primary); font-weight: 600; }');
w('.flex-demo, .flex-demo-wide, .flex-demo-tall { background: var(--bg-light); border: 1px dashed var(--brand-light); border-radius: 6px; padding: 8px; display: inline-flex; }');
w('.flex-demo-wide { min-width: 250px; }');
w('.flex-demo-tall { min-height: 60px; }');
w('.flex-box { background: var(--brand-primary); color: #fff; width: 32px; min-height: 32px; border-radius: 5px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; }');
w('.spacing-demo-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }');
w('.spacing-demo-box { background: var(--brand-lighter); border: 2px dashed var(--brand-light); border-radius: 6px; font-size: 11px; color: var(--brand-primary); font-weight: 600; text-align: center; }');

/* ── Shared form component styles ── */
w('.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0; }');
w('.form-field { margin-bottom: var(--field-margin-bottom); display: flex; align-items: flex-start; gap: 16px; }');
w('fieldset.form-field { border: none; padding: 0; }');
w('.form-label { font-family: var(--font-family); font-size: var(--font-size-base); font-weight: 400; color: var(--text-primary); line-height: var(--input-height); min-width: 140px; text-align: right; }');
w('.form-required { color: #E61F1F; margin-left: 2px; }');
w('.form-input-wrapper { flex: 1; max-width: 240px; }');
w('.form-input { width: 100%; height: var(--input-height); padding: 0 12px; font-family: var(--font-family); font-size: var(--font-size-base); color: var(--text-primary); background: #fff; border: 1px solid var(--primary-border-color); border-radius: var(--input-border-radius); line-height: 34px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }');
w('.form-input::placeholder { color: var(--text-tertiary); }');
w('.form-input:hover { border-color: var(--primary-color); }');
w('.form-input:focus { border-color: var(--primary-color); box-shadow: 0 0 0 0.5px var(--primary-color); }');
w('.form-input:disabled { background: var(--disable-color); color: var(--disable-text-color); cursor: not-allowed; }');
w('.form-select { width: 100%; height: var(--input-height); padding: 0 12px; font-family: var(--font-family); font-size: var(--font-size-base); color: var(--text-primary); background: #fff; border: 1px solid var(--primary-border-color); border-radius: var(--input-border-radius); outline: none; cursor: pointer; }');
w('.form-select:hover { border-color: var(--primary-color); }');
w('.form-select:focus { border-color: var(--primary-color); box-shadow: 0 0 0 0.5px var(--primary-color); }');
w('.form-hint { font-size: 12px; color: var(--tertiary-text-color); margin-top: 4px; }');
w('.fieldErrorMsg { display: flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 12px; color: #E61F1F; line-height: 1.4; }');
w('.fieldErrorMsg[hidden] { display: none; }');
w('.fieldErrorMsg-icon { width: 14px; height: 14px; flex-shrink: 0; stroke: #E61F1F; }');
w('.validationError .form-input, .validationError .form-textarea { border-color: #E61F1F; box-shadow: 0 0 0 0.5px #E61F1F; }');
w('.form-label-spacer { min-width: 140px; }');

/* ── Report demo container ── */
w('.report-demo { overflow: auto; border-radius: 0; background: var(--primary-bg-color); max-height: 600px; }');
w('.report-demo .zc-card-list { min-width: 380px; max-width: 380px; }');

/* ── All-Components listing ── */
w('.all-comp-section { margin-bottom: 36px; }');
w('.all-comp-item { background: #fff; border: 1px solid var(--border-light); border-radius: 14px; padding: 24px 28px; margin-bottom: 16px; }');
w('.all-comp-item-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-light); }');
w('.all-comp-item-title { font-size: 16px; font-weight: 700; color: var(--brand-primary); margin: 0; display: flex; align-items: center; gap: 8px; }');
w('.all-comp-item-title i { font-size: 14px; }');

/* ── Accordion ── */
w('.accordion { background: #fff; border: 1px solid var(--border-light); border-radius: 16px; margin-top: 24px; overflow: hidden; }');
w('.accordion-header { display: flex; align-items: center; gap: 14px; padding: 18px 24px; cursor: pointer; transition: background 0.2s; user-select: none; }');
w('.accordion-header:hover { background: var(--brand-lighter); }');
w('.accordion-icon { width: 42px; height: 42px; background: var(--brand-gradient); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 18px; flex-shrink: 0; }');
w('.accordion-info { flex: 1; min-width: 0; }');
w('.accordion-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin: 0; }');
w('.accordion-desc { font-size: 13px; color: var(--text-secondary); margin: 2px 0 0; }');
w('.accordion-badge { font-size: 12px; font-weight: 600; background: var(--brand-lighter); color: var(--brand-primary); padding: 4px 12px; border-radius: 20px; }');
w('.accordion-chevron { font-size: 14px; color: var(--text-tertiary); transition: transform 0.3s ease; }');
w('.accordion.open .accordion-chevron { transform: rotate(180deg); }');
w('.accordion-body { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }');
w('.accordion.open .accordion-body { max-height: 5000px; }');
w('.accordion-body-inner { padding: 0 24px 24px; }');
w('.sub-accordion { margin-top: 8px; border: 1px solid var(--border-light); }');
w('.sub-accordion .accordion-header { padding: 14px 18px; }');
w('.sub-accordion .accordion-icon { width: 36px; height: 36px; font-size: 15px; }');
w('.sub-accordion .accordion-title { font-size: 14px; }');
w('.sub-accordion .accordion-desc { font-size: 12px; }');
w('.sub-accordion .accordion-body-inner { padding: 0 18px 18px; }');
w('.create-comp-layout { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr); gap: 24px; align-items: start; }');
w('.create-comp-panel { background: #fff; border: 1px solid var(--border-light); border-radius: 16px; padding: 24px; }');
w('.create-comp-panel h2 { font-size: 18px; margin: 0 0 8px; color: var(--text-primary); }');
w('.create-comp-panel p { margin: 0 0 16px; color: var(--text-secondary); line-height: 1.6; }');
w('.create-comp-label { display: block; font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }');
w('.create-comp-textarea { width: 100%; min-height: 132px; resize: vertical; border: 1px solid var(--border-light); border-radius: 12px; padding: 14px 16px; font: inherit; color: var(--text-primary); background: #fff; transition: border-color 0.2s ease, box-shadow 0.2s ease; }');
w('.create-comp-textarea:focus { outline: none; border-color: var(--brand-primary); box-shadow: 0 0 0 3px rgba(13, 78, 242, 0.12); }');
w('.create-comp-file-input { display: block; width: 100%; border: 1px dashed var(--border-light); border-radius: 12px; padding: 12px 14px; background: #fbfcff; color: var(--text-primary); }');
w('.create-comp-file-input:focus { outline: none; border-color: var(--brand-primary); box-shadow: 0 0 0 3px rgba(13, 78, 242, 0.12); }');
w('.create-comp-image-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px; align-items: center; margin-top: 18px; }');
w('.create-comp-image-meta { margin-top: 10px; font-size: 12px; color: var(--text-secondary); }');
w('.create-comp-image-preview { margin-top: 14px; border: 1px solid var(--border-light); border-radius: 12px; background: #fbfcff; padding: 12px; min-height: 92px; display: flex; align-items: center; justify-content: center; }');
w('.create-comp-image-preview img { display: block; max-width: 100%; max-height: 220px; border-radius: 8px; }');
w('.create-comp-image-preview.is-empty { color: var(--text-secondary); font-size: 12px; border-style: dashed; }');
w('.create-comp-hint { font-size: 13px; color: var(--text-secondary); margin-top: 10px; }');
w('.create-comp-actions { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; margin-top: 20px; }');
w('.create-comp-btn, .create-comp-link-btn { appearance: none; border: 0; border-radius: 10px; padding: 12px 18px; font: inherit; font-weight: 700; cursor: pointer; transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease; }');
w('.create-comp-btn { background: linear-gradient(135deg, #0D4EF2, #3D6FF5); color: #fff; box-shadow: 0 10px 18px rgba(13, 78, 242, 0.18); }');
w('.create-comp-btn:hover, .create-comp-link-btn:hover { transform: translateY(-1px); }');
w('.create-comp-btn[disabled] { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }');
w('.create-comp-link-btn { background: #eef4ff; color: #0D4EF2; }');
w('.create-comp-server-note { font-size: 12px; color: var(--text-tertiary); }');
w('.create-comp-status { margin-top: 16px; border-radius: 12px; padding: 14px 16px; font-size: 13px; line-height: 1.5; background: #f8f8fb; color: var(--text-secondary); border: 1px solid var(--border-light); }');
w('.create-comp-status.is-error { background: #fff3f3; border-color: #ffc9c9; color: #b42318; }');
w('.create-comp-status.is-success { background: #eefbf3; border-color: #b7ebc6; color: #067647; }');
w('.create-comp-status.is-working { background: #eef4ff; border-color: #c7d7ff; color: #0D4EF2; }');
w('.create-comp-preview-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }');
w('.create-comp-preview-item { display: flex; justify-content: space-between; gap: 16px; align-items: center; padding: 12px 14px; border-radius: 12px; background: #f8f8fb; border: 1px solid var(--border-light); }');
w('.create-comp-preview-item span { font-size: 12px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.04em; }');
w('.create-comp-preview-item code { font-size: 13px; color: var(--text-primary); word-break: break-all; }');
w('.create-comp-section-title { margin: 18px 0 8px; font-size: 12px; font-weight: 700; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.04em; }');
w('.create-comp-pill-list, .create-comp-note-list { list-style: none; padding: 0; margin: 10px 0 0; display: flex; flex-wrap: wrap; gap: 8px; }');
w('.create-comp-pill-list li { padding: 7px 10px; border-radius: 999px; background: #eef4ff; color: #0D4EF2; font-size: 12px; font-weight: 700; }');
w('.create-comp-note-list { flex-direction: column; gap: 8px; }');
w('.create-comp-note-list li { padding: 10px 12px; border-radius: 10px; background: #fbfcff; border: 1px solid var(--border-light); color: var(--text-secondary); font-size: 12px; line-height: 1.5; }');
w('.create-comp-note-list.is-warning li { background: #fffaf0; border-color: #f5d38a; color: #8a5a00; }');
w('.create-comp-file-list { list-style: none; padding: 0; margin: 16px 0 0; display: flex; flex-direction: column; gap: 8px; }');
w('.create-comp-file-list li { padding: 10px 12px; border-radius: 10px; background: #fbfcff; border: 1px solid var(--border-light); color: var(--text-primary); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; }');
w('.create-comp-preview-empty { border: 1px dashed var(--border-light); border-radius: 12px; padding: 18px; color: var(--text-secondary); background: #fbfcff; }');
w('.create-comp-result-actions { margin-top: 16px; display: flex; gap: 12px; flex-wrap: wrap; }');
w('@media (max-width: 720px) { .create-comp-image-row { grid-template-columns: 1fr; } }');
w('@media (max-width: 1080px) { .create-comp-layout { grid-template-columns: 1fr; } }');

/* sidebar nested sub-accordion */
w('.sidebar-sub-accordion { margin: 0 0 2px 0; }');
w('.sidebar-sub-accordion .sidebar-accordion-trigger { padding-left: 22px; font-size: 13px; }');
w('.sidebar-sub-accordion .sidebar-accordion-body .category-item { padding-left: 34px; font-size: 12px; }');

/* ── Component-specific CSS ── */
w('/* ── Form Component CSS ── */');
w(formAllCss);
w(formVisualParityCss);

/* Creator / OG_form_dom_reference parity: same chrome on detail + All Components (#all) */
w('/* ── Creator OG live-form parity (matches OG_form_dom_reference + product canvas) ── */');
w('.variant-card .variant-preview, #view-all .all-comp-item .variant-preview:not(.report-demo) {');
w('  --color-border: #CBCBDC;');
w('  --primary-border-color: #CBCBDC;');
w('  --input-border-radius: 8px;');
w('  --field-margin-bottom: 24px;');
w('  background: #fff;');
w('  box-sizing: border-box;');
w('}');
w('.variant-card .variant-preview form.form-table, #view-all .all-comp-item .variant-preview:not(.report-demo) form.form-table {');
w('  margin: 0;');
w('}');
w('.variant-preview .form-control, .variant-preview textarea.form-control, .variant-preview select.form-control,');
w('.variant-preview input.form-control:not(.zc-checkbox-input):not(.zc-radio-input):not(.zc-decision-input):not(.zc-otp-input):not(.zc-select2-input), .variant-preview button.form-control { border-radius: 6px; }');
w('.variant-preview .zc-help-txt, .variant-preview .zc-help-txt { color: #606189; font-size: 12px; }');

w('/* ── Report CSS ── */');
w(reportAllCss);

/* ── Card Layout Configurator CSS ── */
w('/* ── Card Layout Configurator ── */');
/* Card Type visual selector */
w('.cfg-type-selector { margin-bottom: 24px; }');
w('.cfg-type-selector .cfg-label { font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }');
w('.cfg-type-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; }');
w('.cfg-type-card { background: #fff; border: 2px solid var(--border-light); border-radius: 14px; padding: 16px; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; gap: 12px; position: relative; }');
w('.cfg-type-card:hover { border-color: var(--brand-primary); box-shadow: 0 4px 16px rgba(13,78,242,0.1); transform: translateY(-2px); }');
w('.cfg-type-card.active { border-color: var(--brand-primary); background: #f0f4ff; box-shadow: 0 4px 16px rgba(13,78,242,0.15); }');
w('.cfg-type-card.active::after { content: "\\f00c"; font-family: "Font Awesome 6 Free"; font-weight: 900; position: absolute; top: 10px; right: 10px; width: 22px; height: 22px; background: var(--brand-primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; }');
w('.cfg-type-wireframe { background: var(--bg-light); border-radius: 8px; padding: 12px; display: flex; align-items: center; justify-content: center; }');
w('.cfg-type-wireframe svg { width: 100%; height: auto; max-height: 64px; }');
w('.cfg-type-info { }');
w('.cfg-type-title { font-size: 14px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }');
w('.cfg-type-desc { font-size: 12px; color: var(--text-secondary); line-height: 1.45; }');
/* Sub-tab panel */
w('.cfg-subtab-panel { background: var(--bg-white); border: 1px solid var(--border-color, #e2e8f0); border-radius: 12px; padding: 24px; margin-bottom: 24px; }');
w('.cfg-subtab-panel .cfg-row { display: flex; flex-wrap: wrap; gap: 24px; align-items: flex-start; }');
w('.cfg-group { display: flex; flex-direction: column; gap: 8px; }');
w('.cfg-label { font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; }');
w('.cfg-pills { display: flex; gap: 6px; flex-wrap: wrap; }');
w('.cfg-pill { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 8px; border: 1px solid var(--border-color, #e2e8f0); background: var(--bg-white); color: var(--text-secondary); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }');
w('.cfg-pill:hover { border-color: #0D4EF2; color: #0D4EF2; background: #f0f4ff; }');
w('.cfg-pill.active { background: #0D4EF2; color: #fff; border-color: #0D4EF2; box-shadow: 0 2px 8px rgba(13,78,242,0.25); }');
w('.cfg-pill i { font-size: 12px; }');

w('.cfg-group[style*="display: none"] { display: none !important; }');

w('</style>');
w('</head>');
w('<body>');
w('<div class="app-layout">');

/* ═══ SIDEBAR ═══ */
w('<aside class="sidebar">');
w('  <div class="brand-section">');
w('    <div class="brand-logo-container">');
w('      <img src="assets/Creator-logo.jpg" alt="Live App Logo">');
w('    </div>');
w('    <div class="brand-name">Live App</div>');
w('    <div class="brand-tagline">Design System</div>');
w('  </div>');
w('  <nav class="sidebar-nav">');
w('    <p class="nav-section-title">Navigation</p>');
w('    <a class="nav-item active" data-view="home"><i class="fa-solid fa-house"></i> Home</a>');
w('    <a class="nav-item" data-view="tokens"><i class="fa-solid fa-swatchbook"></i> Tokens</a>');
w('    <a class="nav-item" data-view="form-fields"><i class="fas fa-cube"></i> Form Fields<span class="nav-badge">' + formData.length + '</span></a>');
w('    <a class="nav-item" data-view="create-component"><i class="fa-solid fa-wand-magic-sparkles"></i> Create New Component</a>');
w('    <a class="nav-item" data-view="reports"><i class="fa-solid fa-chart-column"></i> Reports<span class="nav-badge">' + (coreReportData.length + cardReportData.length) + '</span></a>');
w('    <a class="nav-item" data-view="all"><i class="fa-solid fa-layer-group"></i> All Components<span class="nav-badge">' + (formData.length + coreReportData.length + cardReportData.length) + '</span></a>');
w('  </nav>');
w('</aside>');

/* ═══ MAIN WRAPPER ═══ */
w('<div class="main-wrapper">');

/* Top Header removed — search moved inline */

/* Content wrapper */
w('<div class="content-wrapper">');

/* ── Secondary Sidebar ── */
w('<aside class="secondary-sidebar" id="secondarySidebar">');
w('  <div class="secondary-sidebar-header"><p class="secondary-sidebar-title">Pages</p></div>');
w('  <div class="sidebar-search"><input type="text" placeholder="Search pages..." id="sidebarSearchInput" autocomplete="off"></div>');
w('  <ul class="category-nav" id="secondaryNavList"></ul>');
w('</aside>');

/* ── Content column (detail bar + scrollable main) ── */
w('<div class="content-col">');
w('<div class="top-header-bar" id="topHeaderBar"></div>');
w('<main class="content" id="mainContent">');

/* ════════════════════════════════════════
   VIEW: HOME
   ════════════════════════════════════════ */
w('<div class="view active" id="view-home">');
w('  <div class="page-header">');
w('    <div class="page-header-text">');
w('      <h1 class="page-title">Welcome to Live App Design System</h1>');
w('      <p class="page-description">Your comprehensive guide to building consistent, beautiful user interfaces. Explore our components, tokens, and resources.</p>');
w('    </div>');
w('  </div>');
w('  <div class="home-grid">');
w('    <a class="home-card" data-navigate="tokens">');
w('      <div class="home-card-icon" style="background:linear-gradient(135deg,#0D4EF2,#3D6FF5)"><i class="fa-solid fa-swatchbook"></i></div>');
w('      <div class="home-card-content"><h3>Design Tokens</h3><p>Typography, colors &amp; layout utilities</p></div>');
w('      <i class="fa-solid fa-arrow-right home-card-arrow"></i>');
w('    </a>');
w('    <a class="home-card" data-navigate="form-fields">');
w('      <div class="home-card-icon" style="background:linear-gradient(135deg,#10B981,#059669)"><i class="fas fa-cube"></i></div>');
w('      <div class="home-card-content"><h3>Form Fields</h3><p>' + formData.length + ' form input components</p></div>');
w('      <i class="fa-solid fa-arrow-right home-card-arrow"></i>');
w('    </a>');
w('    <a class="home-card" data-navigate="create-component">');
w('      <div class="home-card-icon" style="background:linear-gradient(135deg,#EC4899,#DB2777)"><i class="fa-solid fa-wand-magic-sparkles"></i></div>');
w('      <div class="home-card-content"><h3>Create New Component</h3><p>Generate a starter scaffold under forms/</p></div>');
w('      <i class="fa-solid fa-arrow-right home-card-arrow"></i>');
w('    </a>');
w('    <a class="home-card" data-navigate="reports">');
w('      <div class="home-card-icon" style="background:linear-gradient(135deg,#8B5CF6,#6D28D9)"><i class="fa-solid fa-chart-column"></i></div>');
w('      <div class="home-card-content"><h3>Reports</h3><p>Calendar, kanban, timeline &amp; cards</p></div>');
w('      <i class="fa-solid fa-arrow-right home-card-arrow"></i>');
w('    </a>');
w('    <a class="home-card" data-navigate="all">');
w('      <div class="home-card-icon" style="background:linear-gradient(135deg,#F59E0B,#D97706)"><i class="fa-solid fa-layer-group"></i></div>');
w('      <div class="home-card-content"><h3>All Components</h3><p>Complete listing of all components</p></div>');
w('      <i class="fa-solid fa-arrow-right home-card-arrow"></i>');
w('    </a>');
w('  </div>');
w('</div>');

/* ════════════════════════════════════════
   VIEW: TOKENS OVERVIEW
   ════════════════════════════════════════ */
w('<div class="view" id="view-tokens">');
w('  <div class="page-header">');
w('    <div class="page-header-text">');
w('      <h1 class="page-title">Design Tokens</h1>');
w('      <p class="page-description">Design tokens are the visual design atoms of the design system \u2014 specifically, they are named entities that store visual design attributes.</p>');
w('    </div>');
w('  </div>');
w('  <div class="component-grid">');
w('    <div class="component-card" data-detail="tokens/typography"><div class="component-card-preview"><i class="fa-solid fa-font fa-2x"></i></div><div class="component-card-info"><p class="component-card-name">Typography</p><p class="component-card-desc">Font sizes, weights, families, and letter spacing.</p><span class="component-card-arrow"><i class="fa-solid fa-arrow-right"></i></span></div></div>');
w('    <div class="component-card" data-detail="tokens/colors"><div class="component-card-preview"><i class="fa-solid fa-palette fa-2x"></i></div><div class="component-card-info"><p class="component-card-name">Colors</p><p class="component-card-desc">Color variables for backgrounds, text, borders, and more.</p><span class="component-card-arrow"><i class="fa-solid fa-arrow-right"></i></span></div></div>');
w('    <div class="component-card" data-detail="tokens/grid"><div class="component-card-preview"><i class="fa-solid fa-table-columns fa-2x"></i></div><div class="component-card-info"><p class="component-card-name">Grid &amp; Flex</p><p class="component-card-desc">Responsive grid system, flex utilities, spacing, and breakpoints.</p><span class="component-card-arrow"><i class="fa-solid fa-arrow-right"></i></span></div></div>');
w('  </div>');
w('</div>');

/* ════════════════════════════════════════
   VIEW: TOKENS / TYPOGRAPHY DETAIL
   ════════════════════════════════════════ */
w('<div class="view" id="view-tokens-typography">');
w('  <div class="detail-header">');
w('    <div class="detail-icon"><i class="fa-solid fa-font"></i></div>');
w('    <div class="detail-info">');
w('      <h1 class="detail-title">Typography</h1>');
w('      <p class="detail-description">Font size scale, weights, families, and letter spacing tokens from _general_variables.scss.</p>');
w('      <div class="detail-meta"><span class="meta-tag"><i class="fa-solid fa-cube"></i> Tokens</span><span class="meta-tag"><i class="fa-solid fa-ruler"></i> 17 Font Sizes</span><span class="meta-tag"><i class="fa-solid fa-weight-hanging"></i> 4 Weights</span></div>');
w('    </div>');
w('  </div>');

/* Font Size Table */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Font Size Scale</p></div><div class="variant-preview">');
w('    <div class="token-table-wrap"><table class="token-table"><thead><tr><th>Name</th><th>SCSS Variable</th><th>Size (px)</th><th>Size (rem)</th><th>Preview</th></tr></thead><tbody>');
var fontSizes = [
  ['Extra Tiny','$zc-font-extra-tiny','8px','0.5rem'],
  ['Tiny','$zc-font-tiny','10px','0.625rem'],
  ['Extra Small','$zc-font-extra-small','11px','0.6875rem'],
  ['Small','$zc-font-small','12px','0.75rem'],
  ['1x Small','$zc-font-1x-small','13px','0.8125rem'],
  ['Medium','$zc-font-medium','14px','0.875rem'],
  ['Regular','$zc-font-regular','14.5px','0.90625rem'],
  ['Extra Regular','$zc-font-extra-regular','15px','0.9375rem'],
  ['Large','$zc-font-large','16px','1rem'],
  ['Extra Large','$zc-font-extra-large','18px','1.125rem'],
  ['1x Large','$zc-font-1x-large','20px','1.25rem'],
  ['2x Large','$zc-font-2x-large','22px','1.375rem'],
  ['3x Large','$zc-font-3x-large','24px','1.5rem'],
  ['4x Large','$zc-font-4x-large','26px','1.625rem'],
  ['5x Large','$zc-font-5x-large','28px','1.75rem'],
  ['6x Large','$zc-font-6x-large','30px','1.875rem'],
  ['7x Large','$zc-font-7x-large','32px','2rem']
];
fontSizes.forEach(function(s){
  w('      <tr><td>'+s[0]+'</td><td><code>'+s[1]+'</code></td><td>'+s[2]+'</td><td>'+s[3]+'</td><td><span style="font-size:'+s[2]+'">The quick brown fox</span></td></tr>');
});
w('    </tbody></table></div>');
w('  </div></div>');

/* Font Weight Table */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Font Weights</p></div><div class="variant-preview">');
w('    <div class="token-table-wrap"><table class="token-table"><thead><tr><th>Name</th><th>SCSS Variable</th><th>Value</th><th>Preview</th></tr></thead><tbody>');
[['Light','$zc-font-weight-light','300'],['Regular','$zc-font-weight-regular','400'],['Semibold','$zc-font-weight-semibold','600'],['Bold','$zc-font-weight-bold','700']].forEach(function(wt){
  w('      <tr><td>'+wt[0]+'</td><td><code>'+wt[1]+'</code></td><td>'+wt[2]+'</td><td><span style="font-weight:'+wt[2]+';font-size:16px">The quick brown fox jumps over the lazy dog</span></td></tr>');
});
w('    </tbody></table></div>');
w('  </div></div>');

/* Font Families */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Font Families</p></div><div class="variant-preview">');
w('    <div class="token-table-wrap"><table class="token-table"><thead><tr><th>Name</th><th>SCSS Variable</th><th>Value</th><th>Preview</th></tr></thead><tbody>');
[['Lato','$zc-lato','"Lato", sans-serif'],['ZohoPuvi','$zc-puvi','"ZohoPuvi", sans-serif'],['OpenSans','$zc-opensans','"OpenSans", sans-serif'],['Monaco','$zc-monaco','"monaco", monospace']].forEach(function(f){
  w('      <tr><td>'+f[0]+'</td><td><code>'+f[1]+'</code></td><td>'+f[2]+'</td><td><span style="font-family:'+f[2]+';font-size:16px">The quick brown fox jumps</span></td></tr>');
});
w('    </tbody></table></div>');
w('  </div></div>');

/* Letter Spacing */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Letter Spacing</p></div><div class="variant-preview">');
w('    <div class="token-table-wrap"><table class="token-table"><thead><tr><th>Name</th><th>SCSS Variable</th><th>Value</th><th>Preview</th></tr></thead><tbody>');
w('      <tr><td>Small</td><td><code>$size_small</code></td><td>0.1px</td><td><span style="letter-spacing:0.1px;font-size:16px">The quick brown fox jumps</span></td></tr>');
w('      <tr><td>Medium</td><td><code>$size_medium</code></td><td>0.2px</td><td><span style="letter-spacing:0.2px;font-size:16px">The quick brown fox jumps</span></td></tr>');
w('    </tbody></table></div>');
w('  </div></div>');
w('</div>');

/* ════════════════════════════════════════
   VIEW: TOKENS / COLORS DETAIL
   ════════════════════════════════════════ */
w('<div class="view" id="view-tokens-colors">');
w('  <div class="detail-header">');
w('    <div class="detail-icon"><i class="fa-solid fa-palette"></i></div>');
w('    <div class="detail-info">');
w('      <h1 class="detail-title">Colors</h1>');
w('      <p class="detail-description">Color system variables from color_variables.css, organized by category.</p>');
w('      <div class="detail-meta"><span class="meta-tag"><i class="fa-solid fa-cube"></i> Tokens</span><span class="meta-tag"><i class="fa-solid fa-droplet"></i> ' + allColorGroups.reduce(function(a,g){return a+g.vars.length;},0) + ' Variables</span></div>');
w('    </div>');
w('  </div>');

allColorGroups.forEach(function(g){
  w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">' + g.name + '</p></div><div class="variant-preview">');
  w('    <div class="color-swatch-grid">');
  g.vars.forEach(function(v){
    w('      <div class="color-swatch-card"><div class="color-swatch" style="background:'+v.value+'"></div><div class="color-swatch-info"><div class="color-swatch-name"><code>'+v.name+'</code></div><div class="color-swatch-value">'+v.value+'</div></div></div>');
  });
  w('    </div>');
  w('  </div></div>');
});
w('</div>');

/* ════════════════════════════════════════
   VIEW: TOKENS / GRID DETAIL
   ════════════════════════════════════════ */
w('<div class="view" id="view-tokens-grid">');
w('  <div class="detail-header">');
w('    <div class="detail-icon"><i class="fa-solid fa-table-columns"></i></div>');
w('    <div class="detail-info">');
w('      <h1 class="detail-title">Grid &amp; Flex Utilities</h1>');
w('      <p class="detail-description">Responsive 12-column grid system, flex layout utilities, spacing helpers, and breakpoints from grid.css.</p>');
w('      <div class="detail-meta"><span class="meta-tag"><i class="fa-solid fa-cube"></i> Utilities</span><span class="meta-tag"><i class="fa-solid fa-arrows-left-right-to-line"></i> 12 Columns</span><span class="meta-tag"><i class="fa-solid fa-mobile-screen"></i> 5 Breakpoints</span></div>');
w('    </div>');
w('  </div>');

/* Grid Columns */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Grid Columns</p></div><div class="variant-preview">');
w('    <div class="grid-demo">');
w('      <div class="grid-demo-row"><div class="grid-demo-col" style="flex:0 0 100%">.zc-col-12</div></div>');
w('      <div class="grid-demo-row"><div class="grid-demo-col" style="flex:0 0 50%">.zc-col-6</div><div class="grid-demo-col" style="flex:0 0 50%">.zc-col-6</div></div>');
w('      <div class="grid-demo-row"><div class="grid-demo-col" style="flex:0 0 33.333%">.zc-col-4</div><div class="grid-demo-col" style="flex:0 0 33.333%">.zc-col-4</div><div class="grid-demo-col" style="flex:0 0 33.333%">.zc-col-4</div></div>');
w('      <div class="grid-demo-row"><div class="grid-demo-col" style="flex:0 0 25%">.zc-col-3</div><div class="grid-demo-col" style="flex:0 0 25%">.zc-col-3</div><div class="grid-demo-col" style="flex:0 0 25%">.zc-col-3</div><div class="grid-demo-col" style="flex:0 0 25%">.zc-col-3</div></div>');
w('    </div>');
w('  </div></div>');

/* Flex Utilities */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Flex Layout Utilities</p></div><div class="variant-preview">');
w('    <div class="token-table-wrap"><table class="token-table"><thead><tr><th>Class</th><th>CSS Property</th><th>Demo</th></tr></thead><tbody>');
w('      <tr><td><code>.zc-flex</code></td><td>display: flex</td><td><div class="flex-demo" style="display:flex;gap:6px"><div class="flex-box">1</div><div class="flex-box">2</div><div class="flex-box">3</div></div></td></tr>');
w('      <tr><td><code>.zc-inline-flex</code></td><td>display: inline-flex</td><td><div class="flex-demo" style="display:inline-flex;gap:6px"><div class="flex-box">1</div><div class="flex-box">2</div></div></td></tr>');
w('      <tr><td><code>.zc-row</code></td><td>display: flex; flex-wrap: wrap</td><td><div class="flex-demo" style="display:flex;flex-wrap:wrap;gap:6px;max-width:120px"><div class="flex-box">1</div><div class="flex-box">2</div><div class="flex-box">3</div><div class="flex-box">4</div></div></td></tr>');
w('    </tbody></table></div>');
w('  </div></div>');

/* Justify */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Justify Content</p></div><div class="variant-preview">');
w('    <div class="token-table-wrap"><table class="token-table"><thead><tr><th>Class</th><th>CSS</th><th>Demo</th></tr></thead><tbody>');
w('      <tr><td><code>.zc-justify-start</code></td><td>justify-content: flex-start</td><td><div class="flex-demo-wide" style="display:flex;justify-content:flex-start;gap:6px"><div class="flex-box">1</div><div class="flex-box">2</div><div class="flex-box">3</div></div></td></tr>');
w('      <tr><td><code>.zc-justify-center</code></td><td>justify-content: center</td><td><div class="flex-demo-wide" style="display:flex;justify-content:center;gap:6px"><div class="flex-box">1</div><div class="flex-box">2</div><div class="flex-box">3</div></div></td></tr>');
w('      <tr><td><code>.zc-justify-end</code></td><td>justify-content: flex-end</td><td><div class="flex-demo-wide" style="display:flex;justify-content:flex-end;gap:6px"><div class="flex-box">1</div><div class="flex-box">2</div><div class="flex-box">3</div></div></td></tr>');
w('      <tr><td><code>.zc-justify-space-between</code></td><td>justify-content: space-between</td><td><div class="flex-demo-wide" style="display:flex;justify-content:space-between"><div class="flex-box">1</div><div class="flex-box">2</div><div class="flex-box">3</div></div></td></tr>');
w('    </tbody></table></div>');
w('  </div></div>');

/* Align */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Align Items</p></div><div class="variant-preview">');
w('    <div class="token-table-wrap"><table class="token-table"><thead><tr><th>Class</th><th>CSS</th><th>Demo</th></tr></thead><tbody>');
w('      <tr><td><code>.zc-align-items-start</code></td><td>align-items: flex-start</td><td><div class="flex-demo-tall" style="display:flex;align-items:flex-start;gap:6px"><div class="flex-box" style="height:20px">1</div><div class="flex-box" style="height:35px">2</div><div class="flex-box" style="height:25px">3</div></div></td></tr>');
w('      <tr><td><code>.zc-align-items-center</code></td><td>align-items: center</td><td><div class="flex-demo-tall" style="display:flex;align-items:center;gap:6px"><div class="flex-box" style="height:20px">1</div><div class="flex-box" style="height:35px">2</div><div class="flex-box" style="height:25px">3</div></div></td></tr>');
w('      <tr><td><code>.zc-align-items-end</code></td><td>align-items: flex-end</td><td><div class="flex-demo-tall" style="display:flex;align-items:flex-end;gap:6px"><div class="flex-box" style="height:20px">1</div><div class="flex-box" style="height:35px">2</div><div class="flex-box" style="height:25px">3</div></div></td></tr>');
w('      <tr><td><code>.zc-align-items-stretch</code></td><td>align-items: stretch</td><td><div class="flex-demo-tall" style="display:flex;align-items:stretch;gap:6px"><div class="flex-box">1</div><div class="flex-box">2</div><div class="flex-box">3</div></div></td></tr>');
w('    </tbody></table></div>');
w('  </div></div>');

/* Spacing */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Spacing Utilities</p></div><div class="variant-preview">');
w('    <p class="token-desc">Padding: <code>.zc-p-{n}</code>, <code>.zc-pt-{n}</code>, <code>.zc-pr-{n}</code>, <code>.zc-pb-{n}</code>, <code>.zc-pl-{n}</code>, <code>.zc-px-{n}</code>, <code>.zc-py-{n}</code><br>Margin: same pattern with <code>.zc-m-</code>. Scale: <code>0</code>=0px to <code>40</code>=40px.</p>');
w('    <div class="spacing-demo-row">');
[4,8,12,16,20,24,32].forEach(function(n){ w('      <div class="spacing-demo-box" style="padding:'+n+'px">p-'+n+'</div>'); });
w('    </div>');
w('  </div></div>');

/* Breakpoints */
w('  <div class="variant-card"><div class="variant-header"><p class="variant-name">Responsive Breakpoints</p></div><div class="variant-preview">');
w('    <div class="token-table-wrap"><table class="token-table"><thead><tr><th>Breakpoint</th><th>Max Width</th><th>Column Prefix</th></tr></thead><tbody>');
w('      <tr><td>Default</td><td>&gt; 1280px</td><td><code>.zc-col-{n}</code></td></tr>');
w('      <tr><td>Large</td><td>&le; 1280px</td><td><code>.zc-lg-col-{n}</code></td></tr>');
w('      <tr><td>Medium</td><td>&le; 992px</td><td><code>.zc-md-col-{n}</code></td></tr>');
w('      <tr><td>Small</td><td>&le; 768px</td><td><code>.zc-sm-col-{n}</code></td></tr>');
w('      <tr><td>Extra Small</td><td>&le; 576px</td><td><code>.zc-xs-col-{n}</code></td></tr>');
w('    </tbody></table></div>');
w('  </div></div>');
w('</div>');

/* ════════════════════════════════════════
   VIEW: FORM FIELDS OVERVIEW (CARD GRID)
   ════════════════════════════════════════ */
w('<div class="view" id="view-form-fields">');
w('  <div class="page-header">');
w('    <div class="page-header-text">');
w('      <h1 class="page-title">Form Fields</h1>');
w('      <p class="page-description">Interactive form field components for capturing user input. Each component includes live previews and source code.</p>');
w('    </div>');
w('    <div class="inline-search"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search form components..." id="formFieldSearchInput" autocomplete="off"><span class="search-shortcut">\u2318K</span></div>');
w('  </div>');
w('  <div class="section-header"><div class="section-icon"><i class="fas fa-cube"></i></div><h2 class="section-title">Form Components</h2></div>');
w('  <div class="component-grid" id="formFieldGrid">');
formData.forEach(function(comp) {
  var preview = CARD_PREVIEWS[comp.id] || '<i class="fa-solid ' + comp.icon + ' card-icon-fallback"></i>';
  w('    <div class="component-card" data-detail="form-fields/' + comp.id + '" data-search-title="' + comp.title.toLowerCase() + '">');
  w('      <div class="component-card-preview"><div class="card-dummy-preview">' + preview + '</div></div>');
  w('      <div class="component-card-info">');
  w('        <p class="component-card-name">' + comp.title + '</p>');
  w('        <p class="component-card-desc">' + comp.desc + '</p>');
  w('        <span class="component-card-arrow"><i class="fa-solid fa-arrow-right"></i></span>');
  w('      </div>');
  w('    </div>');
});
w('  </div>');
w('</div>');

/* ════════════════════════════════════════
   VIEW: FORM FIELD DETAIL VIEWS
   ════════════════════════════════════════ */
var NO_LABEL_PLACEMENT = ['section-separator', 'form-buttons', 'decision-box'];
formData.forEach(function(comp) {
  var hasLabelPlacement = NO_LABEL_PLACEMENT.indexOf(comp.id) === -1;
  var labelTabsHtml = hasLabelPlacement
    ? '<div class="label-placement-tabs" role="tablist" aria-label="Label placement"><button type="button" class="label-placement-tab is-active" data-placement="label-left">Left</button><button type="button" class="label-placement-tab" data-placement="label-right">Right</button><button type="button" class="label-placement-tab" data-placement="label-top">Top</button><button type="button" class="label-placement-tab" data-placement="label-inplace">Inline</button></div>'
    : '';
  w('<div class="view" id="view-form-fields-' + comp.id + '">');
  w('  <div class="detail-header">');
  w('    <div class="detail-icon"><i class="fa-solid ' + comp.icon + '"></i></div>');
  w('    <div class="detail-info">');
  w('      <h1 class="detail-title">' + comp.title + '</h1>');
  w('      <p class="detail-description">' + comp.desc + '</p>');
  w('      <div class="detail-meta"><span class="meta-tag"><i class="fa-solid fa-cube"></i> Form Field</span></div>');
  w('    </div>');
  w('  </div>');
  w('  <div class="variant-card" data-component="' + comp.id + '">');
  w('    <div class="variant-header"><p class="variant-name">' + comp.title + ' \u2014 Live Preview</p><div class="variant-header-actions">' + labelTabsHtml + '<label class="primary-color-picker-wrap"><input type="color" class="primary-color-picker" value="#5051F9" title="Primary Color"> Primary</label><button class="variant-code-toggle"><i class="fa-solid fa-code"></i> Show Code</button></div></div>');
  w('    <div class="variant-preview">' + comp.body + '</div>');
  w('    <div class="variant-code">');
  w('      <div class="code-tabs"><button class="code-tab active" data-tab="html">HTML</button><button class="code-tab" data-tab="css">CSS</button></div>');
  w('      <div class="code-tab-content active" data-tab="html"><button class="code-copy-btn" data-lang="html">Copy</button><pre>' + escHtml(comp.body) + '</pre></div>');
  w('      <div class="code-tab-content" data-tab="css"><button class="code-copy-btn" data-lang="css">Copy</button><pre>' + escCss(comp.cleanCss) + '</pre></div>');
  w('    </div>');
  w('  </div>');
  w('</div>');
});

/* ════════════════════════════════════════
   VIEW: CREATE NEW COMPONENT
   ════════════════════════════════════════ */
w('<div class="view" id="view-create-component">');
w('  <div class="page-header">');
w('    <div class="page-header-text">');
w('      <h1 class="page-title">Create New Component</h1>');
w('      <p class="page-description">Turn a natural-language prompt, an image reference, or both into a starter component scaffold under forms/. This workflow creates the required HTML, CSS, and JS files and rebuilds the design library. To create files, open this page through node _design-library-server.js rather than a plain static server.</p>');
w('    </div>');
w('  </div>');
w('  <div class="create-comp-layout">');
w('    <section class="create-comp-panel">');
w('      <h2>Prompt + Image Reference</h2>');
w('      <p>Example: <code>Create a new QR code field component</code>. If you attach an image as well, the text stays primary and the image only refines the scaffold structure.</p>');
w('      <label class="create-comp-label" for="createComponentPrompt">Describe the component you want to scaffold</label>');
w('      <textarea id="createComponentPrompt" class="create-comp-textarea" placeholder="Create a new QR code field component" spellcheck="false"></textarea>');
w('      <div class="create-comp-image-row">');
w('        <div>');
w('          <label class="create-comp-label" for="createComponentImageInput">Attach image reference</label>');
w('          <input type="file" id="createComponentImageInput" class="create-comp-file-input" accept="image/*">');
w('        </div>');
w('        <button type="button" class="create-comp-link-btn" id="createComponentImageClearBtn" hidden>Remove image</button>');
w('      </div>');
w('      <div class="create-comp-image-meta" id="createComponentImageMeta">No image reference selected.</div>');
w('      <div class="create-comp-image-preview is-empty" id="createComponentImagePreview"><span id="createComponentImagePlaceholder">No image reference selected.</span><img id="createComponentImagePreviewImg" alt="Selected image reference preview" hidden></div>');
w('      <div class="create-comp-hint">The generator creates a safe starter scaffold only. You can refine the new component implementation after the files are created.</div>');
w('      <div class="create-comp-actions">');
w('        <button type="button" class="create-comp-btn" id="createComponentGenerateBtn">Generate Component Scaffold</button>');
w('        <span class="create-comp-server-note" id="createComponentServerNote">Checking local scaffold API…</span>');
w('      </div>');
w('      <div class="create-comp-status" id="createComponentStatus">Enter a prompt or attach an image to preview the generated folder and file names.</div>');
w('    </section>');
w('    <aside class="create-comp-panel">');
w('      <h2>Generated Structure</h2>');
w('      <p>The derived kebab-case component ID determines the folder and file names. Image analysis is used only for safe structural inference.</p>');
w('      <div class="create-comp-preview-empty" id="createComponentPreviewEmpty">No scaffold preview yet.</div>');
w('      <div id="createComponentPreviewBody" hidden>');
w('        <div class="create-comp-preview-list">');
w('          <div class="create-comp-preview-item"><span>Component ID</span><code id="createComponentIdValue">—</code></div>');
w('          <div class="create-comp-preview-item"><span>Folder</span><code id="createComponentFolderValue">—</code></div>');
w('          <div class="create-comp-preview-item"><span>Scaffold Type</span><code id="createComponentTypeValue">—</code></div>');
w('          <div class="create-comp-preview-item"><span>Inference Source</span><code id="createComponentSourceValue">—</code></div>');
w('          <div class="create-comp-preview-item"><span>Layout</span><code id="createComponentLayoutValue">—</code></div>');
w('        </div>');
w('        <div class="create-comp-section-title">Detected states</div>');
w('        <ul class="create-comp-pill-list" id="createComponentStateList"></ul>');
w('        <div class="create-comp-section-title">Assumptions</div>');
w('        <ul class="create-comp-note-list" id="createComponentAssumptionList"></ul>');
w('        <div class="create-comp-section-title">Ambiguities</div>');
w('        <ul class="create-comp-note-list is-warning" id="createComponentAmbiguityList"></ul>');
w('        <ul class="create-comp-file-list" id="createComponentFileList"></ul>');
w('        <div class="create-comp-result-actions">');
w('          <button type="button" class="create-comp-link-btn" id="createComponentReloadBtn" hidden>Reload library and open component</button>');
w('        </div>');
w('      </div>');
w('    </aside>');
w('  </div>');
w('</div>');

/* ════════════════════════════════════════
   VIEW: REPORTS OVERVIEW (CARD GRID)
   ════════════════════════════════════════ */
w('<div class="view" id="view-reports">');
w('  <div class="page-header">');
w('    <div class="page-header-text">');
w('      <h1 class="page-title">Reports</h1>');
w('      <p class="page-description">Report visualization components for displaying data in calendar, board, timeline, and card layouts.</p>');
w('    </div>');
w('    <div class="inline-search"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search reports..." id="reportSearchInput" autocomplete="off"><span class="search-shortcut">\u2318K</span></div>');
w('  </div>');
w('  <div class="section-header"><div class="section-icon"><i class="fa-solid fa-chart-column"></i></div><h2 class="section-title">Report Types</h2></div>');
w('  <div class="component-grid" id="reportGrid">');
coreReportData.forEach(function(rpt) {
  w('    <div class="component-card" data-detail="reports/' + rpt.id + '" data-search-title="' + rpt.title.toLowerCase() + '">');
  w('      <div class="component-card-preview"><div class="card-live-preview">' + rpt.gridRender.html + '</div></div>');
  w('      <div class="component-card-info">');
  w('        <p class="component-card-name">' + rpt.title + '</p>');
  w('        <p class="component-card-desc">' + rpt.desc + '</p>');
  w('        <span class="component-card-arrow"><i class="fa-solid fa-arrow-right"></i></span>');
  w('      </div>');
  w('    </div>');
});
w('  </div>');

  /* Card Report Types — outer accordion with 5 nested sub-accordions */
w('  <div class="accordion" id="accordion-card-reports">');
w('    <div class="accordion-header">');
w('      <div class="accordion-icon"><i class="fa-solid fa-id-card"></i></div>');
w('      <div class="accordion-info">');
w('        <h3 class="accordion-title">Card Report Types</h3>');
w('        <p class="accordion-desc">' + cardReportData.length + ' card layout variants across 5 card types.</p>');
w('      </div>');
w('      <span class="accordion-badge">' + cardReportData.length + '</span>');
w('      <i class="fa-solid fa-chevron-down accordion-chevron"></i>');
w('    </div>');
w('    <div class="accordion-body"><div class="accordion-body-inner">');
CARD_TYPE_META.forEach(function(ctm) {
  var grp = cardTypeGroups['card'+ctm.type];
  w('      <div class="accordion sub-accordion" id="accordion-card'+ctm.type+'">');
  w('        <div class="accordion-header">');
  w('          <div class="accordion-icon"><i class="fa-solid '+ctm.icon+'"></i></div>');
  w('          <div class="accordion-info">');
  w('            <h3 class="accordion-title">'+ctm.title+'</h3>');
  w('            <p class="accordion-desc">'+ctm.desc+'</p>');
  w('          </div>');
  w('          <span class="accordion-badge">'+grp.variants.length+'</span>');
  w('          <i class="fa-solid fa-chevron-down accordion-chevron"></i>');
  w('        </div>');
  w('        <div class="accordion-body"><div class="accordion-body-inner">');
  w('          <div class="component-grid">');
  grp.variants.forEach(function(v) {
    w('            <div class="component-card" data-detail="reports/'+v.id+'" data-search-title="'+v.title.toLowerCase()+'">');
    w('              <div class="component-card-preview"><div class="card-live-preview">'+uniquifyHtmlIds(v.body, 'grid-'+v.id)+'</div></div>');
    w('              <div class="component-card-info">');
    w('                <p class="component-card-name">'+v.title+'</p>');
    w('                <p class="component-card-desc">'+v.desc+'</p>');
    w('                <span class="component-card-arrow"><i class="fa-solid fa-arrow-right"></i></span>');
    w('              </div>');
    w('            </div>');
  });
  w('          </div>');
  w('        </div></div>');
  w('      </div>');
});
w('    </div></div>');
w('  </div>');
w('</div>');

/* ════════════════════════════════════════
   VIEW: CORE REPORT DETAIL VIEWS
   ════════════════════════════════════════ */
coreReportData.forEach(function(rpt) {
  w('<div class="view" id="view-reports-' + rpt.id + '">');
  w('  <div class="detail-header">');
  w('    <div class="detail-icon"><i class="fa-solid ' + rpt.icon + '"></i></div>');
  w('    <div class="detail-info">');
  w('      <h1 class="detail-title">' + rpt.title + '</h1>');
  w('      <p class="detail-description">' + rpt.desc + '</p>');
  w('      <div class="detail-meta"><span class="meta-tag"><i class="fa-solid fa-cube"></i> Report</span></div>');
  w('    </div>');
  w('  </div>');
  w('  <div class="variant-card" data-component="' + rpt.id + '">');
  w('    <div class="variant-header"><p class="variant-name">' + rpt.title + ' \u2014 Live Preview</p><button class="variant-code-toggle"><i class="fa-solid fa-code"></i> Show Code</button></div>');
  w('    <div class="variant-preview report-demo">' + rpt.detailRender.html + '</div>');
  w('    <div class="variant-code">');
  w('      <div class="code-tabs"><button class="code-tab active" data-tab="html">HTML</button><button class="code-tab" data-tab="css">CSS</button></div>');
  w('      <div class="code-tab-content active" data-tab="html"><button class="code-copy-btn" data-lang="html">Copy</button><pre>' + escHtml(rpt.body) + '</pre></div>');
  w('      <div class="code-tab-content" data-tab="css"><button class="code-copy-btn" data-lang="css">Copy</button><pre>' + escCss(rpt.cleanCss) + '</pre></div>');
  w('    </div>');
  w('  </div>');
  w('</div>');
});

/* ════════════════════════════════════════
   VIEW: CARD REPORT DETAIL VIEWS (54)
   ════════════════════════════════════════ */
cardReportData.forEach(function(v) {
  w('<div class="view" id="view-reports-' + v.id + '">');
  w('  <div class="detail-header">');
  w('    <div class="detail-icon"><i class="fa-solid ' + v.icon + '"></i></div>');
  w('    <div class="detail-info">');
  w('      <h1 class="detail-title">' + v.title + '</h1>');
  w('      <p class="detail-description">' + v.desc + '</p>');
  w('      <div class="detail-meta"><span class="meta-tag"><i class="fa-solid fa-cube"></i> Card Report</span><span class="meta-tag"><i class="fa-solid fa-layer-group"></i> ' + titleCase(v.groupId.replace('card','Card ')) + '</span></div>');
  w('    </div>');
  w('  </div>');
  w('  <div class="variant-card" data-component="' + v.id + '">');
  w('    <div class="variant-header"><p class="variant-name">' + v.title + ' \u2014 Live Preview</p><button class="variant-code-toggle"><i class="fa-solid fa-code"></i> Show Code</button></div>');
  w('    <div class="variant-preview report-demo">' + v.body + '</div>');
  w('    <div class="variant-code">');
  w('      <div class="code-tabs"><button class="code-tab active" data-tab="html">HTML</button><button class="code-tab" data-tab="css">CSS</button></div>');
  w('      <div class="code-tab-content active" data-tab="html"><button class="code-copy-btn" data-lang="html">Copy</button><pre>' + escHtml(v.body) + '</pre></div>');
  w('      <div class="code-tab-content" data-tab="css"><button class="code-copy-btn" data-lang="css">Copy</button><pre>' + escCss(v.cleanCss) + '</pre></div>');
  w('    </div>');
  w('  </div>');
  w('</div>');
});

/* ════════════════════════════════════════
   VIEW: CARD LAYOUT TYPES CONFIGURATOR
   ════════════════════════════════════════ */
w('<div class="view" id="view-reports-card-layout-types">');
w('  <div class="detail-header">');
w('    <div class="detail-icon"><i class="fa-solid fa-sliders"></i></div>');
w('    <div class="detail-info">');
w('      <h1 class="detail-title">Card Report Layout Types</h1>');
w('      <p class="detail-description">Interactive configurator to preview all card layout variants. Select card type, image shape, position, and line type to see the live preview.</p>');
w('      <div class="detail-meta"><span class="meta-tag"><i class="fa-solid fa-cube"></i> Configurator</span><span class="meta-tag"><i class="fa-solid fa-layer-group"></i> ' + allCardVariants.length + ' Variants</span></div>');
w('    </div>');
w('  </div>');

/* Selector bar — visual card type selector */
w('  <div class="cfg-type-selector">');
w('    <label class="cfg-label">Select Card Type</label>');
w('    <div class="cfg-type-grid" id="cfgCardType">');
CARD_TYPE_META.forEach(function(ctm) {
  var isFirst = ctm.type === 1;
  w('      <div class="cfg-type-card' + (isFirst ? ' active' : '') + '" data-value="' + ctm.type + '">');
  w('        <div class="cfg-type-wireframe">' + ctm.svg + '</div>');
  w('        <div class="cfg-type-info">');
  w('          <div class="cfg-type-title">' + ctm.title + '</div>');
  w('          <div class="cfg-type-desc">' + ctm.desc + '</div>');
  w('        </div>');
  w('      </div>');
});
w('    </div>');
w('  </div>');

/* Sub-tab panel — variant options */
w('  <div class="cfg-subtab-panel">');
w('    <div class="cfg-row">');

/* Shape selector */
w('      <div class="cfg-group" id="cfgShapeGroup">');
w('        <label class="cfg-label">Image Shape</label>');
w('        <div class="cfg-pills" id="cfgShape">');
w('          <button class="cfg-pill active" data-value="square"><i class="fa-regular fa-square"></i> Square</button>');
w('          <button class="cfg-pill" data-value="circle"><i class="fa-regular fa-circle"></i> Circle</button>');
w('          <button class="cfg-pill" data-value="full"><i class="fa-solid fa-expand"></i> Full</button>');
w('        </div>');
w('      </div>');

/* Position selector */
w('      <div class="cfg-group" id="cfgPosGroup">');
w('        <label class="cfg-label">Image Position</label>');
w('        <div class="cfg-pills" id="cfgPosition">');
w('          <button class="cfg-pill active" data-value="left"><i class="fa-solid fa-arrow-left"></i> Left</button>');
w('          <button class="cfg-pill" data-value="right"><i class="fa-solid fa-arrow-right"></i> Right</button>');
w('          <button class="cfg-pill" data-value="top"><i class="fa-solid fa-arrow-up"></i> Top</button>');
w('          <button class="cfg-pill" data-value="bottom"><i class="fa-solid fa-arrow-down"></i> Bottom</button>');
w('        </div>');
w('      </div>');

/* Text Align selector */
w('      <div class="cfg-group" id="cfgAlignGroup">');
w('        <label class="cfg-label">Text Align</label>');
w('        <div class="cfg-pills" id="cfgAlign">');
w('          <button class="cfg-pill active" data-value="left"><i class="fa-solid fa-align-left"></i> Left</button>');
w('          <button class="cfg-pill" data-value="centre"><i class="fa-solid fa-align-center"></i> Centre</button>');
w('        </div>');
w('      </div>');

/* Line Type selector */
w('      <div class="cfg-group">');
w('        <label class="cfg-label">Line Type</label>');
w('        <div class="cfg-pills" id="cfgLineType">');
w('          <button class="cfg-pill active" data-value="single"><i class="fa-solid fa-grip-lines"></i> Single</button>');
w('          <button class="cfg-pill" data-value="multi"><i class="fa-solid fa-bars"></i> Multi</button>');
w('        </div>');
w('      </div>');

w('    </div>');  /* End cfg-row */
w('  </div>');  /* End cfg-subtab-panel */

/* Live preview container */
w('  <div class="variant-card" id="cfgVariantCard">');
w('    <div class="variant-header"><p class="variant-name" id="cfgPreviewTitle">Card 1 \u2014 Left Single Line \u2014 Live Preview</p><button class="variant-code-toggle"><i class="fa-solid fa-code"></i> Show Code</button></div>');
w('    <div class="variant-preview report-demo" id="cfgPreview"></div>');
w('    <div class="variant-code">');
w('      <div class="code-tabs"><button class="code-tab active" data-tab="html">HTML</button><button class="code-tab" data-tab="css">CSS</button></div>');
w('      <div class="code-tab-content active" data-tab="html"><button class="code-copy-btn" data-lang="html">Copy</button><pre id="cfgCodeHtml"></pre></div>');
w('      <div class="code-tab-content" data-tab="css"><button class="code-copy-btn" data-lang="css">Copy</button><pre id="cfgCodeCss"></pre></div>');
w('    </div>');
w('  </div>');
w('</div>');

/* ════════════════════════════════════════
   VIEW: ALL COMPONENTS LISTING
   ════════════════════════════════════════ */
w('<div class="view" id="view-all">');
w('  <div class="page-header">');
w('    <div class="page-header-text">');
w('      <h1 class="page-title">All Components</h1>');
w('      <p class="page-description">Complete listing of all form field components and report types with live demos and source code.</p>');
w('    </div>');
w('    <div class="inline-search"><i class="fa-solid fa-magnifying-glass"></i><input type="text" placeholder="Search all components..." id="allCompSearchInput" autocomplete="off"><span class="search-shortcut">\u2318K</span></div>');
w('  </div>');

/* Form Fields section in All view */
w('  <div class="all-comp-section">');
w('    <div class="section-header"><div class="section-icon"><i class="fas fa-cube"></i></div><h2 class="section-title">Form Fields</h2></div>');
formData.forEach(function(comp) {
  w('    <div class="all-comp-item" data-component="' + comp.id + '">');
  w('      <div class="all-comp-item-header"><h3 class="all-comp-item-title"><i class="fa-solid ' + comp.icon + '"></i> ' + comp.title + '</h3><button class="variant-code-toggle"><i class="fa-solid fa-code"></i> Show Code</button></div>');
  w('      <div class="variant-preview">' + uniquifyHtmlIds(comp.body, 'all-' + comp.id) + '</div>');
  w('      <div class="variant-code">');
  w('        <div class="code-tabs"><button class="code-tab active" data-tab="html">HTML</button><button class="code-tab" data-tab="css">CSS</button></div>');
  w('        <div class="code-tab-content active" data-tab="html"><button class="code-copy-btn">Copy</button><pre>' + escHtml(comp.body) + '</pre></div>');
  w('        <div class="code-tab-content" data-tab="css"><button class="code-copy-btn">Copy</button><pre>' + escCss(comp.cleanCss) + '</pre></div>');
  w('      </div>');
  w('    </div>');
});
w('  </div>');

/* Reports section in All view — core reports */
w('  <div class="all-comp-section">');
w('    <div class="section-header"><div class="section-icon"><i class="fa-solid fa-chart-column"></i></div><h2 class="section-title">Reports</h2></div>');
coreReportData.forEach(function(rpt) {
  w('    <div class="all-comp-item">');
  w('      <div class="all-comp-item-header"><h3 class="all-comp-item-title"><i class="fa-solid ' + rpt.icon + '"></i> ' + rpt.title + '</h3><button class="variant-code-toggle"><i class="fa-solid fa-code"></i> Show Code</button></div>');
  w('      <div class="variant-preview report-demo">' + rpt.allRender.html + '</div>');
  w('      <div class="variant-code">');
  w('        <div class="code-tabs"><button class="code-tab active" data-tab="html">HTML</button><button class="code-tab" data-tab="css">CSS</button></div>');
  w('        <div class="code-tab-content active" data-tab="html"><button class="code-copy-btn">Copy</button><pre>' + escHtml(rpt.body) + '</pre></div>');
  w('        <div class="code-tab-content" data-tab="css"><button class="code-copy-btn">Copy</button><pre>' + escCss(rpt.cleanCss) + '</pre></div>');
  w('      </div>');
  w('    </div>');
});
w('  </div>');

/* Card Report Types accordion with nested card-type sub-accordions in All view */
w('  <div class="accordion" id="accordion-card-reports-all" style="display:none">');
w('    <div class="accordion-header">');
w('      <div class="accordion-icon"><i class="fa-solid fa-id-card"></i></div>');
w('      <div class="accordion-info">');
w('        <h3 class="accordion-title">Card Report Types</h3>');
w('        <p class="accordion-desc">' + cardReportData.length + ' card layout variants across 5 card types</p>');
w('      </div>');
w('      <span class="accordion-badge">' + cardReportData.length + '</span>');
w('      <i class="fa-solid fa-chevron-down accordion-chevron"></i>');
w('    </div>');
w('    <div class="accordion-body"><div class="accordion-body-inner">');
CARD_TYPE_META.forEach(function(ctm) {
  var grp = cardTypeGroups['card'+ctm.type];
  w('      <div class="accordion sub-accordion" id="accordion-all-card'+ctm.type+'">');
  w('        <div class="accordion-header">');
  w('          <div class="accordion-icon"><i class="fa-solid '+ctm.icon+'"></i></div>');
  w('          <div class="accordion-info"><h3 class="accordion-title">'+ctm.title+'</h3><p class="accordion-desc">'+grp.variants.length+' variants</p></div>');
  w('          <span class="accordion-badge">'+grp.variants.length+'</span>');
  w('          <i class="fa-solid fa-chevron-down accordion-chevron"></i>');
  w('        </div>');
  w('        <div class="accordion-body"><div class="accordion-body-inner">');
  grp.variants.forEach(function(v) {
    w('    <div class="all-comp-item">');
    w('      <div class="all-comp-item-header"><h3 class="all-comp-item-title"><i class="fa-solid '+v.icon+'"></i> '+v.title+'</h3><button class="variant-code-toggle"><i class="fa-solid fa-code"></i> Show Code</button></div>');
    w('      <div class="variant-preview report-demo">'+uniquifyHtmlIds(v.body, 'all-'+v.id)+'</div>');
    w('      <div class="variant-code">');
    w('        <div class="code-tabs"><button class="code-tab active" data-tab="html">HTML</button><button class="code-tab" data-tab="css">CSS</button></div>');
    w('        <div class="code-tab-content active" data-tab="html"><button class="code-copy-btn">Copy</button><pre>'+escHtml(v.body)+'</pre></div>');
    w('        <div class="code-tab-content" data-tab="css"><button class="code-copy-btn">Copy</button><pre>'+escCss(v.cleanCss)+'</pre></div>');
    w('      </div>');
    w('    </div>');
  });
  w('        </div></div>');
  w('      </div>');
});
w('    </div></div>');
w('  </div>');
w('</div>');

/* Close content, content-col, content-wrapper, main-wrapper, app-layout */
w('</main>');
w('</div>');
w('</div>');
w('</div>');
w('</div>');

/* ═══════════════════════════════════════
   JAVASCRIPT
   ═══════════════════════════════════════ */
w('<script>');
w('(function(){');
w('"use strict";');
w('');
w('/* ── Data for secondary sidebar ── */');

// Build sidebar data as JS object
var tokenPages = '[{id:"tokens/typography",title:"Typography",icon:"fa-font"},{id:"tokens/colors",title:"Colors",icon:"fa-palette"},{id:"tokens/grid",title:"Grid & Flex",icon:"fa-table-columns"}]';
var formPages = '[';
formData.forEach(function(c,i){ formPages += (i?',':'') + '{id:"form-fields/'+c.id+'",title:"'+c.title+'",icon:"'+c.icon+'"}'; });
formPages += ']';
var reportPages = '[';
coreReportData.forEach(function(r,i){ reportPages += (i?',':'') + '{id:"reports/'+r.id+'",title:"'+r.title+'",icon:"'+r.icon+'"}'; });
reportPages += ',{id:"reports/'+cardConfiguratorEntry.id+'",title:"'+cardConfiguratorEntry.title+'",icon:"'+cardConfiguratorEntry.icon+'"}';
reportPages += ']';

// Build card type groups for sidebar nested accordion
var cardTypeGroupsJs = '{';
CARD_TYPE_META.forEach(function(ctm, gi) {
  var grp = cardTypeGroups['card'+ctm.type];
  cardTypeGroupsJs += (gi?',':'') + '"card'+ctm.type+'":{title:"'+ctm.title+'",icon:"'+ctm.icon+'",items:[';
  grp.variants.forEach(function(v, vi) {
    cardTypeGroupsJs += (vi?',':'') + '{id:"reports/'+v.id+'",title:"'+v.title+'",icon:"'+v.icon+'"}';
  });
  cardTypeGroupsJs += ']}';
});
cardTypeGroupsJs += '}';

// Flat list of all card variants for search
var allCardPages = '[';
cardReportData.forEach(function(r,i){ allCardPages += (i?',':'') + '{id:"reports/'+r.id+'",title:"'+r.title+'",icon:"'+r.icon+'"}'; });
allCardPages += ']';

w('var sidebarData = {');
w('  "tokens": ' + tokenPages + ',');
w('  "form-fields": ' + formPages + ',');
w('  "reports": ' + reportPages);
w('};');
w('var cardTypeGroups = ' + cardTypeGroupsJs + ';');
w('var allCardPages = ' + allCardPages + ';');
w('var createComponentPage = { id: "create-component", title: "Create New Component", icon: "fa-wand-magic-sparkles" };');
w('');
w('var allViews = document.querySelectorAll(".view");');
w('var navItems = document.querySelectorAll(".nav-item");');
w('var secondarySidebar = document.getElementById("secondarySidebar");');
w('var secondaryNavList = document.getElementById("secondaryNavList");');
w('var currentView = "home";');
w('');

w('function navigate(viewId, options) {');
w('  options = options || {};');
w('  currentView = viewId;');
w('');
w('  /* Restore any previously moved header back to its source view */');
w('  var topBar = document.getElementById("topHeaderBar");');
w('  if (topBar._srcView && topBar._movedEl) {');
w('    topBar._srcView.insertBefore(topBar._movedEl, topBar._srcView.firstChild);');
w('    topBar._srcView = null; topBar._movedEl = null;');
w('  }');
w('  topBar.innerHTML = ""; topBar.classList.remove("visible");');
w('');
w('  /* Hide all views */');
w('  allViews.forEach(function(v){ v.classList.remove("active"); });');
w('  /* Show target view */');
w('  var targetId = "view-" + viewId.replace(/\\//g, "-");');
w('  var target = document.getElementById(targetId);');
w('  if (target) target.classList.add("active");');
w('');
w('  /* Move header (detail-header or page-header) to external bar */');
w('  var hdr = target ? (target.querySelector(".detail-header") || target.querySelector(".page-header")) : null;');
w('  if (hdr) {');
w('    topBar._srcView = target;');
w('    topBar._movedEl = hdr;');
w('    topBar.appendChild(hdr);');
w('    topBar.classList.add("visible");');
w('  }');
w('');
w('  /* Update main nav */');
w('  var mainSection = viewId.split("/")[0];');
w('  navItems.forEach(function(n){');
w('    n.classList.toggle("active", n.dataset.view === mainSection);');
w('  });');
w('');
w('  /* Update secondary sidebar */');
w('  var sidebarKey = mainSection;');
w('  var pages = sidebarData[sidebarKey];');
w('  if (pages) {');
w('    secondarySidebar.classList.add("visible");');
w('    secondaryNavList.innerHTML = "";');
w('    pages.forEach(function(p){');
w('      var li = document.createElement("li");');
w('      var item = document.createElement("div");');
w('      item.className = "category-item" + (viewId === p.id ? " active" : "");');
w('      item.innerHTML = \'<i class="fa-solid \' + p.icon + \'"></i><span>\' + p.title + \'</span>\';');
w('      item.addEventListener("click", function(){ navigate(p.id); });');
w('      li.appendChild(item);');
w('      secondaryNavList.appendChild(li);');
w('    });');
w('    /* Card Report Types — hidden from sidebar */');
w('    if (false && sidebarKey === "reports") {');
w('      var outerAcc = document.createElement("li");');
w('      outerAcc.className = "sidebar-accordion" + (viewId.indexOf("reports/card") === 0 ? " open" : "");');
w('      var outerTrig = document.createElement("button");');
w('      outerTrig.className = "sidebar-accordion-trigger";');
w('      outerTrig.innerHTML = \'<i class="fa-solid fa-id-card sa-icon"></i><span>Card Report Types</span><i class="fa-solid fa-chevron-down sa-chevron"></i>\';');
w('      outerTrig.addEventListener("click", function(e){ e.stopPropagation(); outerAcc.classList.toggle("open"); });');
w('      outerAcc.appendChild(outerTrig);');
w('      var outerBody = document.createElement("div");');
w('      outerBody.className = "sidebar-accordion-body";');
w('      /* Build sub-accordion for each Card type (1-5) */');
w('      var ctKeys = Object.keys(cardTypeGroups);');
w('      ctKeys.forEach(function(ctKey){');
w('        var grp = cardTypeGroups[ctKey];');
w('        var hasActiveChild = grp.items.some(function(cp){ return viewId === cp.id; });');
w('        var subAcc = document.createElement("div");');
w('        subAcc.className = "sidebar-accordion sidebar-sub-accordion" + (hasActiveChild ? " open" : "");');
w('        var subTrig = document.createElement("button");');
w('        subTrig.className = "sidebar-accordion-trigger";');
w('        subTrig.innerHTML = \'<i class="fa-solid \' + grp.icon + \' sa-icon"></i><span>\' + grp.title + \'</span><i class="fa-solid fa-chevron-down sa-chevron"></i>\';');
w('        subTrig.addEventListener("click", function(e){ e.stopPropagation(); subAcc.classList.toggle("open"); });');
w('        subAcc.appendChild(subTrig);');
w('        var subBody = document.createElement("div");');
w('        subBody.className = "sidebar-accordion-body";');
w('        grp.items.forEach(function(cp){');
w('          var cItem = document.createElement("div");');
w('          cItem.className = "category-item" + (viewId === cp.id ? " active" : "");');
w('          cItem.innerHTML = \'<i class="fa-solid \' + cp.icon + \'"></i><span>\' + cp.title + \'</span>\';');
w('          cItem.addEventListener("click", function(){ navigate(cp.id); });');
w('          subBody.appendChild(cItem);');
w('        });');
w('        subAcc.appendChild(subBody);');
w('        outerBody.appendChild(subAcc);');
w('      });');
w('      outerAcc.appendChild(outerBody);');
w('      secondaryNavList.appendChild(outerAcc);');
w('    }');
w('  } else {');
w('    secondarySidebar.classList.remove("visible");');
w('    secondaryNavList.innerHTML = "";');
w('  }');
w('');
w('  /* Scroll content to top */');
w('  document.getElementById("mainContent").scrollTop = 0;');
w('}');
w('');

w('/* Main nav clicks */');
w('navItems.forEach(function(n){');
w('  n.addEventListener("click", function(){ navigate(n.dataset.view); });');
w('});');
w('');

w('/* Home card clicks */');
w('document.querySelectorAll("[data-navigate]").forEach(function(el){');
w('  el.addEventListener("click", function(e){ e.preventDefault(); navigate(el.dataset.navigate); });');
w('});');
w('');

w('/* Component card clicks (drill into detail) */');
w('document.querySelectorAll("[data-detail]").forEach(function(el){');
w('  el.addEventListener("click", function(){ navigate(el.dataset.detail); });');
w('});');
w('');
w('/* Accordion toggles */');
w('document.querySelectorAll(".accordion-header").forEach(function(hdr){');
w('  hdr.addEventListener("click", function(e){');
w('    e.stopPropagation();');
w('    hdr.closest(".accordion").classList.toggle("open");');
w('  });');
w('});');
w('');

w('/* Show Code toggles */');
w('document.querySelectorAll(".variant-code-toggle").forEach(function(btn){');
w('  btn.addEventListener("click", function(e){');
w('    e.stopPropagation();');
w('    var card = btn.closest(".variant-card") || btn.closest(".all-comp-item");');
w('    if (!card) return;');
w('    card.classList.toggle("code-visible");');
w('    btn.classList.toggle("active");');
w('    var isOpen = card.classList.contains("code-visible");');
w('    btn.innerHTML = isOpen ? \'<i class="fa-solid fa-code"></i> Hide Code\' : \'<i class="fa-solid fa-code"></i> Show Code\';');
w('  });');
w('});');
w('');

w('/* Code tabs */');
w('document.querySelectorAll(".code-tabs").forEach(function(tabs){');
w('  tabs.querySelectorAll(".code-tab").forEach(function(tab){');
w('    tab.addEventListener("click", function(){');
w('      var panel = tabs.parentElement;');
w('      panel.querySelectorAll(".code-tab").forEach(function(t){ t.classList.remove("active"); });');
w('      panel.querySelectorAll(".code-tab-content").forEach(function(c){ c.classList.remove("active"); });');
w('      tab.classList.add("active");');
w('      panel.querySelector(\'.code-tab-content[data-tab="\' + tab.dataset.tab + \'"]\').classList.add("active");');
w('    });');
w('  });');
w('});');
w('');

w('/* Copy buttons */');
w('document.querySelectorAll(".code-copy-btn").forEach(function(btn){');
w('  btn.addEventListener("click", function(){');
w('    var code = btn.parentElement.querySelector("pre").textContent;');
w('    navigator.clipboard.writeText(code).then(function(){');
w('      btn.textContent = "Copied!";');
w('      setTimeout(function(){ btn.textContent = "Copy"; }, 1500);');
w('    });');
w('  });');
w('});');
w('');

w('/* Search functionality */');
w('var allSearchable = [];');
w('(function(){');
w('  var pages = sidebarData["form-fields"].concat(sidebarData["reports"]).concat(allCardPages).concat(sidebarData["tokens"]).concat([createComponentPage]);');
w('  pages.forEach(function(p){ allSearchable.push(p); });');
w('})();');
w('');
w('/* Sidebar search — filters category-item list */');
w('var sidebarSearchInput = document.getElementById("sidebarSearchInput");');
w('if (sidebarSearchInput) {');
w('  sidebarSearchInput.addEventListener("input", function(){');
w('    var q = sidebarSearchInput.value.toLowerCase().trim();');
w('    var items = secondaryNavList.querySelectorAll(".category-item");');
w('    items.forEach(function(item){');
w('      var text = item.textContent.toLowerCase();');
w('      item.style.display = (!q || text.indexOf(q) !== -1) ? "" : "none";');
w('    });');
w('    /* Also filter sidebar accordion items */');
w('    var accItems = secondaryNavList.querySelectorAll(".sidebar-accordion");');
w('    accItems.forEach(function(acc){');
w('      var innerItems = acc.querySelectorAll(".category-item");');
w('      var anyVisible = false;');
w('      innerItems.forEach(function(ci){');
w('        var t = ci.textContent.toLowerCase();');
w('        var show = !q || t.indexOf(q) !== -1;');
w('        ci.style.display = show ? "" : "none";');
w('        if (show) anyVisible = true;');
w('      });');
w('      acc.style.display = anyVisible || !q ? "" : "none";');
w('      if (q && anyVisible) acc.classList.add("open");');
w('    });');
w('  });');
w('}');
w('');
w('/* Grid search: form fields page */');
w('function setupGridSearch(inputId, gridId) {');
w('  var input = document.getElementById(inputId);');
w('  var grid = document.getElementById(gridId);');
w('  if (!input || !grid) return;');
w('  input.addEventListener("input", function(){');
w('    var q = input.value.toLowerCase().trim();');
w('    var cards = grid.querySelectorAll(".component-card");');
w('    cards.forEach(function(card){');
w('      var title = card.getAttribute("data-search-title") || card.textContent.toLowerCase();');
w('      card.style.display = (!q || title.indexOf(q) !== -1) ? "" : "none";');
w('    });');
w('  });');
w('  input.addEventListener("keydown", function(e){');
w('    if (e.key === "Enter") {');
w('      var q = input.value.toLowerCase().trim();');
w('      if (!q) return;');
w('      var match = allSearchable.find(function(p){ return p.title.toLowerCase().indexOf(q) !== -1; });');
w('      if (match) { navigate(match.id); input.value = ""; input.blur(); }');
w('    }');
w('  });');
w('}');
w('setupGridSearch("formFieldSearchInput", "formFieldGrid");');
w('setupGridSearch("reportSearchInput", "reportGrid");');
w('');
w('/* All components page search */');
w('var allCompSearch = document.getElementById("allCompSearchInput");');
w('if (allCompSearch) {');
w('  allCompSearch.addEventListener("input", function(){');
w('    var q = allCompSearch.value.toLowerCase().trim();');
w('    var items = document.querySelectorAll("#view-all .all-comp-item");');
w('    items.forEach(function(item){');
w('      var title = item.querySelector(".all-comp-item-title");');
w('      var text = title ? title.textContent.toLowerCase() : "";');
w('      item.style.display = (!q || text.indexOf(q) !== -1) ? "" : "none";');
w('    });');
w('    /* Also filter accordions in all view */');
w('    var accs = document.querySelectorAll("#view-all .accordion");');
w('    accs.forEach(function(acc){');
w('      var innerItems = acc.querySelectorAll(".all-comp-item");');
w('      var anyVisible = false;');
w('      innerItems.forEach(function(ai){');
w('        if (ai.style.display !== "none") anyVisible = true;');
w('      });');
w('      acc.style.display = anyVisible || !q ? "" : "none";');
w('      if (q && anyVisible) acc.classList.add("open");');
w('    });');
w('  });');
w('  allCompSearch.addEventListener("keydown", function(e){');
w('    if (e.key === "Enter") {');
w('      var q = allCompSearch.value.toLowerCase().trim();');
w('      if (!q) return;');
w('      var match = allSearchable.find(function(p){ return p.title.toLowerCase().indexOf(q) !== -1; });');
w('      if (match) { navigate(match.id); allCompSearch.value = ""; allCompSearch.blur(); }');
w('    }');
w('  });');
w('}');
w('');
w('/* Keyboard shortcut Cmd+K — focus nearest visible search */');
w('document.addEventListener("keydown", function(e){');
w('  if ((e.metaKey || e.ctrlKey) && e.key === "k") {');
w('    e.preventDefault();');
w('    var activeView = document.querySelector(".view.active");');
w('    var inp = activeView ? activeView.querySelector(".inline-search input") : null;');
w('    if (!inp) inp = sidebarSearchInput;');
w('    if (inp) { inp.focus(); inp.select(); }');
w('  }');
w('});');
w('');
w('/* Reset sidebar search on navigate */');
w('var origNavigate = navigate;');
w('navigate = function(viewId, options) {');
w('  options = options || {};');
w('  origNavigate(viewId, options);');
w('  if (sidebarSearchInput) sidebarSearchInput.value = "";');
w('  if (!options.skipHash) {');
w('    var nextHash = "#" + encodeURIComponent(viewId);');
w('    if (window.location.hash !== nextHash) {');
w('      if (window.history && window.history.replaceState) window.history.replaceState(null, "", nextHash);');
w('      else window.location.hash = nextHash;');
w('    }');
w('  }');
w('};');
w('');
w('window.addEventListener("hashchange", function(){');
w('  var hashView = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "home";');
w('  if (hashView && hashView !== currentView) navigate(hashView, { skipHash: true });');
w('});');
w('var initialView = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "home";');
w('navigate(initialView, { skipHash: true });');
w('');
w('/* Create component workflow */');
w('(function(){');
w('  var promptInput = document.getElementById("createComponentPrompt");');
w('  var imageInput = document.getElementById("createComponentImageInput");');
w('  var imageClearBtn = document.getElementById("createComponentImageClearBtn");');
w('  var imageMeta = document.getElementById("createComponentImageMeta");');
w('  var imagePreview = document.getElementById("createComponentImagePreview");');
w('  var imagePreviewImg = document.getElementById("createComponentImagePreviewImg");');
w('  var imagePlaceholder = document.getElementById("createComponentImagePlaceholder");');
w('  var generateBtn = document.getElementById("createComponentGenerateBtn");');
w('  var serverNote = document.getElementById("createComponentServerNote");');
w('  var statusEl = document.getElementById("createComponentStatus");');
w('  var previewEmpty = document.getElementById("createComponentPreviewEmpty");');
w('  var previewBody = document.getElementById("createComponentPreviewBody");');
w('  var idValue = document.getElementById("createComponentIdValue");');
w('  var folderValue = document.getElementById("createComponentFolderValue");');
w('  var typeValue = document.getElementById("createComponentTypeValue");');
w('  var sourceValue = document.getElementById("createComponentSourceValue");');
w('  var layoutValue = document.getElementById("createComponentLayoutValue");');
w('  var stateList = document.getElementById("createComponentStateList");');
w('  var assumptionList = document.getElementById("createComponentAssumptionList");');
w('  var ambiguityList = document.getElementById("createComponentAmbiguityList");');
w('  var fileList = document.getElementById("createComponentFileList");');
w('  var reloadBtn = document.getElementById("createComponentReloadBtn");');
w('  var previewTimer = null;');
w('  var previewRequestId = 0;');
w('  var imageAnalysisRequestId = 0;');
w('  var apiReady = false;');
w('  var isSubmitting = false;');
w('  var lastCreatedViewId = "";');
w('  var selectedImageReference = null;');
w('  var serverHelpMessage = "Component creation requires node _design-library-server.js. Open this page from that local server and reload it.";');
w('  generateBtn.disabled = true;');
w('');
w('  function setStatus(message, tone) {');
w('    statusEl.textContent = message;');
w('    statusEl.className = "create-comp-status" + (tone ? " is-" + tone : "");');
w('  }');
w('');
w('  function formatLabel(value) {');
w('    return String(value || "").replace(/[-_]+/g, " ").replace(/\b\w/g, function(chr) { return chr.toUpperCase(); });');
w('  }');
w('');
w('  function formatInferenceSource(value) {');
w('    if (value === "prompt+image") return "Prompt + Image";');
w('    if (value === "prompt") return "Prompt";');
w('    if (value === "image") return "Image";');
w('    return "—";');
w('  }');
w('');
w('  function renderTextList(listEl, items, emptyMessage) {');
w('    listEl.innerHTML = "";');
w('    var values = Array.isArray(items) ? items.filter(Boolean) : [];');
w('    if (!values.length) values = [emptyMessage];');
w('    values.forEach(function(text) {');
w('      var item = document.createElement("li");');
w('      item.textContent = text;');
w('      listEl.appendChild(item);');
w('    });');
w('  }');
w('');
w('  function renderStateList(items) {');
w('    stateList.innerHTML = "";');
w('    var values = Array.isArray(items) ? items.filter(Boolean) : [];');
w('    if (!values.length) values = ["default"];');
w('    values.forEach(function(text) {');
w('      var item = document.createElement("li");');
w('      item.textContent = formatLabel(text).replace(/\bOtp\b/g, "OTP");');
w('      stateList.appendChild(item);');
w('    });');
w('  }');
w('');
w('  function updateGenerateAvailability() {');
w('    var hasInput = !!promptInput.value.trim() || !!selectedImageReference;');
w('    generateBtn.disabled = !apiReady || !hasInput || isSubmitting;');
w('  }');
w('');
w('  function setImagePreview(dataUrl) {');
w('    if (dataUrl) {');
w('      imagePreview.classList.remove("is-empty");');
w('      imagePreviewImg.hidden = false;');
w('      imagePreviewImg.src = dataUrl;');
w('      imagePlaceholder.hidden = true;');
w('      imageClearBtn.hidden = false;');
w('    } else {');
w('      imagePreview.classList.add("is-empty");');
w('      imagePreviewImg.hidden = true;');
w('      imagePreviewImg.removeAttribute("src");');
w('      imagePlaceholder.hidden = false;');
w('      imagePlaceholder.textContent = "No image reference selected.";');
w('      imageClearBtn.hidden = true;');
w('    }');
w('  }');
w('');
w('  function resetPreview() {');
w('    previewEmpty.hidden = false;');
w('    previewBody.hidden = true;');
w('    idValue.textContent = "—";');
w('    folderValue.textContent = "—";');
w('    typeValue.textContent = "—";');
w('    sourceValue.textContent = "—";');
w('    layoutValue.textContent = "—";');
w('    renderStateList([]);');
w('    renderTextList(assumptionList, [], "No extra assumptions.");');
w('    renderTextList(ambiguityList, [], "No open ambiguities.");');
w('    fileList.innerHTML = "";');
w('    reloadBtn.hidden = true;');
w('    lastCreatedViewId = "";');
w('  }');
w('');
w('  function renderPreview(data) {');
w('    var hasPreview = !!(data && (data.componentId || data.inferredLayout || data.scaffoldType || (data.assumptions && data.assumptions.length) || (data.ambiguities && data.ambiguities.length)));');
w('    if (!hasPreview) { resetPreview(); return; }');
w('    previewEmpty.hidden = true;');
w('    previewBody.hidden = false;');
w('    idValue.textContent = data.componentId || "Needs clarification";');
w('    folderValue.textContent = data.folderPath || "—";');
w('    typeValue.textContent = formatLabel(data.scaffoldType || data.inferredComponentType || "generic").replace(/\bOtp\b/g, "OTP");');
w('    sourceValue.textContent = formatInferenceSource(data.inferenceSource);');
w('    layoutValue.textContent = data.inferredLayout || "—";');
w('    renderStateList(data.detectedStates || []);');
w('    renderTextList(assumptionList, data.assumptions, "No extra assumptions.");');
w('    renderTextList(ambiguityList, data.ambiguities, "No open ambiguities.");');
w('    fileList.innerHTML = "";');
w('    (data.files || []).forEach(function(file) {');
w('      var item = document.createElement("li");');
w('      item.textContent = file;');
w('      fileList.appendChild(item);');
w('    });');
w('  }');
w('');
w('  function setServerNote(message, ready) {');
w('    serverNote.textContent = message;');
w('    apiReady = !!ready;');
w('    updateGenerateAvailability();');
w('  }');
w('');
w('  function fetchJson(url, options) {');
w('    return fetch(url, options).then(function(response) {');
w('      return response.json().catch(function() { return {}; }).then(function(data) {');
w('        if (!response.ok) {');
w('          var error = new Error(data && data.message ? data.message : "Request failed");');
w('          error.data = data || {};');
w('          throw error;');
w('        }');
w('        return data;');
w('      });');
w('    });');
w('  }');
w('');
w('  function normalizeHintText(value) {');
w('    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();');
w('  }');
w('');
w('  function roundNumber(value, digits) {');
w('    var factor = Math.pow(10, digits || 0);');
w('    return Math.round(value * factor) / factor;');
w('  }');
w('');
w('  function readFileAsDataUrl(file) {');
w('    return new Promise(function(resolve, reject) {');
w('      var reader = new FileReader();');
w('      reader.onload = function() { resolve(String(reader.result || "")); };');
w('      reader.onerror = function() { reject(new Error("Unable to read the selected image.")); };');
w('      reader.readAsDataURL(file);');
w('    });');
w('  }');
w('');
w('  function loadImage(dataUrl) {');
w('    return new Promise(function(resolve, reject) {');
w('      var img = new Image();');
w('      img.onload = function() { resolve(img); };');
w('      img.onerror = function() { reject(new Error("Unable to load the selected image.")); };');
w('      img.src = dataUrl;');
w('    });');
w('  }');
w('');
w('  function findRuns(values, threshold, minLength) {');
w('    var runs = [];');
w('    var start = -1;');
w('    for (var index = 0; index < values.length; index += 1) {');
w('      if (values[index] >= threshold) {');
w('        if (start === -1) start = index;');
w('      } else if (start !== -1) {');
w('        if (index - start >= minLength) runs.push({ start: start, end: index - 1, width: index - start });');
w('        start = -1;');
w('      }');
w('    }');
w('    if (start !== -1 && values.length - start >= minLength) {');
w('      runs.push({ start: start, end: values.length - 1, width: values.length - start });');
w('    }');
w('    return runs;');
w('  }');
w('');
w('  function averageRunWidth(runs) {');
w('    if (!runs.length) return 0;');
w('    return runs.reduce(function(total, run) { return total + run.width; }, 0) / runs.length;');
w('  }');
w('');
w('  function inferStatesFromImageName(fileName) {');
w('    var text = normalizeHintText(fileName);');
w('    var states = ["default"];');
w('    if (/\brequired\b|\bmandatory\b/.test(text)) states.push("required");');
w('    if (/\bdisabled\b|\breadonly\b|\bread only\b/.test(text)) states.push("disabled");');
w('    if (/\berror\b|\bvalidation\b/.test(text)) states.push("error");');
w('    return states;');
w('  }');
w('');
w('  function analyzeImageReference(file, img, dataUrl) {');
w('    var naturalWidth = img.naturalWidth || img.width || 0;');
w('    var naturalHeight = img.naturalHeight || img.height || 0;');
w('    var aspectRatio = naturalWidth && naturalHeight ? naturalWidth / naturalHeight : 0;');
w('    var maxSide = 96;');
w('    var scale = Math.min(1, maxSide / Math.max(naturalWidth || 1, naturalHeight || 1));');
w('    var width = Math.max(16, Math.round(naturalWidth * scale));');
w('    var height = Math.max(16, Math.round(naturalHeight * scale));');
w('    var canvas = document.createElement("canvas");');
w('    var ctx = canvas.getContext("2d", { willReadFrequently: true });');
w('    var columnCounts = new Array(width).fill(0);');
w('    var rowCounts = new Array(height).fill(0);');
w('    var bandCounts = new Array(width).fill(0);');
w('    var foregroundCount = 0;');
w('    var bandStart = Math.max(0, Math.floor(height * 0.32));');
w('    var bandEnd = Math.min(height - 1, Math.ceil(height * 0.78));');
w('    var fileHint = normalizeHintText(file && file.name);');
w('');
w('    canvas.width = width;');
w('    canvas.height = height;');
w('    ctx.drawImage(img, 0, 0, width, height);');
w('');
w('    var pixels = ctx.getImageData(0, 0, width, height).data;');
w('    var backgroundSamples = [];');
w('    var samplePoints = [');
w('      [0, 0],');
w('      [width - 1, 0],');
w('      [0, height - 1],');
w('      [width - 1, height - 1],');
w('      [Math.floor(width / 2), 0],');
w('      [Math.floor(width / 2), height - 1]');
w('    ];');
w('');
w('    samplePoints.forEach(function(point) {');
w('      var idx = (point[1] * width + point[0]) * 4;');
w('      var alpha = pixels[idx + 3] / 255;');
w('      var brightness = (pixels[idx] * 0.299 + pixels[idx + 1] * 0.587 + pixels[idx + 2] * 0.114) * alpha + 255 * (1 - alpha);');
w('      backgroundSamples.push(brightness);');
w('    });');
w('');
w('    var backgroundBrightness = backgroundSamples.reduce(function(total, value) { return total + value; }, 0) / Math.max(backgroundSamples.length, 1);');
w('');
w('    for (var y = 0; y < height; y += 1) {');
w('      for (var x = 0; x < width; x += 1) {');
w('        var offset = (y * width + x) * 4;');
w('        var alpha = pixels[offset + 3] / 255;');
w('        var brightness = (pixels[offset] * 0.299 + pixels[offset + 1] * 0.587 + pixels[offset + 2] * 0.114) * alpha + 255 * (1 - alpha);');
w('        var isForeground = alpha > 0.08 && Math.abs(brightness - backgroundBrightness) > 44;');
w('        if (!isForeground) continue;');
w('        foregroundCount += 1;');
w('        columnCounts[x] += 1;');
w('        rowCounts[y] += 1;');
w('        if (y >= bandStart && y <= bandEnd) bandCounts[x] += 1;');
w('      }');
w('    }');
w('');
w('    var bandHeight = Math.max(1, bandEnd - bandStart + 1);');
w('    var midBandRatios = bandCounts.map(function(count) { return count / bandHeight; });');
w('    var rowRatios = rowCounts.map(function(count) { return count / width; });');
w('    var midRuns = findRuns(midBandRatios, 0.08, 2);');
w('    var rowRuns = findRuns(rowRatios, 0.08, 2);');
w('    var avgRunWidth = averageRunWidth(midRuns);');
w('    var foregroundRatio = foregroundCount / Math.max(width * height, 1);');
w('    var wireframeLike = foregroundRatio <= 0.17;');
w('    var wideControl = midRuns.length <= 2 && aspectRatio >= 2.2 && rowRuns.length <= 5;');
w('    var otpLike = midRuns.length >= 4 && midRuns.length <= 8 && aspectRatio >= 1.8 && wireframeLike && avgRunWidth <= width * 0.22;');
w('    var ratingLike = midRuns.length >= 4 && midRuns.length <= 6 && aspectRatio >= 1.5 && avgRunWidth <= width * 0.18 && foregroundRatio >= 0.03;');
w('');
w('    if (/\botp\b|\bpasscode\b|\bverification\b/.test(fileHint)) otpLike = true;');
w('    if (/\brating\b|\bstar\b|\bfeedback\b|\breview\b/.test(fileHint)) ratingLike = true;');
w('');
w('    var inferredType = "generic";');
w('    var inferredName = "";');
w('    var layout = "";');
w('    var confidence = "low";');
w('    var assumptions = [];');
w('    var ambiguities = [];');
w('');
w('    if (otpLike && !ratingLike) {');
w('      inferredType = "otp";');
w('      inferredName = "OTP Field";');
w('      layout = Math.max(4, Math.min(8, midRuns.length || 6)) + " horizontally arranged single-character input boxes";');
w('      confidence = midRuns.length >= 6 ? "high" : "medium";');
w('      assumptions.push("The repeated box pattern was interpreted as a verification-code style input.");');
w('    } else if (ratingLike && !otpLike) {');
w('      inferredType = "rating";');
w('      inferredName = "Rating Field";');
w('      layout = Math.max(4, Math.min(6, midRuns.length || 5)) + " horizontally arranged choice controls";');
w('      confidence = midRuns.length === 5 ? "high" : "medium";');
w('      assumptions.push("The repeated compact controls were interpreted as a rating selector.");');
w('    } else if (wideControl) {');
w('      inferredType = "generic";');
w('      inferredName = "Text Input Field";');
w('      layout = "single horizontal control with a standard label and validation states";');
w('      confidence = "medium";');
w('      assumptions.push("The image looks closest to a single input control, so a generic starter scaffold will be used unless the prompt specifies more detail.");');
w('    } else {');
w('      ambiguities.push("The image is too ambiguous to identify a specialized field safely.");');
w('      assumptions.push("Add a short prompt if you want a more specific scaffold name or interaction pattern.");');
w('    }');
w('');
w('    return {');
w('      previewUrl: dataUrl,');
w('      reference: {');
w('        fileName: file && file.name ? file.name : "image-reference",');
w('        mimeType: file && file.type ? file.type : "image/*",');
w('        width: naturalWidth,');
w('        height: naturalHeight,');
w('        aspectRatio: aspectRatio ? roundNumber(aspectRatio, 3) : 0,');
w('        inferredType: inferredType,');
w('        inferredName: inferredName,');
w('        layout: layout,');
w('        confidence: confidence,');
w('        detectedStates: inferStatesFromImageName(file && file.name),');
w('        assumptions: assumptions,');
w('        ambiguities: ambiguities');
w('      }');
w('    };');
w('  }');
w('');
w('  function buildRequestPayload() {');
w('    return {');
w('      prompt: promptInput.value.trim(),');
w('      imageReference: selectedImageReference');
w('    };');
w('  }');
w('');
w('  function requestPreview() {');
w('    var payload = buildRequestPayload();');
w('    var hasInput = !!payload.prompt || !!payload.imageReference;');
w('    previewRequestId += 1;');
w('    var requestId = previewRequestId;');
w('');
w('    updateGenerateAvailability();');
w('');
w('    if (!hasInput) {');
w('      resetPreview();');
w('      setStatus("Enter a prompt or attach an image to preview the generated folder and file names.");');
w('      return;');
w('    }');
w('');
w('    fetchJson("/__design-library/component-preview", {');
w('      method: "POST",');
w('      headers: { "Content-Type": "application/json" },');
w('      body: JSON.stringify(payload)');
w('    }).then(function(data) {');
w('      if (requestId !== previewRequestId) return;');
w('      renderPreview(data);');
w('      setStatus(data.message, data.code === "READY" ? "success" : "error");');
w('    }).catch(function(error) {');
w('      if (requestId !== previewRequestId) return;');
w('      resetPreview();');
w('      setServerNote(serverHelpMessage, false);');
w('      setStatus(error.message || "Unable to preview the component scaffold.", "error");');
w('    });');
w('  }');
w('');
w('  function schedulePreview() {');
w('    clearTimeout(previewTimer);');
w('    previewTimer = setTimeout(requestPreview, 250);');
w('  }');
w('');
w('  function clearSelectedImage(options) {');
w('    selectedImageReference = null;');
w('    if (!options || options.clearInput !== false) imageInput.value = "";');
w('    imageMeta.textContent = "No image reference selected.";');
w('    setImagePreview("");');
w('    updateGenerateAvailability();');
w('  }');
w('');
w('  function handleImageSelection(file) {');
w('    imageAnalysisRequestId += 1;');
w('    var requestId = imageAnalysisRequestId;');
w('');
w('    if (!file) {');
w('      clearSelectedImage();');
w('      schedulePreview();');
w('      return;');
w('    }');
w('');
w('    imageMeta.textContent = "Analyzing image reference…";');
w('    imagePlaceholder.textContent = "Analyzing image reference…";');
w('    setImagePreview("");');
w('    setStatus("Analyzing image reference…", "working");');
w('');
w('    readFileAsDataUrl(file).then(function(dataUrl) {');
w('      return loadImage(dataUrl).then(function(img) {');
w('        return analyzeImageReference(file, img, dataUrl);');
w('      });');
w('    }).then(function(result) {');
w('      if (requestId !== imageAnalysisRequestId) return;');
w('      selectedImageReference = result.reference;');
w('      imageMeta.textContent = result.reference.fileName + " • " + result.reference.width + "×" + result.reference.height + " • " + formatLabel(result.reference.confidence) + " confidence";');
w('      setImagePreview(result.previewUrl);');
w('      updateGenerateAvailability();');
w('      schedulePreview();');
w('    }).catch(function(error) {');
w('      if (requestId !== imageAnalysisRequestId) return;');
w('      clearSelectedImage({ clearInput: false });');
w('      setStatus(error.message || "Unable to analyze the selected image.", "error");');
w('    });');
w('  }');
w('');
w('  fetchJson("/__design-library/status").then(function() {');
w('    setServerNote("Local scaffold API ready. Generated files will be written under forms/.", true);');
w('  }).catch(function() {');
w('    setServerNote(serverHelpMessage, false);');
w('    setStatus(serverHelpMessage, "error");');
w('  });');
w('');
w('  promptInput.addEventListener("input", function() {');
w('    schedulePreview();');
w('  });');
w('');
w('  imageInput.addEventListener("change", function() {');
w('    var file = imageInput.files && imageInput.files[0];');
w('    handleImageSelection(file || null);');
w('  });');
w('');
w('  imageClearBtn.addEventListener("click", function() {');
w('    clearSelectedImage();');
w('    schedulePreview();');
w('  });');
w('');
w('  generateBtn.addEventListener("click", function() {');
w('    var payload = buildRequestPayload();');
w('    if (!payload.prompt && !payload.imageReference) {');
w('      resetPreview();');
w('      setStatus("Enter a prompt or attach an image before generating a component scaffold.", "error");');
w('      return;');
w('    }');
w('    if (!apiReady) {');
w('      setStatus(serverHelpMessage, "error");');
w('      return;');
w('    }');
w('');
w('    isSubmitting = true;');
w('    updateGenerateAvailability();');
w('    setStatus("Generating component scaffold…", "working");');
w('');
w('    fetchJson("/__design-library/create-component", {');
w('      method: "POST",');
w('      headers: { "Content-Type": "application/json" },');
w('      body: JSON.stringify(payload)');
w('    }).then(function(data) {');
w('      renderPreview(data);');
w('      lastCreatedViewId = data.viewId || ("form-fields/" + data.componentId);');
w('      reloadBtn.hidden = false;');
w('      setStatus("Component scaffold created successfully. The design library was rebuilt and is ready to reload.", "success");');
w('    }).catch(function(error) {');
w('      var data = error.data || {};');
w('      if (data.componentId) renderPreview(data);');
w('      setStatus(error.message || "Unable to create the component scaffold.", "error");');
w('    }).finally(function() {');
w('      isSubmitting = false;');
w('      updateGenerateAvailability();');
w('    });');
w('  });');
w('');
w('  reloadBtn.addEventListener("click", function() {');
w('    if (!lastCreatedViewId) return;');
w('    window.location.hash = encodeURIComponent(lastCreatedViewId);');
w('    window.location.reload();');
w('  });');
w('');
w('  clearSelectedImage();');
w('  resetPreview();');
w('  updateGenerateAvailability();');
w('})();');
w('');

/* ═══ Card Layout Configurator JS ═══ */
/* Build variant map: key → {html, formattedHtml, formattedCss, title} */
w('/* Card Layout Configurator */');
w('(function(){');
w('  var cfgEl = {');
w('    cardType: document.getElementById("cfgCardType"),');
w('    shape: document.getElementById("cfgShape"),');
w('    position: document.getElementById("cfgPosition"),');
w('    lineType: document.getElementById("cfgLineType"),');
w('    shapeGroup: document.getElementById("cfgShapeGroup"),');
w('    posGroup: document.getElementById("cfgPosGroup"),');
w('    align: document.getElementById("cfgAlign"),');
w('    alignGroup: document.getElementById("cfgAlignGroup"),');
w('    preview: document.getElementById("cfgPreview"),');
w('    previewTitle: document.getElementById("cfgPreviewTitle"),');

w('    codeHtml: document.getElementById("cfgCodeHtml"),');
w('    codeCss: document.getElementById("cfgCodeCss"),');
w('    variantCard: document.getElementById("cfgVariantCard")');
w('  };');
w('  if (!cfgEl.cardType) return;');
w('');

// Build the variant map as a JS object literal
var variantMapJs = '  var variantMap = {\n';
allCardVariants.forEach(function(v, idx) {
  var key = v.id; // e.g. "card1-single-line", "card3-square-left-single-line"
  var escapedHtml = v.body.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
  var escapedFormattedHtml = escHtml(v.body).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
  var escapedFormattedCss = escCss(v.cleanCss).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
  variantMapJs += '    "' + key + '": {html:\'' + escapedHtml + '\',fmtHtml:\'' + escapedFormattedHtml + '\',fmtCss:\'' + escapedFormattedCss + '\',title:"' + v.title.replace(/"/g, '\\"') + '"}';
  variantMapJs += (idx < allCardVariants.length - 1 ? ',\n' : '\n');
});
variantMapJs += '  };';
w(variantMapJs);
w('');

/* Card type configuration: which options are available per card type */
w('  var cardTypeConfig = {');
w('    1: {hasShape:false, hasPosition:false, hasAlign:true},');
w('    2: {hasShape:false, hasPosition:false, hasAlign:true},');
w('    3: {hasShape:true, hasPosition:true, hasAlign:false},');
w('    4: {hasShape:true, hasPosition:true, hasAlign:false},');
w('    5: {hasShape:false, hasPosition:false, hasAlign:false}');
w('  };');
w('');

/* State */
w('  var state = {cardType:"1", shape:"square", position:"left", lineType:"single", textAlign:"left"};');
w('');

/* Build variant key from state */
w('  function buildKey() {');
w('    var cfg = cardTypeConfig[state.cardType];');
w('    var parts = ["card" + state.cardType];');
w('    if (cfg.hasShape) parts.push(state.shape);');
w('    if (cfg.hasPosition) parts.push(state.position);');
w('    if (cfg.hasAlign) parts.push(state.textAlign);');
w('    parts.push(state.lineType + "-line");');
w('    return parts.join("-");');
w('  }');
w('');

/* Render the current selection */
w('  function render() {');
w('    var cfg = cardTypeConfig[state.cardType];');
w('    /* Show/hide shape & position groups */');
w('    cfgEl.shapeGroup.style.display = cfg.hasShape ? "" : "none";');
w('    cfgEl.posGroup.style.display = cfg.hasPosition ? "" : "none";');
w('    cfgEl.alignGroup.style.display = cfg.hasAlign ? "" : "none";');
w('    /* Build key and look up variant */');
w('    var key = buildKey();');
w('    var variant = variantMap[key];');
w('    if (!variant) return;');
w('    /* Update preview */');
w('    cfgEl.preview.innerHTML = variant.html;');
w('    cfgEl.previewTitle.textContent = variant.title + " \\u2014 Live Preview";');

w('    /* Update code */');
w('    cfgEl.codeHtml.innerHTML = variant.fmtHtml;');
w('    cfgEl.codeCss.innerHTML = variant.fmtCss;');
w('    /* Reset code visibility */');
w('    cfgEl.variantCard.classList.remove("code-visible");');
w('    var toggleBtn = cfgEl.variantCard.querySelector(".variant-code-toggle");');
w('    if (toggleBtn) { toggleBtn.classList.remove("active"); toggleBtn.innerHTML = \'<i class="fa-solid fa-code"></i> Show Code\'; }');
w('  }');
w('');

/* Pill click handler factory */
w('  function setupPills(container, stateKey) {');
w('    var pills = container.querySelectorAll(".cfg-pill");');
w('    pills.forEach(function(pill) {');
w('      pill.addEventListener("click", function() {');
w('        pills.forEach(function(p){ p.classList.remove("active"); });');
w('        pill.classList.add("active");');
w('        state[stateKey] = pill.dataset.value;');
w('        render();');
w('      });');
w('    });');
w('  }');
w('');

/* Wire up card type selector (visual cards) */
w('  (function(){');
w('    var cards = cfgEl.cardType.querySelectorAll(".cfg-type-card");');
w('    cards.forEach(function(card){');
w('      card.addEventListener("click", function(){');
w('        cards.forEach(function(c){ c.classList.remove("active"); });');
w('        card.classList.add("active");');
w('        state.cardType = card.dataset.value;');
w('        render();');
w('      });');
w('    });');
w('  })();');

/* Wire up sub-tab pill groups */
w('  setupPills(cfgEl.shape, "shape");');
w('  setupPills(cfgEl.position, "position");');
w('  setupPills(cfgEl.align, "textAlign");');
w('  setupPills(cfgEl.lineType, "lineType");');
w('');

/* Initial render */
w('  render();');
w('})();');

w('');
w('})();');

/* Report-specific JS */
if (reportAllJs) {
  w('');
  w('/* Report rendering JS */');
  w(reportAllJs);
}

/* Form component JS (dropdown, multi-select, etc.) */
if (formAllJs) {
  w('');
  w('/* ===== Form Component Interactive JS ===== */');
  w(formAllJs);
}

/* ── Color picker JS ── */
w('');
w('/* ===== Label Placement Tabs ===== */');
w('(function(){');
w('  function setupInplace(formEl) {');
w('    if (!formEl || formEl._inplaceSetup) return;');
w('    formEl._inplaceSetup = true;');
w('    var groups = formEl.querySelectorAll(".form-group");');
w('    groups.forEach(function(grp) {');
w('      var inputs = grp.querySelectorAll("input.form-control, textarea.form-control, select.form-control");');
w('      var label = grp.querySelector(".form-label");');
w('      inputs.forEach(function(inp) {');
w('        inp.addEventListener("focus", function() {');
w('          if (!formEl.classList.contains("label-inplace")) return;');
w('          if (label) label.classList.add("zc-focus");');
w('        });');
w('        inp.addEventListener("blur", function() {');
w('          if (!formEl.classList.contains("label-inplace")) return;');
w('          if (label) label.classList.remove("zc-focus");');
w('        });');
w('      });');
w('    });');
w('  }');
w('  function enableInplace(formEl) {');
w('    if (!formEl) return;');
w('    setupInplace(formEl);');
w('    /* Add zc-label-float to all form-groups and remove placeholders */');
w('    formEl.querySelectorAll(".form-group").forEach(function(grp) {');
w('      grp.classList.add("zc-label-float");');
w('    });');
w('    formEl.querySelectorAll("input.form-control, textarea.form-control").forEach(function(inp) {');
w('      /* Keep placeholders for composite sub-fields (address, name) — they act as inline labels */');
w('      if (inp.closest(".compositeWrapper")) return;');
w('      inp._savedPlaceholder = inp.getAttribute("placeholder") || "";');
w('      inp.setAttribute("placeholder", "");');
w('    });');
w('  }');
w('  function disableInplace(formEl) {');
w('    if (!formEl) return;');
w('    formEl.querySelectorAll(".form-group").forEach(function(grp) {');
w('      grp.classList.remove("zc-label-float");');
w('      var label = grp.querySelector(".form-label");');
w('      if (label) label.classList.remove("zc-focus");');
w('    });');
w('    /* Restore placeholders */');
w('    formEl.querySelectorAll("input.form-control, textarea.form-control").forEach(function(inp) {');
w('      if (typeof inp._savedPlaceholder === "string") {');
w('        inp.setAttribute("placeholder", inp._savedPlaceholder);');
w('        delete inp._savedPlaceholder;');
w('      }');
w('    });');
w('  }');
w('  document.addEventListener("click", function(e) {');
w('    var tab = e.target.closest(".label-placement-tab");');
w('    if (!tab) return;');
w('    var card = tab.closest(".variant-card");');
w('    if (!card) return;');
w('    var tabGroup = tab.closest(".label-placement-tabs");');
w('    tabGroup.querySelectorAll(".label-placement-tab").forEach(function(t) { t.classList.remove("is-active"); });');
w('    tab.classList.add("is-active");');
w('    var placement = tab.getAttribute("data-placement");');
w('    var formEl = card.querySelector(".form-table");');
w('    if (!formEl) return;');
w('    ["label-left", "label-right", "label-top", "label-inplace"].forEach(function(cls) { formEl.classList.remove(cls); });');
w('    formEl.classList.add(placement);');
w('    if (placement === "label-inplace") {');
w('      enableInplace(formEl);');
w('    } else {');
w('      disableInplace(formEl);');
w('    }');
w('  });');
w('})();');
w('');
w('/* ===== Primary Color Picker ===== */');
w('(function(){');
w('  document.addEventListener("input", function(e) {');
w('    if (!e.target.classList.contains("primary-color-picker")) return;');
w('    var hex = e.target.value;');
w('    document.documentElement.style.setProperty("--primary-color", hex);');
w('    document.documentElement.style.setProperty("--primary-opacity", hex + "1f");');
w('    document.documentElement.style.setProperty("--color-primary", hex);');
w('    document.documentElement.style.setProperty("--color-primary-dark", hex);');
w('    document.documentElement.style.setProperty("--color-border-focus", hex);');
w('    document.querySelectorAll(".primary-color-picker").forEach(function(p){ p.value = hex; });');
w('  });');
w('})();');

/* ── Form field validation JS ── */
w('');
w('/* ===== Form Field Validation ===== */');
w('(function(){');
w('  var requiredInputs = document.querySelectorAll(".form-input[required]");');
w('  requiredInputs.forEach(function(input){');
w('    var errorEl = document.getElementById(input.getAttribute("aria-describedby"));');
w('    var field = input.closest(".form-field");');
w('    input.addEventListener("blur", function(){ validateInput(input, errorEl, field); });');
w('    input.addEventListener("input", function(){');
w('      if (input.getAttribute("aria-invalid") === "true") validateInput(input, errorEl, field);');
w('    });');
w('  });');
w('  var requiredTextareas = document.querySelectorAll(".form-textarea[required]");');
w('  requiredTextareas.forEach(function(ta){');
w('    var errorEl = document.getElementById(ta.getAttribute("aria-describedby"));');
w('    var field = ta.closest(".form-field");');
w('    ta.addEventListener("blur", function(){');
w('      if (!ta.value.trim()) { ta.setAttribute("aria-invalid","true"); if(errorEl) errorEl.hidden=false; if(field) field.classList.add("validationError"); }');
w('      else { ta.removeAttribute("aria-invalid"); if(errorEl) errorEl.hidden=true; if(field) field.classList.remove("validationError"); }');
w('    });');
w('    ta.addEventListener("input", function(){');
w('      if (ta.getAttribute("aria-invalid") === "true") { ta.removeAttribute("aria-invalid"); if(errorEl) errorEl.hidden=true; if(field) field.classList.remove("validationError"); }');
w('    });');
w('  });');
w('  function validateInput(input, errorEl, field){');
w('    if (!input.value.trim()) { input.setAttribute("aria-invalid","true"); if(errorEl) errorEl.hidden=false; if(field) field.classList.add("validationError"); }');
w('    else { input.removeAttribute("aria-invalid"); if(errorEl) errorEl.hidden=true; if(field) field.classList.remove("validationError"); }');
w('  }');
w('})();');

w('</script>');
w('</body>');
w('</html>');

/* ═══ WRITE OUTPUT ═══ */
var result = O.join('\n');
fs.writeFileSync(path.join(ROOT, 'dist', 'design-library.html'), result, 'utf8');
console.log('Done! dist/design-library.html generated (' + (result.length / 1024).toFixed(0) + ' KB, ' + O.length + ' lines)');
