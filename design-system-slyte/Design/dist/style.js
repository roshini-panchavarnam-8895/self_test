/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                      DESIGN SYSTEM - MAIN JAVASCRIPT                         ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  This file handles all interactive functionality for the Design System.      ║
 * ║                                                                              ║
 * ║  SECTIONS:                                                                   ║
 * ║  1. CONFIGURATION - Global variables and product settings                    ║
 * ║  2. TOKEN MANAGEMENT - Load colors from JSON and apply to CSS variables      ║
 * ║  3. MAIN NAVIGATION - Switch between Home, Branding, Components, etc.        ║
 * ║  4. PRODUCT SWITCHER - Switch between Creator, Bookings, QEngine brands      ║
 * ║  5. SECONDARY SIDEBAR - Category expand/collapse and component filtering     ║
 * ║  6. COMPONENT NAVIGATION - Navigate to component detail views                ║
 * ║  7. GLOBAL SEARCH - Filter sidebar based on search query                     ║
 * ║  8. CODE DISPLAY - Toggle and copy code snippets                             ║
 * ║  9. PAGE INFO - Update page title and description                            ║
 * ║  10. INITIALIZATION - App startup                                            ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  LAZY RENDERING: Save component preview HTML before custom elements load.    ║
   ║  This MUST run before the welcome-comp.js chunk loads and defines lyte-ui     ║
   ║  custom elements. Components with registerYield templates don't work when     ║
   ║  placed directly in static HTML - they must be inserted AFTER the custom      ║
   ║  elements are defined so the upgrade process handles yields correctly.        ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */
(function() {
    window._componentPreviewHTML = {};
    // Save innerHTML of all variant-preview divs inside HIDDEN detail views
    // (the buttons view is visible by default and works, so skip it)
    var hiddenViews = document.querySelectorAll('.component-detail-view[style*="display:none"]');
    hiddenViews.forEach(function(view) {
        var viewId = view.id;
        if (!viewId) return;
        var previews = view.querySelectorAll('.variant-preview');
        previews.forEach(function(preview, idx) {
            var key = viewId + '__' + idx;
            preview.setAttribute('data-lazy-key', key);
            window._componentPreviewHTML[key] = preview.innerHTML;
            // Clear to prevent premature custom element initialization
            preview.innerHTML = '';
        });
    });
    // Also save listing-comp-preview elements inside hidden all-listing section
    var listingSection = document.getElementById('section-all-listing');
    if (listingSection) {
        var listingPreviews = listingSection.querySelectorAll('.listing-comp-preview');
        listingPreviews.forEach(function(preview, idx) {
            var key = 'listing__' + idx;
            preview.setAttribute('data-lazy-key', key);
            window._componentPreviewHTML[key] = preview.innerHTML;
            preview.innerHTML = '';
        });
    }
    window._allListingInitialized = false;
})();


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 1: CONFIGURATION                                                     ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Global variables, product definitions, and component data.                   ║
   ║  These are the core settings used throughout the application.                 ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

/**
 * Token file paths for each product
 * Maps product key to its JSON token file
 */
const tokenFiles = {
    creator: 'Creator.tokens.json',
    bookings: 'Bookings.tokens.json',
    qengine: 'QEngine.tokens.json'
};

/**
 * Color family mapping for each product
 * Each product uses a different color scale from the design tokens
 */
const colorScaleMapping = {
    creator: 'Blue',
    bookings: 'Purple',
    qengine: 'Green'
};

/**
 * Product configuration with branding details
 * Used for UI updates when switching products
 */
const products = {
    creator: {
        name: 'Creator',
        logo: 'Creator-logo.jpg'
    },
    bookings: {
        name: 'Bookings',
        logo: 'Bookings-whiteBG.svg'
    },
    qengine: {
        name: 'QEngine',
        logo: 'QEngine-whiteBG.svg'
    }
};

// Currently selected product
let currentProduct = 'creator';

// Sidebar product dropdown state
let sidebarProductDropdownOpen = false;

// Cache for loaded token data
let loadedTokens = {};


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 2: TOKEN MANAGEMENT                                                  ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Functions to load color tokens from JSON files and apply them as             ║
   ║  CSS custom properties. This enables dynamic theming based on product.        ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

/**
 * Load tokens from JSON file
 * Caches the result to avoid multiple fetches
 * 
 * @param {string} productKey - Product identifier (creator, bookings, qengine)
 * @returns {Promise<Object|null>} - Token data or null on error
 */
async function loadTokensFromJSON(productKey) {
    // Return cached tokens if available
    if (loadedTokens[productKey]) {
        return loadedTokens[productKey];
    }
    
    try {
        const response = await fetch(tokenFiles[productKey]);
        const data = await response.json();
        loadedTokens[productKey] = data;
        return data;
    } catch (error) {
        console.error(`Error loading tokens for ${productKey}:`, error);
        return null;
    }
}

/**
 * Extract hex color from token data structure
 * Handles special case where shade 100 has ✦ suffix
 * Handles BluishGrey where parent key has space but child key doesn't
 * 
 * @param {Object} tokenData - Full token data object
 * @param {string} colorName - Color family (Blue, Purple, Green, Bluish Grey)
 * @param {string} shade - Shade number (10-180)
 * @returns {string|null} - Hex color value or null
 */
function getColorFromToken(tokenData, colorName, shade) {
    try {
        // For 'Bluish Grey': parent key is 'Bluish Grey', child key is 'BluishGrey10' (no space)
        const colorKeyBase = colorName === 'Bluish Grey' ? 'BluishGrey' : colorName;
        
        // Only shade 100 has the ✦ suffix in token keys
        const colorKey = shade === '100' ? `${colorKeyBase}${shade} ✦` : `${colorKeyBase}${shade}`;
        const color = tokenData.Color.Primitive[colorName][colorKey];
        return color.$value.hex;
    } catch (error) {
        console.error(`Error getting color ${colorName}${shade}:`, error);
        return null;
    }
}

/**
 * Apply tokens from JSON to CSS custom properties
 * Sets color scale and brand variables on document root
 * 
 * @param {string} productKey - Product identifier
 */
