// Video Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var videoGroups = document.querySelectorAll('.zc-videoupload-group');
  var videoFields = videoGroups.length ? videoGroups : document.querySelectorAll('.zc-form-field');

  videoFields.forEach(function(root) {
    var fileInput = root.querySelector('.zc-file-upload-input');
    var textDisplay = root.querySelector('.zc-file-upload-text');
    var filenameDisplay = root.querySelector('.zc-file-upload__filename');

    if (!fileInput || !textDisplay) {
      return;
    }

    fileInput.addEventListener('change', function() {
      if (fileInput.files.length > 0) {
        textDisplay.textContent = fileInput.files[0].name;
        textDisplay.style.color = '#12132b';
        if (filenameDisplay) {
          filenameDisplay.textContent = (fileInput.files[0].size / (1024 * 1024)).toFixed(2) + ' MB';
        }
      } else {
        textDisplay.textContent = 'Select File';
        textDisplay.style.color = '';
        if (filenameDisplay) {
          filenameDisplay.textContent = '';
        }
      }
    });
  });
});