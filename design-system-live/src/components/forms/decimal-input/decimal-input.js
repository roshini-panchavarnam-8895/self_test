// Decimal Input - Allow only numbers and one decimal point
document.addEventListener('DOMContentLoaded', function() {
  var decimalInput = document.getElementById('decimal');
  decimalInput.addEventListener('input', function() {
    var value = this.value.replace(/[^0-9.]/g, '');
    var parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    this.value = value;
  });
});