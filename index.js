import{a as v,A as w}from"./assets/vendor-DLewQupz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const $="https://deserts-store.b.goit.study/api";async function x(){const{data:e}=await v.get(`${$}/categories`);return e}async function C({page:e,limit:t,category:r}){const n={page:e,limit:t};r&&r!=="all"&&(n.category=r);const{data:s}=await v.get(`${$}/desserts`,{params:n});return s}const f=document.querySelector(".dessert-filters"),i=document.querySelector(".dessert-filters__list"),a=document.getElementById("dessert-dropdown-btn"),l=document.getElementById("selected-category-name"),d=document.querySelector(".dessert-gallery"),y=document.querySelector("#loader"),c=document.querySelector(".dessert-list__load-more-btn");let L="all",g=1;const m=8;async function E(){h(),p(),g=1,d&&(d.innerHTML="");try{const e=await C({page:g,limit:m,category:L});S(e.desserts||[]),e.totalItems>m?_():p()}catch(e){console.error(e)}finally{b()}}async function A(){g+=1,h(),p();try{const e=await C({page:g,limit:m,category:L}),t=e.desserts||[];S(t),(d?d.children.length:0)>=e.totalItems||t.length<m?p():_()}catch(e){console.error(e),_()}finally{b()}}async function M(){h();try{const e=await x();O(e),await E()}catch(e){console.error(e)}finally{b()}}function O(e){if(!i)return;let t=`
      <li class="dessert-filters__item">
        <button type="button" class="dessert-filters__btn is-active" data-category="all">
        Всі десерти
      </button>
      </li>
    `;t+=e.map(({_id:r,name:n})=>`
        <li class="dessert-filters__item">
          <button type="button" class="dessert-filters__btn" data-category="${r}">
          ${n}
          </button>
        </li>
      `).join(""),i.innerHTML=t}function S(e){if(!d)return;const t=e.map(({_id:r,name:n,description:s,price:o,category:{name:u},image:q})=>`
       <li class="gallery-list__product-item">
         <img 
          class="gallery-list__product-image"
          src="${q}"
          alt="${n}"
          id="${r}"
          loading="lazy"
        />
        <p class="gallery-list__product-category">${u}</p>
        <h3 class="gallery-list__product-title">${n}</h3>
        <p class="gallery-list__product-description">${s}</p>
        <div class="gallery-list__product-bottom">
          <span class="gallery-list__product-price">${o} грн</span>
          <button type="button" class="gallery-details-btn" data-id="${r}">↗</button>
        </div>
       </li>
    `).join("");d.insertAdjacentHTML("beforeend",t)}f==null||f.addEventListener("click",e=>{const t=e.target.closest(".dessert-filters__btn");if(t){const r=i.querySelector(".dessert-filters__btn.is-active");r==null||r.classList.remove("is-active"),t.classList.add("is-active"),l&&(l.textContent=t.textContent.trim()),i.classList.remove("is-open"),a==null||a.classList.remove("is-open"),L=t.dataset.category,E();return}if(a!=null&&a.contains(e.target)){const r=i.classList.toggle("is-open");a.classList.toggle("is-open",r),l&&(l.textContent=r?"Виберіть категорію":i.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",e=>{if(f&&!f.contains(e.target)&&(i==null||i.classList.remove("is-open"),l&&i)){const t=i.querySelector(".dessert-filters__btn.is-active");t&&(l.textContent=t.textContent.trim())}});c==null||c.addEventListener("click",A);function h(){y&&y.classList.remove("is-hidden")}function b(){y&&y.classList.add("is-hidden")}function _(){c&&c.classList.remove("is-hidden")}function p(){c&&c.classList.add("is-hidden")}M();new w(".accordion-container",{duration:400,showMultiple:!1});
//# sourceMappingURL=index.js.map
