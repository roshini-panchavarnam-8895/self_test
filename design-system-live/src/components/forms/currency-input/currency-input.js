// Currency Input - Format with commas
document.addEventListener('DOMContentLoaded', function() {
  var currencyInputs = document.querySelectorAll('.zc-Currency, .zc-currency-input');
  if (!currencyInputs.length) return;

  currencyInputs.forEach(function(currencyInput) {
    currencyInput.addEventListener('input', function() {
      var value = this.value.replace(/[^0-9.]/g, '');
      var parts = value.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (parts.length > 2) parts = [parts[0], parts.slice(1).join('')];
      if (parts[1] && parts[1].length > 2) parts[1] = parts[1].substring(0, 2);
      this.value = parts.join('.');
    });
  });
});