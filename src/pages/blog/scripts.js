(function(){
	const form = document.querySelector(".filter");
	const res = document.querySelector(".res_js");
	const links = document.querySelectorAll(".link_js");
	let realData = {page: 0};
	realData = getParamsFromURL();
	// showData(realData);
	setValueToForm(form, realData);

	function showData(data) {
		res.innerHTML = JSON.stringify(data, null, 2);
	}

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const page = realData.page;
		realData = getFormData(form);
		realData.page = page;
		setParamsToURL(realData);
		// showData(realData);
	})

	for (let i = 0; i < links.length; i++) {
		let link = links[i];
		link.addEventListener("click", (e) => {
			e.preventDefault();
			realData.page = `${i}`;
			setParamsToURL(realData);
			// showData(realData);
		})
	}

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

	function getParamsFromURL() {
		const searchParams = new URL(window.location).searchParams;
		let params = {};
		if(searchParams.has("tags")) {
			params.tags = searchParams.getAll("tags");
		}
		if(searchParams.has("views")) {
			params.views = searchParams.get("views");
		}
		if(searchParams.has("comments")) {
			params.comments = searchParams.getAll("comments");
		}
		if(searchParams.has("show")) {
			params.show = searchParams.get("show");
		}
		if(searchParams.has("sort")) {
			params.sort = searchParams.get("sort");
		}
		if(searchParams.has("page")) {
			params.page = searchParams.get("page");
		}
		return params;
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
})();