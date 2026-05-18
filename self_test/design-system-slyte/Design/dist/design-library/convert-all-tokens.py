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
  Elevation:
    Primitive:   --zc-elevation-{prop}-{value}
    Semantic:    --zc-elevation-{level}-{variant} (box-shadow shorthand)
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

    # ================================================================
    # 8. ELEVATION TOKENS
    # ================================================================
    figma_src = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'figmatokens.json')
    if os.path.exists(figma_src):
        with open(figma_src) as f:
            raw_text = f.read().strip()
            if not raw_text.startswith('{'):
                raw_text = '{' + raw_text
            # Balance braces
            open_count = raw_text.count('{')
            close_count = raw_text.count('}')
            if open_count > close_count:
                raw_text += '}' * (open_count - close_count)
            elev_data = json.loads(raw_text)

        elevation = elev_data.get('Elevation', {})
        if elevation:
            lines.append('')
            lines.append('    /* =============================================')
            lines.append('       ELEVATION TOKENS')
            lines.append('       ============================================= */')

            primitives = elevation.get('Primitives', {})

            # Build primitive lookup: resolve numeric values
            elev_prim = {}  # path -> numeric value

            for category_name, tokens in primitives.items():
                for tok_name, tok_val in tokens.items():
                    path = "Elevation.Primitives.{}.{}".format(category_name, tok_name)
                    v = tok_val.get('$value', '')
                    tok_type = tok_val.get('$type', '')
                    if tok_type == 'number':
                        elev_prim[path] = v
                    elif tok_type == 'color':
                        if isinstance(v, dict):
                            h = v.get('hex', '')
                            alpha = v.get('alpha', 1)
                            if h and alpha is not None and float(alpha) < 1:
                                a_hex = format(round(float(alpha) * 255), '02X')
                                elev_prim[path] = h + a_hex
                            elif h:
                                elev_prim[path] = h

            # Build internal lookups for X/Y/Blur and Spread (not emitted as CSS vars)
            elev_var_map = {}
            xy_blur = primitives.get('X, Y And Blur', {})
            for tok_name, tok_val in xy_blur.items():
                path = "Elevation.Primitives.X, Y And Blur.{}".format(tok_name)
                elev_var_map[path] = tok_val.get('$value', 0)

            spread = primitives.get('Spread', {})
            for tok_name, tok_val in spread.items():
                path = "Elevation.Primitives.Spread.{}".format(tok_name)
                elev_var_map[path] = tok_val.get('$value', 0)

            # Emit only color primitives as CSS vars
            lines.append('')
            lines.append('    /* Primitive - Color */')
            colors = primitives.get('Color', {})
            elev_color_map = {}
            for tok_name, tok_val in colors.items():
                slug = clean(tok_name)
                # Fix known Figma typo: "sefault" -> "default"
                slug = slug.replace('sefault', 'default')
                v = tok_val.get('$value', {})
                color_val = None
                if isinstance(v, dict):
                    h = v.get('hex', '')
                    alpha = v.get('alpha', 1)
                    if h and alpha is not None and float(alpha) < 1:
                        r = int(h[1:3], 16)
                        g = int(h[3:5], 16)
                        b = int(h[5:7], 16)
                        a = round(float(alpha), 2)
                        color_val = 'rgba({}, {}, {}, {})'.format(r, g, b, a)
                    elif h:
                        color_val = h
                if color_val:
                    var_name = '--zc-elevation-color-{}'.format(slug)
                    lines.append('    {}: {};'.format(var_name, color_val))
                    path = "Elevation.Primitives.Color.{}".format(tok_name)
                    elev_color_map[path] = var_name

            # Semantic elevation levels -> box-shadow shorthand
            semantic = elevation.get('Semantic', {})
            if semantic:
                lines.append('')
                lines.append('    /* Semantic Elevations (box-shadow) */')

                def resolve_elev_ref(ref_str):
                    """Resolve elevation reference to raw numeric value."""
                    inner = ref_str.strip('{}').replace('✦', '').strip()
                    # Check both elev_prim and elev_var_map
                    for lookup in [elev_prim, elev_var_map]:
                        if inner in lookup:
                            return lookup[inner]
                    inner_clean = '.'.join(clean(p) for p in inner.split('.'))
                    for lookup in [elev_prim, elev_var_map]:
                        for lk, lv in lookup.items():
                            lk_clean = '.'.join(clean(p) for p in lk.split('.'))
                            if lk_clean == inner_clean:
                                return lv
                    return None

                def resolve_elev_color(ref_str):
                    """Resolve elevation color reference to CSS var()."""
                    inner = ref_str.strip('{}').replace('✦', '').strip()
                    if inner in elev_color_map:
                        return 'var({})'.format(elev_color_map[inner])
                    inner_clean = '.'.join(clean(p) for p in inner.split('.'))
                    for lk, lv in elev_color_map.items():
                        lk_clean = '.'.join(clean(p) for p in lk.split('.'))
                        if lk_clean == inner_clean:
                            return 'var({})'.format(lv)
                    return None

                color_variants = ['default', 'primary', 'info', 'success', 'warning', 'error']

                for level_name, level_data in semantic.items():
                    level_slug = clean(level_name.replace('Elevation_', '').replace('Elevation', ''))
                    if not level_slug:
                        level_slug = clean(level_name)

                    lines.append('')
                    lines.append('    /* --- Elevation_{} --- */'.format(level_slug.capitalize()))

                    # Resolve x, y, blur, spread values
                    x_ref = level_data.get('x', {}).get('$value', '0')
                    y_ref = level_data.get('y', {}).get('$value', '0')
                    blur_ref = level_data.get('blur', {}).get('$value', '0')
                    spread_ref = level_data.get('spread', {}).get('$value', '0')

                    x_val = resolve_elev_ref(x_ref) if isinstance(x_ref, str) and x_ref.startswith('{') else x_ref
                    y_val = resolve_elev_ref(y_ref) if isinstance(y_ref, str) and y_ref.startswith('{') else y_ref
                    blur_val = resolve_elev_ref(blur_ref) if isinstance(blur_ref, str) and blur_ref.startswith('{') else blur_ref
                    spread_val = resolve_elev_ref(spread_ref) if isinstance(spread_ref, str) and spread_ref.startswith('{') else spread_ref

                    for variant in color_variants:
                        color_token = level_data.get(variant, {})
                        if not color_token:
                            continue
                        color_ref = color_token.get('$value', '')
                        color_css = resolve_elev_color(color_ref) if isinstance(color_ref, str) and color_ref.startswith('{') else color_ref

                        if color_css:
                            var_name = '--zc-elevation-{}-{}'.format(level_slug, variant)
                            shadow = '{}px {}px {}px {}px {}'.format(
                                x_val, y_val, blur_val, spread_val, color_css
                            )
                            lines.append('    {}: {};'.format(var_name, shadow))

    lines.append('}')

    # Write output
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), '_color-tokens.scss')
    with open(out, 'w') as f:
        f.write('\n'.join(lines) + '\n')

    var_count = sum(1 for l in lines if l.strip().startswith('--zc-'))
    print('Generated _color-tokens.scss with {} CSS custom properties'.format(var_count))

if __name__ == '__main__':
    main()
