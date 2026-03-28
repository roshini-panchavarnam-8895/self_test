// File Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var fileGroups = document.querySelectorAll('.zc-fileupload-group');
  var fileFields = fileGroups.length ? fileGroups : document.querySelectorAll('.zc-form-field');

  fileFields.forEach(function(root) {
    var fileUpload = root.querySelector('.zc-file-upload');
    var fileInput = root.querySelector('.zc-file-upload-input');
    var filenameDisplay = root.querySelector('.zc-file-upload__filename');
    var textDisplay = root.querySelector('.zc-file-upload-text');

    if (!fileUpload || !fileInput || !textDisplay) {
      return;
    }

    fileInput.addEventListener('change', function() {
      if (fileInput.files.length > 0) {
        if (filenameDisplay) {
          filenameDisplay.textContent = fileInput.files[0].name;
        }
        textDisplay.textContent = fileInput.files[0].name;
        textDisplay.style.color = '#12132b';
      } else {
        if (filenameDisplay) {
          filenameDisplay.textContent = '';
        }
        textDisplay.textContent = 'Select File';
        textDisplay.style.color = '';
      }
    });

    fileUpload.addEventListener('dragover', function(e) {
      if (fileInput.disabled) return;
      e.preventDefault();
      fileUpload.classList.add('zc-is-dragover');
    });

    fileUpload.addEventListener('dragleave', function() {
      fileUpload.classList.remove('zc-is-dragover');
    });

    fileUpload.addEventListener('drop', function(e) {
      if (fileInput.disabled) return;
      e.preventDefault();
      fileUpload.classList.remove('zc-is-dragover');
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        fileInput.dispatchEvent(new Event('change'));
      }
    });
  });
});