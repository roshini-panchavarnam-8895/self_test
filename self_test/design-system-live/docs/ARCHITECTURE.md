# Architecture & Build Pipeline

> **Role**: Documents how the design library is built, how Figma sync works, the dev server setup, and the production architecture roadmap. An agent must understand this to build, serve, sync, and verify the system.

---

## 1. System Overview

```
Source Components          Build Pipeline           Output
─────────────────         ───────────────          ──────
forms/<name>/             _build-design-           design-library.html
  ├── .html                library.js              (86,000+ line SPA)
  ├── .css                    │
  ├── .scss                   │
  └── .js                     │
reports/*.html                │
smooth-icons/                 │
color_variables.css           ▼
_general_variables.scss    Generated SPA with
grid.css                   nav, search, previews,
                           code tabs, token display
```

**Key rule**: `design-library.html` is **generated** — never hand-edit it. Always modify source files and rebuild.

---

## 2. Build Pipeline

### 2.1 Main Build Script

| Script | Command | Purpose |
|--------|---------|---------|
| `_build-design-library.js` | `node _build-design-library.js` | Generates the complete `design-library.html` SPA |

**What it does:**
1. Scans `forms/` for all component folders
2. Reads each component's `.html`, `.css`, `.scss`, `.js` files
3. Uses `_component-scaffold.js` to generate component metadata
4. Formats HTML and CSS with proper indentation for code display
5. Scans `reports/` for report layout HTML files
6. Reads `color_variables.css` and `_general_variables.scss` for token display
7. Reads `smooth-icons/icon-data.js` for the icon catalog
8. Assembles all views: Home, Tokens, Icons, Form Fields, Reports, All Components
9. Writes `design-library.html` as a single self-contained SPA

### 2.2 Pre-Build Scripts

Run these **before** the main build to ensure component quality:

| Script | Command | Purpose |
|--------|---------|---------|
| `_add-variants.js` | `node _add-variants.js` | Ensures every component has default, error, disabled variants |
| `_add-css-variants.js` | `node _add-css-variants.js` | Adds standard CSS rules (.sr-only, error, disabled, etc.) to all component CSS |
| `_add-label-placement.js` | `node _add-label-placement.js` | Wraps component HTML in `<form class="zc-form-table zc-label-left">` with placement tabs |

### 2.3 Post-Build Verification

| Script | Command | Purpose |
|--------|---------|---------|
| `_verify-design-library.js` | `node _verify-design-library.js` | Validates the generated library (checks structure, component presence) |
| `verify-design-library.sh` | `./verify-design-library.sh` | Shell wrapper for the verification script |

### 2.4 Utility Scripts

| Script | Purpose |
|--------|---------|
| `_component-scaffold.js` | Generates component metadata (title, description, variants, properties) from source files |
| `_design-library-server.js` | Development server for previewing the library |

### 2.5 Full Build Sequence

```bash
# 1. Ensure all components have required variants
node _add-variants.js

# 2. Ensure all CSS files have standard rules
node _add-css-variants.js

# 3. Add label placement wrappers
node _add-label-placement.js

# 4. Build the design library
node _build-design-library.js

# 5. Verify the build
node _verify-design-library.js

# 6. Preview
node _design-library-server.js
```

---

## 3. Development Server

| Script | Command | Port | Purpose |
|--------|---------|------|---------|
| `_design-library-server.js` | `node _design-library-server.js` | 8123 | Full-featured dev server |
| Python fallback | `python3 -m http.server 8080` | 8080 | Simple static server from workspace root |

---

## 4. Figma Sync Architecture

### 4.1 Overview

The system provides **two-way sync** between Figma design tokens and CSS custom properties.

```
Figma Desktop App                    Code (design-library.html)
     │                                    │
     │  Desktop Bridge Plugin             │
     │  (running in Figma)                │
     └──── WebSocket ────┐    ┌───── fs.watch
                         │    │
                    ┌────────────┐
                    │ auto-sync  │
                    │   .mjs     │
                    └────────────┘
                         │
                    design-map.json
                  (mapping dictionary)
```

### 4.2 Three Core Files

| File | Path | Role |
|------|------|------|
| `auto-sync.mjs` | `figmasync/auto-sync.mjs` | Engine — polls Figma, watches code, applies changes |
| `design-map.json` | `figmasync/design-map.json` | Dictionary — maps CSS variable ↔ Figma variable |
| Target file | `design-library.html` | Code side — CSS `:root` block with synced tokens |

### 4.3 How It Works

Every 3 seconds, `auto-sync.mjs`:

1. **Reads** all Figma variable values from the Desktop Bridge plugin
2. **Reads** all CSS variable values from the target HTML file's `:root` block
3. **Compares** them using the mapping in `design-map.json`
4. **Applies** changes in either direction:
   - Designer changes color in Figma → script updates the CSS in code
   - Developer changes CSS in code → script updates the Figma variable

### 4.4 Sync Configuration

