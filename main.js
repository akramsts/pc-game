(function () {
  'use strict';

  const modal = document.getElementById('confirmModal');
  const cancelBtn = document.getElementById('modalCancelBtn');
  const confirmBtn = document.getElementById('modalConfirmBtn');
  const modalMessage = document.getElementById('modalMessage');
  const downloadLinks = document.querySelectorAll('.download-link');

  if (!modal || !cancelBtn || !confirmBtn || !modalMessage) return;

  let currentUrl = '';
  let lastTrigger = null;

  function onKeydown(e) {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      (document.activeElement === confirmBtn ? cancelBtn : confirmBtn).focus();
    }
  }

  function openModal(trigger) {
    lastTrigger = trigger;
    currentUrl = trigger.getAttribute('href');

    const name = document.createElement('b');
    name.textContent = trigger.getAttribute('data-label');
    modalMessage.replaceChildren('Do you want to download ', name, '?');

    modal.classList.add('show');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onKeydown);
    confirmBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeydown);
    if (lastTrigger) lastTrigger.focus();
  }

  downloadLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(link);
    });
  });

  confirmBtn.addEventListener('click', function () {
    if (currentUrl) window.open(currentUrl, '_blank', 'noopener');
    closeModal();
  });

  cancelBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
})();