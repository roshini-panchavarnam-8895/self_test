# Form Field Components — Documentation

This document defines the **enterprise form field standard** used across the design system library in this repository.

Form fields are the core component family in this project. Each field is expected to:

- follow the standard form field class naming convention
- use token-driven styling
- meet accessibility requirements
- match the rendered output shown in the generated design library

## Common Structure

All form fields follow a consistent HTML structure using the standard class naming convention.

```text
form-group          ← Parent wrapper for every field
├── form-label      ← Label element
│   └── zc-label-text  ← Label text wrapper
│       └── fieldMandate  ← Mandatory indicator (*)
├── form-field      ← Input / control wrapper
│   ├── form-control       ← The actual input, dropdown, textarea, etc.
│   ├── zc-help-txt           ← Help / hint text
│   └── fieldErrorMsg   ← Error message (shown on validation failure)
```

### Validation Error State

Add the class `validationError` to `form-field` to activate the error state styling.

---

## Base HTML (Single Line Example)

The following example represents the baseline structure for a standard single-line field with label, help text, and validation messaging.

```html
<div class="form-group clearfix">
  <label class="form-label" for="zc-Single_Line">
    <span class="zc-label-text">
      Single Line
      <span class="fieldMandate" aria-hidden="true">*</span>
    </span>
  </label>

  <div class="form-field clearfix validationError">
    <input class="form-control"
           id="zc-Single_Line"
           name="Single_Line"
           type="text"
           maxlength="255"
           aria-required="true"
           aria-describedby="zc-Single_Line-helpText zc-Single_Line-errorMsg"
           aria-invalid="true"
           autocomplete="off">

    <div id="zc-Single_Line-helpText" class="zc-help-txt">
      This is a help text
    </div>

    <div id="zc-Single_Line-errorMsg"
         class="fieldErrorMsg"
         role="alert">
      <span>This field is mandatory. Enter a value.</span>
    </div>
  </div>
</div>
```

---

## Class Reference

| Class | Purpose |
|---|---|
| `form-group` | Top-level wrapper for every field (`display: table`) |
| `form-label` | `<label>` element styling (`display: table-cell`) |
| `zc-label-text` | Inner `<span>` wrapping label copy |
| `fieldMandate` | Mandatory asterisk indicator (`*`) |
| `form-field` | Wrapper around the control and supporting messages (`display: table-cell`) |
| `form-control` | The actual input, select, textarea, or interactive control |
| `zc-help-txt` | Help text below the control |
| `fieldErrorMsg` | Error message container |
| `validationError` | Modifier on `form-field` to show error state |
| `clearfix` | Clearfix utility |

---

## Accessibility Requirements

All form fields must satisfy the following baseline accessibility requirements.

| Attribute | Where | Purpose |
|---|---|---|
| `for` / `id` | label → input | Associates label with control |
| `aria-required="true"` | input | Marks field as required |
| `aria-labelledby` | input | Points to the label `id` |
| `aria-describedby` | input | Points to help text and error `id`s |
| `aria-invalid="true"` | input | Signals current validation failure |
| `aria-hidden="true"` | mandate span, error icon | Hides decorative content from assistive technology |
| `role="alert"` | error container | Live region for validation feedback |
| `aria-live="assertive"` | error container | Immediate announcement |

---

## Design Tokens

Form fields must use **CSS custom properties** for shared visual decisions such as color, typography, radius, and sizing.

This project uses a token-driven approach aligned with the broader design system and Figma sync workflow.

```css
:root {
  /* Colors */
  --zc-color-text:           rgb(18, 19, 43);
  --zc-color-label:          rgb(51, 51, 51);
  --zc-color-border:         rgb(203, 203, 220);
  --zc-color-error:          rgb(230, 31, 31);
  --zc-color-error-text:     #c04543;
  --zc-color-mandatory:      rgb(255, 0, 0);
  --zc-color-help-text:      rgb(47, 48, 93);
  --zc-color-bg:             rgb(255, 255, 255);
  --zc-color-primary:        rgb(80, 81, 249);
  --zc-color-icon:           rgb(96, 97, 137);

  /* Typography */
  --zc-font-family:          'Lato', sans-serif;
  --zc-font-size:            14.5px;

  /* Sizing */
  --zc-input-height:         36px;
  --zc-input-width:          240px;
  --zc-border-radius:        6px;
}
```

