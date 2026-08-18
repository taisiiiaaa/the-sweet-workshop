import{a as M,T as ee,S as R,N as me,A as fe}from"./assets/vendor-BeY3HugT.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const $="https://deserts-store.b.goit.study/api",_=8;async function ye(){const{data:e}=await M.get(`${$}/categories`);return e}async function te({page:e,limit:t,category:s}){const n={page:e,limit:t};s&&s!=="all"&&(n.category=s);const{data:r}=await M.get(`${$}/desserts`,{params:n});return r}const se="/the-sweet-workshop/assets/icons-BKESDM8N.svg";function ne(e){const t=e.category?e.category.name:"";return`
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
          ${e.description||""}
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
              <use href="${se}#arrow-up-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `}const L=document.querySelector(".dessert-filters"),i=document.querySelector(".dessert-filters__list"),m=document.getElementById("dessert-dropdown-btn"),g=document.getElementById("selected-category-name"),v=document.querySelector(".dessert-gallery"),E=document.querySelector("#dessert-list-loader"),y=document.querySelector(".dessert-list__load-more-btn");let F="all",S=1;async function re(){V(),k(),S=1,v&&(v.innerHTML="");try{const e=await te({page:S,limit:_,category:F});oe(e.desserts||[]),e.totalItems>_?N():k()}catch(e){console.error(e)}finally{U()}}async function ge(){S+=1,V(),k();try{const e=await te({page:S,limit:_,category:F}),t=e.desserts||[];oe(t),(v?v.children.length:0)>=e.totalItems||t.length<_?k():N()}catch(e){console.error(e),N()}finally{U()}}async function he(){V();try{const e=await ye();be(e),await re()}catch(e){console.error(e)}finally{U()}}function be(e){if(!i)return;let t=`
      <li class="dessert-filters__item">
        <button type="button" class="dessert-filters__btn is-active" data-category="all">
        Всі десерти
      </button>
      </li>
    `;t+=e.map(({_id:s,name:n})=>`
        <li class="dessert-filters__item">
          <button type="button" class="dessert-filters__btn" data-category="${s}">
          ${n}
          </button>
        </li>
      `).join(""),i.innerHTML=t}function oe(e){if(!v)return;const t=e.map(s=>`
         <li class="gallery-list__product-item product__item">
           ${ne(s)}
         </li>
      `).join("");v.insertAdjacentHTML("beforeend",t)}L==null||L.addEventListener("click",e=>{const t=e.target.closest(".dessert-filters__btn");if(t){const s=i.querySelector(".dessert-filters__btn.is-active");s==null||s.classList.remove("is-active"),t.classList.add("is-active"),g&&(g.textContent=t.textContent.trim()),i.classList.remove("is-open"),m==null||m.classList.remove("is-open"),F=t.dataset.category,re();return}if(m!=null&&m.contains(e.target)){const s=i.classList.toggle("is-open");m.classList.toggle("is-open",s),g&&(g.textContent=s?"Виберіть категорію":i.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",e=>{if(L&&!L.contains(e.target)&&(i==null||i.classList.remove("is-open"),g&&i)){const t=i.querySelector(".dessert-filters__btn.is-active");t&&(g.textContent=t.textContent.trim())}});y==null||y.addEventListener("click",ge);function V(){E&&E.classList.remove("is-hidden")}function U(){E&&E.classList.add("is-hidden")}function N(){y&&y.classList.remove("is-hidden")}function k(){y&&y.classList.add("is-hidden")}he();async function ve(e){const{data:t}=await M.get(`${$}/desserts/${e}`);return t}function Le(e){ee({text:e,duration:3e3,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #00b09b, #96c93d)",borderRadius:"8px"}}).showToast()}function G(e){ee({text:e,duration:3e3,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #F44336, #FF6439)",borderRadius:"8px"}}).showToast()}const d=document.querySelector("[data-order]"),we=d.querySelector(".order-modal__close"),j=d.querySelector(".order-modal__form"),u=d.querySelector(".order-modal__submit");function _e(e){d.classList.add("is-open"),document.body.classList.add("no-scroll"),e&&(d.dataset.dessertId=e)}function P(){d.classList.remove("is-open"),document.body.classList.remove("no-scroll")}function Ee(){const e=document.createElement("span");return e.classList.add("loader"),e.setAttribute("aria-label","Завантаження"),e}function J(e){e?(u.disabled=!0,u.dataset.text=u.textContent,u.textContent="",u.append(Ee())):(u.disabled=!1,u.textContent=u.dataset.text,delete u.dataset.text)}async function Se(e){e.preventDefault();const t=new FormData(j),s={dessertId:d.dataset.dessertId,name:t.get("name").trim(),phone:t.get("phone").trim(),comment:t.get("comment").trim()};J(!0);try{const n=await fetch(`${$}/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok)throw new Error(`HTTP error: ${n.status}`);const r=await n.json();return Le("Замовлення успішно оформлено!"),j.reset(),P(),r}catch{G("Не вдалося оформити замовлення. Спробуйте ще раз.")}finally{J(!1)}}we.addEventListener("click",P);d.addEventListener("click",e=>{e.target===d&&P()});document.addEventListener("keydown",e=>{e.key==="Escape"&&d.classList.contains("is-open")&&P()});j.addEventListener("submit",Se);function ae(e){const t=Math.floor(e),s=e%1!==0;return Array.from({length:5},(r,o)=>{let a="star-empty";return o<t?a="star-filled":o===t&&s&&(a="star-half"),`
      <svg class="star">
        <use href="${se}#${a}"></use>
      </svg>
    `}).join("")}const c=document.querySelector("[data-dessert-details-modal]"),D=document.querySelector("[data-close-dessert-modal]"),h=document.querySelector("[data-modal-image]"),x=document.querySelector("[data-modal-title]"),q=document.querySelector("[data-modal-price]"),C=document.querySelector("[data-modal-rating]"),T=document.querySelector("[data-modal-description]"),B=document.querySelector("[data-modal-ingredients]"),l=document.querySelector(".dessert-modal-order-btn"),b=document.querySelector("#dessert-loader"),I=document.querySelector(".dessert-gallery"),A=document.querySelector("#bestsellersTrack");function ie(e){const t=e.target.closest("[data-id]");if(!t)return;const s=t.dataset.id;s&&ke(s)}I==null||I.addEventListener("click",ie);A==null||A.addEventListener("click",ie);D==null||D.addEventListener("click",w);c==null||c.addEventListener("click",e=>{e.target===c&&w()});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.classList.contains("is-hidden")&&w()});l==null||l.addEventListener("click",Be);async function ke(e){if(c){c.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),Ce(),qe();try{const t=await ve(e);xe(t)}catch(t){console.error(t),G("Не вдалося завантажити інформацію про десерт"),w()}finally{Te()}}}function xe(e){if(!e)return;h&&(h.src=e.image||"",h.alt=e.name||""),x&&(x.textContent=e.name||""),q&&(q.textContent=`${e.price??""} грн`),T&&(T.textContent=e.description||""),B&&(B.textContent=e.composition||"");const t=ae(e.rate);C&&(C.innerHTML=t),l&&(l.dataset.id=e._id)}function qe(){h&&(h.src="",h.alt=""),x&&(x.textContent=""),q&&(q.textContent=""),T&&(T.textContent=""),B&&(B.textContent=""),C&&(C.textContent=""),l&&delete l.dataset.id}function Ce(){b==null||b.classList.remove("is-hidden")}function Te(){b==null||b.classList.add("is-hidden")}function Be(){const e=l==null?void 0:l.dataset.id;w(),_e(e)}function w(){c==null||c.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}(()=>{const e={hamMenu:document.querySelector(".header-menu-toggle"),navbar:document.querySelector("[data-navbar]"),mobLinks:document.querySelectorAll(".navbar-link"),navbarBtn:document.querySelector(".navbar-order")};e.hamMenu.addEventListener("click",t),e.mobLinks.forEach(n=>{n.addEventListener("click",s)}),e.navbarBtn&&e.navbarBtn.addEventListener("click",s);function t(){const n=e.navbar.classList.toggle("is-open");e.hamMenu.classList.toggle("active"),document.body.classList.toggle("no-scroll",n),document.documentElement.classList.toggle("no-scroll",n)}function s(){e.navbar.classList.remove("is-open"),e.hamMenu.classList.remove("active"),document.body.classList.remove("no-scroll"),document.documentElement.classList.remove("no-scroll")}})();const Me=768,K=document.querySelector(".about-us__btn--prev"),z=document.querySelector(".about-us__btn--next"),ce=document.querySelectorAll(".about-us__pagination-item");function H(e){ce.forEach((t,s)=>{t.classList.toggle("about-us__pagination-item--active",s===e)})}function Q(e){K.disabled=e.isBeginning,z.disabled=e.isEnd}let p=null;function le(){p||(p=new R(".about-us__swiper",{modules:[me],slidesPerView:2,spaceBetween:16,speed:600,cssEase:"cubic-bezier(0.4, 0, 0.2, 1)",breakpoints:{1440:{spaceBetween:24}},on:{slideChange(e){H(e.activeIndex),Q(e)},init(e){H(e.activeIndex),Q(e)}}}),K.addEventListener("click",()=>p.slidePrev()),z.addEventListener("click",()=>p.slideNext()),ce.forEach((e,t)=>{e.addEventListener("click",()=>p.slideTo(t))}))}function $e(){p&&(p.destroy(!0,!0),p=null,K.disabled=!1,z.disabled=!1,H(0))}const de=window.matchMedia(`(min-width: ${Me}px)`);de.matches&&le();de.addEventListener("change",e=>{e.matches?le():$e()});new fe(".accordion-container",{duration:400,showMultiple:!1});async function Pe(){return(await M.get("https://deserts-store.b.goit.study/api/feedbacks",{params:{limit:10,page:1}})).data.feedbacks}function De(e){return e.map(({rate:t,description:s,author:n})=>`
        <li class="swiper-slide">
          <div class="rating">
            <div class="star-container">
              ${ae(t)}
            </div>
          </div>

          <p class="feedback-description">"${s}"</p>
          <p class="feedback-author">${n}</p>
        </li>
      `).join("")}const ue=document.querySelector("#loader");let f=6;const Ie=8,Ae=8,W=Ie+Ae;function Z(e){const t=e.pagination.bullets,s=t.length,n=e.realIndex;if(s<=f){t.forEach((o,a)=>{o.style.transform=`translateX(${a*W}px)`,o.style.opacity=a===n?"1":"0.2",o.style.visibility="visible"});return}let r=0;n>=f&&(r=n-f+1),r>s-f&&(r=s-f),t.forEach((o,a)=>{const pe=a-r;o.style.transform=`translateX(${pe*W}px)`;const X=a>=r&&a<r+f;o.style.opacity=X?a===n?"1":"0.2":"0",o.style.visibility=X?"visible":"hidden"})}function Oe(e){const t=document.querySelector(".feedback-swiper .swiper-wrapper");return t.innerHTML=De(e),ue.classList.remove("loader"),new R(".mySwiper",{slidesPerView:1,spaceBetween:16,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:3,spaceBetween:24}},on:{init(n){Z(n)},slideChangeTransitionStart(n){Z(n)}}})}async function Ne(){ue.classList.add("loader");try{const e=await Pe();e.length===3&&(f=0),Oe(e)}catch(e){G(e)}}Ne();const je={products:"https://deserts-store.b.goit.study/api/desserts?type=popular"};async function He(){const e=await fetch(je.products);if(!e.ok)throw new Error(`Помилка HTTP: ${e.status}`);const t=await e.json();return t.desserts||t}const Y=[{_id:"1",name:"Брауні з горіхами",description:"Соковитий шоколадний брауні з хрусткими горіхами.",price:110,category:{name:"Шоколадна випічка"},image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop"},{_id:"2",name:"Фруктовий тарт",description:"Ніжний тарт з ягідним кремом та свіжими фруктами.",price:140,category:{name:"Фруктові десерти"},image:"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop"},{_id:"3",name:"Лавандовий чіз",description:"Ніжний чіз з нотками лаванди та ягідним соусом.",price:90,category:{name:"Незабутні десерти"},image:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop"}];function Re(e){const t=document.getElementById("bestsellersTrack");t&&(t.innerHTML=e.map(s=>`
        <li class="swiper-slide bestsellers-track__item">
          ${ne(s)}
        </li>
      `).join(""))}function O(e){return Re(e),new R(".bestsellers__swiper",{slidesPerView:1,spaceBetween:8,dynamicMainBullets:6,speed:600,pagination:{el:".bestsellers__dots",clickable:!0},navigation:{nextEl:".bestsellers-swiper .swiper-button-next",prevEl:".bestsellers-swiper .swiper-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:16},1440:{slidesPerView:3,spaceBetween:24}}})}async function Fe(){try{const e=await He();if(!Array.isArray(e)||e.length===0){console.warn("API повернуло порожній список, використовую демо-дані"),O(Y);return}O(e)}catch(e){console.warn("Не вдалося завантажити з API, використовую демо-дані:",e),O(Y)}}document.addEventListener("DOMContentLoaded",Fe);
//# sourceMappingURL=index.js.map
