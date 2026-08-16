import getFeedbacks from './api/feedback-api';
import renderSlides from './feedback-render';
import Swiper from 'swiper/bundle';

function createSwiper(feedback) {
  const swiperWrapperElement = document.querySelector('.swiper-wrapper');
  swiperWrapperElement.innerHTML = renderSlides(feedback);
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
  try {
    const feedback = await getFeedbacks();
    createSwiper(feedback);
  } catch (error) {
    console.log(error);
    return;
  }
}

procesFeedback();