async function applyTokensFromJSON(productKey) {
    const tokens = await loadTokensFromJSON(productKey);
    if (!tokens) {
        console.error('Failed to load tokens for:', productKey);
        return;
    }
    
    const root = document.documentElement;
    const colorName = colorScaleMapping[productKey];
    
    // Apply color scale (shades 10-180)
    const shades = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '110', '120', '130', '140', '150', '160', '170', '180'];
    
    shades.forEach(shade => {
        const hex = getColorFromToken(tokens, colorName, shade);
        if (hex) {
            root.style.setProperty(`--${colorName.toLowerCase()}-${shade}`, hex);
        }
    });
    
    // Apply brand semantic variables
    const primary = getColorFromToken(tokens, colorName, '100');
    const dark = getColorFromToken(tokens, colorName, '110');
    const darker = getColorFromToken(tokens, colorName, '120');
    const light = getColorFromToken(tokens, colorName, '20');
    const lighter = getColorFromToken(tokens, colorName, '10');
    
    if (primary) {
        root.style.setProperty('--brand-primary', primary);
        root.style.setProperty('--zc-color-info-base', primary);
    }
    if (dark) {
        root.style.setProperty('--brand-dark', dark);
        root.style.setProperty('--zc-color-info-base-shade', dark);
    }
    if (light) root.style.setProperty('--brand-light', light);
    if (lighter) root.style.setProperty('--brand-lighter', lighter);
    
    // Apply BluishGrey semantic variables (for secondary buttons)
    const bluishGrey10 = getColorFromToken(tokens, 'Bluish Grey', '10');
    const bluishGrey60 = getColorFromToken(tokens, 'Bluish Grey', '60');
    const bluishGrey150 = getColorFromToken(tokens, 'Bluish Grey', '150');
    
    if (bluishGrey10) root.style.setProperty('--bluish-grey-10', bluishGrey10);
    if (bluishGrey60) root.style.setProperty('--bluish-grey-60', bluishGrey60);
    if (bluishGrey150) root.style.setProperty('--bluish-grey-150', bluishGrey150);
    
    // // Create gradient from loaded colors
    // if (primary && dark && darker) {
    //     const shade130 = getColorFromToken(tokens, colorName, '130');
    //     root.style.setProperty('--brand-gradient', `linear-gradient(135deg, ${dark}, ${primary}, ${shade130 || primary})`);
    //     root.style.setProperty('--brand-gradient-vibrant', `linear-gradient(135deg, ${darker || dark}, ${dark}, ${primary})`);
    // }
    
    console.log(`✓ Applied ${colorName} color tokens for ${productKey}`);
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 3: MAIN NAVIGATION                                                   ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Handles switching between main sections: Home, Branding, Components,         ║
   ║  Patterns, Tokens, and Icons.                                                 ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

/**
 * Switch to a different main section
 * Hides all sections and shows the selected one
 * 
 * Called from HTML: onclick="switchSection('home', this)"
 * 
 * @param {string} sectionName - Section identifier (home, branding, components, etc.)
 * @param {HTMLElement} navElement - The clicked navigation element
 */
function switchSection(sectionName, navElement) {
    if (window.event) window.event.preventDefault();
    
    // Hide all sections
    document.querySelectorAll('.section-container').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById('section-' + sectionName);
    if (targetSection) {
        targetSection.style.display = 'flex';
        targetSection.style.animation = 'fadeInUp 0.4s ease';
    }
    
    // Update active state in sidebar nav
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (navElement) {
        navElement.classList.add('active');
    }

    // Render token table when tokens section is activated
    if (sectionName === 'tokens') {
        switchTokenCategory(_activeTokenCategory || 'color');
    }
    // Lazy-init All Components Listing section on first display
    if (sectionName === 'all-listing' && !window._allListingInitialized) {
        initAllListingSection();
    }
}

/**
 * Initialize the All Components Listing section by restoring lazy-saved
 * component preview HTML. Called once when the section is first displayed.
 * Also validates sync: checks that every component in the Pages sidebar
 * has a corresponding card in the listing, and logs any missing ones.
 */
function initAllListingSection() {
    var listingSection = document.getElementById('section-all-listing');
    if (!listingSection) return;

    // Restore lazy-saved preview content
    listingSection.querySelectorAll('.listing-comp-preview[data-lazy-key]').forEach(function(preview) {
        if (!preview.dataset.lazyRendered) {
            var savedHTML = window._componentPreviewHTML[preview.dataset.lazyKey];
            if (savedHTML) {
                preview.innerHTML = savedHTML;
                preview.dataset.lazyRendered = 'true';
            }
        }
    });

    // ── Sync Validation ────────────────────────────────────────────────
    // Collect component keys from the Pages sidebar (figma-pages-nav)
    var pagesNav = document.getElementById('figma-pages-nav');
    if (pagesNav) {
        var sidebarKeys = [];
        pagesNav.querySelectorAll('[onclick*="selectSubitem"]').forEach(function(el) {
            var m = el.getAttribute('onclick').match(/selectSubitem\(this,\s*'([^']+)'\)/);
            if (m) sidebarKeys.push(m[1]);
        });

        // Collect component names already present in listing cards
        var listingNames = [];
        listingSection.querySelectorAll('.listing-card-name').forEach(function(el) {
            listingNames.push(el.textContent.trim().toLowerCase());
        });

        // Also collect from listing-category-title (custom-built component sections)
        listingSection.querySelectorAll('.listing-category-title').forEach(function(el) {
            listingNames.push(el.textContent.trim().toLowerCase().replace(' component', ''));
        });

        // Map sidebar keys to expected listing names for validation
        var keyToName = {
            'avatar': 'avatar',
            'breadcrumb': 'breadcrumb',
            'buttons': 'button',
            'content-switcher': 'content switcher',
            'checkbox': 'checkbox',
            'dropdown': 'dropdown',
            'number': 'number',
            'dropdown-optgroup': 'dropdown optgroup',
            'input-otp': 'input otp',
            'radiobutton': 'radiobutton',
            'input-tag': 'input tag',
            'input-tagarea': 'input tagarea',
            'input': 'input',
            'text': 'text',
            'input-suffixed': 'input suffixed',
            'input-prefixed': 'input prefixed',
            'input-affixed': 'input affixed',
            'notes': 'notes',
            'progressbar': 'progress',
            'tabs': 'tabs',
            'toast': 'toast',
            'toggle': 'toggle',
            'popover': 'popover',
            'tooltip': 'tooltip'
        };

        var missing = [];
        sidebarKeys.forEach(function(key) {
            var expectedName = keyToName[key] || key.replace(/-/g, ' ');
            var found = listingNames.some(function(name) {
                return name.indexOf(expectedName) !== -1;
            });
            if (!found) {
                missing.push(key);
            }
        });

        if (missing.length > 0) {
            console.warn('[All Listing Sync] These Pages sidebar components are missing from the All Components Listing:', missing);
        } else {
            console.info('[All Listing Sync] ✓ All Pages sidebar components are present in the listing.');
        }
    }

    // Update the total component count in the page description
    var totalCards = listingSection.querySelectorAll('.listing-card').length;
    var pageDesc = listingSection.querySelector('.page-description');
    if (pageDesc) {
        pageDesc.textContent = 'A single-page view of all ' + totalCards + ' UI components rendered live. Browse through Basic, Floating, Form, and Showcase Page components to preview their default appearance.';
    }

    window._allListingInitialized = true;
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 4: PRODUCT SWITCHER                                                  ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Handles switching between products (Creator, Bookings, QEngine).             ║
   ║  Updates theme colors, logo, and brand name throughout the UI.                ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

/**
 * Toggle the sidebar product dropdown visibility
 * 
 * Called from HTML: onclick="toggleSidebarProductDropdown()"
 */
function toggleSidebarProductDropdown() {
    sidebarProductDropdownOpen = !sidebarProductDropdownOpen;
    const dropdown = document.getElementById('sidebar-product-dropdown');
    const arrow = document.getElementById('sidebar-product-arrow');
    
    if (sidebarProductDropdownOpen) {
        dropdown.classList.add('open');
        arrow.classList.add('rotated');
    } else {
        dropdown.classList.remove('open');
        arrow.classList.remove('rotated');
    }
}

/**
 * Select a product and apply its theme
 * Updates colors, logo, and all brand-related UI elements
 * 
 * Called from HTML: onclick="selectProduct('creator')"
 * 
 * @param {string} productKey - Product identifier (creator, bookings, qengine)
 */
function selectProduct(productKey) {
    const product = products[productKey];
    currentProduct = productKey;
    
    // Set theme attribute on root element
    document.documentElement.setAttribute('data-theme', productKey);
    
    // Load and apply colors from JSON tokens
    // Background colors are handled in CSS using var(--brand-gradient) variables
    applyTokensFromJSON(productKey);
    
    // Update brand section in sidebar
    document.getElementById('main-logo').src = product.logo;
    document.getElementById('brand-name').textContent = product.name;
    
    // Update active state in dropdown
    document.querySelectorAll('.sidebar-product-option').forEach(opt => opt.classList.remove('active'));
    const activeOption = document.querySelector(`.sidebar-product-option[data-product="${productKey}"]`);
    if (activeOption) activeOption.classList.add('active');
    
    // Close the dropdown
    const dropdown = document.getElementById('sidebar-product-dropdown');
    const arrow = document.getElementById('sidebar-product-arrow');
    dropdown.classList.remove('open');
    arrow.classList.remove('rotated');
    sidebarProductDropdownOpen = false;
    
    console.log(`✓ Switched to product: ${product.name}`);
}

// Close sidebar dropdown when clicking outside
document.addEventListener('click', function(e) {
    const brandSection = document.querySelector('.brand-section');
    if (brandSection && !brandSection.contains(e.target) && sidebarProductDropdownOpen) {
        toggleSidebarProductDropdown();
    }
});


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 5: SECONDARY SIDEBAR (Categories)                                    ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Manages the component categories in the secondary sidebar.                   ║
   ║  Handles expand/collapse, filtering, and selection states.                    ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

/**
 * Filter components by category
 * Shows/hides component sections based on selected category
 * 
 * Called from HTML: onclick="filterCategory('all', this)"
 * 
 * @param {string} category - Category identifier or 'all'
 * @param {HTMLElement} element - The clicked category element
 */
function filterCategory(category, element) {
    // Reset all category states
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active', 'expanded');
    });
    document.querySelectorAll('.category-subitems').forEach(sub => {
        sub.classList.remove('expanded');
    });
    document.querySelectorAll('.category-subitem').forEach(sub => {
        sub.classList.remove('active');
    });
    document.querySelectorAll('.category-group').forEach(group => {
        group.classList.remove('has-expanded');
    });
    
    // Set clicked element as active
    element.classList.add('active');
    
    // Hide all component detail views
    document.querySelectorAll('.component-detail-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    
    // Show main content area
    const mainContent = document.querySelector('#section-components .content');
    if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.style.display = 'block';
    }
    
    // Filter sections
    const sections = document.querySelectorAll('.component-section');
    if (category === 'all') {
        sections.forEach(section => {
            section.style.display = 'block';
            section.style.animation = 'fadeInUp 0.4s ease';
        });
    } else {
        sections.forEach(section => {
            if (section.dataset.section === category) {
                section.style.display = 'block';
                section.style.animation = 'fadeInUp 0.4s ease';
            } else {
                section.style.display = 'none';
            }
        });
    }
    
    // Update page info
    updatePageInfo(category);
}

