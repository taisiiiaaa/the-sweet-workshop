// Всі змінні іменовані по camelCase'u,
// класи по PascalCase'u,
// константи по UPPER_SNAKE_CASE'u.

import { PER_PAGE } from './constants.js';

const filtersContainer = document.querySelector('.dessert-filters');
const categoriesList = document.querySelector('.dessert-filters__list');
const dropdownBtn = document.getElementById('dessert-dropdown-btn');
const selectedCategoryName = document.getElementById('selected-category-name');
const gallery = document.querySelector('.dessert-gallery');
const loaderElement = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('.dessert-list__load-more-btn');

let activeCategory = 'all';
let currentPage = 1;

import { getCategories, getDessertsList } from './api/dessert-list-api.js';

async function loadDessertsByCategory() {
  showLoader();
  hideLoadMoreButton();
  currentPage = 1;
  if (gallery) gallery.innerHTML = '';

  try {
    const data = await getDessertsList({
      page: currentPage,
      limit: PER_PAGE,
      category: activeCategory,
    });

    createDessertGallery(data.desserts || []);

    if (data.totalItems > PER_PAGE) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getDessertsList({
      page: currentPage,
      limit: PER_PAGE,
      category: activeCategory,
    });

    const dessertsArray = data.desserts || [];
    createDessertGallery(dessertsArray);

    const totalRenderedCards = gallery ? gallery.children.length : 0;

    if (
      totalRenderedCards >= data.totalItems ||
      dessertsArray.length < PER_PAGE
    ) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
}

async function initApp() {
  showLoader();
  try {
    const categoriesData = await getCategories();
    createDessertFilter(categoriesData);

    await loadDessertsByCategory();
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}

function createDessertFilter(categories) {
  if (!categoriesList) return;

  let markup = `
      <li class="dessert-filters__item">
        <button type="button" class="dessert-filters__btn is-active" data-category="all">
        Всі десерти
      </button>
      </li>
    `;

  markup += categories
    .map(
      ({ _id, name }) => `
        <li class="dessert-filters__item">
          <button type="button" class="dessert-filters__btn" data-category="${_id}">
          ${name}
          </button>
        </li>
      `
    )
    .join('');

  categoriesList.innerHTML = markup;
}

function createDessertGallery(images) {
  if (!gallery) return;

  const markup = images
    .map(
      ({
        _id,
        name,
        description,
        price,
        category: { name: categoryName },
        image,
      }) => `
       <li class="gallery-list__product-item">
         <img 
          class="gallery-list__product-image"
          src="${image}"
          alt="${name}"
          id="${_id}"
          loading="lazy"
        />
        <p class="gallery-list__product-category">${categoryName}</p>
        <h3 class="gallery-list__product-title">${name}</h3>
        <p class="gallery-list__product-description">${description}</p>
        <div class="gallery-list__product-bottom">
          <span class="gallery-list__product-price">${price} грн</span>
          <button type="button" class="gallery-details-btn" data-id="${_id}">↗</button>
        </div>
       </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

filtersContainer?.addEventListener('click', event => {
  const clickedBtn = event.target.closest('.dessert-filters__btn');

  if (clickedBtn) {
    const currentActiveBtn = categoriesList.querySelector(
      '.dessert-filters__btn.is-active'
    );
    currentActiveBtn?.classList.remove('is-active');

    clickedBtn.classList.add('is-active');

    if (selectedCategoryName) {
      selectedCategoryName.textContent = clickedBtn.textContent.trim();
    }
    categoriesList.classList.remove('is-open');
    dropdownBtn?.classList.remove('is-open');

    activeCategory = clickedBtn.dataset.category;

    loadDessertsByCategory();
    return;
  }

  if (dropdownBtn?.contains(event.target)) {
    const isOpen = categoriesList.classList.toggle('is-open');

    dropdownBtn.classList.toggle('is-open', isOpen);

    if (selectedCategoryName) {
      selectedCategoryName.textContent = isOpen
        ? 'Виберіть категорію'
        : categoriesList
            .querySelector('.dessert-filters__btn.is-active')
            .textContent.trim();
    }
  }
});

document.addEventListener('click', event => {
  if (filtersContainer && !filtersContainer.contains(event.target)) {
    categoriesList?.classList.remove('is-open');

    if (selectedCategoryName && categoriesList) {
      const activeBtn = categoriesList.querySelector(
        '.dessert-filters__btn.is-active'
      );
      if (activeBtn) {
        selectedCategoryName.textContent = activeBtn.textContent.trim();
      }
    }
  }
});

loadMoreBtn?.addEventListener('click', onLoadMore);

function showLoader() {
  if (loaderElement) {
    loaderElement.classList.remove('is-hidden');
  }
}

function hideLoader() {
  if (loaderElement) {
    loaderElement.classList.add('is-hidden');
  }
}

function showLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

function hideLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('is-hidden');
  }
}

initApp();
