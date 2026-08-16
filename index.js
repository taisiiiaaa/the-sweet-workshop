import{a as $,S as O,N as T,A as k}from"./assets/vendor-BnfE_hCa.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();const q="https://deserts-store.b.goit.study/api";async function D(){const{data:e}=await $.get(`${q}/categories`);return e}async function C({page:e,limit:t,category:s}){const o={page:e,limit:t};s&&s!=="all"&&(o.category=s);const{data:i}=await $.get(`${q}/desserts`,{params:o});return i}const p=document.querySelector(".dessert-filters"),n=document.querySelector(".dessert-filters__list"),c=document.getElementById("dessert-dropdown-btn"),d=document.getElementById("selected-category-name"),u=document.querySelector(".dessert-gallery"),y=document.querySelector("#loader"),l=document.querySelector(".dessert-list__load-more-btn");let h="all",m=1;const g=8;async function P(){v(),_(),m=1,u&&(u.innerHTML="");try{const e=await C({page:m,limit:g,category:h});B(e.desserts||[]),e.totalItems>g?b():_()}catch(e){console.error(e)}finally{w()}}async function R(){m+=1,v(),_();try{const e=await C({page:m,limit:g,category:h}),t=e.desserts||[];B(t),(u?u.children.length:0)>=e.totalItems||t.length<g?_():b()}catch(e){console.error(e),b()}finally{w()}}async function j(){v();try{const e=await D();H(e),await P()}catch(e){console.error(e)}finally{w()}}function H(e){if(!n)return;let t=`
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
      `).join(""),n.innerHTML=t}function B(e){if(!u)return;const t=e.map(({_id:s,name:o,description:i,price:r,category:{name:f},image:N})=>`
       <li class="gallery-list__product-item">
         <img 
          class="gallery-list__product-image"
          src="${N}"
          alt="${o}"
          id="${s}"
          loading="lazy"
        />
        <p class="gallery-list__product-category">${f}</p>
        <h3 class="gallery-list__product-title">${o}</h3>
        <p class="gallery-list__product-description">${i}</p>
        <div class="gallery-list__product-bottom">
          <span class="gallery-list__product-price">${r} грн</span>
          <button type="button" class="gallery-details-btn" data-id="${s}">↗</button>
        </div>
       </li>
    `).join("");u.insertAdjacentHTML("beforeend",t)}p==null||p.addEventListener("click",e=>{const t=e.target.closest(".dessert-filters__btn");if(t){const s=n.querySelector(".dessert-filters__btn.is-active");s==null||s.classList.remove("is-active"),t.classList.add("is-active"),d&&(d.textContent=t.textContent.trim()),n.classList.remove("is-open"),c==null||c.classList.remove("is-open"),h=t.dataset.category,P();return}if(c!=null&&c.contains(e.target)){const s=n.classList.toggle("is-open");c.classList.toggle("is-open",s),d&&(d.textContent=s?"Виберіть категорію":n.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",e=>{if(p&&!p.contains(e.target)&&(n==null||n.classList.remove("is-open"),d&&n)){const t=n.querySelector(".dessert-filters__btn.is-active");t&&(d.textContent=t.textContent.trim())}});l==null||l.addEventListener("click",R);function v(){y&&y.classList.remove("is-hidden")}function w(){y&&y.classList.add("is-hidden")}function b(){l&&l.classList.remove("is-hidden")}function _(){l&&l.classList.add("is-hidden")}j();const z=768,E=document.querySelector(".about-us__btn--prev"),S=document.querySelector(".about-us__btn--next"),A=document.querySelectorAll(".about-us__pagination-item");function L(e){A.forEach((t,s)=>{t.classList.toggle("about-us__pagination-item--active",s===e)})}function x(e){E.disabled=e.isBeginning,S.disabled=e.isEnd}let a=null;function I(){a||(a=new O(".about-us__swiper",{modules:[T],slidesPerView:2,spaceBetween:16,initialSlide:0,speed:600,cssEase:"cubic-bezier(0.4, 0, 0.2, 1)",breakpoints:{1440:{slidesPerView:2,spaceBetween:24}},on:{slideChange(e){L(e.activeIndex),x(e)},init(e){L(e.activeIndex),x(e)}}}),E.addEventListener("click",()=>a.slidePrev()),S.addEventListener("click",()=>a.slideNext()),A.forEach((e,t)=>{e.addEventListener("click",()=>a.slideTo(t))}))}function F(){a&&(a.destroy(!0,!0),a=null,E.disabled=!1,S.disabled=!1,L(0))}const M=window.matchMedia(`(min-width: ${z}px)`);M.matches&&I();M.addEventListener("change",e=>{e.matches?I():F()});new k(".accordion-container",{duration:400,showMultiple:!1});
//# sourceMappingURL=index.js.map
