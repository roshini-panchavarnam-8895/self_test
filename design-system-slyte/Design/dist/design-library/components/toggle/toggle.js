/**
 * TOGGLE COMPONENT — JavaScript
 * Figma Source: Toggle (node 2359:348)
 *
 * Handles interactive behavior for the toggle component showcase:
 *   - Tab switching between toggle variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       SWITCH TOGGLE STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchToggleStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('toggle-component-variants');
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
       TOGGLE TOGGLE CODE PANEL
       ----------------------------------------------------------------------- */
    window.toggleToggleCodePanel = function (btn) {
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
       COPY TOGGLE CODE
       ----------------------------------------------------------------------- */
    window.copyToggleCode = function (btn) {
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
       SWITCH TOGGLE CODE TAB (HTML / SCSS)
       ----------------------------------------------------------------------- */
    window.switchToggleCodeTab = function (tab, tabEl) {
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
