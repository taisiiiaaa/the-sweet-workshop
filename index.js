import{a as x,S as O,N,A as T}from"./assets/vendor-DphP4qAS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const B="https://deserts-store.b.goit.study/api";async function D(){const{data:e}=await x.get(`${B}/categories`);return e}async function $({page:e,limit:t,category:s}){const o={page:e,limit:t};s&&s!=="all"&&(o.category=s);const{data:n}=await x.get(`${B}/desserts`,{params:o});return n}const m=document.querySelector(".dessert-filters"),r=document.querySelector(".dessert-filters__list"),c=document.getElementById("dessert-dropdown-btn"),d=document.getElementById("selected-category-name"),u=document.querySelector(".dessert-gallery"),g=document.querySelector("#loader"),l=document.querySelector(".dessert-list__load-more-btn");let v="all",y=1;const p=8;async function C(){h(),b(),y=1,u&&(u.innerHTML="");try{const e=await $({page:y,limit:p,category:v});M(e.desserts||[]),e.totalItems>p?_():b()}catch(e){console.error(e)}finally{E()}}async function R(){y+=1,h(),b();try{const e=await $({page:y,limit:p,category:v}),t=e.desserts||[];M(t),(u?u.children.length:0)>=e.totalItems||t.length<p?b():_()}catch(e){console.error(e),_()}finally{E()}}async function j(){h();try{const e=await D();H(e),await C()}catch(e){console.error(e)}finally{E()}}function H(e){if(!r)return;let t=`
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
      `).join(""),r.innerHTML=t}function M(e){if(!u)return;const t=e.map(({_id:s,name:o,description:n,price:i,category:{name:f},image:I})=>`
       <li class="gallery-list__product-item">
         <img 
          class="gallery-list__product-image"
          src="${I}"
          alt="${o}"
          id="${s}"
          loading="lazy"
        />
        <p class="gallery-list__product-category">${f}</p>
        <h3 class="gallery-list__product-title">${o}</h3>
        <p class="gallery-list__product-description">${n}</p>
        <div class="gallery-list__product-bottom">
          <span class="gallery-list__product-price">${i} грн</span>
          <button type="button" class="gallery-details-btn" data-id="${s}">↗</button>
        </div>
       </li>
    `).join("");u.insertAdjacentHTML("beforeend",t)}m==null||m.addEventListener("click",e=>{const t=e.target.closest(".dessert-filters__btn");if(t){const s=r.querySelector(".dessert-filters__btn.is-active");s==null||s.classList.remove("is-active"),t.classList.add("is-active"),d&&(d.textContent=t.textContent.trim()),r.classList.remove("is-open"),c==null||c.classList.remove("is-open"),v=t.dataset.category,C();return}if(c!=null&&c.contains(e.target)){const s=r.classList.toggle("is-open");c.classList.toggle("is-open",s),d&&(d.textContent=s?"Виберіть категорію":r.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",e=>{if(m&&!m.contains(e.target)&&(r==null||r.classList.remove("is-open"),d&&r)){const t=r.querySelector(".dessert-filters__btn.is-active");t&&(d.textContent=t.textContent.trim())}});l==null||l.addEventListener("click",R);function h(){g&&g.classList.remove("is-hidden")}function E(){g&&g.classList.add("is-hidden")}function _(){l&&l.classList.remove("is-hidden")}function b(){l&&l.classList.add("is-hidden")}j();(()=>{const e={hamMenu:document.querySelector(".menu-toggle"),navbar:document.querySelector("[data-navbar]"),mobLinks:document.querySelectorAll(".navbar-link"),navbarBtn:document.querySelector(".navbar-order")};e.mobLinks.forEach(s=>{s.addEventListener("click",t)}),e.hamMenu.addEventListener("click",t),e.navbarBtn.addEventListener("click",t);function t(){const s=e.navbar.classList.toggle("is-open");e.hamMenu.classList.toggle("active"),document.body.classList.toggle("no-scroll",s)}})();const z=768,S=document.querySelector(".about-us__btn--prev"),w=document.querySelector(".about-us__btn--next"),P=document.querySelectorAll(".about-us__pagination-item");function L(e){P.forEach((t,s)=>{t.classList.toggle("about-us__pagination-item--active",s===e)})}function q(e){S.disabled=e.isBeginning,w.disabled=e.isEnd}let a=null;function k(){a||(a=new O(".about-us__swiper",{modules:[N],slidesPerView:2,spaceBetween:16,initialSlide:0,speed:600,cssEase:"cubic-bezier(0.4, 0, 0.2, 1)",breakpoints:{1440:{slidesPerView:2,spaceBetween:24}},on:{slideChange(e){L(e.activeIndex),q(e)},init(e){L(e.activeIndex),q(e)}}}),S.addEventListener("click",()=>a.slidePrev()),w.addEventListener("click",()=>a.slideNext()),P.forEach((e,t)=>{e.addEventListener("click",()=>a.slideTo(t))}))}function F(){a&&(a.destroy(!0,!0),a=null,S.disabled=!1,w.disabled=!1,L(0))}const A=window.matchMedia(`(min-width: ${z}px)`);A.matches&&k();A.addEventListener("change",e=>{e.matches?k():F()});new T(".accordion-container",{duration:400,showMultiple:!1});
//# sourceMappingURL=index.js.map
