# How the Two-Way Auto-Sync Works

## The Problem

You have the same design tokens (colors, font sizes, border radius) defined in two places — Figma variables and CSS code. When someone changes one, the other gets out of sync.

## The Solution

A background script (`auto-sync.mjs`) that acts as a bridge between both sides.

---

## How it connects

```
Figma Desktop App                    Your Code
     │                                    │
     │  Desktop Bridge Plugin             │
     │  (already running)                 │
     └──── WebSocket ────┐    ┌───── fs.watch
                         │    │
                    ┌────────────┐
                    │ auto-sync  │
                    │  (Node.js) │
                    └────────────┘
                         │
                    design-map.json
                  (knows which Figma
                   variable = which
                   CSS variable)
```

## What it does every 3 seconds

1. **Reads** all Figma variable values live from the plugin
2. **Reads** all CSS variable values from `form-components.html`
3. **Compares** them using the mapping in `design-map.json`
4. If anything is different → **auto-applies** the change to the other side

## Two directions

**Designer changes color in Figma** → Script detects the new value → Updates the CSS in the HTML file automatically

**Developer changes CSS in code** → Script detects the file change → Updates the Figma variable automatically

---

## The 3 files that make it work

| File | Role |
|------|------|
| `design-map.json` | The dictionary — maps `--color-brand` ↔ `Color/Primitive/Primary/Primary100`, etc. |
| `auto-sync.mjs` | The engine — runs in background, polls Figma, watches the HTML file, applies changes |
| `form-components.html` | The code — CSS variables in the `:root` block are the synced tokens |

## To start it

```bash
node auto-sync.mjs
```

Keep it running in a terminal. Changes flow both ways automatically.

## Prerequisites

- Figma Desktop app open with the "Test" file
- Desktop Bridge plugin running in Figma (Plugins → Development → Figma Desktop Bridge)
- Port 9224 available (the script runs a WebSocket server on this port)

## Mapped tokens

### Colors (9)

| CSS Variable | Figma Variable |
|---|---|
| `--color-text` | `Color/Semantic/Text/Label` |
| `--color-placeholder` | `Color/Semantic/Text/Placeholder` |
| `--color-icon` | `Color/Semantic/Text/Tag_Close` |
| `--color-border` | `Color/Semantic/Border/Field_Default` |
| `--color-bg` | `Color/Semantic/Surface/Field_Background` |
| `--color-brand` | `Color/Primitive/Primary/Primary100` |
| `--color-btn-text` | `Color/Primitive/Black&White/White` |
| `--color-hover-bg` | `Color/Semantic/Surface/Tag_Background` |
| `--color-focus-border` | `Color/Semantic/Border/Field_Focused` |
| `--color-checkbox-filled` | `Color/Semantic/Surface/Checkbox_Filled` |

### Typography (2)

| CSS Variable | Figma Variable |
|---|---|
| `--font-size-base` | `Type/Semantic/Label_Size` |
| `--font-size-sub-label` | `Type/Semantic/Placeholder_Size` |

### Radius (1)

| CSS Variable | Figma Variable |
|---|---|
| `--input-border-radius` | `Radius/Semantic/Input_Field` |
