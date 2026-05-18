/**
 * TOAST / ALERT COMPONENT — JavaScript
 * Figma Source: Toast_Overlay (node 2257:53389)
 *
 * Handles interactive behavior for the toast/alert component showcase:
 *   - Tab switching between alert type variants (Info, Success, Warning, Error, Close, Positions)
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       ALERT VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       ----------------------------------------------------------------------- */
    var ALERT_VARIANTS = {
        types: [
            { key: 'info',    label: 'Info',    cls: 'zc-toast-info',    color: '#0D4EF2' },
            { key: 'success', label: 'Success', cls: 'zc-toast-success', color: '#078841' },
            { key: 'warning', label: 'Warning', cls: 'zc-toast-warning', color: '#D25704' },
            { key: 'error',   label: 'Error',   cls: 'zc-toast-error',   color: '#CC1914' }
        ],
        positions: [
            { key: 'top-right',      label: 'Top Right',      cls: 'zc-toast-top-right' },
            { key: 'top-center',     label: 'Top Center',     cls: 'zc-toast-top-center' },
            { key: 'top-left',       label: 'Top Left',       cls: 'zc-toast-top-left' },
            { key: 'bottom-right',   label: 'Bottom Right',   cls: 'zc-toast-bottom-right' },
            { key: 'bottom-center',  label: 'Bottom Center',  cls: 'zc-toast-bottom-center' },
            { key: 'bottom-left',    label: 'Bottom Left',    cls: 'zc-toast-bottom-left' }
        ]
    };

    window.ALERT_VARIANTS = ALERT_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH ALERT STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchAlertStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('alert-component-variants');
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
       COPY ALERT CODE
       ----------------------------------------------------------------------- */
    window.copyAlertCode = function (btn) {
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
    window.toggleAlertCodePanel = function (btn) {
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
    window.switchAlertCodeTab = function (tab, tabEl) {
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
