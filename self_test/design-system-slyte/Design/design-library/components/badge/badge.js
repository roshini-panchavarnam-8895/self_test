/**
 * BADGE COMPONENT — JavaScript
 * Figma Source: Status_Hint (node 2334:2515)
 *
 * Handles interactive behavior for the badge component showcase:
 *   - Tab switching between badge style/type variants
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       BADGE VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       (No -- in class names – uses single-hyphen modifiers)
       ----------------------------------------------------------------------- */
    var BADGE_VARIANTS = {
        statuses: [
            { key: 'active',   label: 'Active',   cls: 'zc-badge-active',   color: '#078841' },
            { key: 'warning',  label: 'Warning',  cls: 'zc-badge-warning',  color: '#D25704' },
            { key: 'error',    label: 'Error',    cls: 'zc-badge-error',    color: '#CC1914' },
            { key: 'inactive', label: 'Inactive', cls: 'zc-badge-inactive', color: '#9EA0A7' }
        ],
        sizes: [
            { key: 'default', label: 'Default', cls: '',            px: '8px' },
            { key: 'sm',      label: 'Small',   cls: 'zc-badge-sm', px: '4px' }
        ]
    };

    window.BADGE_VARIANTS = BADGE_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH BADGE STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchBadgeStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('badge-component-variants');
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
       COPY BADGE CODE
       ----------------------------------------------------------------------- */
    window.copyBadgeCode = function (btn) {
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
    window.toggleBadgeCodePanel = function (btn) {
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
    window.switchBadgeCodeTab = function (tab, tabEl) {
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
