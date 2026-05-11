// Phone Input Component — zc-intl-tel-input style
document.addEventListener('DOMContentLoaded', function() {
  var phoneGroups = document.querySelectorAll('.zc-phonenumber-group'); // No I18N
  var phoneFields = phoneGroups.length ? phoneGroups : document.querySelectorAll('.zc-phonenumber-field'); // No I18N

  phoneFields.forEach(function(root) {
    var selectedFlag = root.querySelector('.zc-selected-flag'); // No I18N
    var countryList = root.querySelector('.zc-country-list'); // No I18N
    var dialCodeEl = root.querySelector('.zc-selected-dial-code'); // No I18N
    var phoneInput = root.querySelector('input[type="tel"]'); // No I18N
    var errorEl = root.querySelector('.zc-field-error-text, .zc-field-error-msg'); // No I18N
    var field = root.querySelector('.zc-form-field') || root.closest('.zc-form-field'); // No I18N

    if (!selectedFlag || !countryList || !dialCodeEl || !phoneInput || !field) {
      return;
    }

    var flagEl = selectedFlag.querySelector('.zc-iti-flag'); // No I18N
    var isDisabled = phoneInput.disabled || selectedFlag.getAttribute('aria-disabled') === 'true';
    var isRequired = phoneInput.hasAttribute('required') || phoneInput.getAttribute('aria-required') === 'true'; // No I18N

    function closeCountryList() {
      countryList.hidden = true;
      selectedFlag.setAttribute('aria-expanded', 'false');
    }

    function openCountryList() {
      if (isDisabled) {
        return;
      }
      countryList.hidden = false;
      selectedFlag.setAttribute('aria-expanded', 'true');
    }

    function validatePhone() {
      if (!isRequired || !errorEl || phoneInput.disabled) {
        return;
      }

      var value = phoneInput.value.trim().replace(/[\s\-]/g, '');
      var errorText = errorEl.querySelector('span'); // No I18N

      if (!value) {
        phoneInput.setAttribute('aria-invalid', 'true');
        if (errorText) {
          errorText.textContent = 'This field is required'; // No I18N
        }
        errorEl.hidden = false;
        field.classList.add('validationError'); // No I18N
      } else if (value.length < 7 || value.length > 15) {
        phoneInput.setAttribute('aria-invalid', 'true');
        if (errorText) {
          errorText.textContent = 'Please enter a valid phone number'; // No I18N
        }
        errorEl.hidden = false;
        field.classList.add('validationError'); // No I18N
      } else {
        phoneInput.removeAttribute('aria-invalid');
        errorEl.hidden = true;
        field.classList.remove('validationError'); // No I18N
      }
    }

    selectedFlag.addEventListener('click', function(e) {
      if (isDisabled) {
        return;
      }
      e.stopPropagation();
      if (countryList.hidden) {
        openCountryList();
      } else {
        closeCountryList();
      }
    });

    selectedFlag.addEventListener('keydown', function(e) {
      if (isDisabled) {
        return;
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (countryList.hidden) {
          openCountryList();
        } else {
          closeCountryList();
        }
      } else if (e.key === 'Escape' && !countryList.hidden) {
        closeCountryList();
      }
    });

    countryList.addEventListener('click', function(e) {
      if (isDisabled) {
        return;
      }

      var countryOption = e.target.closest('.zc-country'); // No I18N
      if (!countryOption) {
        return;
      }

      var code = countryOption.getAttribute('data-dial-code');
      var countryCode = countryOption.getAttribute('data-country-code');
      var name = countryOption.getAttribute('data-country-name');

      dialCodeEl.textContent = code;
      if (flagEl) {
        flagEl.className = 'zc-iti-flag ' + countryCode;
      }
      selectedFlag.title = name + ': ' + code;
      closeCountryList();
      phoneInput.focus();
    });

    document.addEventListener('click', function(e) {
      if (!root.contains(e.target) && !countryList.hidden) {
        closeCountryList();
      }
    });

    phoneInput.addEventListener('blur', function() {
      validatePhone();
    });

    phoneInput.addEventListener('input', function() {
      phoneInput.value = phoneInput.value.replace(/[^0-9\s\-]/g, '');
      if (phoneInput.getAttribute('aria-invalid') === 'true') {
        validatePhone();
      }
    });
  });
});