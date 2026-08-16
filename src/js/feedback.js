import getFeedbacks from './api/feedback-api';
import renderSlides from './feedback-render';
import { showSuccessToast, showErrorToast } from './toast';
import Swiper from 'swiper/bundle';

const loader = document.querySelector('#loader');

function createSwiper(feedback) {
  const swiperWrapperElement = document.querySelector(
    '.feedback-swiper .swiper-wrapper'
  );
  swiperWrapperElement.innerHTML = renderSlides(feedback);
  loader.classList.remove('loader');
  new Swiper('.mySwiper', {
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
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

async function procesFeedback() {
  loader.classList.add('loader');
  try {
    const feedback = await getFeedbacks();
    createSwiper(feedback);
  } catch (error) {
    showErrorToast(error);
    return;
  }
}

procesFeedback();
