# Component Specification

> **Role**: Defines the exact HTML anatomy, CSS rules, naming conventions, accessibility requirements, and variant expectations for every form field component. This is the single source of truth an agent must follow when creating or reviewing components.

---

## 1. File Structure

Every component lives in its own folder under `forms/`:

```
forms/<component-name>/
├── <component-name>.html    ← Full standalone page with all variants
├── <component-name>.css     ← Compiled CSS (token-driven, no hard-coded values)
├── <component-name>.scss    ← SCSS source (optional but preferred)
└── <component-name>.js      ← Validation and interaction behavior
```

**Naming rule**: folder and file names use `kebab-case` (e.g., `text-input`, `currency-input`, `date-input`).

**Reference implementation**: `forms/text-input/` — always use this as the canonical pattern.

---

## 2. HTML Anatomy

Every form field must follow this exact nesting structure:

```
zc-form-group                        ← Outermost wrapper (one per field instance)
├── zc-form-label                    ← <label> element
│   ├── zc-label-text                ← <span> wrapping the label copy
│   │   └── zc-form-required         ← <span> mandatory asterisk (*) — only on required fields
│   └── zc-sr-only                   ← "(required)" screen-reader-only text
├── zc-form-field                    ← Control + messages wrapper
│   └── zc-form-input-wrapper        ← Direct wrapper around the control
│       └── zc-form-control          ← The actual <input>, <select>, <textarea>, etc.
├── zc-help-txt / zc-form-hint       ← Help text below the field
└── zc-field-error-text              ← Error message container (hidden by default)
    ├── zc-field-error-msg-icon      ← <i> icon (zc-li-outline ui-3-alert)
    └── <span>                       ← Error message text
```

### 2.1 Reference HTML — Default Variant (with help text)

```html
<div class="zc-form-group">
  <label for="single-line" class="zc-form-label">
    <span class="zc-label-text">Single Line</span>
  </label>
  <div class="zc-form-field">
    <div class="zc-form-input-wrapper">
      <input type="text"
             id="single-line"
             name="single_line"
             class="zc-form-input zc-form-control"
             placeholder="Enter text"
             maxlength="255"
             aria-describedby="single-line-hint">
    </div>
  </div>
  <span id="single-line-hint" class="zc-help-txt zc-form-hint">
    Maximum 255 characters
  </span>
</div>
```

### 2.2 Reference HTML — Error Variant (required + validation error)

```html
<div class="zc-form-group">
  <label for="single-line-required" class="zc-form-label">
    <span class="zc-label-text">Single Line</span>
    <span class="zc-form-required" aria-hidden="true">*</span>
    <span class="zc-sr-only">(required)</span>
  </label>
  <div class="zc-form-field validationError">
    <div class="zc-form-input-wrapper">
      <input type="text"
             id="single-line-required"
             name="single_line_required"
             class="zc-form-input zc-form-control"
             placeholder="Enter text"
             maxlength="255"
             required
             aria-required="true"
             aria-invalid="true"
             aria-describedby="single-line-required-error">
    </div>
  </div>
  <div id="single-line-required-error"
       class="zc-field-error-text zc-field-error-msg"
       role="alert"
       aria-live="assertive"
       hidden>
    <i class="zc-field-error-msg-icon zc-li-outline ui-3-alert" aria-hidden="true"></i>
    <span>This field is mandatory. Enter a value.</span>
  </div>
</div>
```

### 2.3 Reference HTML — Disabled Variant

```html
<div class="zc-form-group zc-form-field-disabled">
  <label for="single-line-disabled" class="zc-form-label">
    <span class="zc-label-text">Single Line (Disabled)</span>
  </label>
  <div class="zc-form-field">
    <div class="zc-form-input-wrapper">
      <input type="text"
             id="single-line-disabled"
             name="single_line_disabled"
             class="zc-form-input zc-form-control"
             placeholder="Disabled field"
             disabled
             aria-disabled="true">
    </div>
  </div>
</div>
```

### 2.4 Page Wrapper

All variants are wrapped in a single `<form>` with label placement:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><Component Name> Component</title>
  <link rel="stylesheet" href="<component-name>.css">
</head>
<body>
<form class="zc-form-table zc-label-left">
  <script defer src="<component-name>.js"></script>

  <!-- Default variant -->
  <!-- Error variant -->
  <!-- Disabled variant -->

