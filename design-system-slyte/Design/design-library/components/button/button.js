/**
 * PRIMARY BUTTON COMPONENT — JavaScript
 * Figma Source: Primary_Button (node 2132:26906)
 * 
 * Handles interactive behavior for the button component showcase:
 *   - Tab switching between button style/type variants
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       BUTTON VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       (No -- in class names – uses single-hyphen modifiers)
       ----------------------------------------------------------------------- */
    var BUTTON_VARIANTS = {
        styles: [
            { key: 'fill',            label: 'Fill',            cls: 'zc-btn-fill' },
            { key: 'border',          label: 'Border',          cls: 'zc-btn-border' },
            { key: 'minimal-border',  label: 'Minimal Border',  cls: 'zc-btn-minimal-border' },
            { key: 'minimal-fill',    label: 'Minimal Fill',    cls: 'zc-btn-minimal-fill' },
            { key: 'link',            label: 'Link',            cls: 'zc-btn-link' },
            { key: 'hyperlink',       label: 'Hyperlink',       cls: 'zc-btn-hyperlink' }
        ],
        sizes: [
            { key: 'lg', label: 'Large',       cls: 'zc-btn-lg', height: '40px' },
            { key: 'md', label: 'Base',        cls: 'zc-btn-md', height: '36px' },
            { key: 'sm', label: 'Small',       cls: 'zc-btn-sm', height: '32px' },
            { key: 'xs', label: 'Extra Small', cls: 'zc-btn-xs', height: '26px' }
        ],
        types: [
            { key: 'icon-only',  label: 'Icon Button',     cls: 'zc-btn-icon-only' },
            { key: 'duo-icon',   label: 'Duo Icon Button', cls: 'zc-btn-duo-icon' },
            { key: 'split',      label: 'Split Button',    cls: 'zc-btn-split' },
            { key: 'duo-combo',  label: 'Duo Combo Button',cls: 'zc-btn-duo-combo' }
        ]
    };

    window.BUTTON_VARIANTS = BUTTON_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH BUTTON STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchButtonStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('btn-component-variants');
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
       COPY BUTTON CODE
       ----------------------------------------------------------------------- */
    window.copyBtnCode = function (btn) {
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
    window.toggleBtnCodePanel = function (btn) {
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
    window.switchBtnCodeTab = function (tab, tabEl) {
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
