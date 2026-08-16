function renderSlides(feedbacks) {
  const markup = feedbacks
    .map(({ rate, description, author }) => {
      const ratingValue = Math.floor(rate);
      const hasHalf = rate % 1 !== 0;

      const starIcons = ['star-filled', 'star-half', 'star-empty']
        .map(
          iconType =>
            `<svg class="${iconType}"><use class="star-svg" href="./images/star-rating.icons.svg#${iconType}"></use></svg>`
        )
        .join('');

      const starMarkup = `<div class="star">${starIcons}</div>`;

      return `
      <li class="swiper-slide">
        <div class="rating large star-icon  value-${ratingValue} ${
          hasHalf ? 'half' : ''
        } label-hidden">
            <div class="label-value"></div>
            <div class="star-container">
                ${starMarkup.repeat(5)}
            </div>
        </div>
            <p class="feedback-description">"${description}"</p>
            <p class="feedback-author">${author}</p>
      </li>`;
    })
    .join('');

  return markup;
}

export default renderSlides;
