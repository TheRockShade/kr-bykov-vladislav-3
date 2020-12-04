const SERVER_URL = "https://academy.directlinedev.com",
			VERSION_API = "1.0.0",
			body = document.querySelector("body"),
			logout = document.querySelector(".logout_js"),
			logoutMenu = document.querySelector(".logout--menu_js"),
			answerPopup = document.querySelector(".answer");

/* --- Login Popup --- */

(() => {
	const open = document.querySelector(".signin_js"),
				window = document.querySelector(".popup--login"),
				form = document.forms["login"],
				openMenu = document.querySelector(".signin--menu_js"),
				windowMenu = document.querySelector(".popup--login");

	let	isLoading = false;

	if (open) {
		open.addEventListener("click", () => {
			popup(window, open, form);
		})
	}

	if (openMenu) {
		openMenu.addEventListener("click", () => {
			popup(windowMenu, openMenu, form);
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
		let errors = validateData(data);

		if (Object.keys(errors).length > 0) {
			setFormErrors(e.target, errors);
			isLoading = false;
		} else {
			fetchData({
				method: "POST",
				url: "/api/users/login",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(res => res.json())
			.then(res => {
				if (res.success) {
					setFormSuccess(e.target);
					updateToken(res.data);
					updateState();
	
					setTimeout(() => {
						popupClose(window, open, form);
						answer(answerPopup, "Вы успешно вошли", "success");
					}, 2000);
	
				} else {
					throw res;
				}
			})
			.catch(err => {
				if (err._message) {
					answer(answerPopup, err._message, "error");
				} else {
					answer(answerPopup, "Ошибка сервера", "error");
				}
				isLoading = false;
			})
		}
	}

	function validateData(data, errors = {}) {
		if(!checkEmail(data.email)) {
			errors.email = "Введите корректный email";
		}
		if(data.password === "" || data.password.length < 4) {
			errors.password = "Длина пароля от 4 символов";
		}
		return errors;
	}
})();

/* --- Register Popup --- */

(() => {
	const open = document.querySelector(".register_js"),
				window = document.querySelector(".popup--register"),
				openMenu = document.querySelector(".register--menu_js"),
				windowMenu = document.querySelector(".popup--register"),
				form = document.forms["register"];

	let	isLoading = false;

	if (open) {
		open.addEventListener("click", () => {
			popup(window, open, form);
		})
	}

	if (openMenu) {
		openMenu.addEventListener("click", () => {
			popup(windowMenu, openMenu, form);
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

		if (Object.keys(errors).length > 0) {
			setFormErrors(e.target, errors);
			isLoading = false;
		} else {
			fetchData({
				method: "POST",
				url: "/api/users",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then (res => { return res.json(); })
			.then(res => {
				if (res.success) {
					setFormSuccess(e.target);
					setTimeout(() => {
						popupClose(window, open, form);
						answer(answerPopup, "Пользователь был успешно создан", "success");
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
		if (data.email === "") {
			errors.email = "Введите email";
		}
		if (data.name === "") {
			errors.name = "Введите имя";
		}
		if (data.surname === "") {
			errors.surname = "Введите фамилию";
		}
		if (data.password === "" || data.password.length < 4) {
			errors.password = "Длина пароля от 4 символов";
		}
		if (data.passwordRepeat !== data.password || data.passwordRepeat === "") {
			errors.passwordRepeat = "Повторите пароль корректно";
		}
		if (data.location === "") {
			errors.location = "Введите местоположение";
		}
		if (isNaN(data.age) || data.age === "") {
			errors.age = "Введите возраст";
		}
		return errors;
	}
})();

/* --- Message Popup --- */

(() => {
	const open = document.querySelector(".message_js"),
				window = document.querySelector(".popup--message"),
				form = document.forms["message"];

	let isLoading = false;

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
				}
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
		if (data.name === "") {
			errors.name = "Пожалуйста, введите своё имя";
		}
		if (data.subject === "") {
			errors.subject = "Пожалуйста, введите тему сообщения";
		}
		if (data.to === "") {
			errors.to = "Пожалуйста, введите ваш email";
		}
		if (!checkTelephone(data.telephone)) {
			errors.telephone = "Пожалуйста, введите валидный номер телефона";
		}
		return errors;
	}
})();

/* --- Mobile Menu --- */

(() => {
  const menu = document.querySelector(".menu"),
				menuOpen = document.querySelector(".menu__open"),
				menuClose = document.querySelector(".menu__close"),
				focusItem = document.querySelector(".focus_js");

  menuOpen.addEventListener("click", () => {
    menu.classList.add("open_js");
    body.classList.add("overflow_js");
    focusItem.focus();
  })

  menuClose.addEventListener("click", () => {
    menu.classList.remove("open_js");
    body.classList.remove("overflow_js");
    menuOpen.focus();
  })

  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && menu.classList.contains("open_js")) {
      menu.classList.remove("open_js");
      body.classList.remove("overflow_js");
      menuOpen.focus();
    }
  })
})();

/* --- Scroll Button --- */

(() => {
	const scrollButton = document.querySelector(".scroll-button"),
				logo = document.querySelector(".logo_js"),
				menu = document.querySelector(".menu_js");

  if (!scrollButton) {
    return;
  }

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 1500) {
      scrollButton.classList.add("open_js");
    } else {
      scrollButton.classList.remove("open_js");
    }
  })

  scrollButton.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		
		if (logo) {
			setTimeout(() => {
				logo.focus();
			}, 1000)
		}

		if (menu) {
			setTimeout(() => {
				menu.focus();
			}, 1000)
		}
  })
})();

/* --- Popup Windows Functional --- */

function popup(popup, button, form) {
	const close = popup.querySelector(".popup__close"),
				focus = popup.querySelector(".popup__input"),
				checkbox = popup.querySelector(".popup__checkbox"),
				submit = popup.querySelector(".popup__button");

	popup.classList.add("open_js");
	body.classList.add("overflow_js");
	focus.focus();

	if (checkbox) {
		checkbox.addEventListener("click", () => {
			if (submit.hasAttribute("disabled")) {
				submit.removeAttribute("disabled");
			} else {
				submit.setAttribute("disabled", "");
			}
		})
	}

	close.addEventListener("click", (e) => {
		e.preventDefault();
		popupClose(popup, button, form);
	})

	window.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && popup.classList.contains("open_js")) {
			popupClose(popup, button, form);
		}
	})
}

function popupClose(popup, button, form) {
	popup.classList.remove("open_js");
	body.classList.remove("overflow_js");
	form.reset();
	clearForm(form);
	button.focus();
}

function answer(popup, text, type) {
	let close = popup.querySelector(".answer__close");
	let textBox = popup.querySelector(".answer__text");

	popup.classList.add("open_js");
	body.classList.add("overflow_js");

	if (textBox.classList.contains("answer__text--success")) {
		textBox.classList.remove("answer__text--success");
	}
	if (textBox.classList.contains("answer__text--error")) {
		textBox.classList.remove("answer__text--error");
	}
	if (type === "success") {
		textBox.classList.add("answer__text--success");
	}
	if (type === "error") {
		textBox.classList.add("answer__text--error");
	}

	textBox.innerText = text;

	close.addEventListener("click", (e) => {
		e.preventDefault();
		popup.classList.remove("open_js");
		body.classList.remove("overflow_js");
	})

	window.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && popup.classList.contains("open_js")) {
			popup.classList.remove("open_js");
			body.classList.remove("overflow_js");
		}
	})
}

