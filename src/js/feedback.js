import getFeedbacks from './api/feedback-api';
import createSlides from './feedback-render';
import Swiper from 'swiper/bundle';

const SWIPER = new Swiper('.mySwiper', {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

try {
  const FEEDS = await getFeedbacks();
  createSlides(FEEDS);
} catch (error) {
  console.log(error);
}
