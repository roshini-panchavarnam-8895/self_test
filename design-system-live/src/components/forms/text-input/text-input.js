// Text Input Component - Validation & Interaction
document.addEventListener('DOMContentLoaded', function() {
  const requiredInputs = document.querySelectorAll('.zc-field-input[required]');

  requiredInputs.forEach(function(input) {
    const errorEl = document.getElementById(input.getAttribute('aria-describedby'));
    const field = input.closest('.zc-form-field');

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
      if (errorEl) errorEl.hidden = false;
      if (field) field.classList.add('zc-validation-error');
    } else {
      input.removeAttribute('aria-invalid');
      if (errorEl) errorEl.hidden = true;
      if (field) field.classList.remove('zc-validation-error');
    }
  }
});