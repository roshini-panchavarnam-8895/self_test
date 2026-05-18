/**
 * INPUT PREFIXED COMPONENT — JavaScript
 * Figma Source: Input_Prefixed (node 3037:1040)
 *
 * Handles interactive behavior for the input prefixed component showcase:
 *   - Tab switching between prefix variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 *   - Switch between HTML / SCSS code tabs
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       INPUT PREFIXED VARIANT CONFIGURATION
       ----------------------------------------------------------------------- */
    var INPUT_PREFIXED_VARIANTS = {
        types: [
            { key: 'text-prefix',     label: 'Text Prefix',     cls: '' },
            { key: 'icon-prefix',     label: 'Icon Prefix',     cls: 'zc-input-prefix-icon' },
            { key: 'dropdown-prefix', label: 'Dropdown Prefix', cls: 'zc-input-prefix-dropdown' }
        ],
        states: [
            { key: 'default',  label: 'Default',  cls: '' },
            { key: 'focus',    label: 'Focus',    cls: 'zc-input-affixed-focus' },
            { key: 'error',    label: 'Error',    cls: 'zc-input-affixed-error' },
            { key: 'success',  label: 'Success',  cls: 'zc-input-affixed-success' },
            { key: 'disabled', label: 'Disabled', cls: 'zc-input-affixed-disabled' }
        ],
        sizes: [
            { key: 'sm', label: 'SM (28px)', cls: 'zc-input-affixed-sm' },
            { key: 'md', label: 'MD (36px)', cls: '' },
            { key: 'lg', label: 'LG (44px)', cls: 'zc-input-affixed-lg' }
        ]
    };

    window.INPUT_PREFIXED_VARIANTS = INPUT_PREFIXED_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH INPUT PREFIXED STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchInputPrefixedStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('input-prefixed-component-variants');
        if (!container) return;

        container.closest('.component-detail-view')
            .querySelectorAll('.btn-style-tab').forEach(function (t) {
                t.classList.remove('active');
            });
        if (tabEl) tabEl.classList.add('active');

        container.querySelectorAll('.btn-variant-group').forEach(function (group) {
            if (group.dataset.style === styleKey) {
                group.style.display = 'block';
                group.style.animation = 'fadeIn 0.3s ease';
            } else {
                group.style.display = 'none';
            }
        });
    };

    /* -----------------------------------------------------------------------
       TOGGLE CODE PANEL
       ----------------------------------------------------------------------- */
    window.toggleInputPrefixedCodePanel = function (btn) {
        var card = btn.closest('.btn-variant-card');
        if (!card) return;
        var codePanel = card.querySelector('.btn-code-panel');
        if (!codePanel) return;

        var isVisible = codePanel.style.display === 'block';
        codePanel.style.display = isVisible ? 'none' : 'block';
        btn.classList.toggle('active', !isVisible);

        var span = btn.querySelector('span');
        if (span) span.textContent = isVisible ? 'Show Code' : 'Hide Code';
    };

    /* -----------------------------------------------------------------------
       COPY INPUT PREFIXED CODE
       ----------------------------------------------------------------------- */
    window.copyInputPrefixedCode = function (btn) {
        var codeBlock = btn.closest('.btn-code-block').querySelector('code');
        if (!codeBlock) return;

        navigator.clipboard.writeText(codeBlock.textContent).then(function () {
            var icon = btn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-check';
                setTimeout(function () { icon.className = 'fas fa-copy'; }, 1500);
            }
        });
    };

    /* -----------------------------------------------------------------------
       SWITCH CODE TAB (HTML / SCSS)
       ----------------------------------------------------------------------- */
    window.switchInputPrefixedCodeTab = function (tab, tabEl) {
        var panel = tabEl.closest('.btn-code-panel');
        if (!panel) return;

        panel.querySelectorAll('.btn-code-tab').forEach(function (t) {
            t.classList.remove('active');
        });
        tabEl.classList.add('active');

        panel.querySelectorAll('.btn-code-block').forEach(function (block) {
            block.style.display = block.dataset.lang === tab ? 'block' : 'none';
        });
    };

})();