/**
 * Toggle category expand/collapse
 * First click expands, second click shows category listing
 * 
 * Called from HTML: onclick="toggleCategory(this, 'actions')"
 * 
 * @param {HTMLElement} element - The clicked category element
 * @param {string} category - Category identifier
 */
function toggleCategory(element, category) {
    if (window.event) window.event.stopPropagation();
    
    const isExpanded = element.classList.contains('expanded');
    const subitems = document.querySelector(`[data-subitems="${category}"]`);
    const parentGroup = element.closest('.category-group');
    
    // Close other expanded categories
    document.querySelectorAll('.category-item').forEach(item => {
        if (item !== element) {
            item.classList.remove('active', 'expanded');
        }
    });
    document.querySelectorAll('.category-subitems').forEach(sub => {
        if (sub !== subitems) sub.classList.remove('expanded');
    });
    document.querySelectorAll('.category-subitem').forEach(sub => {
        sub.classList.remove('active');
    });
    document.querySelectorAll('.category-group').forEach(group => {
        if (group !== parentGroup) group.classList.remove('has-expanded');
    });
    
    // Hide component detail views
    document.querySelectorAll('.component-detail-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    
    // Show main content
    const mainContent = document.querySelector('#section-components .content');
    if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.style.display = 'block';
    }
    
    // Toggle expansion
    if (!isExpanded) {
        element.classList.add('expanded', 'active');
        subitems.classList.add('expanded');
        parentGroup.classList.add('has-expanded');
    } else {
        element.classList.add('active');
    }
    
    // Filter to show only this category
    const sections = document.querySelectorAll('.component-section');
    sections.forEach(section => {
        if (section.dataset.section === category) {
            section.style.display = 'block';
            section.style.animation = 'fadeInUp 0.4s ease';
        } else {
            section.style.display = 'none';
        }
    });
    
    updatePageInfo(category);
}

/**
 * Select a component subitem
 * Navigates to the component detail view
 * 
 * Called from HTML: onclick="selectSubitem(this, 'buttons')"
 * 
 * @param {HTMLElement} element - The clicked subitem element
 * @param {string} componentName - Component identifier
 */
function selectSubitem(element, componentName) {
    if (window.event) window.event.stopPropagation();
    
    // Update active state
    document.querySelectorAll('.category-subitem').forEach(sub => {
        sub.classList.remove('active');
    });
    element.classList.add('active');
    
    // Navigate to component
    navigateToComponent(componentName);
    
    // Add ripple effect
    addRippleEffect(element);
}

/**
 * Simple ripple/scale effect on element click
 * 
 * @param {HTMLElement} element - Element to animate
 */
