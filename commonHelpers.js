import{S as p,i as m}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const h="https://pixabay.com/api/",y="41902391-3586b75e6bf6b946d25386040",g=document.querySelector(".search-form"),s=document.querySelector('[name="query"]'),l=document.querySelector(".gallery"),c=document.querySelector(".loader"),b=new p(".gallery a",{captionsData:"alt",captionDelay:250});u();g.addEventListener("submit",L);function L(n){n.preventDefault();const r=s.value.trim();if(r==="")return;v();const a=`${h}?key=${y}&q=${r}&image_type=photo&orientation=horizontal&safesearch=true`;S(a).then(o=>{o.hits.length===0?m.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}):$(o.hits)}).catch(o=>{console.error(o)})}function S(n){return q(),fetch(n).then(r=>{if(!r.ok)throw new Error(r.statusText);return r.json()}).finally(()=>{u(),s.value="",s.focus()})}function $(n){const r=n.map(({webformatURL:a,largeImageURL:o,tags:e,likes:t,views:i,comments:d,downloads:f})=>`
      <div class="photo-card">
        <a href="${o}" data-lightbox="gallery" data-title="${e}">
          <img
            class="photo-card__img"
            src="${a}"
            alt="${e}"
            loading="lazy"
            width="320"
            height="212"
          />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes:</b> <span>${t}</span>
          </p>
          <p class="info-item">
            <b>Views:</b> <span>${i}</span>
          </p>
          <p class="info-item">
            <b>Comments:</b> <span>${d}</span>
          </p>
          <p class="info-item">
            <b>Downloads:</b> <span>${f}</span>
          </p>
        </div>
      </div>
      `).join("");l.insertAdjacentHTML("beforeend",r),b.refresh()}function v(){l.innerHTML=""}function q(){c.style.display="block"}function u(){c.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
