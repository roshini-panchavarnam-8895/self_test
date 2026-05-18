// Video Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var videoGroups = document.querySelectorAll('[class*="zc-Video-group"]'); // No I18N

  videoGroups.forEach(function(root) {
    var fileInput = root.querySelector('input[type="file"]'); // No I18N
    var textDisplay = root.querySelector('.zc-image-hover-msg'); // No I18N

    if (!fileInput || !textDisplay) {
      return;
    }

    fileInput.addEventListener('change', function() {
      if (fileInput.files.length > 0) {
        textDisplay.textContent = fileInput.files[0].name;
        textDisplay.style.color = '#12132b';
      } else {
        textDisplay.textContent = 'Select File'; // No I18N
        textDisplay.style.color = '';
      }
    });
  });
});