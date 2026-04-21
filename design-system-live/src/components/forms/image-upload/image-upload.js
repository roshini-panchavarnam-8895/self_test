// Image Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var imageGroups = document.querySelectorAll('.form-image-field'); // No I18N

  imageGroups.forEach(function(root) {
    var fileInput = root.querySelector('input[type="file"]'); // No I18N
    var uploadText = root.querySelector('.zc-image-hover-msg'); // No I18N

    if (!fileInput || !uploadText) {
      return;
    }

    fileInput.addEventListener('change', function() {
      if (fileInput.files && fileInput.files[0]) {
        uploadText.textContent = fileInput.files[0].name;
        uploadText.style.color = '#12132b';
      } else {
        uploadText.textContent = 'Select Image'; // No I18N
        uploadText.style.color = '';
      }
    });
  });
});