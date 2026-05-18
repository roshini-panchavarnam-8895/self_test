# Design Tokens Reference

> **Role**: Complete catalog of every design token available in the system — CSS custom properties, SCSS variables, and Figma-synced mappings. An agent must use these tokens (never hard-coded values) when building or modifying components.

---

## 1. Token Sources

| Source | Path | Format | Purpose |
|--------|------|--------|---------|
| Color tokens | `color_variables.css` | CSS custom properties | Application-wide color palette |
| SCSS variables | `_general_variables.scss` | SCSS `$variables` | Typography scale, font families, weights, prefix definitions |
| Figma sync map | `figmasync/design-map.json` | JSON | Two-way mapping between CSS variables and Figma variables |
| Component `:root` | Each `forms/<name>/<name>.css` | CSS custom properties | Component-level token aliases with fallbacks |

---

## 2. Color Tokens (`color_variables.css`)

These are the **application-wide** color tokens defined in the root `:root` block.

### Primary / Accent

| Token | Value | Usage |
|-------|-------|-------|
| `--primary-color` | `#5051F9` | Brand accent, active states, focus |
| `--primary-opacity` | `#5353f91f` | Low-opacity brand tint |

### Background

| Token | Value | Usage |
|-------|-------|-------|
| `--primary-bg-color` | `#F3F4F8` | Page / form background |
| `--secondary-bg-color` | `#F8F8FB` | Secondary surface |
| `--tertiary-bg-color` | `#F8F8FB` | Tertiary surface |
| `--quaternary-bg-color` | `#FAFBFF` | Quaternary surface |
| `--primary-background-text-color` | `#fff` | Text on primary background |

### Surface

| Token | Value | Usage |
|-------|-------|-------|
| `--secondary-color` | `#F6F6F6` | Secondary surface fill |
| `--disable-color` | `#F3F4F8` | Disabled element fill |
| `--tertiary-color` | `#EDEDF4` | Tertiary surface fill |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `--primary-text-color` | `#12132B` | Primary labels, headings, values |
| `--secondary-text-color` | `#2F305D` | Secondary body text |
| `--tertiary-text-color` | `#606189` | Muted text, icons, hints |
| `--disable-text-color` | `var(--tertiary-text-color)` | Disabled field text |
| `--primary-bg-text-color` | `#fff` | White text on dark surfaces |

### Error

| Token | Value | Usage |
|-------|-------|-------|
| `--error-bg-color` | `#ffffff` | Error state background |
| `--error-text-color` | `#E61F1F` | Error text and icons |
| `--error-border-color` | `var(--error-text-color)` | Error state border |
| `--error-hover-bg-color` | `#FFF3F3` | Error hover surface |

### Warning

| Token | Value | Usage |
|-------|-------|-------|
| `--warning-bg-color` | `#FFF8E0` | Warning background |
| `--warning-text-color` | `#2C291D` | Warning text |
| `--warning-border-color` | `#ECD790` | Warning border |

### Border

| Token | Value | Usage |
|-------|-------|-------|
| `--primary-border-color` | `#CBCBDC` | Default input/card border |
| `--secondary-border-color` | `#DCDCE7` | Secondary border |
| `--tertiary-border-color` | `#E7E7EE` | Subtle separator border |
| `--quaternary-border-color` | `#F6F6F9` | Faintest border |

### Icons

| Token | Value | Usage |
|-------|-------|-------|
| `--primary-icons-color` | `#71718C` | Default icon fill |
| `--secondary-icons-color` | `#727793` | Secondary icon fill |
| `--tertiary-icons-color` | `#606189` | Tertiary icon fill |

### Box Shadow

| Token | Value | Usage |
|-------|-------|-------|
| `--light-box-shadow-color` | `rgba(176, 176, 194, 0.36)` | Subtle elevation |
| `--dark-box-shadow-color` | `#F1F1F5` | Flat shadow / border glow |

### Card

| Token | Value | Usage |
|-------|-------|-------|
| `--card-bg-color` | `#fff` | Card background |
| `--card-hover-bg-color` | `var(--submenu-hover-bg-color)` | Card hover |
| `--card-border-color` | `var(--secondary-border-color)` | Card border |
| `--card-container-bg-color` | `#FAFBFF` | Card container surface |

### Calendar

| Token | Value | Usage |
|-------|-------|-------|
| `--calendar-selected-bg-color` | `#F1F1FF` | Selected date background |

### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `--dark-primary-color` | `#121219` | Dark mode primary |
| `--dark-secondary-color` | `#282A57` | Dark mode secondary |
| `--dark-tertiary-color` | `#DBDBE9` | Dark mode tertiary |
| `--dark-primary-hover-bg` | `#3F3F68` | Dark mode hover |
| `--dark-border-color` | `#313367` | Dark mode border |

### Miscellaneous

| Token | Value | Usage |
|-------|-------|-------|
| `--form-label-text-color` | `#111136` | Form label text |
| `--admin-bar-background` | `#F3F3F7` | Admin bar fill |
| `--custom-card-image-border-color` | `#D2D9DB` | Image card border |
| `--custom-card-image-bg-color` | `#FAFCFC` | Image card background |
| `--info-toast-border-color` | `#D7D7EF` | Toast notification border |
| `--count-badge-bg-color` | `#E9E9F3` | Badge background |
| `--scrollbar-default-bg-color` | `#B7B8BF` | Scrollbar track |
| `--scrollbar-hover-bg-color` | `#A3A4AA` | Scrollbar hover |
| `--default-img-color` | `#96A4AA` | Placeholder image icon |
| `--tooltip-bg-color` | `var(--primary-text-color)` | Tooltip background |
| `--tooltip-light-bg-color` | `rgba(255, 255, 255, 0.73)` | Light tooltip surface |

### Unified Aliases

| Token | Value | Purpose |
|-------|-------|---------|
| `--zc-primary-text-color` | `var(--primary-text-color)` | Namespaced alias |
| `--zc-secondary-text-color` | `var(--secondary-text-color)` | Namespaced alias |
| `--zc-tertiary-text-color` | `var(--tertiary-text-color)` | Namespaced alias |
| `--zc-tertiary-border-color` | `var(--tertiary-border-color)` | Namespaced alias |

---

## 3. Component-Level Tokens

Each component CSS file declares its own `:root` block with **aliased tokens** that reference the application tokens as fallbacks:

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

| Component Token | Maps To | Fallback | Purpose |
|-----------------|---------|----------|---------|
| `--color-primary` | `--primary-color` | `#5051F9` | Brand accent color |
| `--color-text-primary` | `--primary-text-color` | `#12132b` | Text color |
| `--color-text-placeholder` | — | `#999999` | Placeholder text |
| `--color-border` | `--primary-border-color` | `#cbcbdc` | Default border |
| `--color-border-focus` | `--primary-color` | `#5051F9` | Focus border |
| `--color-bg-white` | — | `#ffffff` | Input background |
| `--color-bg-disabled` | — | `#f0f0f4` | Disabled background |
| `--color-error` | — | `#ff0000` | Error state color |
| `--font-family` | — | `'Lato', sans-serif` | Font family |
| `--font-size-base` | — | `14.5px` | Base font size |
| `--input-height` | — | `36px` | Input field height |
| `--input-border-radius` | — | `8px` | Input corner radius |
| `--field-margin-bottom` | — | `24px` | Space between fields |

---

## 4. SCSS Variables (`_general_variables.scss`)

### Configuration

| Variable | Value | Purpose |
|----------|-------|---------|
| `$base_font_size` | `16px` | Root `<html>` font-size for `rem()` calculation |
| `$prefix` | `zc` | Class prefix for all components |
| `$suffix` | `zc-dem` | Legacy class suffix |
| `$prefix-dem` | `zc-dem` | Demo/presentation prefix |

### Typography Scale

| Variable | rem Value | px Equivalent | Usage |
|----------|-----------|---------------|-------|
| `$zc-font-extra-tiny` | `rem(8px)` | 8px | Micro text |
| `$zc-font-tiny` | `rem(10px)` | 10px | Caption text |
| `$zc-font-extra-small` | `rem(11px)` | 11px | Fine print |
| `$zc-font-small` | `rem(12px)` | 12px | Help text, error text |
| `$zc-font-1x-small` | `rem(13px)` | 13px | Sub-labels, placeholders |
| `$zc-font-medium` | `rem(14px)` | 14px | Labels, input text |
| `$zc-font-regular` | `rem(14.5px)` | 14.5px | Default body text |
| `$zc-font-extra-regular` | `rem(15px)` | 15px | Slightly larger body |
| `$zc-font-large` | `rem(16px)` | 16px | Section titles |
| `$zc-font-extra-large` | `rem(18px)` | 18px | Subheadings |
| `$zc-font-1x-large` | `rem(20px)` | 20px | H5 heading equivalent |
| `$zc-font-2x-large` | `rem(22px)` | 22px | H4 heading equivalent |
| `$zc-font-3x-large` | `rem(24px)` | 24px | H3 heading equivalent |
| `$zc-font-4x-large` | `rem(26px)` | 26px | Large heading |
| `$zc-font-5x-large` | `rem(28px)` | 28px | Large heading |
| `$zc-font-6x-large` | `rem(30px)` | 30px | Display text |
| `$zc-font-7x-large` | `rem(32px)` | 32px | Display text |

