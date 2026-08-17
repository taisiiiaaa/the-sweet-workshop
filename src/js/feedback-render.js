function renderSlides(feedbacks) {
  return feedbacks
    .map(({ rate, description, author }) => {
      const ratingValue = Math.floor(rate);
      const hasHalf = rate % 1 !== 0;

      const stars = Array.from({ length: 5 }, (_, index) => {
        let iconType = 'star-empty';

        if (index < ratingValue) {
          iconType = 'star-filled';
        } else if (index === ratingValue && hasHalf) {
          iconType = 'star-half';
        }

        return `
          <svg class="star">
            <use href="./images/icons.svg#${iconType}"></use>
          </svg>
        `;
      }).join('');

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
