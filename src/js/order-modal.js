import { showSuccessToast, showErrorToast } from './toast.js';
import { BASE_URL } from './constants.js';

const modal = document.querySelector('[data-order]');
const closeButton = modal.querySelector('.order-modal__close');
const form = modal.querySelector('.order-modal__form');
const submitButton = modal.querySelector('.order-modal__submit');

function openModal(dessertId) {
  modal.classList.add('is-open');
  document.body.classList.add('no-scroll');

  if (dessertId) {
    modal.dataset.dessertId = dessertId;
  }
}

function closeModal() {
  modal.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
}

function createLoader() {
  const loader = document.createElement('span');

  loader.classList.add('loader');
  loader.setAttribute('aria-label', 'Завантаження');

  return loader;
}

function setLoading(isLoading) {
  if (isLoading) {
    submitButton.disabled = true;
    submitButton.dataset.text = submitButton.textContent;
    submitButton.textContent = '';
    submitButton.append(createLoader());
  } else {
    submitButton.disabled = false;
    submitButton.textContent = submitButton.dataset.text;
    delete submitButton.dataset.text;
  }
}

async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);

  const order = {
    dessertId: modal.dataset.dessertId,
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    comment: formData.get('comment').trim(),
  };

  setLoading(true);

  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    showSuccessToast('Замовлення успішно оформлено!');

    form.reset();
    closeModal();

    return data;
  } catch {
    showErrorToast('Не вдалося оформити замовлення. Спробуйте ще раз.');
  } finally {
    setLoading(false);
  }
}

closeButton.addEventListener('click', closeModal);

modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeModal();
  }
});

form.addEventListener('submit', handleSubmit);

export { openModal, closeModal };