</form>
</body>
</html>
```

---

## 3. Required Variants

Every component HTML file must include exactly **3 variant blocks**:

| # | Variant | Key characteristics |
|---|---------|-------------------|
| 1 | **Default** | Standard field with help text, `aria-describedby` pointing to hint |
| 2 | **Error** | `validationError` class on `.zc-form-field`, `aria-invalid="true"` on input, error message with `role="alert"` |
| 3 | **Disabled** | `zc-form-field-disabled` class on `.zc-form-group`, `disabled` + `aria-disabled="true"` on input |

---

## 4. Class Reference

| Class | Element | Purpose |
|-------|---------|---------|
| `zc-form-group` | `<div>` | Outermost wrapper for one complete field |
| `zc-form-label` | `<label>` | Label element — must have `for` matching the input `id` |
| `zc-label-text` | `<span>` | Inner wrapper for label copy |
| `zc-form-required` | `<span>` | Red asterisk `*` — include `aria-hidden="true"` |
| `zc-sr-only` | `<span>` | Screen-reader-only text for "(required)" |
| `zc-form-field` | `<div>` | Wraps the control and sits between label and help/error text |
| `zc-form-input-wrapper` | `<div>` | Direct parent of the form control |
| `zc-form-input` | `<input>` | The visual input styling class |
| `zc-form-control` | `<input>` | Semantic identifier for the actual form control element |
| `zc-help-txt` | `<span>` | Help text below the field |
| `zc-form-hint` | `<span>` | Alias for help text (both classes used together) |
| `zc-field-error-text` | `<div>` | Error message container |
| `zc-field-error-msg` | `<div>` | Alias for error container (both classes used together) |
| `zc-field-error-msg-icon` | `<i>` | Error icon element |
| `validationError` | modifier | Applied to `.zc-form-field` to activate error styling |
| `zc-form-field-disabled` | modifier | Applied to `.zc-form-group` to indicate disabled state |

---

## 5. Accessibility Requirements

### 5.1 Attribute Table

| Attribute | Element | When | Purpose |
|-----------|---------|------|---------|
| `for="<id>"` | `<label>` | Always | Associates label with the control |
| `id="<id>"` | `<input>` | Always | Unique identifier, matches `for` on label |
| `aria-describedby="<id>"` | `<input>` | When help text or error exists | Points to hint and/or error element IDs |
| `aria-required="true"` | `<input>` | When required | Signals required to screen readers |
| `required` | `<input>` | When required | Native validation attribute |
| `aria-invalid="true"` | `<input>` | When validation fails | Signals current invalid state |
| `aria-disabled="true"` | `<input>` | When disabled | Signals disabled to screen readers |
| `disabled` | `<input>` | When disabled | Native disabled attribute |
| `aria-hidden="true"` | `<i>`, `<span>` | On decorative icons and asterisk | Hides from assistive technology |
| `role="alert"` | error `<div>` | On error container | Makes it a live region |
| `aria-live="assertive"` | error `<div>` | On error container | Immediate announcement when content changes |
| `hidden` | error `<div>` | Default state | Error hidden until validation fails |

### 5.2 ID Naming Convention

IDs follow a predictable pattern per component instance:

```
<field-name>              → input id
<field-name>-hint         → help text id
<field-name>-error        → error message id
```

Example for a "phone" field: `phone`, `phone-hint`, `phone-error`.

### 5.3 Keyboard Requirements

- Tab must reach every interactive control
- Enter/Space must activate buttons and toggles
- Escape must close dropdowns and overlays
- Arrow keys must navigate within radio groups, dropdowns, and multi-selects
- Focus must be visually indicated (border + box-shadow via `--color-border-focus`)

---

## 6. CSS Requirements

### 6.1 Token Variables (`:root` block)

Every component CSS file must declare the following tokens in its `:root`:

```css
:root {
  --color-primary: var(--primary-color, #5051F9);
  --color-text-primary: var(--primary-text-color, #12132b);
  --color-text-placeholder: #999999;
  --color-border: var(--primary-border-color, #cbcbdc);
  --color-border-focus: var(--primary-color, #5051F9);
  --color-bg-white: #ffffff;
  --color-bg-disabled: #f0f0f4;
  --color-error: #ff0000;
  --font-family: 'Lato', sans-serif;
  --font-size-base: 14.5px;
  --input-height: 36px;
  --input-border-radius: 8px;
  --field-margin-bottom: 24px;
}
```

### 6.2 Required CSS Rules

Every component CSS must include these rule blocks:

#### Screen-reader-only utility
```css
.zc-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

#### Form group layout (label-left mode)
```css
.zc-form-group,
.zc-form-field {
  margin-bottom: var(--field-margin-bottom);
}

.zc-form-group > .zc-form-field {
  margin-bottom: 0;
  margin-left: 156px;
  max-width: 240px;
}
```

#### Label styles
```css
.zc-form-label {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  font-weight: 400;
  color: var(--color-text-primary);
  line-height: var(--input-height);
  float: left;
  width: 140px;
  margin-right: 16px;
  text-align: right;
}
```

#### Required indicator
```css
.zc-form-required {
  color: var(--color-error);
  margin-left: 2px;
}
```

#### Input styles with states
```css
.zc-form-input {
  width: 100%;
  height: var(--input-height);
  padding: 0 12px;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  background-color: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--input-border-radius);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.zc-form-input:hover {
  border-color: var(--color-primary);
}

.zc-form-input:focus {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 0.5px var(--color-primary);
}

.zc-form-input:disabled {
  background-color: var(--color-bg-disabled);
  color: var(--disable-text-color, #606189);
  cursor: not-allowed;
  border-color: var(--color-border);
}

.zc-form-input[aria-invalid="true"] {
  border-color: var(--color-error);
  box-shadow: 0 0 0 0.5px var(--color-error);
}
```

#### Help text
```css
.zc-help-txt,
.zc-form-hint {
  font-size: 12px;
  color: var(--tertiary-text-color, #606189);
  margin-top: 4px;
  display: block;
}
```

#### Error message
```css
.zc-field-error-text,
.zc-field-error-msg {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  font-size: 12px;
  color: var(--color-error);
  line-height: 1.4;
}

.zc-field-error-text[hidden],
.zc-field-error-msg[hidden] {
  display: none;
}
```

#### Validation error modifier
```css
.validationError .zc-form-input {
  border-color: var(--color-error);
  box-shadow: 0 0 0 0.5px var(--color-error);
}
```

#### Label-left indentation for help/error
```css
.zc-form-group > .zc-help-txt,
.zc-form-group > .zc-form-hint,
.zc-form-group > .zc-field-error-text,
.zc-form-group > .zc-field-error-msg {
  clear: both;
  padding-left: 156px;
  box-sizing: border-box;
}
```

### 6.3 Layout Rules

- **Form field internals** use `float` + `clearfix` — no flexbox or CSS grid
- **Page-level layouts** (report shells, card grids) may use flexbox/grid
- Label width: `140px`, right-aligned, with `16px` right margin
- Input wrapper left margin: `156px` (label width + margin)
- Input max-width: `240px` when nested inside `.zc-form-group > .zc-form-field`

---

## 7. JS Requirements

Each component's JS file handles validation and interaction:

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const requiredInputs = document.querySelectorAll('.zc-form-input[required]');

  requiredInputs.forEach(function(input) {
    const errorEl = document.getElementById(input.getAttribute('aria-describedby'));
    const field = input.closest('.zc-form-field');

    input.addEventListener('blur', function() {
      validateInput(input, errorEl, field);
    });

    input.addEventListener('input', function() {
      if (input.getAttribute('aria-invalid') === 'true') {
        validateInput(input, errorEl, field);
      }
    });
  });

  function validateInput(input, errorEl, field) {
    if (!input.value.trim()) {
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.hidden = false;
      if (field) field.classList.add('zc-validation-error');
    } else {
      input.removeAttribute('aria-invalid');
      if (errorEl) errorEl.hidden = true;
      if (field) field.classList.remove('zc-validation-error');
    }
  }
});
```

**Required behaviors:**
1. Validate on `blur` for required fields
2. Re-validate on `input` if currently invalid (clear error as user types)
3. Toggle `aria-invalid` attribute on the input
4. Toggle `hidden` on the error element
5. Toggle `zc-validation-error` class on `.zc-form-field`

---

## 8. Component Catalog

All 27+ form field components and their control elements:

| # | Component | Folder | Control | Notes |
|---|-----------|--------|---------|-------|
| 1 | Text Input | `text-input/` | `<input type="text">` | **Reference implementation** |
| 2 | Textarea | `textarea/` | `<textarea>` | Multi-line, resizable |
| 3 | Number Input | `number-input/` | `<input type="text">` | Numeric-only with validation |
| 4 | Decimal Input | `decimal-input/` | `<input type="text">` | Decimal point allowed |
| 5 | Currency Input | `currency-input/` | `<input type="text">` | Currency symbol prefix/suffix |
| 6 | Percent Input | `percent-input/` | `<input type="text">` | `%` symbol indicator |
| 7 | Email Input | `email-input/` | `<input type="text">` | Email icon affordance |
| 8 | Phone Input | `phone-input/` | `<input type="text">` | Country code prefix |
| 9 | URL Input | `url-input/` | `<input type="text">` | URL validation |
| 10 | Date Input | `date-input/` | `<input type="text">` | Calendar picker icon |
| 11 | Datetime Input | `datetime-input/` | `<input type="text">` | Calendar + time |
| 12 | Time Input | `time-input/` | `<input type="text">` | Clock picker icon |
| 13 | Dropdown | `dropdown/` | Custom select | Single-select combobox |
| 14 | Multi Select | `multi-select/` | Multi-value combobox | Tag-based selection |
| 15 | Checkbox | `checkbox/` | `<input type="checkbox">` | Group of checkboxes |
| 16 | Radio Button | `radio-button/` | `<input type="radio">` | Radio group |
| 17 | Decision Box | `decision-box/` | `<input type="checkbox">` | Single boolean toggle |
| 18 | Name Field | `name-field/` | Composite inputs | Prefix, first, last, suffix |
| 19 | Address Field | `address-field/` | Composite inputs | Line 1/2, city, state, zip, country |
| 20 | File Upload | `file-upload/` | `<input type="file">` | Generic file |
| 21 | Image Upload | `image-upload/` | `<input type="file">` | `accept="image/*"` |
| 22 | Audio Upload | `audio-upload/` | `<input type="file">` | `accept="audio/*"` |
| 23 | Video Upload | `video-upload/` | `<input type="file">` | `accept="video/*"` |
| 24 | Rich Text | `rich-text/` | Rich text editor | Toolbar + editable region |
| 25 | Signature Field | `signature-field/` | Canvas element | Draw-based capture |
| 26 | Section Separator | `section-separator/` | `<section>` + `<hr>` | Visual grouping divider |
| 27 | Form Buttons | `form-buttons/` | `<button>` group | Submit / Save / Reset |
| 28 | Rating Field | `rating-field/` | Star/icon rating | Interactive rating control |
| 29 | Toggle Switch | `toggle-switch-field/` | Toggle switch | On/off toggle |
| 30 | OTP Field | `otp-field/` | Multiple `<input>` | One-time-password entry |
| 31 | Lookup Search | `lookup-search-field/` | Searchable input | Search-based lookup |
| 32 | QR Code Field | `qr-code-field/` | QR display/scan | QR code interaction |

---

## 9. Creating a New Component — Step by Step

```
COMMAND: create-component <name>

1. mkdir forms/<name>
2. Create forms/<name>/<name>.html
   - Copy the page wrapper from section 2.4
   - Replace <Component Name> with the proper label
   - Add all 3 variants (default, error, disabled) per sections 2.1–2.3
   - Adjust the control element as needed (textarea, select, checkbox, etc.)
   - Wire all accessibility attributes per section 5.1

3. Create forms/<name>/<name>.css
   - Copy the :root token block from section 6.1
   - Include all required CSS rules from section 6.2
   - Add component-specific styles (e.g., textarea resize, dropdown arrow)
   - Never hard-code colors, font-sizes, or border-radius values

4. Create forms/<name>/<name>.scss
   - Same rules as CSS but using SCSS variables where appropriate
   - Import from _general_variables.scss if needed

5. Create forms/<name>/<name>.js
   - Copy the validation pattern from section 7
   - Add component-specific behavior (e.g., dropdown open/close, date picker)

6. Verify:
   - node _add-variants.js          (ensures 3 variants exist)
   - node _add-css-variants.js      (ensures CSS standards are present)
   - node _add-label-placement.js   (adds label placement tabs)
   - node _build-design-library.js  (rebuilds the library)
   - node _verify-design-library.js (validates the build)
```

---

## 10. Review Checklist

Before any component is considered complete:

- [ ] Folder exists at `forms/<name>/` with `.html`, `.css`, `.scss`, `.js`
- [ ] Uses `zc-` prefix on every CSS class
- [ ] Follows `zc-form-group > zc-form-label + zc-form-field > zc-form-control` anatomy
- [ ] All visual values use CSS custom properties (zero hard-coded colors/sizes)
- [ ] `for`/`id` label association present
- [ ] `aria-required`, `aria-labelledby`, `aria-describedby` wired on inputs
- [ ] `aria-invalid` + `role="alert"` + `aria-live="assertive"` on error containers
- [ ] Decorative elements have `aria-hidden="true"`
- [ ] Uses shipped icon system (`zc-li-outline` / `zc-li-solid`)
- [ ] All 3 variants present: default (with help text), error, disabled
- [ ] CSS includes `.validationError`, `.zc-sr-only`, disabled state rules
- [ ] No inline flex/grid inside form field anatomy
- [ ] JS handles blur validation and input re-validation
