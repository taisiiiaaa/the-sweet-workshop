

const API = {
  products:
    'https://deserts-store.b.goit.study/api/desserts?type=popular',
};

import { createDessertCardMarkup } from './product-card.js';

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
    description:
      'Ніжний тарт з ягідним кремом та свіжими фруктами',
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
    description:
      'Ніжний чіз з нотками лаванди та ягідним соусом.',
    price: 90,
    category: {
      name: 'Незабутні десерти',
    },
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop',
  },
];

class BestsellersSlider {
  constructor(data) {
    this.data = data;

    this.track = document.getElementById('bestsellersTrack');
    this.dotsContainer = document.getElementById('bestsellersDots');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');

    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.totalSlides = 0;

    this.init();
  }

  getCardsPerView() {
    if (window.innerWidth <= 640) {
      return 1;
    }

    if (window.innerWidth <= 1024) {
      return 2;
    }

    return 3;
  }

  init() {
    this.renderCards();
    this.updateSlider();
    this.bindEvents();

    window.addEventListener(
      'resize',
      this.handleResize.bind(this)
    );
  }

  renderCards() {
    if (!this.track) return;

    this.track.innerHTML = this.data
      .map(
        item => `
          <li class="bestsellers-track__item">
            ${createDessertCardMarkup(item)}
          </li>
        `
      )
      .join('');
  }

  updateSlider() {
    this.cardsPerView = this.getCardsPerView();

    this.totalSlides = Math.max(
      0,
      this.data.length - this.cardsPerView
    );

    if (this.currentIndex > this.totalSlides) {
      this.currentIndex = this.totalSlides;
    }

    const firstCard =
      this.track?.querySelector('.dessert-card');

    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = window.innerWidth <= 767 ? 32 : 24;

      this.track.style.transform = `translateX(-${
        this.currentIndex * (cardWidth + gap)
      }px)`;
    }

    this.renderDots();
    this.updateButtons();
  }

  renderDots() {
    if (!this.dotsContainer) {
      return;
    }

    const dotsCount = this.totalSlides + 1;

    this.dotsContainer.innerHTML = '';

    for (let i = 0; i < dotsCount; i += 1) {
      const dot = document.createElement('button');

      dot.type = 'button';
      dot.className = `bestsellers__dot ${
        i === this.currentIndex ? 'active' : ''
      }`;

      dot.setAttribute('aria-label', `Слайд ${i + 1}`);

      dot.addEventListener('click', () => {
        this.currentIndex = i;
        this.updateSlider();
      });

      this.dotsContainer.appendChild(dot);
    }
  }

  updateButtons() {
    if (!this.prevBtn || !this.nextBtn) {
      return;
    }

    this.prevBtn.disabled = this.currentIndex === 0;

    this.nextBtn.disabled =
      this.currentIndex >= this.totalSlides;
  }

  next() {
    if (this.currentIndex < this.totalSlides) {
      this.currentIndex += 1;
      this.updateSlider();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
      this.updateSlider();
    }
  }

  handleResize() {
    const newCardsPerView = this.getCardsPerView();

    if (newCardsPerView !== this.cardsPerView) {
      this.updateSlider();
    }
  }

  bindEvents() {
    this.nextBtn?.addEventListener('click', () => {
      this.next();
    });

    this.prevBtn?.addEventListener('click', () => {
      this.prev();
    });

    let startX = 0;
    let isDragging = false;

    this.track?.addEventListener(
      'touchstart',
      event => {
        startX = event.touches[0].clientX;
        isDragging = true;
      },
      {
        passive: true,
      }
    );

    this.track?.addEventListener(
      'touchmove',
      () => {
        if (!isDragging) {
          return;
        }
      },
      {
        passive: true,
      }
    );

    this.track?.addEventListener(
      'touchend',
      event => {
        if (!isDragging) {
          return;
        }

        const endX = event.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            this.next();
          } else {
            this.prev();
          }
        }

        isDragging = false;
      }
    );
  }
}

async function loadBestsellers() {
  try {
    const response = await fetch(API.products);

    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }

    const data = await response.json();

    const desserts = data.desserts || data;

    if (!Array.isArray(desserts) || desserts.length === 0) {
      console.warn(
        'API повернуло порожній список, використовую демо-дані'
      );

      new BestsellersSlider(DEMO_PRODUCTS);
      return;
    }

    new BestsellersSlider(desserts);
  } catch (error) {
    console.warn(
      'Не вдалося завантажити з API, використовую демо-дані:',
      error
    );

    new BestsellersSlider(DEMO_PRODUCTS);
  }
}

document.addEventListener('DOMContentLoaded', loadBestsellers);