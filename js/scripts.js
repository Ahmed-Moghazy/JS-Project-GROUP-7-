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
//==================================================Start Home Page===========================================
// stop nav
let nav = document.querySelector(".header-nav");
let scrol;
document.onscroll = function () {
  if (nav) {
    if (nav.style.top == "0") {
      nav.style.display = "block";
    } else {
      nav.style.display = "block";
      clearTimeout(scrol);
      scrol = setTimeout(function () {
        nav.style.display = "none";
      }, 2000);
    }
  }
};
// modal add cart
let confirmBtn = document.getElementsByClassName("confirm-btn");
let addCart = document.querySelectorAll(".addCart");
let conBtn = document.querySelectorAll(".con-btn");
let counterTxt = document.querySelectorAll(".numTxt");
// console.log(addCart.length);
if (confirmBtn) {
  for (let i = 0; i < confirmBtn.length; i++) {
    confirmBtn[i].addEventListener("click", function (e) {
      e.target.style.display = "none";
      addCart[i].style.display = "flex";
      conBtn[i].style.display = "flex";
      counterTxt[i].value = 1;
    });
  }
}

let addBtn = document.querySelectorAll(".addBtn");
let deleteBtn = document.querySelectorAll(".delBtn");

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

  //
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
  if (localD) {
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
  }
  // Get Cart From Local To Cart Page
  let cartPage = document.querySelector(".cartdata");

  let cartDataLS = window.localStorage.getItem("cart");
  let cartDataArr = JSON.parse(cartDataLS);
  if (cartPage) {
    for (let i = 0; i < cartDataArr.length; i++) {
      cartPage.insertAdjacentHTML("beforeend", cartDataArr[i].content);
    }
    //////
  }

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
  //==================================================Erini: Cart Page Price calculations=====================

  // Declaring elements
  // let cartCard = document.getElementsByClassName("cartCard");
  let plusBtns = document.getElementsByClassName("plusBtn");
  let minusBtns = document.getElementsByClassName("minusBtn");
  let quantity = document.getElementsByClassName("quantity");
  let price = document.getElementsByClassName("priceTxt");
  // for (let i = 0; i < price.length; i++) {
  //   console.log(Number(price[i].innerHTML));
  // }
  let trashBtns = document.getElementsByClassName("trashBin");
  let itemsNum = document.getElementById("itemsNum");
  let shippingfee = document.getElementById("shippingFee");
  let total = document.getElementsByClassName("total");
  let subtotal = document.getElementById("subtotal");
  let container = document.querySelectorAll(".cartCard");
  let cartPrice = document.getElementsByClassName("cart-price");
  let subTotal = 0;

  //Mapping number of items on load to "You have # items in your cart"

  if (itemsNum) {
    itemsNum.innerText = trashBtns.length;
  }

  // <-----------------------Functions----------------------->

  // Function to split currency and amount of product price
  let splitPrice = function (string) {
    let amount = string.match(/[0-9]+([,.][0-9]+)?/);
    let unit = string.replace(/[0-9]+([,.][0-9]+)?/, "");
    if (amount && unit) {
      return {
        amount: +amount[0].replace(",", "."),
        currency: unit,
      };
    }
    return {
      amount: +amount[0].replace(",", "."),
    };
  };

  // Function to retrieve initial subtotal price of cart items
  function getInitialSubTotal() {
    for (let i = 0; i < trashBtns.length; i++) {
      let priceofOne;
      if (priceofOne) {
        priceofOne = splitPrice(cartPrice[i].innerText).amount;
      }
      subTotal += priceofOne;
      subtotal.innerText = `$${subTotal}`;
    }
  }

  getInitialSubTotal();

  // Removing item when clicking on trashbin (delete)
  for (let i = 0; i < trashBtns.length; i++) {
    if (trashBtns[i]) {
      trashBtns[i].addEventListener("click", function (event) {
        deleteCartFromLS(cartDataArr[i].id);
        // console.log(cartCard);
        // console.log(quantity.length);
        // event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        container[i].remove();
        // cartCard[i].remove();
        // console.log(cartCard);
        // console.log(quantity.length);
        // Updating subtotal when an item is removed
        let button = event.currentTarget;
        let removedPrice = splitPrice(button.previousElementSibling.innerText).amount;
        subTotal -= removedPrice;
        subtotal.innerText = `$${subTotal}`;
        getTotalOfPurchase();
        //Updating title of "You have # items in your cart"
        itemsNum.innerText = trashBtns.length;
        window.location.reload();
      });
    }
  }
  // Updating item price based on quantity input change (on change)
  for (let i = 0; i < quantity.length; i++) {
    let priceofOne;
    if (priceofOne) {
      priceofOne = splitPrice(cartPrice[i].innerText).amount;
    }
    if (quantity[i]) {
      quantity[i].addEventListener("change", function () {
        if (quantity[i].value <= 10) {
          let itemsPrice = Number(`${quantity[i].value * priceofOne}`);
          console.log(itemsPrice);
          price[i].innerText = `$${itemsPrice}`;
          subTotal = 0;
          getInitialSubTotal();
          getTotalOfPurchase();
        }
      });
    }
  }

  // Updating item price based on quantity input change (using plus button)

  for (let i = 0; i < plusBtns.length; i++) {
    let priceofOne;
    if (priceofOne) {
      priceofOne = splitPrice(cartPrice[i].innerText).amount;
      console.log(typeof priceofOne);
    }

    if (plusBtns[i]) {
      plusBtns[i].addEventListener("click", function (event) {
        if (quantity[i].value < 10) {
          quantity[i].value++;
          let itemsPrice = Number(`${quantity[i].value * priceofOne}`);
          price[i].innerText = `$${itemsPrice}`;
          subTotal += Number(priceofOne);
          subtotal.innerText = `$${subTotal}`;
          getTotalOfPurchase();
        }
      });
    }
  }

  // Updating item price based on quantity input change (using minus button)
  for (let i = 0; i < minusBtns.length; i++) {
    let priceofOne;
    if (cartPrice[i]) {
      priceofOne = splitPrice(cartPrice[i].innerText).amount;
    }
    console.log(typeof priceofOne);
    if (minusBtns[i]) {
      minusBtns[i].addEventListener("click", function () {
        if (quantity[i].value > 1) {
          quantity[i].value--;
          let itemsPrice = Number(`${quantity[i].value * priceofOne}`);
          price[i].innerText = `$${itemsPrice}`;
          subTotal -= Number(priceofOne);
          subtotal.innerText = `$${subTotal}`;
          getTotalOfPurchase();
        }
      });
    }
  }

  // Retrieving shipping fee

  let shippingFee = splitPrice(shippingfee.innerText).amount;
  shippingfee.innerText = `$${shippingFee}`;

  // Calculating total price of purchases

  function getTotalOfPurchase() {
    for (let i = 0; i < total.length; i++) {
      let totalPrice = `${subTotal + shippingFee}`;
      total[i].innerText = `$${totalPrice}`;
    }
  }

  getTotalOfPurchase();
};
//==================================================End Log In Page===========================================
//==================================================Start Cart Page===========================================
//   let addToCart = document.querySelectorAll(".add-to-cart");
let cartHeader = document.querySelectorAll(".cart-title");
let cartInfo = document.querySelectorAll(".cart-info");
let cartImg = document.querySelectorAll(".cart-img");
let cartPrice = document.querySelectorAll(".cart-price");

