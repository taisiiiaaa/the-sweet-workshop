import { getDessertDetails } from './api/dessert-details-api';
import { showErrorToast } from './toast';
import { openModal } from './order-modal.js';
import { getStarsMarkup } from './helpers.js';

const modal = document.querySelector('[data-dessert-details-modal]');
const closeBtn = document.querySelector('[data-close-dessert-modal]');

const modalImage = document.querySelector('[data-modal-image]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalPrice = document.querySelector('[data-modal-price]');
const modalRating = document.querySelector('[data-modal-rating]');
const modalDescription = document.querySelector('[data-modal-description]');
const modalIngredients = document.querySelector('[data-modal-ingredients]');
const orderBtn = document.querySelector('.dessert-modal-order-btn');

const loader = document.querySelector('#dessert-loader');
const dessertList = document.querySelector('.dessert-gallery');
const bestsellersTrack = document.querySelector('#bestsellersTrack');

function handleDessertDetailsClick(event) {
  const button = event.target.closest('[data-id]');

  if (!button) {
    return;
  }

  const id = button.dataset.id;

  if (!id) {
    return;
  }

  openDessertModal(id);
}

dessertList?.addEventListener('click', handleDessertDetailsClick);

bestsellersTrack?.addEventListener('click', handleDessertDetailsClick);

closeBtn?.addEventListener('click', closeModal);

modal?.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    modal &&
    !modal.classList.contains('is-hidden')
  ) {
    closeModal();
  }
});

orderBtn?.addEventListener('click', handleOrderBtnClick);

export async function openDessertModal(id) {
  if (!modal) {
    return;
  }

  modal.classList.remove('is-hidden');

  document.body.classList.add('no-scroll');

  showDessertLoader();

  clearDessertModal();

  try {
    const dessert = await getDessertDetails(id);

    renderDessertModal(dessert);
  } catch (error) {
    console.error(error);

    showErrorToast('Не вдалося завантажити інформацію про десерт');

    closeModal();
  } finally {
    hideDessertLoader();
  }
}

function renderDessertModal(dessert) {
  if (!dessert) {
    return;
  }

  if (modalImage) {
    modalImage.src = dessert.image || '';
    modalImage.alt = dessert.name || '';
  }

  if (modalTitle) {
    modalTitle.textContent = dessert.name || '';
  }

  if (modalPrice) {
    modalPrice.textContent = `${dessert.price ?? ''} грн`;
  }

  if (modalDescription) {
    modalDescription.textContent = dessert.description || '';
  }

  if (modalIngredients) {
    modalIngredients.textContent = dessert.composition || '';
  }

  const stars = getStarsMarkup(dessert.rate);
  if (modalRating) {
    modalRating.innerHTML = stars;
  }

  if (orderBtn) {
    orderBtn.dataset.id = dessert._id;
  }
}

function clearDessertModal() {
  if (modalImage) {
    modalImage.src = '';
    modalImage.alt = '';
  }

  if (modalTitle) {
    modalTitle.textContent = '';
  }

  if (modalPrice) {
    modalPrice.textContent = '';
  }

  if (modalDescription) {
    modalDescription.textContent = '';
  }

  if (modalIngredients) {
    modalIngredients.textContent = '';
  }

  if (modalRating) {
    modalRating.textContent = '';
  }

  if (orderBtn) {
    delete orderBtn.dataset.id;
  }
}

function showDessertLoader() {
  loader?.classList.remove('is-hidden');
}

function hideDessertLoader() {
  loader?.classList.add('is-hidden');
}

function handleOrderBtnClick() {
  const dessertId = orderBtn?.dataset.id;

  closeModal();

  openModal(dessertId);
}

function closeModal() {
  modal?.classList.add('is-hidden');

  document.body.classList.remove('no-scroll');
}
