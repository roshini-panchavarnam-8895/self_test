(function () {
    'use strict';
    window.switchContentSwitcherStyleTab = function (styleKey, tabEl) {
        var container = document.getElementById('content-switcher-component-variants');
        if (!container) return;
        container.closest('.component-detail-view')
            .querySelectorAll('.btn-style-tab').forEach(function (t) { t.classList.remove('active'); });
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
    window.toggleContentSwitcherCodePanel = function (btn) {
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
    window.copyContentSwitcherCode = function (btn) {
        var codeBlock = btn.closest('.btn-code-block').querySelector('code');
        if (!codeBlock) return;
        navigator.clipboard.writeText(codeBlock.textContent).then(function () {
            var icon = btn.querySelector('i');
            if (icon) { icon.className = 'fas fa-check'; setTimeout(function () { icon.className = 'fas fa-copy'; }, 1500); }
        });
    };
    window.switchContentSwitcherCodeTab = function (tab, tabEl) {
        var panel = tabEl.closest('.btn-code-panel');
        if (!panel) return;
        panel.querySelectorAll('.btn-code-tab').forEach(function (t) { t.classList.remove('active'); });
        tabEl.classList.add('active');
        panel.querySelectorAll('.btn-code-block').forEach(function (block) {
            block.style.display = block.dataset.lang === tab ? 'block' : 'none';
        });
    };
})();
