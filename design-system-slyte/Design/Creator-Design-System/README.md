# Creator Design System

HTML/CSS prototype of the design system extracted from the Figma file
**CTS - AI Test - Ilayavel** via the Figma Dev Mode MCP.

## Structure

```
.
├── index.html            # Single-page design system showcase
├── css/
│   ├── tokens.css        # Design tokens (CSS custom properties)
│   ├── styles.css        # Page chrome (sidebar, layout, cards)
│   └── components.css    # Component styles (avatar, swatch, logo tile)
├── assets/               # SVG/image assets (drop real logos here)
└── README.md
```

## Tokens captured

| Group              | Count | Examples                                                |
|--------------------|------:|---------------------------------------------------------|
| Brand colors       |     3 | `--zoho-brand-blue`, `--zoho-brand-red`, `--zoho-brand-green` |
| Button color families |  8 | Primary, Secondary (Navy), Success (Green), Info (Blue), Warning (Orange), Error (Red), HueGrey, Neutral — each with surface (default/hover/subtle/subtle-hover/low), text (default/hover), border (default/hover/low/low-hover) |
| Semantic palettes  |    11 | Cardinal, Tekhelet, Caribbean, Avocado, Russet, Penred, Mardigrass, Biceblue, Seagreen, Gold, Brown — each with `*-default`, `*-subtle`, `*-text` |
| Neutrals · HueGrey |     7 | Black/White surface, HueGrey Bold/Default/Fairish, Gray Default, Secondary Subtle |
| Text               |     4 | Black, HueGrey Bold/Default/Fairish-Hover               |
| Borders            |     3 | HueGrey Border Minimal/Fairish/Low                      |
| Typography         |    19 | H4 Bold (22/29 · 600), P1 Regular/Semibold/Bold (16/21 · 400/500/600), P2 Regular/Semibold/Bold (14/18 · 400/500/600), P3 Regular/Semibold (12/15 · 400/500), P5 Regular (10/13 · 400), P6 Regular (9/12 · 400) — Zoho Puvi |
| Radius             |     8 | Null = 0, XS = 2, S = 4, R ✦ = 6, RL = 8, L = 10, XL = 14, Full = 999 |
| Elevation          |     4 | Subtle, Base ✦, Default Base ✦, Primary Minimal (focus ring) |

## Patterns captured

Larger composed pieces of the system — built from components.

- **Top Bar** — full app navigation header for Creator (Logo · Workspaces dropdown · Apps grid · Separator · Avatar). 48px tall, deep navy bg (`--primary-surface-bold` `#041644`). Variants for resolutions 1280 / 1366 / 1440 / 1920 / 2560 / 3840.
- **Side Menu** — vertical app navigation sidebar with section titles + grouped menu items. Active item gets primary-subtle bg, primary text, and a left-edge stripe indicator. Click to activate; single-selection per `.ds-sidemenu`.
- **Slider / Drawer** — side panel with header (H6 title + optional action buttons + close), scrollable body, and Save / Cancel footer. Header action variants: none / single Button / two Buttons / large primary CTA. Tall variant for full-height drawers.
- **Promo Banner** — horizontal banner card promoting a feature. Slots: optional left icon · title (P1 Semibold) + description (P2 with inline link) · right action group (CTA + ⋯ overflow). Optional bottom strip with "Current Plan" status tags + ending CTA. Highlighted variant uses primary border + subtle blue background.
- **Modal** — dialog card with header (icon + P1 title + close), body, and footer with primary CTA + Cancel link. 4 type variants (Info / Success / Warning / Alert) — icon background, icon foreground, and CTA button color all match the type. Header action variants (no action / xs button / xs border / sm primary).
- **Page Header** — page-level header with title (H5 / H6 Semibold) + optional description (P2 with inline link) + right-side action group. Standalone (no border) or stacked (multiple rows in a single bordered container with 1px dividers between rows).
- **Form Modal** — modal containing a form (Label + input + Hint + Save/Cancel). Pure composition of `.ds-modal` + `.ds-field` + `.ds-textinput` (or `.ds-dropdown`, `.ds-checkbox`). Demos: single-field, multi-field, and validation/error state.
- **List Row** — repeating row for application / file / item lists. Slots: rep tile · name · status tag (P4 Semibold) · optional description · metric · action button · close ×. Tag color variants (success / info / warning / error / neutral). Stack rows in a single bordered container with auto-dividers between rows. Click × to remove a row.
- **Detail List** — two-line property rows: Title (P3, gray) + Value (P1 Semibold, black) with optional inline status tag, right-side action button, and trailing checkmark icon (`__status--success`). Stack rows in a bordered container with auto-dividers.
- **Status Tags** — bordered pill (`.ds-stag`) used as a status indicator. P4 Semibold uppercase. **13 color palettes** (Success / Info / Warning / Error / Pumpkin / Wine / Mustard / Lawn / Lime / Aqua / Indigo / Lavender / Lilac) × **4 intensity variants** (Subtle / Low / Outline / Solid). Implemented via local CSS custom properties — pick a color modifier and intensity modifier to compose any cell.
- **Accordion** — collapsible content section. Gray header bar with chevron indicator, white body panel below. Caret rotates 180° on expand. Built on native `<details>`/`<summary>` — no JS needed. Includes `.ds-accordion-row` for provider-list bodies (icon + name + description + Add button).
- **Inline Banner** — full-width notification strip with colored top-border accent + status icon + message + Close button. 4 type variants (Info / Success / Warning / Error) — accent border and icon color match the type. Click Close to dismiss (uses shared close handler).
- **Cards** — app/list cards composed of:
  - **Representation tile** (`.ds-rep`) — colored squircle in 3 sizes (32/40/48) and 12 accent colors (Wine / Mustard / Lawn / Aqua / Pumpkin / Lime / Indigo / Lavender / Black / Red / Green / Blue), with Text / Icon / Image content types
  - **Pattern card** (`.ds-pcard`) — 4 card types (Default / Title & Subtext / Metrics / Image-Icon-Value) × 5 states (Default / Hover / Disabled / Unclickable / Initial-Unclickable)
  - Optional footer with chips and More/Edit actions, metric value with up/down delta indicator

