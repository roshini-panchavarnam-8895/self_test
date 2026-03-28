// Number Input Component - Allow only numbers
document.addEventListener('DOMContentLoaded', function() {
  var numberInput = document.getElementById('number-field');
  numberInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
});