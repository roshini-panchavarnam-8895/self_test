/**
 * TABS COMPONENT — JavaScript
 * Figma Source: Tab_Default_Base (node 2299:1928)
 *
 * Handles interactive behavior for the tabs component showcase:
 *   - Tab switching between tab style/variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       TABS VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       ----------------------------------------------------------------------- */
    var TABS_VARIANTS = {
        padding: [
            { key: 'p0',  label: 'P0',  cls: 'zc-tabs-p0',  gap: '0' },
            { key: 'p4',  label: 'P4',  cls: 'zc-tabs-p4',  gap: '4px' },
            { key: 'p8',  label: 'P8',  cls: 'zc-tabs-p8',  gap: '8px' },
            { key: 'p12', label: 'P12', cls: 'zc-tabs-p12', gap: '12px' },
            { key: 'p16', label: 'P16', cls: 'zc-tabs-p16', gap: '16px' }
        ],
        tabCounts: [2, 3, 4, 5, 6],
        styles: [
            { key: 'default',  label: 'Default',  cls: '' },
            { key: 'bordered', label: 'Bordered', cls: 'zc-tabs-bordered' }
        ]
    };

    window.TABS_VARIANTS = TABS_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH TABS STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchTabsStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('tabs-component-variants');
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
       COPY TABS CODE
       ----------------------------------------------------------------------- */
    window.copyTabsCode = function (btn) {
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
    window.toggleTabsCodePanel = function (btn) {
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
    window.switchTabsCodeTab = function (tab, tabEl) {
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
