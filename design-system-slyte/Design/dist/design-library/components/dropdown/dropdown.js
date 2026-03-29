/**
 * DROPDOWN COMPONENT — JavaScript
 * Figma Source: Input_Dropdown_Core (node 2167:33859)
 * 
 * Handles interactive behavior for the dropdown component showcase:
 *   - Tab switching between dropdown state variants
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       DROPDOWN VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       ----------------------------------------------------------------------- */
    var DROPDOWN_VARIANTS = {
        states: [
            { key: 'default',    label: 'Default',    cls: '' },
            { key: 'disabled',   label: 'Disabled',   cls: 'lyteDropdown-disabled' },
            { key: 'error',      label: 'Error',      cls: 'zc-dropdown-error' },
            { key: 'with-label', label: 'With Label', cls: '' },
            { key: 'creatable',  label: 'Creatable',  cls: 'zc-creatable-dropdown' }
        ]
    };

    window.DROPDOWN_VARIANTS = DROPDOWN_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH DROPDOWN STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchDropdownStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('dropdown-component-variants');
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
       COPY DROPDOWN CODE
       ----------------------------------------------------------------------- */
    window.copyDropdownCode = function (btn) {
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
       TOGGLE CODE PANEL
       ----------------------------------------------------------------------- */
    window.toggleDropdownCodePanel = function (btn) {
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
       SWITCH CODE TAB (HTML / SCSS)
       ----------------------------------------------------------------------- */
    window.switchDropdownCodeTab = function (tab, tabEl) {
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
