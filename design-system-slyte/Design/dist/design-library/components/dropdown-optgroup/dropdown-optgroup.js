/**
 * DROPDOWN OPTGROUP COMPONENT — JavaScript
 * Figma Source: Dropdown Optgroup (node 2573:6623)
 *
 * Handles interactive behavior for the dropdown optgroup component showcase:
 *   - Tab switching between variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       DROPDOWN OPTGROUP VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       ----------------------------------------------------------------------- */
    var DROPDOWN_OPTGROUP_VARIANTS = {
        states: [
            { key: 'default',      label: 'Default',      cls: '' },
            { key: 'with-search',  label: 'With Search',  cls: 'zc-dropdown-optgroup-search' },
            { key: 'multi-select', label: 'Multi-Select', cls: 'zc-dropdown-optgroup-multi' },
            { key: 'disabled',     label: 'Disabled',     cls: 'zc-dropdown-optgroup-disabled' }
        ]
    };

    window.DROPDOWN_OPTGROUP_VARIANTS = DROPDOWN_OPTGROUP_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH DROPDOWN OPTGROUP STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchDropdownOptgroupStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('dropdown-optgroup-component-variants');
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
       COPY DROPDOWN OPTGROUP CODE
       ----------------------------------------------------------------------- */
    window.copyDropdownOptgroupCode = function (btn) {
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
    window.toggleDropdownOptgroupCodePanel = function (btn) {
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
    window.switchDropdownOptgroupCodeTab = function (tab, tabEl) {
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
