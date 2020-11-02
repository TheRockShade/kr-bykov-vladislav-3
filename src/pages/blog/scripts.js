const form = document.forms["filter"];
let data = {
	page: 0
};

function setParamsToURL(params = {}) {
	const keysArr = Object.keys(params);
	let url = new URL("http://123.ru");
	for(let key of keysArr) {
		if(typeof params[key] === "object") {
			const arr = params[key];
			for(let item of arr) {
				url.searchParams.append(key, item);
			}
		} else {
			url.searchParams.append(key, params[key]);
		}
	}
	history.replaceState({}, document.title, url.search);
}

function setValueToForm(form, data) {
	let inputs = form.querySelectorAll("input");
	for(let input of inputs) {
		switch(input.type) {
			case "radio":
				if (data[input.name] === input.value) {
					input.checked = true;
				}
				break;
			case "checkbox":
				if(data[input.name] && data[input.name].includes(input.value)) {
					input.checked = true;
				}
				break;
			default:
				if(data[input.name]) {
					input.value = data[input.name];
				}
				break;
		}
	}
	return data;
}

function getParamsFromURL() {
	const searchParams = new URL(window.location).searchParams;
	let params = {};
	if(searchParams.has("tags")) {
		params.tags = searchParams.getAll("tags");
	}
	if(searchParams.has("views")) {
		params.views = searchParams.get("views");
	}
	if(searchParams.has("commentsCount")) {
		params.commentsCount = searchParams.getAll("commentsCount");
	}
	if(searchParams.has("show")) {
		params.show = searchParams.get("show");
	}
	if(searchParams.has("sort")) {
		params.sort = searchParams.get("sort");
	}
	if(searchParams.has("search")) {
		params.search = searchParams.get("search");
	}
	if(searchParams.has("page")) {
		params.page = searchParams.get("page");
	}
	return params;
}