## Components captured

- **Buttons** — 4 sizes × 6 styles × **8 color families** (Primary / Secondary / Success / Info / Warning / Error / HueGrey / Neutral) × hover. Real `:hover` interaction. Color families implemented as token swaps via local CSS custom properties on `.ds-btn` — to add a new color, just create a `.ds-btn--<name>` class that overrides the `--btn-*` locals.
- **Content Switcher** — segmented control. Sizes XS / Small / Base / Large × Types Fill / Fill Minimal × Counts 2–6 × States Default / Hover / Active / Hover-on-Active / Disabled. Includes icon-only variant (32×32). Real `:hover` shows hover state.
- **Checkbox** — Bare 14×14 (Base) / 12×12 (Small) box, 10 states (Default / Hover / Checked / Checked Hover / Disabled / Indeterminate / Error / Error Hover / Success / Success Hover). Plus checkbox+label row, horizontal/vertical groups, and full field (Label / Optional / help / Hint Text). Click to toggle.
- **Radio** — Bare 14×14 circle with primary fill + center dot when checked. 8 states. Plus radio+label rows, horizontal/vertical groups, full field, and **Radio Card** variant (large card with title + description). Click to select; siblings sharing `data-radio-group` (or living in the same `.ds-radio-group`) auto-deselect.
- **Field shell (`.ds-field`)** — reusable wrapper for any input: Label, (Optional), help icon, control row, Hint Text. Used by checkbox & dropdown.
- **Input Dropdown** — trigger field (9 states: Default / Hover / Active / Selected / Selected-with-Clear / Multi-Selected / Disabled / Success / Error), floating menu (List / List-with-Search / List-with-CTA / Search-with-Button / No-Results), and list rows (Text / Checkbox / Radio / App-Icon types × Default / Hover / Selected / Hover-on-Selected / Disabled). Real `:hover` shows hover state.
- **Input Creatable Dropdown** — same as Input Dropdown but the open menu always shows a "Create '—input—'" CTA at the bottom. Implemented by composing existing pieces (`.ds-dropdown` + `.ds-dropdown-menu` + `.ds-dropdown-link`).
- **Number Input** — `<input type="number">` with attached +/− stepper buttons. 8 states (Default / Hover / Active / Filled / Disabled / Disabled After / Error / Success). Stepper-only sub-component for controls. Integrates with `.ds-field` for label + hint.
- **Input Optgroup** — Dropdown with grouped sections. Reuses dropdown trigger, menu, and list rows; adds `.ds-optgroup` and `.ds-optgroup-head` (Default / Bold / Subtle types × 14px / 12px sizes × Selectable). Supports per-group "No Data" empty state.
- **Tags** — pill chip used in tag-pickers, multi-select fields, filters, and as status indicators. Sizes Base / Small × Colors (Default / Primary / Success / Error) × Variants (Subtle / Solid / Outline) × optional icon prefix and × close. Includes "+N more" counter. Click × to remove a tag (interactive).
- **Text Input** — single-line text field with optional left + right icon slots. 10 states (Default / Hover / Active / Filled / Hover-on-Filled / Disabled / Disabled After / Error / Error After / Success). Real `:focus-within` lights up the field on keyboard focus. Hint Text supports 6 type modifiers (Default / Info / Success / Warning / Error / Disabled) — colored text + icon.
- **Text Area** — multi-line `<textarea>` with the same 10 states as Text Input. Top-aligned icon, native vertical resize, real focus-within highlighting.
- **Suffixed Input** — text input with a right-side suffix. Two types: **Actionable** (clickable CTA — text only / icon only / text + icon) and **Non-Actionable** (static info label). Plus a "close" pattern (× button at the right). 11 states (adds Hover-on-CTA and Selected to the standard input set).
- **Prefixed Input** — mirror of Suffixed; prefix sits on the LEFT. Same Actionable / Non-Actionable types and 11 states. Adds a right-side action icon system (Search / Dropdown / Close) usable inside the field.
- **Affixed Input** — input with BOTH a left prefix AND a right suffix. Sub-types: Actionable Left (CTA on left), Actionable Right (CTA on right), Non-Actionable (both static labels). Same 11 states. Independent `is-selected-left` / `is-selected-right` classes for tracking which CTA is pressed.
- **Notes** — banner / alert card with header (icon + bold title), body, optional CTA footer. 5 color variants (Default / Info / Warning / Success / Error) with matching icons (i / ! / ✓ / ×). 3 CTA positions (Left / Center / Right).
- **Progress Indicator** — 6px horizontal bar. 6 type variants (Default / Primary / Hard / Success / Warning / Error). Optional X% caption below (P5 typography).
- **Tabs** — underlined text tab navigation (different from the Content Switcher segmented control). 7 states (Default / Hover / Active / Hover-on-Active / Active-Border / Hover-on-Active-Border / Disabled). Variable bottom padding (6/10/12/14/16) and horizontal padding modifiers. Click-to-activate works (single-active per strip).
- **Toast** — compact single-line notification. 4 type variants (Info / Success / Warning / Error) with matching colored icons. Click × to dismiss (removes from DOM via shared close handler).
- **Toggle** — selectable pill / chip with circle indicator + label. Click to toggle on/off. Sizes 14 / 16 / 18 / XS / Small. Radii Full / R / S. Types Fill / Border / Subtle. 6 color states (Primary / Success / Info / Warning / Error / HueGray) when on.
- **Popover** — floating card with arrow tip. 4 positions (Top / Bottom / Left / Right) × 3 alignments (Start / Center / End) × 2 content types (Text / List) × 3 CTA positions × Light + Dark modes. Arrow rotates to the matching edge automatically.
- **Tooltip** — dark floating tip with arrow. Two flavors: compact (`.ds-tooltip`, single-line) and rich (`.ds-tooltip--rich`, with heading + body / list / table). Same position+align system as popover. Dark navy background by default.
- **Avatar (Placeholder_Default)** — 14 colors × 2 inverse states (28 variants total). 36×36, radius 2px.
- **Breadcrumb (Breadcrumb_Base ✦)** — Type Default / With Dropdown × Sizes 2/4/6. Includes:
  - Element states: Enabled / Hover / Current
  - Icon variants: Left / Right / Both / None / Dropdown caret
  - Overflow "…" trigger (Default / Active)
  - Dropdown overlay variants: List / Group (with elevation shadow)
