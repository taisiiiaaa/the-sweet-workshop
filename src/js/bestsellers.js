import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { createDessertCardMarkup } from './product-card.js';
import { fetchBestsellers } from './api/bestsellers-api.js';
import { showErrorToast } from './toast';
import { openDessertModal } from './dessert-details.js';

const loader = document.querySelector('#loader');
const swiperWrapper = document.querySelector('.bestsellers__slider-wrapper');

const VISIBLE_BULLETS = 6;

const BULLET_SIZE = 8;
const BULLET_GAP = 8;
const BULLET_STEP = BULLET_SIZE + BULLET_GAP;

function renderBestsellers(products) {
  swiperWrapper.innerHTML = products
    .map(
      item => `
        <li class="swiper-slide">
          ${createDessertCardMarkup(item)}
        </li>
      `
    )
    .join('');
}

function updatePagination(swiper) {
  const bullets = swiper.pagination.bullets;
  const totalBullets = bullets.length;
  const activeIndex = swiper.realIndex;

  if (!totalBullets) {
    return;
  }

  if (totalBullets <= VISIBLE_BULLETS) {
    bullets.forEach((bullet, index) => {
      bullet.style.transform = `translateX(${index * BULLET_STEP}px)`;
      bullet.style.visibility = 'visible';
      bullet.style.opacity = index === activeIndex ? '1' : '0.2';
    });

    return;
  }

  let startIndex = activeIndex - Math.floor(VISIBLE_BULLETS / 2);

  startIndex = Math.max(startIndex, 0);
  startIndex = Math.min(startIndex, totalBullets - VISIBLE_BULLETS);

  bullets.forEach((bullet, index) => {
    const position = index - startIndex;

    const isVisible =
      index >= startIndex && index < startIndex + VISIBLE_BULLETS;

    bullet.style.transform = `translateX(${position * BULLET_STEP}px)`;

    bullet.style.visibility = isVisible ? 'visible' : 'hidden';

    bullet.style.opacity = isVisible && index === activeIndex ? '1' : '0.2';
  });
}

function createSwiper() {
  return new Swiper('.bestsellers__swiper .mySwiper', {
    slidesPerView: 1,
    spaceBetween: 16,

    loop: false,

    pagination: {
      el: '.bestsellers__swiper-pagination',
      clickable: true,
      dynamicBullets: false,
    },

    navigation: {
      nextEl: '.bestsellers__swiper-button-next',
      prevEl: '.bestsellers__swiper-button-prev',
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },

      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },

    on: {
      init(swiper) {
        updatePagination(swiper);
      },

      slideChangeTransitionStart(swiper) {
        updatePagination(swiper);
      },

      resize(swiper) {
        updatePagination(swiper);
      },
    },
  });
}

function handleProductDetailsClick(event) {
  const button = event.target.closest('.js-product-details__btn');

  if (!button || !swiperWrapper.contains(button)) {
    return;
  }

  const dessertId = button.dataset.id;

  if (!dessertId) {
    return;
  }

  openDessertModal(dessertId);
}

swiperWrapper?.addEventListener('click', handleProductDetailsClick);

async function processBestsellers() {
  loader?.classList.add('loader');

  try {
    const products = await fetchBestsellers();

    if (!products || products.length === 0) {
      return;
    }

    renderBestsellers(products);

    loader?.classList.remove('loader');

    createSwiper();
  } catch (error) {
    loader?.classList.remove('loader');

    showErrorToast(error);
  }
}

processBestsellers();
