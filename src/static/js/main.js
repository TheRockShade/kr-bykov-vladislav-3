(function () {
  let body = document.querySelector("body"),
    menu = document.querySelector(".menu"),
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
    }
  });
})();