function addRippleEffect(element) {
    element.style.transform = 'scale(0.98)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 6: COMPONENT NAVIGATION                                              ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Handles navigation to individual component detail views.                     ║
   ║  Shows component-specific content and updates sidebar state.                  ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

/**
 * Set up card-grid mode for a component detail view.
 * Converts the tab-based variant UI into a visual card grid.
 */
function setupCardGridMode(view) {
    if (view.dataset.cardGridReady) return;
    view.classList.add('card-grid-mode');

    var variantGroups = view.querySelectorAll('.btn-variant-group');

    // Add readable labels and click handlers to each variant group
    variantGroups.forEach(function(group) {
        var styleName = group.getAttribute('data-style') || '';
        var displayName = '';
        if (styleName) {
            displayName = styleName.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
        } else {
            var firstTitle = group.querySelector('.btn-variant-card__title');
            if (firstTitle) displayName = firstTitle.textContent.trim();
        }
        group.setAttribute('data-label', displayName);

        // Make cards clickable — exit card-grid mode and show variant detail
        group.style.cursor = 'pointer';
        group.addEventListener('click', function(e) {
            // Don't trigger if clicking a button or interactive element inside
            if (e.target.closest('button, a, input, .btn-variant-card__toggle')) return;

            var styleKey = group.dataset.style;
            // Exit card-grid mode
            view.classList.remove('card-grid-mode');

            // Activate the matching style tab and show only this variant
            if (typeof window.switchButtonStyleTab === 'function') {
                var matchingTab = view.querySelector('.btn-style-tab[onclick*="' + styleKey + '"]');
                window.switchButtonStyleTab(styleKey, matchingTab);
            }

            // Scroll to top of the detail view
            view.scrollTop = 0;
            window.scrollTo(0, 0);
        });
    });

    // Make the variant container a grid
    if (variantGroups.length > 0 && variantGroups[0].parentElement) {
        variantGroups[0].parentElement.classList.add('variant-grid-container');
    }

    // Get component name and count
    var titleEl = view.querySelector('.detail-title');
    var componentName = titleEl ? titleEl.textContent.trim() : 'Component';
    var count = variantGroups.length;

    // Inject card-grid header (back + title + count + search)
    if (!view.querySelector('.card-grid-header')) {
        var header = document.createElement('div');
        header.className = 'card-grid-header';
        header.innerHTML =
            '<div class="card-grid-header-left">' +
                '<button class="card-grid-back" onclick="handleCardGridBack(this)" title="Back to components"><i class="fas fa-arrow-left"></i></button>' +
                '<h2 class="card-grid-title">' + componentName + ' <span class="card-grid-count">(' + count + ')</span></h2>' +
            '</div>' +
            '<input type="text" class="card-grid-search" placeholder="Search variants..." oninput="filterVariantCards(this)">';
        view.insertBefore(header, view.firstChild);
    }

    view.dataset.cardGridReady = 'true';
}

/**
 * Handle the back button in card-grid header.
 * If currently showing a single variant detail, go back to card grid.
 * If already in card-grid mode, go back to the component list.
 */
function handleCardGridBack(btn) {
    var view = btn.closest('.component-detail-view');
    if (!view) return;

    if (view.classList.contains('card-grid-mode')) {
        // Already in grid mode — go back to component list
        closeComponentDetail();
    } else {
        // In detail mode — go back to card grid
        view.classList.add('card-grid-mode');
        // Show all variant groups again
        view.querySelectorAll('.btn-variant-group').forEach(function(group) {
            group.style.display = '';
        });
        // Clear search
        var search = view.querySelector('.card-grid-search');
        if (search) search.value = '';
    }
}

/**
 * Filter variant cards in the card-grid by search query
 */
function filterVariantCards(input) {
    var query = input.value.toLowerCase().trim();
    var view = input.closest('.component-detail-view');
    if (!view) return;

    view.querySelectorAll('.btn-variant-group').forEach(function(group) {
        var label = (group.getAttribute('data-label') || '').toLowerCase();
        group.style.display = (query === '' || label.indexOf(query) !== -1) ? '' : 'none';
    });
}

/**
 * Navigate to a component's detail view
 * Hides main content and shows component-specific view
 * If the view has data-component-src, fetches the partial HTML on first visit
 * 
 * @param {string} componentName - Component identifier (e.g., 'buttons', 'checkbox')
 */
function navigateToComponent(componentName) {
    // Hide main content
    const mainContent = document.querySelector('#section-components .content');
    if (mainContent) {
        mainContent.classList.add('hidden');
        mainContent.style.display = 'none';
    }
    
    // Hide all component detail views
    document.querySelectorAll('.component-detail-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    
    // Show specific component detail view
    const specificView = document.getElementById('componentDetailView-' + componentName);
    if (specificView) {
        specificView.classList.add('active');
        specificView.style.display = 'block';

        // DYNAMIC LOAD: If the view has a data-component-src and hasn't been loaded yet, fetch it
        var componentSrc = specificView.getAttribute('data-component-src');
        if (componentSrc && !specificView.dataset.componentLoaded) {
            specificView.innerHTML = '<div style="padding:40px;text-align:center;color:#888"><i class="fas fa-spinner fa-spin"></i> Loading component...</div>';

            // file:// protocol: fetch() is blocked by CORS — use XMLHttpRequest as fallback
            var isFileProtocol = window.location.protocol === 'file:';

            function injectComponentHTML(html) {
                specificView.innerHTML = html;
                specificView.dataset.componentLoaded = 'true';
                // Load component JS if specified
                var componentJs = specificView.getAttribute('data-component-js');
                if (componentJs && !document.querySelector('script[src="' + componentJs + '"]')) {
                    var script = document.createElement('script');
                    script.src = componentJs;
                    document.body.appendChild(script);
                }
                // Re-initialize Lyte custom elements that were injected via innerHTML.
                // Use requestAnimationFrame to ensure DOM is fully settled before triggering upgrades.
                requestAnimationFrame(function() {
                    if (typeof Lyte !== 'undefined' && Lyte.Component) {
                        var lyteSelectors = [
                            'lyte-button', 'lyte-accordion', 'lyte-dropdown', 'lyte-input',
                            'lyte-tabs', 'lyte-checkbox', 'lyte-checkbox-group',
                            'lyte-radiobutton', 'lyte-radiobutton-group',
                            'lyte-tooltip', 'lyte-badge', 'lyte-breadcrumb',
                            'lyte-button-group', 'lyte-carousel', 'lyte-code-snippet',
                            'lyte-daterangepicker', 'lyte-drawer', 'lyte-fileupload',
                            'lyte-kanbanview', 'lyte-nav', 'lyte-navigator',
                            'lyte-progressbar', 'lyte-rating', 'lyte-search',
                            'lyte-signature', 'lyte-slider', 'lyte-table',
                            'lyte-text', 'lyte-tree', 'lyte-video', 'lyte-voicenote',
                            'lyte-alert', 'lyte-banner', 'lyte-calendar',
                            'lyte-colorbox', 'lyte-combobox', 'lyte-dateselect',
                            'lyte-loader', 'lyte-menu', 'lyte-messagebox',
                            'lyte-modal', 'lyte-multi-dropdown', 'lyte-popover',
                            'lyte-number', 'lyte-datetime-input',
                            'lyte-avatar-navigator'
                        ];
                        specificView.querySelectorAll(lyteSelectors.join(', ')).forEach(function(el) {
                            if (!el.hasAttribute('lyte-rendered') && el.constructor && el.constructor.prototype.connectedCallback) {
                                try { el.connectedCallback(); } catch(e) { console.warn('Lyte re-init failed for', el.tagName, e); }
                            }
                        });
                    }
                    // Set up card-grid mode after Lyte components are initialized
                    setupCardGridMode(specificView);
                });
            }

            function showLoadError(err) {
                var msg = isFileProtocol
                    ? '<div style="padding:40px;text-align:center;color:#e74c3c"><i class="fas fa-exclamation-triangle"></i> Cannot load components via file:// protocol.<br><br><span style="color:#696C74;font-size:13px">Start a local server from the <b>Design</b> folder:<br><code style="background:#f0f0f0;padding:4px 8px;border-radius:4px">python3 -m http.server 8080</code><br>Then open <a href="http://localhost:8080">http://localhost:8080</a></span></div>'
                    : '<div style="padding:40px;text-align:center;color:#e74c3c"><i class="fas fa-exclamation-triangle"></i> Failed to load component</div>';
                specificView.innerHTML = msg;
                console.error('Failed to load component partial:', err);
            }

            if (!isFileProtocol) {
                fetch(componentSrc)
                    .then(function(response) {
                        if (!response.ok) throw new Error('HTTP ' + response.status);
                        return response.text();
                    })
                    .then(injectComponentHTML)
                    .catch(showLoadError);
            } else {
                // Fallback: XMLHttpRequest works with file:// in Firefox and some browsers
                try {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', componentSrc, true);
                    xhr.onload = function() {
                        if (xhr.status === 0 || xhr.status === 200) {
                            injectComponentHTML(xhr.responseText);
                        } else {
                            showLoadError(new Error('XHR status ' + xhr.status));
                        }
                    };
                    xhr.onerror = function() { showLoadError(new Error('XHR failed — file:// CORS restriction')); };
                    xhr.send();
                } catch(e) {
                    showLoadError(e);
                }
            }
        } else {
            // LAZY RENDER: Restore saved component HTML into variant-preview divs.
            specificView.querySelectorAll('.variant-preview[data-lazy-key]').forEach(function(preview) {
                if (!preview.dataset.lazyRendered) {
                    var savedHTML = window._componentPreviewHTML[preview.dataset.lazyKey];
                    if (savedHTML) {
                        preview.innerHTML = savedHTML;
                        preview.dataset.lazyRendered = 'true';
                    }
                }
            });
        }
        
        // Reset code visibility in the view
        specificView.querySelectorAll('.variant-card').forEach(card => {
            card.classList.remove('code-visible');
            const toggleBtn = card.querySelector('.variant-code-toggle');
            if (toggleBtn) {
                toggleBtn.classList.remove('active');
                toggleBtn.innerHTML = '<i class="fas fa-code"></i><span>Show Code</span>';
            }
        });
    }
    
    // Update sidebar active state
    updateSecondarySidebarActive(componentName);
}

/**
 * Update secondary sidebar to reflect active component
 * Expands parent category and highlights the component
 * Derives category from DOM structure instead of data array
 * 
 * @param {string} componentName - Component identifier
 */
function updateSecondarySidebarActive(componentName) {
    // Reset states
    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('active'));
    document.querySelectorAll('.category-subitem').forEach(sub => sub.classList.remove('active'));
    document.querySelectorAll('.category-subitems').forEach(sub => sub.classList.remove('expanded'));
    document.querySelectorAll('.category-item').forEach(item => item.classList.remove('expanded'));
    
    // Find and activate the matching subitem, expand its parent
    document.querySelectorAll('.category-subitem').forEach(subitem => {
        const onclick = subitem.getAttribute('onclick');
        if (onclick && onclick.includes(`'${componentName}'`)) {
            subitem.classList.add('active');
            
            // Find and expand parent category group
            const parentGroup = subitem.closest('.category-group');
            if (parentGroup) {
                const subitems = parentGroup.querySelector('.category-subitems');
                if (subitems) subitems.classList.add('expanded');
                
                const categoryItem = parentGroup.querySelector('.category-item');
                if (categoryItem) categoryItem.classList.add('expanded');
            }
        }
    });
}

/**
 * Close component detail and return to main grid view
 */
function closeComponentDetail() {
    const mainContent = document.querySelector('#section-components .content');
    
    // Hide all detail views
    document.querySelectorAll('.component-detail-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    
    // Show main content
    if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.style.display = 'block';
        mainContent.style.animation = 'fadeInUp 0.4s ease';
    }
    
    // Reset sidebar states
    document.querySelectorAll('.category-subitem').forEach(sub => sub.classList.remove('active'));
    document.querySelectorAll('.category-subitems').forEach(sub => sub.classList.remove('expanded'));
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('expanded', 'active');
    });
    
    // Set "All components" as active
    const allComponentsItem = document.querySelector('[data-category="all"]');
    if (allComponentsItem) allComponentsItem.classList.add('active');
    
    // Reset page header
    updatePageInfo('all');
    
    // Show all sections
    document.querySelectorAll('.component-section').forEach(section => {
        section.style.display = 'block';
    });
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 7: GLOBAL SEARCH                                                     ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Filters the secondary sidebar based on search query.                         ║
   ║  Expands matching categories and highlights matching components.              ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

