document.addEventListener('DOMContentLoaded', function() {
  var groups = document.querySelectorAll('.zc-otp-component');
  groups.forEach(function(root) {
    var inputs = Array.prototype.slice.call(root.querySelectorAll('.zc-otp-input'));
    var errorEl = root.querySelector('.zc-field-error-text, .zc-field-error-msg');
    var field = root.querySelector('.zc-form-field');
    var isRequired = root.getAttribute('data-otp-required') === 'true' || inputs.some(function(input) { return input.required; });
    var isDisabled = inputs.every(function(input) { return input.disabled; });

    if (!inputs.length || !field) {
      return;
    }

    function getDigits(value) {
      return String(value || "").replace(/[^0-9]/g, "");
    }

    function setInvalidState(hasError, showError) {
      inputs.forEach(function(input) {
        if (hasError) {
          input.setAttribute('aria-invalid', 'true');
        } else {
          input.removeAttribute('aria-invalid');
        }
      });
      field.classList.toggle('validationError', hasError);
      field.classList.toggle('zc-validation-error', hasError);
      if (errorEl) {
        if (!hasError) {
          errorEl.hidden = true;
        } else if (showError !== false) {
          errorEl.hidden = false;
        }
      }
    }

    function isComplete() {
      return inputs.every(function(input) { return /^[0-9]$/.test(input.value); });
    }

    function focusIndex(index) {
      if (inputs[index]) {
        inputs[index].focus();
        inputs[index].select();
      }
    }

    function applyDigits(startIndex, rawDigits) {
      var digits = getDigits(rawDigits);
      var targetIndex = digits.length >= inputs.length ? 0 : startIndex;
      var lastFilled = targetIndex;

      if (!digits) {
        inputs[startIndex].value = "";
        return;
      }

      for (var index = 0; index < inputs.length; index += 1) {
        if (index >= targetIndex) {
          inputs[index].value = "";
        }
      }

      for (var digitIndex = 0; digitIndex < digits.length && targetIndex + digitIndex < inputs.length; digitIndex += 1) {
        inputs[targetIndex + digitIndex].value = digits.charAt(digitIndex);
        lastFilled = targetIndex + digitIndex;
      }

      if (isComplete()) {
        focusIndex(inputs.length - 1);
      } else {
        focusIndex(Math.min(lastFilled + 1, inputs.length - 1));
      }
    }

    function validate(showError) {
      if (!isRequired || isDisabled) {
        setInvalidState(false, false);
        return true;
      }

      var valid = isComplete();
      setInvalidState(!valid, showError);
      return valid;
    }

    inputs.forEach(function(input, index) {
      input.addEventListener('focus', function() {
        input.select();
      });

      input.addEventListener('keydown', function(event) {
        if (input.disabled) return;

        if (event.key === 'Backspace') {
          if (input.value) {
            input.value = "";
            event.preventDefault();
            if (field.classList.contains('validationError')) {
              validate(true);
            }
            return;
          }

          if (index > 0) {
            event.preventDefault();
            focusIndex(index - 1);
          }
          return;
        }

        if (event.key.length === 1 && !/[0-9]/.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
        }
      });

      input.addEventListener('input', function() {
        if (input.disabled) return;
        var digits = getDigits(input.value);
        if (digits.length !== 1 || digits !== input.value) {
          applyDigits(index, digits);
        } else {
          input.value = digits;
          if (digits && index < inputs.length - 1) {
            focusIndex(index + 1);
          }
        }

        if (field.classList.contains('validationError')) {
          validate(true);
        }
      });

      input.addEventListener('paste', function(event) {
        if (input.disabled) return;
        var clipboard = event.clipboardData || window.clipboardData;
        var pasted = clipboard ? getDigits(clipboard.getData('text')) : "";
        if (!pasted) return;
        event.preventDefault();
        applyDigits(index, pasted);
        validate(field.classList.contains('validationError'));
      });
    });

    root.addEventListener('focusout', function() {
      setTimeout(function() {
        if (!root.contains(document.activeElement)) {
          validate(true);
        }
      }, 0);
    });

    if (!isRequired) {
      setInvalidState(false, false);
    }
  });
});