---

## Icon System

Use the shipped **outline icon system** for form field affordances, typically through the `zc-li-outline` class.

| Icon class | Usage |
|---|---|
| `ui-3-alert` | Validation error icon |
| `arrows-2-square-upload` | File or image upload trigger |
| `arrows-4-undo-29` | Restore or undo action |
| `media-1-video-64` | Video-related action |
| `ui-1-simple-remove` | Remove or clear action |
| `ui-3-search` | Advanced search trigger |

---

## Implementation Rules

1. **Table-based layout** — form field anatomy uses `display: table` / `table-cell` for label-input alignment.
2. **Consistent class names** — use the standard class names: `form-group`, `form-label`, `form-field`, `form-control`, `fieldMandate`, `fieldErrorMsg`, `zc-help-txt`.
3. **Design tokens** — avoid hard-coded color, font, radius, or spacing values in component CSS. Use `--zc-*` prefixed CSS custom properties.
4. **SCSS architecture** — each component has a `.scss` file that uses `@use '../common' as c;` to import shared styles from `forms/_common.scss`. Compiled CSS is self-contained.
5. **Accessibility compliance** — every control must include the required ARIA and label relationships.
6. **Code parity** — the HTML, SCSS, CSS, and JS surfaced in the design library must match the rendered component.
7. **Separate source files** — each component lives in its own folder with individual `.html`, `.css`, and `.scss` files, plus `.js` where needed.

---

## Supported Component List

Each component below is implemented as a separate folder under `forms/`.

| # | Component | Folder | Control element |
|---|---|---|---|
| 1 | Text Input | `forms/text-input/` | `<input type="text">` |
| 2 | Textarea | `forms/textarea/` | `<textarea>` |
| 3 | Number Input | `forms/number-input/` | `<input type="text">` (numeric) |
| 4 | Decimal Input | `forms/decimal-input/` | `<input type="text">` (decimal) |
| 5 | Currency Input | `forms/currency-input/` | `<input type="text">` + currency icon |
| 6 | Percent Input | `forms/percent-input/` | `<input type="text">` + `%` symbol |
| 7 | Email Input | `forms/email-input/` | `<input type="text">` + email icon |
| 8 | Phone Input | `forms/phone-input/` | `<input type="text">` + phone prefix |
| 9 | URL Input | `forms/url-input/` | `<input type="text">` |
| 10 | Date Input | `forms/date-input/` | `<input type="text">` + calendar icon |
| 11 | Datetime Input | `forms/datetime-input/` | `<input type="text">` + calendar/time |
| 12 | Time Input | `forms/time-input/` | `<input type="text">` + clock icon |
| 13 | Dropdown | `forms/dropdown/` | Custom select / combobox |
| 14 | Multi Select | `forms/multi-select/` | Multi-value combobox |
| 15 | Checkbox | `forms/checkbox/` | `<input type="checkbox">` group |
| 16 | Radio Button | `forms/radio-button/` | `<input type="radio">` group |
| 17 | Decision Box | `forms/decision-box/` | Single `<input type="checkbox">` |
| 18 | Name Field | `forms/name-field/` | Composite (prefix, first, last, suffix) |
| 19 | Address Field | `forms/address-field/` | Composite (line 1/2, city, state, zip, country) |
| 20 | File Upload | `forms/file-upload/` | `<input type="file">` |
| 21 | Image Upload | `forms/image-upload/` | `<input type="file" accept="image/*">` |
| 22 | Audio Upload | `forms/audio-upload/` | `<input type="file" accept="audio/*">` |
| 23 | Video Upload | `forms/video-upload/` | `<input type="file" accept="video/*">` |
| 24 | Rich Text | `forms/rich-text/` | Rich text editor |
| 25 | Signature Field | `forms/signature-field/` | Canvas-based signature |
| 26 | Section Separator | `forms/section-separator/` | `<section>` with `<h2>` and `<hr>` |
| 27 | Form Buttons | `forms/form-buttons/` | Submit / Reset buttons |

