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
		if (isLoading) {
			return;
		}
		isLoading = true;
		const body = getFormData(e.target, {}, "FormData");
		fetchData({
			method: "PUT",
			body: body,
			url: "/api/users",
			headers: {
				"x-access-token": token,
			}
		})
		.then(res => res.json())
		.then (res => {
			if (res.success) {
				popupClose(window, open, form);
			} else {
				throw res;
			}
			isLoading = false;
		})
		.catch ((err) => {
			// setFormText(form, err.errors);
			isLoading = false;
		})
	}

	function validateData(data, errors = {}) {
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
		if (isLoading) {
			return;
		}
		isLoading = true;
		const body = getFormData(e.target, {}, "FormData");
		fetchData({
			method: "PUT",
			body: body,
			url: "/api/users",
			headers: {
				"x-access-token": token,
			}
		})
		.then(res => res.json())
		.then (res => {
			if (res.success) {
				rerenderUserData(res.data);
				popupClose(window, open, form);
			} else {
				throw res;
			}
			isLoading = false;
		})
		.catch ((err) => {
			// setFormText(form, err.errors);
			isLoading = false;
		})
	}
})();

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
			console.error(err);
			return window.location = "/";
		})
}

function rerenderUserData(user) {
	profileName.innerText = user.name;
	profileSurname.innerText = user.surname;
	profileEmail.innerText = user.email;
	profileLocation.innerText = user.location;
	profileAge.innerText = user.age,
	profilePhoto.style = `background-image: url(${SERVER_URL}${user.photoUrl})`;
}

updateUserData();

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
			logoutUser();
		} else {
			throw res;
		}
	})
	.catch(() => {
		console.error("Что-то пошло не так");
	})
})