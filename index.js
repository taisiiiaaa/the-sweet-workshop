import{r as e}from"./assets/rolldown-runtime-hePW80VL.js";import{a as t,i as n,n as r,r as i,t as a}from"./assets/vendor-BpLDxmXG.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var o=`https://deserts-store.b.goit.study/api`;async function s(){let{data:e}=await t.get(`${o}/categories`);return e}async function c({page:e,limit:n,category:r}){let i={page:e,limit:n};r&&r!==`all`&&(i.category=r);let{data:a}=await t.get(`${o}/desserts`,{params:i});return a}function ee(e){let t=e.category?e.category.name:``;return`
    <article class="product__card">
      <img
        class="product__image"
        src="${e.image}"
        alt="${e.name}"
        loading="lazy"
        width="303"
        height="227"
      />

      <div class="product-card__content">
        <span class="product__category">
          ${t}
        </span>

        <h3 class="product__title">
          ${e.name}
        </h3>

        <p class="product__description">
          ${e.description||``}
        </p>

        <div class="product__bottom">
          <span class="product__price">
            ${e.price} грн
          </span>

          <button
            type="button"
            class="js-product-details__btn"
            data-id="${e._id}"
            aria-label="Детальніше про десерт ${e.name}"
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
  `}var l=document.querySelector(`.dessert-filters`),u=document.querySelector(`.dessert-filters__list`),d=document.getElementById(`dessert-dropdown-btn`),f=document.getElementById(`selected-category-name`),p=document.querySelector(`.dessert-gallery`),m=document.querySelector(`#loader`),h=document.querySelector(`.dessert-list__load-more-btn`),g=`all`,_=1;async function v(){b(),C(),_=1,p&&(p.innerHTML=``);try{let e=await c({page:_,limit:8,category:g});y(e.desserts||[]),e.totalItems>8?S():C()}catch(e){console.error(e)}finally{x()}}async function te(){_+=1,b(),C();try{let e=await c({page:_,limit:8,category:g}),t=e.desserts||[];y(t),(p?p.children.length:0)>=e.totalItems||t.length<8?C():S()}catch(e){console.error(e),S()}finally{x()}}async function ne(){b();try{re(await s()),await v()}catch(e){console.error(e)}finally{x()}}function re(e){if(!u)return;let t=`
      <li class="dessert-filters__item">
        <button type="button" class="dessert-filters__btn is-active" data-category="all">
        Всі десерти
      </button>
      </li>
    `;t+=e.map(({_id:e,name:t})=>`
        <li class="dessert-filters__item">
          <button type="button" class="dessert-filters__btn" data-category="${e}">
          ${t}
          </button>
        </li>
      `).join(``),u.innerHTML=t}function y(e){if(!p)return;let t=e.map(e=>`
         <li class="gallery-list__product-item product__item">
           ${ee(e)}
         </li>
      `).join(``);p.insertAdjacentHTML(`beforeend`,t)}l?.addEventListener(`click`,e=>{let t=e.target.closest(`.dessert-filters__btn`);if(t){u.querySelector(`.dessert-filters__btn.is-active`)?.classList.remove(`is-active`),t.classList.add(`is-active`),f&&(f.textContent=t.textContent.trim()),u.classList.remove(`is-open`),d?.classList.remove(`is-open`),g=t.dataset.category,v();return}if(d?.contains(e.target)){let e=u.classList.toggle(`is-open`);d.classList.toggle(`is-open`,e),f&&(f.textContent=e?`Виберіть категорію`:u.querySelector(`.dessert-filters__btn.is-active`).textContent.trim())}}),document.addEventListener(`click`,e=>{if(l&&!l.contains(e.target)&&(u?.classList.remove(`is-open`),f&&u)){let e=u.querySelector(`.dessert-filters__btn.is-active`);e&&(f.textContent=e.textContent.trim())}}),h?.addEventListener(`click`,te);function b(){m&&m.classList.remove(`is-hidden`)}function x(){m&&m.classList.add(`is-hidden`)}function S(){h&&h.classList.remove(`is-hidden`)}function C(){h&&h.classList.add(`is-hidden`)}ne();async function w(e){let{data:n}=await t.get(`${o}/desserts/${e}`);return n}var T=e(n(),1);function ie(e){(0,T.default)({text:e,duration:3e3,gravity:`top`,position:`right`,style:{background:`linear-gradient(to right, #00b09b, #96c93d)`,borderRadius:`8px`}}).showToast()}function E(e){(0,T.default)({text:e,duration:3e3,gravity:`top`,position:`right`,style:{background:`linear-gradient(to right, #F44336, #FF6439)`,borderRadius:`8px`}}).showToast()}var D=document.querySelector(`[data-order]`),ae=D.querySelector(`.order-modal__close`),O=D.querySelector(`.order-modal__form`),k=D.querySelector(`.order-modal__submit`);function oe(e){D.classList.add(`is-open`),document.body.classList.add(`modal-open`),e&&(D.dataset.dessertId=e)}function A(){D.classList.remove(`is-open`),document.body.classList.remove(`modal-open`)}function se(){let e=document.createElement(`span`);return e.classList.add(`loader`),e.setAttribute(`aria-label`,`Завантаження`),e}function j(e){e?(k.disabled=!0,k.dataset.text=k.textContent,k.textContent=``,k.append(se())):(k.disabled=!1,k.textContent=k.dataset.text,delete k.dataset.text)}async function ce(e){e.preventDefault();let t=new FormData(O),n={dessertId:D.dataset.dessertId,name:t.get(`name`).trim(),phone:t.get(`phone`).trim(),comment:t.get(`comment`).trim()};j(!0);try{let e=await fetch(`${o}/orders`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(n)});if(!e.ok)throw Error(`HTTP error: ${e.status}`);let t=await e.json();return ie(`Замовлення успішно оформлено!`),O.reset(),A(),t}catch{E(`Не вдалося оформити замовлення. Спробуйте ще раз.`)}finally{j(!1)}}ae.addEventListener(`click`,A),D.addEventListener(`click`,e=>{e.target===D&&A()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&D.classList.contains(`is-open`)&&A()}),O.addEventListener(`submit`,ce);var le=`/the-sweet-workshop/assets/icons-BKESDM8N.svg`;function M(e){let t=Math.floor(e),n=e%1!=0;return Array.from({length:5},(e,r)=>{let i=`star-empty`;return r<t?i=`star-filled`:r===t&&n&&(i=`star-half`),`
      <svg class="star">
        <use href="${le}#${i}"></use>
      </svg>
    `}).join(``)}var N=document.querySelector(`[data-dessert-details-modal]`),ue=document.querySelector(`[data-close-dessert-modal]`),P=document.querySelector(`[data-modal-image]`),de=document.querySelector(`[data-modal-title]`),fe=document.querySelector(`[data-modal-price]`),pe=document.querySelector(`[data-modal-rating]`),F=document.querySelector(`[data-modal-description]`),I=document.querySelector(`[data-modal-ingredients]`),L=document.querySelector(`.dessert-modal-order-btn`),R=document.querySelector(`#dessert-loader`);document.querySelector(`.dessert-gallery`).addEventListener(`click`,e=>{let t=e.target.closest(`[data-id]`);if(!t)return;let n=t.dataset.id;me(n)}),ue.addEventListener(`click`,B),N.addEventListener(`click`,e=>{e.target===N&&B()}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&!N.classList.contains(`is-hidden`)&&B()}),L.addEventListener(`click`,z);function z(){B();let e=L.dataset.id;oe(e)}async function me(e){N.classList.remove(`is-hidden`),document.body.classList.add(`no-scroll`),R.classList.add(`loader`);try{he(await w(e))}catch(e){E(`Failed to load dessert details: `,e)}finally{R.classList.remove(`loader`)}}function he(e){P.src=e.image,P.alt=e.name,de.textContent=e.name,fe.textContent=`${e.price} грн`,pe.innerHTML=M(e.rate),F.textContent=e.description,I.textContent=e.composition,L.dataset.id=e._id}function B(){N.classList.add(`is-hidden`),document.body.classList.remove(`no-scroll`)}(()=>{let e={hamMenu:document.querySelector(`.menu-toggle`),navbar:document.querySelector(`[data-navbar]`),mobLinks:document.querySelectorAll(`.navbar-link`),navbarBtn:document.querySelector(`.navbar-order`)};e.mobLinks.forEach(e=>{e.addEventListener(`click`,t)}),e.hamMenu.addEventListener(`click`,t),e.navbarBtn.addEventListener(`click`,t);function t(){let t=e.navbar.classList.toggle(`is-open`);e.hamMenu.classList.toggle(`active`),document.body.classList.toggle(`no-scroll`,t),document.documentElement.classList.toggle(`no-scroll`,t)}})();var ge=768,V=document.querySelector(`.about-us__btn--prev`),H=document.querySelector(`.about-us__btn--next`),U=document.querySelectorAll(`.about-us__pagination-item`);function W(e){U.forEach((t,n)=>{t.classList.toggle(`about-us__pagination-item--active`,n===e)})}function G(e){V.disabled=e.isBeginning,H.disabled=e.isEnd}var K=null;function q(){K||(K=new i(`.about-us__swiper`,{modules:[r],slidesPerView:2,spaceBetween:16,speed:600,cssEase:`cubic-bezier(0.4, 0, 0.2, 1)`,breakpoints:{1440:{spaceBetween:24}},on:{slideChange(e){W(e.activeIndex),G(e)},init(e){W(e.activeIndex),G(e)}}}),V.addEventListener(`click`,()=>K.slidePrev()),H.addEventListener(`click`,()=>K.slideNext()),U.forEach((e,t)=>{e.addEventListener(`click`,()=>K.slideTo(t))}))}function _e(){K&&(K.destroy(!0,!0),K=null,V.disabled=!1,H.disabled=!1,W(0))}var J=window.matchMedia(`(min-width: ${ge}px)`);J.matches&&q(),J.addEventListener(`change`,e=>{e.matches?q():_e()}),new(e(a(),1)).default(`.accordion-container`,{duration:400,showMultiple:!1});async function ve(){return(await t.get(`https://deserts-store.b.goit.study/api/feedbacks`,{params:{limit:10,page:1}})).data.feedbacks}function ye(e){return e.map(({rate:e,description:t,author:n})=>`
        <li class="swiper-slide">
          <div class="rating">
            <div class="star-container">
              ${M(e)}
            </div>
          </div>

          <p class="feedback-description">"${t}"</p>
          <p class="feedback-author">${n}</p>
        </li>
      `).join(``)}var Y=document.querySelector(`#loader`),X=6,Z=16;function Q(e){let t=e.pagination.bullets,n=t.length,r=e.realIndex;if(n<=X){t.forEach((e,t)=>{e.style.transform=`translateX(${t*Z}px)`,e.style.opacity=t===r?`1`:`0.2`,e.style.visibility=`visible`});return}let i=0;r>=X&&(i=r-X+1),i>n-X&&(i=n-X),t.forEach((e,t)=>{let n=t-i;e.style.transform=`translateX(${n*Z}px)`;let a=t>=i&&t<i+X;e.style.opacity=a?t===r?`1`:`0.2`:`0`,e.style.visibility=a?`visible`:`hidden`})}function $(e){let t=document.querySelector(`.feedback-swiper .swiper-wrapper`);return t.innerHTML=ye(e),Y.classList.remove(`loader`),new i(`.mySwiper`,{slidesPerView:1,spaceBetween:16,loop:!0,pagination:{el:`.swiper-pagination`,clickable:!0},navigation:{nextEl:`.swiper-button-next`,prevEl:`.swiper-button-prev`},breakpoints:{768:{slidesPerView:3,spaceBetween:24}},on:{init(e){Q(e)},slideChangeTransitionStart(e){Q(e)}}})}async function be(){Y.classList.add(`loader`);try{let e=await ve();e.length===3&&(X=0),$(e)}catch(e){E(e)}}be();
//# sourceMappingURL=index.js.map