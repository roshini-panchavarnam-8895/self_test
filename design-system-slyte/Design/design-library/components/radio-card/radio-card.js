/**
 * RADIO CARD COMPONENT — JavaScript
 * Figma Source: Radio Card (node 2352:2858)
 *
 * Handles interactive behavior for the radio card component showcase:
 *   - Tab switching between radio card style/variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       RADIO CARD VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       ----------------------------------------------------------------------- */
    var RADIO_CARD_VARIANTS = {
        styles: [
            { key: 'default',          label: 'Default',          cls: 'zc-radio-card' },
            { key: 'selected',         label: 'Selected',         cls: 'zc-radio-card-selected' },
            { key: 'with-icon',        label: 'With Icon',        cls: 'zc-radio-card' },
            { key: 'with-description', label: 'With Description', cls: 'zc-radio-card' },
            { key: 'horizontal',       label: 'Horizontal',       cls: 'zc-radio-card-group-horizontal' },
            { key: 'disabled',         label: 'Disabled',         cls: 'zc-radio-card-disabled' }
        ],
        sizes: [
            { key: 'default', label: 'Default', cls: 'zc-radio-card',    padding: '16px' },
            { key: 'sm',      label: 'Small',   cls: 'zc-radio-card-sm', padding: '12px' }
        ]
    };

    window.RADIO_CARD_VARIANTS = RADIO_CARD_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH RADIO CARD STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchRadioCardStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('radio-card-component-variants');
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
       COPY RADIO CARD CODE
       ----------------------------------------------------------------------- */
    window.copyRadioCardCode = function (btn) {
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
    window.toggleRadioCardCodePanel = function (btn) {
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
    window.switchRadioCardCodeTab = function (tab, tabEl) {
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
