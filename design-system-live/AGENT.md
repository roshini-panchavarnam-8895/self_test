# Design System Agent — Command Reference

> **Purpose**: This file is the single entry point for an AI agent to understand, build, maintain, and extend the component design library. Read this file first, then follow references to detailed docs.

---

## System Overview

This is an **enterprise form field design system** that produces a generated design library (`design-library.html`) from source components. It includes:

- **27+ form field components** in `forms/` (HTML, CSS, SCSS, JS per component)
- **Report layout patterns** in `reports/` (calendar, kanban, timeline, list, card variants)
- **Design tokens** as CSS custom properties synced with Figma
- **Icon font system** (2,000+ outline + solid icons) in `smooth-icons/`
- **Build pipeline** (`_build-design-library.js`) that generates the SPA design library
- **Two-way Figma sync** via `figmasync/auto-sync.mjs`

---

## Workspace Structure

```
├── AGENT.md                          ← YOU ARE HERE — agent entry point
├── docs/
│   ├── COMPONENT-SPEC.md             ← Component structure, naming, accessibility rules
│   ├── TOKENS.md                     ← Design token reference (colors, typography, sizing)
│   ├── ARCHITECTURE.md               ← Build pipeline, Figma sync, production architecture
│   └── ICON-SYSTEM.md                ← Icon font usage reference
├── forms/                            ← Source components (one folder per field type)
│   ├── text-input/                   ← Reference component (start here for patterns)
│   │   ├── text-input.html
│   │   ├── text-input.css
│   │   ├── text-input.scss
│   │   └── text-input.js
│   ├── textarea/
│   ├── number-input/
│   └── ... (27+ components)
├── reports/                          ← Report layout HTML patterns
│   ├── calendar_report.html
│   ├── kanban.html
│   ├── timeline.html
│   ├── listreport.html
│   └── card report/
├── smooth-icons/                     ← Icon font files + data
│   ├── icon-data.js                  ← Icon name → unicode map (outline + solid)
│   ├── zc-live-smooth-fonticons.css  ← @font-face declarations
│   └── zclive-*.woff2/woff/ttf/eot  ← Font binaries
├── figmasync/                        ← Figma ↔ Code token sync
│   ├── auto-sync.mjs                ← Two-way sync server
│   ├── design-map.json              ← Token mapping dictionary
│   └── HOW-AUTO-SYNC-WORKS.md       ← Sync documentation
├── design-library.html               ← GENERATED — do not hand-edit (rebuild instead)
├── design_system.md                  ← Full design system governance doc
├── form-field-components.md          ← Form field standard reference
├── color_variables.css               ← Root color tokens
├── _general_variables.scss           ← SCSS variables and base tokens
├── grid.css                          ← 12-column grid + flex utility classes
├── index.html                        ← Legacy all-components gallery
├── _build-design-library.js          ← Main build script
├── _add-css-variants.js              ← Ensures standard CSS rules in all components
├── _add-label-placement.js           ← Adds label placement tabs
├── _add-variants.js                  ← Ensures default/error/disabled variants exist
├── _component-scaffold.js            ← Metadata generation utility
├── _design-library-server.js         ← Dev server (port 8123)
├── _verify-design-library.js         ← Post-build verification
├── verify-design-library.sh          ← Shell wrapper for verification
├── cbq_design_system/                ← Git-versioned snapshot (separate repo)
├── _archive/                         ← Archived one-off scripts and backups
└── Creator-logo.jpg                  ← Brand logo asset
```

---

## Agent Commands

### `create-component <name>`

Create a new form field component from scratch.

**Steps:**
1. Read `docs/COMPONENT-SPEC.md` for the required structure
2. Use `forms/text-input/` as the reference implementation
3. Create folder `forms/<name>/` with 4 files: `<name>.html`, `<name>.css`, `<name>.scss`, `<name>.js`
4. Follow the HTML anatomy in COMPONENT-SPEC.md exactly
5. Use only design tokens from `docs/TOKENS.md` — never hard-code colors, sizes, or radii
6. Apply all accessibility attributes per the accessibility table
7. Include 3 variants: **default** (with help text), **error** (validationError), **disabled**
8. Include label placement wrapper: `<form class="zc-form-table zc-label-left">`
9. Run `node _verify-design-library.js` after adding

**CSS file must include:**
- `.sr-only` screen-reader-only utility
- `.zc-form-required` mandatory indicator styles
- `.zc-form-hint` / `.zc-help-txt` help text styles
- `.zc-field-error-text` / `.zc-field-error-msg` error message styles
- `.validationError` error state (border + box-shadow using `var(--color-error)`)
- Disabled state styles using `var(--color-bg-disabled)`

---

### `build-library`

Regenerate the design library from source components.

**Steps:**
1. Run `node _build-design-library.js`
2. Run `node _verify-design-library.js` to validate
3. Preview: `node _design-library-server.js` (opens port 8123)

---

### `add-variants <component-name>`

Ensure a component has all required variants (default, error, disabled).

**Steps:**
1. Run `node _add-variants.js` — uses `forms/text-input/` as reference
2. Verify the component HTML now contains all 3 states

---

### `add-label-placement`

Add label placement tabs (left, right, top, inplace) to components.

**Steps:**
1. Run `node _add-label-placement.js`
2. Wraps forms in `<form class="zc-form-table zc-label-left">` with tab controls

