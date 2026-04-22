(function () {
    'use strict';

    var BREADCRUMB_VARIANTS = {
        items: [
            { key: '2-items', label: '2 Items' },
            { key: '3-items', label: '3 Items' },
            { key: '4-items', label: '4 Items' },
            { key: '5-items', label: '5 Items' },
            { key: '6-items', label: '6 Items' }
        ],
        sizes: [
            { key: 'sm', label: 'Small',   cls: 'zc-breadcrumb-sm' },
            { key: 'md', label: 'Base',    cls: '' },
            { key: 'lg', label: 'Large',   cls: 'zc-breadcrumb-lg' }
        ]
    };

    window.BREADCRUMB_VARIANTS = BREADCRUMB_VARIANTS;

    window.switchBreadcrumbTab = function (tabKey, tabEl) {
        var container = document.getElementById('breadcrumb-component-variants');
        if (!container) return;

        container.closest('.component-detail-view')
            .querySelectorAll('.btn-style-tab').forEach(function (t) {
                t.classList.remove('active');
            });
        if (tabEl) tabEl.classList.add('active');

        container.querySelectorAll('.btn-variant-group').forEach(function (group) {
            if (group.dataset.style === tabKey) {
                group.style.display = 'block';
                group.style.animation = 'fadeIn 0.3s ease';
            } else {
                group.style.display = 'none';
            }
        });
    };

    window.copyBreadcrumbCode = function (btn) {
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

    window.toggleBreadcrumbCodePanel = function (btn) {
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

    window.switchBreadcrumbCodeTab = function (tab, tabEl) {
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
