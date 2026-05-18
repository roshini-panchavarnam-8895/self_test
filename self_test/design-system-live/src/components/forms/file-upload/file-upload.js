// File Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var fileGroups = document.querySelectorAll('.form-fileupload-field:not(.zc-Audio-group):not(.zc-Video-group)'); // No I18N

  fileGroups.forEach(function(root) {
    var fileUpload = root.querySelector('.zc-file-upload'); // No I18N
    var fileInput = root.querySelector('input[type="file"]'); // No I18N
    var textDisplay = root.querySelector('.zc-image-hover-msg'); // No I18N

    if (!fileUpload || !fileInput || !textDisplay) {
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

    fileUpload.addEventListener('dragover', function(e) {
      if (fileInput.disabled) {
        return;
      }
      e.preventDefault();
      fileUpload.classList.add('zc-is-dragover'); // No I18N
    });

    fileUpload.addEventListener('dragleave', function() {
      fileUpload.classList.remove('zc-is-dragover'); // No I18N
    });

    fileUpload.addEventListener('drop', function(e) {
      if (fileInput.disabled) {
        return;
      }
      e.preventDefault();
      fileUpload.classList.remove('zc-is-dragover'); // No I18N
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change')); // No I18N
      }
    });
  });
});