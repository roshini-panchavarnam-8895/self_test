/**
 * COMBOBOX COMPONENT — JavaScript
 * Figma Source: Input Creatable Dropdown (5251:5457)
 *
 * Handles interactive behavior for the combobox component showcase:
 *   - Tab switching between combobox variant states
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       COMBOBOX VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       ----------------------------------------------------------------------- */
    var COMBOBOX_VARIANTS = {
        states: [
            { key: 'default',     label: 'Default',      cls: '' },
            { key: 'hover',       label: 'Hover',        cls: 'zc-combobox-hover' },
            { key: 'open',        label: 'Open',         cls: 'zc-combobox-open' },
            { key: 'filled',      label: 'Filled',       cls: 'zc-combobox-filled' },
            { key: 'disabled',    label: 'Disabled',     cls: 'zc-combobox-disabled' },
            { key: 'error',       label: 'Error',        cls: 'zc-combobox-error' },
            { key: 'success',     label: 'Success',      cls: 'zc-combobox-success' }
        ],
        features: [
            { key: 'searchable',  label: 'Searchable',   prop: 'lt-prop-search="true"' },
            { key: 'creatable',   label: 'Creatable',    cls: 'zc-combobox-creatable' },
            { key: 'multiselect', label: 'Multi-Select', cls: 'zc-combobox-multi' }
        ]
    };

    window.COMBOBOX_VARIANTS = COMBOBOX_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH COMBOBOX STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchComboboxStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('combobox-component-variants');
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
    window.toggleComboboxCodePanel = function (btn) {
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
       COPY COMBOBOX CODE
       ----------------------------------------------------------------------- */
    window.copyComboboxCode = function (btn) {
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
    window.switchComboboxCodeTab = function (tab, tabEl) {
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
