/**
 * POPOVER COMPONENT — JavaScript
 * Figma Source: Popover_Base (node 3472:8029)
 *
 * Handles interactive behavior for the popover component showcase:
 *   - Tab switching between popover variant groups
 *   - Code snippet toggling (HTML / SCSS views)
 *   - Copy-to-clipboard for code blocks
 */

(function () {
    'use strict';

    /* -----------------------------------------------------------------------
       POPOVER VARIANT CONFIGURATION
       Maps Figma variant properties to CSS class combinations
       12 variants: Position (Top/Bottom/Left/Right) × Alignment (Start/Center/End)
       ----------------------------------------------------------------------- */
    var POPOVER_VARIANTS = {
        positions: [
            { key: 'top',    label: 'Top',    cls: 'zc-popover-top' },
            { key: 'bottom', label: 'Bottom', cls: 'zc-popover-bottom' },
            { key: 'left',   l            { key: 'left',   l            { key: 'left',   l            { key: 'left',   l            { key: 'le}
        ],
        alignments: [
                                                s: 'zc-popover-align-start' },
            { key: 'center', label: 'Center', cls: 'zc-popover-align-center' },
            { key: 'end',    label: 'End',    cls: 'zc-popover-align-end' }
        ]
    };

    window.POPOVER_VARIANTS = POPOVER_VARIANTS;

    /* -----------------------------------------------------------------------
       SWITCH POPOVER STYLE TAB
       ----------------------------------------------------------------------- */
    window.switchPopoverStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('popover-component-variants');
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
       COPY POPOVER CODE
       ----------------------------------------------------------------------- */
    window.copyPopoverCode = function (btn) {
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

    /* -------------    /* -------------    /* -------------    /* -------------    /* -------------  OD    /* -------------    /* -------------    /* -----    /* -------------    /* -------------    ndow.togglePopoverCodePanel = function (btn) {
        var card = btn.closest('.btn-        var card = btn.closest('.btn-  rn;
        var codeP        vad. uerySel        var codeP        vad. uerySel        var codeP        vad. uerySel   bl        var codeP      pl        var codeP        vad. uerySel        var codeP        vad. uerySel  k';
                                              bl                                              bl                           ext                       Show Code' : 'Hide Code';
    };

    /* -----------------------------------------------------------------------
       SWITCH POPOVER CODE TAB (HTML / SCSS)
       ----------------------------------------------------------------------- */
    window.switchPopoverCodeTab = function (tab, tabEl) {
        var panel = tabEl.closest('.btn-code-panel');
        if (!panel) return;

        panel.querySelectorAll('.btn-code-tab').forEach(function (t) {
            t.classList.remove('active');
        });
        tabEl.classList.add('active');

        panel.querySelectorA        panel.querySelectorA        panel.querySelectorA        panel.querySelay = block.dataset.lang === tab ? 'block' : 'none';
        });
    };

})();
