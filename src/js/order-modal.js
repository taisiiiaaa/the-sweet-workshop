import { showSuccessToast, showErrorToast } from './toast.js';

const modal = document.querySelector('[data-order]');
const closeButton = modal.querySelector('.order-modal__close');
const form = modal.querySelector('.order-modal__form');
const submitButton = modal.querySelector('.order-modal__submit');

const API_URL = '/orders';

function openModal() {
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
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
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    comment: formData.get('comment').trim(),
  };

  setLoading(true);

  try {
    const response = await fetch(API_URL, {
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
  } catch (error) {
    console.error('Order error:', error);

    showErrorToast(
      'Не вдалося оформити замовлення. Спробуйте ще раз.'
    );
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