let body = document.querySelector("body");

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
