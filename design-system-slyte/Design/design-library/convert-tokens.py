#!/usr/bin/env python3
import json
import re

with open('color-variables.json', 'r') as f:
    data = json.load(f)

def clean_name(name):
    """Convert token name to valid SCSS variable name."""
    # Remove special chars like ✦
    name = re.sub(r'[✦★●]', '', name).strip()
    # Replace spaces, & with hyphens
    name = name.replace('&', '-').replace(' ', '-')
    # Collapse multiple hyphens
    name = re.sub(r'-+', '-', name)
    # Remove trailing hyphens
    name = name.strip('-')
    return name.lower()

def get_hex(val_obj):
    """Extract hex color from a $value object."""
    if isinstance(val_obj, dict):
        # Direct hex value
        if 'hex' in val_obj:
            return val_obj['hex']
        # Has components - build from hex key inside
        if 'colorSpace' in val_obj and 'hex' in val_obj:
            return val_obj['hex']
        # Reference to another token
        if isinstance(val_obj, str):
            return val_obj
    if isinstance(val_obj, str):
        return val_obj
    return None

def extract_color(token_data):
    """Extract hex color from a token entry."""
    val = token_data.get('$value', None)
    if val is None:
        return None
    if isinstance(val, dict):
        hex_val = val.get('hex', None)
        if hex_val:
            alpha = val.get('alpha', 1)
            if alpha < 1:
                # Convert alpha to 2-digit hex
                alpha_hex = format(int(round(alpha * 255)), '02x')
                return hex_val + alpha_hex
            return hex_val
    if isinstance(val, str):
        return val  # reference
    return None

def is_reference(val):
    """Check if value is a reference to another token."""
    if isinstance(val, str) and val.startswith('{') and val.endswith('}'):
        return True
    return False

def ref_to_scss_var(ref_str):
    """Convert {Color.Primitive.Blue.blue100✦} to $color-primitive-blue-blue100."""
    inner = ref_str.strip('{}')
    parts = inner.split('.')
    cleaned = [clean_name(p) for p in parts]
    return '$' + '-'.join(cleaned)

lines = []

# ============================================================
# PRIMITIVE COLORS
# ============================================================
lines.append('// ============================================================')
lines.append('// PRIMITIVE COLOR TOKENS')
lines.append('// ============================================================\n')

for group_name, group_tokens in data['Color']['Primitive'].items():
    group_clean = clean_name(group_name)
    lines.append(f'// --- {group_name} ---')
    for token_name, token_data in group_tokens.items():
        if not isinstance(token_data, dict) or '$type' not in token_data:
            continue
        var_name = f'$color-primitive-{group_clean}-{clean_name(token_name)}'
        val = token_data.get('$value', None)
        if isinstance(val, str) and is_reference(val):
            lines.append(f'{var_name}: {ref_to_scss_var(val)};')
        else:
            hex_color = extract_color(token_data)
            if hex_color:
                lines.append(f'{var_name}: {hex_color};')
    lines.append('')

# ============================================================
# ALIAS COLORS
# ============================================================
lines.append('// ============================================================')
lines.append('// ALIAS COLOR TOKENS')
lines.append('// ============================================================\n')

for group_name, group_tokens in data['Color']['Alias'].items():
    group_clean = clean_name(group_name)
    lines.append(f'// --- {group_name} ---')
    for token_name, token_data in group_tokens.items():
        if not isinstance(token_data, dict) or '$type' not in token_data:
            continue
        var_name = f'$color-alias-{group_clean}-{clean_name(token_name)}'
        val = token_data.get('$value', None)
        if isinstance(val, str) and is_reference(val):
            lines.append(f'{var_name}: {ref_to_scss_var(val)};')
        else:
            hex_color = extract_color(token_data)
            if hex_color:
                lines.append(f'{var_name}: {hex_color};')
    lines.append('')

# ============================================================
# SEMANTIC COLORS
# ============================================================
lines.append('// ============================================================')
lines.append('// SEMANTIC COLOR TOKENS')
lines.append('// ============================================================\n')

for group_name, group_data in data['Color']['Semantic'].items():
    group_clean = clean_name(group_name)
    lines.append(f'// --- {group_name} ---')
    for token_name, token_data in group_data.items():
        if isinstance(token_data, dict):
            # Could be a direct token (has $type) or a sub-group
            if '$type' in token_data:
                var_name = f'$color-semantic-{group_clean}-{clean_name(token_name)}'
                val = token_data.get('$value', None)
                if isinstance(val, str) and is_reference(val):
                    lines.append(f'{var_name}: {ref_to_scss_var(val)};')
                else:
                    hex_color = extract_color(token_data)
                    if hex_color:
                        lines.append(f'{var_name}: {hex_color};')
            else:
                # Sub-group (e.g., Surface, Border, Text)
                sub_clean = clean_name(token_name)
                for sub_token_name, sub_token_data in token_data.items():
                    if isinstance(sub_token_data, dict) and '$type' in sub_token_data:
                        var_name = f'$color-semantic-{group_clean}-{sub_clean}-{clean_name(sub_token_name)}'
                        val = sub_token_data.get('$value', None)
                        if isinstance(val, str) and is_reference(val):
                            lines.append(f'{var_name}: {ref_to_scss_var(val)};')
                        else:
                            hex_color = extract_color(sub_token_data)
                            if hex_color:
                                lines.append(f'{var_name}: {hex_color};')
    lines.append('')

output = '\n'.join(lines)
with open('_color-tokens.scss', 'w') as f:
    f.write(output)

# Count stats
var_count = output.count('$color-')
print(f'Generated _color-tokens.scss with {var_count} SCSS variables')
