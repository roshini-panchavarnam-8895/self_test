// Select2 Dropdown Component
document.addEventListener('DOMContentLoaded', function() {
  var containers = document.querySelectorAll('.select2-container');

  containers.forEach(function(container) {
    var choice = container.querySelector('.select2-choice');
    var drop = container.querySelector('.select2-drop');
    var chosenText = container.querySelector('.select2-chosen');
    var results = drop ? drop.querySelectorAll('.select2-result') : [];
    var formField = container.closest('.form-field');
    var hiddenInput = formField ? formField.querySelector('input[type="hidden"]') : null;
    var isDisabled = container.classList.contains('select2-container-disabled') ||
      container.getAttribute('aria-disabled') === 'true';

    if (!choice || !drop || !chosenText) return;

    choice.addEventListener('click', function(e) {
      if (isDisabled) return;
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
      if (isDisabled) return;
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
        if (isDisabled) return;
        e.stopPropagation();
        results.forEach(function(r) { r.classList.remove('select2-result-selected'); });
        result.classList.add('select2-result-selected');
        var label = result.querySelector('.select2-result-label').textContent;
        var value = result.getAttribute('data-value');
        chosenText.textContent = label;
        container.classList.add('select2-has-value');
        if (hiddenInput) hiddenInput.value = value;
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
      container.classList.add('select2-dropdown-open');
      container.setAttribute('aria-expanded', 'true');
      drop.classList.remove('select2-display-none');
    }

    function closeDropdown() {
      container.classList.remove('select2-dropdown-open');
      container.setAttribute('aria-expanded', 'false');
      drop.classList.add('select2-display-none');
    }

    function closeAll() {
      document.querySelectorAll('.select2-container.select2-dropdown-open').forEach(function(c) {
        c.classList.remove('select2-dropdown-open');
        c.setAttribute('aria-expanded', 'false');
        var d = c.querySelector('.select2-drop');
        if (d) d.classList.add('select2-display-none');
      });
    }
  });
});
