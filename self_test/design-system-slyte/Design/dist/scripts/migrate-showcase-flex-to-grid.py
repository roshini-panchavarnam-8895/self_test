#!/usr/bin/env python3
"""Remove custom flex CSS from *-partial.html and use grid.css utility classes."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMPONENTS = ROOT / "design-library" / "components"

GRID_INLINE_ROW = "zc-flex zc-align-items-center zc-gap-16 zc-row-wrap"
GRID_CELL = "zc-flex zc-align-items-center zc-gap-12"
GRID_COL_4 = "zc-flex zc-direction-column zc-gap-4"
GRID_COL_6 = "zc-flex zc-direction-column zc-gap-6"
GRID_COL_8 = "zc-flex zc-direction-column zc-gap-8"
GRID_COL_12 = "zc-flex zc-direction-column zc-gap-12"
GRID_COL_18 = "zc-flex zc-direction-column zc-gap-18"
GRID_COL_24 = "zc-flex zc-direction-column zc-gap-24"

FLEX_ROW_RE = re.compile(
    r"\s*\.[a-z][a-z0-9-]*-inline-row\s*\{\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*16px;\s*flex-wrap:\s*wrap;\s*\}\s*\n",
    re.I,
)
FLEX_CELL_RE = re.compile(
    r"\s*\.[a-z][a-z0-9-]*-cell\s*\{\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*12px;\s*\}\s*\n",
    re.I,
)
BTN_CELL_RE = re.compile(r"\s*\.btn-cell\s*\{[^}]+\}\s*\n", re.I)
BTN_INLINE_RE = re.compile(r"\s*\.btn-inline-row\s*\{[^}]+\}\s*\n", re.I)

INLINE_STYLE_MAP = [
    (re.compile(r'display:\s*flex;\s*align-items:\s*center;\s*gap:\s*16px;\s*flex-wrap:\s*wrap', re.I), GRID_INLINE_ROW),
    (re.compile(r'display:\s*flex;\s*gap:\s*16px;\s*align-items:\s*center', re.I), GRID_INLINE_ROW),
    (re.compile(r'display:\s*flex;\s*gap:\s*24px;\s*align-items:\s*center', re.I), "zc-flex zc-align-items-center zc-gap-24"),
    (re.compile(r'display:\s*flex;\s*gap:\s*8px;\s*align-items:\s*center', re.I), "zc-flex zc-align-items-center zc-gap-8"),
    (re.compile(r'display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*18px', re.I), GRID_COL_18),
    (re.compile(r'display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*12px', re.I), GRID_COL_12),
    (re.compile(r'display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*8px', re.I), GRID_COL_8),
    (re.compile(r'display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*6px', re.I), GRID_COL_6),
    (re.compile(r'display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*4px', re.I), GRID_COL_4),
    (re.compile(r'display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*24px', re.I), GRID_COL_24),
    (re.compile(r'display:\s*flex;\s*flex-wrap:\s*wrap;\s*gap:\s*24px', re.I), "zc-flex zc-gap-24 zc-row-wrap"),
]

CLASS_SUFFIXES = ("inline-row", "cell")


def migrate_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text

    text = FLEX_ROW_RE.sub("", text)
    text = FLEX_CELL_RE.sub("", text)
    text = BTN_CELL_RE.sub("", text)
    text = BTN_INLINE_RE.sub("", text)

    for suffix in CLASS_SUFFIXES:
        grid = GRID_INLINE_ROW if suffix == "inline-row" else GRID_CELL
        text = re.sub(
            rf'class="[a-z][a-z0-9-]*-{suffix}"',
            f'class="{grid}"',
            text,
        )

    def replace_inline_style(match: re.Match) -> str:
        style = match.group(1)
        classes = []
        rest_parts = []
        for pattern, grid_cls in INLINE_STYLE_MAP:
            if pattern.search(style):
                classes.append(grid_cls)
                style = pattern.sub("", style)
        style = re.sub(r";\s*;", ";", style)
        style = style.strip(" ;")
        if classes:
            cls = " ".join(classes)
            if match.group(0).startswith('style="'):
                if style:
                    return f'class="{cls}" style="{style}"'
                return f'class="{cls}"'
        return match.group(0)

    text = re.sub(r'style="([^"]*)"', replace_inline_style, text)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = []
    for path in sorted(COMPONENTS.glob("*/*-partial.html")):
        if migrate_file(path):
            changed.append(path.relative_to(ROOT))
    print(f"Updated {len(changed)} partial(s)")
    for p in changed:
        print(f"  - {p}")


if __name__ == "__main__":
    main()
