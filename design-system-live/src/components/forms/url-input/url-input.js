// URL Input Validation
document.addEventListener('DOMContentLoaded', function() {
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
});