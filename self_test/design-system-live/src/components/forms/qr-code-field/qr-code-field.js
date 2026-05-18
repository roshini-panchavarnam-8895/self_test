document.addEventListener('DOMContentLoaded', function() {
  var requiredInputs = document.querySelectorAll('.zc-field-input[required]');
  requiredInputs.forEach(function(input) {
    var errorId = input.getAttribute('aria-describedby');
    var errorEl = errorId ? document.getElementById(errorId) : null;
    var field = input.closest('.zc-form-field'); // No I18N
    input.addEventListener('blur', function() { validateInput(input, errorEl, field); });
    input.addEventListener('input', function() {
      if (input.getAttribute('aria-invalid') === 'true') {
        validateInput(input, errorEl, field);
      }
    });
  });
  function validateInput(input, errorEl, field) {
    var hasError = !input.value.trim();
    input.toggleAttribute('aria-invalid', hasError); // No I18N
    if (!hasError) {
      input.removeAttribute('aria-invalid');
    }
    if (errorEl) {
      errorEl.hidden = !hasError;
    }
    if (field) {
      field.classList.toggle('validationError', hasError); // No I18N
      field.classList.toggle('zc-validation-error', hasError); // No I18N
    }
  }
});