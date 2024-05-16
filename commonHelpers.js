import{S as u,i as l}from"./assets/vendor-8c59ed88.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();const h="43843798-e4c61f3cfe0ada13281a73887",p="https://pixabay.com/api/",m=document.querySelector(".js-search-form"),a=document.querySelector(".js-gallery"),c=document.querySelector(".js-loader");function f(o){o.preventDefault();const e=o.target.elements.searchKeyword.value.trim();if(e===""){a.innerHTML="",o.target.reset(),l.show({message:"Input field can not be empty",position:"topRight",timeout:2e3,color:"red"});return}a.innerHTML="",c.classList.remove("is-hidden"),d(e).then(s=>{s.total===0&&l.show({message:"Sorry, there are no images for this query",position:"topRight",timeout:2e3,color:"red"}),a.innerHTML=g(s.results)}).catch(s=>console.log(s)).finally(()=>{o.target.reset(),c.classList.add("is-hidden")})}m.addEventListener("submit",f);document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".js-search-form"),e=document.querySelector(".gallery");o.addEventListener("submit",function(s){s.preventDefault();const r=document.querySelector(".js-search-input").value;d(r).then(t=>{e.innerHTML=g(t.hits),console.log(t.hits),y()}).catch(t=>{console.error("Fetch error:",t)})})});const d=o=>{const e=new URLSearchParams({q:o,key:h,per_page:20,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${p}?${e}`).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.json()})};function g(o){return o.map(e=>`
        <a href="${e.largeImageURL}" class="gallery-item" data-lightbox="gallery">
            <img src="${e.webformatURL}" alt="${e.tags}" />
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Likes</strong> ${e.likes}</li>
                <li class="list-group-item"><strong>Views</strong> ${e.views}</li>
                <li class="list-group-item"><strong>Comments</strong> ${e.comments}</li>
                <li class="list-group-item"><strong>Downloads</strong> ${e.downloads}</li>
              </ul>
            </div>
        </a>   
    `).join("")}function y(){new u(".gallery a",{overlayOpacity:1,captionsData:"alt",captionsDelay:250,nav:!0,close:!0,showCounter:!0,animationSpeed:300,fadeSpeed:300}).refresh()}const L="43843798-e4c61f3cfe0ada13281a73887",w="https://pixabay.com/api/";document.addEventListener("DOMContentLoaded",function(){const o=document.querySelector(".js-search-form"),e=document.querySelector(".gallery");o.addEventListener("submit",function(s){s.preventDefault();const r=document.querySelector(".js-search-input").value;b(r).then(t=>{e.innerHTML=S(t.hits),console.log(t.hits),$()}).catch(t=>{console.error("Fetch error:",t)})})});const b=o=>{const e=new URLSearchParams({q:o,key:L,per_page:20,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`${w}?${e}`).then(s=>{if(!s.ok)throw new Error("Network response was not ok");return s.json()})};function S(o){return o.map(e=>`
        <a href="${e.largeImageURL}" class="gallery-item" data-lightbox="gallery">
            <img src="${e.webformatURL}" alt="${e.tags}" />
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Likes</strong> ${e.likes}</li>
                <li class="list-group-item"><strong>Views</strong> ${e.views}</li>
                <li class="list-group-item"><strong>Comments</strong> ${e.comments}</li>
                <li class="list-group-item"><strong>Downloads</strong> ${e.downloads}</li>
              </ul>
            </div>
        </a>   
    `).join("")}function $(){new u(".gallery a",{overlayOpacity:1,captionsData:"alt",captionsDelay:250,nav:!0,close:!0,showCounter:!0,animationSpeed:300,fadeSpeed:300}).refresh()}
//# sourceMappingURL=commonHelpers.js.map