/* --- Slider --- */

function slider({ sliderEl, defaultActiveSlide = +localStorage.getItem("activeSlide") || 0 }) {
  const slider = document.querySelector(sliderEl),
				wrapper = slider.querySelector(".slider__wrapper"),
				innerWrapper = slider.querySelector(".slider__inner-wrapper"),
				slides = [...slider.querySelectorAll(".slider__slide")],
				pagination = slider.querySelector(".pagination"),
				buttonBack = slider.querySelector(".arrow-button--left"),
				buttonNext = slider.querySelector(".arrow-button--right"),
				aniTime = 500;

  let activeSlide = defaultActiveSlide,
			slideWidth = 0,
			dots = [],
			timerId = null;

  initSlidesWidth();
  createPagination();
  setActiveSlide(activeSlide, false);

  window.addEventListener("resize", () => {
    initSlidesWidth();
    setActiveSlide(activeSlide, false);
  })

  function addAnimation(duration) {
    clearTimeout(timerId);
		innerWrapper.style.transition = `transform ${duration}ms`;
		
    timerId = setTimeout(() => {
      innerWrapper.style.transition = ``;
    }, duration);
  }

  function createPagination() {
    for (let i = 0; i < slides.length; i++) {
      let dot = createDot(i);
      pagination.insertAdjacentElement("beforeend", dot);
      dots.push(dot);
    }
  }

  function createDot(index) {
    let dot = document.createElement("button");
		dot.classList.add("pagination__button");
		dot.setAttribute("aria-label", `Slide number ${index + 1}`)

    if (index === activeSlide) {
      dot.classList.add("pagination__button--active");
		}
		
    dot.addEventListener("click", () => {
      setActiveSlide(index);
		})
		
    return dot;
  }

  function initSlidesWidth() {
		slideWidth = wrapper.clientWidth;
		
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    })
  }

  function setActiveSlide(index = 0, playAnimation = true) {
    if (index < 0 || index >= slides.length) {
      return;
    }
    if (playAnimation) {
      addAnimation(aniTime);
		}
		
    dots[activeSlide].classList.remove("pagination__button--active");
		dots[index].classList.add("pagination__button--active");
		
    if (index === 0) {
      buttonBack.setAttribute("disabled", "");
    } else {
      buttonBack.removeAttribute("disabled");
    }
    if (index === slides.length - 1) {
      buttonNext.setAttribute("disabled", "");
    } else {
      buttonNext.removeAttribute("disabled");
		}
		
    innerWrapper.style.transform = `translateX(-${slideWidth * index}px)`;
		activeSlide = index;
		localStorage.setItem("activeSlide", activeSlide);
  }

  buttonBack.addEventListener("click", () => {
    setActiveSlide(activeSlide - 1);
  })

  buttonNext.addEventListener("click", () => {
    setActiveSlide(activeSlide + 1);
  })
}

