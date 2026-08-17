import{a as L,T as G,S as D,N as K,A as Q}from"./assets/vendor-BeY3HugT.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const E="https://deserts-store.b.goit.study/api",y=8;async function U(){const{data:e}=await L.get(`${E}/categories`);return e}async function I({page:e,limit:t,category:s}){const o={page:e,limit:t};s&&s!=="all"&&(o.category=s);const{data:n}=await L.get(`${E}/desserts`,{params:o});return n}const p=document.querySelector(".dessert-filters"),a=document.querySelector(".dessert-filters__list"),c=document.getElementById("dessert-dropdown-btn"),u=document.getElementById("selected-category-name"),m=document.querySelector(".dessert-gallery"),g=document.querySelector("#loader"),l=document.querySelector(".dessert-list__load-more-btn");let k="all",b=1;async function O(){q(),v(),b=1,m&&(m.innerHTML="");try{const e=await I({page:b,limit:y,category:k});F(e.desserts||[]),e.totalItems>y?w():v()}catch(e){console.error(e)}finally{$()}}async function W(){b+=1,q(),v();try{const e=await I({page:b,limit:y,category:k}),t=e.desserts||[];F(t),(m?m.children.length:0)>=e.totalItems||t.length<y?v():w()}catch(e){console.error(e),w()}finally{$()}}async function J(){q();try{const e=await U();X(e),await O()}catch(e){console.error(e)}finally{$()}}function X(e){if(!a)return;let t=`
      <li class="dessert-filters__item">
        <button type="button" class="dessert-filters__btn is-active" data-category="all">
        Всі десерти
      </button>
      </li>
    `;t+=e.map(({_id:s,name:o})=>`
        <li class="dessert-filters__item">
          <button type="button" class="dessert-filters__btn" data-category="${s}">
          ${o}
          </button>
        </li>
      `).join(""),a.innerHTML=t}function F(e){if(!m)return;const t=e.map(({_id:s,name:o,description:n,price:r,category:{name:d},image:M})=>`
       <li class="gallery-list__product-item">
         <img 
          class="gallery-list__product-image"
          src="${M}"
          alt="${o}"
          id="${s}"
          loading="lazy"
        />
        <p class="gallery-list__product-category">${d}</p>
        <h3 class="gallery-list__product-title">${o}</h3>
        <p class="gallery-list__product-description">${n}</p>
        <div class="gallery-list__product-bottom">
          <span class="gallery-list__product-price">${r} грн</span>
          <button type="button" class="gallery-details-btn" data-id="${s}">↗</button>
        </div>
       </li>
    `).join("");m.insertAdjacentHTML("beforeend",t)}p==null||p.addEventListener("click",e=>{const t=e.target.closest(".dessert-filters__btn");if(t){const s=a.querySelector(".dessert-filters__btn.is-active");s==null||s.classList.remove("is-active"),t.classList.add("is-active"),u&&(u.textContent=t.textContent.trim()),a.classList.remove("is-open"),c==null||c.classList.remove("is-open"),k=t.dataset.category,O();return}if(c!=null&&c.contains(e.target)){const s=a.classList.toggle("is-open");c.classList.toggle("is-open",s),u&&(u.textContent=s?"Виберіть категорію":a.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",e=>{if(p&&!p.contains(e.target)&&(a==null||a.classList.remove("is-open"),u&&a)){const t=a.querySelector(".dessert-filters__btn.is-active");t&&(u.textContent=t.textContent.trim())}});l==null||l.addEventListener("click",W);function q(){g&&g.classList.remove("is-hidden")}function $(){g&&g.classList.add("is-hidden")}function w(){l&&l.classList.remove("is-hidden")}function v(){l&&l.classList.add("is-hidden")}J();async function Y(e){const{data:t}=await L.get(`${E}/desserts/${e}`);return t}function N(e){G({text:e,duration:3e3,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #F44336, #FF6439)",borderRadius:"8px"}}).showToast()}const f=document.querySelector("[data-dessert-details-modal]"),Z=document.querySelector("[data-close-dessert-modal]"),P=document.querySelector("[data-modal-image]"),ee=document.querySelector("[data-modal-title]"),te=document.querySelector("[data-modal-price]");document.querySelector("[data-modal-rating]");const se=document.querySelector("[data-modal-description]"),ne=document.querySelector("[data-modal-ingredients]"),R=document.querySelector(".dessert-modal-order-btn"),T=document.querySelector("#dessert-loader"),re=document.querySelector(".dessert-gallery");re.addEventListener("click",e=>{const t=e.target.closest("[data-id]");if(!t)return;const s=t.dataset.id;ae(s)});Z.addEventListener("click",h);f.addEventListener("click",e=>{e.target===f&&h()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!f.classList.contains("is-hidden")&&h()});R.addEventListener("click",oe);function oe(){h()}async function ae(e){f.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),T.classList.add("loader");try{const t=await Y(e);ie(t)}catch{N("Failed to load dessert details: ")}finally{T.classList.remove("loader")}}function ie(e){P.src=e.image,P.alt=e.name,ee.textContent=e.name,te.textContent=`${e.price} грн`,se.textContent=e.description,ne.textContent=e.composition,R.dataset.id=e._id}function h(){f.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}(()=>{const e={hamMenu:document.querySelector(".menu-toggle"),navbar:document.querySelector("[data-navbar]"),mobLinks:document.querySelectorAll(".navbar-link"),navbarBtn:document.querySelector(".navbar-order")};e.mobLinks.forEach(s=>{s.addEventListener("click",t)}),e.hamMenu.addEventListener("click",t),e.navbarBtn.addEventListener("click",t);function t(){const s=e.navbar.classList.toggle("is-open");e.hamMenu.classList.toggle("active"),document.body.classList.toggle("no-scroll",s),document.documentElement.classList.toggle("no-scroll",s)}})();const ce=768,B=document.querySelector(".about-us__btn--prev"),x=document.querySelector(".about-us__btn--next"),j=document.querySelectorAll(".about-us__pagination-item");function S(e){j.forEach((t,s)=>{t.classList.toggle("about-us__pagination-item--active",s===e)})}function A(e){B.disabled=e.isBeginning,x.disabled=e.isEnd}let i=null;function H(){i||(i=new D(".about-us__swiper",{modules:[K],slidesPerView:2,spaceBetween:16,speed:600,cssEase:"cubic-bezier(0.4, 0, 0.2, 1)",breakpoints:{1440:{spaceBetween:24}},on:{slideChange(e){S(e.activeIndex),A(e)},init(e){S(e.activeIndex),A(e)}}}),B.addEventListener("click",()=>i.slidePrev()),x.addEventListener("click",()=>i.slideNext()),j.forEach((e,t)=>{e.addEventListener("click",()=>i.slideTo(t))}))}function le(){i&&(i.destroy(!0,!0),i=null,B.disabled=!1,x.disabled=!1,S(0))}const V=window.matchMedia(`(min-width: ${ce}px)`);V.matches&&H();V.addEventListener("change",e=>{e.matches?H():le()});new Q(".accordion-container",{duration:400,showMultiple:!1});async function de(){return(await L.get("https://deserts-store.b.goit.study/api/feedbacks",{params:{limit:10,page:1}})).data.feedbacks}const ue="/the-sweet-workshop/assets/icons-BVBiDn3R.svg";function me(e){return e.map(({rate:t,description:s,author:o})=>{const n=Math.floor(t),r=t%1!==0;return`
        <li class="swiper-slide">
          <div class="rating">
            <div class="star-container">
              ${Array.from({length:5},(M,C)=>{let _="star-empty";return C<n?_="star-filled":C===n&&r&&(_="star-half"),`
          <svg class="star">
            <use href="${ue}#${_}"></use>
          </svg>
        `}).join("")}
            </div>
          </div>

          <p class="feedback-description">"${s}"</p>
          <p class="feedback-author">${o}</p>
        </li>
      `}).join("")}const z=document.querySelector("#loader");function pe(e){const t=document.querySelector(".feedback-swiper .swiper-wrapper");t.innerHTML=me(e),z.classList.remove("loader"),new D(".mySwiper",{slidesPerView:1,spaceBetween:16,loop:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:3,spaceBetween:24}}})}async function fe(){z.classList.add("loader");try{const e=await de();pe(e)}catch(e){N(e);return}}fe();
//# sourceMappingURL=index.js.map
