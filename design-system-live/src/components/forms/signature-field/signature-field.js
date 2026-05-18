// Signature Field Component
document.addEventListener('DOMContentLoaded', function() {
  function initSignatureField(signatureField) {
    var root = signatureField.closest('.zc-signature-group') || signatureField.closest('.zc-form-field');
    var canvas = signatureField.querySelector('.zc-signature-canvas');
    if (!canvas) return;

    var formField = root ? (root.querySelector('.zc-form-field') || root.closest('.zc-form-field')) : signatureField.closest('.zc-form-field');
    var inputWrapper = signatureField.closest('.zc-field-input-wrapper');
    var clearBtn = signatureField.querySelector('.zc-signature-btn');
    var hiddenInput = inputWrapper ? inputWrapper.querySelector('input[type="hidden"]') : null;
    var errorEl = root ? root.querySelector('.zc-field-error-text, .zc-field-error-msg') : null;
    var isDisabled = signatureField.classList.contains('zc-signature-field-disabled') ||
      (root && root.classList.contains('zc-field-disabled')) ||
      signatureField.getAttribute('aria-disabled') === 'true' ||
      (clearBtn && clearBtn.disabled);
    var isRequired = (hiddenInput && (hiddenInput.hasAttribute('required') || hiddenInput.getAttribute('aria-required') === 'true')) ||
      canvas.getAttribute('aria-required') === 'true';
    var ctx = canvas.getContext('2d');
    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;
    var hasStroke = false;

    if (!ctx || isDisabled) return;

    ctx.strokeStyle = '#12132b';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function setValue(value) {
      if (hiddenInput) hiddenInput.value = value;
    }

    function setInvalidState(showError) {
      if (!formField || !isRequired) return;
      formField.classList.add('validationError');
      canvas.setAttribute('aria-invalid', 'true');
      if (hiddenInput) hiddenInput.setAttribute('aria-invalid', 'true');
      if (errorEl && showError !== false) errorEl.hidden = false;
    }

    function clearValidationState() {
      if (!formField) return;
      formField.classList.remove('validationError');
      canvas.removeAttribute('aria-invalid');
      if (hiddenInput) hiddenInput.removeAttribute('aria-invalid');
      if (errorEl) errorEl.hidden = true;
    }

    function validateSignature(showError) {
      if (!isRequired || isDisabled) return true;
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
      if (!isDrawing) return;
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
      if (!isDrawing) return;
      isDrawing = false;
      if (!hasStroke) return;
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

  Array.prototype.forEach.call(document.querySelectorAll('.zc-signature-field'), initSignatureField);
});