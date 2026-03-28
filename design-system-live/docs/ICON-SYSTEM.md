# Icon System Reference

> **Role**: Documents the icon font system — font families, file inventory, HTML usage patterns, commonly used icons for form fields, and how to browse the catalog. An agent must reference this when adding icons to components.

---

## 1. Overview

The design system uses **font-based icons** shipped as two families:

| Family | Class Prefix | Count | Font Family Name |
|--------|-------------|-------|-----------------|
| **Outline** | `zc-li-outline` | 2,093 icons | `ZC Live Outline` |
| **Solid** | `zc-li-solid` | 2,131 icons | `ZC Live Solid` |

Icons are rendered as `<i>` elements — the font family maps icon class names to unicode glyphs.

---

## 2. File Inventory

All files live in `smooth-icons/`:

```
smooth-icons/
├── icon-data.js                 ← Icon name → unicode map (ICON_DATA object)
├── zc-live-smooth-fonticons.css ← @font-face declarations for both families
├── zclive-outline.woff2         ← Outline font (primary web format)
├── zclive-outline.woff
├── zclive-outline.ttf
├── zclive-outline.eot
├── zclive-outline.svg
├── zclive-solid.woff2           ← Solid font (primary web format)
├── zclive-solid.woff
├── zclive-solid.ttf
├── zclive-solid.eot
└── zclive-solid.svg
```

---

## 3. HTML Usage

### Outline icon (default for form fields)
```html
<i class="zc-li-outline <icon-name>" aria-hidden="true"></i>
```

### Solid icon
```html
<i class="zc-li-solid <icon-name>" aria-hidden="true"></i>
```

### Key rules
1. **Always** include `aria-hidden="true"` — icons are decorative
2. **Outline** is the default style for form field UI affordances
3. **Solid** is used for filled emphasis on richer surfaces
4. Never mix icon families within the same component context
5. Icon sizing inherits from the parent's `font-size`
6. Icon color inherits from the parent's `color` (or use `--primary-icons-color`)

---

## 4. Icons Used in Form Fields

These icons appear across the form field component library:

| Icon Name | Class | Usage | Component(s) |
|-----------|-------|-------|--------------|
| `ui-3-alert` | `zc-li-outline ui-3-alert` | Validation error icon | All required fields |
| `ui-3-search` | `zc-li-outline ui-3-search` | Search trigger | Dropdown, Multi Select, Lookup |
| `ui-1-simple-remove` | `zc-li-outline ui-1-simple-remove` | Clear / remove | Multi Select tags, File Upload |
| `arrows-2-square-upload` | `zc-li-outline arrows-2-square-upload` | Upload trigger | File, Image, Audio, Video Upload |
| `arrows-4-undo-29` | `zc-li-outline arrows-4-undo-29` | Restore / undo | Signature Field, Rich Text |
| `media-1-video-64` | `zc-li-outline media-1-video-64` | Video action | Video Upload |
| `ui-1-calendar-60` | `zc-li-outline ui-1-calendar-60` | Date picker trigger | Date Input, Datetime Input |
| `ui-2-time-clock` | `zc-li-outline ui-2-time-clock` | Time picker trigger | Time Input |
| `ui-1-eye-17` | `zc-li-outline ui-1-eye-17` | Show/reveal | OTP Field |
| `ui-1-eye-ban-18` | `zc-li-outline ui-1-eye-ban-18` | Hide/mask | OTP Field |

### Error icon in HTML context

```html
<div class="zc-field-error-text zc-field-error-msg" role="alert" aria-live="assertive" hidden>
  <i class="zc-field-error-msg-icon zc-li-outline ui-3-alert" aria-hidden="true"></i>
  <span>This field is mandatory. Enter a value.</span>
</div>
```

---

## 5. Icon Categories

Icons are organized by prefix/category:

