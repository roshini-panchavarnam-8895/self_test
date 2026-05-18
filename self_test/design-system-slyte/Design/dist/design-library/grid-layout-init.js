/**
 * Applies grid.css flex utility classes to design-system component DOM.
 * Call initZcGridLayout(root) after each showcase partial is injected (see style.js).
 * Component SCSS must not set display:flex / gap / align-items for layout.
 */
(function () {
    'use strict';

    function addClasses(el, cls) {
        if (!el || !cls) return;
        cls.split(/\s+/).forEach(function (c) {
            if (c && !el.classList.contains(c)) el.classList.add(c);
        });
    }

    /** @type {{ sel: string, cls: string }[]} */
    var RULES = [
        /* Badge */
        { sel: '.zc-badge-count', cls: 'zc-inline-flex zc-align-items-center zc-justify-center' },
        { sel: '.zc-badge-wrapper', cls: 'zc-inline-flex' },
        { sel: '.zc-badge-inline', cls: 'zc-inline-flex zc-align-items-center zc-gap-8' },
        { sel: '.zc-badge', cls: 'zc-no-shrink' },

        /* Toggle */
        { sel: 'lyte-checkbox.zc-toggle, .zc-toggle', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: '.zc-toggle .lyteCheckSwitch', cls: 'zc-inline-flex zc-align-items-center zc-no-shrink' },

        /* Tooltip / Popover demos */
        { sel: '.zc-tooltip-demo', cls: 'zc-inline-flex zc-direction-column zc-align-items-center' },
        { sel: '.zc-popover-demo', cls: 'zc-inline-flex zc-direction-column zc-align-items-center' },
        { sel: '.zc-popover-placement-cell', cls: 'zc-flex zc-direction-column zc-align-items-center zc-gap-8' },

        /* Progress bar */
        { sel: '.zc-progressbar', cls: 'zc-flex zc-direction-column zc-gap-6' },
        { sel: '.zc-progressbar-header', cls: 'zc-flex zc-align-items-center zc-justify-space-between' },

        /* Toast / Alert */
        { sel: '.zc-toast, .lyteBannerNonFloating.zc-toast', cls: 'zc-inline-flex zc-align-items-center zc-gap-10' },
        { sel: '.zc-toast-icon', cls: 'zc-inline-flex zc-align-items-center zc-justify-center zc-no-shrink' },
        { sel: '.zc-toast-message', cls: 'zc-col-common' },
        { sel: '.zc-toast-close', cls: 'zc-inline-flex zc-align-items-center zc-justify-center zc-no-shrink' },
        { sel: '.zc-toast-action-btn', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: '.zc-toast-container', cls: 'zc-flex zc-direction-column zc-gap-8' },

        /* Text / Textarea */
        { sel: '.zc-textarea-field', cls: 'zc-flex zc-direction-column zc-gap-6' },
        { sel: '.zc-textarea-footer', cls: 'zc-flex zc-align-items-center zc-justify-space-between' },

        /* Button — inner <button> is flex container (see button.scss); host aligns in table cells */
        { sel: 'lyte-button.zc-btn', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: 'lyte-button.zc-btn button', cls: 'zc-inline-flex zc-align-items-center zc-justify-center' },
        { sel: 'lyte-button.zc-btn.zc-btn-sm button, lyte-button.zc-btn.zc-btn-xs button', cls: 'zc-gap-6' },
        { sel: 'lyte-button.zc-btn.zc-btn-md button, lyte-button.zc-btn.zc-btn-lg button', cls: 'zc-gap-8' },
        { sel: 'lyte-button.zc-btn .zc-btn-icon', cls: 'zc-inline-flex zc-align-items-center zc-justify-center zc-no-shrink' },

        /* Tabs */
        { sel: '.zc-tabs', cls: 'zc-flex zc-direction-column' },
        { sel: '.zc-tabs-list', cls: 'zc-flex zc-align-items-center' },
        { sel: '.zc-tab', cls: 'zc-inline-flex zc-align-items-center zc-justify-center zc-gap-6 zc-no-shrink' },
        { sel: 'lyte-tabs.zc-tabs lyte-tab-head', cls: 'zc-flex zc-align-items-center' },
        { sel: 'lyte-tabs.zc-tabs lyte-tab-title', cls: 'zc-inline-flex zc-align-items-center zc-justify-center zc-gap-6 zc-no-shrink' },

        /* Radio */
        { sel: '.zc-radio-group', cls: 'zc-flex zc-direction-column zc-gap-10' },
        { sel: '.zc-radio-card', cls: 'zc-flex zc-align-items-start zc-gap-8' },
        { sel: '.zc-radio-card .lyteRadioBtn', cls: 'zc-flex zc-align-items-start zc-gap-8' },
        { sel: '.zc-radio-card-content', cls: 'zc-flex zc-direction-column zc-gap-4' },
        { sel: '.zc-radio-card-group-horizontal', cls: 'zc-flex zc-direction-row zc-gap-12 zc-row-wrap' },
        { sel: '.zc-radio-card-group-vertical', cls: 'zc-flex zc-direction-column zc-gap-12' },

        /* Checkbox */
        { sel: '.zc-checkbox', cls: 'zc-inline-flex zc-align-items-start zc-gap-8' },
        { sel: '.zc-checkbox-box', cls: 'zc-inline-flex zc-align-items-center zc-justify-center zc-no-shrink' },
        { sel: '.zc-checkbox-group', cls: 'zc-flex zc-gap-12' },
        { sel: '.zc-checkbox-checked .zc-checkbox-box i, .zc-checkbox-checked .zc-checkbox-box svg', cls: 'zc-inline-flex' },
        { sel: '.zc-checkbox-indeterminate .zc-checkbox-box i', cls: 'zc-inline-flex' },

        /* Notes */
        { sel: '.zc-note-header', cls: 'zc-flex zc-align-items-center zc-gap-8' },
        { sel: '.zc-note-meta', cls: 'zc-flex zc-align-items-center zc-gap-8' },
        { sel: '.zc-note-actions', cls: 'zc-flex zc-align-items-center zc-gap-4' },
        { sel: '.zc-note-action', cls: 'zc-inline-flex zc-align-items-center zc-justify-center' },

        /* Breadcrumb */
        { sel: 'nav.zc-breadcrumb, .zc-breadcrumb:not(lyte-breadcrumb)', cls: 'zc-flex zc-align-items-center' },
        { sel: '.zc-breadcrumb-list', cls: 'zc-flex zc-align-items-center zc-gap-6 zc-row-wrap' },
        { sel: '.zc-breadcrumb-item', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: '.zc-breadcrumb-item a', cls: 'zc-inline-flex zc-align-items-center zc-gap-6' },
        { sel: '.zc-breadcrumb-separator', cls: 'zc-flex zc-align-items-center' },
        { sel: '.zc-breadcrumb-item i', cls: 'zc-inline-flex zc-align-items-center zc-justify-center' },
        { sel: 'lyte-breadcrumb', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: 'lyte-breadcrumb lyte-breadcrumb-structure.lyteBreadcrumbSlash', cls: 'zc-inline-flex zc-align-items-center zc-gap-6' },
        { sel: 'lyte-breadcrumb lyte-breadcrumb-structure.lyteBreadcrumbArrow', cls: 'zc-inline-flex zc-align-items-center zc-gap-6' },
        { sel: 'lyte-breadcrumb lyte-breadcrumb-structure.zc-breadcrumb-explicit-sep', cls: 'zc-inline-flex zc-align-items-center zc-gap-6' },
        { sel: 'lyte-breadcrumb lyte-breadcrumb-item', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: 'lyte-breadcrumb lyte-breadcrumb-body', cls: 'zc-inline-flex zc-align-items-center zc-gap-6' },
        { sel: '.zc-breadcrumb-trigger-btn', cls: 'zc-inline-flex zc-align-items-center zc-gap-6' },
        { sel: '.zc-breadcrumb-overflow-btn', cls: 'zc-inline-flex zc-align-items-center zc-justify-center' },
        { sel: '.zc-breadcrumb-dropdown-item a', cls: 'zc-flex zc-align-items-center zc-justify-space-between zc-gap-10' },

        /* Input family */
        { sel: '.zc-input-field', cls: 'zc-flex zc-direction-column zc-gap-6' },
        { sel: '.zc-input-affixed.zc-input-prefixed.zc-input-suffixed', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: '.zc-input-prefix, .zc-input-suffix', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: '.zc-input-prefix-icon, .zc-input-suffix-icon', cls: 'zc-inline-flex zc-align-items-center zc-justify-center' },

        /* Tags */
        { sel: '.zc-tag', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: '.zc-tagarea', cls: 'zc-flex zc-align-items-center zc-row-wrap zc-gap-4' },
        { sel: '.zc-tagarea-tags', cls: 'zc-flex zc-align-items-center zc-row-wrap zc-gap-4' },
        { sel: '.zc-tagarea-overflow', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: '.zc-tagarea-dropdown', cls: 'zc-col-common' },

        /* OTP */
        { sel: '.zc-otp-field', cls: 'zc-flex zc-direction-column zc-gap-6' },
        { sel: '.zc-otp-group', cls: 'zc-flex zc-align-items-center zc-gap-10' },

        /* Number */
        { sel: '.zc-number-wrapper', cls: 'zc-flex zc-align-items-center' },
        { sel: '.zc-number-stepper', cls: 'zc-inline-flex zc-direction-column' },
        { sel: '.zc-number-inline .zc-number-step-down, .zc-number-inline .zc-number-step-up', cls: 'zc-col-auto' },

        /* Dropdown / creatable */
        { sel: 'lyte-dropdown lyte-drop-button', cls: 'zc-flex zc-align-items-center' },
        { sel: '.zc-creatable-dropdown .lyteDDHeader', cls: 'zc-flex zc-align-items-center' },
        { sel: '.zc-creatable-dropdown-create-row', cls: 'zc-inline-flex zc-align-items-center zc-gap-6' },

        /* Combobox */
        { sel: '.zc-combobox lyte-combobox', cls: 'zc-flex zc-align-items-center' },
        { sel: '.zc-combobox-input-wrapper', cls: 'zc-flex zc-align-items-center zc-row-wrap zc-gap-4' },
        { sel: '.zc-combobox-tag', cls: 'zc-inline-flex zc-align-items-center zc-gap-4' },
        { sel: '.zc-combobox lyte-drop-item', cls: 'zc-flex zc-align-items-center' },
        { sel: '.zc-combobox-create-option', cls: 'zc-inline-flex zc-align-items-center zc-gap-6' },

        /* Content switcher */
        { sel: '.zc-content-switcher lyte-tab-head', cls: 'zc-inline-flex zc-align-items-stretch' },
        { sel: '.zc-content-switcher lyte-tab-title', cls: 'zc-inline-flex zc-align-items-center zc-justify-center zc-gap-6' },
        { sel: '.zc-content-switcher-button lyte-tab-title', cls: 'zc-inline-flex zc-align-items-center zc-justify-center' },

        /* Popover */
        { sel: '.zc-popover-actions', cls: 'zc-flex zc-justify-end zc-gap-8' },

        /* Avatar navigator */
        { sel: '.zc-nav-avatar', cls: 'zc-inline-flex zc-align-items-center zc-justify-center' },
        { sel: '.zc-nav-avatar-group', cls: 'zc-inline-flex zc-align-items-center' },
        { sel: '.zc-nav-avatar-group-count', cls: 'zc-inline-flex zc-align-items-center zc-justify-center' },

        /* Radio card groups */
        { sel: '.zc-radio-card-group-horizontal', cls: 'zc-flex zc-direction-row zc-gap-12 zc-row-wrap' },
        { sel: '.zc-radio-card-group-vertical', cls: 'zc-flex zc-direction-column zc-gap-12' },
        { sel: '.zc-radio-card-group-horizontal > .zc-radio-card', cls: 'zc-col-common' }
    ];

    var TOAST_POSITION_ALIGN = [
        { sel: '.zc-toast-container.zc-toast-top-right', cls: 'zc-align-items-end' },
        { sel: '.zc-toast-container.zc-toast-bottom-right', cls: 'zc-align-items-end' },
        { sel: '.zc-toast-container.zc-toast-top-center', cls: 'zc-align-items-center' },
        { sel: '.zc-toast-container.zc-toast-bottom-center', cls: 'zc-align-items-center' },
        { sel: '.zc-toast-container.zc-toast-top-left', cls: 'zc-align-items-start' },
        { sel: '.zc-toast-container.zc-toast-bottom-left', cls: 'zc-align-items-start' }
    ];

    function initZcGridLayout(root) {
        root = root || document;

        RULES.forEach(function (rule) {
            try {
                root.querySelectorAll(rule.sel).forEach(function (el) {
                    addClasses(el, rule.cls);
                });
            } catch (e) {
                /* invalid selector in old browsers */
            }
        });

        TOAST_POSITION_ALIGN.forEach(function (rule) {
            root.querySelectorAll(rule.sel).forEach(function (el) {
                addClasses(el, rule.cls);
            });
        });

        root.querySelectorAll('lyte-input.lyteInputBox > div').forEach(function (el) {
            addClasses(el, 'zc-flex zc-align-items-center');
        });

        root.querySelectorAll('lyte-number.lyteInputBox .lyteField').forEach(function (el) {
            addClasses(el, 'zc-flex zc-align-items-center');
        });

        root.querySelectorAll('.zc-input-affixed.zc-input-prefixed.zc-input-suffixed lyte-input > div').forEach(function (el) {
            addClasses(el, 'zc-flex zc-align-items-center');
        });

        root.querySelectorAll('.zc-radio-group-horizontal').forEach(function (el) {
            addClasses(el, 'zc-flex zc-direction-row zc-gap-20');
        });

        root.querySelectorAll('.zc-checkbox-group-vertical').forEach(function (el) {
            addClasses(el, 'zc-flex zc-direction-column zc-gap-12');
        });

        root.querySelectorAll('lyte-tab-title .zc-tab-icon, .zc-tab .zc-tab-icon').forEach(function (el) {
            addClasses(el, 'zc-no-shrink');
        });
    }

    window.initZcGridLayout = initZcGridLayout;
})();
