// Select2 Multi Select Component
document.addEventListener('DOMContentLoaded', function() {
  var containers = document.querySelectorAll('.select2-container-multi');

  containers.forEach(function(container) {
    var choicesList = container.querySelector('.select2-choices');
    var searchField = container.querySelector('.select2-search-field');
    var searchInput = container.querySelector('.select2-search-field .select2-input');
    var drop = container.querySelector('.select2-drop-multi');
    var resultsList = drop ? drop.querySelector('.select2-results') : null;
    var results = drop ? drop.querySelectorAll('.select2-result') : [];
    var formField = container.closest('.form-field');
    var hiddenInput = formField ? formField.querySelector('input[type="hidden"]') : null;
    var selectedValues = [];
    var defaultPlaceholder = searchInput ? (searchInput.getAttribute('placeholder') || '') : '';
    var isDisabled = container.classList.contains('select2-container-disabled') ||
      container.getAttribute('aria-disabled') === 'true' ||
      (searchInput && searchInput.disabled);

    if (!choicesList || !searchField || !searchInput || !drop || !resultsList) return;

    choicesList.addEventListener('click', function(e) {
      if (isDisabled) return;
      e.stopPropagation();
      if (!container.classList.contains('select2-dropdown-open')) openDropdown();
      searchInput.focus();
    });

    searchInput.addEventListener('focus', function() {
      if (isDisabled) return;
      if (!container.classList.contains('select2-dropdown-open')) openDropdown();
    });

    searchInput.addEventListener('input', function() {
      if (isDisabled) return;
      var query = searchInput.value.toLowerCase();
      results.forEach(function(result) {
        if (selectedValues.indexOf(result.getAttribute('data-value')) > -1) {
          result.style.display = 'none';
          return;
        }
        var label = result.querySelector('.select2-result-label');
        var text = label ? label.textContent.toLowerCase() : '';
        result.style.display = text.indexOf(query) > -1 ? '' : 'none';
      });
    });

    searchInput.addEventListener('keydown', function(e) {
      if (isDisabled) return;
      if (e.key === 'Escape') closeDropdown();
      if (e.key === 'Backspace' && searchInput.value === '' && selectedValues.length > 0) {
        removeValue(selectedValues[selectedValues.length - 1]);
      }
    });

    results.forEach(function(result) {
      result.addEventListener('click', function(e) {
        if (isDisabled) return;
        e.stopPropagation();
        toggleOption(result);
        searchInput.focus();
      });
    });

    document.addEventListener('click', function(e) {
      if (!container.contains(e.target)) closeDropdown();
    });

    function openDropdown() {
      if (isDisabled) return;
      closeAllMulti();
      container.classList.add('select2-dropdown-open');
      container.setAttribute('aria-expanded', 'true');
      drop.classList.remove('select2-display-none');
      searchInput.placeholder = '';
      results.forEach(function(r) {
        r.style.display = selectedValues.indexOf(r.getAttribute('data-value')) > -1 ? 'none' : '';
      });
    }

    function closeDropdown() {
      container.classList.remove('select2-dropdown-open');
      container.setAttribute('aria-expanded', 'false');
      drop.classList.add('select2-display-none');
      searchInput.value = '';
      searchInput.placeholder = selectedValues.length > 0 ? '' : defaultPlaceholder;
    }

    function closeAllMulti() {
      document.querySelectorAll('.select2-container-multi.select2-dropdown-open').forEach(function(c) {
        c.classList.remove('select2-dropdown-open');
        c.setAttribute('aria-expanded', 'false');
        var d = c.querySelector('.select2-drop-multi');
        if (d) d.classList.add('select2-display-none');
      });
    }

    function toggleOption(result) {
      var value = result.getAttribute('data-value');
      var idx = selectedValues.indexOf(value);
      if (idx > -1) {
        selectedValues.splice(idx, 1);
        result.classList.remove('select2-result-selected');
        result.style.display = '';
      } else {
        selectedValues.push(value);
        result.classList.add('select2-result-selected');
        result.style.display = 'none';
      }
      renderChoices();
      if (hiddenInput) hiddenInput.value = selectedValues.join(',');
    }

    function removeValue(value) {
      var idx = selectedValues.indexOf(value);
      if (idx > -1) selectedValues.splice(idx, 1);
      results.forEach(function(r) {
        if (r.getAttribute('data-value') === value) {
          r.classList.remove('select2-result-selected');
          r.style.display = '';
        }
      });
      renderChoices();
      if (hiddenInput) hiddenInput.value = selectedValues.join(',');
    }

    function renderChoices() {
      var existingTags = choicesList.querySelectorAll('.select2-search-choice');
      existingTags.forEach(function(tag) { tag.remove(); });

      selectedValues.forEach(function(value) {
        var result = drop.querySelector('[data-value="' + value + '"]');
        var label = result ? result.querySelector('.select2-result-label') : null;
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
        close.textContent = '\u00d7';
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
});
