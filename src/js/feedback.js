import getFeedbacks from './api/feedback-api';
import renderSlides from './feedback-render';
import { showSuccessToast, showErrorToast } from './toast';
import Swiper from 'swiper/bundle';

const loader = document.querySelector('#loader');

let visibleBullets = 6;
const BULLET_SIZE = 8;
const BULLET_GAP = 8;
const BULLET_STEP = BULLET_SIZE + BULLET_GAP;

function updatePagination(swiper) {
  const bullets = swiper.pagination.bullets;
  const totalBullets = bullets.length;
  const activeIndex = swiper.realIndex;

  if (totalBullets <= visibleBullets) {
    bullets.forEach((bullet, index) => {
      bullet.style.transform = `translateX(${index * BULLET_STEP}px)`;
      bullet.style.opacity = index === activeIndex ? '1' : '0.2';
      bullet.style.visibility = 'visible';
    });

    return;
  }

  let startIndex = 0;

  if (activeIndex >= visibleBullets) {
    startIndex = activeIndex - visibleBullets + 1;
  }

  if (startIndex > totalBullets - visibleBullets) {
    startIndex = totalBullets - visibleBullets;
  }

  bullets.forEach((bullet, index) => {
    const position = index - startIndex;

    bullet.style.transform = `translateX(${position * BULLET_STEP}px)`;

    const isVisible =
      index >= startIndex && index < startIndex + visibleBullets;

    bullet.style.opacity = isVisible
      ? index === activeIndex
        ? '1'
        : '0.2'
      : '0';

    bullet.style.visibility = isVisible ? 'visible' : 'hidden';
  });
}

function createSwiper(feedback) {
  const swiperWrapperElement = document.querySelector(
    '.feedback-swiper .swiper-wrapper'
  );

  swiperWrapperElement.innerHTML = renderSlides(feedback);

  loader.classList.remove('loader');

  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
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

    on: {
      init(swiper) {
        updatePagination(swiper);
      },

      slideChangeTransitionStart(swiper) {
        updatePagination(swiper);
      },
    },
  });

  return swiper;
}

async function procesFeedback() {
  loader.classList.add('loader');

  try {
    const feedback = await getFeedbacks();

    if (feedback.length === 3) {
      visibleBullets = 0;
    }
    createSwiper(feedback);
  } catch (error) {
    showErrorToast(error);
  }
}

procesFeedback();
