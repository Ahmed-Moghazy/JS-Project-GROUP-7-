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
  if (nav) {
    nav.style.display = "block";
    clearTimeout(scrol);
    scrol = setTimeout(function () {
      nav.style.display = "none";
    }, 2000);
  }
};
// modal add cart
let confirmBtn = document.getElementsByClassName("confirm-btn");
let addCart = document.querySelectorAll(".addCart");
// console.log(addCart.length);
if (confirmBtn) {
  for (let i = 0; i < confirmBtn.length; i++) {
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
if (addBtn) {
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
}

if (deleteBtn) {
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
    if ((fullName.value !== "") & (email.value !== "") & (confirmPassword.value !== "") & (password.value !== "")) {
      if (password.value == confirmPassword.value) {
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
          window.location.assign("/JS-Project-GROUP-7-/pages/login.html");
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
        window.location.assign("/JS-Project-GROUP-7-/index.html");
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
// chaange Button Login to logout and hide sign up from all pages if user is login
window.onload = function () {
  let logind = window.localStorage.getItem("UserInfo");

  let localD = JSON.parse(logind);
  let signBtn = document.querySelector("#signBtn");
  let loginBtn = document.querySelector("#loginBtn");
  for (let i = 0; i < localD.length; i++) {
    if (localD[i].login == true) {
      if (loginBtn) {
        loginBtn.innerHTML = "Log Out";
      }
      if (signBtn) {
        signBtn.style.display = "none";
      }
    }
  }
  // Get Cart From Local To Cart Page
  let cartPage = document.querySelector(".cartdata");
  let cartDivOne = localStorage.getItem("cart1");
  let cartDivTwo = localStorage.getItem("cart2");
  let cartDivThree = localStorage.getItem("cart3");
  let cartDivFour = localStorage.getItem("cart4");
  let cartDivFive = localStorage.getItem("cart5");
  let cartDivSix = localStorage.getItem("cart6");
  if (cartPage) {
    cartPage.insertAdjacentHTML("beforeend", cartDivOne);
    cartPage.insertAdjacentHTML("beforeend", cartDivTwo);
    cartPage.insertAdjacentHTML("beforeend", cartDivThree);
    cartPage.insertAdjacentHTML("beforeend", cartDivFour);
    cartPage.insertAdjacentHTML("beforeend", cartDivFive);
    cartPage.insertAdjacentHTML("beforeend", cartDivSix);
  }
};

// If user Log out change the value of login in local storage to false
let logoutBtn = document.querySelector("#loginBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    let logoutLS = window.localStorage.getItem("UserInfo");
    if (logoutLS) {
      let logoutJResult = JSON.parse(logoutLS);
      for (let i = 0; i < logoutJResult.length; i++) {
        if (logoutJResult[i].login == true) {
          activeLogout(logoutJResult[i].id);
        }
      }
      window.location.assign("/JS-Project-GROUP-7-/pages/login.html");
    }
  });
  function activeLogout(userId) {
    for (let i = 0; i < signupArray.length; i++) {
      if (signupArray[i].id == userId) {
        signupArray[i].login = false;
      }
    }
    addSignupDataToLS(signupArray);
  }
}
//==================================================End Log In Page===========================================
//==================================================Start Cart Page===========================================
// let addToCartOne = document.querySelector(".add-to-cart-one");
// let carttextOne = document.querySelector(".cart-text-one");
// let addToCartTwo = document.querySelector(".add-to-cart-two");
// let carttextTwo = document.querySelector(".cart-text-two");
// let addToCartThree = document.querySelector(".add-to-cart-three");
// let carttextThree = document.querySelector(".cart-text-three");
// let addToCartFour = document.querySelector(".add-to-cart-four");
// let carttextFour = document.querySelector(".cart-text-four");
// let addToCartFive = document.querySelector(".add-to-cart-five");
// let carttextFive = document.querySelector(".cart-text-five");
// let addToCartSix = document.querySelector(".add-to-cart-six");
// let carttextSix = document.querySelector(".cart-text-six");
// // let cartArray = [];

// if (addToCartOne) {
//   addToCartOne.addEventListener("click", function () {
//     let cartData = ` <div class="card mb-4">
//     <div class="card-body">
//       <div class="d-flex gap-3 justify-content-between">
//         <div class="d-flex flex-row align-items-center">
//           <div>
//             <img
//               src="https://m.media-amazon.com/images/I/61U6oC65TTL._AC_SX466_.jpg"
//               class="img-fluid rounded-3"
//               alt="Shopping item"
//               style="width: 110px"
//             />
//           </div>
//           <div class="ms-3">
//             <h5>Samsung Galaxy S22 Ultra Dual SIM</h5>
//             <p class="small mb-0">512GB, Phantom Black</p>
//           </div>
//         </div>
//         <div class="d-flex flex-row align-items-center justify-content-between gap-2">
//           <div class="d-flex gap-1">
//             <a class="text-decoration-none btn-dark rounded-start" href="#" style="width: 22px; text-align: center">-</a>
    
//             <input class="input-group border border-none" style="width: 30px" value = ${carttextOne.value} />
    
//             <a class="text-decoration-none btn-dark rounded-end" style="width: 22px; text-align: center" href="#">+</a>
//           </div>
//           <div>
//             <h5 class="fw-normal mb-0">$900</h5>
//           </div>
//           <a href="#!" style="color: #b22727"><i class="fas fa-trash-alt"></i></a>
//         </div>
//       </div>
//     </div>
//     </div>`;
//     localStorage.setItem("cart1", cartData);
//   });
// }
// if (addToCartTwo) {
//   addToCartTwo.addEventListener("click", function () {
//     let cartData = ` <div class="card mb-4">
//       <div class="card-body">
//         <div class="d-flex gap-3 justify-content-between">
//           <div class="d-flex flex-row align-items-center">
//             <div>
//               <img
//                 src="https://m.media-amazon.com/images/I/61U6oC65TTL._AC_SX466_.jpg"
//                 class="img-fluid rounded-3"
//                 alt="Shopping item"
//                 style="width: 110px"
//               />
//             </div>
//             <div class="ms-3">
//               <h5>Samsung Galaxy S22 Ultra Dual SIM</h5>
//               <p class="small mb-0">512GB, Phantom Black</p>
//             </div>
//           </div>
//           <div class="d-flex flex-row align-items-center justify-content-between gap-2">
//             <div class="d-flex gap-1">
//               <a class="text-decoration-none btn-dark rounded-start" href="#" style="width: 22px; text-align: center">-</a>
      
//               <input class="input-group border border-none" style="width: 30px" value = ${carttextTwo.value} />
      
//               <a class="text-decoration-none btn-dark rounded-end" style="width: 22px; text-align: center" href="#">+</a>
//             </div>
//             <div>
//               <h5 class="fw-normal mb-0">$900</h5>
//             </div>
//             <a href="#!" style="color: #b22727"><i class="fas fa-trash-alt"></i></a>
//           </div>
//         </div>
//       </div>
//       </div>`;
//     localStorage.setItem("cart2", cartData);
//   });
// }
// if (addToCartThree) {
//   addToCartThree.addEventListener("click", function () {
//     let cartData = ` <div class="card mb-4">
//       <div class="card-body">
//         <div class="d-flex gap-3 justify-content-between">
//           <div class="d-flex flex-row align-items-center">
//             <div>
//               <img
//                 src="https://m.media-amazon.com/images/I/61U6oC65TTL._AC_SX466_.jpg"
//                 class="img-fluid rounded-3"
//                 alt="Shopping item"
//                 style="width: 110px"
//               />
//             </div>
//             <div class="ms-3">
//               <h5>Samsung Galaxy S22 Ultra Dual SIM</h5>
//               <p class="small mb-0">512GB, Phantom Black</p>
//             </div>
//           </div>
//           <div class="d-flex flex-row align-items-center justify-content-between gap-2">
//             <div class="d-flex gap-1">
//               <a class="text-decoration-none btn-dark rounded-start" href="#" style="width: 22px; text-align: center">-</a>
      
//               <input class="input-group border border-none" style="width: 30px" value = ${carttextThree.value} />
      
//               <a class="text-decoration-none btn-dark rounded-end" style="width: 22px; text-align: center" href="#">+</a>
//             </div>
//             <div>
//               <h5 class="fw-normal mb-0">$900</h5>
//             </div>
//             <a href="#!" style="color: #b22727"><i class="fas fa-trash-alt"></i></a>
//           </div>
//         </div>
//       </div>
//       </div>`;
//     localStorage.setItem("cart3", cartData);
//   });
// }
// if (addToCartFour) {
//   addToCartFour.addEventListener("click", function () {
//     let cartData = ` <div class="card mb-4">
//       <div class="card-body">
//         <div class="d-flex gap-3 justify-content-between">
//           <div class="d-flex flex-row align-items-center">
//             <div>
//               <img
//                 src="https://m.media-amazon.com/images/I/61U6oC65TTL._AC_SX466_.jpg"
//                 class="img-fluid rounded-3"
//                 alt="Shopping item"
//                 style="width: 110px"
//               />
//             </div>
//             <div class="ms-3">
//               <h5>Samsung Galaxy S22 Ultra Dual SIM</h5>
//               <p class="small mb-0">512GB, Phantom Black</p>
//             </div>
//           </div>
//           <div class="d-flex flex-row align-items-center justify-content-between gap-2">
//             <div class="d-flex gap-1">
//               <a class="text-decoration-none btn-dark rounded-start" href="#" style="width: 22px; text-align: center">-</a>
      
//               <input class="input-group border border-none" style="width: 30px" value = ${carttextFour.value} />
      
//               <a class="text-decoration-none btn-dark rounded-end" style="width: 22px; text-align: center" href="#">+</a>
//             </div>
//             <div>
//               <h5 class="fw-normal mb-0">$900</h5>
//             </div>
//             <a href="#!" style="color: #b22727"><i class="fas fa-trash-alt"></i></a>
//           </div>
//         </div>
//       </div>
//       </div>`;
//     localStorage.setItem("cart4", cartData);
//   });
// }
// if (addToCartFive) {
//   addToCartFive.addEventListener("click", function () {
//     let cartData = ` <div class="card mb-4">
//       <div class="card-body">
//         <div class="d-flex gap-3 justify-content-between">
//           <div class="d-flex flex-row align-items-center">
//             <div>
//               <img
//                 src="https://m.media-amazon.com/images/I/61U6oC65TTL._AC_SX466_.jpg"
//                 class="img-fluid rounded-3"
//                 alt="Shopping item"
//                 style="width: 110px"
//               />
//             </div>
//             <div class="ms-3">
//               <h5>Samsung Galaxy S22 Ultra Dual SIM</h5>
//               <p class="small mb-0">512GB, Phantom Black</p>
//             </div>
//           </div>
//           <div class="d-flex flex-row align-items-center justify-content-between gap-2">
//             <div class="d-flex gap-1">
//               <a class="text-decoration-none btn-dark rounded-start" href="#" style="width: 22px; text-align: center">-</a>
      
//               <input class="input-group border border-none" style="width: 30px" value = ${carttextFive.value} />
      
//               <a class="text-decoration-none btn-dark rounded-end" style="width: 22px; text-align: center" href="#">+</a>
//             </div>
//             <div>
//               <h5 class="fw-normal mb-0">$900</h5>
//             </div>
//             <a href="#!" style="color: #b22727"><i class="fas fa-trash-alt"></i></a>
//           </div>
//         </div>
//       </div>
//       </div>`;
//     localStorage.setItem("cart5", cartData);
//   });
// }
// if (addToCartSix) {
//   addToCartSix.addEventListener("click", function () {
//     let cartData = ` <div class="card mb-4">
//       <div class="card-body">
//         <div class="d-flex gap-3 justify-content-between">
//           <div class="d-flex flex-row align-items-center">
//             <div>
//               <img
//                 src="https://m.media-amazon.com/images/I/61U6oC65TTL._AC_SX466_.jpg"
//                 class="img-fluid rounded-3"
//                 alt="Shopping item"
//                 style="width: 110px"
//               />
//             </div>
//             <div class="ms-3">
//               <h5>Samsung Galaxy S22 Ultra Dual SIM</h5>
//               <p class="small mb-0">512GB, Phantom Black</p>
//             </div>
//           </div>
//           <div class="d-flex flex-row align-items-center justify-content-between gap-2">
//             <div class="d-flex gap-1">
//               <a class="text-decoration-none btn-dark rounded-start" href="#" style="width: 22px; text-align: center">-</a>
      
//               <input class="input-group border border-none" style="width: 30px" value = ${carttextSix.value} />
      
//               <a class="text-decoration-none btn-dark rounded-end" style="width: 22px; text-align: center" href="#">+</a>
//             </div>
//             <div>
//               <h5 class="fw-normal mb-0">$900</h5>
//             </div>
//             <a href="#!" style="color: #b22727"><i class="fas fa-trash-alt"></i></a>
//           </div>
//         </div>
//       </div>
//       </div>`;
//     localStorage.setItem("cart6", cartData);
//   });
// }

//
// window.onload = function () {
//
// };

//==================================================End Cart Page===========================================
