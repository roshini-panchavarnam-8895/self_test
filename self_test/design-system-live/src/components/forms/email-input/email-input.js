// Email Input Component - Validation
document.addEventListener('DOMContentLoaded', function() {
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
});