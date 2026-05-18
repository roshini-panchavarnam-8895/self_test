/**
 * TEXTAREA COMPONENT — JavaScript
 * Figma Source: TextArea_Base (node 2198:46128)
 *
 * Handles interactive behavior for the textarea component showcase:
 *   - Tab switching between textarea state variants
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       TEXTAREA VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       ----------------------------------------------------------------------- */
    var TEXTAREA_VARIANTS = {
        states: [
            { key: 'default',   label: 'Default',      cls: '' },
            { key: 'filled',    label: 'Filled',       cls: '' },
            { key: 'focus',     label: 'Focus',        cls: 'zc-textarea-wrapper-focus' },
            { key: 'disabled',  label: 'Disabled',     cls: 'zc-textarea-wrapper-disabled' },
            { key: 'error',     label: 'Error',        cls: 'zc-textarea-wrapper-error' },
            { key: 'success',   label: 'Success',      cls: 'zc-textarea-wrapper-success' },
            { key: 'resizable', label: 'Resizable',    cls: '' },
            { key: 'counter',   label: 'With Counter', cls: '' }
        ]
    };

    window.TEXTAREA_VARIANTS = TEXTAREA_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH TEXTAREA STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchTextareaStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('textarea-component-variants');
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
       COPY TEXTAREA CODE
       ----------------------------------------------------------------------- */
    window.copyTextareaCode = function (btn) {
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
       TOGGLE TEXTAREA CODE PANEL
       ----------------------------------------------------------------------- */
    window.toggleTextareaCodePanel = function (btn) {
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
       SWITCH TEXTAREA CODE TAB (HTML / SCSS)
       ----------------------------------------------------------------------- */
    window.switchTextareaCodeTab = function (tab, tabEl) {
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
