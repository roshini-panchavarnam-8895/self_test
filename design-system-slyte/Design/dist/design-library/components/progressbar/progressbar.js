/**
 * PROGRESS BAR COMPONENT — JavaScript
 * Figma Source: Progres_Bar_Core_With_Hint (node 2349:18)
 *
 * Handles interactive behavior for the progress bar component showcase:
 *   - Tab switching between progress bar variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       PROGRESSBAR VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       ----------------------------------------------------------------------- */
    var PROGRESSBAR_VARIANTS = {
        sizes: [
            { key: 'default', label: 'Default',   cls: '',                  height: '8px' },
            { key: 'sm',      label: 'Small',      cls: 'zc-progressbar-sm', height: '4px' },
            { key: 'xs',      label: 'Tiny',       cls: 'zc-progressbar-xs', height: '2px' }
        ],
        colors: [
            { key: 'primary', label: 'Primary', cls: '' },
            { key: 'success', label: 'Success', cls: 'zc-progressbar-success' },
            { key: 'warning', label: 'Warning', cls: 'zc-progressbar-warning' },
            { key: 'error',   label: 'Error',   cls: 'zc-progressbar-error' }
        ]
    };

    window.PROGRESSBAR_VARIANTS = PROGRESSBAR_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH PROGRESSBAR STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchProgressbarStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('progressbar-component-variants');
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
       COPY PROGRESSBAR CODE
       ----------------------------------------------------------------------- */
    window.copyProgressbarCode = function (btn) {
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
    window.toggleProgressbarCodePanel = function (btn) {
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
    window.switchProgressbarCodeTab = function (tab, tabEl) {
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
