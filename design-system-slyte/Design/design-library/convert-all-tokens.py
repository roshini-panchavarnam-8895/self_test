#!/usr/bin/env python3
"""
Convert Figma design tokens JSON to SCSS-optimizable CSS custom properties.

Naming conventions:
  Color:       --zc-color-{group}-{type}-{variant}
  Font Weight: --zc-font-weight-{name}
  Font Size:   --zc-font-size-{number}
  Line Height: --zc-line-height-{number}
  Font Family: --zc-font-family-{name}
  Semantic (H1-H6, P1-P6):
    --zc-{heading}-font-weight-{weight}
    --zc-{heading}-font-size
    --zc-{heading}-line-height
    --zc-{heading}-font-family
  Radius:      --zc-radius-{name}
"""

import json, re, os

def clean(name):
    """Sanitize token key into CSS-friendly lowercase slug."""
    s = name.replace('\u2726', '').replace('&', '-').replace('%', 'pct').replace(' ', '-')
    s = re.sub(r'[^a-zA-Z0-9_-]', '', s)
    s = re.sub(r'-+', '-', s).strip('-').lower()
    return s

def extract_hex(token):
    """Extract hex color from a primitive color token."""
    v = token.get('$value', '')
    if isinstance(v, str):
        return v if v.startswith('#') else None
    if isinstance(v, dict):
        h = v.get('hex', '')
        if h:
            alpha = v.get('alpha', 1)
            if alpha is not None and float(alpha) < 1:
                a_hex = format(round(float(alpha) * 255), '02X')
                return h + a_hex
            return h
    return None

def resolve_ref(ref_str, lookup):
    """Resolve {Path.To.Token} reference to a CSS var name."""
    inner = ref_str.strip('{}').replace('\u2726', '').strip()
    # Direct match
    if inner in lookup:
        return lookup[inner]
    # Try stripping special chars from both sides
    inner_clean = '.'.join(clean(p) for p in inner.split('.'))
    for lk, lv in lookup.items():
        lk_clean = '.'.join(clean(p) for p in lk.split('.'))
        if lk_clean == inner_clean:
            return lv
    return None