/**
 * Global search function
 * Filters sidebar categories and components based on query
 * 
 * Called from HTML: oninput="globalSearch(this.value)"
 * 
 * @param {string} query - Search query string
 */
function globalSearch(query) {
    const normalizedQuery = query.toLowerCase().trim();
    
    if (!normalizedQuery) {
        resetSidebarFilter();
        return;
    }
    
    filterSidebarBySearch(normalizedQuery);
}

/**
 * Filter sidebar items based on search query
 * Shows matching items and auto-expands their parent categories
 * 
 * @param {string} query - Normalized search query
 */
function filterSidebarBySearch(query) {
    const categoryGroups = document.querySelectorAll('.category-group');
    
    categoryGroups.forEach(group => {
        const categoryItem = group.querySelector('.category-item');
        const categoryName = categoryItem?.querySelector('span')?.textContent.toLowerCase() || '';
        const subitems = group.querySelectorAll('.category-subitem');
        
        let hasMatch = categoryName.includes(query);
        let subitemMatches = 0;
        
        // Check each subitem for matches
        subitems.forEach(item => {
            const itemName = item.querySelector('span')?.textContent.toLowerCase() || '';
            if (itemName.includes(query)) {
                item.style.display = 'flex';
                hasMatch = true;
                subitemMatches++;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide group and auto-expand if has matches
        if (hasMatch) {
            group.style.display = 'block';
            if (subitemMatches > 0 && categoryItem && !categoryItem.classList.contains('expanded')) {
                const category = categoryItem.dataset.category;
                if (category && category !== 'all') {
                    categoryItem.classList.add('expanded');
                    group.classList.add('has-expanded');
                    const subitemsContainer = document.querySelector(`[data-subitems="${category}"]`);
                    if (subitemsContainer) subitemsContainer.classList.add('expanded');
                }
            }
        } else {
            group.style.display = 'none';
        }
    });
}

/**
 * Reset sidebar filter to show all items
 * Called when search is cleared
 */
function resetSidebarFilter() {
    // Show all groups and subitems
    document.querySelectorAll('.category-group').forEach(group => {
        group.style.display = 'block';
        group.querySelectorAll('.category-subitem').forEach(item => {
            item.style.display = 'flex';
        });
    });
    
    // Collapse all expanded categories
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active', 'expanded');
    });
    document.querySelectorAll('.category-subitems').forEach(sub => {
        sub.classList.remove('expanded');
    });
    document.querySelectorAll('.category-subitem').forEach(sub => {
        sub.classList.remove('active');
    });
    document.querySelectorAll('.category-group').forEach(group => {
        group.classList.remove('has-expanded');
    });
    
    // Set "All components" as active
    const allComponentsItem = document.querySelector('[data-category="all"]');
    if (allComponentsItem) allComponentsItem.classList.add('active');
    
    // Hide detail views and show main content
    document.querySelectorAll('.component-detail-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    
    const mainContent = document.querySelector('#section-components .content');
    if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.style.display = 'block';
    }
    
    // Show all sections
    document.querySelectorAll('.component-section').forEach(section => {
        section.style.display = 'block';
        section.style.animation = 'fadeInUp 0.4s ease';
    });
    
    updatePageInfo('all');
}

// Keyboard shortcut: Cmd/Ctrl + K to focus search, Escape to clear
document.addEventListener('keydown', function(e) {
    const searchInput = document.getElementById('global-search-input');
    
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.blur();
        resetSidebarFilter();
    }
});


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 8: CODE DISPLAY                                                      ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Handles showing/hiding code snippets and copying code to clipboard.          ║
   ║  Each component variant card has its own code toggle and copy button.         ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