| Category | Prefix | Example Icons | Count (approx) |
|----------|--------|---------------|----------------|
| UI Level 1 | `ui-outline-1_` / `ui-1-` | edit, trash, lock, check, bell, home | ~120 |
| UI Level 2 | `ui-outline-2_` / `ui-2-` | alert, filter, grid, menu, link, time | ~100 |
| UI Level 3 | `ui-outline-3_` / `ui-3-` | search, alert, heart, send, phone | ~50 |
| Arrows 1-4 | `arrows-outline-*_` / `arrows-*-` | directions, zoom, download, upload | ~250 |
| Files | `files-` | folder, archive, document types | ~100 |
| Design | `design-` | shapes, tools, layouts | ~100 |
| Media 1-2 | `media-outline-*_` / `media-*-` | camera, video, audio, player | ~120 |
| Users | `users-` | single, multiple, add, delete | ~70 |
| Location | `location-` | map, pin, compass, flag | ~40 |
| Business | `business-` | chart, money, briefcase, award | ~70 |
| Shopping | `shopping-` | cart, bag, credit card, tag | ~60 |
| Tech | `tech-` | computer, mobile, tablet, print | ~80 |
| Text | `text-` | bold, italic, align, list | ~25 |
| Health | `health-` | hospital, pill, pulse, ambulance | ~40 |
| Food | `food-` | plate, cup, utensils | ~80 |
| Weather | `weather-` | cloud, sun, rain, snow | ~55 |
| Nature | `nature-` | tree, flower, animal | ~30 |
| Emoticons | `emoticons-` | smile, sad, angry | ~50 |
| Sport | `sport-` | trophy, ball, fitness | ~35 |
| Other | Various | furniture, clothes, travel, holidays, gestures, education | ~300 |

---

## 6. Browsing the Icon Catalog

### In the design library
The **Icons** section in `design-library.html` provides a searchable, tabbed (Outline / Solid) browser with click-to-copy functionality.

### Programmatically
Read `smooth-icons/icon-data.js` which exports a global `ICON_DATA` object:

```javascript
// Structure
var ICON_DATA = {
  "outline": {
    "icon-name": "unicode-hex",
    // ... 2,093 entries
  },
  "solid": {
    "icon-name": "unicode-hex",
    // ... 2,131 entries
  }
};
```

### Command to list icons
```bash
# Count outline icons
node -e "var d = require('./smooth-icons/icon-data.js'); console.log(Object.keys(d.outline || ICON_DATA.outline).length)"

# Search for specific icon names
node -e "var d = require('./smooth-icons/icon-data.js'); Object.keys(ICON_DATA.outline).filter(k => k.includes('alert')).forEach(k => console.log(k))"
```

---

## 7. Adding an Icon to a Component

```
1. Browse the icon catalog (design library or icon-data.js)
2. Pick the appropriate icon name
3. Use outline style for form field affordances:
     <i class="zc-li-outline <icon-name>" aria-hidden="true"></i>
4. If the icon is purely decorative: aria-hidden="true" (always)
5. If the icon conveys meaning: wrap with sr-only text instead
     <span class="zc-sr-only">Upload file</span>
     <i class="zc-li-outline arrows-2-square-upload" aria-hidden="true"></i>
6. Style icon color via CSS custom properties, not inline styles
```

---

## 8. CSS Integration

The icon font CSS (`zc-live-smooth-fonticons.css`) declares:

```css
@font-face {
  font-family: 'ZC Live Outline';
  src: url('zclive-outline.eot');
  src: url('zclive-outline.eot?#iefix') format('embedded-opentype'),
       url('zclive-outline.woff2') format('woff2'),
       url('zclive-outline.woff') format('woff'),
       url('zclive-outline.ttf') format('truetype'),
       url('zclive-outline.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'ZC Live Solid';
  /* ... same format pattern ... */
}
```

The icon class names map to `:before` pseudo-elements with the corresponding unicode content value.

SCSS variables for font family references:
```scss
$zc-nucleo-icon-outline: "ZC Live Outline";
$zc-nucleo-icon-solid: "ZC Live Solid";
```
