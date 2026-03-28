// Image Upload Component
document.addEventListener('DOMContentLoaded', function() {
  var imageGroups = document.querySelectorAll('.zc-imageupload-group');
  var imageFields = imageGroups.length ? imageGroups : document.querySelectorAll('.zc-form-field');

  imageFields.forEach(function(root) {
    var fileInput = root.querySelector('.zc-image-upload__input');
    var preview = root.querySelector('.zc-image-preview');
    var previewImg = root.querySelector('.zc-image-preview__img');
    var removeBtn = root.querySelector('.zc-image-preview__remove');
    var uploadText = root.querySelector('.zc-image-upload__text');

    if (!fileInput || !uploadText) {
      return;
    }

    fileInput.addEventListener('change', function() {
      if (fileInput.files && fileInput.files[0] && preview && previewImg) {
        var reader = new FileReader();
        reader.onload = function(e) {
          previewImg.src = e.target.result;
          preview.hidden = false;
          uploadText.textContent = fileInput.files[0].name;
          uploadText.style.color = '#12132b';
        };
        reader.readAsDataURL(fileInput.files[0]);
      } else if (!fileInput.files.length) {
        uploadText.textContent = 'Select Image';
        uploadText.style.color = '';
      }
    });

    if (removeBtn && preview && previewImg) {
      removeBtn.addEventListener('click', function() {
        fileInput.value = '';
        preview.hidden = true;
        previewImg.src = '';
        uploadText.textContent = 'Select Image';
        uploadText.style.color = '';
      });
    }
  });
});