import { getStarsMarkup } from './helpers';

function renderSlides(feedbacks) {
  return feedbacks
    .map(({ rate, description, author }) => {
      const stars = getStarsMarkup(rate);

      return `
        <li class="swiper-slide">
          <div class="rating">
            <div class="star-container">
              ${stars}
            </div>
          </div>

          <p class="feedback-description">"${description}"</p>
          <p class="feedback-author">${author}</p>
        </li>
      `;
    })
    .join('');
}

export default renderSlides;
