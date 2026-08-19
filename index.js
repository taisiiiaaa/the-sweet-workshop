import{a as A,T as oe,S as X,N as he,A as be}from"./assets/vendor--Pf0onRJ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const O="https://deserts-store.b.goit.study/api",$=8;async function ve(){const{data:e}=await A.get(`${O}/categories`);return e}async function re({page:e,limit:t,category:s}){const o={page:e,limit:t};s&&s!=="all"&&(o.category=s);const{data:n}=await A.get(`${O}/desserts`,{params:o});return n}const ae="/the-sweet-workshop/assets/icons-BKESDM8N.svg";function ie(e){const t=e.category?e.category.name:"";return`
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
              <use href="${ae}#arrow-up-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `}const E=document.querySelector(".dessert-filters"),i=document.querySelector(".dessert-filters__list"),m=document.getElementById("dessert-dropdown-btn"),h=document.getElementById("selected-category-name"),L=document.querySelector(".dessert-gallery"),q=document.querySelector("#dessert-list-loader"),g=document.querySelector(".dessert-list__load-more-btn");let z="all",T=1;async function ce(){Z(),B(),T=1,L&&(L.innerHTML="");try{const e=await re({page:T,limit:$,category:z});le(e.desserts||[]),e.totalItems>$?G():B()}catch(e){console.error(e)}finally{J()}}async function Le(){T+=1,Z(),B();try{const e=await re({page:T,limit:$,category:z}),t=e.desserts||[];le(t),(L?L.children.length:0)>=e.totalItems||t.length<$?B():G()}catch(e){console.error(e),G()}finally{J()}}async function _e(){Z();try{const e=await ve();we(e),await ce()}catch(e){console.error(e)}finally{J()}}function we(e){if(!i)return;let t=`
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
      `).join(""),i.innerHTML=t}function le(e){if(!L)return;const t=e.map(s=>`
         <li class="gallery-list__product-item product__item">
           ${ie(s)}
         </li>
      `).join("");L.insertAdjacentHTML("beforeend",t)}E==null||E.addEventListener("click",e=>{const t=e.target.closest(".dessert-filters__btn");if(t){const s=i.querySelector(".dessert-filters__btn.is-active");s==null||s.classList.remove("is-active"),t.classList.add("is-active"),h&&(h.textContent=t.textContent.trim()),i.classList.remove("is-open"),m==null||m.classList.remove("is-open"),z=t.dataset.category,ce();return}if(m!=null&&m.contains(e.target)){const s=i.classList.toggle("is-open");m.classList.toggle("is-open",s),h&&(h.textContent=s?"Виберіть категорію":i.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",e=>{if(E&&!E.contains(e.target)&&(i==null||i.classList.remove("is-open"),h&&i)){const t=i.querySelector(".dessert-filters__btn.is-active");t&&(h.textContent=t.textContent.trim())}});g==null||g.addEventListener("click",Le);function Z(){q&&q.classList.remove("is-hidden")}function J(){q&&q.classList.add("is-hidden")}function G(){g&&g.classList.remove("is-hidden")}function B(){g&&g.classList.add("is-hidden")}_e();async function Ee(e){const{data:t}=await A.get(`${O}/desserts/${e}`);return t}function Se(e){oe({text:e,duration:3e3,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #00b09b, #96c93d)",borderRadius:"8px"}}).showToast()}function V(e){oe({text:e,duration:3e3,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #F44336, #FF6439)",borderRadius:"8px"}}).showToast()}const d=document.querySelector("[data-order]"),ke=d.querySelector(".order-modal__close"),w=d.querySelector(".order-modal__form"),u=d.querySelector(".order-modal__submit");function xe(e){d.classList.add("is-open"),document.body.classList.add("no-scroll"),e&&(d.dataset.dessertId=e)}function j(){d.classList.remove("is-open"),document.body.classList.remove("no-scroll")}function $e(){const e=document.createElement("span");return e.classList.add("loader"),e.setAttribute("aria-label","Завантаження"),e}function W(e){e?(u.disabled=!0,u.dataset.text=u.textContent,u.textContent="",u.append($e())):(u.disabled=!1,u.textContent=u.dataset.text,delete u.dataset.text)}async function qe(e){if(e.preventDefault(),!w.checkValidity()){w.reportValidity();return}const t=new FormData(w),s={dessertId:d.dataset.dessertId,name:t.get("name").trim(),phone:t.get("phone").trim(),comment:t.get("comment").trim()};W(!0);try{const o=await fetch(`${O}/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!o.ok)throw new Error(`HTTP error: ${o.status}`);const n=await o.json();return Se("Замовлення успішно оформлено!"),w.reset(),j(),n}catch{V("Не вдалося оформити замовлення. Спробуйте ще раз.")}finally{W(!1)}}ke.addEventListener("click",j);d.addEventListener("click",e=>{e.target===d&&j()});document.addEventListener("keydown",e=>{e.key==="Escape"&&d.classList.contains("is-open")&&j()});w.addEventListener("submit",qe);function de(e){const t=Math.floor(e),s=e%1!==0;return Array.from({length:5},(n,r)=>{let a="star-empty";return r<t?a="star-filled":r===t&&s&&(a="star-half"),`
      <svg class="star">
        <use href="${ae}#${a}"></use>
      </svg>
    `}).join("")}const Te="/the-sweet-workshop/assets/placeholder-image-DMYKsksc.webp",c=document.querySelector("[data-dessert-details-modal]"),H=document.querySelector("[data-close-dessert-modal]"),b=document.querySelector("[data-modal-image]"),C=document.querySelector("[data-modal-title]"),M=document.querySelector("[data-modal-price]"),P=document.querySelector("[data-modal-rating]"),I=document.querySelector("[data-modal-description]"),D=document.querySelector("[data-modal-ingredients]"),l=document.querySelector(".dessert-modal-order-btn"),v=document.querySelector("#dessert-loader"),F=document.querySelector(".dessert-gallery"),R=document.querySelector("#bestsellersTrack");function ue(e){const t=e.target.closest("[data-id]");if(!t)return;const s=t.dataset.id;s&&pe(s)}F==null||F.addEventListener("click",ue);R==null||R.addEventListener("click",ue);H==null||H.addEventListener("click",k);c==null||c.addEventListener("click",e=>{e.target===c&&k()});document.addEventListener("keydown",e=>{e.key==="Escape"&&c&&!c.classList.contains("is-hidden")&&k()});l==null||l.addEventListener("click",Ie);async function pe(e){if(c){c.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),Me(),Ce();try{const t=await Ee(e);Be(t)}catch(t){console.error(t),V("Не вдалося завантажити інформацію про десерт"),k()}finally{Pe()}}}function Be(e){if(!e)return;b&&(b.src=e.image||Te,b.alt=e.name||"Placeholder image"),C&&(C.textContent=e.name||""),M&&(M.textContent=`${e.price??""} грн`),I&&(I.textContent=e.description||""),D&&(D.textContent=e.composition||"");const t=de(e.rate);P&&(P.innerHTML=t),l&&(l.dataset.id=e._id)}function Ce(){b&&(b.src="",b.alt=""),C&&(C.textContent=""),M&&(M.textContent=""),I&&(I.textContent=""),D&&(D.textContent=""),P&&(P.textContent=""),l&&delete l.dataset.id}function Me(){v==null||v.classList.remove("is-hidden")}function Pe(){v==null||v.classList.add("is-hidden")}function Ie(){const e=l==null?void 0:l.dataset.id;k(),xe(e)}function k(){c==null||c.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}(()=>{const e={hamMenu:document.querySelector(".header-menu-toggle"),navbar:document.querySelector("[data-navbar]"),mobLinks:document.querySelectorAll(".navbar-link"),navbarBtn:document.querySelector(".navbar-order")};e.hamMenu.addEventListener("click",t),e.mobLinks.forEach(o=>{o.addEventListener("click",s)}),e.navbarBtn&&e.navbarBtn.addEventListener("click",s);function t(){const o=e.navbar.classList.toggle("is-open");e.hamMenu.classList.toggle("active"),document.body.classList.toggle("no-scroll",o),document.documentElement.classList.toggle("no-scroll",o)}function s(){e.navbar.classList.remove("is-open"),e.hamMenu.classList.remove("active"),document.body.classList.remove("no-scroll"),document.documentElement.classList.remove("no-scroll")}})();const De=768,Q=document.querySelector(".about-us__btn--prev"),Y=document.querySelector(".about-us__btn--next"),fe=document.querySelectorAll(".about-us__pagination-item");function K(e){fe.forEach((t,s)=>{t.classList.toggle("about-us__pagination-item--active",s===e)})}function ee(e){Q.disabled=e.isBeginning,Y.disabled=e.isEnd}let f=null;function me(){f||(f=new X(".about-us__swiper",{modules:[he],slidesPerView:2,spaceBetween:16,speed:600,cssEase:"cubic-bezier(0.4, 0, 0.2, 1)",breakpoints:{1440:{spaceBetween:24}},on:{slideChange(e){K(e.activeIndex),ee(e)},init(e){K(e.activeIndex),ee(e)}}}),Q.addEventListener("click",()=>f.slidePrev()),Y.addEventListener("click",()=>f.slideNext()),fe.forEach((e,t)=>{e.addEventListener("click",()=>f.slideTo(t))}))}function Ae(){f&&(f.destroy(!0,!0),f=null,Q.disabled=!1,Y.disabled=!1,K(0))}const ye=window.matchMedia(`(min-width: ${De}px)`);ye.matches&&me();ye.addEventListener("change",e=>{e.matches?me():Ae()});new be(".accordion-container",{duration:400,showMultiple:!1});async function Oe(){return(await A.get("https://deserts-store.b.goit.study/api/feedbacks",{params:{limit:10,page:1}})).data.feedbacks}function Ve(e){return e.map(({rate:t,description:s,author:o})=>`
        <li class="swiper-slide">
          <div class="rating">
            <div class="star-container">
              ${de(t)}
            </div>
          </div>

          <p class="feedback-description">"${s}"</p>
          <p class="feedback-author">${o}</p>
        </li>
      `).join("")}const ge=document.querySelector("#feedback-loader");let y=6;const je=8,Ne=8,te=je+Ne;function se(e){const t=e.pagination.bullets,s=t.length,o=e.realIndex;if(s<=y){t.forEach((r,a)=>{r.style.transform=`translateX(${a*te}px)`,r.style.opacity=a===o?"1":"0.2",r.style.visibility="visible"});return}let n=0;o>=y&&(n=o-y+1),n>s-y&&(n=s-y),t.forEach((r,a)=>{const N=a-n;r.style.transform=`translateX(${N*te}px)`;const _=a>=n&&a<n+y;r.style.opacity=_?a===o?"1":"0.2":"0",r.style.visibility=_?"visible":"hidden"})}function He(e){const t=document.querySelector(".feedback-swiper .swiper-wrapper");return t.innerHTML=Ve(e),ge.classList.remove("loader"),new X(".feedback__swiper",{slidesPerView:1,spaceBetween:16,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:3,spaceBetween:24}},on:{init(o){se(o)},slideChangeTransitionStart(o){se(o)}}})}async function Fe(){ge.classList.add("loader");try{const e=await Oe();e.length===3&&(y=0),He(e)}catch(e){V(e)}}Fe();const Re={products:"https://deserts-store.b.goit.study/api/desserts?type=popular"};async function Ue(){const e=await fetch(Re.products);if(!e.ok)throw new Error(`Помилка HTTP: ${e.status}`);const t=await e.json();return t.desserts||t}const p=document.querySelector("#bestsellers-loader"),S=document.querySelector(".bestsellers__slider-wrapper"),x=6,Ge=8,Ke=8,ne=Ge+Ke;function Xe(e){S.innerHTML=e.map(t=>`
        <li class="swiper-slide">
          ${ie(t)}
        </li>
      `).join("")}function U(e){const t=e.pagination.bullets,s=t.length,o=e.realIndex;if(!s)return;if(s<=x){t.forEach((r,a)=>{r.style.transform=`translateX(${a*ne}px)`,r.style.visibility="visible",r.style.opacity=a===o?"1":"0.2"});return}let n=o-Math.floor(x/2);n=Math.max(n,0),n=Math.min(n,s-x),t.forEach((r,a)=>{const N=a-n,_=a>=n&&a<n+x;r.style.transform=`translateX(${N*ne}px)`,r.style.visibility=_?"visible":"hidden",r.style.opacity=_&&a===o?"1":"0.2"})}function ze(){return new X(".bestsellers__swiper .mySwiper",{slidesPerView:1,spaceBetween:16,loop:!1,pagination:{el:".bestsellers__swiper-pagination",clickable:!0,dynamicBullets:!1},navigation:{nextEl:".bestsellers__swiper-button-next",prevEl:".bestsellers__swiper-button-prev"},breakpoints:{768:{slidesPerView:2,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}},on:{init(e){U(e)},slideChangeTransitionStart(e){U(e)},resize(e){U(e)}}})}function Ze(e){const t=e.target.closest(".js-product-details__btn");if(!t||!S.contains(t))return;const s=t.dataset.id;s&&pe(s)}S==null||S.addEventListener("click",Ze);async function Je(){p==null||p.classList.add("loader");try{const e=await Ue();if(!e||e.length===0)return;Xe(e),p==null||p.classList.remove("loader"),ze()}catch(e){p==null||p.classList.remove("loader"),V(e)}}Je();
//# sourceMappingURL=index.js.map
