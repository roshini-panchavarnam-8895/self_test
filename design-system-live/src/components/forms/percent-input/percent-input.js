// Percent Input - Allow only numbers and a single decimal point across all instances.
document.addEventListener('DOMContentLoaded', function() {
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
});