/**
 * Toggle code visibility for a variant card
 * Animates code block in/out from bottom
 * 
 * Called from HTML: onclick="toggleVariantCode(this)"
 * 
 * @param {HTMLElement} btn - The toggle button element
 */
function toggleVariantCode(btn) {
    const variantCard = btn.closest('.variant-card');
    const isVisible = variantCard.classList.contains('code-visible');
    
    if (isVisible) {
        variantCard.classList.remove('code-visible');
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-code"></i><span>Show Code</span>';
    } else {
        variantCard.classList.add('code-visible');
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-eye-slash"></i><span>Hide Code</span>';
    }
}

/**
 * Copy code to clipboard
 * Shows checkmark feedback on success
 * 
 * Called from HTML: onclick="copyVariantCode(this)"
 * 
 * @param {HTMLElement} btn - The copy button element
 */
function copyVariantCode(btn) {
    const codeBlock = btn.closest('.code-block-mini');
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = '<i class="fas fa-copy"></i>';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
    });
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 9: PAGE INFO                                                         ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Updates page title and description based on current category/view.           ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

/**
 * Update page title and description
 * Shows category-specific content in the header
 * Targets the Components section specifically (not other sections)
 * 
 * @param {string} category - Category identifier
 */
function updatePageInfo(category) {
    // Target the page-title and page-description within the components section only
    const componentsSection = document.getElementById('section-components');
    if (!componentsSection) return;
    
    const pageTitle = componentsSection.querySelector('.page-title');
    const pageDescription = componentsSection.querySelector('.page-description');
    
    const categoryInfo = {
        'all': { 
            title: 'Components', 
            desc: 'Components are interactive building blocks for creating a user interface. They can be organized into categories based on their purpose: Basic, Floating, and Form components.' 
        },
        'basic': { 
            title: 'Basic Components', 
            desc: 'Basic components are the fundamental building blocks of the UI. Buttons, tabs, accordions, tables, and more enable core user interactions.' 
        },
        'floating': { 
            title: 'Floating Components', 
            desc: 'Floating components appear as overlays or pop-up elements. Alerts, modals, tooltips, dropdowns, and popovers display contextual content above the page.' 
        },
        'form': { 
            title: 'Form Components', 
            desc: 'Form components let users enter and edit data. Inputs, checkboxes, radio buttons, and date pickers enable data collection and form building.' 
        }
    };
    
    const info = categoryInfo[category] || categoryInfo['all'];
    if (pageTitle) pageTitle.textContent = info.title;
    if (pageDescription) pageDescription.textContent = info.desc;
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗   ║  SECTION: TOKEN CATEGORY SWITCHER                                             ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Top-level tab switch between Color, Typography, and Radius panels.           ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

var _activeTokenCategory = 'color';

function switchTokenCategory(category, btn) {
    _activeTokenCategory = category;

    // Toggle tab active state
    document.querySelectorAll('#tokenCategoryTabs .token-category-tab').forEach(function(t) {
        t.classList.remove('active');
    });
    if (btn) {
        btn.classList.add('active');
    } else {
        var tabs = document.querySelectorAll('#tokenCategoryTabs .token-category-tab');
        tabs.forEach(function(t) {
            if (t.textContent.toLowerCase().indexOf(category) !== -1) t.classList.add('active');
        });
    }

    // Toggle panels
    document.querySelectorAll('.token-panel').forEach(function(p) {
        p.style.display = 'none';
        p.classList.remove('active');
    });
    var panel = document.getElementById('tokenPanel-' + category);
    if (panel) {
        panel.style.display = '';
        panel.classList.add('active');
    }

    // Render the active panel's table
    if (category === 'color') {
        setTimeout(renderTokenTable, 50);
    } else if (category === 'typography') {
        setTimeout(renderTypoTable, 50);
    } else if (category === 'radius') {
        setTimeout(renderRadiusTable, 50);
    }
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗   ║  SECTION: COLOR TOKEN TABLE                                                   ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Renders color design tokens in a filterable, tabbed table from CSS vars.     ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

var _tokenData = null;
var _currentTokenGroup = 'primary';
var _currentTokenType = 'all';

function _parseColorTokens() {
    // Parse CSS custom properties from :root in _color-tokens.scss (loaded via style tag or stylesheet)
    // We define them inline from the generated SCSS file data
    var tokens = {
        primary: [], secondary: [], info: [], success: [],
        warning: [], error: [], neutral: [], huegrey: []
    };

    // Get all computed CSS custom properties
    var rootStyles = getComputedStyle(document.documentElement);
    var allProps = [];

    // Walk through all stylesheets to find --zc-color- variables
    for (var i = 0; i < document.styleSheets.length; i++) {
        try {
            var rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
            if (!rules) continue;
            for (var j = 0; j < rules.length; j++) {
                if (rules[j].selectorText === ':root') {
                    var cssText = rules[j].cssText;
                    var re = /--(zc-color-[\w-]+)\s*:\s*([^;]+)/g;
                    var m;
                    while ((m = re.exec(cssText)) !== null) {
                        allProps.push({ prop: '--' + m[1], value: m[2].trim() });
                    }
                }
            }
        } catch (e) {
            // Cross-origin stylesheet, skip
        }
    }

    // Parse each property into structured token data
    allProps.forEach(function(item) {
        // e.g. --zc-color-primary-surface-bold
        var name = item.prop.replace('--zc-color-', '');
        var parts = name.split('-');

        // First part is the group
        var group = parts[0];
        if (!tokens[group]) return;

        // Find type: surface, border, or text
        var typeIdx = -1;
        var type = '';
        for (var k = 1; k < parts.length; k++) {
            if (parts[k] === 'surface' || parts[k] === 'border' || parts[k] === 'text') {
                type = parts[k];
                typeIdx = k;
                break;
            }
        }
        if (!type) return;

        // Variant is the rest after type
        var variant = parts.slice(typeIdx + 1).join('-');
        var hex = item.value;

        // Resolve the computed value if it's not already a hex
        if (hex.indexOf('#') !== 0) {
            hex = rootStyles.getPropertyValue(item.prop).trim();
        }

        tokens[group].push({
            prop: item.prop,
            group: group,
            type: type,
            variant: variant || 'default',
            hex: hex,
            name: '--zc-color-' + name
        });
    });

    return tokens;
}

function _buildTokenData() {
    if (!_tokenData) {
        _tokenData = _parseColorTokens();
    }
    // If stylesheet parsing found nothing, build from hardcoded list
    if (!_tokenData.primary.length) {
        _tokenData = _buildFallbackTokenData();
    }
    return _tokenData;
}

function _buildFallbackTokenData() {
    // Fallback: read from the :root style element injected in index.html
    var tokens = {
        primary: [], secondary: [], info: [], success: [],
        warning: [], error: [], neutral: [], huegrey: []
    };
    var el = document.getElementById('colorTokenStyles');
    if (!el) return tokens;

    var cssText = el.textContent || el.innerText;
    var re = /--(zc-color-([\w-]+))\s*:\s*([^;]+)/g;
    var m;
    while ((m = re.exec(cssText)) !== null) {
        var fullProp = '--' + m[1];
        var name = m[2];
        var value = m[3].trim();
        var parts = name.split('-');
        var group = parts[0];
        if (!tokens[group]) continue;

        var type = '';
        var typeIdx = -1;
        for (var k = 1; k < parts.length; k++) {
            if (parts[k] === 'surface' || parts[k] === 'border' || parts[k] === 'text') {
                type = parts[k];
                typeIdx = k;
                break;
            }
        }
        if (!type) continue;

        var variant = parts.slice(typeIdx + 1).join('-');
        tokens[group].push({
            prop: fullProp,
            group: group,
            type: type,
            variant: variant || 'default',
            hex: value,
            name: fullProp
        });
    }
    return tokens;
}

function renderTokenTable() {
    var data = _buildTokenData();
    var groupTokens = data[_currentTokenGroup] || [];
    var search = (document.getElementById('tokenSearch') || {}).value || '';
    search = search.toLowerCase();

    // Filter by type
    var filtered = groupTokens.filter(function(t) {
        if (_currentTokenType !== 'all' && t.type !== _currentTokenType) return false;
        if (search && t.name.toLowerCase().indexOf(search) === -1 &&
            t.hex.toLowerCase().indexOf(search) === -1 &&
            t.variant.toLowerCase().indexOf(search) === -1) return false;
        return true;
    });

    var body = document.getElementById('tokenTableBody');
    if (!body) return;

    if (filtered.length === 0) {
        body.innerHTML = '<div class="token-empty">No tokens found.</div>';
        var countEl = document.getElementById('tokenCount');
        if (countEl) countEl.textContent = '0 tokens';
        return;
    }

    var html = '';
    filtered.forEach(function(t) {
        html += '<div class="token-row" data-type="' + t.type + '">';
        html += '  <div class="token-swatch" style="background:' + t.hex + ';" title="' + t.hex + '"></div>';
        html += '  <div class="token-name">' + t.name + '</div>';
        html += '  <div><span class="token-type-tag ' + t.type + '">' + t.type + '</span></div>';
        html += '  <div class="token-variant">' + t.variant + '</div>';
        html += '  <div class="token-hex" onclick="copyTokenValue(this, \'' + t.hex + '\')" title="Click to copy">' + t.hex + '</div>';
        html += '</div>';
    });

    body.innerHTML = html;
    var countEl = document.getElementById('tokenCount');
    if (countEl) countEl.textContent = filtered.length + ' of ' + groupTokens.length + ' tokens';
}

function switchTokenGroup(group, btn) {
    _currentTokenGroup = group;
    document.querySelectorAll('.token-tab').forEach(function(t) { t.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    renderTokenTable();
}

function filterTokenType(type, btn) {
    _currentTokenType = type;
    document.querySelectorAll('.token-type-btn').forEach(function(t) { t.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    renderTokenTable();
}

function filterTokenTable() {
    renderTokenTable();
}

function copyTokenValue(el, value) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(value).then(function() {
            el.classList.add('copied');
            var orig = el.textContent;
            el.textContent = 'Copied!';
            setTimeout(function() {
                el.textContent = orig;
                el.classList.remove('copied');
            }, 1200);
        });
    }
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  SECTION 9B: TYPOGRAPHY & RADIUS TOKEN TABLES                                ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Renders typography and radius tokens in filterable tables from CSS vars.     ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

var _currentTypoGroup = 'weight';

function _parseTypoTokens() {
    var el = document.getElementById('colorTokenStyles');
    if (!el) return { weight: [], size: [], lineheight: [], family: [], semantic: [] };

    var cssText = el.textContent || el.innerText;
    var result = { weight: [], size: [], lineheight: [], family: [], semantic: [] };

    var re = /--(zc-[\w-]+)\s*:\s*([^;]+)/g;
    var m;
    while ((m = re.exec(cssText)) !== null) {
        var name = '--' + m[1];
        var value = m[2].trim();

        if (name.match(/^--zc-font-weight-/) && !name.match(/^--zc-(h\d|p\d)/)) {
            var slug = name.replace('--zc-font-weight-', '');
            result.weight.push({ name: name, value: value, category: 'weight', label: slug });
        } else if (name.match(/^--zc-font-size-/) && !name.match(/^--zc-(h\d|p\d)/)) {
            var slug = name.replace('--zc-font-size-', '');
            result.size.push({ name: name, value: value, category: 'size', label: slug });
        } else if (name.match(/^--zc-line-height-/) && !name.match(/^--zc-(h\d|p\d)/)) {
            var slug = name.replace('--zc-line-height-', '');
            result.lineheight.push({ name: name, value: value, category: 'line-height', label: slug });
        } else if (name.match(/^--zc-font-family-/) && !name.match(/^--zc-(h\d|p\d)/)) {
            var slug = name.replace('--zc-font-family-', '');
            result.family.push({ name: name, value: value, category: 'family', label: slug });
        } else if (name.match(/^--zc-(h[1-6]|p[1-6])-/)) {
            var headMatch = name.match(/^--zc-(h[1-6]|p[1-6])-(.*)/);
            if (headMatch) {
                var heading = headMatch[1].toUpperCase();
                var prop = headMatch[2];
                result.semantic.push({ name: name, value: value, category: heading, label: prop });
            }
        }
    }
    return result;
}

var _typoData = null;
function _getTypoData() {
    if (!_typoData) _typoData = _parseTypoTokens();
    return _typoData;
}

function switchTypoGroup(group, btn) {
    _currentTypoGroup = group;
    document.querySelectorAll('#typoTabs .token-tab').forEach(function(t) { t.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    renderTypoTable();
}

function renderTypoTable() {
    var data = _getTypoData();
    var items = data[_currentTypoGroup] || [];
    var search = (document.getElementById('typoSearch') || {}).value || '';
    search = search.toLowerCase();

    var filtered = items.filter(function(t) {
        if (!search) return true;
        return t.name.toLowerCase().indexOf(search) !== -1 ||
               t.value.toLowerCase().indexOf(search) !== -1 ||
               t.label.toLowerCase().indexOf(search) !== -1;
    });

    var body = document.getElementById('typoTableBody');
    if (!body) return;

    if (filtered.length === 0) {
        body.innerHTML = '<div class="token-empty">No tokens found.</div>';
        var c = document.getElementById('typoCount');
        if (c) c.textContent = '0 tokens';
        return;
    }

    var html = '';
    filtered.forEach(function(t) {
        var preview = '';
        var rawVal = t.value.replace(/var\(([^)]+)\)/g, function(_, v) {
            return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || t.value;
        });

        if (_currentTypoGroup === 'weight') {
            preview = '<span class="typo-preview" style="font-weight:' + rawVal + ';">Aa</span>';
        } else if (_currentTypoGroup === 'size') {
            preview = '<span class="typo-preview" style="font-size:' + rawVal + ';">Aa</span>';
        } else if (_currentTypoGroup === 'lineheight') {
            preview = '<span class="typo-preview typo-lh" style="line-height:' + rawVal + ';font-size:14px;">Aa<br>Bb</span>';
        } else if (_currentTypoGroup === 'family') {
            preview = '<span class="typo-preview" style="font-family:' + rawVal + ';">Aa Bb Cc</span>';
        } else {
            // Semantic — show heading-like preview
            if (t.label.indexOf('font-size') !== -1) {
                preview = '<span class="typo-preview" style="font-size:' + rawVal + ';">' + t.category + '</span>';
            } else if (t.label.indexOf('font-weight') !== -1) {
                preview = '<span class="typo-preview" style="font-weight:' + rawVal + ';">' + t.category + '</span>';
            } else if (t.label.indexOf('line-height') !== -1) {
                preview = '<span class="typo-preview typo-lh" style="line-height:' + rawVal + ';font-size:14px;">' + t.category + '</span>';
            } else if (t.label.indexOf('font-family') !== -1) {
                preview = '<span class="typo-preview" style="font-family:' + rawVal + ';">' + t.category + '</span>';
            } else {
                preview = '<span class="typo-preview">' + t.category + '</span>';
            }
        }

        var displayVal = t.value;
        html += '<div class="token-row">';
        html += '  <div class="typo-preview-cell">' + preview + '</div>';
        html += '  <div class="token-name">' + t.name + '</div>';
        html += '  <div><span class="token-type-tag typo-cat">' + t.category + '</span></div>';
        html += '  <div class="token-hex" onclick="copyTokenValue(this, \'' + t.name + '\')" title="Click to copy">' + displayVal + '</div>';
        html += '</div>';
    });

    body.innerHTML = html;
    var c = document.getElementById('typoCount');
    if (c) c.textContent = filtered.length + ' of ' + items.length + ' tokens';
}

/* --- Radius Tokens --- */

function _parseRadiusTokens() {
    var el = document.getElementById('colorTokenStyles');
    if (!el) return [];

    var cssText = el.textContent || el.innerText;
    var result = [];
    var re = /--(zc-radius-[\w-]+)\s*:\s*([^;]+)/g;
    var m;
    while ((m = re.exec(cssText)) !== null) {
        var name = '--' + m[1];
        var value = m[2].trim();
        var slug = m[1].replace('zc-radius-', '');
        var isRef = value.indexOf('var(') !== -1;
        result.push({ name: name, value: value, slug: slug, semantic: isRef });
    }
    return result;
}

var _radiusData = null;
function _getRadiusData() {
    if (!_radiusData) _radiusData = _parseRadiusTokens();
    return _radiusData;
}

function renderRadiusTable() {
    var tokens = _getRadiusData();
    var search = (document.getElementById('radiusSearch') || {}).value || '';
    search = search.toLowerCase();

    var filtered = tokens.filter(function(t) {
        if (!search) return true;
        return t.name.toLowerCase().indexOf(search) !== -1 ||
               t.value.toLowerCase().indexOf(search) !== -1 ||
               t.slug.toLowerCase().indexOf(search) !== -1;
    });

    var grid = document.getElementById('radiusGrid');
    if (!grid) return;

    if (filtered.length === 0) {
        grid.innerHTML = '<div class="token-empty">No radius tokens found.</div>';
        var c = document.getElementById('radiusCount');
        if (c) c.textContent = '0 tokens';
        return;
    }

    var html = '';
    filtered.forEach(function(t) {
        var rawVal = t.value.replace(/var\(([^)]+)\)/g, function(_, v) {
            return getComputedStyle(document.documentElement).getPropertyValue(v).trim() || t.value;
        });
        var numVal = parseInt(rawVal) || 0;
        var displaySize = Math.min(numVal, 48);
        var badge = t.semantic ? '<span class="radius-badge semantic">Semantic</span>' : '<span class="radius-badge primitive">Primitive</span>';

        html += '<div class="radius-card" onclick="copyTokenValue(this.querySelector(\'.radius-name\'), \'' + t.name + '\')">';
        html += '  <div class="radius-shape" style="border-radius:' + rawVal + ';"></div>';
        html += '  <div class="radius-info">';
        html += '    <div class="radius-name">' + t.name + '</div>';
        html += '    <div class="radius-value">' + t.value + '</div>';
        html += '    ' + badge;
        html += '  </div>';
        html += '</div>';
    });

    grid.innerHTML = html;
    var c = document.getElementById('radiusCount');
    if (c) c.textContent = filtered.length + ' tokens';
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗
   ║  LISTING CARD – SHOW CODE TOGGLE / TAB SWITCH / COPY                        ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

function toggleListingCodePanel(btn) {
    var card = btn.closest('.listing-card');
    if (!card) return;
    var codePanel = card.querySelector('.listing-code-panel');
    if (!codePanel) return;

    var isVisible = codePanel.style.display === 'block';
    codePanel.style.display = isVisible ? 'none' : 'block';
    btn.classList.toggle('active', !isVisible);

    var span = btn.querySelector('span');
    if (span) span.textContent = isVisible ? 'Show Code' : 'Hide Code';
}

function switchListingCodeTab(tab, tabEl) {
    var panel = tabEl.closest('.listing-code-panel');
    if (!panel) return;

    panel.querySelectorAll('.listing-code-tab').forEach(function (t) {
        t.classList.remove('active');
    });
    tabEl.classList.add('active');

    panel.querySelectorAll('.listing-code-block').forEach(function (block) {
        block.style.display = block.dataset.lang === tab ? 'block' : 'none';
    });
}

function copyListingCode(btn) {
    var codeBlock = btn.closest('.listing-code-block').querySelector('code');
    if (!codeBlock) return;

    navigator.clipboard.writeText(codeBlock.textContent).then(function () {
        var icon = btn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-check';
            setTimeout(function () { icon.className = 'fas fa-copy'; }, 1500);
        }
    });
}


/* ╔═══════════════════════════════════════════════════════════════════════════════╗   ║  SECTION 10: INITIALIZATION                                                   ║
   ║  ─────────────────────────────────────────────────────────────────────────────║
   ║  Application startup. Sets default product and initial state.                 ║
   ╚═══════════════════════════════════════════════════════════════════════════════╝ */

// Initialize with default product on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        selectProduct('creator');
    });
} else {
    selectProduct('creator');
}
