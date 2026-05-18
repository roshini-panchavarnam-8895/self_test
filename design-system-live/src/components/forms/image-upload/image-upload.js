// Image Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var imageGroups = document.querySelectorAll('.form-image-field');

  imageGroups.forEach(function(root) {
    var fileInput = root.querySelector('input[type="file"]');
    var uploadText = root.querySelector('.zc-image-hover-msg');

    if (!fileInput || !uploadText) {
      return;
    }

    fileInput.addEventListener('change', function() {
      if (fileInput.files && fileInput.files[0]) {
        uploadText.textContent = fileInput.files[0].name;
        uploadText.style.color = '#12132b';
      } else {
        uploadText.textContent = 'Select Image';
        uploadText.style.color = '';
      }
    });
  });
});