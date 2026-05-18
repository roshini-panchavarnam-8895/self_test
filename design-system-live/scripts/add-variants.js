#!/usr/bin/env node
/**
 * Adds "default with help", "error case", and "disabled" variants
 * to every form-field component that is missing them.
 * Reference: text-input.html (the only complete component).
 */
var fs = require('fs');
var path = require('path');
var FORMS = path.join(__dirname, '..', 'src', 'components', 'forms');

var ERR_SVG = '<svg class="fieldErrorMsg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';

function writeComp(dir, body) {
  var name = path.basename(dir);
  var cssFile = name + '.css';
  var jsFiles = '';
  // Check for JS file
  var jsPath = path.join(FORMS, dir, name + '.js');
  if (fs.existsSync(jsPath)) {
    jsFiles = '\n  <script defer src="' + name + '.js"></script>';
  }
  var title = name.split('-').map(function(w){ return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
  var html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>' + title + ' Component</title>\n  <link rel="stylesheet" href="' + cssFile + '">' + jsFiles + '\n</head>\n<body>\n' + body + '\n</body>\n</html>';
  fs.writeFileSync(path.join(FORMS, dir, name + '.html'), html, 'utf8');
  console.log('  ✓ ' + name);
}

/* ═══════════════════════════════════════════════════
   TEXTAREA
   ═══════════════════════════════════════════════════ */
writeComp('textarea', [
  // Default with help
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="multi-line" class="form-label">Multi Line</label>',
  '    <div class="form-input-wrapper">',
  '      <textarea id="multi-line" name="multi_line" class="form-textarea" rows="10" placeholder="Enter your text here..." aria-describedby="multi-line-hint"></textarea>',
  '    </div>',
  '    <span id="multi-line-hint" class="form-hint">Maximum 65,535 characters</span>',
  '  </div>',
  '',
  // Error
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="multi-line-required" class="form-label">',
  '      Multi Line',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <textarea id="multi-line-required" name="multi_line_required" class="form-textarea" rows="10" required aria-required="true" aria-describedby="multi-line-error" placeholder="Enter your text here..."></textarea>',
  '    </div>',
  '    <div id="multi-line-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Enter a value.</span>',
  '    </div>',
  '  </div>',
  '',
  // Disabled
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="multi-line-disabled" class="form-label">Multi Line (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <textarea id="multi-line-disabled" name="multi_line_disabled" class="form-textarea" rows="10" disabled aria-disabled="true" placeholder="Disabled field"></textarea>',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   NUMBER INPUT
   ═══════════════════════════════════════════════════ */
writeComp('number-input', [
  // Default with help
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="number-field" class="form-label">Number</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="text" id="number-field" name="number" class="form-input" placeholder="######" inputmode="numeric" pattern="[0-9]*" aria-describedby="number-hint">',
  '    </div>',
  '    <span id="number-hint" class="form-hint">Enter a whole number</span>',
  '  </div>',
  '',
  // Error
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="number-field-required" class="form-label">',
  '      Number',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <input type="text" id="number-field-required" name="number_required" class="form-input" placeholder="######" inputmode="numeric" pattern="[0-9]*" required aria-required="true" aria-describedby="number-error">',
  '    </div>',
  '    <div id="number-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Enter a value.</span>',
  '    </div>',
  '  </div>',
  '',
  // Disabled
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="number-field-disabled" class="form-label">Number (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="text" id="number-field-disabled" name="number_disabled" class="form-input" placeholder="Disabled field" disabled aria-disabled="true">',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   DECIMAL INPUT
   ═══════════════════════════════════════════════════ */
writeComp('decimal-input', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="decimal" class="form-label">Decimal</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="text" id="decimal" name="decimal" class="form-input" placeholder="#######.##" inputmode="decimal" aria-describedby="decimal-hint">',
  '    </div>',
  '    <span id="decimal-hint" class="form-hint">Enter a decimal number</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="decimal-required" class="form-label">',
  '      Decimal',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <input type="text" id="decimal-required" name="decimal_required" class="form-input" placeholder="#######.##" inputmode="decimal" required aria-required="true" aria-describedby="decimal-error">',
  '    </div>',
  '    <div id="decimal-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Enter a value.</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="decimal-disabled" class="form-label">Decimal (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="text" id="decimal-disabled" name="decimal_disabled" class="form-input" placeholder="Disabled field" disabled aria-disabled="true">',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   CURRENCY INPUT
   ═══════════════════════════════════════════════════ */
writeComp('currency-input', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="currency" class="form-label">Currency</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="currency-input-group zc-flex zc-align-items-center">',
  '        <span class="currency-symbol" aria-hidden="true">&pound;</span>',
  '        <input type="text" id="currency" name="currency" class="form-input currency-input" placeholder="#,###,###.##" inputmode="decimal" aria-describedby="currency-hint">',
  '      </div>',
  '    </div>',
  '    <span id="currency-hint" class="form-hint">Enter amount in currency format</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="currency-required" class="form-label">',
  '      Currency',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <div class="currency-input-group zc-flex zc-align-items-center">',
  '        <span class="currency-symbol" aria-hidden="true">&pound;</span>',
  '        <input type="text" id="currency-required" name="currency_required" class="form-input currency-input" placeholder="#,###,###.##" inputmode="decimal" required aria-required="true" aria-describedby="currency-error">',
  '      </div>',
  '    </div>',
  '    <div id="currency-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Enter a value.</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="currency-disabled" class="form-label">Currency (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="currency-input-group zc-flex zc-align-items-center">',
  '        <span class="currency-symbol" aria-hidden="true">&pound;</span>',
  '        <input type="text" id="currency-disabled" name="currency_disabled" class="form-input currency-input" placeholder="Disabled field" disabled aria-disabled="true">',
  '      </div>',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   PERCENT INPUT
   ═══════════════════════════════════════════════════ */
writeComp('percent-input', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="percent" class="form-label">Percent</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="percent-input-group zc-flex zc-align-items-center">',
  '        <input type="text" id="percent" name="percent" class="form-input percent-input" inputmode="decimal" maxlength="10" aria-describedby="percent-hint">',
  '        <span class="percent-symbol" aria-hidden="true">%</span>',
  '      </div>',
  '    </div>',
  '    <span id="percent-hint" class="form-hint">Enter a percentage value</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="percent-required" class="form-label">',
  '      Percent',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <div class="percent-input-group zc-flex zc-align-items-center">',
  '        <input type="text" id="percent-required" name="percent_required" class="form-input percent-input" inputmode="decimal" maxlength="10" required aria-required="true" aria-describedby="percent-error">',
  '        <span class="percent-symbol" aria-hidden="true">%</span>',
  '      </div>',
  '    </div>',
  '    <div id="percent-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Enter a value.</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="percent-disabled" class="form-label">Percent (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="percent-input-group zc-flex zc-align-items-center">',
  '        <input type="text" id="percent-disabled" name="percent_disabled" class="form-input percent-input" placeholder="Disabled field" disabled aria-disabled="true">',
  '        <span class="percent-symbol" aria-hidden="true">%</span>',
  '      </div>',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   EMAIL INPUT
   ═══════════════════════════════════════════════════ */
writeComp('email-input', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="email" class="form-label">Email</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="email" id="email" name="email" class="form-input" placeholder="example@email.com" autocomplete="email" aria-describedby="email-hint">',
  '    </div>',
  '    <span id="email-hint" class="form-hint">Enter a valid email address</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="email-required" class="form-label">',
  '      Email',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <input type="email" id="email-required" name="email_required" class="form-input" placeholder="example@email.com" required aria-required="true" aria-describedby="email-error" autocomplete="email">',
  '    </div>',
  '    <div id="email-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>Please enter a valid email address</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="email-disabled" class="form-label">Email (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="email" id="email-disabled" name="email_disabled" class="form-input" placeholder="Disabled field" disabled aria-disabled="true">',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   PHONE INPUT  (intl-tel-input structure)
   ═══════════════════════════════════════════════════ */
var phoneCountryList = [
  '          <ul class="country-list" id="country-listbox" role="listbox" hidden>',
  '            <li class="country" role="option" data-dial-code="+91" data-country-code="in" data-country-name="India (भारत)"><div class="iti-flag in"></div><span class="country-name">India (भारत)</span><span class="dial-code">+91</span></li>',
  '            <li class="country" role="option" data-dial-code="+1" data-country-code="us" data-country-name="United States"><div class="iti-flag us"></div><span class="country-name">United States</span><span class="dial-code">+1</span></li>',
  '            <li class="country" role="option" data-dial-code="+44" data-country-code="gb" data-country-name="United Kingdom"><div class="iti-flag gb"></div><span class="country-name">United Kingdom</span><span class="dial-code">+44</span></li>',
  '            <li class="country" role="option" data-dial-code="+61" data-country-code="au" data-country-name="Australia"><div class="iti-flag au"></div><span class="country-name">Australia</span><span class="dial-code">+61</span></li>',
  '            <li class="country" role="option" data-dial-code="+86" data-country-code="cn" data-country-name="China (中国)"><div class="iti-flag cn"></div><span class="country-name">China (中国)</span><span class="dial-code">+86</span></li>',
  '            <li class="country" role="option" data-dial-code="+81" data-country-code="jp" data-country-name="Japan (日本)"><div class="iti-flag jp"></div><span class="country-name">Japan (日本)</span><span class="dial-code">+81</span></li>',
  '          </ul>'
].join('\n');

function phoneBlock(idSuffix, labelText, extraFieldClass, inputAttrs, afterInput) {
  var id = 'zc-Phone_Number' + idSuffix;
  var dialId = 'zc-selected-dial-code' + idSuffix;
  var countryId = 'zc-country-input' + idSuffix;
  var listId = 'country-listbox' + idSuffix;
  var labelId = id + '-arialabel';
  var lines = [];
  lines.push('  <div class="form-field zc-phonenumber-field' + (extraFieldClass ? ' ' + extraFieldClass : '') + '">');
  lines.push('    <label for="' + id + '" id="' + labelId + '" class="form-label zc_phonenumber_label">');
  lines.push('      <span class="zc-label-text">' + labelText + '</span>');
  lines.push('    </label>');
  lines.push('    <div class="form-input-wrapper form-phone-field">');
  lines.push('      <div class="intl-tel-input allow-dropdown separate-dial-code">');
  lines.push('        <div class="flag-container">');
  lines.push('          <div class="selected-flag" role="combobox" tabindex="0" title="India (भारत): +91" id="' + countryId + '" aria-labelledby="' + labelId + '" aria-expanded="false" aria-controls="' + listId + '">');
  lines.push('            <div class="iti-flag in"></div>');
  lines.push('            <div class="selected-dial-code" id="' + dialId + '">+91</div>');
  lines.push('            <div class="iti-arrow"></div>');
  lines.push('          </div>');
  lines.push(phoneCountryList.replace(/country-listbox/g, listId));
  lines.push('        </div>');
  lines.push('        <input id="' + id + '" class="form-control textfield" name="Phone_Number" type="tel" aria-labelledby="' + dialId + ' ' + labelId + '" autocomplete="off" placeholder="81234 56789"' + (inputAttrs ? ' ' + inputAttrs : '') + '>');
  lines.push('      </div>');
  lines.push('    </div>');
  if (afterInput) lines.push(afterInput);
  lines.push('  </div>');
  return lines.join('\n');
}

writeComp('phone-input', [
  phoneBlock('', 'Phone', '', 'aria-describedby="phone-hint"',
    '    <span id="phone-hint" class="form-hint">Enter phone number with country code</span>'),
  '',
  phoneBlock('-required', 'Phone<span class="fieldMandate" aria-hidden="true">*</span>', '', 'aria-required="true" aria-describedby="phone-error"',
    '    <div id="phone-error" class="fieldErrorMsg" role="alert" hidden>\n      ' + ERR_SVG + '\n      <span>Please enter a valid phone number</span>\n    </div>'),
  '',
  phoneBlock('-disabled', 'Phone (Disabled)', 'form-field-disabled', 'disabled aria-disabled="true"', '')
].join('\n'));

/* ═══════════════════════════════════════════════════
   URL INPUT
   ═══════════════════════════════════════════════════ */
writeComp('url-input', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="url-field" class="form-label">Url</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="url" id="url-field" name="url" class="form-input" placeholder="https://" autocomplete="url" aria-describedby="url-hint">',
  '    </div>',
  '    <span id="url-hint" class="form-hint">Enter a valid URL (https://...)</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="url-field-required" class="form-label">',
  '      Url',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <input type="url" id="url-field-required" name="url_required" class="form-input" placeholder="https://" required aria-required="true" aria-describedby="url-error" autocomplete="url">',
  '    </div>',
  '    <div id="url-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>Please enter a valid URL</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="url-field-disabled" class="form-label">Url (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="url" id="url-field-disabled" name="url_disabled" class="form-input" placeholder="Disabled field" disabled aria-disabled="true">',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   DATE INPUT
   ═══════════════════════════════════════════════════ */
writeComp('date-input', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="date-field" class="form-label">Date</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="date-input-group">',
  '        <input type="date" id="date-field" name="date" class="form-input date-input" aria-describedby="date-hint">',
  '      </div>',
  '    </div>',
  '    <span id="date-hint" class="form-hint">Select a date (dd-MMMM-yy)</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="date-field-required" class="form-label">',
  '      Date',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <div class="date-input-group">',
  '        <input type="date" id="date-field-required" name="date_required" class="form-input date-input" required aria-required="true" aria-describedby="date-error">',
  '      </div>',
  '    </div>',
  '    <div id="date-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Select a date.</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="date-field-disabled" class="form-label">Date (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="date-input-group">',
  '        <input type="date" id="date-field-disabled" name="date_disabled" class="form-input date-input" disabled aria-disabled="true">',
  '      </div>',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   DATETIME INPUT
   ═══════════════════════════════════════════════════ */
writeComp('datetime-input', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="datetime-field" class="form-label">Date-Time</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="datetime-local" id="datetime-field" name="date_time" class="form-input" aria-describedby="datetime-hint">',
  '    </div>',
  '    <span id="datetime-hint" class="form-hint">Select date and time</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="datetime-field-required" class="form-label">',
  '      Date-Time',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <input type="datetime-local" id="datetime-field-required" name="date_time_required" class="form-input" required aria-required="true" aria-describedby="datetime-error">',
  '    </div>',
  '    <div id="datetime-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Select a date and time.</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="datetime-field-disabled" class="form-label">Date-Time (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="datetime-local" id="datetime-field-disabled" name="date_time_disabled" class="form-input" disabled aria-disabled="true">',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   TIME INPUT
   ═══════════════════════════════════════════════════ */
writeComp('time-input', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="time-field" class="form-label">Time</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="time" id="time-field" name="time" class="form-input" aria-describedby="time-hint">',
  '    </div>',
  '    <span id="time-hint" class="form-hint">Select a time (hh:mm:ss)</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="time-field-required" class="form-label">',
  '      Time',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <input type="time" id="time-field-required" name="time_required" class="form-input" required aria-required="true" aria-describedby="time-error">',
  '    </div>',
  '    <div id="time-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Select a time.</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="time-field-disabled" class="form-label">Time (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <input type="time" id="time-field-disabled" name="time_disabled" class="form-input" disabled aria-disabled="true">',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   DROPDOWN  (select2 structure)
   ═══════════════════════════════════════════════════ */
var dropdownSelect2 = [
  '      <div class="select2-container zc-Dropdown form-choice-field zc_picklist_field" id="{CID}" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="{LBL}">',
  '        <div class="select2-choice" tabindex="0" role="button"{EXTRA_ARIA}>',
  '          <span class="select2-chosen">-Select-</span>',
  '          <abbr class="select2-search-choice-close" tabindex="-1" aria-label="Clear selection"></abbr>',
  '          <span class="select2-arrow" aria-hidden="true"><b></b></span>',
  '        </div>',
  '        <div class="select2-drop select2-display-none" role="listbox" aria-labelledby="{LBL}">',
  '          <div class="select2-search">',
  '            <input type="text" class="select2-input" autocomplete="off" placeholder="Search..." aria-label="Search options">',
  '          </div>',
  '          <ul class="select2-results">',
  '            <li class="select2-result" data-value="option1" role="option"><div class="select2-result-label">Option 1</div></li>',
  '            <li class="select2-result" data-value="option2" role="option"><div class="select2-result-label">Option 2</div></li>',
  '            <li class="select2-result" data-value="option3" role="option"><div class="select2-result-label">Option 3</div></li>',
  '            <li class="select2-result" data-value="option4" role="option"><div class="select2-result-label">Option 4</div></li>',
  '          </ul>',
  '        </div>',
  '        <input type="hidden" name="dropdown" id="{VID}"{REQ}>',
  '      </div>'
].join('\n');

function dd(cid, lbl, vid, extraAria, req) {
  return dropdownSelect2.replace(/\{CID\}/g, cid).replace(/\{LBL\}/g, lbl).replace(/\{EXTRA_ARIA\}/g, extraAria).replace(/\{VID\}/g, vid).replace(/\{REQ\}/g, req);
}

writeComp('dropdown', [
  // Default with help
  '  <div class="form-field">',
  '    <label id="dropdown-label" class="form-label">Drop Down</label>',
  '    <div class="form-input-wrapper">',
  dd('dropdown-container', 'dropdown-label', 'dropdown-value', ' aria-describedby="dropdown-hint"', ''),
  '    </div>',
  '    <span id="dropdown-hint" class="form-hint">Select an option from the list</span>',
  '  </div>',
  '',
  // Error
  '  <div class="form-field">',
  '    <label id="dropdown-label-req" class="form-label">',
  '      Drop Down',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  dd('dropdown-container-req', 'dropdown-label-req', 'dropdown-value-req', ' aria-describedby="dropdown-error"', ' required'),
  '    </div>',
  '    <div id="dropdown-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>Please select an option</span>',
  '    </div>',
  '  </div>',
  '',
  // Disabled
  '  <div class="form-field form-field-disabled">',
  '    <label id="dropdown-label-dis" class="form-label">Drop Down (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="select2-container select2-container-disabled zc-Dropdown form-choice-field zc_picklist_field" id="dropdown-container-dis" aria-labelledby="dropdown-label-dis" aria-disabled="true">',
  '        <div class="select2-choice" tabindex="-1" role="button">',
  '          <span class="select2-chosen">-Select-</span>',
  '          <span class="select2-arrow" aria-hidden="true"><b></b></span>',
  '        </div>',
  '      </div>',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   MULTI-SELECT (select2-multi structure)
   ═══════════════════════════════════════════════════ */
var multiBody = [
  '      <div class="select2-container select2-container-multi zc-Multi_Select form-choice-field zc_list_field{EXTRA_CLS}" id="{CID}" role="combobox" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="{LBL}"{EXTRA_ARIA}>',
  '        <ul class="select2-choices" tabindex="0" aria-labelledby="{LBL}">',
  '          <li class="select2-search-field">',
  '            <input type="text" class="select2-input" autocomplete="off" placeholder="-Select-" aria-label="Search or select options"{DIS}>',
  '          </li>',
  '        </ul>',
  '        <div class="select2-drop select2-drop-multi select2-display-none" role="listbox" aria-multiselectable="true" aria-labelledby="{LBL}">',
  '          <ul class="select2-results">',
  '            <li class="select2-result" data-value="choice1" role="option"><div class="select2-result-label">Choice 1</div></li>',
  '            <li class="select2-result" data-value="choice2" role="option"><div class="select2-result-label">Choice 2</div></li>',
  '            <li class="select2-result" data-value="choice3" role="option"><div class="select2-result-label">Choice 3</div></li>',
  '            <li class="select2-result" data-value="choice4" role="option"><div class="select2-result-label">Choice 4</div></li>',
  '          </ul>',
  '        </div>',
  '      </div>'
].join('\n');

function ms(cid, lbl, extraCls, extraAria, dis) {
  return multiBody.replace(/\{CID\}/g, cid).replace(/\{LBL\}/g, lbl).replace(/\{EXTRA_CLS\}/g, extraCls).replace(/\{EXTRA_ARIA\}/g, extraAria).replace(/\{DIS\}/g, dis);
}

writeComp('multi-select', [
  '  <div class="form-field">',
  '    <label id="multi-select-label" class="form-label">Multi Select</label>',
  '    <div class="form-input-wrapper">',
  ms('multi-select-container', 'multi-select-label', '', '', ''),
  '    </div>',
  '    <span id="multi-select-hint" class="form-hint">Select one or more options</span>',
  '  </div>',
  '',
  '  <div class="form-field">',
  '    <label id="multi-select-label-req" class="form-label">',
  '      Multi Select',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  ms('multi-select-container-req', 'multi-select-label-req', '', ' aria-required="true"', ''),
  '    </div>',
  '    <div id="multi-select-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>Please select at least one option</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled">',
  '    <label id="multi-select-label-dis" class="form-label">Multi Select (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  ms('multi-select-container-dis', 'multi-select-label-dis', ' select2-container-disabled', ' aria-disabled="true"', ' disabled'),
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   CHECKBOX
   ═══════════════════════════════════════════════════ */
function checkboxChoices(prefix, dis) {
  var d = dis ? ' disabled' : '';
  return [
    '      <div class="checkbox-group zc-flex zc-direction-column zc-gap-8" role="group">',
    '        <div class="checkbox-option zc-inline-flex zc-align-items-center zc-gap-8">',
    '          <input type="checkbox" id="' + prefix + '-1" name="' + prefix + '" value="choice1" class="checkbox-input"' + d + '>',
    '          <label for="' + prefix + '-1" class="checkbox-label">Choice 1</label>',
    '        </div>',
    '        <div class="checkbox-option zc-inline-flex zc-align-items-center zc-gap-8">',
    '          <input type="checkbox" id="' + prefix + '-2" name="' + prefix + '" value="choice2" class="checkbox-input"' + d + '>',
    '          <label for="' + prefix + '-2" class="checkbox-label">Choice 2</label>',
    '        </div>',
    '        <div class="checkbox-option zc-inline-flex zc-align-items-center zc-gap-8">',
    '          <input type="checkbox" id="' + prefix + '-3" name="' + prefix + '" value="choice3" class="checkbox-input"' + d + '>',
    '          <label for="' + prefix + '-3" class="checkbox-label">Choice 3</label>',
    '        </div>',
    '      </div>'
  ].join('\n');
}

writeComp('checkbox', [
  '  <fieldset class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <legend class="form-label">Checkbox</legend>',
  '    <div class="form-input-wrapper">',
  checkboxChoices('checkbox', false),
  '    </div>',
  '    <span id="checkbox-hint" class="form-hint">Select one or more options</span>',
  '  </fieldset>',
  '',
  '  <fieldset class="form-field zc-flex zc-align-items-start zc-gap-16" aria-required="true">',
  '    <legend class="form-label">',
  '      Checkbox',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </legend>',
  '    <div class="form-input-wrapper">',
  checkboxChoices('checkbox-req', false),
  '    </div>',
  '    <div id="checkbox-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>Please select at least one option</span>',
  '    </div>',
  '  </fieldset>',
  '',
  '  <fieldset class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16" disabled>',
  '    <legend class="form-label">Checkbox (Disabled)</legend>',
  '    <div class="form-input-wrapper">',
  checkboxChoices('checkbox-dis', true),
  '    </div>',
  '  </fieldset>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   RADIO BUTTON
   ═══════════════════════════════════════════════════ */
function radioChoices(prefix, dis) {
  var d = dis ? ' disabled' : '';
  return [
    '      <div class="radio-group zc-flex zc-direction-column zc-gap-8">',
    '        <div class="radio-option zc-inline-flex zc-align-items-center zc-gap-8">',
    '          <input type="radio" id="' + prefix + '-1" name="' + prefix + '" value="choice1" class="radio-input"' + d + '>',
    '          <label for="' + prefix + '-1" class="radio-label">Choice 1</label>',
    '        </div>',
    '        <div class="radio-option zc-inline-flex zc-align-items-center zc-gap-8">',
    '          <input type="radio" id="' + prefix + '-2" name="' + prefix + '" value="choice2" class="radio-input"' + d + '>',
    '          <label for="' + prefix + '-2" class="radio-label">Choice 2</label>',
    '        </div>',
    '        <div class="radio-option zc-inline-flex zc-align-items-center zc-gap-8">',
    '          <input type="radio" id="' + prefix + '-3" name="' + prefix + '" value="choice3" class="radio-input"' + d + '>',
    '          <label for="' + prefix + '-3" class="radio-label">Choice 3</label>',
    '        </div>',
    '      </div>'
  ].join('\n');
}

writeComp('radio-button', [
  '  <fieldset class="form-field zc-flex zc-align-items-start zc-gap-16" role="radiogroup">',
  '    <legend class="form-label">Radio</legend>',
  '    <div class="form-input-wrapper">',
  radioChoices('radio', false),
  '    </div>',
  '    <span id="radio-hint" class="form-hint">Select one option</span>',
  '  </fieldset>',
  '',
  '  <fieldset class="form-field zc-flex zc-align-items-start zc-gap-16" role="radiogroup" aria-required="true">',
  '    <legend class="form-label">',
  '      Radio',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </legend>',
  '    <div class="form-input-wrapper">',
  radioChoices('radio-req', false),
  '    </div>',
  '    <div id="radio-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>Please select an option</span>',
  '    </div>',
  '  </fieldset>',
  '',
  '  <fieldset class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16" role="radiogroup" disabled>',
  '    <legend class="form-label">Radio (Disabled)</legend>',
  '    <div class="form-input-wrapper">',
  radioChoices('radio-dis', true),
  '    </div>',
  '  </fieldset>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   DECISION BOX
   ═══════════════════════════════════════════════════ */
writeComp('decision-box', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <div class="form-label-spacer"></div>',
  '    <div class="form-input-wrapper">',
  '      <div class="decision-box zc-inline-flex zc-align-items-center zc-gap-10">',
  '        <input type="checkbox" id="decision-box" name="decision_box" class="decision-input" aria-describedby="decision-hint">',
  '        <label for="decision-box" class="decision-label">Decision box</label>',
  '      </div>',
  '    </div>',
  '    <span id="decision-hint" class="form-hint">Check to confirm your decision</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <div class="form-label-spacer"></div>',
  '    <div class="form-input-wrapper">',
  '      <div class="decision-box zc-inline-flex zc-align-items-center zc-gap-10">',
  '        <input type="checkbox" id="decision-box-req" name="decision_box_req" class="decision-input" required aria-required="true" aria-describedby="decision-error">',
  '        <label for="decision-box-req" class="decision-label">Decision box <span class="form-required" aria-hidden="true">*</span></label>',
  '      </div>',
  '    </div>',
  '    <div id="decision-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <div class="form-label-spacer"></div>',
  '    <div class="form-input-wrapper">',
  '      <div class="decision-box zc-inline-flex zc-align-items-center zc-gap-10">',
  '        <input type="checkbox" id="decision-box-dis" name="decision_box_dis" class="decision-input" disabled aria-disabled="true">',
  '        <label for="decision-box-dis" class="decision-label">Decision box (Disabled)</label>',
  '      </div>',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   NAME FIELD (composite)
   ═══════════════════════════════════════════════════ */
function nameFields(pfx, dis) {
  var d = dis ? ' disabled' : '';
  return [
    '      <div class="name-part zc-flex zc-direction-column zc-gap-4">',
    '        <label for="' + pfx + '-prefix" class="sr-only">Prefix</label>',
    '        <select id="' + pfx + '-prefix" name="' + pfx + '_prefix" class="form-select name-prefix" aria-label="Name prefix"' + d + '>',
    '          <option value="">None</option><option value="Mr.">Mr.</option><option value="Mrs.">Mrs.</option><option value="Ms.">Ms.</option><option value="Dr.">Dr.</option>',
    '        </select>',
    '        <span class="name-part-label" aria-hidden="true">Prefix</span>',
    '      </div>',
    '      <div class="name-part zc-flex zc-direction-column zc-gap-4">',
    '        <label for="' + pfx + '-first" class="sr-only">First Name</label>',
    '        <input type="text" id="' + pfx + '-first" name="' + pfx + '_first" class="form-input" autocomplete="given-name" aria-label="First name"' + d + '>',
    '        <span class="name-part-label" aria-hidden="true">First Name</span>',
    '      </div>',
    '      <div class="name-part zc-flex zc-direction-column zc-gap-4">',
    '        <label for="' + pfx + '-last" class="sr-only">Last Name</label>',
    '        <input type="text" id="' + pfx + '-last" name="' + pfx + '_last" class="form-input" autocomplete="family-name" aria-label="Last name"' + d + '>',
    '        <span class="name-part-label" aria-hidden="true">Last Name</span>',
    '      </div>',
    '      <div class="name-part zc-flex zc-direction-column zc-gap-4">',
    '        <label for="' + pfx + '-suffix" class="sr-only">Suffix</label>',
    '        <input type="text" id="' + pfx + '-suffix" name="' + pfx + '_suffix" class="form-input" aria-label="Suffix"' + d + '>',
    '        <span class="name-part-label" aria-hidden="true">Suffix</span>',
    '      </div>'
  ].join('\n');
}

writeComp('name-field', [
  '  <fieldset class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <legend class="form-label">Name</legend>',
  '    <div class="form-input-wrapper name-field-group zc-flex zc-gap-8">',
  nameFields('name', false),
  '    </div>',
  '    <span id="name-hint" class="form-hint">Enter your full name</span>',
  '  </fieldset>',
  '',
  '  <fieldset class="form-field zc-flex zc-align-items-start zc-gap-16" aria-required="true">',
  '    <legend class="form-label">',
  '      Name',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </legend>',
  '    <div class="form-input-wrapper name-field-group zc-flex zc-gap-8">',
  nameFields('name-req', false),
  '    </div>',
  '    <div id="name-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Enter a name.</span>',
  '    </div>',
  '  </fieldset>',
  '',
  '  <fieldset class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16" disabled>',
  '    <legend class="form-label">Name (Disabled)</legend>',
  '    <div class="form-input-wrapper name-field-group zc-flex zc-gap-8">',
  nameFields('name-dis', true),
  '    </div>',
  '  </fieldset>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   ADDRESS FIELD (composite)
   ═══════════════════════════════════════════════════ */
function addrFields(pfx, dis) {
  var d = dis ? ' disabled' : '';
  var rows = [
    {id: 'line1', name: 'address_line_1', auto: 'address-line1', label: 'Address Line 1', tag: 'input'},
    {id: 'line2', name: 'address_line_2', auto: 'address-line2', label: 'Address Line 2', tag: 'input'},
    {id: 'city', name: 'city_district', auto: 'address-level2', label: 'City / District', tag: 'input'},
    {id: 'state', name: 'state_province', auto: 'address-level1', label: 'State / Province', tag: 'input'},
    {id: 'postal', name: 'postal_code', auto: 'postal-code', label: 'Postal Code', tag: 'input'}
  ];
  var out = [];
  rows.forEach(function(r) {
    out.push('      <div class="address-row zc-flex zc-direction-column zc-gap-4">');
    out.push('        <label for="' + pfx + '-' + r.id + '" class="sr-only">' + r.label + '</label>');
    out.push('        <input type="text" id="' + pfx + '-' + r.id + '" name="' + pfx + '_' + r.name + '" class="form-input" autocomplete="' + r.auto + '" aria-label="' + r.label + '"' + d + '>');
    out.push('        <span class="address-part-label" aria-hidden="true">' + r.label + '</span>');
    out.push('      </div>');
  });
  // Country select
  out.push('      <div class="address-row zc-flex zc-direction-column zc-gap-4">');
  out.push('        <label for="' + pfx + '-country" class="sr-only">Country</label>');
  out.push('        <select id="' + pfx + '-country" name="' + pfx + '_country" class="form-select" autocomplete="country-name" aria-label="Country"' + d + '>');
  out.push('          <option value="">-Select-</option><option value="US">United States</option><option value="IN">India</option><option value="GB">United Kingdom</option><option value="AU">Australia</option><option value="CA">Canada</option>');
  out.push('        </select>');
  out.push('        <span class="address-part-label" aria-hidden="true">Country</span>');
  out.push('      </div>');
  return out.join('\n');
}

writeComp('address-field', [
  '  <fieldset class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <legend class="form-label">Address</legend>',
  '    <div class="form-input-wrapper address-group zc-flex zc-direction-column zc-gap-12">',
  addrFields('addr', false),
  '    </div>',
  '    <span id="address-hint" class="form-hint">Enter your complete address</span>',
  '  </fieldset>',
  '',
  '  <fieldset class="form-field zc-flex zc-align-items-start zc-gap-16" aria-required="true">',
  '    <legend class="form-label">',
  '      Address',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </legend>',
  '    <div class="form-input-wrapper address-group zc-flex zc-direction-column zc-gap-12">',
  addrFields('addr-req', false),
  '    </div>',
  '    <div id="address-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Enter an address.</span>',
  '    </div>',
  '  </fieldset>',
  '',
  '  <fieldset class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16" disabled>',
  '    <legend class="form-label">Address (Disabled)</legend>',
  '    <div class="form-input-wrapper address-group zc-flex zc-direction-column zc-gap-12">',
  addrFields('addr-dis', true),
  '    </div>',
  '  </fieldset>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   RICH TEXT
   ═══════════════════════════════════════════════════ */
var richToolbar = [
  '        <div class="rich-text-toolbar zc-flex zc-row-wrap zc-gap-4" role="toolbar" aria-label="Text formatting tools">',
  '          <div class="toolbar-group zc-flex zc-gap-2" role="group" aria-label="Text style">',
  '            <button type="button" class="toolbar-btn zc-flex zc-align-items-center zc-justify-center" data-command="bold" aria-label="Bold" title="Bold"><strong>B</strong></button>',
  '            <button type="button" class="toolbar-btn zc-flex zc-align-items-center zc-justify-center" data-command="italic" aria-label="Italic" title="Italic"><em>I</em></button>',
  '            <button type="button" class="toolbar-btn zc-flex zc-align-items-center zc-justify-center" data-command="underline" aria-label="Underline" title="Underline"><u>U</u></button>',
  '          </div>',
  '          <div class="toolbar-group zc-flex zc-gap-2" role="group" aria-label="Alignment">',
  '            <button type="button" class="toolbar-btn zc-flex zc-align-items-center zc-justify-center" data-command="justifyLeft" aria-label="Align left" title="Align left"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg></button>',
  '            <button type="button" class="toolbar-btn zc-flex zc-align-items-center zc-justify-center" data-command="justifyCenter" aria-label="Align center" title="Align center"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg></button>',
  '            <button type="button" class="toolbar-btn zc-flex zc-align-items-center zc-justify-center" data-command="justifyRight" aria-label="Align right" title="Align right"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg></button>',
  '          </div>',
  '          <div class="toolbar-group zc-flex zc-gap-2" role="group" aria-label="Lists">',
  '            <button type="button" class="toolbar-btn zc-flex zc-align-items-center zc-justify-center" data-command="insertUnorderedList" aria-label="Bulleted list" title="Bulleted list"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg></button>',
  '            <button type="button" class="toolbar-btn zc-flex zc-align-items-center zc-justify-center" data-command="insertOrderedList" aria-label="Numbered list" title="Numbered list"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="2" y="8" font-size="8" fill="currentColor" stroke="none">1</text><text x="2" y="14" font-size="8" fill="currentColor" stroke="none">2</text><text x="2" y="20" font-size="8" fill="currentColor" stroke="none">3</text></svg></button>',
  '          </div>',
  '        </div>'
].join('\n');

writeComp('rich-text', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label id="richtext-label" class="form-label">Rich Text</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="rich-text-editor" role="application" aria-labelledby="richtext-label">',
  richToolbar,
  '        <div class="rich-text-content" contenteditable="true" role="textbox" aria-multiline="true" aria-labelledby="richtext-label" aria-describedby="richtext-hint" id="rich-text-content"></div>',
  '        <textarea name="rich_text" id="rich-text-value" class="sr-only" aria-hidden="true"></textarea>',
  '      </div>',
  '    </div>',
  '    <span id="richtext-hint" class="form-hint">Use the toolbar to format text</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label id="richtext-label-req" class="form-label">',
  '      Rich Text',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <div class="rich-text-editor" role="application" aria-labelledby="richtext-label-req">',
  richToolbar,
  '        <div class="rich-text-content" contenteditable="true" role="textbox" aria-multiline="true" aria-labelledby="richtext-label-req" aria-describedby="richtext-error" id="rich-text-content-req"></div>',
  '        <textarea name="rich_text_req" id="rich-text-value-req" class="sr-only" aria-hidden="true"></textarea>',
  '      </div>',
  '    </div>',
  '    <div id="richtext-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>This field is mandatory. Enter a value.</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label id="richtext-label-dis" class="form-label">Rich Text (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="rich-text-editor rich-text-disabled" role="application" aria-labelledby="richtext-label-dis" aria-disabled="true">',
  richToolbar.replace(/class="toolbar-btn/g, 'class="toolbar-btn" disabled aria-disabled="true'),
  '        <div class="rich-text-content" role="textbox" aria-multiline="true" aria-labelledby="richtext-label-dis" id="rich-text-content-dis"></div>',
  '        <textarea name="rich_text_dis" id="rich-text-value-dis" class="sr-only" aria-hidden="true"></textarea>',
  '      </div>',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   FILE UPLOAD
   ═══════════════════════════════════════════════════ */
var uploadSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6061a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>';

writeComp('file-upload', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="file-upload" class="form-label">File upload</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="file-upload zc-flex zc-align-items-center zc-justify-space-between" role="button" tabindex="0" aria-describedby="file-upload-hint">',
  '        <input type="file" id="file-upload" name="file_upload" class="file-upload__input" aria-label="Choose file to upload">',
  '        <span class="file-upload__text">Select File</span>',
  '        <span class="file-upload__icon zc-flex zc-align-items-center" aria-hidden="true">' + uploadSvg + '</span>',
  '      </div>',
  '      <span class="file-upload__filename" aria-live="polite"></span>',
  '    </div>',
  '    <span id="file-upload-hint" class="form-hint">Drag &amp; drop or click to upload</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="file-upload-req" class="form-label">',
  '      File upload',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <div class="file-upload zc-flex zc-align-items-center zc-justify-space-between" role="button" tabindex="0" aria-describedby="file-upload-error">',
  '        <input type="file" id="file-upload-req" name="file_upload_req" class="file-upload__input" required aria-required="true" aria-label="Choose file to upload">',
  '        <span class="file-upload__text">Select File</span>',
  '        <span class="file-upload__icon zc-flex zc-align-items-center" aria-hidden="true">' + uploadSvg + '</span>',
  '      </div>',
  '    </div>',
  '    <div id="file-upload-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>Please upload a file</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="file-upload-dis" class="form-label">File upload (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="file-upload file-upload-disabled zc-flex zc-align-items-center zc-justify-space-between" aria-disabled="true">',
  '        <input type="file" id="file-upload-dis" name="file_upload_dis" class="file-upload__input" disabled aria-disabled="true">',
  '        <span class="file-upload__text">Select File</span>',
  '        <span class="file-upload__icon zc-flex zc-align-items-center" aria-hidden="true">' + uploadSvg + '</span>',
  '      </div>',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   IMAGE UPLOAD
   ═══════════════════════════════════════════════════ */
writeComp('image-upload', [
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="image-upload" class="form-label">Image</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="image-upload zc-flex zc-align-items-center" role="button" tabindex="0">',
  '        <input type="file" id="image-upload" name="image" class="image-upload__input" accept="image/*" aria-label="Select an image to upload">',
  '        <span class="image-upload__text">Select Image</span>',
  '      </div>',
  '      <div class="image-preview" id="image-preview" hidden>',
  '        <img id="preview-img" src="" alt="Image preview" class="image-preview__img">',
  '        <button type="button" class="image-preview__remove zc-flex zc-align-items-center zc-justify-center" aria-label="Remove image">&times;</button>',
  '      </div>',
  '    </div>',
  '    <span id="image-hint" class="form-hint">Select an image file to upload</span>',
  '  </div>',
  '',
  '  <div class="form-field zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="image-upload-req" class="form-label">',
  '      Image',
  '      <span class="form-required" aria-hidden="true">*</span>',
  '      <span class="sr-only">(required)</span>',
  '    </label>',
  '    <div class="form-input-wrapper">',
  '      <div class="image-upload zc-flex zc-align-items-center" role="button" tabindex="0">',
  '        <input type="file" id="image-upload-req" name="image_req" class="image-upload__input" accept="image/*" required aria-required="true" aria-label="Select an image to upload">',
  '        <span class="image-upload__text">Select Image</span>',
  '      </div>',
  '    </div>',
  '    <div id="image-error" class="fieldErrorMsg" role="alert" hidden>',
  '      ' + ERR_SVG,
  '      <span>Please upload an image</span>',
  '    </div>',
  '  </div>',
  '',
  '  <div class="form-field form-field-disabled zc-flex zc-align-items-start zc-gap-16">',
  '    <label for="image-upload-dis" class="form-label">Image (Disabled)</label>',
  '    <div class="form-input-wrapper">',
  '      <div class="image-upload image-upload-disabled zc-flex zc-align-items-center" aria-disabled="true">',
  '        <input type="file" id="image-upload-dis" name="image_dis" class="image-upload__input" accept="image/*" disabled aria-disabled="true">',
  '        <span class="image-upload__text">Select Image</span>',
  '      </div>',
  '    </div>',
  '  </div>'
].join('\n'));

/* ═══════════════════════════════════════════════════
   AUDIO UPLOAD
   ═══════════════════════════════════════════════════ */
var micSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6061a0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';

function audioUploadBlock(id, labelHtml, extraFieldCls, disAttr, afterInput) {
  return [
    '  <div class="form-field' + (extraFieldCls ? ' ' + extraFieldCls : '') + ' zc-flex zc-align-items-start zc-gap-16">',
    '    <label for="' + id + '" class="form-label">' + labelHtml + '</label>',
    '    <div class="form-input-wrapper">',
    '      <div class="file-upload' + (disAttr ? ' file-upload-disabled' : '') + ' zc-flex zc-align-items-center zc-justify-space-between"' + (disAttr ? ' aria-disabled="true"' : '') + '>',
    '        <input type="file" id="' + id + '" name="audio" class="file-upload__input" accept="audio/*" aria-label="Select an audio file to upload"' + (disAttr ? ' disabled aria-disabled="true"' : '') + '>',
    '        <span class="file-upload__text">Select File</span>',
    '        <div class="file-upload__icons zc-flex zc-align-items-center zc-gap-8">',
    '          <span class="file-upload__icon zc-flex zc-align-items-center" aria-hidden="true">' + uploadSvg + '</span>',
    '          <button type="button" class="file-upload__mic-btn zc-flex zc-align-items-center" aria-label="Record audio"' + (disAttr ? ' disabled' : '') + '>' + micSvg + '</button>',
    '        </div>',
    '      </div>',
    '    </div>',
    afterInput,
    '  </div>'
  ].join('\n');
}

writeComp('audio-upload', [
  audioUploadBlock('audio-upload', 'Audio', '', false, '    <span id="audio-hint" class="form-hint">Select an audio file or use microphone</span>'),
  '',
  audioUploadBlock('audio-upload-req', 'Audio\n      <span class="form-required" aria-hidden="true">*</span>\n      <span class="sr-only">(required)</span>', '',  false, '    <div id="audio-error" class="fieldErrorMsg" role="alert" hidden>\n      ' + ERR_SVG + '\n      <span>Please upload an audio file</span>\n    </div>'),
  '',
  audioUploadBlock('audio-upload-dis', 'Audio (Disabled)', 'form-field-disabled', true, '')
].join('\n'));

/* ═══════════════════════════════════════════════════
   VIDEO UPLOAD
   ═══════════════════════════════════════════════════ */
function videoUploadBlock(id, labelHtml, extraFieldCls, disAttr, afterInput) {
  return [
    '  <div class="form-field' + (extraFieldCls ? ' ' + extraFieldCls : '') + ' zc-flex zc-align-items-start zc-gap-16">',
    '    <label for="' + id + '" class="form-label">' + labelHtml + '</label>',
    '    <div class="form-input-wrapper">',
    '      <div class="file-upload' + (disAttr ? ' file-upload-disabled' : '') + ' zc-flex zc-align-items-center zc-justify-space-between"' + (disAttr ? ' aria-disabled="true"' : '') + '>',
    '        <input type="file" id="' + id + '" name="video" class="file-upload__input" accept="video/*" aria-label="Select a video file to upload"' + (disAttr ? ' disabled aria-disabled="true"' : '') + '>',
    '        <span class="file-upload__text">Select File</span>',
    '        <span class="file-upload__icon zc-flex zc-align-items-center" aria-hidden="true">' + uploadSvg + '</span>',
    '      </div>',
    '      <span class="file-upload__filename" aria-live="polite"></span>',
    '    </div>',
    afterInput,
    '  </div>'
  ].join('\n');
}

writeComp('video-upload', [
  videoUploadBlock('video-upload', 'Video', '', false, '    <span id="video-hint" class="form-hint">Select a video file to upload</span>'),
  '',
  videoUploadBlock('video-upload-req', 'Video\n      <span class="form-required" aria-hidden="true">*</span>\n      <span class="sr-only">(required)</span>', '', false, '    <div id="video-error" class="fieldErrorMsg" role="alert" hidden>\n      ' + ERR_SVG + '\n      <span>Please upload a video file</span>\n    </div>'),
  '',
  videoUploadBlock('video-upload-dis', 'Video (Disabled)', 'form-field-disabled', true, '')
].join('\n'));

/* ═══════════════════════════════════════════════════
   SIGNATURE FIELD
   ═══════════════════════════════════════════════════ */
function sigBlock(id, labelHtml, extraFieldCls, disAttrs, afterInput) {
  var canvasId = id + '-canvas';
  var ce = disAttrs ? '' : ' contenteditable="false"';
  return [
    '  <div class="form-field' + (extraFieldCls ? ' ' + extraFieldCls : '') + ' zc-flex zc-align-items-start zc-gap-16">',
    '    <label id="' + id + '-label" class="form-label">' + labelHtml + '</label>',
    '    <div class="form-input-wrapper">',
    '      <div class="signature-field' + (disAttrs ? ' signature-field-disabled' : '') + '" role="img" aria-labelledby="' + id + '-label">',
    '        <div class="signature-pad-header">',
    '          <span class="signature-placeholder">' + (disAttrs ? '' : 'Draw your signature') + '</span>',
    '        </div>',
    '        <canvas id="' + canvasId + '" class="signature-canvas" width="300" height="100" aria-label="Signature drawing area"></canvas>',
    '        <div class="signature-actions zc-flex zc-justify-end zc-gap-8">',
    '          <button type="button" class="signature-btn" id="' + id + '-clear" aria-label="Clear signature"' + (disAttrs ? ' disabled' : '') + '>Clear</button>',
    '        </div>',
    '      </div>',
    '      <input type="hidden" id="' + id + '-data" name="' + id + '">',
    '    </div>',
    afterInput,
    '  </div>'
  ].join('\n');
}

writeComp('signature-field', [
  sigBlock('signature', 'Signature', '', false, '    <span id="signature-hint" class="form-hint">Draw your signature using mouse or touch</span>'),
  '',
  sigBlock('signature-req', 'Signature\n      <span class="form-required" aria-hidden="true">*</span>\n      <span class="sr-only">(required)</span>', '', false, '    <div id="signature-error" class="fieldErrorMsg" role="alert" hidden>\n      ' + ERR_SVG + '\n      <span>Signature is required</span>\n    </div>'),
  '',
  sigBlock('signature-dis', 'Signature (Disabled)', 'form-field-disabled', true, '')
].join('\n'));

console.log('\nDone! All 25 form components updated with 3 variants each.');
