import{a as $,T as st,S as nt,N as yt,A as bt}from"./assets/vendor-BeY3HugT.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(r){if(r.ep)return;r.ep=!0;const i=s(r);fetch(r.href,i)}})();const D="https://deserts-store.b.goit.study/api",x=8;async function vt(){const{data:t}=await $.get(`${D}/categories`);return t}async function rt({page:t,limit:e,category:s}){const n={page:t,limit:e};s&&s!=="all"&&(n.category=s);const{data:r}=await $.get(`${D}/desserts`,{params:n});return r}function it(t){const e=t.category?t.category.name:"";return`
    <article class="product__card">
      <img
        class="product__image"
        src="${t.image}"
        alt="${t.name}"
        loading="lazy"
        width="303"
        height="227"
      />

      <div class="product-card__content">
        <span class="product__category">
          ${e}
        </span>

        <h3 class="product__title">
          ${t.name}
        </h3>

        <p class="product__description">
          ${t.description||""}
        </p>

        <div class="product__bottom">
          <span class="product__price">
            ${t.price} грн
          </span>

          <button
            type="button"
            class="js-product-details__btn"
            data-id="${t._id}"
            aria-label="Детальніше про десерт ${t.name}"
          >
            <svg
              class="product-details-btn__icon"
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href="images/icons.svg#arrow-up-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `}const _=document.querySelector(".dessert-filters"),o=document.querySelector(".dessert-filters__list"),f=document.getElementById("dessert-dropdown-btn"),y=document.getElementById("selected-category-name"),L=document.querySelector(".dessert-gallery"),k=document.querySelector("#dessert-list-loader"),m=document.querySelector(".dessert-list__load-more-btn");let z="all",C=1;async function at(){U(),I(),C=1,L&&(L.innerHTML="");try{const t=await rt({page:C,limit:x,category:z});ot(t.desserts||[]),t.totalItems>x?H():I()}catch(t){console.error(t)}finally{W()}}async function Lt(){C+=1,U(),I();try{const t=await rt({page:C,limit:x,category:z}),e=t.desserts||[];ot(e),(L?L.children.length:0)>=t.totalItems||e.length<x?I():H()}catch(t){console.error(t),H()}finally{W()}}async function wt(){U();try{const t=await vt();_t(t),await at()}catch(t){console.error(t)}finally{W()}}function _t(t){if(!o)return;let e=`
      <li class="dessert-filters__item">
        <button type="button" class="dessert-filters__btn is-active" data-category="all">
        Всі десерти
      </button>
      </li>
    `;e+=t.map(({_id:s,name:n})=>`
        <li class="dessert-filters__item">
          <button type="button" class="dessert-filters__btn" data-category="${s}">
          ${n}
          </button>
        </li>
      `).join(""),o.innerHTML=e}function ot(t){if(!L)return;const e=t.map(s=>`
         <li class="gallery-list__product-item product__item">
           ${it(s)}
         </li>
      `).join("");L.insertAdjacentHTML("beforeend",e)}_==null||_.addEventListener("click",t=>{const e=t.target.closest(".dessert-filters__btn");if(e){const s=o.querySelector(".dessert-filters__btn.is-active");s==null||s.classList.remove("is-active"),e.classList.add("is-active"),y&&(y.textContent=e.textContent.trim()),o.classList.remove("is-open"),f==null||f.classList.remove("is-open"),z=e.dataset.category,at();return}if(f!=null&&f.contains(t.target)){const s=o.classList.toggle("is-open");f.classList.toggle("is-open",s),y&&(y.textContent=s?"Виберіть категорію":o.querySelector(".dessert-filters__btn.is-active").textContent.trim())}});document.addEventListener("click",t=>{if(_&&!_.contains(t.target)&&(o==null||o.classList.remove("is-open"),y&&o)){const e=o.querySelector(".dessert-filters__btn.is-active");e&&(y.textContent=e.textContent.trim())}});m==null||m.addEventListener("click",Lt);function U(){k&&k.classList.remove("is-hidden")}function W(){k&&k.classList.add("is-hidden")}function H(){m&&m.classList.remove("is-hidden")}function I(){m&&m.classList.add("is-hidden")}wt();async function St(t){const{data:e}=await $.get(`${D}/desserts/${t}`);return e}function Et(t){st({text:t,duration:3e3,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #00b09b, #96c93d)",borderRadius:"8px"}}).showToast()}function Y(t){st({text:t,duration:3e3,gravity:"top",position:"right",style:{background:"linear-gradient(to right, #F44336, #FF6439)",borderRadius:"8px"}}).showToast()}const l=document.querySelector("[data-order]"),xt=l.querySelector(".order-modal__close"),F=l.querySelector(".order-modal__form"),u=l.querySelector(".order-modal__submit");function kt(t){l.classList.add("is-open"),document.body.classList.add("no-scroll"),t&&(l.dataset.dessertId=t)}function A(){l.classList.remove("is-open"),document.body.classList.remove("no-scroll")}function Ct(){const t=document.createElement("span");return t.classList.add("loader"),t.setAttribute("aria-label","Завантаження"),t}function J(t){t?(u.disabled=!0,u.dataset.text=u.textContent,u.textContent="",u.append(Ct())):(u.disabled=!1,u.textContent=u.dataset.text,delete u.dataset.text)}async function It(t){t.preventDefault();const e=new FormData(F),s={dessertId:l.dataset.dessertId,name:e.get("name").trim(),phone:e.get("phone").trim(),comment:e.get("comment").trim()};J(!0);try{const n=await fetch(`${D}/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(!n.ok)throw new Error(`HTTP error: ${n.status}`);const r=await n.json();return Et("Замовлення успішно оформлено!"),F.reset(),A(),r}catch{Y("Не вдалося оформити замовлення. Спробуйте ще раз.")}finally{J(!1)}}xt.addEventListener("click",A);l.addEventListener("click",t=>{t.target===l&&A()});document.addEventListener("keydown",t=>{t.key==="Escape"&&l.classList.contains("is-open")&&A()});F.addEventListener("submit",It);const Bt="/the-sweet-workshop/assets/icons-BKESDM8N.svg";function ct(t){const e=Math.floor(t),s=t%1!==0;return Array.from({length:5},(r,i)=>{let a="star-empty";return i<e?a="star-filled":i===e&&s&&(a="star-half"),`
      <svg class="star">
        <use href="${Bt}#${a}"></use>
      </svg>
    `}).join("")}const c=document.querySelector("[data-dessert-details-modal]"),V=document.querySelector("[data-close-dessert-modal]"),b=document.querySelector("[data-modal-image]"),B=document.querySelector("[data-modal-title]"),q=document.querySelector("[data-modal-price]"),P=document.querySelector("[data-modal-rating]"),T=document.querySelector("[data-modal-description]"),M=document.querySelector("[data-modal-ingredients]"),d=document.querySelector(".dessert-modal-order-btn"),v=document.querySelector("#dessert-loader"),N=document.querySelector(".dessert-gallery"),R=document.querySelector("#bestsellersTrack");function dt(t){const e=t.target.closest("[data-id]");if(!e)return;const s=e.dataset.id;s&&qt(s)}N==null||N.addEventListener("click",dt);R==null||R.addEventListener("click",dt);V==null||V.addEventListener("click",S);c==null||c.addEventListener("click",t=>{t.target===c&&S()});document.addEventListener("keydown",t=>{t.key==="Escape"&&c&&!c.classList.contains("is-hidden")&&S()});d==null||d.addEventListener("click",Dt);async function qt(t){if(c){c.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),Mt(),Tt();try{const e=await St(t);Pt(e)}catch(e){console.error(e),Y("Не вдалося завантажити інформацію про десерт"),S()}finally{$t()}}}function Pt(t){if(!t)return;b&&(b.src=t.image||"",b.alt=t.name||""),B&&(B.textContent=t.name||""),q&&(q.textContent=`${t.price??""} грн`),T&&(T.textContent=t.description||""),M&&(M.textContent=t.composition||"");const e=ct(t.rate);P&&(P.innerHTML=e),d&&(d.dataset.id=t._id)}function Tt(){b&&(b.src="",b.alt=""),B&&(B.textContent=""),q&&(q.textContent=""),T&&(T.textContent=""),M&&(M.textContent=""),P&&(P.textContent=""),d&&delete d.dataset.id}function Mt(){v==null||v.classList.remove("is-hidden")}function $t(){v==null||v.classList.add("is-hidden")}function Dt(){const t=d==null?void 0:d.dataset.id;S(),kt(t)}function S(){c==null||c.classList.add("is-hidden"),document.body.classList.remove("no-scroll")}(()=>{const t={hamMenu:document.querySelector(".menu-toggle"),navbar:document.querySelector("[data-navbar]"),mobLinks:document.querySelectorAll(".navbar-link"),navbarBtn:document.querySelector(".navbar-order")};t.mobLinks.forEach(s=>{s.addEventListener("click",e)}),t.hamMenu.addEventListener("click",e),t.navbarBtn.addEventListener("click",e);function e(){const s=t.navbar.classList.toggle("is-open");t.hamMenu.classList.toggle("active"),document.body.classList.toggle("no-scroll",s),document.documentElement.classList.toggle("no-scroll",s)}})();const At=768,G=document.querySelector(".about-us__btn--prev"),K=document.querySelector(".about-us__btn--next"),lt=document.querySelectorAll(".about-us__pagination-item");function X(t){lt.forEach((e,s)=>{e.classList.toggle("about-us__pagination-item--active",s===t)})}function Q(t){G.disabled=t.isBeginning,K.disabled=t.isEnd}let p=null;function ut(){p||(p=new nt(".about-us__swiper",{modules:[yt],slidesPerView:2,spaceBetween:16,speed:600,cssEase:"cubic-bezier(0.4, 0, 0.2, 1)",breakpoints:{1440:{spaceBetween:24}},on:{slideChange(t){X(t.activeIndex),Q(t)},init(t){X(t.activeIndex),Q(t)}}}),G.addEventListener("click",()=>p.slidePrev()),K.addEventListener("click",()=>p.slideNext()),lt.forEach((t,e)=>{t.addEventListener("click",()=>p.slideTo(e))}))}function Ot(){p&&(p.destroy(!0,!0),p=null,G.disabled=!1,K.disabled=!1,X(0))}const pt=window.matchMedia(`(min-width: ${At}px)`);pt.matches&&ut();pt.addEventListener("change",t=>{t.matches?ut():Ot()});new bt(".accordion-container",{duration:400,showMultiple:!1});async function Vt(){return(await $.get("https://deserts-store.b.goit.study/api/feedbacks",{params:{limit:10,page:1}})).data.feedbacks}function Nt(t){return t.map(({rate:e,description:s,author:n})=>`
        <li class="swiper-slide">
          <div class="rating">
            <div class="star-container">
              ${ct(e)}
            </div>
          </div>

          <p class="feedback-description">"${s}"</p>
          <p class="feedback-author">${n}</p>
        </li>
      `).join("")}const ft=document.querySelector("#loader");let h=6;const Rt=8,jt=8,Z=Rt+jt;function tt(t){const e=t.pagination.bullets,s=e.length,n=t.realIndex;if(s<=h){e.forEach((i,a)=>{i.style.transform=`translateX(${a*Z}px)`,i.style.opacity=a===n?"1":"0.2",i.style.visibility="visible"});return}let r=0;n>=h&&(r=n-h+1),r>s-h&&(r=s-h),e.forEach((i,a)=>{const E=a-r;i.style.transform=`translateX(${E*Z}px)`;const g=a>=r&&a<r+h;i.style.opacity=g?a===n?"1":"0.2":"0",i.style.visibility=g?"visible":"hidden"})}function Ht(t){const e=document.querySelector(".feedback-swiper .swiper-wrapper");return e.innerHTML=Nt(t),ft.classList.remove("loader"),new nt(".mySwiper",{slidesPerView:1,spaceBetween:16,loop:!0,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{768:{slidesPerView:3,spaceBetween:24}},on:{init(n){tt(n)},slideChangeTransitionStart(n){tt(n)}}})}async function Ft(){ft.classList.add("loader");try{const t=await Vt();t.length===3&&(h=0),Ht(t)}catch(t){Y(t)}}Ft();const Xt={products:"https://deserts-store.b.goit.study/api/desserts?type=popular"},et=[{_id:"1",name:"Брауні з горіхами",description:"Соковитий шоколадний брауні з хрусткими горіхами.",price:110,category:{name:"Шоколадна випічка"},image:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop"},{_id:"2",name:"Фруктовий тарт",description:"Ніжний тарт з ягідним кремом та свіжими фруктами.",price:140,category:{name:"Фруктові десерти"},image:"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop"},{_id:"3",name:"Лавандовий чіз",description:"Ніжний чіз з нотками лаванди та ягідним соусом.",price:90,category:{name:"Незабутні десерти"},image:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop"}];class j{constructor(e){this.data=e,this.track=document.getElementById("bestsellersTrack"),this.dotsContainer=document.getElementById("bestsellersDots"),this.prevBtn=document.getElementById("prevBtn"),this.nextBtn=document.getElementById("nextBtn"),this.currentIndex=0,this.cardsPerView=this.getCardsPerView(),this.totalSlides=0,this.init()}getCardsPerView(){return window.innerWidth<768?1:window.innerWidth<1440?2:3}init(){this.track&&(this.renderCards(),this.updateSlider(),this.bindEvents(),window.addEventListener("resize",this.handleResize.bind(this)))}renderCards(){this.track&&(this.track.innerHTML=this.data.map(e=>`
          <li class="bestsellers-track__item">
            ${it(e)}
          </li>
        `).join(""))}updateSlider(){if(!this.track)return;this.cardsPerView=this.getCardsPerView(),this.totalSlides=Math.max(0,this.data.length-this.cardsPerView),this.currentIndex>this.totalSlides&&(this.currentIndex=this.totalSlides);const e=this.track.querySelector(".bestsellers-track__item");if(e){const s=e.offsetWidth,n=parseFloat(getComputedStyle(this.track).gap),r=this.currentIndex*(s+n);this.track.style.transform=`translate3d(-${r}px, 0, 0)`}this.renderDots(),this.updateButtons()}renderDots(){if(!this.dotsContainer)return;const e=this.totalSlides+1;this.dotsContainer.innerHTML="";for(let s=0;s<e;s+=1){const n=document.createElement("button");n.type="button",n.className="bestsellers__dot"+(s===this.currentIndex?" active":""),n.setAttribute("aria-label",`Слайд ${s+1}`),n.setAttribute("aria-current",s===this.currentIndex?"true":"false"),n.addEventListener("click",()=>{this.currentIndex=s,this.updateSlider()}),this.dotsContainer.appendChild(n)}}updateButtons(){!this.prevBtn||!this.nextBtn||(this.prevBtn.disabled=this.currentIndex===0,this.nextBtn.disabled=this.currentIndex>=this.totalSlides)}next(){this.currentIndex<this.totalSlides&&(this.currentIndex+=1,this.updateSlider())}prev(){this.currentIndex>0&&(this.currentIndex-=1,this.updateSlider())}handleResize(){this.getCardsPerView()!==this.cardsPerView&&(this.currentIndex=0),this.updateSlider()}bindEvents(){var r,i,a,E;(r=this.nextBtn)==null||r.addEventListener("click",()=>{this.next()}),(i=this.prevBtn)==null||i.addEventListener("click",()=>{this.prev()});let e=0,s=0,n=!1;(a=this.track)==null||a.addEventListener("touchstart",g=>{const w=g.touches[0];e=w.clientX,s=w.clientY,n=!0},{passive:!0}),(E=this.track)==null||E.addEventListener("touchend",g=>{if(!n)return;const w=g.changedTouches[0],ht=w.clientX,mt=w.clientY,O=e-ht,gt=s-mt;n=!1,!(Math.abs(gt)>Math.abs(O))&&(Math.abs(O)<50||(O>0?this.next():this.prev()))},{passive:!0})}}async function zt(){try{const t=await fetch(Xt.products);if(!t.ok)throw new Error(`Помилка HTTP: ${t.status}`);const e=await t.json(),s=e.desserts||e;if(!Array.isArray(s)||s.length===0){console.warn("API повернуло порожній список, використовую демо-дані"),new j(et);return}new j(s)}catch(t){console.warn("Не вдалося завантажити з API, використовую демо-дані:",t),new j(et)}}document.addEventListener("DOMContentLoaded",zt);
//# sourceMappingURL=index.js.map
