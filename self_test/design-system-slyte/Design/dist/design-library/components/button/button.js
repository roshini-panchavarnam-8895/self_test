/**
 * PRIMARY BUTTON COMPONENT — JavaScript
 * Figma: hnKVGoVxd2CN6RTqIKGM4e — Primary_Button (2132:26906), Primary_Duo_Button (2136:30087)
 */

(function () {
    'use strict';

    var GRID_FLEX_CENTER = 'zc-inline-flex zc-align-items-center zc-justify-center';
    var GAP_MD = 'zc-gap-8';
    var GAP_SM = 'zc-gap-6';

    var BUTTON_VARIANTS = {
        styles: [
            { key: 'fill',            label: 'Fill',            cls: 'zc-btn-fill' },
            { key: 'border',          label: 'Border',          cls: 'zc-btn-border' },
            { key: 'minimal-border',  label: 'Minimal Border',  cls: 'zc-btn-minimal-border' },
            { key: 'minimal-fill',    label: 'Minimal Fill',    cls: 'zc-btn-minimal-fill' },
            { key: 'link',            label: 'Link',            cls: 'zc-btn-link' },
            { key: 'hyperlink',       label: 'Hyperlink',       cls: 'zc-btn-hyperlink' }
        ],
        sizes: [
            { key: 'lg', label: 'Large',       cls: 'zc-btn-lg', height: '40px' },
            { key: 'md', label: 'Base',        cls: 'zc-btn-md', height: '36px' },
            { key: 'sm', label: 'Small',       cls: 'zc-btn-sm', height: '32px' },
            { key: 'xs', label: 'Extra Small', cls: 'zc-btn-xs', height: '26px' }
        ],
        types: [
            { key: 'icon-only',  label: 'Icon Button',     cls: 'zc-btn-icon-only' },
            { key: 'duo-icon',   label: 'Button with Icons', cls: 'zc-btn-duo-icon' },
            { key: 'duo-icon-only', label: 'Duo Icon Button', cls: 'zc-btn-duo-icon-only' },
            { key: 'split',      label: 'Split Button',    cls: 'zc-btn-split' },
            { key: 'duo-combo',  label: 'Duo Combo Button',cls: 'zc-btn-duo-combo' }
        ]
    };

    window.BUTTON_VARIANTS = BUTTON_VARIANTS;

    function buttonGapClass(el) {
        return (el.classList.contains('zc-btn-sm') || el.classList.contains('zc-btn-xs')) ? GAP_SM : GAP_MD;
    }

    function wrapBareTextNodes(parent) {
        Array.prototype.slice.call(parent.childNodes).forEach(function (node) {
            if (node.nodeType === 3 && node.textContent.trim()) {
                var label = document.createElement('span');
                label.className = 'zc-btn-label';
                label.textContent = node.textContent;
                parent.replaceChild(label, node);
            }
        });
    }

    function initZcButtons(root) {
        root = root || document;

        root.querySelectorAll('lyte-button.zc-btn').forEach(function (el) {
            el.classList.add('zc-inline-flex');
            var gap = buttonGapClass(el);
            var layout = (el.classList.contains('zc-btn-icon-only') || el.classList.contains('zc-btn-duo-icon-only'))
                ? GRID_FLEX_CENTER + ' zc-gap-0'
                : GRID_FLEX_CENTER + ' ' + gap;
            el.setAttribute('lt-prop-class', layout);

            var innerBtn = el.querySelector('button');
            if (innerBtn) {
                innerBtn.classList.add('zc-inline-flex', 'zc-align-items-center', 'zc-justify-center');
                innerBtn.classList.add(gap === GAP_SM ? 'zc-gap-6' : 'zc-gap-8');
            }

            var y = el.querySelector('lyte-yield');
            if (!y) return;

            if (y.querySelector('.zc-btn-icon') && !y.querySelector('.zc-btn-content')) {
                var content = document.createElement('span');
                content.className = 'zc-btn-content';
                while (y.firstChild) content.appendChild(y.firstChild);
                y.appendChild(content);
            }

            wrapBareTextNodes(y.querySelector('.zc-btn-content') || y);
        });

        root.querySelectorAll('.zc-btn-split').forEach(function (el) {
            el.classList.add('zc-inline-flex', 'zc-align-items-stretch', 'zc-gap-0');
        });
        root.querySelectorAll('.zc-btn-duo-combo').forEach(function (el) {
            el.classList.add('zc-inline-flex', 'zc-align-items-stretch', 'zc-gap-0');
        });
        root.querySelectorAll('.zc-btn-duo-group').forEach(function (el) {
            el.classList.add('zc-flex', 'zc-align-items-center', 'zc-gap-10');
        });
    }

    window.initZcButtons = initZcButtons;

    window.switchButtonStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('btn-component-variants');
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

    window.copyBtnCode = function (btn) {
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

    window.toggleBtnCodePanel = function (btn) {
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

    window.switchBtnCodeTab = function (tab, tabEl) {
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
