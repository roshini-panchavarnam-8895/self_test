/**
 * CHECKBOX COMPONENT — JavaScript
 * Figma Source: CheckBox_Base (node 2352:2180)
 *
 * Handles interactive behavior for the checkbox component showcase:
 *   - Tab switching between checkbox variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       SWITCH CHECKBOX STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchCheckboxStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('checkbox-component-variants');
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
       TOGGLE CHECKBOX CODE PANEL
       ----------------------------------------------------------------------- */
    window.toggleCheckboxCodePanel = function (btn) {
        var card = btn.closest('.btn-variant-card');
        if (!card) return;
        var cp = card.querySelector('.btn-code-panel');
        if (!cp) return;

        var vis = cp.style.display === 'block';
        cp.style.display = vis ? 'none' : 'block';
        btn.classList.toggle('active', !vis);

        var s = btn.querySelector('span');
        if (s) s.textContent = vis ? 'Show Code' : 'Hide Code';
    };

    /* -----------------------------------------------------------------------
       COPY CHECKBOX CODE
       ----------------------------------------------------------------------- */
    window.copyCheckboxCode = function (btn) {
        var cb = btn.closest('.btn-code-block').querySelector('code');
        if (!cb) return;

        navigator.clipboard.writeText(cb.textContent).then(function () {
            var i = btn.querySelector('i');
            if (i) {
                i.className = 'fas fa-check';
                setTimeout(function () { i.className = 'fas fa-copy'; }, 1500);
            }
        });
    };

    /* -----------------------------------------------------------------------
       SWITCH CHECKBOX CODE TAB (HTML / SCSS)
       ----------------------------------------------------------------------- */
    window.switchCheckboxCodeTab = function (tab, tabEl) {
        var p = tabEl.closest('.btn-code-panel');
        if (!p) return;

        p.querySelectorAll('.btn-code-tab').forEach(function (t) {
            t.classList.remove('active');
        });
        tabEl.classList.add('active');

        p.querySelectorAll('.btn-code-block').forEach(function (b) {
            b.style.display = b.dataset.lang === tab ? 'block' : 'none';
        });
    };

})();
