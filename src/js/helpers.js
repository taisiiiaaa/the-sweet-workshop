import iconsSprite from '../images/icons.svg';

export function getStarsMarkup(rate) {
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
        <use href="${iconsSprite}#${iconType}"></use>
      </svg>
    `;
  }).join('');

  return stars;
}
