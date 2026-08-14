const API = {
  products: "https://deserts-store.b.goit.study/api/desserts?type=popular"
};


const DEMO_PRODUCTS = [
  {
    _id: "1",
    name: "Брауні з горіхами",
    description: "Соковитий шоколадний брауні з хрусткими горіхами.",
    price: 110,
    category: { name: "Шоколадна випічка" },
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop",
  },
  {
    _id: "2",
    name: "Фруктовий тарт",
    description: "Ніжний тарт з ягідним кремом та свіжими фруктами",
    price: 140,
    category: { name: "Фруктові десерти" },
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop",
  },
  {
    _id: "3",
    name: "Лавандовий чіз",
    description: "Ніжний чіз з нотками лаванди та ягідним соусом.",
    price: 90,
    category: { name: "Незабутні десерти" },
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
  },
];

// СЛАЙДЕР 
class BestsellersSlider {
  constructor(data) {
    this.data = data;
    this.track = document.getElementById("bestsellersTrack");
    this.dotsContainer = document.getElementById("bestsellersDots");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");

    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.totalSlides = 0;

    this.init();
  }

  getCardsPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  init() {
    this.renderCards();
    this.updateSlider();
    this.bindEvents();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  renderCards() {
    this.track.innerHTML = this.data
      .map(
        (item) => `
      <article class="dessert-card">
        <img 
          class="dessert-card__image" 
          src="${item.image}" 
          alt="${item.name}" 
          loading="lazy"
        >
        <div class="dessert-card__content">
          <span class="dessert-card__category">${item.category?.name || ""}</span>
          <h3 class="dessert-card__title">${item.name}</h3>
          <p class="dessert-card__desc">${item.description || ""}</p>
          <div class="dessert-card__footer">
            <span class="dessert-card__price">${item.price} грн</span>
            <button class="dessert-card__btn" aria-label="Детальніше про ${item.name}">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  updateSlider() {
    this.cardsPerView = this.getCardsPerView();
    this.totalSlides = Math.max(0, this.data.length - this.cardsPerView);

    if (this.currentIndex > this.totalSlides) {
      this.currentIndex = this.totalSlides;
    }

    const firstCard = this.track.querySelector(".dessert-card");
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const gap = 24;
      this.track.style.transform = `translateX(-${this.currentIndex * (cardWidth + gap)}px)`;
    }

    this.renderDots();
    this.updateButtons();
  }

  renderDots() {
    const dotsCount = this.totalSlides + 1;
    this.dotsContainer.innerHTML = "";

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement("button");
      dot.className = `bestsellers__dot ${i === this.currentIndex ? "active" : ""}`;
      dot.setAttribute("aria-label", `Слайд ${i + 1}`);
      dot.addEventListener("click", () => {
        this.currentIndex = i;
        this.updateSlider();
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= this.totalSlides;
  }

  next() {
    if (this.currentIndex < this.totalSlides) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
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
    this.nextBtn.addEventListener("click", () => this.next());
    this.prevBtn.addEventListener("click", () => this.prev());

    // Свайп
    let startX = 0;
    let isDragging = false;

    this.track.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
      },
      { passive: true }
    );

    this.track.addEventListener(
      "touchmove",
      () => {
        if (!isDragging) return;
      },
      { passive: true }
    );

    this.track.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) this.next();
        else this.prev();
      }
      isDragging = false;
    });
  }
}

async function loadBestsellers() {
  try {
    const response = await fetch(API.products);

    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }

    const data = await response.json();

    // Дані лежать у data.desserts
    const desserts = data.desserts || data;

    if (!Array.isArray(desserts) || desserts.length === 0) {
      console.warn("API повернуло порожній список, використовую демо-дані");
      new BestsellersSlider(DEMO_PRODUCTS);
      return;
    }

    new BestsellersSlider(desserts);
  } catch (error) {
    console.warn("Не вдалося завантажити з API, використовую демо-дані:", error);
    new BestsellersSlider(DEMO_PRODUCTS);
  }
}


document.addEventListener("DOMContentLoaded", loadBestsellers);