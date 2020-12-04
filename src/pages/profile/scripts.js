const profileName = document.querySelector(".profile-name_js"),
			profileSurname = document.querySelector(".profile-surname_js"),
			profileEmail = document.querySelector(".profile-email_js"),
			profileLocation = document.querySelector(".profile-location_js"),
			profileAge = document.querySelector(".profile-age_js"),
			profilePhoto = document.querySelector(".profile-photo_js"),
			token = localStorage.getItem("token"),
			userId = localStorage.getItem("userId"),
			deleteButton = document.querySelector(".delete_js");

let user = {};

/* --- Change Password Popup --- */

(() => {
	const open = document.querySelector(".change-password_js"),
				window = document.querySelector(".popup--change-password"),
				form = document.forms["change-password"];

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

		const bodyFormData = getFormData(e.target, {}, "FormData");
		const bodyJSON = getFormData(e.target);
		let errors = validateData(bodyJSON, errors = {});
		
		if (Object.keys(errors).length > 0) {
			setFormErrors(e.target, errors);
			isLoading = false;
		} else {
			fetchData({
				method: "PUT",
				body: bodyFormData,
				url: "/api/users",
				headers: {
					"x-access-token": token,
				}
			})
			.then(res => res.json())
			.then (res => {
				if (res.success) {
					clearForm(e.target);
					setFormSuccess(e.target);
					setTimeout(() => {
						popupClose(window, open, form);
						answer(answerPopup, "Пароль был успешно изменён", "success");
					}, 2000);
				} else {
					throw res;
				}
				isLoading = false;
			})
			.catch ((err) => {
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
		if (data.oldPassword.length === 0) {
			errors.oldPassword = "Пожалуйста, введите старый пароль";
		}
		if (data.newPassword.length < 4) {
			errors.newPassword = "Ваш пороль слишком короткий";
		}
		if (data.repeatPassword !== data.newPassword || data.repeatPassword === "") {
			errors.repeatPassword = "Вы неправильно повторили пароль";
		}
		if (data.oldPassword === data.newPassword) {
			errors.newPassword = "Новый пароль должен отличаться от старого";
		}
		return errors;
	}
})();

/* --- Change Data Popup --- */

(() => {
	const open = document.querySelector(".change-data_js"),
				window = document.querySelector(".popup--change-data"),
				form = document.forms["change-data"],
				file = document.querySelector(".file_js"),
				fileText = document.querySelector(".fileText_js");

	let isLoading = false;

	if (open) {
		open.addEventListener("click", () => {
			setValueToForm(form, user);
			popup(window, open, form);
		})
	}

	file.addEventListener("input", () => {
		if (file.value) {
			let fileName = file.value.slice(12);

			if (fileName.length > 20) {
				fileName = fileName.slice(0, 20) + "...";
			}

			fileText.innerHTML = fileName;
		}
	})

	form.addEventListener("submit", (e) => {
		submit(e);
	})

	function submit(e) {
		e.preventDefault();

		if (isLoading) {
			return;
		}
		isLoading = true;

		const bodyFormData = getFormData(e.target, {}, "FormData");
		const bodyJSON = getFormData(e.target);
		let errors = validateData(bodyJSON);

		if (Object.keys(errors).length > 0) {
			setFormErrors(e.target, errors);
			isLoading = false;
		} else {
			fetchData({
				method: "PUT",
				body: bodyFormData,
				url: "/api/users",
				headers: {
					"x-access-token": token,
				}
			})
			.then(res => res.json())
			.then (res => {
				if (res.success) {
					rerenderUserData(res.data);
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
			.catch ((err) => {
				if (err.errors) {
					setFormErrors(form, err.errors);
				} else {
					answer(answerPopup, "Ошибка сервера", "error");
				}
				isLoading = false;
			})
		}
	}

	function validateData(data, errors = {}) {
		if (isNaN(data.age) || data.age === "") {
			errors.age = "Введите возраст";
		}
		return errors;
	}
})();

/* --- User Update --- */

function updateUserData() {
		if (!token || !userId) {
			return window.location = "/";
		}

		fetchData({
			method: "GET",
			url: `/api/users/${userId}`,
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(res => {
			if (res.success) {
				user = res.data;
				rerenderUserData(user);
			} else {
				throw res;
			}
		})
		.catch(err => {
			return window.location = "/";
		})
}

updateUserData();

function rerenderUserData(user) {
	profileName.innerText = user.name;
	profileSurname.innerText = user.surname;
	profileEmail.innerText = user.email;
	profileLocation.innerText = user.location;
	profileAge.innerText = user.age,
	profilePhoto.innerText = "",
	profilePhoto.style = `background-image: url(${SERVER_URL}${user.photoUrl})`;
}

/* --- Delete User --- */

deleteButton.addEventListener("click", () => {
	fetchData({
		method: "DELETE",
		url: `/api/users/${userId}`,
		headers: {
			"x-access-token": token,
		}
	})
	.then(res => res.json())
	.then(res => {
		if (res.success) {
			answer(answerPopup, "Пользователь был успешно удалён", "success");
			setTimeout(() => {
				logoutUser();
			}, 2000)
		} else {
			throw res;
		}
	})
	.catch(() => {
		answer(answerPopup, "Ошибка сервера", "error");
	})
})