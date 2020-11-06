(() => {
	let open = document.querySelector(".message_js"),
			window = document.querySelector(".popup--message"),
			form = document.forms["message"],
			isLoading = false;

	if (open) {
		open.addEventListener("click", () => {
			popup(window, open, form);
		})
	}

	form.addEventListener("submit", (e) => {
		submit(e);
	})

	function submit(e) {
		e.preventDefault();
		if (isLoading) {
			return;
		}
		isLoading = true;
		const data = getFormData(e.target);
		let newData = {
			to: data.to,
			body: JSON.stringify(data)
		}
		console.log(newData);
		fetchData({
			method: "POST",
			url: "/api/emails",
			body: JSON.stringify(newData),
			headers: {
				"Content-Type": "application/json"
			},
		})
		.then(res => { return res.json(); })
		.then(res => {
			if (res.success) {
				console.log("Сообщение успешно отправлено");
				popupClose(window, open, form);
			} else {
				throw res;
			}
			isLoading = false;
		})
		.catch(err => {
			if (err.errors) {
				setFormText(e.target, err.errors);
				console.error(err.errors);
			} else {
				console.error(err._message);
			}
			isLoading = false;
		})
	}

	function validateData(data, errors = {}) {
		if(data.name === "") {
			errors.name = "Please enter your name";
		}
		if(data.subject === "") {
			errors.subject = "Please enter a message subject";
		}
		if(!checkTelephone(data.telephone)) {
			errors.telephone = "Please enter a valid phone number";
		}
		if(data.accept[0] !== "yes") {
			errors.accept = "You need to consent";
		}
		return errors;
	}
})();

(function () {
  const option = {
    sliderEl: ".slider",
  };
  slider(option);
})();

var mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
})();