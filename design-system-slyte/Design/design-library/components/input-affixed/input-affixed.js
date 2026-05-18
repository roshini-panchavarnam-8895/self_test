/**
 * INPUT AFFIXED COMPONENT — JavaScript
 * Figma Source: Input_Affixed (node 3079:8161)
 *
 * Handles interactive behavior for the input affixed component showcase:
 *   - Tab switching between affixed variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 *   - Switch between HTML / SCSS code tabs
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       INPUT AFFIXED VARIANT CONFIGURATION
       ----------------------------------------------------------------------- */
    var INPUT_AFFIXED_VARIANTS = {
        types: [
            { key: 'text-text',        label: 'Text + Text',        cls: '' },
            { key: 'icon-text',        label: 'Icon + Text',        cls: 'zc-input-prefix-icon' },
            { key: 'icon-icon',        label: 'Icon + Icon',        cls: 'zc-input-prefix-icon zc-input-suffix-icon' },
            { key: 'dropdown-button',  label: 'Dropdown + Button',  cls: 'zc-input-prefix-dropdown zc-input-suffix-btn' }
        ],
        states: [
            { key: 'default',  label: 'Default',  cls: '' },
            { key: 'focus',    label: 'Focus',    cls: 'zc-input-affixed-focus' },
            { key: 'error',    label: 'Error',    cls: 'zc-input-affixed-error' },
            { key: 'success',  label: 'Success',  cls: 'zc-input-affixed-success' },
            { key: 'disabled', label: 'Disabled', cls: 'zc-input-affixed-disabled' }
        ]
    };

    window.INPUT_AFFIXED_VARIANTS = INPUT_AFFIXED_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH INPUT AFFIXED STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchInputAffixedStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('input-affixed-component-variants');
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
    window.toggleInputAffixedCodePanel = function (btn) {
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
       COPY INPUT AFFIXED CODE
       ----------------------------------------------------------------------- */
    window.copyInputAffixedCode = function (btn) {
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
    window.switchInputAffixedCodeTab = function (tab, tabEl) {
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
