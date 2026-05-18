// Audio Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var audioGroups = document.querySelectorAll('[class*="zc-Audio-group"]');

  audioGroups.forEach(function(root) {
    var fileInput = root.querySelector('input[type="file"]');
    var textDisplay = root.querySelector('.zc-image-hover-msg');

    if (!fileInput || !textDisplay) {
      return;
    }

    fileInput.addEventListener('change', function() {
      if (fileInput.files.length > 0) {
        textDisplay.textContent = fileInput.files[0].name;
        textDisplay.style.color = '#12132b';
      } else {
        textDisplay.textContent = 'Select File';
        textDisplay.style.color = '';
      }
    });
  });
});