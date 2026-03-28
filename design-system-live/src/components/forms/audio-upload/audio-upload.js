// Audio Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var audioGroups = document.querySelectorAll('.zc-audioupload-group');
  var audioFields = audioGroups.length ? audioGroups : document.querySelectorAll('.zc-form-field');

  audioFields.forEach(function(root) {
    var fileInput = root.querySelector('.zc-file-upload-input');
    var textDisplay = root.querySelector('.zc-file-upload-text');

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