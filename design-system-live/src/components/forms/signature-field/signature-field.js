// Signature Field Component
document.addEventListener('DOMContentLoaded', function() {
  function initSignatureField(signatureField) {
    var root = signatureField.closest('.zc-signature-group') || signatureField.closest('.zc-form-field'); // No I18N
    var canvas = signatureField.querySelector('.zc-signature-canvas'); // No I18N
    if (!canvas) {
      return;
    }

    var formField = root ? (root.querySelector('.zc-form-field') || root.closest('.zc-form-field')) : signatureField.closest('.zc-form-field'); // No I18N
    var inputWrapper = signatureField.closest('.zc-field-input-wrapper'); // No I18N
    var clearBtn = signatureField.querySelector('.zc-signature-btn'); // No I18N
    var hiddenInput = inputWrapper ? inputWrapper.querySelector('input[type="hidden"]') : null; // No I18N
    var errorEl = root ? root.querySelector('.zc-field-error-text, .zc-field-error-msg') : null; // No I18N
    var isDisabled = signatureField.classList.contains('zc-signature-field-disabled') || // No I18N
      (root && root.classList.contains('zc-field-disabled')) || // No I18N
      signatureField.getAttribute('aria-disabled') === 'true' ||
      (clearBtn && clearBtn.disabled);
    var isRequired = (hiddenInput && (hiddenInput.hasAttribute('required') || hiddenInput.getAttribute('aria-required') === 'true')) || // No I18N
      canvas.getAttribute('aria-required') === 'true';
    var ctx = canvas.getContext('2d'); // No I18N
    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;
    var hasStroke = false;

    if (!ctx || isDisabled) {
      return;
    }

    ctx.strokeStyle = '#12132b'; // No I18N
    ctx.lineWidth = 2;
    ctx.lineCap = 'round'; // No I18N
    ctx.lineJoin = 'round'; // No I18N

    function setValue(value) {
      if (hiddenInput) {
        hiddenInput.value = value;
      }
    }

    function setInvalidState(showError) {
      if (!formField || !isRequired) {
        return;
      }
      formField.classList.add('validationError'); // No I18N
      canvas.setAttribute('aria-invalid', 'true');
      if (hiddenInput) {
        hiddenInput.setAttribute('aria-invalid', 'true');
      }
      if (errorEl && showError !== false) {
        errorEl.hidden = false;
      }
    }

    function clearValidationState() {
      if (!formField) {
        return;
      }
      formField.classList.remove('validationError'); // No I18N
      canvas.removeAttribute('aria-invalid');
      if (hiddenInput) {
        hiddenInput.removeAttribute('aria-invalid');
      }
      if (errorEl) {
        errorEl.hidden = true;
      }
    }

    function validateSignature(showError) {
      if (!isRequired || isDisabled) {
        return true;
      }
      if (hiddenInput && hiddenInput.value) {
        clearValidationState();
        return true;
      }

      setInvalidState(showError);
      return false;
    }

    function getPos(e) {
      var rect = canvas.getBoundingClientRect();
      var x, y;
      if (e.touches) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      x = x * (canvas.width / rect.width);
      y = y * (canvas.height / rect.height);
      return { x: x, y: y };
    }

    function startDraw(e) {
      e.preventDefault();
      isDrawing = true;
      var pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
    }

    function draw(e) {
      if (!isDrawing) {
        return;
      }
      e.preventDefault();
      var pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastX = pos.x;
      lastY = pos.y;
      hasStroke = true;
    }

    function stopDraw() {
      if (!isDrawing) {
        return;
      }
      isDrawing = false;
      if (!hasStroke) {
        return;
      }
      setValue(canvas.toDataURL());
      clearValidationState();
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);
    canvas.addEventListener('touchstart', startDraw);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDraw);

    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hasStroke = false;
        setValue('');
        validateSignature(true);
      });
    }

    validateSignature(false);
  }

  Array.prototype.forEach.call(document.querySelectorAll('.zc-signature-field'), initSignatureField); // No I18N
});