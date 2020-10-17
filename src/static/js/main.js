let body = document.querySelector("body");

/* --- Mobile Menu --- */

(function () {
  let menu = document.querySelector(".menu"),
    menuOpen = document.querySelector(".menu__open"),
    menuClose = document.querySelector(".menu__close"),
    focusItem = document.querySelector(".js_focus");

  menuOpen.addEventListener("click", () => {
    menu.classList.add("js_open");
    body.classList.add("js_overflow");
    focusItem.focus();
  });

  menuClose.addEventListener("click", () => {
    menu.classList.remove("js_open");
    body.classList.remove("js_overflow");
    menuOpen.focus();
  });

  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && menu.classList.contains("js_open")) {
      menu.classList.remove("js_open");
      body.classList.remove("js_overflow");
      menuOpen.focus();
    }
  });
})();

/* --- Popup Windows --- */

(function () {
  let loginOpen = document.querySelector(".js_signin"),
    loginPopup = document.querySelector(".popup--login");

  let loginOpenMenu = document.querySelector(".js_signin--menu"),
    loginPopupMenu = document.querySelector(".popup--login");

  let registerOpen = document.querySelector(".js_register"),
    registerPopup = document.querySelector(".popup--register");

  let registerOpenMenu = document.querySelector(".js_register--menu"),
    registerPopupMenu = document.querySelector(".popup--register");

  let messageOpen = document.querySelector(".js_message"),
    messagePopup = document.querySelector(".popup--message");

  let changePasswordOpen = document.querySelector(".js_change-password"),
    changePasswordPopup = document.querySelector(".popup--change-password");

  let changeDataOpen = document.querySelector(".js_change-data"),
    changeDataPopup = document.querySelector(".popup--change-data");

  function popup(button, popup) {
    if (button && popup) {
      let close = popup.querySelector(".popup__close");
      button.addEventListener("click", () => {
        let focus = popup.querySelector(".popup__input");
        popup.classList.add("js_open");
        body.classList.add("js_overflow");
        focus.focus();
      });
      close.addEventListener("click", () => {
        popup.classList.remove("js_open");
        body.classList.remove("js_overflow");
        button.focus();
      });
      window.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && popup.classList.contains("js_open")) {
          popup.classList.remove("js_open");
          body.classList.remove("js_overflow");
          button.focus();
        }
      });
    }
  }

  popup(loginOpen, loginPopup);
  popup(loginOpenMenu, loginPopupMenu);
  popup(registerOpen, registerPopup);
  popup(registerOpenMenu, registerPopupMenu);
  popup(messageOpen, messagePopup);
  popup(changePasswordOpen, changePasswordPopup);
  popup(changeDataOpen, changeDataPopup);
})();

/* --- Scroll Button --- */

(function () {
  let scrollButton = document.querySelector(".scroll-button");

  if (!scrollButton) {
    return;
  }

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 1500) {
      scrollButton.classList.add("js_open");
    } else {
      scrollButton.classList.remove("js_open");
    }
  });

  scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

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
  });

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
    if (index === activeSlide) {
      dot.classList.add("pagination__button--active");
    }
    dot.addEventListener("click", () => {
      setActiveSlide(index);
    });
    return dot;
  }

  function initSlidesWidth() {
    slideWidth = wrapper.clientWidth;
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });
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
  });

  buttonNext.addEventListener("click", () => {
    setActiveSlide(activeSlide + 1);
  });
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
	});
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
	});
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
	});
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
	});
}

function setFormText(form, errors) {
	let inputs = form.querySelectorAll("input");
	for (let input of inputs) {
		if(errors[input.name] && input.type !== "checkbox" && input.type !== "radio") {
			inputError(input);
			textError(input, errors[input.name]);
		}
		if(!errors[input.name]) {
			inputSuccess(input);
			textSuccess(input);
		}
	}
}

function getFormData(form, data = {}) {
	let inputs = form.querySelectorAll("input");
	for(let input of inputs) {
		switch(input.type) {
			case "radio":
				if (input.checked) {
					data[input.name] = input.value;
				}
				break;
			case "checkbox":
				if(!data[input.name]) {
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
	for(let textarea of textareas) {
		data[textarea.name] = textarea.value;
	}
	return data;
}

(function(){
	const register = document.forms["register"];

	register.addEventListener("submit", (e) => {
		e.preventDefault();
		let data = getFormData(e.target);
		let errors = validateData(data);
		setFormText(register, errors);
		console.log(errors);
	})

	function validateData(data, errors = {}) {
		if(!checkEmail(data.email)) {
			errors.email = "Please enter a valid email adress";
		}
		if(data.name === "") {
			errors.name = "Please enter your name";
		}
		if(data.surname === "") {
			errors.surname = "Please enter your surname";
		}
		if(data.password.length < 8) {
			errors.password = "Your password too short";
		}
		if(data.passwordRepeat !== data.password || data.passwordRepeat === "") {
			errors.passwordRepeat = "Your password is incorrect";
		}
		if(data.location === "") {
			errors.location = "Please enter your location";
		}
		if(isNaN(data.age) || data.age === "") {
			errors.age = "Please enter your age";
		}
		if(data.accept[0] !== "yes") {
			errors.accept = "You need to consent";
		}
		return errors;
	}
})();

(function(){
	const loginForm = document.forms["login"];

	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = getFormData(e.target);
		const errors = validateData(data);
		setFormText(loginForm, errors);
		console.log(errors);
	})

	function validateData(data, errors = {}) {
		if(!checkEmail(data.email)) {
			errors.email = "Please enter a valid email adress";
		}
		if(data.password === "") {
			errors.password = "Please enter your password";
		}
		return errors;
	}
})();