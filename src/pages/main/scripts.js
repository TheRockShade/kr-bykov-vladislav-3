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

		const body = getFormData(e.target);
		let errors = validateData(body);

		if(errors.accept && Object.keys(errors).length === 1) {
			answer(answerPopup, "Вам нужно подтвердить отправку", "error");
		}
		
		if (Object.keys(errors).length > 0) {
			setFormErrors(e.target, errors);
			isLoading = false;
		} else {
			let newData = {
				to: body.to,
				body: JSON.stringify(body)
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
				if (res.success) {
					setFormSuccess(e.target);
					setTimeout(() => {
						popupClose(window, open, form);
						answer(answerPopup, "Сообщение было успешно отправлено", "success");
					}, 2000);
				} else {
					throw res;
				}
				isLoading = false;
			})
			.catch(err => {
				if (err.errors) {
					setFormErrors(e.target, err.errors);
				} else {
					answer(answerPopup, "Ошибка сервера", "error");
				}
				isLoading = false;
			})
		}
	}

	function validateData(data, errors = {}) {
		if(data.name === "") {
			errors.name = "Пожалуйста, введите своё имя";
		}
		if(data.subject === "") {
			errors.subject = "Пожалуйста, введите тему сообщения";
		}
		if(data.to === "") {
			errors.to = "Пожалуйста, введите ваш email";
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