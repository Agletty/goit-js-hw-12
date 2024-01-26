import{S as L,a as S,i as d}from"./assets/vendor-bad0427b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const v="41902391-3586b75e6bf6b946d25386040",w="https://pixabay.com/api/",$=document.querySelector(".search-form"),u=document.querySelector('[name="query"]'),f=document.querySelector(".gallery"),p=document.querySelector(".loader"),c=document.querySelector(".load-more-btn");let i,h="";const q=new L(".gallery a",{captionsData:"alt",captionDelay:250});y();l();$.addEventListener("submit",M);c.addEventListener("click",P);async function M(o){o.preventDefault();const t=u.value.trim();t!==""&&(E(),l(),h=t,i=1,await m())}async function P(){i+=1,await m(),A()}async function m(){B();const o=`${w}?key=${v}&q=${h}&image_type=photo&orientation=horizontal&safesearch=true&page=${i}&per_page=40`;try{const t=await S.get(o);if(t.data.hits.length===0)d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});else{k(t.data.hits);const a=t.data.totalHits,n=t.data.hits.length;i*n>=a?(l(),d.info({title:"End of results",message:"We’re sorry, but you’ve reached the end of search results."})):_()}}catch(t){console.error(t)}finally{y(),u.value=""}}function k(o){const t=o.map(({webformatURL:a,largeImageURL:n,tags:e,likes:r,views:s,comments:g,downloads:b})=>`
      <div class="photo-card">
        <a href="${n}" data-lightbox="gallery" data-title="${e}">
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
            <b>Likes:</b> <span>${r}</span>
          </p>
          <p class="info-item">
            <b>Views:</b> <span>${s}</span>
          </p>
          <p class="info-item">
            <b>Comments:</b> <span>${g}</span>
          </p>
          <p class="info-item">
            <b>Downloads:</b> <span>${b}</span>
          </p>
        </div>
      </div>
      `).join("");f.insertAdjacentHTML("beforeend",t),q.refresh()}function E(){f.innerHTML=""}function B(){p.style.display="block"}function y(){p.style.display="none"}function _(){c.style.display="block"}function l(){c.style.display="none"}function x(o){return o?o.getBoundingClientRect().height:0}function H(o){window.scrollBy({top:o,behavior:"smooth"})}function A(){const o=document.querySelector(".photo-card");H(x(o)*2)}
//# sourceMappingURL=commonHelpers.js.map