/* --- Validation --- */

function checkEmail(email) {
	return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
}

function checkTelephone(telephone) {
	return telephone.match(/^(\s*)?(\+)?([-_():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
}

function inputError(input) {
	if (input.hasAttribute("isError")) {
		return;
	}
	input.setAttribute("isError", "");
	input.classList.add("popup__input--error");
	input.addEventListener("input", () => {
		input.classList.remove("popup__input--error");
		input.removeAttribute("isError");
	})
}

function inputSuccess(input) {
	if (input.hasAttribute("isSuccess")) {
		return;
	}

	input.setAttribute("isSuccess", "");
	input.classList.add("popup__input--success");

	input.addEventListener("input", () => {
		input.classList.remove("popup__input--success");
		input.removeAttribute("isSuccess");
	})
}

function textSuccess(input) {
	if (input.hasAttribute("isSuccessText")) {
		return;
	}

	input.setAttribute("isSuccessText", "");
	const message = document.createElement('span');
	message.classList.add('popup__text','popup__text--success','text-small');
	message.innerText = "All done";
	input.insertAdjacentElement("afterend", message);

	input.addEventListener("input", () => {
		message.remove();
		input.removeAttribute("issuccessText");
	})
}

function textError(input, error) {
	if (input.hasAttribute("isErrorText")) {
		return;
	}

	input.setAttribute("isErrorText", "");
	const message = document.createElement('span');
	message.classList.add('popup__text','popup__text--error','text-small');
	message.innerText = error;
	input.insertAdjacentElement("afterend", message);

	input.addEventListener("input", () => {
		message.remove();
		input.removeAttribute("isErrorText");
	})
}

function setFormErrors(form, errors) {
	let inputs = form.querySelectorAll("input");

	for (let input of inputs) {
		if (errors[input.name] && input.type !== "checkbox" && input.type !== "radio") {
			inputError(input);
			textError(input, errors[input.name]);
		}
	}
}

function setFormSuccess(form) {
	let inputs = form.querySelectorAll("input");

	for (let input of inputs) {
		if (input.type !== "checkbox" && input.type !== "radio") {
			inputSuccess(input);
			textSuccess(input);
		}
	}
}

function clearInput(input) {
	if (input.hasAttribute("isError")) {
		input.classList.remove("popup__input--error");
		input.removeAttribute("isError");
		input.removeAttribute("isErrorText");
	} else {
		input.classList.remove("popup__input--success");
		input.removeAttribute("isSuccess");
		input.removeAttribute("isSuccessText");
	}
}

function clearText(form) {
	let messages = [...form.querySelectorAll(".popup__text--error")].concat([...form.querySelectorAll(".popup__text--success")]);

	for (let message of messages) {
		message.remove();
	}
}

function clearForm(form) {
	let inputs = form.querySelectorAll("input");

	for (let input of inputs) {
		clearInput(input);
	}

	clearText(form);
}

function getFormData(form, data = {}, type = "json") {
	if (type === "json") {
		let inputs = form.querySelectorAll("input");

		for (let input of inputs) {
			switch (input.type) {
				case "radio":
					if (input.checked) {
						data[input.name] = input.value;
					}
					break;
				case "checkbox":
					if (!data[input.name]) {
						data[input.name] = [];
					}
					if (input.checked) {
						data[input.name].push(input.value);
					}
					break;
				case "file":
					data[input.name] = input.files;
					break;
				default:
					data[input.name] = input.value;
					break;
			}
		}

		let textareas = form.querySelectorAll("textarea");

		for (let textarea of textareas) {
			data[textarea.name] = textarea.value;
		}

		return data;
	} else {
		return new FormData(form);
	}
}

function setValueToForm(form, data) {
	let inputs = form.querySelectorAll("input");

	for (let input of inputs) {
		switch(input.type) {
			case "radio":
				if (data[input.name] === input.value) {
					input.checked = true;
				}
				break;
			case "checkbox":
				if (data[input.name] && data[input.name].includes(input.value)) {
					input.checked = true;
				}
				break;
			default:
				if (data[input.name]) {
					input.value = data[input.name];
				}
				break;
		}
	}
	return data;
}

/* --- Other --- */

function fetchData({ method = "get", url = "", headers = {}, body = null }) {
	return fetch(SERVER_URL + url, {
		method: method,
		body: body,
		headers: headers
	})
}

function updateToken({ token, userId }) {
	localStorage.setItem("token", token);
	localStorage.setItem("userId", userId);
}

function updateState() {
	const login = document.querySelector(".signin_js"),
				register = document.querySelector(".register_js"),
				profile = document.querySelector(".profile_js"),
				loginMenu = document.querySelector(".signin--menu_js"),
				registerMenu = document.querySelector(".register--menu_js"),
				profileMenu = document.querySelector(".profile--menu_js");

	if (localStorage.getItem("token")) {
		login.classList.add("hide_js");
		register.classList.add("hide_js");
		profile.classList.remove("hide_js");
		logout.classList.remove("hide_js");

		loginMenu.classList.add("hide_js");
		registerMenu.classList.add("hide_js");
		profileMenu.classList.remove("hide_js");
		logoutMenu.classList.remove("hide_js");
	} else {
		login.classList.remove("hide_js");
		register.classList.remove("hide_js");
		profile.classList.add("hide_js");
		logout.classList.add("hide_js");

		loginMenu.classList.remove("hide_js");
		registerMenu.classList.remove("hide_js");
		profileMenu.classList.add("hide_js");
		logoutMenu.classList.add("hide_js");
	}
}

updateState();

logout.addEventListener("click", () => {
	answer(answerPopup, "Вы успешно вышли", "success");

	setTimeout(() => {
		logoutUser();
	}, 2000)
})

logoutMenu.addEventListener("click", () => {
	answer(answerPopup, "Вы успешно вышли", "success");

	setTimeout(() => {
		logoutUser();
	}, 2000)
})

function logoutUser() {
	localStorage.removeItem("token");
	localStorage.removeItem("userId");
	return window.location = "/";
}

function spinnerCreator() {
	return `<div class="spinner">Loading...</div>`;
}