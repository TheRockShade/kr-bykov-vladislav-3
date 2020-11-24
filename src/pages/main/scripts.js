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
			const data = getFormData(e.target);
			let errors = validateData(data, errors = {});
			if (res.success && Object.keys(errors).length === 0) {
				setFormSuccess(e.target);
				setTimeout(() => {
					popupClose(window, open, form);
					answer(answerPopup, "Форма была успешно отправлена", "success");
				}, 2000);
			} else {
				throw res;
			}
			isLoading = false;
		})
		.catch(err => {
			const data = getFormData(e.target);
			let errors = validateData(data, errors = {});

			if (err.errors) {
				setFormErrors(e.target, err.errors);
			}

			if(errors) {
				setFormErrors(e.target, errors);
			}

			if (errors.accept && Object.keys(errors).length === 1 && !err.errors) {
				answer(answerPopup, "Вам нужно подтвердить отправку", "error");
			}
			isLoading = false;
		})
	}

	function validateData(data, errors = {}) {
		if(data.name === "") {
			errors.name = "Пожалуйста, введите своё имя";
		}
		if(data.subject === "") {
			errors.subject = "Пожалуйста, введите тему сообщения";
		}
		if(!checkTelephone(data.telephone)) {
			errors.telephone = "Пожалуйста, введите валидный номер телефона";
		}
		if(data.accept[0] !== "on") {
			errors.accept = "Вам нужно подтвердить отправку";
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