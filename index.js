import{a as L,T as z,S as P,N as G,A as K}from"./assets/vendor-BeY3HugT.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const S="https://deserts-store.b.goit.study/api",g=8;async function Q(){const{data:e}=await L.get(`${S}/categories`);return e}async function A({page:e,limit:t,category:s}){const o={page:e,limit:t};s&&s!=="all"&&(o.category=s);const{data:n}=await L.get(`${S}/desserts`,{params:o});return n}const p=document.querySelector(".dessert-filters"),a=document.querySelector(".dessert-filters__list"),l=document.getElementById("dessert-dropdown-btn"),u=document.getElementById("selected-category-name"),m=document.querySelector(".dessert-gallery"),y=document.querySelector("#loader"),d=document.querySelector(".dessert-list__load-more-btn");let E="all",b=1;async function I(){k(),v(),b=1,m&&(m.innerHTML="");try{const e=await A({page:b,limit:g,category:E});D(e.desserts||[]),e.totalItems>g?_():v()}catch(e){console.error(e)}finally{q()}}async function U(){b+=1,k(),v();try{const e=await A({page:b,limit:g,category:E}),t=e.desserts||[];D(t),(m?m.children.length:0)>=e.totalItems||t.length<g?v():_()}catch(e){console.error(e),_()}finally{q()}}async function W(){k();try{const e=await Q();J(e),await I()}catch(e){console.error(e)}finally{q()}}function J(e){if(!a)return;let t=`
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
      `).join(""),a.innerHTML=t}function D(e){if(!m)return;const t=e.map(({_id:s,name:o,description:n,price:r,category:{name:i},image:V})=>`
       <li class="gallery-list__product-item">
         <img 
          class="gallery-list__product-image"
          src="${V}"
          alt="${o}"
          id="${s}"
          loading="lazy"
        />
        <p class="gallery-list__product-category">${i}</p>
        <h3 class="gallery-list__product-title">${o}</h3>
        <p class="gallery-list__product-description">${n}</p>
        <div class="gallery-list__product-bottom">
          <span class="gallery-list__product-price">${r} грн</span>
          <button type="button" class="gallery-details-btn" data-id="${s}">↗</button>
        </div>
       </li>
    `).join("");m.insertAdjacentHTML("beforeend",t)}p==null||p.addEventListener("click",e=>{const t=e.target.closest(".dessert-filters__btn");if(t){const s=a.querySelector(".dessert-filters__btn.is-active");s==null||s.classList.remove("is-active"),t.classList.add("is-active"),u&&(u.textContent=t.textContent.trim()),a.classList.remove("is-open"),l==null||l.classList.remove("is-open"),E=t.dataset.category,I();return}if(l!=null&&l.contains(e.target)){const s=a.classList.toggle("is-open");l.classList.toggle("is-open",s),u&&(u.textContent=s?"Виберіть категорію":a.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",e=>{if(p&&!p.contains(e.target)&&(a==null||a.classList.remove("is-open"),u&&a)){const t=a.querySelector(".dessert-filters__btn.is-active");t&&(u.textContent=t.textContent.trim())}});d==null||d.addEventListener("click",U);function k(){y&&y.classList.remove("is-hidden")}function q(){y&&y.classList.add("is-hidden")}function _(){d&&d.classList.remove("is-hidden")}function v(){d&&d.classList.add("is-hidden")}W();async function X(e){const{data:t}=await L.get(`${S}/desserts/${e}`);return t}function O(e){z({text:e,duration:3e3,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #F44336, #FF6439)",borderRadius:"8px"}}).showToast()}const Y="/the-sweet-workshop/assets/icons-BVBiDn3R.svg";function F(e){const t=Math.floor(e),s=e%1!==0;return Array.from({length:5},(n,r)=>{let i="star-empty";return r<t?i="star-filled":r===t&&s&&(i="star-half"),`
      <svg class="star">
        <use href="${Y}#${i}"></use>
      </svg>
    `}).join("")}const f=document.querySelector("[data-dessert-details-modal]"),Z=document.querySelector("[data-close-dessert-modal]"),x=document.querySelector("[data-modal-image]"),ee=document.querySelector("[data-modal-title]"),te=document.querySelector("[data-modal-price]"),se=document.querySelector("[data-modal-rating]"),ne=document.querySelector("[data-modal-description]"),re=document.querySelector("[data-modal-ingredients]"),M=document.querySelector(".dessert-modal-order-btn"),C=document.querySelector("#dessert-loader"),oe=document.querySelector(".dessert-gallery");oe.addEventListener("click",e=>{const t=e.target.closest("[data-id]");if(!t)return;const s=t.dataset.id;ie(s)});Z.addEventListener("click",h);f.addEventListener("click",e=>{e.target===f&&h()});document.addEventListener("keydown",e=>{e.key==="Escape"&&!f.classList.contains("is-hidden")&&h()});M.addEventListener("click",ae);function ae(){h();const e=M.dataset.id;openModal(e)}async function ie(e){f.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),C.classList.add("loader");try{const t=await X(e);ce(t)}catch{O("Failed to load dessert details: ")}finally{C.classList.remove("loader")}}function ce(e){x.src=e.image,x.alt=e.name,ee.textContent=e.name,te.textContent=`${e.price} грн`,se.innerHTML=F(e.rate),ne.textContent=e.description,re.textContent=e.composition,M.dataset.id=e._id}function h(){f.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}(()=>{const e={hamMenu:document.querySelector(".menu-toggle"),navbar:document.querySelector("[data-navbar]"),mobLinks:document.querySelectorAll(".navbar-link"),navbarBtn:document.querySelector(".navbar-order")};e.mobLinks.forEach(s=>{s.addEventListener("click",t)}),e.hamMenu.addEventListener("click",t),e.navbarBtn.addEventListener("click",t);function t(){const s=e.navbar.classList.toggle("is-open");e.hamMenu.classList.toggle("active"),document.body.classList.toggle("no-scroll",s),document.documentElement.classList.toggle("no-scroll",s)}})();const le=768,$=document.querySelector(".about-us__btn--prev"),B=document.querySelector(".about-us__btn--next"),N=document.querySelectorAll(".about-us__pagination-item");function w(e){N.forEach((t,s)=>{t.classList.toggle("about-us__pagination-item--active",s===e)})}function T(e){$.disabled=e.isBeginning,B.disabled=e.isEnd}let c=null;function R(){c||(c=new P(".about-us__swiper",{modules:[G],slidesPerView:2,spaceBetween:16,speed:600,cssEase:"cubic-bezier(0.4, 0, 0.2, 1)",breakpoints:{1440:{spaceBetween:24}},on:{slideChange(e){w(e.activeIndex),T(e)},init(e){w(e.activeIndex),T(e)}}}),$.addEventListener("click",()=>c.slidePrev()),B.addEventListener("click",()=>c.slideNext()),N.forEach((e,t)=>{e.addEventListener("click",()=>c.slideTo(t))}))}function de(){c&&(c.destroy(!0,!0),c=null,$.disabled=!1,B.disabled=!1,w(0))}const H=window.matchMedia(`(min-width: ${le}px)`);H.matches&&R();H.addEventListener("change",e=>{e.matches?R():de()});new K(".accordion-container",{duration:400,showMultiple:!1});async function ue(){return(await L.get("https://deserts-store.b.goit.study/api/feedbacks",{params:{limit:10,page:1}})).data.feedbacks}function me(e){return e.map(({rate:t,description:s,author:o})=>`
        <li class="swiper-slide">
          <div class="rating">
            <div class="star-container">
              ${F(t)}
            </div>
          </div>

          <p class="feedback-description">"${s}"</p>
          <p class="feedback-author">${o}</p>
        </li>
      `).join("")}const j=document.querySelector("#loader");function pe(e){const t=document.querySelector(".feedback-swiper .swiper-wrapper");t.innerHTML=me(e),j.classList.remove("loader"),new P(".mySwiper",{slidesPerView:1,spaceBetween:16,loop:!0,pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:3,spaceBetween:24}}})}async function fe(){j.classList.add("loader");try{const e=await ue();pe(e)}catch(e){O(e);return}}fe();
//# sourceMappingURL=index.js.map
