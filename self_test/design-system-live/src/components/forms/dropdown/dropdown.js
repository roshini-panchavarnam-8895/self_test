// Select2 Dropdown Component
document.addEventListener('DOMContentLoaded', function() {
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
});