---

### `ensure-css-standards`

Make sure all component CSS files have the standard shared rules.

**Steps:**
1. Run `node _add-css-variants.js`
2. Adds `.sr-only`, `.form-required`, `.form-hint`, `.fieldErrorMsg`, disabled, CSS variables

---

### `start-sync`

Start the two-way Figma ↔ Code token sync server.

**Steps:**
1. `cd figmasync && node auto-sync.mjs`
2. Opens WebSocket on port 9224
3. Requires Figma Desktop Bridge plugin running
4. See `figmasync/HOW-AUTO-SYNC-WORKS.md` for configuration

---

### `map-token <css-var> <figma-variable-name> <figma-variable-id>`

Map a CSS custom property to a Figma variable for sync.

**Steps:**
1. Open `figmasync/design-map.json`
2. Add entry under `tokens.colors` (or appropriate section):
```json
"--css-variable-name": {
  "cssProperty": "--css-variable-name",
  "cssValue": "#hex-value",
  "figmaVariable": "Figma/Path/Variable_Name",
  "figmaVariableId": "VariableID:x:y",
  "figmaResolvedValue": "#hex-value",
  "type": "COLOR",
  "lastSync": null,
  "lastSyncResult": null
}
```
3. Ensure the CSS variable in `design-library.html` uses a direct hex value (not `var()` reference) for sync to work

---

### `serve`

Start the development server.

**Steps:**
1. `node _design-library-server.js` — serves on port 8123
2. Or: `python3 -m http.server 8080` from workspace root

---

### `verify`

Validate the design library integrity.

**Steps:**
1. `node _verify-design-library.js` or `./verify-design-library.sh`

---

### `review-component <component-name>`

Review a component against the design system checklist.

**Checklist:**
- [ ] Uses `zc-` prefix on all classes
- [ ] Follows the `zc-form-group > zc-form-label + zc-form-field > zc-form-control` anatomy
- [ ] Uses design tokens (no hard-coded colors, sizes, radii, font-sizes)
- [ ] Has `for`/`id` label association
- [ ] Has `aria-required`, `aria-labelledby`, `aria-describedby` on inputs
- [ ] Has `aria-invalid` + `role="alert"` + `aria-live="assertive"` on error containers
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Uses the shipped icon system (`zc-li-outline` / `zc-li-solid`)
- [ ] Has 3 variants: default with help text, error state, disabled state
- [ ] CSS includes `.validationError`, `.sr-only`, disabled state rules
- [ ] Separate files: `.html`, `.css`, `.scss`, `.js`
- [ ] No inline flex/grid inside form field anatomy (floats + clearfix)

---

### `list-components`

List all available form field components.

**Command:** `ls forms/`

**Expected (27+ components):**
text-input, textarea, number-input, decimal-input, currency-input, percent-input, email-input, phone-input, url-input, date-input, datetime-input, time-input, dropdown, multi-select, checkbox, radio-button, decision-box, name-field, address-field, file-upload, image-upload, audio-upload, video-upload, rich-text, signature-field, section-separator, form-buttons, lookup-search-field, otp-field, otp-field-with-8-digit, qr-code-field, rating-field, toggle-switch-field

---

### `list-tokens`

Show all design tokens.

**Read:** `docs/TOKENS.md` for the full reference, or inspect:
- `color_variables.css` — color tokens
- `_general_variables.scss` — typography, sizing, prefix variables
- `figmasync/design-map.json` — synced token mappings

---

### `list-icons <type>`

List available icons (outline or solid).

**Command:** Read `smooth-icons/icon-data.js` and filter by type.
- `ICON_DATA.outline` — 2,093 outline icons
- `ICON_DATA.solid` — 2,131 solid icons

**Usage in HTML:**
```html
<i class="zc-li-outline <icon-name>" aria-hidden="true"></i>
<i class="zc-li-solid <icon-name>" aria-hidden="true"></i>
```

---

## Rules (Non-Negotiable)

1. **`zc-` prefix** — Every CSS class in component markup must use the `zc-` namespace
2. **Token-driven** — Never hard-code color, font-size, border-radius, or spacing. Use CSS custom properties
3. **Accessibility first** — Every control must have proper ARIA relationships, keyboard support, and contrast
4. **No flex/grid in field internals** — Form field anatomy uses floats + clearfix (page layouts can use flex/grid)
5. **Shipped icons only** — Use `zc-li-outline` / `zc-li-solid` classes, not Font Awesome or ad-hoc icons in components
6. **Code parity** — Source HTML/CSS/JS must match what renders in the design library
7. **Separate files** — Each component gets its own folder with `.html`, `.css`, `.scss`, `.js`
8. **Reference component** — When in doubt, follow `forms/text-input/` exactly

---

## Quick Start for a New Agent

```
1. Read this file (AGENT.md)
2. Read docs/COMPONENT-SPEC.md for the HTML/CSS structure rules
3. Read docs/TOKENS.md for available design tokens
4. Read docs/ARCHITECTURE.md for build pipeline and Figma sync details
5. Read docs/ICON-SYSTEM.md for icon usage reference
6. Look at forms/text-input/ as the reference implementation
7. Run: node _build-design-library.js  (to regenerate library)
8. Run: node _design-library-server.js  (to preview)
```
