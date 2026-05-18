// File Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var fileGroups = document.querySelectorAll('.form-fileupload-field:not(.zc-Audio-group):not(.zc-Video-group)');

  fileGroups.forEach(function(root) {
    var fileUpload = root.querySelector('.zc-file-upload');
    var fileInput = root.querySelector('input[type="file"]');
    var textDisplay = root.querySelector('.zc-image-hover-msg');

    if (!fileUpload || !fileInput || !textDisplay) {
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