### Font Families

| Variable | Value | Purpose |
|----------|-------|---------|
| `$zc-lato` | `"Lato", sans-serif` | Primary form UI font |
| `$zc-opensans` | `"OpenSans", sans-serif` | Alternative font |
| `$zc-monaco` | `"monaco", monospace, sans-serif` | Code/monospace |
| `$zc-puvi` | `"ZohoPuvi", sans-serif` | Zoho branded font |
| `$zc-custom-font` | `"Lato", sans-serif` | Custom theme font |
| `$zc-nucleo-icon-solid` | `"ZC Live Solid"` | Solid icon font |
| `$zc-nucleo-icon-outline` | `"ZC Live Outline"` | Outline icon font |
| `$zc-nucleo-icon-smooth` | `"ZC Smooth Icons"` | Smooth icon font |
| `$zc-primary-font-family` | `$zc-puvi` | Default font family |

### Font Weights

| Variable | Value | Usage |
|----------|-------|-------|
| `$zc-font-weight-light` | `300` | Light text |
| `$zc-font-weight-regular` | `400` | Normal labels, body |
| `$zc-font-weight-semibold` | `600` | Emphasis, headings |
| `$zc-font-weight-bold` | `700` | Strong emphasis |

### Letter Spacing

| Variable | Value |
|----------|-------|
| `$size_small` | `0.1px` |
| `$size_medium` | `0.2px` |

### Common Colors

| Variable | Value |
|----------|-------|
| `$zc-white` | `#fff` |
| `$zc-black` | `#000` |

---

## 5. Figma-Synced Tokens

The tokens below are managed by the two-way sync system (`figmasync/auto-sync.mjs`). Changes in Figma propagate to code and vice versa.

**Sync metadata:**
- Figma file: "Live Mode Design Library (Rose)" (`gxa4RQDibjzUe7BnyPn221`)
- Collection: CDS Tokens (`VariableCollectionId:5:2`)
- Mode: Live Mode (`5:0`)

### Synced Color Tokens

| CSS Variable | Value | Figma Variable | Figma ID | Status |
|-------------|-------|----------------|----------|--------|
| `--primary-color` | `#5051F9` | `Color/Alias/Primary/Primary_Base ✦` | `VariableID:5:250` | Synced |
| `--primary-text-color` | `#12132B` | `Color/Primitive/Grey/Grey180` | `VariableID:5:130` | Mapped |
| `--secondary-text-color` | `#2F305D` | `Color/Semantic/Neutral/Text/Neutral_Text_Dark` | `VariableID:5:543` | Mapped |
| `--tertiary-text-color` | `#606189` | `Color/Semantic/Neutral/Text/Neutral_Text_Default` | `VariableID:5:547` | Mapped |
| `--primary-border-color` | `#CBCBDC` | `Color/Semantic/Neutral/Border/Neutral_Border_Minimal` | `VariableID:5:559` | Mapped |
| `--card-bg-color` | `#FFFFFF` | `Color/Primitive/Black&White/White` | `VariableID:5:204` | Synced |
| `--error-text-color` | `#CC1914` | `Color/Semantic/Error/Text/Error_Text_Default` | `VariableID:5:387` | Synced |
| `--color-primary` | `#9F50F9` | `Color/Semantic/Primary/Border/Primary_Border_Default` | `VariableID:5:365` | Synced |
| `--color-border-focus` | `#9F50F9` | `Color/Semantic/Primary/Border/Primary_Border_Default` | `VariableID:5:365` | Synced |
| `--secondary-color` | `#F5F5F5` | `Color/Semantic/Neutral/Surface/Neutral_Surface_Low` | `VariableID:5:539` | Synced |

### Unmapped Color Tokens (code-only, no Figma variable)

