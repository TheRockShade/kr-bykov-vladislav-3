"use strict";function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function m(t){return function(t){if(Array.isArray(t))return o(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||c(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=c(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var o=0,e=function(){};return{s:e,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return a=t.done,t},e:function(t){s=!0,r=t},f:function(){try{a||null==n.return||n.return()}finally{if(s)throw r}}}}function c(t,e){if(t){if("string"==typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(n="Object"===n&&t.constructor?t.constructor.name:n)||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}var r,a,h,t,e,g,n,s,i=document.forms.filter,v={page:0};function b(t){t.preventDefault();t=v.page||0;(v=getFormData(i)).page=t,v.show=+v.show||0,function(){for(var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=Object.keys(t),n=new URL("http://123.ru"),o=0,r=e;o<r.length;o++){var a=r[o];if("object"===l(t[a])){var s=p(t[a]);try{for(s.s();!(c=s.n()).done;){var c=c.value;n.searchParams.append(a,c)}}catch(t){s.e(t)}finally{s.f()}}else n.searchParams.append(a,t[a])}history.replaceState({},document.title,n.search)}(v),u(v.show),function(d){var t=new URL("http://123.ru");t.searchParams.set("v",VERSION_API),d.page||(d.page=0),d.tags&&t.searchParams.set("tags",JSON.stringify(d.tags));var e,n,o={};d.title&&(o.title=d.title),d.views&&(n=d.views.split("-"),o.views={$between:[n[0],n[1]]}),0!==d.commentsCount.length&&(e=[],d.commentsCount.forEach(function(t){t.split("-").forEach(function(t){e.push(t)})}),n={min:Math.min.apply(null,e),max:Math.max.apply(null,e)},o.commentsCount={$between:[n.min,n.max]}),t.searchParams.set("filter",JSON.stringify(o)),o=["id","ASC"],d.sort&&(o[0]=d.sort),t.searchParams.set("sort",JSON.stringify(o)),d.show&&t.searchParams.set("limit",JSON.stringify(+d.show)),t.searchParams.set("offset",JSON.stringify(+d.show*d.page));var f=new XMLHttpRequest;f.open("GET","".concat(SERVER_URL,"/api/posts?").concat(t.searchParams)),f.send(),f.onload=function(){var t=JSON.parse(f.response);if(t.success){h.innerHTML="";var e=p(t.data);try{for(e.s();!(o=e.n()).done;){var n=o.value;h.innerHTML+=(o=n,'\n\t\t<li class="blog__item">\n\t\t\t<picture>\n\t\t\t\t<source srcset="'.concat(SERVER_URL).concat(o.photo.desktopPhotoUrl,'", srcset="').concat(SERVER_URL).concat(o.photo.desktop2xPhotoUrl,'" 2x" media="(min-width: 800px)">\n\t\t\t\t<source srcset="').concat(SERVER_URL).concat(o.photo.tabletPhotoUrl,', srcset="').concat(SERVER_URL).concat(o.photo.tablet2xPhotoUrl,' 2x" media="(min-width: 670px) and (max-width: 799px)">\n\t\t\t\t<source srcset="').concat(SERVER_URL).concat(o.photo.mobilePhotoUrl,', srcset="').concat(SERVER_URL).concat(o.photo.mobile2xPhotoUrl,' 2x" media="(max-width: 669px)">\n\t\t\t\t<img class="blog__img" src="').concat(SERVER_URL).concat(o.photo.desktopPhotoUrl,'" alt="').concat(o.title,'">\n\t\t\t</picture>\n\t\t\t<div class="blog__box">\n\t\t\t\t<div class="blog__tags cardTags_js"></div>\n\t\t\t\t<div class="blog__info">\n\t\t\t\t\t<span class="blog__data text-small">').concat(new Date(o.date).toLocaleDateString(),'</span>\n\t\t\t\t\t<span class="blog__views text-small">').concat(o.views,' views</span>\n\t\t\t\t\t<span class="blog__comments text-small">').concat(o.commentsCount,' comments</span>\n\t\t\t\t</div>\n\t\t\t\t<h3 class="blog__title title-three">').concat(o.title,'</h3>\n\t\t\t\t<p class="blog__text text">').concat(o.text,'</p>\n\t\t\t\t<a class="blog__link text text--bold" href="#">Go to this post</a>\n\t\t\t</div>\n\t\t</li>'));var o=m(document.querySelectorAll(".blog__item")),r=o[o.length-1].querySelector(".cardTags_js"),a=p(n.tags);try{for(a.s();!(s=a.n()).done;){var s=s.value;r.innerHTML+='<span class="blog__tag" style="background-color: '.concat(s.color,'"></span>')}}catch(t){a.e(t)}finally{a.f()}}}catch(t){e.e(t)}finally{e.f()}var c=t.count,l=0;for(g.innerHTML="";0<c-d.show;){c-=d.show;var i=_(l,v,function(t){b(t)});l++,g.insertAdjacentElement("beforeend",i)}var u=_(l,v,function(t){b(t)});g.insertAdjacentElement("beforeend",u)}else console.error(t._message)},f.onerror=function(){return console.error("Произошла ошибка сервера")}}(v)}function u(t){var e=0<arguments.length&&void 0!==t?t:10;h.innerHTML="";for(var n=0;n<e;n++)h.innerHTML+='\n\t\t<li class="blog__preload blog-preload">\n\t\t\t<div class="blog-preload__img"></div>\n\t\t\t<div class="blog-preload__box">\n\t\t\t\t<div class="blog-preload__tags"></div>\n\t\t\t\t<div class="blog-preload__info"></div>\n\t\t\t\t<div class="blog-preload__title"></div>\n\t\t\t\t<div class="blog-preload__text"></div>\n\t\t\t\t<div class="blog-preload__link" href="#"></div>\n\t\t\t</div>\n\t\t</li>'}function _(e,n,o){var t=document.createElement("li");t.classList.add("blog-pagination__item");var r=document.createElement("a");return r.setAttribute("href","?page=".concat(e)),r.classList.add("blog-pagination__link","text","text--bold","link_js"),e===n.page&&r.classList.add("active"),r.addEventListener("click",function(t){t.preventDefault(),n.page=e,o(t)}),r.innerText=+e+1,t.insertAdjacentElement("beforeend",r),t}a=document.querySelector(".tags_js"),h=document.querySelector(".posts_js"),t=document.querySelector(".search-button_js"),e=document.querySelector(".reset-button_js"),g=document.querySelector(".pagination_js"),n=document.querySelector(".left-arrow_js"),s=document.querySelector(".right-arrow_js"),i.addEventListener("submit",b),t.addEventListener("click",function(){return v.page=0}),e.addEventListener("click",function(){setTimeout(function(){return t.click()},100)}),n.addEventListener("click",function(t){0<v.page&&(v.page--,b(t))}),s.addEventListener("click",function(t){var e=g.querySelectorAll("li");v.page<e.length-1&&(v.page++,b(t))}),a.innerHTML=spinnerCreator(),(r=new XMLHttpRequest).open("GET","".concat(SERVER_URL,"/api/tags")),r.send(),r.onload=function(){var t=JSON.parse(r.response);if(t.success){a.innerHTML="";var e=p(t.data);try{for(e.s();!(n=e.n()).done;){var n=n.value;a.innerHTML+='\n\t\t<label class="filter-form__checkbox-label filter-form__checkbox-label--tags">\n\t\t\t<input class="filter-form__checkbox hidden" type="checkbox" name="tags" value="'.concat((n=n).id,'" aria-label="Tag ').concat(n.color,'" checked>\n\t\t\t<span style="border-color: ').concat(n.color,'" class="filter-form__checkbox-checker filter-form__checkbox-checker--tags filter-form__checkbox-checker--').concat(n.color.slice(1),'"></span>\n\t\t</label>')}}catch(t){e.e(t)}finally{e.f()}var o=function(){var t=new URL(window.location).searchParams,e={};t.has("tags")&&(e.tags=t.getAll("tags"));t.has("views")&&(e.views=t.get("views"));t.has("commentsCount")&&(e.commentsCount=t.getAll("commentsCount"));t.has("show")&&(e.show=t.get("show"));t.has("sort")&&(e.sort=t.get("sort"));t.has("title")&&(e.title=t.get("title"));t.has("page")&&(e.page=t.get("page"));return e}();setValueToForm(i,o)}else console.error(t._message)},r.onerror=function(){return console.error("Произошла ошибка сервера")},u(),setTimeout(function(){return t.click()},1e3);