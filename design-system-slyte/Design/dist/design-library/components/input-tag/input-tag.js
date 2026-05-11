/**
 * INPUT TAG COMPONENT — JavaScript
 * Figma Source: Input_Tag (node 2947:9730)
 *
 * Handles interactive behavior for the input tag component showcase:
 *   - Tab switching between tag style/type variants
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       INPUT TAG VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       (No -- in class names – uses single-hyphen modifiers)
       ----------------------------------------------------------------------- */
    var INPUT_TAG_VARIANTS = {
        colors: [
            { key: 'primary', label: 'Primary', cls: 'zc-tag-primary' },
            { key: 'success', label: 'Success', cls: 'zc-tag-success' },
            { key: 'warning', label: 'Warning', cls: 'zc-tag-warning' },
            { key: 'error',   label: 'Error',   cls: 'zc-tag-error' },
            { key: 'neutral', label: 'Neutral', cls: 'zc-tag-neutral' }
        ],
        sizes: [
            { key: 'sm', label: 'Small',  cls: 'zc-tag-sm', height: '20px' },
            { key: 'md', label: 'Medium', cls: 'zc-tag-md', height: '24px' },
            { key: 'lg', label: 'Large',  cls: 'zc-tag-lg', height: '28px' }
        ],
        types: [
            { key: 'default',   label: 'Default',   cls: '' },
            { key: 'removable', label: 'Removable', cls: 'zc-tag-removable' },
            { key: 'with-icon', label: 'With Icon', cls: '' }
        ]
    };

    window.INPUT_TAG_VARIANTS = INPUT_TAG_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH INPUT TAG STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchInputTagStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('input-tag-component-variants');
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
       COPY INPUT TAG CODE
       ----------------------------------------------------------------------- */
    window.copyInputTagCode = function (btn) {
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
    window.toggleInputTagCodePanel = function (btn) {
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
    window.switchInputTagCodeTab = function (tab, tabEl) {
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
