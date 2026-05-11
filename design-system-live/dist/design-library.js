(function(){
"use strict";
/* ── Data for secondary sidebar ── */
var sidebarData = {
"foundation": [{id:"icons",title:"Icons",icon:"fa-icons"},{id:"tokens/typography",title:"Typography",icon:"fa-font"},{id:"tokens/colors",title:"Color tokens",icon:"fa-palette"},{id:"tokens/spacing",title:"Spacing",icon:"fa-ruler-combined"},{id:"tokens/grid",title:"Grid & Flex",icon:"fa-table-columns"}],
"components": [{id:"form-fields",title:"Form fields",icon:"fa-cube"},{id:"reports",title:"Reports",icon:"fa-chart-column"},{id:"all",title:"Common",icon:"fa-layer-group"}]
};
var cardTypeGroups = {"card1":{title:"Card 1",icon:"fa-address-card",items:[{id:"reports/card1-left-single-line",title:"Card 1 — Left Single Line",icon:"fa-address-card"},{id:"reports/card1-left-multi-line",title:"Card 1 — Left Multi Line",icon:"fa-address-card"},{id:"reports/card1-centre-single-line",title:"Card 1 — Centre Single Line",icon:"fa-address-card"},{id:"reports/card1-centre-multi-line",title:"Card 1 — Centre Multi Line",icon:"fa-address-card"}]},"card2":{title:"Card 2",icon:"fa-table-list",items:[{id:"reports/card2-left-single-line",title:"Card 2 — Left Single Line",icon:"fa-table-list"},{id:"reports/card2-left-multi-line",title:"Card 2 — Left Multi Line",icon:"fa-table-list"},{id:"reports/card2-centre-single-line",title:"Card 2 — Centre Single Line",icon:"fa-table-list"},{id:"reports/card2-centre-multi-line",title:"Card 2 — Centre Multi Line",icon:"fa-table-list"}]},"card3":{title:"Card 3",icon:"fa-image",items:[{id:"reports/card3-square-left-single-line",title:"Card 3 — Square Left Single Line",icon:"fa-image"},{id:"reports/card3-square-left-multi-line",title:"Card 3 — Square Left Multi Line",icon:"fa-image"},{id:"reports/card3-square-right-single-line",title:"Card 3 — Square Right Single Line",icon:"fa-image"},{id:"reports/card3-square-right-multi-line",title:"Card 3 — Square Right Multi Line",icon:"fa-image"},{id:"reports/card3-square-top-single-line",title:"Card 3 — Square Top Single Line",icon:"fa-image"},{id:"reports/card3-square-top-multi-line",title:"Card 3 — Square Top Multi Line",icon:"fa-image"},{id:"reports/card3-square-bottom-single-line",title:"Card 3 — Square Bottom Single Line",icon:"fa-image"},{id:"reports/card3-square-bottom-multi-line",title:"Card 3 — Square Bottom Multi Line",icon:"fa-image"},{id:"reports/card3-circle-left-single-line",title:"Card 3 — Circle Left Single Line",icon:"fa-image"},{id:"reports/card3-circle-left-multi-line",title:"Card 3 — Circle Left Multi Line",icon:"fa-image"},{id:"reports/card3-circle-right-single-line",title:"Card 3 — Circle Right Single Line",icon:"fa-image"},{id:"reports/card3-circle-right-multi-line",title:"Card 3 — Circle Right Multi Line",icon:"fa-image"},{id:"reports/card3-circle-top-single-line",title:"Card 3 — Circle Top Single Line",icon:"fa-image"},{id:"reports/card3-circle-top-multi-line",title:"Card 3 — Circle Top Multi Line",icon:"fa-image"},{id:"reports/card3-circle-bottom-single-line",title:"Card 3 — Circle Bottom Single Line",icon:"fa-image"},{id:"reports/card3-circle-bottom-multi-line",title:"Card 3 — Circle Bottom Multi Line",icon:"fa-image"},{id:"reports/card3-full-left-single-line",title:"Card 3 — Full Left Single Line",icon:"fa-image"},{id:"reports/card3-full-left-multi-line",title:"Card 3 — Full Left Multi Line",icon:"fa-image"},{id:"reports/card3-full-right-single-line",title:"Card 3 — Full Right Single Line",icon:"fa-image"},{id:"reports/card3-full-right-multi-line",title:"Card 3 — Full Right Multi Line",icon:"fa-image"},{id:"reports/card3-full-top-single-line",title:"Card 3 — Full Top Single Line",icon:"fa-image"},{id:"reports/card3-full-top-multi-line",title:"Card 3 — Full Top Multi Line",icon:"fa-image"},{id:"reports/card3-full-bottom-single-line",title:"Card 3 — Full Bottom Single Line",icon:"fa-image"},{id:"reports/card3-full-bottom-multi-line",title:"Card 3 — Full Bottom Multi Line",icon:"fa-image"}]},"card4":{title:"Card 4",icon:"fa-table-cells",items:[{id:"reports/card4-square-left-single-line",title:"Card 4 — Square Left Single Line",icon:"fa-table-cells"},{id:"reports/card4-square-left-multi-line",title:"Card 4 — Square Left Multi Line",icon:"fa-table-cells"},{id:"reports/card4-square-right-single-line",title:"Card 4 — Square Right Single Line",icon:"fa-table-cells"},{id:"reports/card4-square-right-multi-line",title:"Card 4 — Square Right Multi Line",icon:"fa-table-cells"},{id:"reports/card4-square-top-single-line",title:"Card 4 — Square Top Single Line",icon:"fa-table-cells"},{id:"reports/card4-square-top-multi-line",title:"Card 4 — Square Top Multi Line",icon:"fa-table-cells"},{id:"reports/card4-square-bottom-single-line",title:"Card 4 — Square Bottom Single Line",icon:"fa-table-cells"},{id:"reports/card4-square-bottom-multi-line",title:"Card 4 — Square Bottom Multi Line",icon:"fa-table-cells"},{id:"reports/card4-circle-left-single-line",title:"Card 4 — Circle Left Single Line",icon:"fa-table-cells"},{id:"reports/card4-circle-left-multi-line",title:"Card 4 — Circle Left Multi Line",icon:"fa-table-cells"},{id:"reports/card4-circle-right-single-line",title:"Card 4 — Circle Right Single Line",icon:"fa-table-cells"},{id:"reports/card4-circle-right-multi-line",title:"Card 4 — Circle Right Multi Line",icon:"fa-table-cells"},{id:"reports/card4-circle-top-single-line",title:"Card 4 — Circle Top Single Line",icon:"fa-table-cells"},{id:"reports/card4-circle-top-multi-line",title:"Card 4 — Circle Top Multi Line",icon:"fa-table-cells"},{id:"reports/card4-circle-bottom-single-line",title:"Card 4 — Circle Bottom Single Line",icon:"fa-table-cells"},{id:"reports/card4-circle-bottom-multi-line",title:"Card 4 — Circle Bottom Multi Line",icon:"fa-table-cells"},{id:"reports/card4-full-left-single-line",title:"Card 4 — Full Left Single Line",icon:"fa-table-cells"},{id:"reports/card4-full-left-multi-line",title:"Card 4 — Full Left Multi Line",icon:"fa-table-cells"},{id:"reports/card4-full-right-single-line",title:"Card 4 — Full Right Single Line",icon:"fa-table-cells"},{id:"reports/card4-full-right-multi-line",title:"Card 4 — Full Right Multi Line",icon:"fa-table-cells"},{id:"reports/card4-full-top-single-line",title:"Card 4 — Full Top Single Line",icon:"fa-table-cells"},{id:"reports/card4-full-top-multi-line",title:"Card 4 — Full Top Multi Line",icon:"fa-table-cells"},{id:"reports/card4-full-bottom-single-line",title:"Card 4 — Full Bottom Single Line",icon:"fa-table-cells"},{id:"reports/card4-full-bottom-multi-line",title:"Card 4 — Full Bottom Multi Line",icon:"fa-table-cells"}]},"card5":{title:"Card 5",icon:"fa-grip",items:[{id:"reports/card5-single-line",title:"Card 5 — Single Line",icon:"fa-grip"},{id:"reports/card5-multi-line",title:"Card 5 — Multi Line",icon:"fa-grip"}]}};
var allCardPages = [{id:"reports/card1-left-single-line",title:"Card 1 — Left Single Line",icon:"fa-address-card"},{id:"reports/card1-left-multi-line",title:"Card 1 — Left Multi Line",icon:"fa-address-card"},{id:"reports/card1-centre-single-line",title:"Card 1 — Centre Single Line",icon:"fa-address-card"},{id:"reports/card1-centre-multi-line",title:"Card 1 — Centre Multi Line",icon:"fa-address-card"},{id:"reports/card2-left-single-line",title:"Card 2 — Left Single Line",icon:"fa-table-list"},{id:"reports/card2-left-multi-line",title:"Card 2 — Left Multi Line",icon:"fa-table-list"},{id:"reports/card2-centre-single-line",title:"Card 2 — Centre Single Line",icon:"fa-table-list"},{id:"reports/card2-centre-multi-line",title:"Card 2 — Centre Multi Line",icon:"fa-table-list"},{id:"reports/card3-square-left-single-line",title:"Card 3 — Square Left Single Line",icon:"fa-image"},{id:"reports/card3-square-left-multi-line",title:"Card 3 — Square Left Multi Line",icon:"fa-image"},{id:"reports/card3-square-right-single-line",title:"Card 3 — Square Right Single Line",icon:"fa-image"},{id:"reports/card3-square-right-multi-line",title:"Card 3 — Square Right Multi Line",icon:"fa-image"},{id:"reports/card3-square-top-single-line",title:"Card 3 — Square Top Single Line",icon:"fa-image"},{id:"reports/card3-square-top-multi-line",title:"Card 3 — Square Top Multi Line",icon:"fa-image"},{id:"reports/card3-square-bottom-single-line",title:"Card 3 — Square Bottom Single Line",icon:"fa-image"},{id:"reports/card3-square-bottom-multi-line",title:"Card 3 — Square Bottom Multi Line",icon:"fa-image"},{id:"reports/card3-circle-left-single-line",title:"Card 3 — Circle Left Single Line",icon:"fa-image"},{id:"reports/card3-circle-left-multi-line",title:"Card 3 — Circle Left Multi Line",icon:"fa-image"},{id:"reports/card3-circle-right-single-line",title:"Card 3 — Circle Right Single Line",icon:"fa-image"},{id:"reports/card3-circle-right-multi-line",title:"Card 3 — Circle Right Multi Line",icon:"fa-image"},{id:"reports/card3-circle-top-single-line",title:"Card 3 — Circle Top Single Line",icon:"fa-image"},{id:"reports/card3-circle-top-multi-line",title:"Card 3 — Circle Top Multi Line",icon:"fa-image"},{id:"reports/card3-circle-bottom-single-line",title:"Card 3 — Circle Bottom Single Line",icon:"fa-image"},{id:"reports/card3-circle-bottom-multi-line",title:"Card 3 — Circle Bottom Multi Line",icon:"fa-image"},{id:"reports/card3-full-left-single-line",title:"Card 3 — Full Left Single Line",icon:"fa-image"},{id:"reports/card3-full-left-multi-line",title:"Card 3 — Full Left Multi Line",icon:"fa-image"},{id:"reports/card3-full-right-single-line",title:"Card 3 — Full Right Single Line",icon:"fa-image"},{id:"reports/card3-full-right-multi-line",title:"Card 3 — Full Right Multi Line",icon:"fa-image"},{id:"reports/card3-full-top-single-line",title:"Card 3 — Full Top Single Line",icon:"fa-image"},{id:"reports/card3-full-top-multi-line",title:"Card 3 — Full Top Multi Line",icon:"fa-image"},{id:"reports/card3-full-bottom-single-line",title:"Card 3 — Full Bottom Single Line",icon:"fa-image"},{id:"reports/card3-full-bottom-multi-line",title:"Card 3 — Full Bottom Multi Line",icon:"fa-image"},{id:"reports/card4-square-left-single-line",title:"Card 4 — Square Left Single Line",icon:"fa-table-cells"},{id:"reports/card4-square-left-multi-line",title:"Card 4 — Square Left Multi Line",icon:"fa-table-cells"},{id:"reports/card4-square-right-single-line",title:"Card 4 — Square Right Single Line",icon:"fa-table-cells"},{id:"reports/card4-square-right-multi-line",title:"Card 4 — Square Right Multi Line",icon:"fa-table-cells"},{id:"reports/card4-square-top-single-line",title:"Card 4 — Square Top Single Line",icon:"fa-table-cells"},{id:"reports/card4-square-top-multi-line",title:"Card 4 — Square Top Multi Line",icon:"fa-table-cells"},{id:"reports/card4-square-bottom-single-line",title:"Card 4 — Square Bottom Single Line",icon:"fa-table-cells"},{id:"reports/card4-square-bottom-multi-line",title:"Card 4 — Square Bottom Multi Line",icon:"fa-table-cells"},{id:"reports/card4-circle-left-single-line",title:"Card 4 — Circle Left Single Line",icon:"fa-table-cells"},{id:"reports/card4-circle-left-multi-line",title:"Card 4 — Circle Left Multi Line",icon:"fa-table-cells"},{id:"reports/card4-circle-right-single-line",title:"Card 4 — Circle Right Single Line",icon:"fa-table-cells"},{id:"reports/card4-circle-right-multi-line",title:"Card 4 — Circle Right Multi Line",icon:"fa-table-cells"},{id:"reports/card4-circle-top-single-line",title:"Card 4 — Circle Top Single Line",icon:"fa-table-cells"},{id:"reports/card4-circle-top-multi-line",title:"Card 4 — Circle Top Multi Line",icon:"fa-table-cells"},{id:"reports/card4-circle-bottom-single-line",title:"Card 4 — Circle Bottom Single Line",icon:"fa-table-cells"},{id:"reports/card4-circle-bottom-multi-line",title:"Card 4 — Circle Bottom Multi Line",icon:"fa-table-cells"},{id:"reports/card4-full-left-single-line",title:"Card 4 — Full Left Single Line",icon:"fa-table-cells"},{id:"reports/card4-full-left-multi-line",title:"Card 4 — Full Left Multi Line",icon:"fa-table-cells"},{id:"reports/card4-full-right-single-line",title:"Card 4 — Full Right Single Line",icon:"fa-table-cells"},{id:"reports/card4-full-right-multi-line",title:"Card 4 — Full Right Multi Line",icon:"fa-table-cells"},{id:"reports/card4-full-top-single-line",title:"Card 4 — Full Top Single Line",icon:"fa-table-cells"},{id:"reports/card4-full-top-multi-line",title:"Card 4 — Full Top Multi Line",icon:"fa-table-cells"},{id:"reports/card4-full-bottom-single-line",title:"Card 4 — Full Bottom Single Line",icon:"fa-table-cells"},{id:"reports/card4-full-bottom-multi-line",title:"Card 4 — Full Bottom Multi Line",icon:"fa-table-cells"},{id:"reports/card5-single-line",title:"Card 5 — Single Line",icon:"fa-grip"},{id:"reports/card5-multi-line",title:"Card 5 — Multi Line",icon:"fa-grip"}];
var createComponentPage = { id: "create-component", title: "Create New Component", icon: "fa-wand-magic-sparkles" };
var allViews = document.querySelectorAll(".view");
var secondarySidebar = document.getElementById("secondarySidebar");
var secondaryNavList = document.getElementById("secondaryNavList");
var currentView = "home";
function eventTargetElement(ev) {
var n = ev && ev.target;
while (n && n.nodeType !== 1) n = n.parentElement;
return n || null;
}
function getMainNavKey(viewId) {
if (viewId === "home") return "home";
if (viewId === "versions") return "versions";
if (viewId === "icons" || viewId === "tokens" || viewId.indexOf("tokens/") === 0) return "foundation";
if (viewId.indexOf("form-fields") === 0 || viewId.indexOf("reports") === 0 || viewId === "all" || viewId === "create-component") return "components";
return "home";
}
function getBackTarget(viewId) {
if (!viewId || viewId === "home") return null;
var slash = viewId.indexOf("/");
if (slash !== -1) {
var prefix = viewId.slice(0, slash);
if (prefix === "tokens") return "tokens";
if (prefix === "form-fields") return "form-fields";
if (prefix === "reports") return "reports";
return "home";
}
if (viewId === "icons" || viewId === "tokens" || viewId === "form-fields" || viewId === "reports" || viewId === "all" || viewId === "create-component" || viewId === "versions") return "home";
return null;
}
function openMobileNavSheet() {
var s = document.getElementById("mobileNavSheet");
var m = document.getElementById("mobileMenuOpen");
if (!s) return;
s.hidden = false;
document.body.classList.add("mobile-nav-open");
if (m) m.setAttribute("aria-expanded", "true");
requestAnimationFrame(function(){ requestAnimationFrame(function(){ s.classList.add("is-open"); }); });
}
function closeMobileNavSheet() {
var s = document.getElementById("mobileNavSheet");
var menu = document.getElementById("mobileMenuOpen");
if (!s || s.hidden) { if (s) s.classList.remove("is-open"); document.body.classList.remove("mobile-nav-open"); return; }
s.classList.remove("is-open");
document.body.classList.remove("mobile-nav-open");
if (menu) menu.setAttribute("aria-expanded", "false");
setTimeout(function(){ s.hidden = true; }, 300);
}
function navigate(viewId, options) {
options = options || {};
currentView = viewId;
/* Restore any previously moved header back to its source view */
var topBar = document.getElementById("topHeaderBar");
if (topBar._srcView && topBar._movedEl) {
topBar._srcView.insertBefore(topBar._movedEl, topBar._srcView.firstChild);
topBar._srcView = null; topBar._movedEl = null;
}
topBar.innerHTML = ""; topBar.classList.remove("visible", "top-header-bar--has-back");
/* Hide all views */
allViews.forEach(function(v){ v.classList.remove("active"); });
/* Show target view */
var targetId = "view-" + viewId.replace(/\//g, "-");
var target = document.getElementById(targetId);
if (target) target.classList.add("active");
/* Move header (detail-header or page-header) to external bar */
var hdr = target ? (target.querySelector(".detail-header") || target.querySelector(".page-header")) : null;
if (hdr) {
topBar._srcView = target;
topBar._movedEl = hdr;
var backTarget = getBackTarget(viewId);
if (backTarget) {
var backBtn = document.createElement("button");
backBtn.type = "button";
backBtn.className = "header-back-btn";
backBtn.setAttribute("aria-label", "Go back");
backBtn.innerHTML = '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i><span class="header-back-label">Back</span>';
backBtn.addEventListener("click", function(){ navigate(backTarget); });
topBar.appendChild(backBtn);
topBar.classList.add("top-header-bar--has-back");
}
topBar.appendChild(hdr);
topBar.classList.add("visible");
}
/* Rail main nav active state */
var mainKey = getMainNavKey(viewId);
document.querySelectorAll(".nav-item--rail[data-main]").forEach(function(n){ n.classList.toggle("active", n.dataset.main === mainKey); });
/* Secondary sidebar (Foundation / Components) */
var sidebarKey = (mainKey === "foundation") ? "foundation" : (mainKey === "components") ? "components" : null;
var pages = sidebarKey ? sidebarData[sidebarKey] : null;
var secTitle = document.getElementById("secondarySidebarTitle");
if (pages) {
secondarySidebar.classList.add("visible");
if (secTitle) secTitle.textContent = sidebarKey === "foundation" ? "Foundation" : "Components";
secondaryNavList.innerHTML = "";
pages.forEach(function(p){
var li = document.createElement("li");
var item = document.createElement("div");
var isActive = false;
if (p.id === "form-fields") isActive = viewId.indexOf("form-fields") === 0;
else if (p.id === "reports") isActive = viewId.indexOf("reports") === 0;
else if (p.id === "all") isActive = (viewId === "all");
else isActive = (viewId === p.id);
item.className = "category-item" + (isActive ? " active" : "");
item.innerHTML = '<i class="fa-solid ' + p.icon + '"></i><span>' + p.title + '</span>';
item.addEventListener("click", function(){ navigate(p.id); });
li.appendChild(item);
secondaryNavList.appendChild(li);
});
/* Card Report Types — hidden from sidebar */
if (false && sidebarKey === "components") {
var outerAcc = document.createElement("li");
outerAcc.className = "sidebar-accordion" + (viewId.indexOf("reports/card") === 0 ? " open" : "");
var outerTrig = document.createElement("button");
outerTrig.className = "sidebar-accordion-trigger";
outerTrig.innerHTML = '<i class="fa-solid fa-id-card sa-icon"></i><span>Card Report Types</span><i class="fa-solid fa-chevron-down sa-chevron"></i>';
outerTrig.addEventListener("click", function(e){ e.stopPropagation(); outerAcc.classList.toggle("open"); });
outerAcc.appendChild(outerTrig);
var outerBody = document.createElement("div");
outerBody.className = "sidebar-accordion-body";
/* Build sub-accordion for each Card type (1-5) */
var ctKeys = Object.keys(cardTypeGroups);
ctKeys.forEach(function(ctKey){
var grp = cardTypeGroups[ctKey];
var hasActiveChild = grp.items.some(function(cp){ return viewId === cp.id; });
var subAcc = document.createElement("div");
subAcc.className = "sidebar-accordion sidebar-sub-accordion" + (hasActiveChild ? " open" : "");
var subTrig = document.createElement("button");
subTrig.className = "sidebar-accordion-trigger";
subTrig.innerHTML = '<i class="fa-solid ' + grp.icon + ' sa-icon"></i><span>' + grp.title + '</span><i class="fa-solid fa-chevron-down sa-chevron"></i>';
subTrig.addEventListener("click", function(e){ e.stopPropagation(); subAcc.classList.toggle("open"); });
subAcc.appendChild(subTrig);
var subBody = document.createElement("div");
subBody.className = "sidebar-accordion-body";
grp.items.forEach(function(cp){
var cItem = document.createElement("div");
cItem.className = "category-item" + (viewId === cp.id ? " active" : "");
cItem.innerHTML = '<i class="fa-solid ' + cp.icon + '"></i><span>' + cp.title + '</span>';
cItem.addEventListener("click", function(){ navigate(cp.id); });
subBody.appendChild(cItem);
});
subAcc.appendChild(subBody);
outerBody.appendChild(subAcc);
});
outerAcc.appendChild(outerBody);
secondaryNavList.appendChild(outerAcc);
}
} else {
secondarySidebar.classList.remove("visible");
secondaryNavList.innerHTML = "";
}
var mSheet = document.getElementById("mobileNavSheet");
if (mSheet) { mSheet.classList.remove("is-open"); mSheet.hidden = true; }
document.body.classList.remove("mobile-nav-open");
var mMenuBtn = document.getElementById("mobileMenuOpen");
if (mMenuBtn) mMenuBtn.setAttribute("aria-expanded", "false");
var mHomeBtn = document.getElementById("mobileChromeHome");
if (mHomeBtn) {
mHomeBtn.classList.toggle("mobile-app-chrome__home--active", viewId === "home");
mHomeBtn.setAttribute("aria-current", viewId === "home" ? "page" : "false");
}
document.querySelectorAll(".mobile-nav-sheet__item[data-main]").forEach(function(el){
el.classList.toggle("is-active", el.getAttribute("data-main") === mainKey);
});
/* Scroll content to top */
document.getElementById("mainContent").scrollTop = 0;
}
function goMainSection(main) {
if (main === "home") navigate("home");
else if (main === "foundation") navigate("icons");
else if (main === "components") navigate("form-fields");
else if (main === "versions") navigate("versions");
}
document.addEventListener("click", function(e){
var te = eventTargetElement(e);
if (!te) return;
var rail = te.closest(".nav-item--rail[data-main], .mobile-nav-sheet__item[data-main]");
if (!rail) return;
e.preventDefault();
goMainSection(rail.getAttribute("data-main"));
closeMobileNavSheet();
});
var mobileChromeLogo = document.getElementById("mobileChromeLogo");
if (mobileChromeLogo) {
mobileChromeLogo.addEventListener("click", function(){ navigate("home"); closeMobileNavSheet(); });
}
var mobileChromeHome = document.getElementById("mobileChromeHome");
if (mobileChromeHome) {
mobileChromeHome.addEventListener("click", function(){ navigate("home"); closeMobileNavSheet(); });
}
var mobileMenuOpen = document.getElementById("mobileMenuOpen");
if (mobileMenuOpen) {
mobileMenuOpen.addEventListener("click", function(){
var s = document.getElementById("mobileNavSheet");
if (!s) return;
if (s.hidden || !s.classList.contains("is-open")) openMobileNavSheet();
else closeMobileNavSheet();
});
}
var mobileNavBackdrop = document.getElementById("mobileNavSheetBackdrop");
if (mobileNavBackdrop) mobileNavBackdrop.addEventListener("click", closeMobileNavSheet);
var mobileNavClose = document.getElementById("mobileNavSheetClose");
if (mobileNavClose) mobileNavClose.addEventListener("click", closeMobileNavSheet);
document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeMobileNavSheet(); });
var brandLogo = document.querySelector(".brand-logo-container");
if (brandLogo) {
brandLogo.addEventListener("click", function(){ navigate("home"); });
brandLogo.addEventListener("keydown", function(e){ if (e.key === "Enter" || e.key === " ") { e.preventDefault(); navigate("home"); } });
}
/* Home card clicks */
document.querySelectorAll("[data-navigate]").forEach(function(el){
el.addEventListener("click", function(e){ e.preventDefault(); navigate(el.dataset.navigate); });
});
/* Component card clicks (drill into detail) */
document.querySelectorAll("[data-detail]").forEach(function(el){
el.addEventListener("click", function(){ navigate(el.dataset.detail); });
});
/* Accordion toggles */
document.querySelectorAll(".accordion-header").forEach(function(hdr){
hdr.addEventListener("click", function(e){
e.stopPropagation();
hdr.closest(".accordion").classList.toggle("open");
});
});
/* Show Code toggles */
document.querySelectorAll(".variant-code-toggle").forEach(function(btn){
btn.addEventListener("click", function(e){
e.stopPropagation();
var card = btn.closest(".variant-card") || btn.closest(".all-comp-item");
if (!card) return;
card.classList.toggle("code-visible");
btn.classList.toggle("active");
var isOpen = card.classList.contains("code-visible");
btn.innerHTML = isOpen ? '<i class="fa-solid fa-code"></i> Hide Code' : '<i class="fa-solid fa-code"></i> Show Code';
});
});
/* Code tabs */
document.querySelectorAll(".code-tabs").forEach(function(tabs){
tabs.querySelectorAll(".code-tab").forEach(function(tab){
tab.addEventListener("click", function(){
var panel = tabs.parentElement;
panel.querySelectorAll(".code-tab").forEach(function(t){ t.classList.remove("active"); });
panel.querySelectorAll(".code-tab-content").forEach(function(c){ c.classList.remove("active"); });
tab.classList.add("active");
panel.querySelector('.code-tab-content[data-tab="' + tab.dataset.tab + '"]').classList.add("active");
});
});
});
/* Copy buttons */
document.querySelectorAll(".code-copy-btn").forEach(function(btn){
btn.addEventListener("click", function(){
var code = btn.parentElement.querySelector("pre").textContent;
navigator.clipboard.writeText(code).then(function(){
btn.textContent = "Copied!";
setTimeout(function(){ btn.textContent = "Copy"; }, 1500);
});
});
});
/* Search functionality */
var allSearchable = [];
(function(){
var pages = sidebarData.foundation.concat(sidebarData.components).concat([{id:"tokens",title:"Design Tokens",icon:"fa-swatchbook"}]).concat([{id:"form-fields/text-input",title:"Text Input",icon:"fa-font"},{id:"form-fields/textarea",title:"Textarea",icon:"fa-align-left"},{id:"form-fields/number-input",title:"Number Input",icon:"fa-hashtag"},{id:"form-fields/decimal-input",title:"Decimal Input",icon:"fa-superscript"},{id:"form-fields/currency-input",title:"Currency Input",icon:"fa-dollar-sign"},{id:"form-fields/percent-input",title:"Percent Input",icon:"fa-percent"},{id:"form-fields/email-input",title:"Email Input",icon:"fa-at"},{id:"form-fields/phone-input",title:"Phone Input",icon:"fa-phone"},{id:"form-fields/url-input",title:"URL Input",icon:"fa-link"},{id:"form-fields/date-input",title:"Date Input",icon:"fa-calendar-day"},{id:"form-fields/datetime-input",title:"Datetime Input",icon:"fa-calendar-check"},{id:"form-fields/time-input",title:"Time Input",icon:"fa-clock"},{id:"form-fields/dropdown",title:"Dropdown",icon:"fa-chevron-down"},{id:"form-fields/multi-select",title:"Multi Select",icon:"fa-list-check"},{id:"form-fields/checkbox",title:"Checkbox",icon:"fa-square-check"},{id:"form-fields/radio-button",title:"Radio Button",icon:"fa-circle-dot"},{id:"form-fields/decision-box",title:"Decision Box",icon:"fa-toggle-on"},{id:"form-fields/name-field",title:"Name Field",icon:"fa-user"},{id:"form-fields/address-field",title:"Address Field",icon:"fa-map-pin"},{id:"form-fields/file-upload",title:"File Upload",icon:"fa-file-arrow-up"},{id:"form-fields/image-upload",title:"Image Upload",icon:"fa-image"},{id:"form-fields/audio-upload",title:"Audio Upload",icon:"fa-music"},{id:"form-fields/video-upload",title:"Video Upload",icon:"fa-video"},{id:"form-fields/rich-text",title:"Rich Text",icon:"fa-text-height"},{id:"form-fields/signature-field",title:"Signature Field",icon:"fa-pen-nib"},{id:"form-fields/section-separator",title:"Section Separator",icon:"fa-minus"},{id:"form-fields/form-buttons",title:"Form Buttons",icon:"fa-hand-pointer"}]).concat([{id:"reports/calendar-report",title:"Calendar Report",icon:"fa-calendar"},{id:"reports/kanban-report",title:"Kanban Report",icon:"fa-columns"},{id:"reports/timeline-report",title:"Timeline Report",icon:"fa-timeline"},{id:"reports/list-report",title:"List Report",icon:"fa-list"},{id:"reports/card-layout-types",title:"Card Report Layout Types",icon:"fa-sliders"}]).concat(allCardPages).concat([createComponentPage]);
pages.forEach(function(p){ allSearchable.push(p); });
})();
/* Sidebar search — filters category-item list */
var sidebarSearchInput = document.getElementById("sidebarSearchInput");
if (sidebarSearchInput) {
sidebarSearchInput.addEventListener("input", function(){
var q = sidebarSearchInput.value.toLowerCase().trim();
var items = secondaryNavList.querySelectorAll(".category-item");
items.forEach(function(item){
var text = item.textContent.toLowerCase();
item.style.display = (!q || text.indexOf(q) !== -1) ? "" : "none";
});
/* Also filter sidebar accordion items */
var accItems = secondaryNavList.querySelectorAll(".sidebar-accordion");
accItems.forEach(function(acc){
var innerItems = acc.querySelectorAll(".category-item");
var anyVisible = false;
innerItems.forEach(function(ci){
var t = ci.textContent.toLowerCase();
var show = !q || t.indexOf(q) !== -1;
ci.style.display = show ? "" : "none";
if (show) anyVisible = true;
});
acc.style.display = anyVisible || !q ? "" : "none";
if (q && anyVisible) acc.classList.add("open");
});
});
}
/* Grid search: form fields page */
function setupGridSearch(inputId, gridId) {
var input = document.getElementById(inputId);
var grid = document.getElementById(gridId);
if (!input || !grid) return;
input.addEventListener("input", function(){
var q = input.value.toLowerCase().trim();
var cards = grid.querySelectorAll(".component-card");
cards.forEach(function(card){
var title = card.getAttribute("data-search-title") || card.textContent.toLowerCase();
card.style.display = (!q || title.indexOf(q) !== -1) ? "" : "none";
});
});
input.addEventListener("keydown", function(e){
if (e.key === "Enter") {
var q = input.value.toLowerCase().trim();
if (!q) return;
var match = allSearchable.find(function(p){ return p.title.toLowerCase().indexOf(q) !== -1; });
if (match) { navigate(match.id); input.value = ""; input.blur(); }
}
});
}
setupGridSearch("formFieldSearchInput", "formFieldGrid");
setupGridSearch("reportSearchInput", "reportGrid");
/* Typography tokens: filter tables */
var typographyTokenSearchInput = document.getElementById("typographyTokenSearchInput");
if (typographyTokenSearchInput) {
typographyTokenSearchInput.addEventListener("input", function(){
var q = typographyTokenSearchInput.value.toLowerCase().trim();
var root = document.getElementById("view-tokens-typography");
if (!root) { return; }
root.querySelectorAll(".variant-card").forEach(function(card){
var rows = card.querySelectorAll("tbody tr");
if (rows.length) {
var anyRow = false;
rows.forEach(function(tr){
var show = !q || tr.textContent.toLowerCase().indexOf(q) !== -1;
tr.style.display = show ? "" : "none";
if (show) { anyRow = true; }
});
card.style.display = anyRow ? "" : "none";
} else {
var txt = card.textContent.toLowerCase();
card.style.display = (!q || txt.indexOf(q) !== -1) ? "" : "none";
}
});
});
}
/* Color tokens: filter swatches per category */
var colorTokenSearchInput = document.getElementById("colorTokenSearchInput");
if (colorTokenSearchInput) {
colorTokenSearchInput.addEventListener("input", function(){
var q = colorTokenSearchInput.value.toLowerCase().trim();
var root = document.getElementById("view-tokens-colors");
if (!root) { return; }
root.querySelectorAll(".variant-card").forEach(function(card){
var swatches = card.querySelectorAll(".color-swatch-card");
var any = false;
swatches.forEach(function(sc){
var show = !q || sc.textContent.toLowerCase().indexOf(q) !== -1;
sc.style.display = show ? "" : "none";
if (show) { any = true; }
});
card.style.display = any ? "" : "none";
});
});
}
/* ── Icon view: tab switching, search, copy ── */
(function(){
var tabs = document.querySelectorAll(".icon-view-tab");
var panels = document.querySelectorAll(".icon-tab-panel");
tabs.forEach(function(tab){
tab.addEventListener("click", function(){
tabs.forEach(function(t){ t.classList.remove("active"); });
panels.forEach(function(p){ p.classList.remove("active"); });
tab.classList.add("active");
var target = document.getElementById("icon-panel-" + tab.getAttribute("data-icon-tab"));
if (target) target.classList.add("active");
});
});
/* Search */
var searchInput = document.getElementById("iconSearchInput");
if (searchInput) {
searchInput.addEventListener("input", function(){
var q = searchInput.value.toLowerCase().trim();
var cards = document.querySelectorAll("#view-icons .icon-card");
cards.forEach(function(card){
var name = card.getAttribute("data-icon-name") || "";
card.classList.toggle("hidden", q && name.indexOf(q) === -1);
});
});
}
/* Copy tag on click */
document.querySelectorAll("#view-icons .icon-card").forEach(function(card){
card.addEventListener("click", function(){
var tag = card.querySelector(".icon-card-tag");
if (!tag) return;
var text = tag.textContent;
if (navigator.clipboard) {
navigator.clipboard.writeText(text);
} else {
var ta = document.createElement("textarea");
ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
}
var toast = document.createElement("div");
toast.className = "icon-card-copied";
toast.textContent = "Copied: " + text;
document.body.appendChild(toast);
setTimeout(function(){ toast.remove(); }, 1500);
});
});
})();
/* All components page search */
var allCompSearch = document.getElementById("allCompSearchInput");
if (allCompSearch) {
allCompSearch.addEventListener("input", function(){
var q = allCompSearch.value.toLowerCase().trim();
var items = document.querySelectorAll("#view-all .all-comp-item");
items.forEach(function(item){
var title = item.querySelector(".all-comp-item-title");
var text = title ? title.textContent.toLowerCase() : "";
item.style.display = (!q || text.indexOf(q) !== -1) ? "" : "none";
});
/* Also filter accordions in all view */
var accs = document.querySelectorAll("#view-all .accordion");
accs.forEach(function(acc){
var innerItems = acc.querySelectorAll(".all-comp-item");
var anyVisible = false;
innerItems.forEach(function(ai){
if (ai.style.display !== "none") anyVisible = true;
});
acc.style.display = anyVisible || !q ? "" : "none";
if (q && anyVisible) acc.classList.add("open");
});
});
allCompSearch.addEventListener("keydown", function(e){
if (e.key === "Enter") {
var q = allCompSearch.value.toLowerCase().trim();
if (!q) return;
var match = allSearchable.find(function(p){ return p.title.toLowerCase().indexOf(q) !== -1; });
if (match) { navigate(match.id); allCompSearch.value = ""; allCompSearch.blur(); }
}
});
}
/* Keyboard shortcut Cmd+K — focus nearest visible search */
document.addEventListener("keydown", function(e){
if ((e.metaKey || e.ctrlKey) && e.key === "k") {
e.preventDefault();
var activeView = document.querySelector(".view.active");
var inp = activeView ? activeView.querySelector(".inline-search input") : null;
if (!inp) inp = sidebarSearchInput;
if (inp) { inp.focus(); inp.select(); }
}
});
/* Reset sidebar search on navigate */
var origNavigate = navigate;
navigate = function(viewId, options) {
options = options || {};
origNavigate(viewId, options);
if (sidebarSearchInput) sidebarSearchInput.value = "";
if (!options.skipHash) {
var nextHash = "#" + encodeURIComponent(viewId);
if (window.location.hash !== nextHash) {
if (window.history && window.history.replaceState) window.history.replaceState(null, "", nextHash);
else window.location.hash = nextHash;
}
}
};
window.addEventListener("hashchange", function(){
var hashView = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "home";
if (hashView && hashView !== currentView) navigate(hashView, { skipHash: true });
});
var initialView = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : "home";
navigate(initialView, { skipHash: true });
/* Create component workflow */
(function(){
var promptInput = document.getElementById("createComponentPrompt");
var imageInput = document.getElementById("createComponentImageInput");
var imageClearBtn = document.getElementById("createComponentImageClearBtn");
var imageMeta = document.getElementById("createComponentImageMeta");
var imagePreview = document.getElementById("createComponentImagePreview");
var imagePreviewImg = document.getElementById("createComponentImagePreviewImg");
var imagePlaceholder = document.getElementById("createComponentImagePlaceholder");
var generateBtn = document.getElementById("createComponentGenerateBtn");
var serverNote = document.getElementById("createComponentServerNote");
var statusEl = document.getElementById("createComponentStatus");
var previewEmpty = document.getElementById("createComponentPreviewEmpty");
var previewBody = document.getElementById("createComponentPreviewBody");
var idValue = document.getElementById("createComponentIdValue");
var folderValue = document.getElementById("createComponentFolderValue");
var typeValue = document.getElementById("createComponentTypeValue");
var sourceValue = document.getElementById("createComponentSourceValue");
var layoutValue = document.getElementById("createComponentLayoutValue");
var stateList = document.getElementById("createComponentStateList");
var assumptionList = document.getElementById("createComponentAssumptionList");
var ambiguityList = document.getElementById("createComponentAmbiguityList");
var fileList = document.getElementById("createComponentFileList");
var reloadBtn = document.getElementById("createComponentReloadBtn");
var useOllamaCheckbox = document.getElementById("createComponentUseOllama");
var ollamaRow = document.getElementById("createComponentOllamaRow");
var ollamaModelInput = document.getElementById("createComponentOllamaModel");
var previewTimer = null;
var previewRequestId = 0;
var imageAnalysisRequestId = 0;
var apiReady = false;
var isSubmitting = false;
var lastCreatedViewId = "";
var selectedImageReference = null;
var selectedImageDataUrl = "";
var serverHelpMessage = "Component creation requires node _design-library-server.js. Open this page from that local server and reload it.";
generateBtn.disabled = true;
function setStatus(message, tone) {
statusEl.textContent = message;
statusEl.className = "create-comp-status" + (tone ? " is-" + tone : "");
}
function formatLabel(value) {
return String(value || "").replace(/[-_]+/g, " ").replace(/w/g, function(chr) { return chr.toUpperCase(); });
}
function formatInferenceSource(value) {
if (value === "prompt+image") return "Prompt + Image";
if (value === "prompt") return "Prompt";
if (value === "image") return "Image";
return "—";
}
function renderTextList(listEl, items, emptyMessage) {
listEl.innerHTML = "";
var values = Array.isArray(items) ? items.filter(Boolean) : [];
if (!values.length) values = [emptyMessage];
values.forEach(function(text) {
var item = document.createElement("li");
item.textContent = text;
listEl.appendChild(item);
});
}
function renderStateList(items) {
stateList.innerHTML = "";
var values = Array.isArray(items) ? items.filter(Boolean) : [];
if (!values.length) values = ["default"];
values.forEach(function(text) {
var item = document.createElement("li");
item.textContent = formatLabel(text).replace(/Otp/g, "OTP");
stateList.appendChild(item);
});
}
function updateGenerateAvailability() {
var hasInput = !!promptInput.value.trim() || !!selectedImageReference;
generateBtn.disabled = !apiReady || !hasInput || isSubmitting;
}
function setImagePreview(dataUrl) {
if (dataUrl) {
imagePreview.classList.remove("is-empty");
imagePreviewImg.hidden = false;
imagePreviewImg.src = dataUrl;
imagePlaceholder.hidden = true;
imageClearBtn.hidden = false;
} else {
imagePreview.classList.add("is-empty");
imagePreviewImg.hidden = true;
imagePreviewImg.removeAttribute("src");
imagePlaceholder.hidden = false;
imagePlaceholder.textContent = "No image reference selected.";
imageClearBtn.hidden = true;
}
}
function resetPreview() {
previewEmpty.hidden = false;
previewBody.hidden = true;
idValue.textContent = "—";
folderValue.textContent = "—";
typeValue.textContent = "—";
sourceValue.textContent = "—";
layoutValue.textContent = "—";
renderStateList([]);
renderTextList(assumptionList, [], "No extra assumptions.");
renderTextList(ambiguityList, [], "No open ambiguities.");
fileList.innerHTML = "";
reloadBtn.hidden = true;
lastCreatedViewId = "";
}
function renderPreview(data) {
var hasPreview = !!(data && (data.componentId || data.inferredLayout || data.scaffoldType || (data.assumptions && data.assumptions.length) || (data.ambiguities && data.ambiguities.length)));
if (!hasPreview) { resetPreview(); return; }
previewEmpty.hidden = true;
previewBody.hidden = false;
idValue.textContent = data.componentId || "Needs clarification";
folderValue.textContent = data.folderPath || "—";
typeValue.textContent = formatLabel(data.scaffoldType || data.inferredComponentType || "generic").replace(/Otp/g, "OTP");
sourceValue.textContent = formatInferenceSource(data.inferenceSource);
layoutValue.textContent = data.inferredLayout || "—";
renderStateList(data.detectedStates || []);
renderTextList(assumptionList, data.assumptions, "No extra assumptions.");
renderTextList(ambiguityList, data.ambiguities, "No open ambiguities.");
fileList.innerHTML = "";
(data.files || []).forEach(function(file) {
var item = document.createElement("li");
item.textContent = file;
fileList.appendChild(item);
});
}
function setServerNote(message, ready) {
serverNote.textContent = message;
apiReady = !!ready;
updateGenerateAvailability();
}
function fetchJson(url, options) {
return fetch(url, options).then(function(response) {
return response.json().catch(function() { return {}; }).then(function(data) {
if (!response.ok) {
var error = new Error(data && data.message ? data.message : "Request failed");
error.data = data || {};
throw error;
}
return data;
});
});
}
function normalizeHintText(value) {
return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function roundNumber(value, digits) {
var factor = Math.pow(10, digits || 0);
return Math.round(value * factor) / factor;
}
function readFileAsDataUrl(file) {
return new Promise(function(resolve, reject) {
var reader = new FileReader();
reader.onload = function() { resolve(String(reader.result || "")); };
reader.onerror = function() { reject(new Error("Unable to read the selected image.")); };
reader.readAsDataURL(file);
});
}
function loadImage(dataUrl) {
return new Promise(function(resolve, reject) {
var img = new Image();
img.onload = function() { resolve(img); };
img.onerror = function() { reject(new Error("Unable to load the selected image.")); };
img.src = dataUrl;
});
}
function resizeImageToDataUrl(img, maxSide) {
var nw = img.naturalWidth || img.width || 0;
var nh = img.naturalHeight || img.height || 0;
if (!nw || !nh) return "";
var scale = Math.min(1, maxSide / Math.max(nw, nh));
var w2 = Math.max(1, Math.round(nw * scale));
var h2 = Math.max(1, Math.round(nh * scale));
var canvas = document.createElement("canvas");
canvas.width = w2; canvas.height = h2;
var ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0, w2, h2);
try { return canvas.toDataURL("image/jpeg", 0.85); }
catch (e) { return canvas.toDataURL("image/png"); }
}
function findRuns(values, threshold, minLength) {
var runs = [];
var start = -1;
for (var index = 0; index < values.length; index += 1) {
if (values[index] >= threshold) {
if (start === -1) start = index;
} else if (start !== -1) {
if (index - start >= minLength) runs.push({ start: start, end: index - 1, width: index - start });
start = -1;
}
}
if (start !== -1 && values.length - start >= minLength) {
runs.push({ start: start, end: values.length - 1, width: values.length - start });
}
return runs;
}
function averageRunWidth(runs) {
if (!runs.length) return 0;
return runs.reduce(function(total, run) { return total + run.width; }, 0) / runs.length;
}
function inferStatesFromImageName(fileName) {
var text = normalizeHintText(fileName);
var states = ["default"];
if (/required|mandatory/.test(text)) states.push("required");
if (/disabled|readonly|read only/.test(text)) states.push("disabled");
if (/error|validation/.test(text)) states.push("error");
return states;
}
function analyzeImageReference(file, img, dataUrl) {
var naturalWidth = img.naturalWidth || img.width || 0;
var naturalHeight = img.naturalHeight || img.height || 0;
var aspectRatio = naturalWidth && naturalHeight ? naturalWidth / naturalHeight : 0;
var maxSide = 96;
var scale = Math.min(1, maxSide / Math.max(naturalWidth || 1, naturalHeight || 1));
var width = Math.max(16, Math.round(naturalWidth * scale));
var height = Math.max(16, Math.round(naturalHeight * scale));
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d", { willReadFrequently: true });
var columnCounts = new Array(width).fill(0);
var rowCounts = new Array(height).fill(0);
var bandCounts = new Array(width).fill(0);
var foregroundCount = 0;
var bandStart = Math.max(0, Math.floor(height * 0.32));
var bandEnd = Math.min(height - 1, Math.ceil(height * 0.78));
var fileHint = normalizeHintText(file && file.name);
canvas.width = width;
canvas.height = height;
ctx.drawImage(img, 0, 0, width, height);
var pixels = ctx.getImageData(0, 0, width, height).data;
var backgroundSamples = [];
var samplePoints = [
[0, 0],
[width - 1, 0],
[0, height - 1],
[width - 1, height - 1],
[Math.floor(width / 2), 0],
[Math.floor(width / 2), height - 1]
];
samplePoints.forEach(function(point) {
var idx = (point[1] * width + point[0]) * 4;
var alpha = pixels[idx + 3] / 255;
var brightness = (pixels[idx] * 0.299 + pixels[idx + 1] * 0.587 + pixels[idx + 2] * 0.114) * alpha + 255 * (1 - alpha);
backgroundSamples.push(brightness);
});
var backgroundBrightness = backgroundSamples.reduce(function(total, value) { return total + value; }, 0) / Math.max(backgroundSamples.length, 1);
for (var y = 0; y < height; y += 1) {
for (var x = 0; x < width; x += 1) {
var offset = (y * width + x) * 4;
var alpha = pixels[offset + 3] / 255;
var brightness = (pixels[offset] * 0.299 + pixels[offset + 1] * 0.587 + pixels[offset + 2] * 0.114) * alpha + 255 * (1 - alpha);
var isForeground = alpha > 0.08 && Math.abs(brightness - backgroundBrightness) > 44;
if (!isForeground) continue;
foregroundCount += 1;
columnCounts[x] += 1;
rowCounts[y] += 1;
if (y >= bandStart && y <= bandEnd) bandCounts[x] += 1;
}
}
var bandHeight = Math.max(1, bandEnd - bandStart + 1);
var midBandRatios = bandCounts.map(function(count) { return count / bandHeight; });
var rowRatios = rowCounts.map(function(count) { return count / width; });
var midRuns = findRuns(midBandRatios, 0.08, 2);
var rowRuns = findRuns(rowRatios, 0.08, 2);
var avgRunWidth = averageRunWidth(midRuns);
var foregroundRatio = foregroundCount / Math.max(width * height, 1);
var wireframeLike = foregroundRatio <= 0.17;
var wideControl = midRuns.length <= 2 && aspectRatio >= 2.2 && rowRuns.length <= 5;
var otpLike = midRuns.length >= 4 && midRuns.length <= 8 && aspectRatio >= 1.8 && wireframeLike && avgRunWidth <= width * 0.22;
var ratingLike = midRuns.length >= 4 && midRuns.length <= 6 && aspectRatio >= 1.5 && avgRunWidth <= width * 0.18 && foregroundRatio >= 0.03;
if (/otp|passcode|verification/.test(fileHint)) otpLike = true;
if (/rating|star|feedback|review/.test(fileHint)) ratingLike = true;
var inferredType = "generic";
var inferredName = "";
var layout = "";
var confidence = "low";
var assumptions = [];
var ambiguities = [];
if (otpLike && !ratingLike) {
inferredType = "otp";
inferredName = "OTP Field";
layout = Math.max(4, Math.min(8, midRuns.length || 6)) + " horizontally arranged single-character input boxes";
confidence = midRuns.length >= 6 ? "high" : "medium";
assumptions.push("The repeated box pattern was interpreted as a verification-code style input.");
} else if (ratingLike && !otpLike) {
inferredType = "rating";
inferredName = "Rating Field";
layout = Math.max(4, Math.min(6, midRuns.length || 5)) + " horizontally arranged choice controls";
confidence = midRuns.length === 5 ? "high" : "medium";
assumptions.push("The repeated compact controls were interpreted as a rating selector.");
} else if (wideControl) {
inferredType = "generic";
inferredName = "Text Input Field";
layout = "single horizontal control with a standard label and validation states";
confidence = "medium";
assumptions.push("The image looks closest to a single input control, so a generic starter scaffold will be used unless the prompt specifies more detail.");
} else {
ambiguities.push("The image is too ambiguous to identify a specialized field safely.");
assumptions.push("Add a short prompt if you want a more specific scaffold name or interaction pattern.");
}
return {
previewUrl: dataUrl,
reference: {
fileName: file && file.name ? file.name : "image-reference",
mimeType: file && file.type ? file.type : "image/*",
width: naturalWidth,
height: naturalHeight,
aspectRatio: aspectRatio ? roundNumber(aspectRatio, 3) : 0,
inferredType: inferredType,
inferredName: inferredName,
layout: layout,
confidence: confidence,
detectedStates: inferStatesFromImageName(file && file.name),
assumptions: assumptions,
ambiguities: ambiguities
}
};
}
function buildRequestPayload() {
var useOllama = !!(useOllamaCheckbox && useOllamaCheckbox.checked);
return {
prompt: promptInput.value.trim(),
imageReference: selectedImageReference,
imageDataUrl: useOllama ? selectedImageDataUrl : "",
useOllama: useOllama,
ollamaModel: useOllama && ollamaModelInput ? ollamaModelInput.value.trim() : ""
};
}
function requestPreview() {
var payload = buildRequestPayload();
var hasInput = !!payload.prompt || !!payload.imageReference;
previewRequestId += 1;
var requestId = previewRequestId;
updateGenerateAvailability();
if (!hasInput) {
resetPreview();
setStatus("Enter a prompt or attach an image to preview the generated folder and file names.");
return;
}
fetchJson("/__design-library/component-preview", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload)
}).then(function(data) {
if (requestId !== previewRequestId) return;
renderPreview(data);
setStatus(data.message, data.code === "READY" ? "success" : "error");
}).catch(function(error) {
if (requestId !== previewRequestId) return;
resetPreview();
setServerNote(serverHelpMessage, false);
setStatus(error.message || "Unable to preview the component scaffold.", "error");
});
}
function schedulePreview() {
clearTimeout(previewTimer);
previewTimer = setTimeout(requestPreview, 250);
}
function clearSelectedImage(options) {
selectedImageReference = null;
selectedImageDataUrl = "";
if (!options || options.clearInput !== false) imageInput.value = "";
imageMeta.textContent = "No image reference selected.";
setImagePreview("");
updateGenerateAvailability();
}
function handleImageSelection(file) {
imageAnalysisRequestId += 1;
var requestId = imageAnalysisRequestId;
if (!file) {
clearSelectedImage();
schedulePreview();
return;
}
imageMeta.textContent = "Analyzing image reference…";
imagePlaceholder.textContent = "Analyzing image reference…";
setImagePreview("");
setStatus("Analyzing image reference…", "working");
readFileAsDataUrl(file).then(function(dataUrl) {
return loadImage(dataUrl).then(function(img) {
var analysis = analyzeImageReference(file, img, dataUrl);
analysis._resizedUrl = resizeImageToDataUrl(img, 1024);
return analysis;
});
}).then(function(result) {
if (requestId !== imageAnalysisRequestId) return;
selectedImageReference = result.reference;
selectedImageDataUrl = result._resizedUrl || result.previewUrl || "";
imageMeta.textContent = result.reference.fileName + " • " + result.reference.width + "×" + result.reference.height + " • " + formatLabel(result.reference.confidence) + " confidence";
setImagePreview(result.previewUrl);
updateGenerateAvailability();
schedulePreview();
}).catch(function(error) {
if (requestId !== imageAnalysisRequestId) return;
clearSelectedImage({ clearInput: false });
setStatus(error.message || "Unable to analyze the selected image.", "error");
});
}
fetchJson("/__design-library/status").then(function() {
setServerNote("Local scaffold API ready. Generated files will be written under forms/.", true);
}).catch(function() {
setServerNote(serverHelpMessage, false);
setStatus(serverHelpMessage, "error");
});
promptInput.addEventListener("input", function() {
schedulePreview();
});
imageInput.addEventListener("change", function() {
var file = imageInput.files && imageInput.files[0];
handleImageSelection(file || null);
});
imageClearBtn.addEventListener("click", function() {
clearSelectedImage();
schedulePreview();
});
if (useOllamaCheckbox) {
useOllamaCheckbox.addEventListener("change", function() {
if (ollamaRow) ollamaRow.hidden = !useOllamaCheckbox.checked;
});
}
/* Cmd+V / Ctrl+V — paste an image from clipboard while on the create-component view */
document.addEventListener("paste", function(event) {
var view = document.getElementById("view-create-component");
if (!view || !view.classList.contains("active")) return;
var items = event.clipboardData && event.clipboardData.items ? event.clipboardData.items : null;
if (!items) return;
for (var i = 0; i < items.length; i += 1) {
var item = items[i];
if (item && item.kind === "file" && /^image\//.test(item.type)) {
var blob = item.getAsFile();
if (blob) {
event.preventDefault();
/* Wrap as File so the existing handler treats it like an upload */
var ext = (item.type.split("/")[1] || "png").replace(/[^a-z0-9]+/gi, "");
var fileName = "pasted-screenshot-" + Date.now() + "." + ext;
var pastedFile;
try { pastedFile = new File([blob], fileName, { type: item.type }); }
catch (e) { pastedFile = blob; pastedFile.name = fileName; }
handleImageSelection(pastedFile);
return;
}
}
}
});
generateBtn.addEventListener("click", function() {
var payload = buildRequestPayload();
if (!payload.prompt && !payload.imageReference) {
resetPreview();
setStatus("Enter a prompt or attach an image before generating a component scaffold.", "error");
return;
}
if (!apiReady) {
setStatus(serverHelpMessage, "error");
return;
}
isSubmitting = true;
updateGenerateAvailability();
setStatus("Generating component scaffold…", "working");
fetchJson("/__design-library/create-component", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload)
}).then(function(data) {
renderPreview(data);
lastCreatedViewId = data.viewId || ("form-fields/" + data.componentId);
reloadBtn.hidden = false;
setStatus("Component scaffold created successfully. The design library was rebuilt and is ready to reload.", "success");
}).catch(function(error) {
var data = error.data || {};
if (data.componentId) renderPreview(data);
setStatus(error.message || "Unable to create the component scaffold.", "error");
}).finally(function() {
isSubmitting = false;
updateGenerateAvailability();
});
});
reloadBtn.addEventListener("click", function() {
if (!lastCreatedViewId) return;
window.location.hash = encodeURIComponent(lastCreatedViewId);
window.location.reload();
});
clearSelectedImage();
resetPreview();
updateGenerateAvailability();
})();
/* Card Layout Configurator */
(function(){
var cfgEl = {
cardType: document.getElementById("cfgCardType"),
shape: document.getElementById("cfgShape"),
position: document.getElementById("cfgPosition"),
lineType: document.getElementById("cfgLineType"),
shapeGroup: document.getElementById("cfgShapeGroup"),
posGroup: document.getElementById("cfgPosGroup"),
align: document.getElementById("cfgAlign"),
alignGroup: document.getElementById("cfgAlignGroup"),
preview: document.getElementById("cfgPreview"),
previewTitle: document.getElementById("cfgPreviewTitle"),
codeHtml: document.getElementById("cfgCodeHtml"),
codeCss: document.getElementById("cfgCodeCss"),
variantCard: document.getElementById("cfgVariantCard")
};
if (!cfgEl.cardType) return;
var variantMap = {
"card1-left-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line"><div class="recordTab"><div class="gridpad"><div class="gridTitle">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad&quot;&gt;\n        &lt;div class=&quot;gridTitle&quot;&gt;\n          TVS Emerald Elements\n        &lt;/div&gt;\n        &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n          1, 2, 3, 4 BHK\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 1 — Left Single Line"},
"card1-left-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline"><div class="recordTab"><div class="gridpad"><div class="gridTitle">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad&quot;&gt;\n        &lt;div class=&quot;gridTitle&quot;&gt;\n          TVS Emerald Elements\n        &lt;/div&gt;\n        &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n          &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n            Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n          &lt;/span&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 1 — Left Multi Line"},
"card1-centre-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line record-text-center"><div class="recordTab"><div class="gridpad"><div class="gridTitle">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line record-text-center&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad&quot;&gt;\n        &lt;div class=&quot;gridTitle&quot;&gt;\n          TVS Emerald Elements\n        &lt;/div&gt;\n        &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n          1, 2, 3, 4 BHK\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 1 — Centre Single Line"},
"card1-centre-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline record-text-center"><div class="recordTab"><div class="gridpad"><div class="gridTitle">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline record-text-center&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad&quot;&gt;\n        &lt;div class=&quot;gridTitle&quot;&gt;\n          TVS Emerald Elements\n        &lt;/div&gt;\n        &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n          &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n            Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n          &lt;/span&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 1 — Centre Multi Line"},
"card2-left-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line"><div class="recordTab"><div class="gridpad"><div class="gridTitle">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div><div class="zc-dem-qv-tinylight zc-dem-qv-tinylight-three-column zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">20-October-23 10:19:28 PM</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad&quot;&gt;\n        &lt;div class=&quot;gridTitle&quot;&gt;\n          TVS Emerald Elements\n        &lt;/div&gt;\n        &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n          1, 2, 3, 4 BHK\n        &lt;/div&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-qv-tinylight-three-column zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          £ 6,990,000.00\n        &lt;/div&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          20-October-23 10:19:28 PM\n        &lt;/div&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          New Launch and it will be ready on upcoming months.\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 2 — Left Single Line"},
"card2-left-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline"><div class="recordTab"><div class="gridpad"><div class="gridTitle">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div><div class="zc-dem-qv-tinylight zc-dem-qv-tinylight-three-column zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">20-October-23 10:19:28 PM</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad&quot;&gt;\n        &lt;div class=&quot;gridTitle&quot;&gt;\n          TVS Emerald Elements\n        &lt;/div&gt;\n        &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n          &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n            Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n          &lt;/span&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-qv-tinylight-three-column zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          £ 6,990,000.00\n        &lt;/div&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          20-October-23 10:19:28 PM\n        &lt;/div&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          New Launch and it will be ready on upcoming months.\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 2 — Left Multi Line"},
"card2-centre-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line record-text-center"><div class="recordTab"><div class="gridpad"><div class="gridTitle">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div><div class="zc-dem-qv-tinylight zc-dem-qv-tinylight-three-column zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">20-October-23 10:19:28 PM</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line record-text-center&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad&quot;&gt;\n        &lt;div class=&quot;gridTitle&quot;&gt;\n          TVS Emerald Elements\n        &lt;/div&gt;\n        &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n          1, 2, 3, 4 BHK\n        &lt;/div&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-qv-tinylight-three-column zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          £ 6,990,000.00\n        &lt;/div&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          20-October-23 10:19:28 PM\n        &lt;/div&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          New Launch and it will be ready on upcoming months.\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 2 — Centre Single Line"},
"card2-centre-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline record-text-center"><div class="recordTab"><div class="gridpad"><div class="gridTitle">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div><div class="zc-dem-qv-tinylight zc-dem-qv-tinylight-three-column zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">20-October-23 10:19:28 PM</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline record-text-center&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad&quot;&gt;\n        &lt;div class=&quot;gridTitle&quot;&gt;\n          TVS Emerald Elements\n        &lt;/div&gt;\n        &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n          &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n            Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n          &lt;/span&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-qv-tinylight-three-column zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          £ 6,990,000.00\n        &lt;/div&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          20-October-23 10:19:28 PM\n        &lt;/div&gt;\n        &lt;div class=&quot;qv-tinylight&quot;&gt;\n          New Launch and it will be ready on upcoming months.\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 2 — Centre Multi Line"},
"card3-square-left-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Square Left Single Line"},
"card3-square-left-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Square Left Multi Line"},
"card3-square-right-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Square Right Single Line"},
"card3-square-right-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Square Right Multi Line"},
"card3-square-top-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Square Top Single Line"},
"card3-square-top-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Square Top Multi Line"},
"card3-square-bottom-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Square Bottom Single Line"},
"card3-square-bottom-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Square Bottom Multi Line"},
"card3-circle-left-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line rImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line rImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Circle Left Single Line"},
"card3-circle-left-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline rImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline rImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Circle Left Multi Line"},
"card3-circle-right-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line rImg record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line rImg record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Circle Right Single Line"},
"card3-circle-right-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline rImg record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline rImg record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Circle Right Multi Line"},
"card3-circle-top-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line rImg record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line rImg record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Circle Top Single Line"},
"card3-circle-top-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline rImg record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline rImg record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Circle Top Multi Line"},
"card3-circle-bottom-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line rImg record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line rImg record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Circle Bottom Single Line"},
"card3-circle-bottom-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline rImg record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline rImg record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Circle Bottom Multi Line"},
"card3-full-left-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line hImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line hImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Full Left Single Line"},
"card3-full-left-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline hImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline hImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Full Left Multi Line"},
"card3-full-right-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line hImg record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line hImg record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Full Right Single Line"},
"card3-full-right-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline hImg record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline hImg record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Full Right Multi Line"},
"card3-full-top-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line hImg record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line hImg record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Full Top Single Line"},
"card3-full-top-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline hImg record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline hImg record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Full Top Multi Line"},
"card3-full-bottom-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line hImg record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line hImg record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Full Bottom Single Line"},
"card3-full-bottom-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline hImg record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline hImg record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 3 — Full Bottom Multi Line"},
"card4-square-left-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Square Left Single Line"},
"card4-square-left-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Square Left Multi Line"},
"card4-square-right-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Square Right Single Line"},
"card4-square-right-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Square Right Multi Line"},
"card4-square-top-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Square Top Single Line"},
"card4-square-top-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Square Top Multi Line"},
"card4-square-bottom-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Square Bottom Single Line"},
"card4-square-bottom-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Square Bottom Multi Line"},
"card4-circle-left-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView rImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView rImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Circle Left Single Line"},
"card4-circle-left-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView rImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView rImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Circle Left Multi Line"},
"card4-circle-right-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView rImg record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView rImg record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Circle Right Single Line"},
"card4-circle-right-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView rImg record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView rImg record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Circle Right Multi Line"},
"card4-circle-top-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView rImg record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView rImg record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Circle Top Single Line"},
"card4-circle-top-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView rImg record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView rImg record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Circle Top Multi Line"},
"card4-circle-bottom-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView rImg record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView rImg record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Circle Bottom Single Line"},
"card4-circle-bottom-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView rImg record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView rImg record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Circle Bottom Multi Line"},
"card4-full-left-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView hImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView hImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Full Left Single Line"},
"card4-full-left-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView hImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView hImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Full Left Multi Line"},
"card4-full-right-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView hImg record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView hImg record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Full Right Single Line"},
"card4-full-right-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView hImg record-img-right"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol recTxtRight"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div><div class="recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView hImg record-img-right&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol recTxtRight&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n            &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                £ 6,990,000.00\n              &lt;/div&gt;\n              &lt;div class=&quot;qv-tinylight&quot;&gt;\n                New Launch and it will be ready on upcoming months.\n              &lt;/div&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n        &lt;div class=&quot;recordCol recImgCont zc-no-shrink&quot;&gt;\n          &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n            &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n              &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n            &lt;/a&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Full Right Multi Line"},
"card4-full-top-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView hImg record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView hImg record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Full Top Single Line"},
"card4-full-top-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView hImg record-img-top"><div class="recordCen"><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView hImg record-img-top&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Full Top Multi Line"},
"card4-full-bottom-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordTinyView hImg record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont">1, 2, 3, 4 BHK</div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordTinyView hImg record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        1, 2, 3, 4 BHK\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Full Bottom Single Line"},
"card4-full-bottom-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordTinyView hImg record-img-btm"><div class="recordCen"><div class="gridTitle elp v-Spacer">TVS Emerald Elements</div><div class="gridCont"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div><div class="recImg recImgCont zc-flex zc-align-items-center zc-justify-center"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">£ 6,990,000.00</div><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordTinyView hImg record-img-btm&quot;&gt;\n    &lt;div class=&quot;recordCen&quot;&gt;\n      &lt;div class=&quot;gridTitle elp v-Spacer&quot;&gt;\n        TVS Emerald Elements\n      &lt;/div&gt;\n      &lt;div class=&quot;gridCont&quot;&gt;\n        &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n          Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n        &lt;/span&gt;\n      &lt;/div&gt;\n      &lt;div class=&quot;recImg recImgCont zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n        &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        £ 6,990,000.00\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 4 — Full Bottom Multi Line"},
"card5-single-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-single-line recordKanban rImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer">1, 2, 3, 4 BHK</div></div></div></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div><div class="qv-tinylight recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-single-line recordKanban rImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              1, 2, 3, 4 BHK\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight recordCol recImgCont zc-no-shrink&quot;&gt;\n        &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n          &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n            &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n          &lt;/a&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 5 — Single Line"},
"card5-multi-line": {html:'<div class="zc-card-list zc-flex zc-direction-column zc-gap-12"><div class="record recordlive zc-multiline recordKanban rImg"><div class="recordTab"><div class="gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start"><div class="recordCol"><div class="hL-spacer"><div class="gridTitle elp">TVS Emerald Elements</div><div class="gridCont vT-Spacer"><span class="zc-multi-line-space">Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29</span></div></div></div></div></div><div class="zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12"><div class="qv-tinylight">New Launch and it will be ready on upcoming months.</div><div class="qv-tinylight recordCol recImgCont zc-no-shrink"><div class="recImg zc-flex zc-align-items-center zc-justify-center"><a href="javascript:;" class="zc-image-placeholder" fieldtype="20"><img src="data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E" alt="Image" class="zc-image-view" style="width:100%;height:100%;object-fit:cover;"></a></div></div></div></div></div>',fmtHtml:'&lt;div class=&quot;zc-card-list zc-flex zc-direction-column zc-gap-12&quot;&gt;\n  &lt;div class=&quot;record recordlive zc-multiline recordKanban rImg&quot;&gt;\n    &lt;div class=&quot;recordTab&quot;&gt;\n      &lt;div class=&quot;gridpad gridpad-table zc-flex zc-gap-14 zc-align-items-start&quot;&gt;\n        &lt;div class=&quot;recordCol&quot;&gt;\n          &lt;div class=&quot;hL-spacer&quot;&gt;\n            &lt;div class=&quot;gridTitle elp&quot;&gt;\n              TVS Emerald Elements\n            &lt;/div&gt;\n            &lt;div class=&quot;gridCont vT-Spacer&quot;&gt;\n              &lt;span class=&quot;zc-multi-line-space&quot;&gt;\n                Here are beautifully built 1,2,3 BHK apartments in Pallikaranai, available for sale at Lakevista at Purva Windermere. Lakevista at Purva Windermere has apartments in multiple configurations, in range of 379 - 811 sq.ft.. Lakevista at Purva Windermere is a RERA- registered society and TN/29\n              &lt;/span&gt;\n            &lt;/div&gt;\n          &lt;/div&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n    &lt;div class=&quot;zc-dem-qv-tinylight zc-dem-clearfix zc-flex zc-gap-12&quot;&gt;\n      &lt;div class=&quot;qv-tinylight&quot;&gt;\n        New Launch and it will be ready on upcoming months.\n      &lt;/div&gt;\n      &lt;div class=&quot;qv-tinylight recordCol recImgCont zc-no-shrink&quot;&gt;\n        &lt;div class=&quot;recImg zc-flex zc-align-items-center zc-justify-center&quot;&gt;\n          &lt;a href=&quot;javascript:;&quot; class=&quot;zc-image-placeholder&quot; fieldtype=&quot;20&quot;&gt;\n            &lt;img src=&quot;data:image/svg+xml,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20viewBox%3D\'0%200%20200%20200\'%3E%3Crect%20width%3D\'200\'%20height%3D\'200\'%20fill%3D\'%23f0f1f5\'%2F%3E%3Cpath%20d%3D\'M75%20110l25-30%2025%2030z%20M65%20150h70l-15-22-10%2013-10-7z\'%20fill%3D\'%23b0b0c2\'%2F%3E%3C%2Fsvg%3E&quot; alt=&quot;Image&quot; class=&quot;zc-image-view&quot; style=&quot;width:100%;height:100%;object-fit:cover;&quot;&gt;\n          &lt;/a&gt;\n        &lt;/div&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;',fmtCss:'/* Card Record Base */\n.zc-card-list  {\n}\n.record  {\n  background: #fff;\n  border-radius: 10px;\n  box-shadow: 0 1px 0 0 rgba(176,176,194,0.36);\n  cursor: pointer;\n  transition: box-shadow 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.record:hover  {\n  box-shadow: 0 2px 8px rgba(176,176,194,0.4);\n}\n.zc-dem-card-more  {\n  display: none;\n}\n.recordTab  {\n}\n.gridpad  {\n  padding: 14px;\n}\n.gridpad-table  {\n}\n.gridTitle  {\n  font-size: 16px;\n  font-weight: 600;\n  color: #12132b;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.gridTitle.elp  {\n  white-space: nowrap;\n}\n.gridCont  {\n  font-size: 14px;\n  color: #2f305d;\n  line-height: 1.5;\n}\n.vT-Spacer  {\n  margin-top: 6px;\n}\n.v-Spacer  {\n  margin-bottom: 6px;\n}\n.hL-spacer  {\n}\n.recordCol  {\n  min-width: 0;\n}\n.recTxtRight  {\n}\n.zc-multi-line-space  {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.zc-single-line .gridCont  {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/* Images */\n.recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: #f0f1f5;\n}\n.recImg img, .recImg .zc-image-view  {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.zc-image-placeholder  {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/* Circle image */\n.rImg .recImg  {\n  border-radius: 50%;\n}\n/* Full/tall image */\n.hImg .recImgCont  {\n  width: 123px;\n  height: 123px;\n}\n.hImg .recImgCont .recImg  {\n  width: 123px;\n  min-width: 123px;\n  height: 123px;\n  align-self: stretch;\n}\n.hImg .recordTab  {\n  display: flex;\n}\n.hImg .gridpad-table  {\n  flex: 1;\n}\n/* Right image */\n.record-img-right .gridpad-table  {\n  justify-content: space-between;\n}\n/* Top image */\n.record-img-top .recordCen  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-top .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n/* Bottom image */\n.record-img-btm .recordCen  {\n  display: flex;\n  flex-direction: column-reverse;\n  align-items: center;\n  padding: 14px;\n  text-align: center;\n}\n.record-img-btm .recImg.recImgCont  {\n  width: 123px;\n  height: 123px;\n  min-width: 123px;\n  border-radius: 14px;\n  margin-top: 12px;\n  overflow: hidden;\n}\n/* Tinylight fields */\n.zc-dem-qv-tinylight  {\n  padding: 8px 14px;\n  border-top: 1px solid #f0f1f5;\n}\n.zc-dem-qv-tinylight-three-column .qv-tinylight  {\n  flex: 1;\n}\n.qv-tinylight  {\n  font-size: 13px;\n  color: #12132b;\n  font-weight: 500;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.zc-dem-clearfix::after  {\n  content: &quot;&quot;;\n  display: table;\n  clear: both;\n}\n/* Kanban (Card 5) */\n.recordKanban .zc-dem-qv-tinylight  {\n  padding: 10px 14px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImgCont  {\n  width: 64px;\n  height: 64px;\n}\n.recordKanban .zc-dem-qv-tinylight .recImg  {\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n  border-radius: 50%;\n}\n/* TinyView (Card 4) */\n.recordTinyView .hL-spacer  {\n}\n/* No image placeholder */\n.noRecImage  {\n  width: 100%;\n  height: 100%;\n  background: #f0f1f5;\n}\n.noRecImageCrop  {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  color: #b0b0c2;\n}\n.noRecImageCrop i  {\n  font-size: 24px;\n}\n.noRecImageLabel  {\n  font-size: 11px;\n}\n/* Text Centre alignment (Card 1 &amp; 2) */\n.record-text-center .gridpad  {\n  text-align: center;\n}\n.record-text-center .zc-dem-qv-tinylight  {\n  justify-content: center;\n}',title:"Card 5 — Multi Line"}
};
var cardTypeConfig = {
1: {hasShape:false, hasPosition:false, hasAlign:true},
2: {hasShape:false, hasPosition:false, hasAlign:true},
3: {hasShape:true, hasPosition:true, hasAlign:false},
4: {hasShape:true, hasPosition:true, hasAlign:false},
5: {hasShape:false, hasPosition:false, hasAlign:false}
};
var state = {cardType:"1", shape:"square", position:"left", lineType:"single", textAlign:"left"};
function buildKey() {
var cfg = cardTypeConfig[state.cardType];
var parts = ["card" + state.cardType];
if (cfg.hasShape) parts.push(state.shape);
if (cfg.hasPosition) parts.push(state.position);
if (cfg.hasAlign) parts.push(state.textAlign);
parts.push(state.lineType + "-line");
return parts.join("-");
}
function render() {
var cfg = cardTypeConfig[state.cardType];
/* Show/hide shape & position groups */
cfgEl.shapeGroup.style.display = cfg.hasShape ? "" : "none";
cfgEl.posGroup.style.display = cfg.hasPosition ? "" : "none";
cfgEl.alignGroup.style.display = cfg.hasAlign ? "" : "none";
/* Build key and look up variant */
var key = buildKey();
var variant = variantMap[key];
if (!variant) return;
/* Update preview */
cfgEl.preview.innerHTML = variant.html;
cfgEl.previewTitle.textContent = variant.title + " \u2014 Live Preview";
/* Update code */
cfgEl.codeHtml.innerHTML = variant.fmtHtml;
cfgEl.codeCss.innerHTML = variant.fmtCss;
/* Reset code visibility */
cfgEl.variantCard.classList.remove("code-visible");
var toggleBtn = cfgEl.variantCard.querySelector(".variant-code-toggle");
if (toggleBtn) { toggleBtn.classList.remove("active"); toggleBtn.innerHTML = '<i class="fa-solid fa-code"></i> Show Code'; }
}
function setupPills(container, stateKey) {
var pills = container.querySelectorAll(".cfg-pill");
pills.forEach(function(pill) {
pill.addEventListener("click", function() {
pills.forEach(function(p){ p.classList.remove("active"); });
pill.classList.add("active");
state[stateKey] = pill.dataset.value;
render();
});
});
}
(function(){
var cards = cfgEl.cardType.querySelectorAll(".cfg-type-card");
cards.forEach(function(card){
card.addEventListener("click", function(){
cards.forEach(function(c){ c.classList.remove("active"); });
card.classList.add("active");
state.cardType = card.dataset.value;
render();
});
});
})();
setupPills(cfgEl.shape, "shape");
setupPills(cfgEl.position, "position");
setupPills(cfgEl.align, "textAlign");
setupPills(cfgEl.lineType, "lineType");
render();
})();
})();
/* Report rendering JS */
// -- Calendar Report [grid] --
(function() {
'use strict';
var currentView = 'month';
var currentDate = new Date();
var todayDate = new Date();
var dayNamesShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var dayNamesFull = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var monthNamesShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function pad(n) { return n < 10 ? '0' + n : '' + n; }
function isSameDay(a, b) {
return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function getWeekStart(d) {
var s = new Date(d);
s.setDate(d.getDate() - d.getDay());
s.setHours(0,0,0,0);
return s;
}
/* ---- Date label ---- */
function updateDateLabel() {
var label = document.getElementById('dateLabel--grid-calendar-report');
if (currentView === 'month') {
label.textContent = monthNames[currentDate.getMonth()] + ', ' + currentDate.getFullYear();
} else if (currentView === 'week') {
var start = getWeekStart(currentDate);
var end = new Date(start); end.setDate(start.getDate() + 6);
if (start.getMonth() === end.getMonth()) {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + pad(end.getDate()) + ', ' + start.getFullYear();
} else {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + monthNames[end.getMonth()] + ' ' + pad(end.getDate()) + ', ' + end.getFullYear();
}
} else {
label.textContent = dayNamesFull[currentDate.getDay()] + ', ' + monthNames[currentDate.getMonth()] + ' ' + pad(currentDate.getDate()) + ', ' + currentDate.getFullYear();
}
}
/* ---- Render ---- */
function render() {
var w = document.getElementById('gridWrapper--grid-calendar-report');
if (currentView === 'month') renderMonth(w);
else if (currentView === 'week') renderWeek(w);
else renderDay(w);
updateDateLabel();
}
/* ---- Month View ---- */
function renderMonth(w) {
var year = currentDate.getFullYear();
var month = currentDate.getMonth();
var firstDay = new Date(year, month, 1);
var lastDay = new Date(year, month + 1, 0);
var startDate = new Date(firstDay);
startDate.setDate(startDate.getDate() - startDate.getDay()); // back to Sunday
var html = '<table class="cal-month-table"><thead><tr>';
for (var d = 0; d < 7; d++) html += '<th>' + dayNamesFull[d] + '</th>';
html += '</tr></thead><tbody>';
var current = new Date(startDate);
for (var row = 0; row < 6; row++) {
html += '<tr>';
for (var col = 0; col < 7; col++) {
var isToday = isSameDay(current, todayDate);
var isOther = current.getMonth() !== month;
var cls = [];
if (isToday) cls.push('today');
if (isOther) cls.push('other-month');
html += '<td class="' + cls.join(' ') + '"><span class="day-num">' + current.getDate() + '</span></td>';
current.setDate(current.getDate() + 1);
}
html += '</tr>';
}
html += '</tbody></table>';
w.innerHTML = html;
}
/* ---- Week View ---- */
function renderWeek(w) {
var start = getWeekStart(currentDate);
var html = '<table class="cal-week-table"><thead><tr>';
for (var d = 0; d < 7; d++) {
var dd = new Date(start); dd.setDate(start.getDate() + d);
html += '<th>' + dayNamesShort[dd.getDay()] + ', ' + pad(dd.getDate()) + ' ' + monthNamesShort[dd.getMonth()] + '</th>';
}
html += '</tr></thead><tbody><tr>';
for (var d2 = 0; d2 < 7; d2++) {
var dd2 = new Date(start); dd2.setDate(start.getDate() + d2);
var isToday = isSameDay(dd2, todayDate);
html += '<td class="' + (isToday ? 'today' : '') + '"></td>';
}
html += '</tr></tbody></table>';
w.innerHTML = html;
}
/* ---- Day View ---- */
function renderDay(w) {
var html = '<table class="cal-day-table"><thead><tr>';
html += '<th>' + dayNamesFull[currentDate.getDay()] + '</th>';
html += '</tr></thead><tbody><tr>';
html += '<td></td>';
html += '</tr></tbody></table>';
w.innerHTML = html;
}
/* ---- Public API ---- */
window.switchView__grid_calendar_report = function(view) {
currentView = view;
document.getElementById('monthViewBtn--grid-calendar-report').classList.toggle('active', view === 'month');
document.getElementById('weekViewBtn--grid-calendar-report').classList.toggle('active', view === 'week');
document.getElementById('dayViewBtn--grid-calendar-report').classList.toggle('active', view === 'day');
render();
};
window.navigateCal__grid_calendar_report = function(dir) {
if (currentView === 'month') {
currentDate.setMonth(currentDate.getMonth() + dir);
} else if (currentView === 'week') {
currentDate.setDate(currentDate.getDate() + dir * 7);
} else {
currentDate.setDate(currentDate.getDate() + dir);
}
render();
};
window.goToday__grid_calendar_report = function() {
currentDate = new Date();
render();
};
render();
})();
// -- Calendar Report [detail] --
(function() {
'use strict';
var currentView = 'month';
var currentDate = new Date();
var todayDate = new Date();
var dayNamesShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var dayNamesFull = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var monthNamesShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function pad(n) { return n < 10 ? '0' + n : '' + n; }
function isSameDay(a, b) {
return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function getWeekStart(d) {
var s = new Date(d);
s.setDate(d.getDate() - d.getDay());
s.setHours(0,0,0,0);
return s;
}
/* ---- Date label ---- */
function updateDateLabel() {
var label = document.getElementById('dateLabel--detail-calendar-report');
if (currentView === 'month') {
label.textContent = monthNames[currentDate.getMonth()] + ', ' + currentDate.getFullYear();
} else if (currentView === 'week') {
var start = getWeekStart(currentDate);
var end = new Date(start); end.setDate(start.getDate() + 6);
if (start.getMonth() === end.getMonth()) {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + pad(end.getDate()) + ', ' + start.getFullYear();
} else {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + monthNames[end.getMonth()] + ' ' + pad(end.getDate()) + ', ' + end.getFullYear();
}
} else {
label.textContent = dayNamesFull[currentDate.getDay()] + ', ' + monthNames[currentDate.getMonth()] + ' ' + pad(currentDate.getDate()) + ', ' + currentDate.getFullYear();
}
}
/* ---- Render ---- */
function render() {
var w = document.getElementById('gridWrapper--detail-calendar-report');
if (currentView === 'month') renderMonth(w);
else if (currentView === 'week') renderWeek(w);
else renderDay(w);
updateDateLabel();
}
/* ---- Month View ---- */
function renderMonth(w) {
var year = currentDate.getFullYear();
var month = currentDate.getMonth();
var firstDay = new Date(year, month, 1);
var lastDay = new Date(year, month + 1, 0);
var startDate = new Date(firstDay);
startDate.setDate(startDate.getDate() - startDate.getDay()); // back to Sunday
var html = '<table class="cal-month-table"><thead><tr>';
for (var d = 0; d < 7; d++) html += '<th>' + dayNamesFull[d] + '</th>';
html += '</tr></thead><tbody>';
var current = new Date(startDate);
for (var row = 0; row < 6; row++) {
html += '<tr>';
for (var col = 0; col < 7; col++) {
var isToday = isSameDay(current, todayDate);
var isOther = current.getMonth() !== month;
var cls = [];
if (isToday) cls.push('today');
if (isOther) cls.push('other-month');
html += '<td class="' + cls.join(' ') + '"><span class="day-num">' + current.getDate() + '</span></td>';
current.setDate(current.getDate() + 1);
}
html += '</tr>';
}
html += '</tbody></table>';
w.innerHTML = html;
}
/* ---- Week View ---- */
function renderWeek(w) {
var start = getWeekStart(currentDate);
var html = '<table class="cal-week-table"><thead><tr>';
for (var d = 0; d < 7; d++) {
var dd = new Date(start); dd.setDate(start.getDate() + d);
html += '<th>' + dayNamesShort[dd.getDay()] + ', ' + pad(dd.getDate()) + ' ' + monthNamesShort[dd.getMonth()] + '</th>';
}
html += '</tr></thead><tbody><tr>';
for (var d2 = 0; d2 < 7; d2++) {
var dd2 = new Date(start); dd2.setDate(start.getDate() + d2);
var isToday = isSameDay(dd2, todayDate);
html += '<td class="' + (isToday ? 'today' : '') + '"></td>';
}
html += '</tr></tbody></table>';
w.innerHTML = html;
}
/* ---- Day View ---- */
function renderDay(w) {
var html = '<table class="cal-day-table"><thead><tr>';
html += '<th>' + dayNamesFull[currentDate.getDay()] + '</th>';
html += '</tr></thead><tbody><tr>';
html += '<td></td>';
html += '</tr></tbody></table>';
w.innerHTML = html;
}
/* ---- Public API ---- */
window.switchView__detail_calendar_report = function(view) {
currentView = view;
document.getElementById('monthViewBtn--detail-calendar-report').classList.toggle('active', view === 'month');
document.getElementById('weekViewBtn--detail-calendar-report').classList.toggle('active', view === 'week');
document.getElementById('dayViewBtn--detail-calendar-report').classList.toggle('active', view === 'day');
render();
};
window.navigateCal__detail_calendar_report = function(dir) {
if (currentView === 'month') {
currentDate.setMonth(currentDate.getMonth() + dir);
} else if (currentView === 'week') {
currentDate.setDate(currentDate.getDate() + dir * 7);
} else {
currentDate.setDate(currentDate.getDate() + dir);
}
render();
};
window.goToday__detail_calendar_report = function() {
currentDate = new Date();
render();
};
render();
})();
// -- Calendar Report [all] --
(function() {
'use strict';
var currentView = 'month';
var currentDate = new Date();
var todayDate = new Date();
var dayNamesShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var dayNamesFull = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var monthNamesShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function pad(n) { return n < 10 ? '0' + n : '' + n; }
function isSameDay(a, b) {
return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function getWeekStart(d) {
var s = new Date(d);
s.setDate(d.getDate() - d.getDay());
s.setHours(0,0,0,0);
return s;
}
/* ---- Date label ---- */
function updateDateLabel() {
var label = document.getElementById('dateLabel--all-calendar-report');
if (currentView === 'month') {
label.textContent = monthNames[currentDate.getMonth()] + ', ' + currentDate.getFullYear();
} else if (currentView === 'week') {
var start = getWeekStart(currentDate);
var end = new Date(start); end.setDate(start.getDate() + 6);
if (start.getMonth() === end.getMonth()) {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + pad(end.getDate()) + ', ' + start.getFullYear();
} else {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + monthNames[end.getMonth()] + ' ' + pad(end.getDate()) + ', ' + end.getFullYear();
}
} else {
label.textContent = dayNamesFull[currentDate.getDay()] + ', ' + monthNames[currentDate.getMonth()] + ' ' + pad(currentDate.getDate()) + ', ' + currentDate.getFullYear();
}
}
/* ---- Render ---- */
function render() {
var w = document.getElementById('gridWrapper--all-calendar-report');
if (currentView === 'month') renderMonth(w);
else if (currentView === 'week') renderWeek(w);
else renderDay(w);
updateDateLabel();
}
/* ---- Month View ---- */
function renderMonth(w) {
var year = currentDate.getFullYear();
var month = currentDate.getMonth();
var firstDay = new Date(year, month, 1);
var lastDay = new Date(year, month + 1, 0);
var startDate = new Date(firstDay);
startDate.setDate(startDate.getDate() - startDate.getDay()); // back to Sunday
var html = '<table class="cal-month-table"><thead><tr>';
for (var d = 0; d < 7; d++) html += '<th>' + dayNamesFull[d] + '</th>';
html += '</tr></thead><tbody>';
var current = new Date(startDate);
for (var row = 0; row < 6; row++) {
html += '<tr>';
for (var col = 0; col < 7; col++) {
var isToday = isSameDay(current, todayDate);
var isOther = current.getMonth() !== month;
var cls = [];
if (isToday) cls.push('today');
if (isOther) cls.push('other-month');
html += '<td class="' + cls.join(' ') + '"><span class="day-num">' + current.getDate() + '</span></td>';
current.setDate(current.getDate() + 1);
}
html += '</tr>';
}
html += '</tbody></table>';
w.innerHTML = html;
}
/* ---- Week View ---- */
function renderWeek(w) {
var start = getWeekStart(currentDate);
var html = '<table class="cal-week-table"><thead><tr>';
for (var d = 0; d < 7; d++) {
var dd = new Date(start); dd.setDate(start.getDate() + d);
html += '<th>' + dayNamesShort[dd.getDay()] + ', ' + pad(dd.getDate()) + ' ' + monthNamesShort[dd.getMonth()] + '</th>';
}
html += '</tr></thead><tbody><tr>';
for (var d2 = 0; d2 < 7; d2++) {
var dd2 = new Date(start); dd2.setDate(start.getDate() + d2);
var isToday = isSameDay(dd2, todayDate);
html += '<td class="' + (isToday ? 'today' : '') + '"></td>';
}
html += '</tr></tbody></table>';
w.innerHTML = html;
}
/* ---- Day View ---- */
function renderDay(w) {
var html = '<table class="cal-day-table"><thead><tr>';
html += '<th>' + dayNamesFull[currentDate.getDay()] + '</th>';
html += '</tr></thead><tbody><tr>';
html += '<td></td>';
html += '</tr></tbody></table>';
w.innerHTML = html;
}
/* ---- Public API ---- */
window.switchView__all_calendar_report = function(view) {
currentView = view;
document.getElementById('monthViewBtn--all-calendar-report').classList.toggle('active', view === 'month');
document.getElementById('weekViewBtn--all-calendar-report').classList.toggle('active', view === 'week');
document.getElementById('dayViewBtn--all-calendar-report').classList.toggle('active', view === 'day');
render();
};
window.navigateCal__all_calendar_report = function(dir) {
if (currentView === 'month') {
currentDate.setMonth(currentDate.getMonth() + dir);
} else if (currentView === 'week') {
currentDate.setDate(currentDate.getDate() + dir * 7);
} else {
currentDate.setDate(currentDate.getDate() + dir);
}
render();
};
window.goToday__all_calendar_report = function() {
currentDate = new Date();
render();
};
render();
})();
// -- Kanban Report [grid] --
(function(){
'use strict';
/* ====== SAMPLE DATA ====== */
var columns = [
{
title: 'Choice 1',
cards: [
{ name: '', address: '', img: '' },
{ name: '', address: '', img: '' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Kakashi uchiha', address: 'NO: 02, copy ninja Street,, chennai,', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
{ name: 'itachi uchiha', address: 'NO: 01, Hogwarts Street, chennai,', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }
]
},
{
title: 'Choice 2',
cards: [
{ name: 'Mr. John', address: 'NO: 01, harry street 1st cross, chennai,', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
{ name: 'Harry Potter', address: 'NO: 01, harry street 1st cross, chennai,', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
{ name: 'Dora Dora', address: 'NO: 01, harry street 1st cross, chennai,', img: '' },
{ name: 'Harry Potter', address: 'NO: 01, harry street 1st cross, chennai,', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
{ name: 'Dora Dora', address: 'NO: 01, harry street 1st cross, chennai,', img: '' }
]
},
{
title: 'Choice 3',
cards: [
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }
]
}
];
/* ====== RENDER ====== */
function render() {
var board = document.getElementById('kanbanBoard--grid-kanban-report');
var html = '';
for (var c = 0; c < columns.length; c++) {
var col = columns[c];
html += '<div class="kanban-column">';
html += '<div class="column-header"><h2>' + col.title + '</h2></div>';
html += '<div class="card-list">';
for (var i = 0; i < col.cards.length; i++) {
var card = col.cards[i];
html += '<div class="kanban-card">';
// More button
html += '<div class="card-more"><span></span><span></span><span></span></div>';
// Avatar
if (card.img) {
html += '<div class="card-avatar"><img src="' + card.img + '" alt="' + card.name + '"></div>';
} else {
html += '<div class="card-avatar placeholder"><svg viewBox="0 0 24 24"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"/></svg></div>';
}
// Info
html += '<div class="card-info">';
if (card.name) {
html += '<div class="card-title">' + card.name + '</div>';
}
if (card.address) {
html += '<div class="card-address"><svg class="pin-icon" viewBox="0 0 384 512" width="12" height="14" style="fill:#7d31f6;vertical-align:middle;margin-right:4px"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>' + card.address + '</div>';
}
html += '</div>';
html += '</div>'; // .kanban-card
}
html += '</div>'; // .card-list
html += '</div>'; // .kanban-column
}
board.innerHTML = html;
}
render();
})();
// -- Kanban Report [detail] --
(function(){
'use strict';
/* ====== SAMPLE DATA ====== */
var columns = [
{
title: 'Choice 1',
cards: [
{ name: '', address: '', img: '' },
{ name: '', address: '', img: '' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Kakashi uchiha', address: 'NO: 02, copy ninja Street,, chennai,', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
{ name: 'itachi uchiha', address: 'NO: 01, Hogwarts Street, chennai,', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }
]
},
{
title: 'Choice 2',
cards: [
{ name: 'Mr. John', address: 'NO: 01, harry street 1st cross, chennai,', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
{ name: 'Harry Potter', address: 'NO: 01, harry street 1st cross, chennai,', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
{ name: 'Dora Dora', address: 'NO: 01, harry street 1st cross, chennai,', img: '' },
{ name: 'Harry Potter', address: 'NO: 01, harry street 1st cross, chennai,', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
{ name: 'Dora Dora', address: 'NO: 01, harry street 1st cross, chennai,', img: '' }
]
},
{
title: 'Choice 3',
cards: [
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }
]
}
];
/* ====== RENDER ====== */
function render() {
var board = document.getElementById('kanbanBoard--detail-kanban-report');
var html = '';
for (var c = 0; c < columns.length; c++) {
var col = columns[c];
html += '<div class="kanban-column">';
html += '<div class="column-header"><h2>' + col.title + '</h2></div>';
html += '<div class="card-list">';
for (var i = 0; i < col.cards.length; i++) {
var card = col.cards[i];
html += '<div class="kanban-card">';
// More button
html += '<div class="card-more"><span></span><span></span><span></span></div>';
// Avatar
if (card.img) {
html += '<div class="card-avatar"><img src="' + card.img + '" alt="' + card.name + '"></div>';
} else {
html += '<div class="card-avatar placeholder"><svg viewBox="0 0 24 24"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"/></svg></div>';
}
// Info
html += '<div class="card-info">';
if (card.name) {
html += '<div class="card-title">' + card.name + '</div>';
}
if (card.address) {
html += '<div class="card-address"><svg class="pin-icon" viewBox="0 0 384 512" width="12" height="14" style="fill:#7d31f6;vertical-align:middle;margin-right:4px"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>' + card.address + '</div>';
}
html += '</div>';
html += '</div>'; // .kanban-card
}
html += '</div>'; // .card-list
html += '</div>'; // .kanban-column
}
board.innerHTML = html;
}
render();
})();
// -- Kanban Report [all] --
(function(){
'use strict';
/* ====== SAMPLE DATA ====== */
var columns = [
{
title: 'Choice 1',
cards: [
{ name: '', address: '', img: '' },
{ name: '', address: '', img: '' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Kakashi uchiha', address: 'NO: 02, copy ninja Street,, chennai,', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
{ name: 'itachi uchiha', address: 'NO: 01, Hogwarts Street, chennai,', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }
]
},
{
title: 'Choice 2',
cards: [
{ name: 'Mr. John', address: 'NO: 01, harry street 1st cross, chennai,', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop' },
{ name: 'Harry Potter', address: 'NO: 01, harry street 1st cross, chennai,', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
{ name: 'Dora Dora', address: 'NO: 01, harry street 1st cross, chennai,', img: '' },
{ name: 'Harry Potter', address: 'NO: 01, harry street 1st cross, chennai,', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop' },
{ name: 'Dora Dora', address: 'NO: 01, harry street 1st cross, chennai,', img: '' }
]
},
{
title: 'Choice 3',
cards: [
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
{ name: 'Mrs. John', address: '', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' }
]
}
];
/* ====== RENDER ====== */
function render() {
var board = document.getElementById('kanbanBoard--all-kanban-report');
var html = '';
for (var c = 0; c < columns.length; c++) {
var col = columns[c];
html += '<div class="kanban-column">';
html += '<div class="column-header"><h2>' + col.title + '</h2></div>';
html += '<div class="card-list">';
for (var i = 0; i < col.cards.length; i++) {
var card = col.cards[i];
html += '<div class="kanban-card">';
// More button
html += '<div class="card-more"><span></span><span></span><span></span></div>';
// Avatar
if (card.img) {
html += '<div class="card-avatar"><img src="' + card.img + '" alt="' + card.name + '"></div>';
} else {
html += '<div class="card-avatar placeholder"><svg viewBox="0 0 24 24"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"/></svg></div>';
}
// Info
html += '<div class="card-info">';
if (card.name) {
html += '<div class="card-title">' + card.name + '</div>';
}
if (card.address) {
html += '<div class="card-address"><svg class="pin-icon" viewBox="0 0 384 512" width="12" height="14" style="fill:#7d31f6;vertical-align:middle;margin-right:4px"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>' + card.address + '</div>';
}
html += '</div>';
html += '</div>'; // .kanban-card
}
html += '</div>'; // .card-list
html += '</div>'; // .kanban-column
}
board.innerHTML = html;
}
render();
})();
// -- Timeline Report [grid] --
(function() {
'use strict';
var currentView = 'week';
var currentDate = new Date();
var todayDate = new Date();
var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var dayNamesFull = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function getHourLabel(h) {
if (h === 0) return '12am';
if (h < 12) return h + 'am';
if (h === 12) return '12pm';
return (h - 12) + 'pm';
}
function getWeekStart(d) {
var start = new Date(d);
start.setDate(d.getDate() - d.getDay());
start.setHours(0,0,0,0);
return start;
}
function isSameDay(a, b) {
return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function pad(n) { return n < 10 ? '0' + n : '' + n; }
function updateDateLabel() {
var label = document.getElementById('dateLabel--grid-timeline-report');
if (currentView === 'week') {
var start = getWeekStart(currentDate);
var end = new Date(start);
end.setDate(start.getDate() + 6);
if (start.getMonth() === end.getMonth()) {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + pad(end.getDate()) + ', ' + start.getFullYear();
} else {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + monthNames[end.getMonth()] + ' ' + pad(end.getDate()) + ', ' + end.getFullYear();
}
} else {
label.textContent = dayNamesFull[currentDate.getDay()] + ', ' + monthNames[currentDate.getMonth()] + ' ' + pad(currentDate.getDate()) + ', ' + currentDate.getFullYear();
}
}
function renderGrid() {
var wrapper = document.getElementById('gridWrapper--grid-timeline-report');
if (currentView === 'week') {
renderWeekView(wrapper);
} else {
renderDayView(wrapper);
}
updateDateLabel();
// Auto-scroll to 6am area
setTimeout(function() {
if (currentView === 'week') {
wrapper.scrollLeft = 6 * 55;
} else {
wrapper.scrollLeft = 6 * (wrapper.scrollWidth / 24);
}
}, 50);
}
function renderWeekView(wrapper) {
var weekStart = getWeekStart(currentDate);
var html = '<table class="timeline-grid week-view"><thead>';
// Day headers
html += '<tr class="day-header-row">';
for (var d = 0; d < 7; d++) {
var dayDate = new Date(weekStart);
dayDate.setDate(weekStart.getDate() + d);
html += '<th colspan="24">' + dayNames[dayDate.getDay()] + ' ' + dayDate.getDate() + '/' + (dayDate.getMonth()+1) + '</th>';
}
html += '</tr>';
// Time slots
html += '<tr class="time-header-row">';
for (var d = 0; d < 7; d++) {
for (var h = 0; h < 24; h++) {
html += '<th>' + getHourLabel(h) + '</th>';
}
}
html += '</tr></thead><tbody><tr>';
// Body
for (var d = 0; d < 7; d++) {
var dayDate = new Date(weekStart);
dayDate.setDate(weekStart.getDate() + d);
var isToday = isSameDay(dayDate, todayDate);
for (var h = 0; h < 24; h++) {
html += '<td' + (isToday ? ' class="today-col"' : '') + '></td>';
}
}
html += '</tr></tbody></table>';
wrapper.innerHTML = html;
}
function renderDayView(wrapper) {
var html = '<table class="timeline-grid day-view"><thead>';
html += '<tr class="time-header-row">';
for (var h = 0; h < 24; h++) {
html += '<th colspan="4">' + getHourLabel(h) + '</th>';
}
html += '</tr></thead><tbody><tr>';
for (var i = 0; i < 96; i++) {
html += '<td></td>';
}
html += '</tr></tbody></table>';
wrapper.innerHTML = html;
}
// Public API
window.switchView__grid_timeline_report = function(view) {
currentView = view;
document.getElementById('weekViewBtn--grid-timeline-report').classList.toggle('active', view === 'week');
document.getElementById('dayViewBtn--grid-timeline-report').classList.toggle('active', view === 'day');
renderGrid();
};
window.navigateTimeline__grid_timeline_report = function(dir) {
if (currentView === 'week') {
currentDate.setDate(currentDate.getDate() + dir * 7);
} else {
currentDate.setDate(currentDate.getDate() + dir);
}
renderGrid();
};
window.goToday__grid_timeline_report = function() {
currentDate = new Date();
renderGrid();
};
// Initial render
renderGrid();
})();
// -- Timeline Report [detail] --
(function() {
'use strict';
var currentView = 'week';
var currentDate = new Date();
var todayDate = new Date();
var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var dayNamesFull = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function getHourLabel(h) {
if (h === 0) return '12am';
if (h < 12) return h + 'am';
if (h === 12) return '12pm';
return (h - 12) + 'pm';
}
function getWeekStart(d) {
var start = new Date(d);
start.setDate(d.getDate() - d.getDay());
start.setHours(0,0,0,0);
return start;
}
function isSameDay(a, b) {
return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function pad(n) { return n < 10 ? '0' + n : '' + n; }
function updateDateLabel() {
var label = document.getElementById('dateLabel--detail-timeline-report');
if (currentView === 'week') {
var start = getWeekStart(currentDate);
var end = new Date(start);
end.setDate(start.getDate() + 6);
if (start.getMonth() === end.getMonth()) {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + pad(end.getDate()) + ', ' + start.getFullYear();
} else {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + monthNames[end.getMonth()] + ' ' + pad(end.getDate()) + ', ' + end.getFullYear();
}
} else {
label.textContent = dayNamesFull[currentDate.getDay()] + ', ' + monthNames[currentDate.getMonth()] + ' ' + pad(currentDate.getDate()) + ', ' + currentDate.getFullYear();
}
}
function renderGrid() {
var wrapper = document.getElementById('gridWrapper--detail-timeline-report');
if (currentView === 'week') {
renderWeekView(wrapper);
} else {
renderDayView(wrapper);
}
updateDateLabel();
// Auto-scroll to 6am area
setTimeout(function() {
if (currentView === 'week') {
wrapper.scrollLeft = 6 * 55;
} else {
wrapper.scrollLeft = 6 * (wrapper.scrollWidth / 24);
}
}, 50);
}
function renderWeekView(wrapper) {
var weekStart = getWeekStart(currentDate);
var html = '<table class="timeline-grid week-view"><thead>';
// Day headers
html += '<tr class="day-header-row">';
for (var d = 0; d < 7; d++) {
var dayDate = new Date(weekStart);
dayDate.setDate(weekStart.getDate() + d);
html += '<th colspan="24">' + dayNames[dayDate.getDay()] + ' ' + dayDate.getDate() + '/' + (dayDate.getMonth()+1) + '</th>';
}
html += '</tr>';
// Time slots
html += '<tr class="time-header-row">';
for (var d = 0; d < 7; d++) {
for (var h = 0; h < 24; h++) {
html += '<th>' + getHourLabel(h) + '</th>';
}
}
html += '</tr></thead><tbody><tr>';
// Body
for (var d = 0; d < 7; d++) {
var dayDate = new Date(weekStart);
dayDate.setDate(weekStart.getDate() + d);
var isToday = isSameDay(dayDate, todayDate);
for (var h = 0; h < 24; h++) {
html += '<td' + (isToday ? ' class="today-col"' : '') + '></td>';
}
}
html += '</tr></tbody></table>';
wrapper.innerHTML = html;
}
function renderDayView(wrapper) {
var html = '<table class="timeline-grid day-view"><thead>';
html += '<tr class="time-header-row">';
for (var h = 0; h < 24; h++) {
html += '<th colspan="4">' + getHourLabel(h) + '</th>';
}
html += '</tr></thead><tbody><tr>';
for (var i = 0; i < 96; i++) {
html += '<td></td>';
}
html += '</tr></tbody></table>';
wrapper.innerHTML = html;
}
// Public API
window.switchView__detail_timeline_report = function(view) {
currentView = view;
document.getElementById('weekViewBtn--detail-timeline-report').classList.toggle('active', view === 'week');
document.getElementById('dayViewBtn--detail-timeline-report').classList.toggle('active', view === 'day');
renderGrid();
};
window.navigateTimeline__detail_timeline_report = function(dir) {
if (currentView === 'week') {
currentDate.setDate(currentDate.getDate() + dir * 7);
} else {
currentDate.setDate(currentDate.getDate() + dir);
}
renderGrid();
};
window.goToday__detail_timeline_report = function() {
currentDate = new Date();
renderGrid();
};
// Initial render
renderGrid();
})();
// -- Timeline Report [all] --
(function() {
'use strict';
var currentView = 'week';
var currentDate = new Date();
var todayDate = new Date();
var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
var dayNamesFull = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function getHourLabel(h) {
if (h === 0) return '12am';
if (h < 12) return h + 'am';
if (h === 12) return '12pm';
return (h - 12) + 'pm';
}
function getWeekStart(d) {
var start = new Date(d);
start.setDate(d.getDate() - d.getDay());
start.setHours(0,0,0,0);
return start;
}
function isSameDay(a, b) {
return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function pad(n) { return n < 10 ? '0' + n : '' + n; }
function updateDateLabel() {
var label = document.getElementById('dateLabel--all-timeline-report');
if (currentView === 'week') {
var start = getWeekStart(currentDate);
var end = new Date(start);
end.setDate(start.getDate() + 6);
if (start.getMonth() === end.getMonth()) {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + pad(end.getDate()) + ', ' + start.getFullYear();
} else {
label.textContent = monthNames[start.getMonth()] + ' ' + pad(start.getDate()) + ' \u2013 ' + monthNames[end.getMonth()] + ' ' + pad(end.getDate()) + ', ' + end.getFullYear();
}
} else {
label.textContent = dayNamesFull[currentDate.getDay()] + ', ' + monthNames[currentDate.getMonth()] + ' ' + pad(currentDate.getDate()) + ', ' + currentDate.getFullYear();
}
}
function renderGrid() {
var wrapper = document.getElementById('gridWrapper--all-timeline-report');
if (currentView === 'week') {
renderWeekView(wrapper);
} else {
renderDayView(wrapper);
}
updateDateLabel();
// Auto-scroll to 6am area
setTimeout(function() {
if (currentView === 'week') {
wrapper.scrollLeft = 6 * 55;
} else {
wrapper.scrollLeft = 6 * (wrapper.scrollWidth / 24);
}
}, 50);
}
function renderWeekView(wrapper) {
var weekStart = getWeekStart(currentDate);
var html = '<table class="timeline-grid week-view"><thead>';
// Day headers
html += '<tr class="day-header-row">';
for (var d = 0; d < 7; d++) {
var dayDate = new Date(weekStart);
dayDate.setDate(weekStart.getDate() + d);
html += '<th colspan="24">' + dayNames[dayDate.getDay()] + ' ' + dayDate.getDate() + '/' + (dayDate.getMonth()+1) + '</th>';
}
html += '</tr>';
// Time slots
html += '<tr class="time-header-row">';
for (var d = 0; d < 7; d++) {
for (var h = 0; h < 24; h++) {
html += '<th>' + getHourLabel(h) + '</th>';
}
}
html += '</tr></thead><tbody><tr>';
// Body
for (var d = 0; d < 7; d++) {
var dayDate = new Date(weekStart);
dayDate.setDate(weekStart.getDate() + d);
var isToday = isSameDay(dayDate, todayDate);
for (var h = 0; h < 24; h++) {
html += '<td' + (isToday ? ' class="today-col"' : '') + '></td>';
}
}
html += '</tr></tbody></table>';
wrapper.innerHTML = html;
}
function renderDayView(wrapper) {
var html = '<table class="timeline-grid day-view"><thead>';
html += '<tr class="time-header-row">';
for (var h = 0; h < 24; h++) {
html += '<th colspan="4">' + getHourLabel(h) + '</th>';
}
html += '</tr></thead><tbody><tr>';
for (var i = 0; i < 96; i++) {
html += '<td></td>';
}
html += '</tr></tbody></table>';
wrapper.innerHTML = html;
}
// Public API
window.switchView__all_timeline_report = function(view) {
currentView = view;
document.getElementById('weekViewBtn--all-timeline-report').classList.toggle('active', view === 'week');
document.getElementById('dayViewBtn--all-timeline-report').classList.toggle('active', view === 'day');
renderGrid();
};
window.navigateTimeline__all_timeline_report = function(dir) {
if (currentView === 'week') {
currentDate.setDate(currentDate.getDate() + dir * 7);
} else {
currentDate.setDate(currentDate.getDate() + dir);
}
renderGrid();
};
window.goToday__all_timeline_report = function() {
currentDate = new Date();
renderGrid();
};
// Initial render
renderGrid();
})();
/* ===== Form Component Interactive JS ===== */
// -- Text Input --
(function(){try{
const requiredInputs = document.querySelectorAll('.zc-field-input[required]');
requiredInputs.forEach(function(input) {
const errorEl = document.getElementById(input.getAttribute('aria-describedby'));
const field = input.closest('.zc-form-field'); // No I18N
input.addEventListener('blur', function() {
validateInput(input, errorEl, field);
});
input.addEventListener('input', function() {
if (input.getAttribute('aria-invalid') === 'true') {
validateInput(input, errorEl, field);
}
});
});
function validateInput(input, errorEl, field) {
if (!input.value.trim()) {
input.setAttribute('aria-invalid', 'true');
if (errorEl) {
errorEl.hidden = false;
}
if (field) {
field.classList.add('zc-validation-error'); // No I18N
}
} else {
input.removeAttribute('aria-invalid');
if (errorEl) {
errorEl.hidden = true;
}
if (field) {
field.classList.remove('zc-validation-error'); // No I18N
}
}
}
}catch(e){console.warn("text-input JS error:",e);}})();
// -- Textarea --
(function(){try{
const requiredTextareas = document.querySelectorAll('.zc-field-textarea[required]');
requiredTextareas.forEach(function(textarea) {
const errorEl = document.getElementById(textarea.getAttribute('aria-describedby'));
textarea.addEventListener('blur', function() {
if (!textarea.value.trim()) {
textarea.setAttribute('aria-invalid', 'true');
if (errorEl) {
errorEl.hidden = false;
}
} else {
textarea.removeAttribute('aria-invalid');
if (errorEl) {
errorEl.hidden = true;
}
}
});
textarea.addEventListener('input', function() {
if (textarea.getAttribute('aria-invalid') === 'true') {
textarea.removeAttribute('aria-invalid');
if (errorEl) {
errorEl.hidden = true;
}
}
});
});
}catch(e){console.warn("textarea JS error:",e);}})();
// -- Number Input --
(function(){try{
var numberInput = document.getElementById('number-field');
numberInput.addEventListener('input', function() {
this.value = this.value.replace(/[^0-9]/g, '');
});
}catch(e){console.warn("number-input JS error:",e);}})();
// -- Decimal Input --
(function(){try{
var decimalInput = document.getElementById('decimal');
decimalInput.addEventListener('input', function() {
var value = this.value.replace(/[^0-9.]/g, '');
var parts = value.split('.');
if (parts.length > 2) {
value = parts[0] + '.' + parts.slice(1).join('');
}
if (parts[1] && parts[1].length > 2) {
value = parts[0] + '.' + parts[1].substring(0, 2);
}
this.value = value;
});
}catch(e){console.warn("decimal-input JS error:",e);}})();
// -- Currency Input --
(function(){try{
var currencyInputs = document.querySelectorAll('.zc-Currency, .zc-currency-input'); // No I18N
if (!currencyInputs.length) {
return;
}
currencyInputs.forEach(function(currencyInput) {
currencyInput.addEventListener('input', function() {
var value = this.value.replace(/[^0-9.]/g, '');
var parts = value.split('.');
parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
if (parts.length > 2) {
parts = [parts[0], parts.slice(1).join('')];
}
if (parts[1] && parts[1].length > 2) {
parts[1] = parts[1].substring(0, 2);
}
this.value = parts.join('.');
});
});
}catch(e){console.warn("currency-input JS error:",e);}})();
// -- Percent Input --
(function(){try{
var percentInputs = document.querySelectorAll('.zc-percent-input'); // No I18N
percentInputs.forEach(function(percentInput) {
percentInput.addEventListener('input', function() {
var value = this.value.replace(/[^0-9.]/g, '');
var parts = value.split('.');
if (parts.length > 2) {
value = parts[0] + '.' + parts.slice(1).join('');
}
this.value = value;
});
});
}catch(e){console.warn("percent-input JS error:",e);}})();
// -- Email Input --
(function(){try{
var emailInput = document.getElementById('email');
var errorEl = document.getElementById('email-error');
var emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
emailInput.addEventListener('blur', function() {
validateEmail();
});
emailInput.addEventListener('input', function() {
if (emailInput.getAttribute('aria-invalid') === 'true') {
validateEmail();
}
});
function validateEmail() {
var value = emailInput.value.trim();
if (!value) {
emailInput.setAttribute('aria-invalid', 'true');
errorEl.textContent = 'This field is required'; // No I18N
errorEl.hidden = false;
} else if (!emailPattern.test(value)) {
emailInput.setAttribute('aria-invalid', 'true');
errorEl.textContent = 'Please enter a valid email address'; // No I18N
errorEl.hidden = false;
} else {
emailInput.removeAttribute('aria-invalid');
errorEl.hidden = true;
}
}
}catch(e){console.warn("email-input JS error:",e);}})();
// -- Phone Input --
(function(){try{
var phoneGroups = document.querySelectorAll('.zc-phonenumber-group'); // No I18N
var phoneFields = phoneGroups.length ? phoneGroups : document.querySelectorAll('.zc-phonenumber-field'); // No I18N
phoneFields.forEach(function(root) {
var selectedFlag = root.querySelector('.zc-selected-flag'); // No I18N
var countryList = root.querySelector('.zc-country-list'); // No I18N
var dialCodeEl = root.querySelector('.zc-selected-dial-code'); // No I18N
var phoneInput = root.querySelector('input[type="tel"]'); // No I18N
var errorEl = root.querySelector('.zc-field-error-text, .zc-field-error-msg'); // No I18N
var field = root.querySelector('.zc-form-field') || root.closest('.zc-form-field'); // No I18N
if (!selectedFlag || !countryList || !dialCodeEl || !phoneInput || !field) {
return;
}
var flagEl = selectedFlag.querySelector('.zc-iti-flag'); // No I18N
var isDisabled = phoneInput.disabled || selectedFlag.getAttribute('aria-disabled') === 'true';
var isRequired = phoneInput.hasAttribute('required') || phoneInput.getAttribute('aria-required') === 'true'; // No I18N
function closeCountryList() {
countryList.hidden = true;
selectedFlag.setAttribute('aria-expanded', 'false');
}
function openCountryList() {
if (isDisabled) {
return;
}
countryList.hidden = false;
selectedFlag.setAttribute('aria-expanded', 'true');
}
function validatePhone() {
if (!isRequired || !errorEl || phoneInput.disabled) {
return;
}
var value = phoneInput.value.trim().replace(/[\s\-]/g, '');
var errorText = errorEl.querySelector('span'); // No I18N
if (!value) {
phoneInput.setAttribute('aria-invalid', 'true');
if (errorText) {
errorText.textContent = 'This field is required'; // No I18N
}
errorEl.hidden = false;
field.classList.add('validationError'); // No I18N
} else if (value.length < 7 || value.length > 15) {
phoneInput.setAttribute('aria-invalid', 'true');
if (errorText) {
errorText.textContent = 'Please enter a valid phone number'; // No I18N
}
errorEl.hidden = false;
field.classList.add('validationError'); // No I18N
} else {
phoneInput.removeAttribute('aria-invalid');
errorEl.hidden = true;
field.classList.remove('validationError'); // No I18N
}
}
selectedFlag.addEventListener('click', function(e) {
if (isDisabled) {
return;
}
e.stopPropagation();
if (countryList.hidden) {
openCountryList();
} else {
closeCountryList();
}
});
selectedFlag.addEventListener('keydown', function(e) {
if (isDisabled) {
return;
}
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
if (countryList.hidden) {
openCountryList();
} else {
closeCountryList();
}
} else if (e.key === 'Escape' && !countryList.hidden) {
closeCountryList();
}
});
countryList.addEventListener('click', function(e) {
if (isDisabled) {
return;
}
var countryOption = e.target.closest('.zc-country'); // No I18N
if (!countryOption) {
return;
}
var code = countryOption.getAttribute('data-dial-code');
var countryCode = countryOption.getAttribute('data-country-code');
var name = countryOption.getAttribute('data-country-name');
dialCodeEl.textContent = code;
if (flagEl) {
flagEl.className = 'zc-iti-flag ' + countryCode;
}
selectedFlag.title = name + ': ' + code;
closeCountryList();
phoneInput.focus();
});
document.addEventListener('click', function(e) {
if (!root.contains(e.target) && !countryList.hidden) {
closeCountryList();
}
});
phoneInput.addEventListener('blur', function() {
validatePhone();
});
phoneInput.addEventListener('input', function() {
phoneInput.value = phoneInput.value.replace(/[^0-9\s\-]/g, '');
if (phoneInput.getAttribute('aria-invalid') === 'true') {
validatePhone();
}
});
});
}catch(e){console.warn("phone-input JS error:",e);}})();
// -- URL Input --
(function(){try{
var urlInput = document.getElementById('url-field');
var errorEl = document.getElementById('url-error');
var urlPattern = /^https?:\/\/[a-zA-Z0-9][a-zA-Z0-9-]*(\.[a-zA-Z]{2,})+/;
urlInput.addEventListener('blur', function() {
var value = urlInput.value.trim();
if (value && !urlPattern.test(value)) {
urlInput.setAttribute('aria-invalid', 'true');
errorEl.hidden = false;
} else {
urlInput.removeAttribute('aria-invalid');
errorEl.hidden = true;
}
});
}catch(e){console.warn("url-input JS error:",e);}})();
// -- Date Input --
(function(){try{
// Date input uses native browser date picker
// Optionally set min/max dates
var dateInput = document.getElementById('date-field');
// Example: dateInput.min = '2020-01-01';
// Example: dateInput.max = '2030-12-31';
}catch(e){console.warn("date-input JS error:",e);}})();
// -- Datetime Input --
(function(){try{
// Native datetime-local picker
}catch(e){console.warn("datetime-input JS error:",e);}})();
// -- Time Input --
(function(){try{
// Native time picker - no additional JS needed
}catch(e){console.warn("time-input JS error:",e);}})();
// -- Dropdown --
(function(){try{
var containers = document.querySelectorAll('.select2-container'); // No I18N
containers.forEach(function(container) {
var choice = container.querySelector('.select2-choice'); // No I18N
var drop = container.querySelector('.select2-drop'); // No I18N
var chosenText = container.querySelector('.select2-chosen'); // No I18N
var results = drop ? drop.querySelectorAll('.select2-result') : []; // No I18N
var formField = container.closest('.form-field'); // No I18N
var hiddenInput = formField ? formField.querySelector('input[type="hidden"]') : null; // No I18N
var isDisabled = container.classList.contains('select2-container-disabled') || // No I18N
container.getAttribute('aria-disabled') === 'true';
if (!choice || !drop || !chosenText) {
return;
}
choice.addEventListener('click', function(e) {
if (isDisabled) {
return;
}
e.preventDefault();
e.stopPropagation();
if (container.classList.contains('select2-dropdown-open')) {
closeDropdown();
} else {
closeAll();
openDropdown();
}
});
choice.addEventListener('keydown', function(e) {
if (isDisabled) {
return;
}
if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
e.preventDefault();
if (!container.classList.contains('select2-dropdown-open')) {
closeAll();
openDropdown();
}
} else if (e.key === 'Escape') {
closeDropdown();
}
});
results.forEach(function(result) {
result.addEventListener('click', function(e) {
if (isDisabled) {
return;
}
e.stopPropagation();
results.forEach(function(r) { r.classList.remove('select2-result-selected'); }); // No I18N
result.classList.add('select2-result-selected'); // No I18N
var label = result.querySelector('.select2-result-label').textContent; // No I18N
var value = result.getAttribute('data-value');
chosenText.textContent = label;
container.classList.add('select2-has-value'); // No I18N
if (hiddenInput) {
hiddenInput.value = value;
}
closeDropdown();
choice.focus();
});
});
document.addEventListener('click', function(e) {
if (!container.contains(e.target)) {
closeDropdown();
}
});
function openDropdown() {
container.classList.add('select2-dropdown-open'); // No I18N
container.setAttribute('aria-expanded', 'true');
drop.classList.remove('select2-display-none'); // No I18N
}
function closeDropdown() {
container.classList.remove('select2-dropdown-open'); // No I18N
container.setAttribute('aria-expanded', 'false');
drop.classList.add('select2-display-none'); // No I18N
}
function closeAll() {
document.querySelectorAll('.select2-container.select2-dropdown-open').forEach(function(c) { // No I18N
c.classList.remove('select2-dropdown-open'); // No I18N
c.setAttribute('aria-expanded', 'false');
var d = c.querySelector('.select2-drop'); // No I18N
if (d) {
d.classList.add('select2-display-none'); // No I18N
}
});
}
});
}catch(e){console.warn("dropdown JS error:",e);}})();
// -- Multi Select --
(function(){try{
var containers = document.querySelectorAll('.select2-container-multi'); // No I18N
containers.forEach(function(container) {
var choicesList = container.querySelector('.select2-choices'); // No I18N
var searchField = container.querySelector('.select2-search-field'); // No I18N
var searchInput = container.querySelector('.select2-search-field .select2-input'); // No I18N
var drop = container.querySelector('.select2-drop-multi'); // No I18N
var resultsList = drop ? drop.querySelector('.select2-results') : null; // No I18N
var results = drop ? drop.querySelectorAll('.select2-result') : []; // No I18N
var formField = container.closest('.form-field'); // No I18N
var hiddenInput = formField ? formField.querySelector('input[type="hidden"]') : null; // No I18N
var selectedValues = [];
var defaultPlaceholder = searchInput ? (searchInput.getAttribute('placeholder') || '') : '';
var isDisabled = container.classList.contains('select2-container-disabled') || // No I18N
container.getAttribute('aria-disabled') === 'true' ||
(searchInput && searchInput.disabled);
if (!choicesList || !searchField || !searchInput || !drop || !resultsList) {
return;
}
choicesList.addEventListener('click', function(e) {
if (isDisabled) {
return;
}
e.stopPropagation();
if (!container.classList.contains('select2-dropdown-open')) {
openDropdown();
}
searchInput.focus();
});
searchInput.addEventListener('focus', function() {
if (isDisabled) {
return;
}
if (!container.classList.contains('select2-dropdown-open')) {
openDropdown();
}
});
searchInput.addEventListener('input', function() {
if (isDisabled) {
return;
}
var query = searchInput.value.toLowerCase();
results.forEach(function(result) {
if (selectedValues.indexOf(result.getAttribute('data-value')) > -1) {
result.style.display = 'none';
return;
}
var label = result.querySelector('.select2-result-label'); // No I18N
var text = label ? label.textContent.toLowerCase() : '';
result.style.display = text.indexOf(query) > -1 ? '' : 'none';
});
});
searchInput.addEventListener('keydown', function(e) {
if (isDisabled) {
return;
}
if (e.key === 'Escape') {
closeDropdown();
}
if (e.key === 'Backspace' && searchInput.value === '' && selectedValues.length > 0) {
removeValue(selectedValues[selectedValues.length - 1]);
}
});
results.forEach(function(result) {
result.addEventListener('click', function(e) {
if (isDisabled) {
return;
}
e.stopPropagation();
toggleOption(result);
searchInput.focus();
});
});
document.addEventListener('click', function(e) {
if (!container.contains(e.target)) {
closeDropdown();
}
});
function openDropdown() {
if (isDisabled) {
return;
}
closeAllMulti();
container.classList.add('select2-dropdown-open'); // No I18N
container.setAttribute('aria-expanded', 'true');
drop.classList.remove('select2-display-none'); // No I18N
searchInput.placeholder = '';
results.forEach(function(r) {
r.style.display = selectedValues.indexOf(r.getAttribute('data-value')) > -1 ? 'none' : '';
});
}
function closeDropdown() {
container.classList.remove('select2-dropdown-open'); // No I18N
container.setAttribute('aria-expanded', 'false');
drop.classList.add('select2-display-none'); // No I18N
searchInput.value = '';
searchInput.placeholder = selectedValues.length > 0 ? '' : defaultPlaceholder;
}
function closeAllMulti() {
document.querySelectorAll('.select2-container-multi.select2-dropdown-open').forEach(function(c) { // No I18N
c.classList.remove('select2-dropdown-open'); // No I18N
c.setAttribute('aria-expanded', 'false');
var d = c.querySelector('.select2-drop-multi'); // No I18N
if (d) {
d.classList.add('select2-display-none'); // No I18N
}
});
}
function toggleOption(result) {
var value = result.getAttribute('data-value');
var idx = selectedValues.indexOf(value);
if (idx > -1) {
selectedValues.splice(idx, 1);
result.classList.remove('select2-result-selected'); // No I18N
result.style.display = '';
} else {
selectedValues.push(value);
result.classList.add('select2-result-selected'); // No I18N
result.style.display = 'none';
}
renderChoices();
if (hiddenInput) {
hiddenInput.value = selectedValues.join(',');
}
}
function removeValue(value) {
var idx = selectedValues.indexOf(value);
if (idx > -1) {
selectedValues.splice(idx, 1);
}
results.forEach(function(r) {
if (r.getAttribute('data-value') === value) {
r.classList.remove('select2-result-selected'); // No I18N
r.style.display = '';
}
});
renderChoices();
if (hiddenInput) {
hiddenInput.value = selectedValues.join(',');
}
}
function renderChoices() {
var existingTags = choicesList.querySelectorAll('.select2-search-choice'); // No I18N
existingTags.forEach(function(tag) { tag.remove(); });
selectedValues.forEach(function(value) {
var result = drop.querySelector('[data-value="' + value + '"]'); // No I18N
var label = result ? result.querySelector('.select2-result-label') : null; // No I18N
var text = label ? label.textContent : value;
var tag = document.createElement('li');
tag.className = 'select2-search-choice';
var span = document.createElement('span');
span.textContent = text;
tag.appendChild(span);
var close = document.createElement('a');
close.className = 'select2-search-choice-close';
close.tabIndex = -1;
close.setAttribute('aria-label', 'Remove ' + text);
close.textContent = '\u00d7'; // No I18N
close.addEventListener('click', function(e) {
e.preventDefault();
e.stopPropagation();
removeValue(value);
});
tag.appendChild(close);
choicesList.insertBefore(tag, searchField);
});
searchInput.placeholder = selectedValues.length > 0 ? '' : defaultPlaceholder;
}
});
}catch(e){console.warn("multi-select JS error:",e);}})();
// -- Checkbox --
(function(){try{
// Checkboxes work natively with keyboard (Space to toggle)
}catch(e){console.warn("checkbox JS error:",e);}})();
// -- Radio Button --
(function(){try{
// Radio buttons work natively with keyboard navigation
// Add validation on form submit if needed
}catch(e){console.warn("radio-button JS error:",e);}})();
// -- Decision Box --
(function(){try{
// Single checkbox / decision box
}catch(e){console.warn("decision-box JS error:",e);}})();
// -- Name Field --
(function(){try{
// Name composite field works natively
}catch(e){console.warn("name-field JS error:",e);}})();
// -- Address Field --
(function(){try{
// Address composite field works natively
}catch(e){console.warn("address-field JS error:",e);}})();
// -- File Upload --
(function(){try{
var fileGroups = document.querySelectorAll('.form-fileupload-field:not(.zc-Audio-group):not(.zc-Video-group)'); // No I18N
fileGroups.forEach(function(root) {
var fileUpload = root.querySelector('.zc-file-upload'); // No I18N
var fileInput = root.querySelector('input[type="file"]'); // No I18N
var textDisplay = root.querySelector('.zc-image-hover-msg'); // No I18N
if (!fileUpload || !fileInput || !textDisplay) {
return;
}
fileInput.addEventListener('change', function() {
if (fileInput.files.length > 0) {
textDisplay.textContent = fileInput.files[0].name;
textDisplay.style.color = '#12132b';
} else {
textDisplay.textContent = 'Select File'; // No I18N
textDisplay.style.color = '';
}
});
fileUpload.addEventListener('dragover', function(e) {
if (fileInput.disabled) {
return;
}
e.preventDefault();
fileUpload.classList.add('zc-is-dragover'); // No I18N
});
fileUpload.addEventListener('dragleave', function() {
fileUpload.classList.remove('zc-is-dragover'); // No I18N
});
fileUpload.addEventListener('drop', function(e) {
if (fileInput.disabled) {
return;
}
e.preventDefault();
fileUpload.classList.remove('zc-is-dragover'); // No I18N
if (e.dataTransfer.files.length > 0) {
fileInput.files = e.dataTransfer.files;
fileInput.dispatchEvent(new Event('change')); // No I18N
}
});
});
}catch(e){console.warn("file-upload JS error:",e);}})();
// -- Image Upload --
(function(){try{
var imageGroups = document.querySelectorAll('.form-image-field'); // No I18N
imageGroups.forEach(function(root) {
var fileInput = root.querySelector('input[type="file"]'); // No I18N
var uploadText = root.querySelector('.zc-image-hover-msg'); // No I18N
if (!fileInput || !uploadText) {
return;
}
fileInput.addEventListener('change', function() {
if (fileInput.files && fileInput.files[0]) {
uploadText.textContent = fileInput.files[0].name;
uploadText.style.color = '#12132b';
} else {
uploadText.textContent = 'Select Image'; // No I18N
uploadText.style.color = '';
}
});
});
}catch(e){console.warn("image-upload JS error:",e);}})();
// -- Audio Upload --
(function(){try{
var audioGroups = document.querySelectorAll('[class*="zc-Audio-group"]'); // No I18N
audioGroups.forEach(function(root) {
var fileInput = root.querySelector('input[type="file"]'); // No I18N
var textDisplay = root.querySelector('.zc-image-hover-msg'); // No I18N
if (!fileInput || !textDisplay) {
return;
}
fileInput.addEventListener('change', function() {
if (fileInput.files.length > 0) {
textDisplay.textContent = fileInput.files[0].name;
textDisplay.style.color = '#12132b';
} else {
textDisplay.textContent = 'Select File'; // No I18N
textDisplay.style.color = '';
}
});
});
}catch(e){console.warn("audio-upload JS error:",e);}})();
// -- Video Upload --
(function(){try{
var videoGroups = document.querySelectorAll('[class*="zc-Video-group"]'); // No I18N
videoGroups.forEach(function(root) {
var fileInput = root.querySelector('input[type="file"]'); // No I18N
var textDisplay = root.querySelector('.zc-image-hover-msg'); // No I18N
if (!fileInput || !textDisplay) {
return;
}
fileInput.addEventListener('change', function() {
if (fileInput.files.length > 0) {
textDisplay.textContent = fileInput.files[0].name;
textDisplay.style.color = '#12132b';
} else {
textDisplay.textContent = 'Select File'; // No I18N
textDisplay.style.color = '';
}
});
});
}catch(e){console.warn("video-upload JS error:",e);}})();
// -- Rich Text --
(function(){try{
var editorRoots = document.querySelectorAll('.zc-rich-text-editor'); // No I18N
editorRoots.forEach(function(editorRoot) {
var root = editorRoot.closest('.zc-richtext-group') || editorRoot.closest('.zc-form-field'); // No I18N
var field = root ? (root.querySelector('.zc-form-field') || root.closest('.zc-form-field')) : null; // No I18N
var editor = editorRoot.querySelector('.zc-rich-text-content'); // No I18N
var hiddenInput = editorRoot.querySelector('textarea'); // No I18N
var toolbarBtns = editorRoot.querySelectorAll('.zc-toolbar-btn[data-command]'); // No I18N
var errorEl = root ? root.querySelector('.zc-field-error-text, .zc-field-error-msg') : null; // No I18N
var isDisabled = editorRoot.classList.contains('zc-rich-text-disabled') || // No I18N
editorRoot.getAttribute('aria-disabled') === 'true' ||
!editor ||
editor.getAttribute('contenteditable') !== 'true';
if (!editor || !hiddenInput) {
return;
}
function hasValue() {
return editor.textContent.replace(/\u00a0/g, ' ').trim().length > 0;
}
function isRequired() {
return hiddenInput.hasAttribute('required') || // No I18N
hiddenInput.getAttribute('aria-required') === 'true' ||
editor.getAttribute('aria-required') === 'true';
}
function setInvalidState(showError) {
if (!isRequired()) {
return;
}
editor.setAttribute('aria-invalid', 'true');
hiddenInput.setAttribute('aria-invalid', 'true');
if (field) {
field.classList.add('validationError'); // No I18N
}
if (errorEl && showError !== false) {
errorEl.hidden = false;
}
}
function clearInvalidState() {
editor.removeAttribute('aria-invalid');
hiddenInput.removeAttribute('aria-invalid');
if (field) {
field.classList.remove('validationError'); // No I18N
}
if (errorEl) {
errorEl.hidden = true;
}
}
function validateContent(showError) {
if (!isRequired() || isDisabled) {
return true;
}
if (hasValue()) {
clearInvalidState();
return true;
}
setInvalidState(showError);
return false;
}
function syncValue() {
hiddenInput.value = hasValue() ? editor.innerHTML : '';
if (hasValue()) {
clearInvalidState();
}
}
function updateToolbarState() {
if (isDisabled) {
return;
}
toolbarBtns.forEach(function(toolbarBtn) {
var command = toolbarBtn.getAttribute('data-command');
if (document.queryCommandState(command)) {
toolbarBtn.classList.add('zc-is-active'); // No I18N
} else {
toolbarBtn.classList.remove('zc-is-active'); // No I18N
}
});
}
toolbarBtns.forEach(function(toolbarBtn) {
toolbarBtn.addEventListener('click', function(e) {
if (isDisabled || toolbarBtn.disabled) {
return;
}
e.preventDefault();
editor.focus();
document.execCommand(toolbarBtn.getAttribute('data-command'), false, null);
syncValue();
updateToolbarState();
});
});
if (isDisabled) {
return;
}
editor.addEventListener('input', function() {
syncValue();
updateToolbarState();
});
editor.addEventListener('keyup', updateToolbarState);
editor.addEventListener('mouseup', updateToolbarState);
editor.addEventListener('focus', updateToolbarState);
editor.addEventListener('blur', function() {
syncValue();
validateContent(true);
});
syncValue();
});
}catch(e){console.warn("rich-text JS error:",e);}})();
// -- Signature Field --
(function(){try{
function initSignatureField(signatureField) {
var root = signatureField.closest('.zc-signature-group') || signatureField.closest('.zc-form-field'); // No I18N
var canvas = signatureField.querySelector('.zc-signature-canvas'); // No I18N
if (!canvas) {
return;
}
var formField = root ? (root.querySelector('.zc-form-field') || root.closest('.zc-form-field')) : signatureField.closest('.zc-form-field'); // No I18N
var inputWrapper = signatureField.closest('.zc-field-input-wrapper'); // No I18N
var clearBtn = signatureField.querySelector('.zc-signature-btn'); // No I18N
var hiddenInput = inputWrapper ? inputWrapper.querySelector('input[type="hidden"]') : null; // No I18N
var errorEl = root ? root.querySelector('.zc-field-error-text, .zc-field-error-msg') : null; // No I18N
var isDisabled = signatureField.classList.contains('zc-signature-field-disabled') || // No I18N
(root && root.classList.contains('zc-field-disabled')) || // No I18N
signatureField.getAttribute('aria-disabled') === 'true' ||
(clearBtn && clearBtn.disabled);
var isRequired = (hiddenInput && (hiddenInput.hasAttribute('required') || hiddenInput.getAttribute('aria-required') === 'true')) || // No I18N
canvas.getAttribute('aria-required') === 'true';
var ctx = canvas.getContext('2d'); // No I18N
var isDrawing = false;
var lastX = 0;
var lastY = 0;
var hasStroke = false;
if (!ctx || isDisabled) {
return;
}
ctx.strokeStyle = '#12132b'; // No I18N
ctx.lineWidth = 2;
ctx.lineCap = 'round'; // No I18N
ctx.lineJoin = 'round'; // No I18N
function setValue(value) {
if (hiddenInput) {
hiddenInput.value = value;
}
}
function setInvalidState(showError) {
if (!formField || !isRequired) {
return;
}
formField.classList.add('validationError'); // No I18N
canvas.setAttribute('aria-invalid', 'true');
if (hiddenInput) {
hiddenInput.setAttribute('aria-invalid', 'true');
}
if (errorEl && showError !== false) {
errorEl.hidden = false;
}
}
function clearValidationState() {
if (!formField) {
return;
}
formField.classList.remove('validationError'); // No I18N
canvas.removeAttribute('aria-invalid');
if (hiddenInput) {
hiddenInput.removeAttribute('aria-invalid');
}
if (errorEl) {
errorEl.hidden = true;
}
}
function validateSignature(showError) {
if (!isRequired || isDisabled) {
return true;
}
if (hiddenInput && hiddenInput.value) {
clearValidationState();
return true;
}
setInvalidState(showError);
return false;
}
function getPos(e) {
var rect = canvas.getBoundingClientRect();
var x, y;
if (e.touches) {
x = e.touches[0].clientX - rect.left;
y = e.touches[0].clientY - rect.top;
} else {
x = e.clientX - rect.left;
y = e.clientY - rect.top;
}
x = x * (canvas.width / rect.width);
y = y * (canvas.height / rect.height);
return { x: x, y: y };
}
function startDraw(e) {
e.preventDefault();
isDrawing = true;
var pos = getPos(e);
lastX = pos.x;
lastY = pos.y;
}
function draw(e) {
if (!isDrawing) {
return;
}
e.preventDefault();
var pos = getPos(e);
ctx.beginPath();
ctx.moveTo(lastX, lastY);
ctx.lineTo(pos.x, pos.y);
ctx.stroke();
lastX = pos.x;
lastY = pos.y;
hasStroke = true;
}
function stopDraw() {
if (!isDrawing) {
return;
}
isDrawing = false;
if (!hasStroke) {
return;
}
setValue(canvas.toDataURL());
clearValidationState();
}
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseleave', stopDraw);
canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDraw);
if (clearBtn) {
clearBtn.addEventListener('click', function() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
hasStroke = false;
setValue('');
validateSignature(true);
});
}
validateSignature(false);
}
Array.prototype.forEach.call(document.querySelectorAll('.zc-signature-field'), initSignatureField); // No I18N
}catch(e){console.warn("signature-field JS error:",e);}})();
// -- Form Buttons --
(function(){try{
// Add form submission logic as needed
}catch(e){console.warn("form-buttons JS error:",e);}})();
/* ===== Label Placement Tabs ===== */
(function(){
function setupInplace(formEl) {
if (!formEl || formEl._inplaceSetup) return;
formEl._inplaceSetup = true;
var groups = formEl.querySelectorAll(".form-group");
groups.forEach(function(grp) {
var inputs = grp.querySelectorAll("input.form-control, textarea.form-control, select.form-control");
var label = grp.querySelector(".form-label");
inputs.forEach(function(inp) {
inp.addEventListener("focus", function() {
if (!formEl.classList.contains("label-inplace")) return;
if (label) label.classList.add("zc-focus");
});
inp.addEventListener("blur", function() {
if (!formEl.classList.contains("label-inplace")) return;
if (label) label.classList.remove("zc-focus");
});
});
});
}
function enableInplace(formEl) {
if (!formEl) return;
setupInplace(formEl);
/* Add zc-label-float to all form-groups and remove placeholders */
formEl.querySelectorAll(".form-group").forEach(function(grp) {
grp.classList.add("zc-label-float");
});
formEl.querySelectorAll("input.form-control, textarea.form-control").forEach(function(inp) {
/* Keep placeholders for composite sub-fields (address, name) — they act as inline labels */
if (inp.closest(".compositeWrapper")) return;
inp._savedPlaceholder = inp.getAttribute("placeholder") || "";
inp.setAttribute("placeholder", "");
});
}
function disableInplace(formEl) {
if (!formEl) return;
formEl.querySelectorAll(".form-group").forEach(function(grp) {
grp.classList.remove("zc-label-float");
var label = grp.querySelector(".form-label");
if (label) label.classList.remove("zc-focus");
});
/* Restore placeholders */
formEl.querySelectorAll("input.form-control, textarea.form-control").forEach(function(inp) {
if (typeof inp._savedPlaceholder === "string") {
inp.setAttribute("placeholder", inp._savedPlaceholder);
delete inp._savedPlaceholder;
}
});
}
document.querySelectorAll(".label-placement-tabs").forEach(function(tabGroup) {
tabGroup.addEventListener("click", function(e) {
var t = eventTargetElement(e);
if (!t) return;
var tab = t.closest(".label-placement-tab");
if (!tab || !tabGroup.contains(tab)) return;
e.preventDefault();
var card = tab.closest(".variant-card");
if (!card) return;
tabGroup.querySelectorAll(".label-placement-tab").forEach(function(btn) { btn.classList.remove("is-active"); });
tab.classList.add("is-active");
var placement = tab.getAttribute("data-placement");
if (!placement) return;
var formEl = card.querySelector(".form-table");
if (!formEl) return;
["label-left", "label-right", "label-top", "label-inplace"].forEach(function(cls) { formEl.classList.remove(cls); });
formEl.classList.add(placement);
if (placement === "label-inplace") {
enableInplace(formEl);
} else {
disableInplace(formEl);
}
});
});
})();
/* ===== Primary Color Picker ===== */
(function(){
document.addEventListener("input", function(e) {
if (!e.target.classList.contains("primary-color-picker")) return;
var hex = e.target.value;
document.documentElement.style.setProperty("--primary-color", hex);
document.documentElement.style.setProperty("--primary-opacity", hex + "1f");
document.documentElement.style.setProperty("--color-primary", hex);
document.documentElement.style.setProperty("--color-primary-dark", hex);
document.documentElement.style.setProperty("--color-border-focus", hex);
document.querySelectorAll(".primary-color-picker").forEach(function(p){ p.value = hex; });
});
})();
/* ===== Form Field Validation ===== */
(function(){
var requiredInputs = document.querySelectorAll(".form-input[required]");
requiredInputs.forEach(function(input){
var errorEl = document.getElementById(input.getAttribute("aria-describedby"));
var field = input.closest(".form-field");
input.addEventListener("blur", function(){ validateInput(input, errorEl, field); });
input.addEventListener("input", function(){
if (input.getAttribute("aria-invalid") === "true") validateInput(input, errorEl, field);
});
});
var requiredTextareas = document.querySelectorAll(".form-textarea[required]");
requiredTextareas.forEach(function(ta){
var errorEl = document.getElementById(ta.getAttribute("aria-describedby"));
var field = ta.closest(".form-field");
ta.addEventListener("blur", function(){
if (!ta.value.trim()) { ta.setAttribute("aria-invalid","true"); if(errorEl) errorEl.hidden=false; if(field) field.classList.add("validationError"); }
else { ta.removeAttribute("aria-invalid"); if(errorEl) errorEl.hidden=true; if(field) field.classList.remove("validationError"); }
});
ta.addEventListener("input", function(){
if (ta.getAttribute("aria-invalid") === "true") { ta.removeAttribute("aria-invalid"); if(errorEl) errorEl.hidden=true; if(field) field.classList.remove("validationError"); }
});
});
function validateInput(input, errorEl, field){
if (!input.value.trim()) { input.setAttribute("aria-invalid","true"); if(errorEl) errorEl.hidden=false; if(field) field.classList.add("validationError"); }
else { input.removeAttribute("aria-invalid"); if(errorEl) errorEl.hidden=true; if(field) field.classList.remove("validationError"); }
}
})();