(() => {
	let open = document.querySelector(".change-password_js"),
			window = document.querySelector(".popup--change-password"),
			form = document.forms["change-password"],
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
		const data = getFormData(e.target);
		const errors = validateData(data);
		setFormText(form, errors);
		console.log(errors);
	}

	function validateData(data, errors = {}) {
		if(data.passwordOld === "") {
			errors.passwordOld = "Your password is incorrect";
		}
		if(data.passwordNew.length < 8) {
			errors.passwordNew = "Your new password too short";
		}
		if(data.passwordNewRepeat !== data.passwordNew || data.passwordNewRepeat === "") {
			errors.passwordNewRepeat = "Your password is incorrect";
		}
		return errors;
	}
})();

(() => {
	let open = document.querySelector(".change-data_js"),
			window = document.querySelector(".popup--change-data"),
			form = document.forms["change-data"],
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
		const data = getFormData(e.target);
		const errors = validateData(data);
		setFormText(form, errors);
		console.log(errors);
	}

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
		if(data.location === "") {
			errors.location = "Please enter your location";
		}
		if(isNaN(data.age) || data.age === "") {
			errors.age = "Please enter your age";
		}
		return errors;
	}
})();