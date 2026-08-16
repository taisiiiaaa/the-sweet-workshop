import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const TABLET_BREAKPOINT = 768;

const prevBtn = document.querySelector('.about-us__btn--prev');
const nextBtn = document.querySelector('.about-us__btn--next');
const paginationItems = document.querySelectorAll('.about-us__pagination-item');

function updatePagination(index) {
  paginationItems.forEach((item, i) => {
    item.classList.toggle('about-us__pagination-item--active', i === index);
  });
}

function updateButtons(swiper) {
  prevBtn.disabled = swiper.isBeginning;
  nextBtn.disabled = swiper.isEnd;
}

let swiper = null;

function initSwiper() {
  if (swiper) return;

  swiper = new Swiper('.about-us__swiper', {
    modules: [Navigation],
    slidesPerView: 2,
    spaceBetween: 16,
    initialSlide: 0,
    speed: 600,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    breakpoints: {
      1440: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
    },
    on: {
      slideChange(s) {
        updatePagination(s.activeIndex);
        updateButtons(s);
      },
      init(s) {
        updatePagination(s.activeIndex);
        updateButtons(s);
      },
    },
  });

  prevBtn.addEventListener('click', () => swiper.slidePrev());
  nextBtn.addEventListener('click', () => swiper.slideNext());

  paginationItems.forEach((item, i) => {
    item.addEventListener('click', () => swiper.slideTo(i));
  });
}

function destroySwiper() {
  if (!swiper) return;
  swiper.destroy(true, true);
  swiper = null;
  prevBtn.disabled = false;
  nextBtn.disabled = false;
  updatePagination(0);
}

const mediaQuery = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`);

if (mediaQuery.matches) initSwiper();

mediaQuery.addEventListener('change', e => {
  if (e.matches) initSwiper();
  else destroySwiper();
});
