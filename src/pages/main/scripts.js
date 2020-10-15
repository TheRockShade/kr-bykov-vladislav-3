(function(){
	const messageForm = document.forms["message"];

	messageForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const data = getFormData(e.target);
		const errors = validateData(data);
		setFormText(messageForm, errors);
		console.log(errors);
	})

	function validateData(data, errors = {}) {
		if(data.name === "") {
			errors.name = "Please enter your name";
		}
		if(data.subject === "") {
			errors.subject = "Please enter a message subject";
		}
		if(!checkEmail(data.email)) {
			errors.email = "Please enter a valid email adress";
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