- **Brand logos** — 5 Zoho products (Creator, Analytics, Flow, QEngine, Zia) and 4 third-party (OpenAI, Gemini, Firefly, Zoho). Currently shown as styled placeholders; replace with real SVGs in `assets/`.

## Run locally

Just open `index.html` in a browser. No build step.

```bash
open index.html
# or
python3 -m http.server 8080
```

## Extending

To add more components from the Figma file, point Claude (in Dev Mode MCP) at the additional node IDs and:

1. Pull tokens with `get_variable_defs`
2. Pull structure with `get_design_context`
3. Add new entries to `css/tokens.css`
4. Add new component classes to `css/components.css`
5. Add a new section in `index.html`

## Source

- Figma file: `CTS - AI Test - Ilayavel`
- Key node IDs sampled:
  - `2336:7046` — Brand Elements page
  - `3252:3245` — Placeholder_Default (avatar master)
  - `2463:2`    — Breadcrumbs page
  - `2464:19`   — Breadcrumb_Base ✦
  - `2581:2988` — Breadcrumb_Elements_Text
  - `2463:2629` — Breadcrumb_Elements_Dropdown
  - `2583:3025` — Breadcrumb_Dropdown_Overlay
  - `2132:26906` — Primary_Button
  - `2064:273`   — Button color family page (Secondary / Success / Info / Warning / Error / HueGrey / Neutral)
  - `2630:5644`  — Content Switcher page
  - `2352:2179`  — Input Checkbox page (CheckBox_Base ✦, Input_Checkbox_Core, Input_CheckBox_Combo, Input_Checkbox)
  - `2352:2602`  — Input Radio page (Radio_Base ✦, Radio_Card_Base ✦, Input_Radio_Core, Input_Radio_Combo, Input_Radio)
  - `2149:31431` — Input Dropdown page (Input_Dropdown_Base ✦, Input_Dropdown_Core, Dropdown_Overlay_List, List_Vertical_Core, Dropdown_Input_Type_Search, Dropdown_Bottom_Link, Dropdown_Bottom_Button)
  - `5251:5457`  — Input Creatable Dropdown page
  - `2743:1798`  — Input Number page (Number_Input_Base ✦, Input_Number_Core, Input_Number_Stepper)
  - `2573:6533`  — Input Optgroup page (Input_Optgroup_Base ✦, Input_Optgroup_Core, Dropdown_Overlay_Optgroup, Optgroup_List_With_Head, Optgroup_Head, Optgroup_List, Group_Head_Hint)
  - `2947:9730`  — Tags / Tag Picker page
  - `2352:2606`  — Input Text page (Text_Input_Base ✦, Input_Field_Core, Common_Label, Common_Hint)
  - `2352:2604`  — Input TextArea page (TextArea_Base ✦, Input_Text_Area_Core)
  - `2980:5315`  — Input Suffixed page (Input_Suffixed_Base ✦, Input_Suffixed_Core, Suffixed_CTA_Action, CTA_Close_Icon)
  - `3037:965`   — Input Prefixed page (Input_Preffixed_Base ✦, Input_Preffixed_Core, Preffixed_CTA_Action, Input_Right_Action)
  - `3079:8009`  — Input Affixed page (Input_Affixed_Base ✦, Input_Preffixed_Core, Affixed_Left_CTA_Action, Affixed_Right_CTA_Action)
  - `2379:1845`  — Notes page (Notes_Base ✦, Notes_Core, Notes_CTA_Position)
  - `2349:2`     — Progress Indicator page (Progres_Bar_Core, Progres_Bar_Core_With_Hint)
  - `2294:4392`  — Tabs page (Tab_Default_Base ✦, Tab_Core, Tab_Core_With_State, Tab_Core_Padding_Bottom, Tab_Border)
  - `2255:53185` — Toast page (Toast_Overlay)
  - `2359:348`   — Toggle page (Toggle_Base ✦, Toggle_Core, Toggle_On, Toggle_Off)
  - `3472:8028`  — Popover page (Popover_Base ✦, Popover_Core, Popover_CTA_Position)
  - `2393:3790`  — Tooltip page (Tooltip_Base ✦, Tooltip_Core, Rich_Tooltip_Base ✦, Rich_Tooltip_Core)
  - `9413:361`   — Top Bar pattern (Top Bar(Creator), Workspaces, Zoho_apps_grid_icon, Top Bar_Avatar_group, Top Bar_Rightend_group)
  - `9420:419`   — Cards pattern (Card, Card Content, Representation, Title & Subtext, Footer Group, Bottom Right Group, More, Edit, Solution Label, Description Value)
  - `9420:1161`  — Side Navigation pattern (Sidebar sections, menu items, active state)
  - `9420:5051`  — Slider / Drawer pattern (Slider header, footer, body)
  - `9420:5823`  — Promo Banner pattern (Banner main, status strip, highlighted variant)
  - `9420:6436`  — Modal pattern (Info / Success / Warning / Alert types, header actions, body, footer)
  - `9420:7229`  — Page Header pattern (title H5 / H6, description, action group, stacked rows with dividers)
  - `9420:7574`  — Form Modal pattern (Modal + Field + Text Input composition with validation states)
  - `9420:8272`  — List Row pattern (rep tile, name, status tag, metric, action button, close × — stacked in bordered container)
  - `9420:9606`  — Detail List pattern (Title/Value rows with optional tag, action button, status checkmark)
  - `9420:10038` — Status Tags pattern (13 colors × 4 intensities — Subtle / Low / Outline / Solid)
  - `9420:10329` — Accordion pattern (collapsible header + body, native &lt;details&gt;/&lt;summary&gt;)
  - `9420:10749` — Inline Banner pattern (notification strip with top-border accent — Info / Success / Warning / Error)
