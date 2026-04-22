// Textarea Component - Validation
document.addEventListener('DOMContentLoaded', function() {
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
});