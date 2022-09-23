/*!
 * Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 74,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(document.querySelectorAll("#navbarResponsive .nav-link"));
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});
// stop nav
let nav = document.querySelector(".header-nav");
let scrol;
document.onscroll = function () {
  nav.style.display = "block";

  clearTimeout(scrol);
  scrol = setTimeout(function () {
    nav.style.display = "none";
  }, 2000);
};
// modal add cart
let confirmBtn = document.getElementsByClassName("confirm-btn");
let addCart = document.querySelectorAll(".addCart");
// console.log(addCart.length);
for (let i = 0; i < confirmBtn.length; i++) {
  confirmBtn[i].addEventListener("click", function (e) {
    e.target.style.display = "none";
    addCart[i].style.display = "flex";
  });
}

let addBtn = document.querySelectorAll(".addBtn");
let deleteBtn = document.querySelectorAll(".delBtn");
let counterTxt = document.querySelectorAll(".numTxt");
let alertTxt = document.querySelector(".message-added");
let alertTxtD = document.querySelector(".message-deleted");
for (let i = 0; i < addBtn.length; i++) {
  addBtn[i].addEventListener("click", function () {
    counterTxt[i].value++;
    alertTxt.style.display = "block";
    alertTxt.innerHTML = `Added ${counterTxt[i].value} Cart`;
    setTimeout(function () {
      alertTxt.style.display = "none";
    }, 2000);
  });
}
for (let i = 0; i < deleteBtn.length; i++) {
  deleteBtn[i].addEventListener("click", function () {
    counterTxt[i].value--;
    alertTxtD.style.display = "block";
    alertTxtD.innerHTML = `Deleted 1 Cart`;
    setTimeout(function () {
      alertTxtD.style.display = "none";
    }, 2000);
  });
}
