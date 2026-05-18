// Phone Input Component — zc-intl-tel-input style
document.addEventListener('DOMContentLoaded', function() {
  var phoneGroups = document.querySelectorAll('.zc-phonenumber-group');
  var phoneFields = phoneGroups.length ? phoneGroups : document.querySelectorAll('.zc-phonenumber-field');

  phoneFields.forEach(function(root) {
    var selectedFlag = root.querySelector('.zc-selected-flag');
    var countryList = root.querySelector('.zc-country-list');
    var dialCodeEl = root.querySelector('.zc-selected-dial-code');
    var phoneInput = root.querySelector('input[type="tel"]');
    var errorEl = root.querySelector('.zc-field-error-text, .zc-field-error-msg');
    var field = root.querySelector('.zc-form-field') || root.closest('.zc-form-field');

    if (!selectedFlag || !countryList || !dialCodeEl || !phoneInput || !field) {
      return;
    }

    var flagEl = selectedFlag.querySelector('.zc-iti-flag');
    var isDisabled = phoneInput.disabled || selectedFlag.getAttribute('aria-disabled') === 'true';
    var isRequired = phoneInput.hasAttribute('required') || phoneInput.getAttribute('aria-required') === 'true';

    function closeCountryList() {
      countryList.hidden = true;
      selectedFlag.setAttribute('aria-expanded', 'false');
    }

    function openCountryList() {
      if (isDisabled) return;
      countryList.hidden = false;
      selectedFlag.setAttribute('aria-expanded', 'true');
    }

    function validatePhone() {
      if (!isRequired || !errorEl || phoneInput.disabled) {
        return;
      }

      var value = phoneInput.value.trim().replace(/[\s\-]/g, '');
      var errorText = errorEl.querySelector('span');

      if (!value) {
        phoneInput.setAttribute('aria-invalid', 'true');
        if (errorText) errorText.textContent = 'This field is required';
        errorEl.hidden = false;
        field.classList.add('validationError');
      } else if (value.length < 7 || value.length > 15) {
        phoneInput.setAttribute('aria-invalid', 'true');
        if (errorText) errorText.textContent = 'Please enter a valid phone number';
        errorEl.hidden = false;
        field.classList.add('validationError');
      } else {
        phoneInput.removeAttribute('aria-invalid');
        errorEl.hidden = true;
        field.classList.remove('validationError');
      }
    }

    selectedFlag.addEventListener('click', function(e) {
      if (isDisabled) return;
      e.stopPropagation();
      if (countryList.hidden) {
        openCountryList();
      } else {
        closeCountryList();
      }
    });

    selectedFlag.addEventListener('keydown', function(e) {
      if (isDisabled) return;

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
      if (isDisabled) return;

      var countryOption = e.target.closest('.zc-country');
      if (!countryOption) return;

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