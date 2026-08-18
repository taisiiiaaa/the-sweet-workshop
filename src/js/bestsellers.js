import Swiper from 'swiper/bundle';
import { createDessertCardMarkup } from './product-card.js';
import { fetchBestsellers } from './api/bestsellers-api.js';

const DEMO_PRODUCTS = [
  {
    _id: '1',
    name: 'Брауні з горіхами',
    description: 'Соковитий шоколадний брауні з хрусткими горіхами.',
    price: 110,
    category: {
      name: 'Шоколадна випічка',
    },
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop',
  },
  {
    _id: '2',
    name: 'Фруктовий тарт',
    description: 'Ніжний тарт з ягідним кремом та свіжими фруктами.',
    price: 140,
    category: {
      name: 'Фруктові десерти',
    },
    image:
      'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop',
  },
  {
    _id: '3',
    name: 'Лавандовий чіз',
    description: 'Ніжний чіз з нотками лаванди та ягідним соусом.',
    price: 90,
    category: {
      name: 'Незабутні десерти',
    },
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
  },
];

function renderBestsellers(products) {
  const track = document.getElementById('bestsellersTrack');

  if (!track) {
    return;
  }

  track.innerHTML = products
    .map(
      product => `
        <li class="swiper-slide bestsellers-track__item">
          ${createDessertCardMarkup(product)}
        </li>
      `
    )
    .join('');
}

function createBestsellersSwiper(products) {
  renderBestsellers(products);

  const swiper = new Swiper('.bestsellers__swiper', {
    slidesPerView: 1,
    spaceBetween: 8,

    dynamicMainBullets: 6,

    speed: 600,

    pagination: {
      el: '.bestsellers__dots',
      clickable: true,
    },

    navigation: {
      nextEl: '.bestsellers-swiper .swiper-button-next',
      prevEl: '.bestsellers-swiper .swiper-button-prev',
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },

      1440: {
        slidesPerView: 3,
        spaceBetween: 24,
      },

    },
  });

  return swiper;
}

async function loadBestsellers() {
  try {
    const desserts = await fetchBestsellers();

    if (!Array.isArray(desserts) || desserts.length === 0) {
      console.warn(
        'API повернуло порожній список, використовую демо-дані'
      );

      createBestsellersSwiper(DEMO_PRODUCTS);

      return;
    }

    createBestsellersSwiper(desserts);
  } catch (error) {
    console.warn(
      'Не вдалося завантажити з API, використовую демо-дані:',
      error
    );

    createBestsellersSwiper(DEMO_PRODUCTS);
  }
}

document.addEventListener('DOMContentLoaded', loadBestsellers);