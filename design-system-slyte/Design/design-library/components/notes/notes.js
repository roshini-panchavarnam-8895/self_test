/**
 * NOTES COMPONENT — JavaScript
 * Figma Source: Notes (node 2393:3616)
 *
 * Handles interactive behavior for the notes component showcase:
 *   - Tab switching between note variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       NOTES VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       (No -- in class names – uses single-hyphen modifiers)
       ----------------------------------------------------------------------- */
    var NOTES_VARIANTS = {
        styles: [
            { key: 'default',      label: 'Default',      cls: 'zc-note' },
            { key: 'with-author',  label: 'With Author',  cls: 'zc-note' },
            { key: 'with-actions', label: 'With Actions',  cls: 'zc-note' },
            { key: 'colors',       label: 'Colors',        cls: 'zc-note' },
            { key: 'read-only',    label: 'Read-only',     cls: 'zc-note-readonly' }
        ],
        colors: [
            { key: 'default', label: 'Default',  cls: 'zc-note-default' },
            { key: 'info',    label: 'Info',      cls: 'zc-note-info' },
            { key: 'warning', label: 'Warning',   cls: 'zc-note-warning' }
        ]
    };

    window.NOTES_VARIANTS = NOTES_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH NOTES STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchNotesStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('notes-component-variants');
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
       TOGGLE NOTES CODE PANEL
       ----------------------------------------------------------------------- */
    window.toggleNotesCodePanel = function (btn) {
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
       COPY NOTES CODE
       ----------------------------------------------------------------------- */
    window.copyNotesCode = function (btn) {
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
       SWITCH NOTES CODE TAB (HTML / SCSS)
       ----------------------------------------------------------------------- */
    window.switchNotesCodeTab = function (tab, tabEl) {
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