let counterArr = [];
if (localStorage.getItem("cart")) {
  counterArr = JSON.parse(localStorage.getItem("cart"));
}
if (conBtn) {
  for (let i = 0; i < conBtn.length; i++) {
    conBtn[i].addEventListener("click", function () {
      let cartData = ` <div class="card mb-4 cartCard">
        <div class="card-body">
        <div class="d-flex gap-3 justify-content-between">
                <div class="d-flex flex-row align-items-center">
                  <div>
                    <img
                      src="${cartImg[i].src}"
                      class="img-fluid rounded-3"
                      alt="Shopping item"
                      style="width: 110px"
                    />
                  </div>
                  <div class="ms-3">
                    <h5>${cartHeader[i].innerHTML}</h5>
                    <p class="small mb-0">${cartInfo[i].innerHTML}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-between gap-2">
                  <div class="d-flex gap-1">
                    <a class="minusBtn text-decoration-none btn-dark rounded-start"  style="width: 22px; text-align: center; cursor: pointer">-</a>
            
                    <input class=" quantity input-group border border-none cont" style="width: 30px" value = "${counterTxt[i].value}" />
            
                    <a class="plusBtn text-decoration-none btn-dark rounded-end add-cart" style="width: 22px; text-align: center; cursor: pointer" >+</a>
                  </div>
                  <div>
                    <h5 class=" priceTxt fw-normal mb-0">${cartPrice[i].innerHTML}</h5>
                  </div>
                  <a href="#!" class="trashBin" style="color: #b22727"><i class="fas fa-trash-alt"></i></a>
                </div>
              </div>
            </div>
            </div>`;
      addCartToPage(cartData);

      addCartToLocalStorage(counterArr);
    });
  }
}
function addCartToPage(cart) {
  const cartObject = {
    id: Date.now(),
    content: cart,
  };
  counterArr.push(cartObject);
}
function addCartToLocalStorage(array) {
  window.localStorage.setItem("cart", JSON.stringify(array));
}
function deleteCartFromLS(cartId) {
  // for (let i = 0; i < counterArr.length; i++) {
  //   console.log(`${counterArr[i].id} === ${cartId}`)
  // }
  counterArr = counterArr.filter((cart) => cart.id != cartId);
  addCartToLocalStorage(counterArr);
}
//==================================================End Cart Page===========================================
