document.addEventListener('DOMContentLoaded', function() {
  var groups = document.querySelectorAll('.zc-rating-group'); // No I18N
  groups.forEach(function(group) {
    var inputs = Array.prototype.slice.call(group.querySelectorAll('.zc-rating-input')); // No I18N
    var field = group.querySelector('.zc-form-field'); // No I18N
    var errorEl = group.querySelector('.zc-field-error-text, .zc-field-error-msg'); // No I18N
    var isRequired = group.getAttribute('aria-required') === 'true';
    var isDisabled = group.hasAttribute('disabled') || inputs.every(function(input) { return input.disabled; }); // No I18N

    if (!inputs.length || !field) {
      return;
    }

    function hasSelection() {
      return inputs.some(function(input) { return input.checked; });
    }

    function setInvalidState(hasError, showError) {
      inputs.forEach(function(input) {
        if (hasError) {
          input.setAttribute('aria-invalid', 'true');
        } else {
          input.removeAttribute('aria-invalid');
        }
      });
      field.classList.toggle('validationError', hasError); // No I18N
      field.classList.toggle('zc-validation-error', hasError); // No I18N
      if (errorEl) {
        if (!hasError) {
          errorEl.hidden = true;
        } else if (showError !== false) {
          errorEl.hidden = false;
        }
      }
    }

    function validate(showError) {
      if (!isRequired || isDisabled) {
        setInvalidState(false, false);
        return true;
      }
      var valid = hasSelection();
      setInvalidState(!valid, showError);
      return valid;
    }

    inputs.forEach(function(input) {
      input.addEventListener('change', function() {
        validate(true);
      });
    });

    group.addEventListener('focusout', function() {
      setTimeout(function() {
        if (!group.contains(document.activeElement)) {
          validate(true);
        }
      }, 0);
    });

    if (!isRequired) {
      setInvalidState(false, false);
    }
  });
});