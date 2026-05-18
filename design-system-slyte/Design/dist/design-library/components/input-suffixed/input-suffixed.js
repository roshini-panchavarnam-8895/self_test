/**
 * INPUT SUFFIXED COMPONENT — JavaScript
 * Figma Source: Input_Suffixed (node 3007:320)
 *
 * Handles interactive behavior for the input suffixed component showcase:
 *   - Tab switching between suffix variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 *   - Switch between HTML / SCSS code tabs
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       INPUT SUFFIXED VARIANT CONFIGURATION
       ----------------------------------------------------------------------- */
    var INPUT_SUFFIXED_VARIANTS = {
        types: [
            { key: 'text-suffix',   label: 'Text Suffix',   cls: '' },
            { key: 'icon-suffix',   label: 'Icon Suffix',   cls: 'zc-input-suffix-icon' },
            { key: 'button-suffix', label: 'Button Suffix', cls: 'zc-input-suffix-btn' }
        ],
        states: [
            { key: 'default',  label: 'Default',  cls: '' },
            { key: 'focus',    label: 'Focus',    cls: 'zc-input-affixed-focus' },
            { key: 'error',    label: 'Error',    cls: 'zc-input-affixed-error' },
            { key: 'success',  label: 'Success',  cls: 'zc-input-affixed-success' },
            { key: 'disabled', label: 'Disabled', cls: 'zc-input-affixed-disabled' }
        ],
        sizes: [
            { key: 'sm', label: 'SM (28px)', cls: 'zc-input-affixed-sm' },
            { key: 'md', label: 'MD (36px)', cls: '' },
            { key: 'lg', label: 'LG (44px)', cls: 'zc-input-affixed-lg' }
        ]
    };

    window.INPUT_SUFFIXED_VARIANTS = INPUT_SUFFIXED_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH INPUT SUFFIXED STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchInputSuffixedStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('input-suffixed-component-variants');
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
    window.toggleInputSuffixedCodePanel = function (btn) {
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
       COPY INPUT SUFFIXED CODE
       ----------------------------------------------------------------------- */
    window.copyInputSuffixedCode = function (btn) {
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
    window.switchInputSuffixedCodeTab = function (tab, tabEl) {
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
