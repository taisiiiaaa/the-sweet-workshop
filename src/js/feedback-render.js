const SWIPER = document.querySelector('.swiper-wrapper');

function createSlides(feedbacks) {
  const MARKUP = feedbacks
    .map(({ rate, description, author }) => {
      const ratingValue = Math.floor(rate);
      const hasHalf = rate % 1 !== 0;

      return `
        <li class="swiper-slide">
          <div class="rating large star-icon direction-rtl value-${ratingValue} ${
            hasHalf ? 'half' : ''
          } color-default label-hidden">

            <div class="label-value">${rate}</div>

            <div class="star-container">
              <div class="star">
                <i class="star-empty"></i>
                <i class="star-half"></i>
                <i class="star-filled"></i>
              </div>

              <div class="star">
                <i class="star-empty"></i>
                <i class="star-half"></i>
                <i class="star-filled"></i>
              </div>

              <div class="star">
                <i class="star-empty"></i>
                <i class="star-half"></i>
                <i class="star-filled"></i>
              </div>

              <div class="star">
                <i class="star-empty"></i>
                <i class="star-half"></i>
                <i class="star-filled">★</i>
              </div>

              <div class="star">
                <i class="star-empty"></i>
                <i class="star-half"></i>
                <i class="star-filled"></i>
              </div>
            </div>
          </div>

          <p>${description}</p>
          <p>${author}</p>
        </li>
      `;
    })
    .join('');

  SWIPER.innerHTML = MARKUP;
}

export default createSlides;
