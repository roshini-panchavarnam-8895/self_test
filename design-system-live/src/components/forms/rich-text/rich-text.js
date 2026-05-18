// Rich Text Editor Component
document.addEventListener('DOMContentLoaded', function() {
  var editorRoots = document.querySelectorAll('.zc-rich-text-editor');

  editorRoots.forEach(function(editorRoot) {
    var root = editorRoot.closest('.zc-richtext-group') || editorRoot.closest('.zc-form-field');
    var field = root ? (root.querySelector('.zc-form-field') || root.closest('.zc-form-field')) : null;
    var editor = editorRoot.querySelector('.zc-rich-text-content');
    var hiddenInput = editorRoot.querySelector('textarea');
    var toolbarBtns = editorRoot.querySelectorAll('.zc-toolbar-btn[data-command]');
    var errorEl = root ? root.querySelector('.zc-field-error-text, .zc-field-error-msg') : null;
    var isDisabled = editorRoot.classList.contains('zc-rich-text-disabled') ||
      editorRoot.getAttribute('aria-disabled') === 'true' ||
      !editor ||
      editor.getAttribute('contenteditable') !== 'true';

    if (!editor || !hiddenInput) {
      return;
    }

    function hasValue() {
      return editor.textContent.replace(/\u00a0/g, ' ').trim().length > 0;
    }

    function isRequired() {
      return hiddenInput.hasAttribute('required') ||
        hiddenInput.getAttribute('aria-required') === 'true' ||
        editor.getAttribute('aria-required') === 'true';
    }

    function setInvalidState(showError) {
      if (!isRequired()) {
        return;
      }

      editor.setAttribute('aria-invalid', 'true');
      hiddenInput.setAttribute('aria-invalid', 'true');
      if (field) {
        field.classList.add('validationError');
      }
      if (errorEl && showError !== false) {
        errorEl.hidden = false;
      }
    }

    function clearInvalidState() {
      editor.removeAttribute('aria-invalid');
      hiddenInput.removeAttribute('aria-invalid');
      if (field) {
        field.classList.remove('validationError');
      }
      if (errorEl) {
        errorEl.hidden = true;
      }
    }

    function validateContent(showError) {
      if (!isRequired() || isDisabled) {
        return true;
      }

      if (hasValue()) {
        clearInvalidState();
        return true;
      }

      setInvalidState(showError);
      return false;
    }

    function syncValue() {
      hiddenInput.value = hasValue() ? editor.innerHTML : '';
      if (hasValue()) {
        clearInvalidState();
      }
    }

    function updateToolbarState() {
      if (isDisabled) {
        return;
      }

      toolbarBtns.forEach(function(toolbarBtn) {
        var command = toolbarBtn.getAttribute('data-command');
        if (document.queryCommandState(command)) {
          toolbarBtn.classList.add('zc-is-active');
        } else {
          toolbarBtn.classList.remove('zc-is-active');
        }
      });
    }

    toolbarBtns.forEach(function(toolbarBtn) {
      toolbarBtn.addEventListener('click', function(e) {
        if (isDisabled || toolbarBtn.disabled) {
          return;
        }

        e.preventDefault();
        editor.focus();
        document.execCommand(toolbarBtn.getAttribute('data-command'), false, null);
        syncValue();
        updateToolbarState();
      });
    });

    if (isDisabled) {
      return;
    }

    editor.addEventListener('input', function() {
      syncValue();
      updateToolbarState();
    });

    editor.addEventListener('keyup', updateToolbarState);
    editor.addEventListener('mouseup', updateToolbarState);
    editor.addEventListener('focus', updateToolbarState);
    editor.addEventListener('blur', function() {
      syncValue();
      validateContent(true);
    });

    syncValue();
  });
});