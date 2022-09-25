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
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});
//==================================================Statr Home Page===========================================
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
  if (confirmBtn[i]) {
    confirmBtn[i].addEventListener("click", function (e) {
      e.target.style.display = "none";
      addCart[i].style.display = "flex";
    });
  }
}

let addBtn = document.querySelectorAll(".addBtn");
let deleteBtn = document.querySelectorAll(".delBtn");
let counterTxt = document.querySelectorAll(".numTxt");
let alertTxt = document.querySelector(".message-added");
let alertTxtD = document.querySelector(".message-deleted");
// let productName = document.querySelector(".product-name");
// let productInfo = document.querySelector(".product-info");
// let productImg = document.querySelector(".product-img");
// let productPrice = document.querySelector(".product-price");

// Creating element:
// var new = document.createElement("div")
// var content = document.createTextNode("hello")
// new.appendChild(content)
// var div = document.getElementById("id")
// //hay7otaha ta7t element div (ta7taha msh gowaha)
// document.body.appendChild(new, div)
// Or
// document.body.insertBefore(new, div)
// let card = document.createElement("div");
// card.className = "card mb-4"
// let cardBody = document.createElement("div");
// cardBody.className = "card-body"
//////////////////////////////////////////////////////////////////////////////////////
// let product = [];
// if (localStorage.getItem("product")) {
//   product = JSON.parse(localStorage.getItem("product"));
// }
// let productConfirm = document.querySelector(".product-confirm");
// productConfirm.addEventListener("click", function () {
//   let div = `<div><h1>product</h1></div>`;
//   const projects = {
//     id: Date.now(),
//     title: div,
//   };
//   product.push(projects);
//   window.localStorage.setItem("product", JSON.stringify(product));
//   let data = window.localStorage.getItem("product");
//   if (data) {
//     let productData = JSON.parse(data);
//     let cartContent = document.querySelector(".cart-content");
//     console.log(cartContent);
//     for (let i = 0; i < productData.length; i++) {
//       cartContent.insertAdjacentHTML("beforeend", productData[i]);
//     }
//   }
// });
//////////////////////////////////////////////////////////////////////////////////////
// function createCardEle() {
//   let data = ` <div class="card mb-4">
// <div class="card-body">
//   <div class="d-flex gap-3 justify-content-between">
//     <div class="d-flex flex-row align-items-center">
//       <div>
//         <img
//           src="https://m.media-amazon.com/images/I/61U6oC65TTL._AC_SX466_.jpg"
//           class="img-fluid rounded-3"
//           alt="Shopping item"
//           style="width: 110px"
//         />
//       </div>
//       <div class="ms-3">
//         <h5>Samsung Galaxy S22 Ultra Dual SIM</h5>
//         <p class="small mb-0">512GB, Phantom Black</p>
//       </div>
//     </div>
//     <div class="d-flex flex-row align-items-center justify-content-between gap-2">
//       <div class="d-flex gap-1">
//         <a class="text-decoration-none btn-dark rounded-start" href="#" style="width: 22px; text-align: center">-</a>

//         <input class="input-group border border-none" style="width: 30px" />

//         <a class="text-decoration-none btn-dark rounded-end" style="width: 22px; text-align: center" href="#">+</a>
//       </div>
//       <div>
//         <h5 class="fw-normal mb-0">$900</h5>
//       </div>
//       <a href="#!" style="color: #b22727"><i class="fas fa-trash-alt"></i></a>
//     </div>
//   </div>
// </div>
// </div>`;
//   cartContent.insertAdjacentHTML("beforeend", data);
// }




for (let i = 0; i < addBtn.length; i++) {
  if (addBtn[i]) {
    addBtn[i].addEventListener("click", function () {
      if (counterTxt[i].value < 10) {
        counterTxt[i].value++;
        alertTxt.style.display = "block";
        alertTxt.innerHTML = `${counterTxt[i].value} items in Cart`;
        // createCardEle();
        setTimeout(function () {
          alertTxt.style.display = "none";
        }, 2000);
      }
    });
  }
}
for (let i = 0; i < deleteBtn.length; i++) {
  if (deleteBtn[i]) {
    deleteBtn[i].addEventListener("click", function () {
      if (counterTxt[i].value > 0) {
        counterTxt[i].value--;
        alertTxtD.style.display = "block";
        alertTxtD.innerHTML = `1 item deleted`;
        setTimeout(function () {
          alertTxtD.style.display = "none";
        }, 2000);
      } else {
        counterTxt[i].value = 0;
      }
    });
  }
}
//==================================================End Home Page===========================================
//==================================================Statr Sign Up Page===========================================
let fullName = document.querySelector("#full-name");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmPassword = document.querySelector("#confirm-password");
let submit = document.querySelector("#submit");
// Create An Array To Store Object Data
let signupArray = [];
// Check If Local Storag Has Data
if (localStorage.getItem("UserInfo")) {
  signupArray = JSON.parse(localStorage.getItem("UserInfo"));
}
// Tregger getUserDataFromLs Function

// Submit Event
if (submit) {
  submit.addEventListener("click", (e) => {
    // e.preventDefault();
    if (
      (fullName.value !== "") &
      (email.value !== "") &
      (confirmPassword.value !== "") &
      (password.value !== "")
    ) {
      if (password.value == confirmPassword.value) {
        addUserDataToArray(fullName.value, email.value, password.value);
        fullName.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
        window.location.assign("../pages/login.html");
      } else {
        confirmPassword.value = "";
        alert("password not same");
      }
    }
  });
}

// Function To Add Object Of Data To Array Of Objects
function addUserDataToArray(name, email, pass) {
  //Object To Add To Array
  const signupData = {
    id: Date.now(),
    fullname: name,
    email: email,
    password: pass,
    login: false,
  };
  // Push Object To Array
  signupArray.push(signupData);
  // Add Data To Local Storage
  addSignupDataToLS(signupArray);
}
//Function To Add Signup Data To Local Storage
function addSignupDataToLS(array) {
  window.localStorage.setItem("UserInfo", JSON.stringify(array));
}
//==================================================End Sign Up Page===========================================
//==================================================Statr Log In Page===========================================

let loginEmail = document.querySelector("#login-email");
let loginPassword = document.querySelector("#login-password");
let loginSubmit = document.querySelector("#login-submit");

if (loginSubmit) {
  loginSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    if ((loginEmail !== "") & (loginPassword !== "")) {
      let d = getUserDataFromLS();
      if (d == true) {
        window.location.assign("../index.html");
      } else {
        alert("Invalid Email Or Password");
      }
    }
  });
}
function getUserDataFromLS() {
  let data = window.localStorage.getItem("UserInfo");
  if (data) {
    let loginData = JSON.parse(data);
    for (let i = 0; i < loginData.length; i++) {
      if (loginEmail.value == loginData[i].email) {
        if (loginPassword.value == loginData[i].password) {
          return true;
        }
      }
    }
    return false;
  }
}

//==================================================End Log In Page===========================================
