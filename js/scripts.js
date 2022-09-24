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
    e.preventDefault();
    if ((fullName.value !== "") & (email.value !== "") & (confirmPassword.value !== "") & (password.value !== "")) {
      if (password.value == confirmPassword.value) {
        signupArray = JSON.parse(localStorage.getItem("UserInfo"));
        if (
          signupArray.some((v) => {
            return v.email == email.value;
          })
        ) {
          alert("dublicate data");
        } else {
          addUserDataToArray(fullName.value, email.value, password.value);
          fullName.value = "";
          email.value = "";
          password.value = "";
          confirmPassword.value = "";
          window.location.assign("../pages/login.html");
        }
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
    if (loginEmail.value !== "" && loginPassword.value !== "") {
      let result = checkUserDataInLS();
      if (result == true) {
        window.location.assign("../index.html");

        loginBtn.innerHTML = "Log Out";
        signBtn.style.display = "none";
      } else {
        console.log("envalid email or password");
      }
    } else {
      console.log("Enter Your Data");
    }
  });
}
function checkUserDataInLS() {
  let data = window.localStorage.getItem("UserInfo");
  if (data) {
    let loginData = JSON.parse(data);
    for (let i = 0; i < loginData.length; i++) {
      if ((loginData[i].email == loginEmail.value) & (loginData[i].password == loginPassword.value)) {
        activeLogin(loginData[i].id);

        return true;
      }
    }
  }
  return false;
}
function activeLogin(userId) {
  for (let i = 0; i < signupArray.length; i++) {
    if (signupArray[i].id == userId) {
      signupArray[i].login == false ? (signupArray[i].login = true) : (signupArray[i].login = false);
    }
  }
  addSignupDataToLS(signupArray);
}
// function getUserDataFromLS() {
//   let data = window.localStorage.getItem("UserInfo");
//   if (data) {
//     let loginData = JSON.parse(data);
//     console.log(loginData.length);
//     for (let i = 0; i < loginData.length; i++) {
//       if (loginEmail.value == loginData[i].email) {
//         if (loginPassword.value == loginData[i].password) {
//           return true;
//         }
//       }
//     }
//     return false;
//   }
// }

//==================================================End Log In Page===========================================