def main():
    src = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'color-variables.json')
    with open(src) as f:
        data = json.load(f)

    lines = []
    var_map = {}   # original dotted path -> CSS var name
    val_map = {}   # CSS var name -> raw value

    lines.append(':root{')

    # ================================================================
    # 1. COLOR TOKENS (Semantic - resolved to hex)
    # ================================================================
    lines.append('')
    lines.append('    /* =============================================')
    lines.append('       COLOR TOKENS')
    lines.append('       ============================================= */')

    color = data.get('Color', {})

    # Build primitive color lookup
    prim_colors = {}
    for group_name, tokens in color.get('Primitive', {}).items():
        for tok_name, tok_val in tokens.items():
            path = "Color.Primitive.{}.{}".format(group_name, tok_name)
            h = extract_hex(tok_val)
            if h:
                prim_colors[path] = h

    # Build alias color lookup
    alias_colors = {}
    for group_name, tokens in color.get('Alias', {}).items():
        for tok_name, tok_val in tokens.items():
            path = "Color.Alias.{}.{}".format(group_name, tok_name)
            v = tok_val.get('$value', '')
            if isinstance(v, str) and v.startswith('{'):
                ref = v.strip('{}')
                resolved = prim_colors.get(ref)
                if resolved:
                    alias_colors[path] = resolved

    # Semantic colors -> CSS vars
    semantic_colors = color.get('Semantic', {})
    for group_name, group_data in semantic_colors.items():
        g = clean(group_name)
        lines.append('')
        lines.append('    /* --- {} --- */'.format(group_name))
        if isinstance(group_data, dict):
            for sub_name, sub_data in group_data.items():
                if sub_name.startswith('$'):
                    continue
                if isinstance(sub_data, dict) and '$value' in sub_data:
                    tok_name = clean(sub_name)
                    v = sub_data.get('$value', '')
                    hex_val = None
                    if isinstance(v, str) and v.startswith('{'):
                        ref = v.strip('{}')
                        hex_val = alias_colors.get(ref) or prim_colors.get(ref)
                    elif isinstance(v, str) and v.startswith('#'):
                        hex_val = v
                    else:
                        hex_val = extract_hex(sub_data)
                    if hex_val:
                        var_name = '--zc-color-{}-{}'.format(g, tok_name)
                        lines.append('    {}: {};'.format(var_name, hex_val))
                elif isinstance(sub_data, dict):
                    s = clean(sub_name)
                    for tok_name2, tok_val2 in sub_data.items():
                        if tok_name2.startswith('$'):
                            continue
                        t = clean(tok_name2)
                        v = tok_val2.get('$value', '')
                        hex_val = None
                        if isinstance(v, str) and v.startswith('{'):
                            ref = v.strip('{}')
                            hex_val = alias_colors.get(ref) or prim_colors.get(ref)
                        elif isinstance(v, str) and v.startswith('#'):
                            hex_val = v
                        else:
                            hex_val = extract_hex(tok_val2)
                        if hex_val:
                            var_name = '--zc-color-{}-{}-{}'.format(g, s, t)
                            lines.append('    {}: {};'.format(var_name, hex_val))

    # ================================================================
    # 2. FONT WEIGHT TOKENS
    # ================================================================
    lines.append('')
    lines.append('    /* =============================================')
    lines.append('       FONT WEIGHT TOKENS')
    lines.append('       ============================================= */')

    type_data = data.get('Type', {})
    prim_type = type_data.get('Primitive', {})

    weight_numeric = {
        'Light': '300',
        'Regular': '400',
        'Regular Italic': '400',
        'Medium': '500',
        'Semibold': '600',
        'Semibold Italic': '600',
        'Bold': '700',
    }

    for tok_name, tok_val in prim_type.get('Weight', {}).items():
        raw = tok_val.get('$value', '')
        slug = clean(tok_name)
        # Strip leading 'weight-' or 'weight_' prefix to avoid --zc-font-weight-weight-X
        slug = re.sub(r'^weight[-_]', '', slug)
        numeric = weight_numeric.get(raw, raw)
        var_name = '--zc-font-weight-{}'.format(slug)
        lines.append('    {}: {};'.format(var_name, numeric))
        path = "Type.Primitive.Weight.{}".format(tok_name)
        var_map[path] = var_name
        val_map[var_name] = numeric

    # ================================================================
    # 3. FONT SIZE TOKENS
    # ================================================================
    lines.append('')
    lines.append('    /* =============================================')
    lines.append('       FONT SIZE TOKENS')
    lines.append('       ============================================= */')

    for tok_name, tok_val in prim_type.get('Size', {}).items():
        raw = tok_val.get('$value', '')
        num = str(raw)
        slug = clean(tok_name)
        # Extract just the number for clean naming
        m = re.search(r'(\d+)', slug)
        key = m.group(1) if m else slug
        var_name = '--zc-font-size-{}'.format(key)
        lines.append('    {}: {}px;'.format(var_name, num))
        path = "Type.Primitive.Size.{}".format(tok_name)
        var_map[path] = var_name
        val_map[var_name] = '{}px'.format(num)

    # ================================================================
    # 4. LINE HEIGHT TOKENS
    # ================================================================
    lines.append('')
    lines.append('    /* =============================================')
    lines.append('       LINE HEIGHT TOKENS')
    lines.append('       ============================================= */')

    for tok_name, tok_val in prim_type.get('Line Height', {}).items():
        raw = tok_val.get('$value', '')
        num = str(raw)
        slug = clean(tok_name)
        m = re.search(r'(\d+)', slug)
        key = m.group(1) if m else slug
        var_name = '--zc-line-height-{}'.format(key)
        lines.append('    {}: {}px;'.format(var_name, num))
        path = "Type.Primitive.Line Height.{}".format(tok_name)
        var_map[path] = var_name
        val_map[var_name] = '{}px'.format(num)

    # ================================================================
    # 5. FONT FAMILY TOKENS
    # ================================================================
    lines.append('')
    lines.append('    /* =============================================')
    lines.append('       FONT FAMILY TOKENS')
    lines.append('       ============================================= */')

    for tok_name, tok_val in prim_type.get('Family', {}).items():
        raw = tok_val.get('$value', '')
        slug = clean(tok_name)
        # Strip leading 'family-' prefix to avoid --zc-font-family-family-X
        slug = re.sub(r'^family-', '', slug)
        var_name = '--zc-font-family-{}'.format(slug)
        lines.append('    {}: "{}";'.format(var_name, raw))
        path = "Type.Primitive.Family.{}".format(tok_name)
        var_map[path] = var_name
        val_map[var_name] = '"{}"'.format(raw)

    # ================================================================
    # 6. SEMANTIC TYPOGRAPHY (H1-H6, P1-P6)
    # ================================================================
    lines.append('')
    lines.append('    /* =============================================')
    lines.append('       SEMANTIC TYPOGRAPHY (H1-H6, P1-P6)')
    lines.append('       ============================================= */')

    sem_type = type_data.get('Semantic', {})
    for group_name, headings in sem_type.items():
        for heading_name, props in headings.items():
            h = clean(heading_name)
            lines.append('')
            lines.append('    /* --- {} --- */'.format(heading_name))

            for prop_name, prop_val in props.items():
                raw_ref = prop_val.get('$value', '')
                prop_slug = clean(prop_name)

                if 'family' in prop_slug:
                    ref_var = resolve_ref(raw_ref, var_map) if raw_ref.startswith('{') else None
                    if ref_var:
                        lines.append('    --zc-{}-font-family: var({});'.format(h, ref_var))
                    else:
                        lines.append('    --zc-{}-font-family: "{}";'.format(h, raw_ref))

                elif 'weight' in prop_slug:
                    w = prop_slug.replace('weight-', '').replace('weight', '')
                    if not w:
                        w = 'regular'
                    ref_var = resolve_ref(raw_ref, var_map) if raw_ref.startswith('{') else None
                    if ref_var:
                        lines.append('    --zc-{}-font-weight-{}: var({});'.format(h, w, ref_var))
                    else:
                        numeric = weight_numeric.get(raw_ref, raw_ref)
                        lines.append('    --zc-{}-font-weight-{}: {};'.format(h, w, numeric))

                elif prop_slug == 'size':
                    ref_var = resolve_ref(raw_ref, var_map) if raw_ref.startswith('{') else None
                    if ref_var:
                        lines.append('    --zc-{}-font-size: var({});'.format(h, ref_var))
                    else:
                        lines.append('    --zc-{}-font-size: {}px;'.format(h, raw_ref))

                elif 'lineheight' in prop_slug or 'line-height' in prop_slug:
                    ref_var = resolve_ref(raw_ref, var_map) if raw_ref.startswith('{') else None
                    if ref_var:
                        lines.append('    --zc-{}-line-height: var({});'.format(h, ref_var))
                    else:
                        lines.append('    --zc-{}-line-height: {}px;'.format(h, raw_ref))

    # ================================================================
    # 7. RADIUS TOKENS
    # ================================================================
    lines.append('')
    lines.append('    /* =============================================')
    lines.append('       RADIUS TOKENS')
    lines.append('       ============================================= */')

    radius = data.get('Radius', {})
    radius_prim_map = {}

    lines.append('')
    lines.append('    /* Primitive */')
    for tok_name, tok_val in radius.get('Primitives', {}).items():
        raw = tok_val.get('$value', '')
        slug = clean(tok_name)
        m = re.search(r'(\d+)', slug)
        key = m.group(1) if m else slug
        var_name = '--zc-radius-{}'.format(key)
        lines.append('    {}: {}px;'.format(var_name, raw))
        path = "Radius.Primitives.{}".format(tok_name)
        radius_prim_map[path] = var_name

    lines.append('')
    lines.append('    /* Semantic */')
    for tok_name, tok_val in radius.get('Semantic', {}).items():
        raw_ref = tok_val.get('$value', '')
        slug = clean(tok_name)
        if raw_ref.startswith('{'):
            ref_path = raw_ref.strip('{}')
            ref_var = radius_prim_map.get(ref_path)
            if ref_var:
                lines.append('    --zc-radius-{}: var({});'.format(slug, ref_var))
            else:
                lines.append('    --zc-radius-{}: {};'.format(slug, raw_ref))
        else:
            lines.append('    --zc-radius-{}: {}px;'.format(slug, raw_ref))

    lines.append('}')

    # Write output
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_color-tokens.scss')
    with open(out, 'w') as f:
        f.write('\n'.join(lines) + '\n')

    var_count = sum(1 for l in lines if l.strip().startswith('--zc-'))
    print('Generated _color-tokens.scss with {} CSS custom properties'.format(var_count))

if __name__ == '__main__':
    main()
