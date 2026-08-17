import { getDessertDetails } from './api/dessert-details-api';
import { showErrorToast } from './toast';
// import { openModal } from './order-modal.js';
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

dessertList.addEventListener('click', event => {
  const button = event.target.closest('[data-id]');

  if (!button) {
    return;
  }

  const id = button.dataset.id;

  openDessertModal(id);
});

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.classList.contains('is-hidden')) {
    closeModal();
  }
});

orderBtn.addEventListener('click', openOrderModal);

function openOrderModal() {
  closeModal();

  const dessertId = orderBtn.dataset.id;
  openModal(dessertId);
}

async function openDessertModal(id) {
  modal.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');

  loader.classList.add('loader');

  try {
    const dessert = await getDessertDetails(id);

    renderDessertModal(dessert);
  } catch (err) {
    showErrorToast('Failed to load dessert details: ', err);
  } finally {
    loader.classList.remove('loader');
  }
}

function renderDessertModal(dessert) {
  modalImage.src = dessert.image;
  modalImage.alt = dessert.name;

  modalTitle.textContent = dessert.name;
  modalPrice.textContent = `${dessert.price} грн`;
  modalRating.innerHTML = getStarsMarkup(dessert.rate);
  modalDescription.textContent = dessert.description;
  modalIngredients.textContent = dessert.composition;

  orderBtn.dataset.id = dessert._id;
}

function closeModal() {
  modal.classList.add('is-hidden');
  document.body.classList.remove('no-scroll');
}
