import{a as h,S as P,N as j,A as D}from"./assets/vendor-CfqMb2lB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();const q="https://deserts-store.b.goit.study/api";async function H(){const{data:e}=await h.get(`${q}/categories`);return e}async function C({page:e,limit:t,category:s}){const n={page:e,limit:t};s&&s!=="all"&&(n.category=s);const{data:i}=await h.get(`${q}/desserts`,{params:n});return i}const f=document.querySelector(".dessert-filters"),a=document.querySelector(".dessert-filters__list"),l=document.getElementById("dessert-dropdown-btn"),u=document.getElementById("selected-category-name"),p=document.querySelector(".dessert-gallery"),g=document.querySelector("#loader"),d=document.querySelector(".dessert-list__load-more-btn");let w="all",m=1;const y=8;async function M(){L(),b(),m=1,p&&(p.innerHTML="");try{const e=await C({page:m,limit:y,category:w});I(e.desserts||[]),e.totalItems>y?v():b()}catch(e){console.error(e)}finally{E()}}async function R(){m+=1,L(),b();try{const e=await C({page:m,limit:y,category:w}),t=e.desserts||[];I(t),(p?p.children.length:0)>=e.totalItems||t.length<y?b():v()}catch(e){console.error(e),v()}finally{E()}}async function V(){L();try{const e=await H();F(e),await M()}catch(e){console.error(e)}finally{E()}}function F(e){if(!a)return;let t=`
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
      `).join(""),a.innerHTML=t}function I(e){if(!p)return;const t=e.map(({_id:s,name:n,description:i,price:r,category:{name:c},image:k})=>`
       <li class="gallery-list__product-item">
         <img 
          class="gallery-list__product-image"
          src="${k}"
          alt="${n}"
          id="${s}"
          loading="lazy"
        />
        <p class="gallery-list__product-category">${c}</p>
        <h3 class="gallery-list__product-title">${n}</h3>
        <p class="gallery-list__product-description">${i}</p>
        <div class="gallery-list__product-bottom">
          <span class="gallery-list__product-price">${r} грн</span>
          <button type="button" class="gallery-details-btn" data-id="${s}">↗</button>
        </div>
       </li>
    `).join("");p.insertAdjacentHTML("beforeend",t)}f==null||f.addEventListener("click",e=>{const t=e.target.closest(".dessert-filters__btn");if(t){const s=a.querySelector(".dessert-filters__btn.is-active");s==null||s.classList.remove("is-active"),t.classList.add("is-active"),u&&(u.textContent=t.textContent.trim()),a.classList.remove("is-open"),l==null||l.classList.remove("is-open"),w=t.dataset.category,M();return}if(l!=null&&l.contains(e.target)){const s=a.classList.toggle("is-open");l.classList.toggle("is-open",s),u&&(u.textContent=s?"Виберіть категорію":a.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",e=>{if(f&&!f.contains(e.target)&&(a==null||a.classList.remove("is-open"),u&&a)){const t=a.querySelector(".dessert-filters__btn.is-active");t&&(u.textContent=t.textContent.trim())}});d==null||d.addEventListener("click",R);function L(){g&&g.classList.remove("is-hidden")}function E(){g&&g.classList.add("is-hidden")}function v(){d&&d.classList.remove("is-hidden")}function b(){d&&d.classList.add("is-hidden")}V();const z=768,S=document.querySelector(".about-us__btn--prev"),$=document.querySelector(".about-us__btn--next"),A=document.querySelectorAll(".about-us__pagination-item");function _(e){A.forEach((t,s)=>{t.classList.toggle("about-us__pagination-item--active",s===e)})}function B(e){S.disabled=e.isBeginning,$.disabled=e.isEnd}let o=null;function N(){o||(o=new P(".about-us__swiper",{modules:[j],slidesPerView:2,spaceBetween:16,initialSlide:0,speed:600,cssEase:"cubic-bezier(0.4, 0, 0.2, 1)",breakpoints:{1440:{slidesPerView:2,spaceBetween:24}},on:{slideChange(e){_(e.activeIndex),B(e)},init(e){_(e.activeIndex),B(e)}}}),S.addEventListener("click",()=>o.slidePrev()),$.addEventListener("click",()=>o.slideNext()),A.forEach((e,t)=>{e.addEventListener("click",()=>o.slideTo(t))}))}function G(){o&&(o.destroy(!0,!0),o=null,S.disabled=!1,$.disabled=!1,_(0))}const O=window.matchMedia(`(min-width: ${z}px)`);O.matches&&N();O.addEventListener("change",e=>{e.matches?N():G()});new D(".accordion-container",{duration:400,showMultiple:!1});async function K(){return(await h.get("https://deserts-store.b.goit.study/api/feedbacks",{params:{limit:10,page:1}})).data.feedbacks}function Q(e){return e.map(({rate:s,description:n,author:i})=>{const r=Math.floor(s),c=s%1!==0,T=`<div class="star">${["star-filled","star-half","star-empty"].map(x=>`<svg class="${x}"><use class="star-svg" href="./images/star-rating.icons.svg#${x}"></use></svg>`).join("")}</div>`;return`
      <li class="swiper-slide">
        <div class="rating large star-icon  value-${r} ${c?"half":""} label-hidden">
            <div class="label-value"></div>
            <div class="star-container">
                ${T.repeat(5)}
            </div>
        </div>
            <p class="feedback-description">"${n}"</p>
            <p class="feedback-author">${i}</p>
      </li>`}).join("")}function U(e){const t=document.querySelector(".swiper-wrapper");t.innerHTML=Q(e),new P(".mySwiper",{slidesPerView:1,spaceBetween:16,loop:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:3,spaceBetween:24}}})}async function W(){try{const e=await K();U(e)}catch(e){console.log(e);return}}W();
//# sourceMappingURL=index.js.map
