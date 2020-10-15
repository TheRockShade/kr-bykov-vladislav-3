(function(){
	const changePasswordForm = document.forms["change-password"];

	changePasswordForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = getFormData(e.target);
		const errors = validateData(data);
		setFormText(changePasswordForm, errors);
		console.log(errors);
	})

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

(function(){
	const changeDataForm = document.forms["change-data"];

	changeDataForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = getFormData(e.target);
		const errors = validateData(data);
		setFormText(changeDataForm, errors);
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
		if(data.location === "") {
			errors.location = "Please enter your location";
		}
		if(isNaN(data.age) || data.age === "") {
			errors.age = "Please enter your age";
		}
		return errors;
	}
})();