/* --- Swiper --- */

(() => {
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
})