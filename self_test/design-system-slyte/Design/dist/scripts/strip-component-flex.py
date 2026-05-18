#!/usr/bin/env python3
"""Remove layout flex properties from component SCSS/CSS (grid.css handles layout)."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMPONENTS = ROOT / "design-library" / "components"

# Whole-line properties to strip (layout only)
LINE_PATTERNS = [
    re.compile(r"^\s*display:\s*inline-flex(\s*!important)?;\s*$", re.I),
    re.compile(r"^\s*display:\s*flex(\s*!important)?;\s*$", re.I),
    re.compile(r"^\s*align-items:\s*[^;]+;\s*$", re.I),
    re.compile(r"^\s*justify-content:\s*[^;]+;\s*$", re.I),
    re.compile(r"^\s*flex-direction:\s*[^;]+;\s*$", re.I),
    re.compile(r"^\s*flex-wrap:\s*[^;]+;\s*$", re.I),
    re.compile(r"^\s*flex-shrink:\s*0(\s*!important)?;\s*$", re.I),
    re.compile(r"^\s*flex:\s*1(\s*!important)?;\s*$", re.I),
    re.compile(r"^\s*gap:\s*\d+px(\s*!important)?;\s*$", re.I),
    re.compile(r"^\s*gap:\s*0(\s*!important)?;\s*$", re.I),
]

SKIP_FILES = {"button.scss", "button.css", "avatar.scss", "avatar.css"}


def strip_file(path: Path) -> bool:
    if path.name in SKIP_FILES:
        return False
    lines = path.read_text(encoding="utf-8").splitlines(keepends=True)
    out = []
    changed = False
    for line in lines:
        stripped = line
        for pat in LINE_PATTERNS:
            if pat.match(line.rstrip("\n")):
                stripped = None
                changed = True
                break
        if stripped is not None:
            out.append(stripped)
    if not changed:
        return False
    text = "".join(out)
    if "grid.css" not in text and path.suffix in {".scss", ".css"}:
        header = "/* Layout: grid.css utilities via initZcGridLayout() */\n"
        if not text.lstrip().startswith("/*"):
            text = header + text
    path.write_text(text, encoding="utf-8")
    return True


def main() -> None:
    updated = []
    for ext in ("*.scss", "*.css"):
        for path in sorted(COMPONENTS.glob(f"*/{ext}")):
            if strip_file(path):
                updated.append(path.relative_to(ROOT))
    print(f"Stripped flex from {len(updated)} file(s)")
    for p in updated:
        print(f"  {p}")


if __name__ == "__main__":
    main()
