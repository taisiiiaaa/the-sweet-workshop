import{a as L,S as M,N as j,A as D,T as R}from"./assets/vendor-Cf3z2XVp.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const P="https://deserts-store.b.goit.study/api";async function H(){const{data:e}=await L.get(`${P}/categories`);return e}async function T({page:e,limit:t,category:s}){const i={page:e,limit:t};s&&s!=="all"&&(i.category=s);const{data:r}=await L.get(`${P}/desserts`,{params:i});return r}const f=document.querySelector(".dessert-filters"),a=document.querySelector(".dessert-filters__list"),c=document.getElementById("dessert-dropdown-btn"),u=document.getElementById("selected-category-name"),p=document.querySelector(".dessert-gallery"),g=document.querySelector("#loader"),l=document.querySelector(".dessert-list__load-more-btn");let w="all",m=1;const y=8;async function A(){E(),b(),m=1,p&&(p.innerHTML="");try{const e=await T({page:m,limit:y,category:w});C(e.desserts||[]),e.totalItems>y?h():b()}catch(e){console.error(e)}finally{S()}}async function V(){m+=1,E(),b();try{const e=await T({page:m,limit:y,category:w}),t=e.desserts||[];C(t),(p?p.children.length:0)>=e.totalItems||t.length<y?b():h()}catch(e){console.error(e),h()}finally{S()}}async function z(){E();try{const e=await H();G(e),await A()}catch(e){console.error(e)}finally{S()}}function G(e){if(!a)return;let t=`
      <li class="dessert-filters__item">
        <button type="button" class="dessert-filters__btn is-active" data-category="all">
        Всі десерти
      </button>
      </li>
    `;t+=e.map(({_id:s,name:i})=>`
        <li class="dessert-filters__item">
          <button type="button" class="dessert-filters__btn" data-category="${s}">
          ${i}
          </button>
        </li>
      `).join(""),a.innerHTML=t}function C(e){if(!p)return;const t=e.map(({_id:s,name:i,description:r,price:n,category:{name:d},image:$})=>`
       <li class="gallery-list__product-item">
         <img 
          class="gallery-list__product-image"
          src="${$}"
          alt="${i}"
          id="${s}"
          loading="lazy"
        />
        <p class="gallery-list__product-category">${d}</p>
        <h3 class="gallery-list__product-title">${i}</h3>
        <p class="gallery-list__product-description">${r}</p>
        <div class="gallery-list__product-bottom">
          <span class="gallery-list__product-price">${n} грн</span>
          <button type="button" class="gallery-details-btn" data-id="${s}">↗</button>
        </div>
       </li>
    `).join("");p.insertAdjacentHTML("beforeend",t)}f==null||f.addEventListener("click",e=>{const t=e.target.closest(".dessert-filters__btn");if(t){const s=a.querySelector(".dessert-filters__btn.is-active");s==null||s.classList.remove("is-active"),t.classList.add("is-active"),u&&(u.textContent=t.textContent.trim()),a.classList.remove("is-open"),c==null||c.classList.remove("is-open"),w=t.dataset.category,A();return}if(c!=null&&c.contains(e.target)){const s=a.classList.toggle("is-open");c.classList.toggle("is-open",s),u&&(u.textContent=s?"Виберіть категорію":a.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",e=>{if(f&&!f.contains(e.target)&&(a==null||a.classList.remove("is-open"),u&&a)){const t=a.querySelector(".dessert-filters__btn.is-active");t&&(u.textContent=t.textContent.trim())}});l==null||l.addEventListener("click",V);function E(){g&&g.classList.remove("is-hidden")}function S(){g&&g.classList.add("is-hidden")}function h(){l&&l.classList.remove("is-hidden")}function b(){l&&l.classList.add("is-hidden")}z();(()=>{const e={hamMenu:document.querySelector(".menu-toggle"),navbar:document.querySelector("[data-navbar]"),mobLinks:document.querySelectorAll(".navbar-link"),navbarBtn:document.querySelector(".navbar-order")};e.mobLinks.forEach(s=>{s.addEventListener("click",t)}),e.hamMenu.addEventListener("click",t),e.navbarBtn.addEventListener("click",t);function t(){const s=e.navbar.classList.toggle("is-open");e.hamMenu.classList.toggle("active"),document.body.classList.toggle("no-scroll",s)}})();const K=768,k=document.querySelector(".about-us__btn--prev"),q=document.querySelector(".about-us__btn--next"),I=document.querySelectorAll(".about-us__pagination-item");function _(e){I.forEach((t,s)=>{t.classList.toggle("about-us__pagination-item--active",s===e)})}function x(e){k.disabled=e.isBeginning,q.disabled=e.isEnd}let o=null;function O(){o||(o=new M(".about-us__swiper",{modules:[j],slidesPerView:2,spaceBetween:16,speed:600,cssEase:"cubic-bezier(0.4, 0, 0.2, 1)",breakpoints:{1440:{spaceBetween:24}},on:{slideChange(e){_(e.activeIndex),x(e)},init(e){_(e.activeIndex),x(e)}}}),k.addEventListener("click",()=>o.slidePrev()),q.addEventListener("click",()=>o.slideNext()),I.forEach((e,t)=>{e.addEventListener("click",()=>o.slideTo(t))}))}function Q(){o&&(o.destroy(!0,!0),o=null,k.disabled=!1,q.disabled=!1,_(0))}const N=window.matchMedia(`(min-width: ${K}px)`);N.matches&&O();N.addEventListener("change",e=>{e.matches?O():Q()});new D(".accordion-container",{duration:400,showMultiple:!1});async function U(){return(await L.get("https://deserts-store.b.goit.study/api/feedbacks",{params:{limit:10,page:1}})).data.feedbacks}const W="/the-sweet-workshop/assets/icons-DYpeejZ2.svg";function Y(e){return e.map(({rate:t,description:s,author:i})=>{const r=Math.floor(t),n=t%1!==0;return`
        <li class="swiper-slide">
          <div class="rating">
            <div class="star-container">
              ${Array.from({length:5},($,B)=>{let v="star-empty";return B<r?v="star-filled":B===r&&n&&(v="star-half"),`
          <svg class="star">
            <use href="${W}#${v}"></use>
          </svg>
        `}).join("")}
            </div>
          </div>

          <p class="feedback-description">"${s}"</p>
          <p class="feedback-author">${i}</p>
        </li>
      `}).join("")}function Z(e){R({text:e,duration:3e3,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #F44336, #FF6439)",borderRadius:"8px"}}).showToast()}const F=document.querySelector("#loader");function J(e){const t=document.querySelector(".feedback-swiper .swiper-wrapper");t.innerHTML=Y(e),F.classList.remove("loader"),new M(".mySwiper",{slidesPerView:1,spaceBetween:16,loop:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:3,spaceBetween:24}}})}async function X(){F.classList.add("loader");try{const e=await U();J(e)}catch(e){Z(e);return}}X();
//# sourceMappingURL=index.js.map
