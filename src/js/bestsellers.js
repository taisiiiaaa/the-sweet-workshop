import { createDessertCardMarkup } from './product-card.js';

const API = {
  products:
    'https://deserts-store.b.goit.study/api/desserts?type=popular',
};

const DEMO_PRODUCTS = [
  {
    _id: '1',
    name: 'Брауні з горіхами',
    description:
      'Соковитий шоколадний брауні з хрусткими горіхами.',
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
      'Ніжний тарт з ягідним кремом та свіжими фруктами.',
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

    this.track = document.getElementById(
      'bestsellersTrack'
    );

    this.dotsContainer = document.getElementById(
      'bestsellersDots'
    );

    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');

    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.totalSlides = 0;

    this.init();
  }

  getCardsPerView() {
    if (window.innerWidth < 768) {
      return 1;
    }

    if (window.innerWidth < 1440) {
      return 2;
    }

    return 3;
  }

  init() {
    if (!this.track) {
      return;
    }

    this.renderCards();
    this.updateSlider();
    this.bindEvents();

    window.addEventListener(
      'resize',
      this.handleResize.bind(this)
    );
  }

  renderCards() {
    if (!this.track) {
      return;
    }

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
    if (!this.track) {
      return;
    }

    this.cardsPerView = this.getCardsPerView();

    this.totalSlides = Math.max(
      0,
      this.data.length - this.cardsPerView
    );

    if (this.currentIndex > this.totalSlides) {
      this.currentIndex = this.totalSlides;
    }

    const firstSlide = this.track.querySelector(
      '.bestsellers-track__item'
    );

    if (firstSlide) {
      const slideWidth = firstSlide.offsetWidth;

      const gap = parseFloat(
        getComputedStyle(this.track).gap
      );

      const offset =
        this.currentIndex * (slideWidth + gap);

      this.track.style.transform = `translate3d(-${offset}px, 0, 0)`;
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

      dot.className =
        'bestsellers__dot' +
        (i === this.currentIndex
          ? ' active'
          : '');

      dot.setAttribute(
        'aria-label',
        `Слайд ${i + 1}`
      );

      dot.setAttribute(
        'aria-current',
        i === this.currentIndex
          ? 'true'
          : 'false'
      );

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

    this.prevBtn.disabled =
      this.currentIndex === 0;

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
    const newCardsPerView =
      this.getCardsPerView();

    if (
      newCardsPerView !== this.cardsPerView
    ) {
      this.currentIndex = 0;
      this.updateSlider();
      return;
    }

    this.updateSlider();
  }

  bindEvents() {
    this.nextBtn?.addEventListener(
      'click',
      () => {
        this.next();
      }
    );

    this.prevBtn?.addEventListener(
      'click',
      () => {
        this.prev();
      }
    );

    let startX = 0;
    let startY = 0;
    let isDragging = false;

    this.track?.addEventListener(
      'touchstart',
      event => {
        const touch = event.touches[0];

        startX = touch.clientX;
        startY = touch.clientY;

        isDragging = true;
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

        const touch = event.changedTouches[0];

        const endX = touch.clientX;
        const endY = touch.clientY;

        const diffX = startX - endX;
        const diffY = startY - endY;

        isDragging = false;

        // Якщо рух переважно вертикальний —
        // не перемикаємо слайд
        if (
          Math.abs(diffY) > Math.abs(diffX)
        ) {
          return;
        }

        // Мінімальна відстань свайпу
        if (Math.abs(diffX) < 50) {
          return;
        }

        if (diffX > 0) {
          this.next();
        } else {
          this.prev();
        }
      },
      {
        passive: true,
      }
    );
  }
}

async function loadBestsellers() {
  try {
    const response = await fetch(API.products);

    if (!response.ok) {
      throw new Error(
        `Помилка HTTP: ${response.status}`
      );
    }

    const data = await response.json();

    const desserts = data.desserts || data;

    if (
      !Array.isArray(desserts) ||
      desserts.length === 0
    ) {
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

document.addEventListener(
  'DOMContentLoaded',
  loadBestsellers
);