(() => {
	const tagsBox = document.querySelector(".tags_js");
	const postBox = document.querySelector(".posts_js");
	const searchButton = document.querySelector(".search-button_js")
	const paginationBox = document.querySelector(".pagination_js");
	const leftArrow = document.querySelector(".left-arrow_js");
	const rightArrow = document.querySelector(".right-arrow_js");

	tagsBox.innerHTML = spinnerCreator();
	getTags();
	getPosts(getFormData(form));

	form.addEventListener("submit", (e) => {
		get(e);
	});

	searchButton.addEventListener("click", () => {
		data.page = 0;
	})

	leftArrow.addEventListener("click", (e) => {
		if (data.page > 0) {
			data.page--;
			get(e);
		}
	})

	rightArrow.addEventListener("click", (e) => {
		let liList = paginationBox.querySelectorAll("li");
		
		if (data.page < liList.length - 1) {
			data.page++;
			get(e);
		}
	})

	function get(e) {
		e.preventDefault();
		let page = data.page || 0;
		data = getFormData(form);
		data.page = page;
		data.show = +data.show || 0;
		setParamsToURL(data);
		postBox.innerHTML = spinnerCreator();
		getPosts(data);
	}

	function getTags() {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `${SERVER_URL}/api/tags`);
		xhr.send();
		xhr.onload = () => {
			const response = JSON.parse(xhr.response);
			if (response.success) {
				tagsBox.innerHTML = "";
				for (let tag of response.data) {
					tagsBox.innerHTML += tagCreator(tag);
				}
				const params = getParamsFromURL()
				setValueToForm(form, params);
			} else {
				console.error(response._message);
			}
		}
		xhr.onerror = () => console.error("Произошла ошибка сервера");
	}

	function getPosts(params) {
		let url = new URL("http://123.ru");
		url.searchParams.set("v", VERSION_API);

		if (!params.page) {
			params.page = 0;
		}

		if (params.tags) {
			url.searchParams.set("tags", JSON.stringify(params.tags))
		}

		let filter = {};

		if (params.title) {
			filter.title = params.title;
		}

		if (params.views) {
			let viewsValue = (params.views).split("-");
			filter.views = {$between: [viewsValue[0], viewsValue[1]]};
		}

		if (params.commentsCount.length !== 0) {
			let arr = [];
			params.commentsCount.forEach(el => {
				el.split("-").forEach(el => {arr.push(el);});
			});
			let commentsCountValue = {
				min: Math.min.apply(null, arr),
				max: Math.max.apply(null, arr)
			}
			filter.commentsCount = {$between: [commentsCountValue["min"], commentsCountValue["max"]]};
		}

		url.searchParams.set("filter", JSON.stringify(filter));

		let sort = ["id", "ASC"];
		if (params.sort) {
			sort[0] = params.sort;
		}
		
		url.searchParams.set("sort", JSON.stringify(sort));
		
		if (params.show) {
			url.searchParams.set("limit", JSON.stringify(+params.show));
		}

		url.searchParams.set("offset", JSON.stringify(+params.show * params.page));

		let xhr = new XMLHttpRequest();
		xhr.open("GET", `${SERVER_URL}/api/posts?${url.searchParams}`);
		xhr.send();
		xhr.onload = () => {
			const response = JSON.parse(xhr.response);
			if (response.success) {
				postBox.innerHTML = "";
				for (let card of response.data) {
					postBox.innerHTML += cardCreator(card);
					let posts = [...document.querySelectorAll(".blog__item")];
					let post = posts[posts.length - 1];
					let tagBox = post.querySelector('.cardTags_js');
					for (let tag of card.tags) {
						tagBox.innerHTML += cardTagCreator(tag);
					}
				}

				let count = response.count;
				let index = 0;
				
				paginationBox.innerHTML = "";

				while(count - params.show > 0) {
					count -= params.show;
					const a = pageCreator(index, data, (e) => {
						get(e);
					});
					index++;
					paginationBox.insertAdjacentElement("beforeend", a);
				}
				const a = pageCreator(index, data, (e) => {
					get(e);
				});
				paginationBox.insertAdjacentElement("beforeend", a);
			} else {
				console.error(response._message);
			}
		}
		xhr.onerror = () => console.error("Произошла ошибка сервера");
	}

	function spinnerCreator() {
		return `<div class="spinner">Loading...</div>`;
	}

	function tagCreator(tag) {
		return `
		<label class="filter-form__checkbox-label filter-form__checkbox-label--tags">
			<input class="filter-form__checkbox hidden" type="checkbox" name="tags" value="${tag.id}" checked>
			<span style="border-color: ${tag.color}" class="filter-form__checkbox-checker filter-form__checkbox-checker--tags"></span>
		</label>`;
	}

	function cardCreator(card) {
		return `
		<li class="blog__item">
			<picture>
				<source srcset="${SERVER_URL}${card.photo.desktopPhotoUrl}", srcset="${SERVER_URL}${card.photo.desktop2xPhotoUrl}" 2x" media="(min-width: 800px)">
				<source srcset="${SERVER_URL}${card.photo.tabletPhotoUrl}, srcset="${SERVER_URL}${card.photo.tablet2xPhotoUrl} 2x" media="(min-width: 670px) and (max-width: 799px)">
				<source srcset="${SERVER_URL}${card.photo.mobilePhotoUrl}, srcset="${SERVER_URL}${card.photo.mobile2xPhotoUrl} 2x" media="(max-width: 669px)">
				<img class="blog__img" src="${SERVER_URL}${card.photo.desktopPhotoUrl}" alt="${card.title}">
			</picture>
			<div class="blog__box">
				<div class="blog__tags cardTags_js"></div>
				<div class="blog__info">
					<span class="blog__data text-small">${new Date(card.date).toLocaleDateString()}</span>
					<span class="blog__views text-small">${card.views} views</span>
					<span class="blog__comments text-small">${card.commentsCount} comments</span>
				</div>
				<h3 class="blog__title title-three">${card.title}</h3>
				<p class="blog__text text">${card.text}</p>
				<a class="blog__link text text--bold" href="#">Go to this post</a>
			</div>
		</li>`;
	}

	function cardTagCreator(tag) {
		return `<span class="blog__tag" style="background-color: ${tag.color}"></span>`;
	}

	function pageCreator(index, data, onclick) {
		let li = document.createElement("li");
		li.classList.add("blog-pagination__item");
		let a = document.createElement("a");
		a.setAttribute("href", `?page=${index}`);
		a.classList.add("blog-pagination__link", "text", "text--bold", "link_js");
		a.addEventListener("click", (e) => {
			e.preventDefault();
			data.page = index;
			onclick(e);
		})
		a.innerText = +index + 1;
		li.insertAdjacentElement("beforeend", a);
		return li;
	}
})();