| CSS Variable | Value | Role |
|-------------|-------|------|
| `--secondary-border-color` | `#DCDCE7` | Secondary border |
| `--tertiary-border-color` | `#E7E7EE` | Tertiary border |
| `--form-label-text-color` | `#111136` | Form label text |
| `--primary-bg-color` | `#F3F4F8` | Primary background |
| `--tertiary-color` | `#EDEDF4` | Tertiary surface |
| `--primary-icons-color` | `#71718C` | Icon fill |

### Synced Typography Tokens

| CSS Variable | Value | Figma Variable | Figma ID |
|-------------|-------|----------------|----------|
| `--font-size-base` | `14px` | `Type/Primitive/Size/Size_14 ✦` | `VariableID:5:676` |

### Unmapped Typography (code-only)

| CSS Variable | Value | Note |
|-------------|-------|------|
| `--font-family` | `'Lato', sans-serif` | No STRING variable in Figma |

### Synced Radius Tokens

| CSS Variable | Value | Figma Variable | Figma ID |
|-------------|-------|----------------|----------|
| `--input-border-radius` | `8px` | `Radius/Semantic/L` | `VariableID:5:827` |

### Unmapped Spacing Tokens (code-only)

| CSS Variable | Value | Note |
|-------------|-------|------|
| `--input-height` | `36px` | No Figma variable |
| `--field-margin-bottom` | `24px` | No Figma variable |

### Figma-Only Variables (no CSS equivalent yet)

These exist in the Figma CDS Tokens collection but are not yet mapped to CSS:

| Figma Variable | ID | Value | Type |
|----------------|----|-------|------|
| `Color/Primitive/Black&White/Black` | `5:203` | `#000000` | Color |
| `Color/Alias/Primary/Primary_Subtle` | `5:244` | `#E0E0FE` | Color |
| `Color/Alias/Primary/Primary_Dark` | `5:253` | `#3535AD` | Color |
| `Color/Semantic/Primary/Surface/Primary_Surface_Default` | `5:343` | `#5051F9` | Color |
| `Color/Semantic/Error/Surface/Error_Surface_Default` | `5:375` | `#CC1914` | Color |
| `Color/Semantic/Error/Border/Error_Border_Default` | `5:397` | `#CC1914` | Color |
| `Color/Semantic/Neutral/Surface/Neutral_Surface_Bold` | `5:533` | `#393A5D` | Color |
| `Color/Semantic/Neutral/Text/Neutral_Text_Bold` | `5:545` | `#393A5D` | Color |
| `Color/Semantic/Neutral/Text/Neutral_Text_Minimal` | `5:549` | `#B0B0C4` | Color |
| `Radius/Semantic/R✦` | `5:825` | `6px` | Radius |
| `Radius/Semantic/XL` | `5:828` | `10px` | Radius |
| `Radius/Semantic/2XL` | `5:829` | `12px` | Radius |
| `Type/Primitive/Size/Size_12` | `5:675` | `12px` | Typography |
| `Type/Primitive/Size/Size_16` | `5:677` | `16px` | Typography |
| `Type/Semantic/Type Default ✦/H5/Size` | `5:747` | `18px` | Typography |
| `Type/Semantic/Type Default ✦/P1/Size` | `5:763` | `16px` | Typography |

---

## 6. Token Usage Rules

1. **Never hard-code** a color, font-size, border-radius, or spacing value that has a token equivalent
2. **Component CSS** must reference component-level tokens (section 3) which alias the application tokens
3. **New tokens** should follow the `--category-role` naming pattern (e.g., `--color-border-focus`, `--font-size-base`)
4. **Figma sync**: If a new token needs to stay in sync with Figma, add it to `figmasync/design-map.json` using the `map-token` command
5. **Fallback pattern**: Component tokens use `var(--app-token, #fallback)` so components work standalone

### Adding a New Token

```
COMMAND: map-token <css-var> <figma-variable-name> <figma-variable-id>

1. Open figmasync/design-map.json
2. Add entry under the correct category (colors, typography, radius, spacing):
   "<css-var>": {
     "cssProperty": "<css-var>",
     "cssValue": "<hex-value>",
     "figmaVariable": "<Figma/Path/Name>",
     "figmaVariableId": "<VariableID:x:y>",
     "figmaResolvedValue": "<hex-value>",
     "type": "COLOR|FLOAT|STRING",
     "role": "<semantic-role>",
     "description": "<what this token does>",
     "lastSync": null,
     "lastSyncResult": null
   }
3. Ensure the CSS variable exists in design-library.html :root with a direct hex value
4. Restart auto-sync if running
```