| Setting | Value |
|---------|-------|
| Figma file | "Live Mode Design Library (Rose)" |
| Figma file key | `gxa4RQDibjzUe7BnyPn221` |
| Collection | CDS Tokens (`VariableCollectionId:5:2`) |
| Mode | Live Mode (`5:0`) |
| WebSocket port | 9224 |
| Code file | `design-library.html` |

### 4.5 Starting Sync

```bash
cd figmasync && node auto-sync.mjs
```

**Prerequisites:**
- Figma Desktop app open with the target file
- Desktop Bridge plugin running in Figma (Plugins → Development → Figma Desktop Bridge)
- Port 9224 available

### 4.6 Adding a New Synced Token

```
COMMAND: map-token <css-var> <figma-variable-name> <figma-variable-id>

1. Open figmasync/design-map.json
2. Add entry under tokens.<category>:
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
3. Ensure the CSS variable uses a direct hex value (not var() reference)
4. Restart auto-sync
```

---

## 5. Design Library SPA Structure

The generated `design-library.html` is a single-page application with these views:

| View | Contents |
|------|----------|
| **Home** | Dashboard cards linking to all sections, system stats |
| **Design Tokens** | Color, typography, spacing, radius token display with live values |
| **Icons** | Tabbed outline/solid icon browser with search and click-to-copy |
| **Form Fields** | Grid of all field components → drill-down detail pages with preview, HTML/CSS/JS source tabs |
| **Reports** | Grid of report layouts → detail pages |
| **All Components** | Unified searchable list of all form fields and reports |
| **Create New Component** | Instructions / scaffolding guide |

### Navigation

- Left sidebar with section links
- Sub-navigation for component categories (pages list within Form Fields, Reports)
- Search across all components
- Breadcrumb navigation on detail pages

---

## 6. Workspace Layout

```
├── AGENT.md                      ← Agent entry point (read first)
├── docs/                         ← Detailed reference docs
│   ├── COMPONENT-SPEC.md
│   ├── TOKENS.md
│   ├── ARCHITECTURE.md           ← YOU ARE HERE
│   └── ICON-SYSTEM.md
├── forms/                        ← Source components (27+ folders)
├── reports/                      ← Report layout HTML
├── smooth-icons/                 ← Icon fonts + data
├── figmasync/                    ← Figma sync engine
├── design-library.html           ← GENERATED output
├── color_variables.css           ← Application color tokens
├── _general_variables.scss       ← SCSS variables
├── grid.css                      ← Layout utilities
├── _build-design-library.js      ← Main build
├── _add-variants.js              ← Variant enforcer
├── _add-css-variants.js          ← CSS standards enforcer
├── _add-label-placement.js       ← Label placement tabs
├── _component-scaffold.js        ← Metadata generator
├── _design-library-server.js     ← Dev server
├── _verify-design-library.js     ← Post-build verifier
├── cbq_design_system/            ← Git-versioned snapshot (separate repo)
├── _archive/                     ← Archived scripts and backups
└── theme_colors_version_1/       ← Legacy theme color sets (9 layouts)
```

### Key relationships

- `forms/` → read by `_build-design-library.js` → produces `design-library.html`
- `color_variables.css` → displayed in Tokens view of the library
- `figmasync/design-map.json` → maps tokens between Figma and `design-library.html` `:root`
- `smooth-icons/icon-data.js` → rendered in Icons view of the library
- `cbq_design_system/` → independent git repo, ~60% overlap with root (not actively synced)

---

## 7. Production Architecture (Roadmap)

The current system is a **local-first build pipeline**. The production roadmap envisions:

### Target Architecture

```
GitHub Monorepo (Source of Truth)
         │
    ┌────┴────────────┐
    │                 │
  Design Tokens    UI Components
    │                 │
    ▼                 ▼
  Style Dictionary  Component Build
    │                 │
    ▼                 ▼
  Multi-platform    Component Packages
  token outputs
    │
    ├── CSS Variables
    ├── JS Tokens
    ├── Mobile Tokens
    └── Figma Tokens → Figma Variables
```

### Production Stack

| Layer | Tool |
|-------|------|
| Monorepo | Turborepo |
| Design Tokens | Style Dictionary |
| Figma Sync | Tokens Studio or Figma REST API |
| Components | Framework-agnostic HTML/CSS (current) |
| Icons | Font-based (ZC Live Outline/Solid) |
| Docs | Generated SPA (current `design-library.html`) |
| CI/CD | GitHub Actions |

### Production Workflow

```
Developer/Designer
       │
       ▼
Update token JSON or component source
       │
       ▼
Pull Request → Review + Label
       │
       ▼
Merge to main
       │
       ▼
GitHub Actions Pipeline
       │
       ├── Build tokens (Style Dictionary)
       ├── Build components
       ├── Deploy documentation
       └── Sync Figma variables (API)
       │
       ▼
Design + Code automatically updated
```

### Key Principle

Tokens are edited in **code first** (GitHub), never directly in Figma. Automation propagates changes to all consumers including Figma.
