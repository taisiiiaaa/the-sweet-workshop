export function createDessertCardMarkup(item) {
  
  const categoryName = item.category ? item.category.name : '';

  return `
    <article class="product__card">
      <img
        class="product__image"
        src="${item.image}"
        alt="${item.name}"
        loading="lazy"
        width="303"
        height="227"
      />

      <div class="product-card__content">
        <span class="product__category">
          ${categoryName}
        </span>

        <h3 class="product__title">
          ${item.name}
        </h3>

        <p class="product__description">
          ${item.description || ''}
        </p>

        <div class="product__bottom">
          <span class="product__price">
            ${item.price} грн
          </span>

          <button
            type="button"
            class="js-product-details__btn"
            data-id="${item._id}"
            aria-label="Детальніше про десерт ${item.name}"
          >
            <svg
              class="product-details-btn__icon"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href="./images/icons.svg#arrow-up-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `;
}