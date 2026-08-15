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

  // Вона бере масив десертів і перетворює кожен об'єкт на HTML-картку.
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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.2902 7.801L6.69448 17.4028C6.52065 17.5726 6.32073 17.6575 6.09473 17.6575C5.8689 17.6575 5.67098 17.5706 5.50098 17.3968C5.32715 17.2228 5.24023 17.0228 5.24023 16.797C5.24023 16.5712 5.32715 16.3713 5.50098 16.1973L15.0967 6.60175H6.64773C6.4034 6.60175 6.1994 6.51942 6.03573 6.35475C5.87207 6.19025 5.79023 5.98717 5.79023 5.7455C5.79023 5.504 5.87207 5.30242 6.03573 5.14075C6.1994 4.97909 6.4034 4.89825 6.64773 4.89825H17.1477C17.3882 4.89825 17.5903 4.98017 17.754 5.144C17.9177 5.30767 17.9995 5.50967 17.9995 5.75V16.25C17.9995 16.4903 17.9172 16.6923 17.7527 16.856C17.5882 17.0198 17.3852 17.1018 17.1435 17.1018C16.8978 17.1018 16.6942 17.0198 16.5325 16.856C16.371 16.6923 16.2902 16.4903 16.2902 16.25V7.801Z" fill="#080C0C" />
</svg>
            </button>
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  // Ця функція фактично рухає слайдер
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

  // створення крапочок під слайдером
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

// робота з api
async function loadBestsellers() {
  try {
    const response = await fetch(API.products);
    // перевірка демо
    // const response = await fetch("https://test-error-url.com/products");

    if (!response.ok) {
      throw new Error(`Помилка HTTP: ${response.status}`);
    }

    const data = await response.json();


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