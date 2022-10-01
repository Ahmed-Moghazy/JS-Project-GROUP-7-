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
      }, 7000);
    }
  }
};
// modal add cart
let confirmBtn = document.getElementsByClassName("confirm-btn");
let addCart = document.querySelectorAll(".addCart");
let conBtn = document.querySelectorAll(".con-btn");
let counterTxt = document.querySelectorAll(".numTxt");
let addBtn = document.querySelectorAll(".addBtn");
let deleteBtn = document.querySelectorAll(".delBtn");
let alertTxt = document.querySelector(".message-added");
let alertTxtD = document.querySelector(".message-deleted");
let logAlert = document.querySelector("#staticBackdrop");
let loginCheck = localStorage.getItem("UserInfo");
let loginCheckArray = JSON.parse(loginCheck);
function logCheck() {
  for (let i = 0; i < loginCheckArray.length; i++) {
    if (loginCheckArray[i].login == true) {
      return true;
    }
  }
  return false;
}

if (confirmBtn) {
  for (let i = 0; i < confirmBtn.length; i++) {
    confirmBtn[i].addEventListener("click", function (e) {
      let lcheck = logCheck();
      if (lcheck) {
        e.target.style.display = "none";
        addCart[i].style.display = "flex";
        conBtn[i].style.display = "flex";
        counterTxt[i].value = 1;
      } else {
        confirmBtn[i].setAttribute("data-bs-target", "#staticBackdrop");
        confirmBtn[i].setAttribute("data-bs-toggle", "modal");
      }
    });
  }
}
if (addBtn) {
  for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener("click", function () {
      counterTxt[i].value++;
      alertTxt.style.display = "block";
      alertTxt.innerHTML = `You have ${counterTxt[i].value} items in your cart.`;
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
      alertTxtD.innerHTML = `You removed one item from your cart.`;
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
let emailError = document.querySelector(".signup-error");
let confPassError = document.querySelector(".pass-error");
let signupError = document.querySelector(".info-error");
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
        if (
          signupArray.some((v) => {
            return v.email == email.value;
          })
        ) {
          signupError.style.display = "none";
          confPassError.style.display = "none";
          emailError.style.display = "block";
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
        signupError.style.display = "none";
        emailError.style.display = "none";
        confPassError.style.display = "block";
      }
    } else {
      confPassError.style.display = "none";
      emailError.style.display = "none";
      signupError.style.display = "block";
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
let loginError = document.querySelector(".login-error");
let dataError = document.querySelector(".data-error");
if (loginSubmit) {
  loginSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    if (loginEmail.value !== "" && loginPassword.value !== "") {
      let result = checkUserDataInLS();
      if (result == true) {
        window.location.assign("../index.html");
      } else {
        dataError.style.display = "none";
        loginError.style.display = "block";
      }
    } else {
      loginError.style.display = "none";
      dataError.style.display = "block";
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
  let cartPage = document.querySelector(".cartdata");
  let cartDataLS = window.localStorage.getItem("cart");
  let cartDataArr = JSON.parse(cartDataLS);
  let productLS = window.localStorage.getItem("product");
  let productLSData = JSON.parse(productLS);
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
  if (cartPage) {
    if (cartDataArr) {
      for (let i = 0; i < cartDataArr.length; i++) {
        console.log(cartDataArr[i].price);
        let cartData = ` <div class="card mb-4 product-container">
      <div class="card-body">
      <div class="d-flex gap-3 justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <div>
                  <img
                    src="${cartDataArr[i].imageSrc}"
                    class="img-fluid rounded-3"
                    alt="Shopping item"
                    style="width: 110px"
                  />
                </div>
                <div class="ms-3">
                  <h5 class="product-name">${cartDataArr[i].header}</h5>
                  <p class="small mb-0">${cartDataArr[i].information}</p>
                </div>
              </div>
              <div class="d-flex flex-row align-items-center justify-content-between gap-2">
                <div class="d-flex gap-1">
                  <a class="minusBtn text-decoration-none btn-dark rounded-start" style="width: 22px; text-align: center; cursor:pointer">-</a>

                  <input class="product-count quantity input-group border border-none cont" style="width: 30px; text-align:center" value = "${
                    cartDataArr[i].count
                  }" />

                  <a class="plusBtn text-decoration-none btn-dark rounded-end add-cart" style="width: 22px; text-align: center;cursor:pointer" >+</a>
                </div>
                <div>
                <h5 class="product-price priceTxt fw-normal mb-0">$${Number(cartDataArr[i].price * cartDataArr[i].count)}</h5>
                </div>
                <a href="#!" class="trashBin" style="color: #b22727"><i class="fas fa-trash-alt"></i></a>
              </div>
            </div>
          </div>
          </div>`;
        cartPage.insertAdjacentHTML("beforeend", cartData);
      }
    }
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
        window.location.assign("../pages/login.html");
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
  let trashBtns = document.getElementsByClassName("trashBin");
  let itemsNum = document.getElementById("itemsNum");
  let shippingfee = document.getElementById("shippingFee");
  let subtotal = document.getElementById("subtotal");
  let checkoutDelet = document.querySelector(".checkout-btn");
  let subTotal = 0;

  //Mapping number of items on load to "You have # items in your cart"
  if (itemsNum) {
    itemsNum.innerText = trashBtns.length;
  }
  // <-----------------------Functions----------------------->
  // function to disable checkout button
  if (checkoutDelet) {
    if (trashBtns.length == 0) {
      checkoutDelet.setAttribute("disabled", "");
    }
  }
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
      const priceofOne = splitPrice(price[i].innerText).amount;
      subTotal += priceofOne;
      subtotal.innerText = `$${subTotal}`;
    }
  }
  getInitialSubTotal();
  // Removing item when clicking on trashbin (delete)
  for (let i = 0; i < trashBtns.length; i++) {
    if (trashBtns[i]) {
      trashBtns[i].addEventListener("click", function (event) {
        event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        // deletCartFromLocalStorage(cartDataArr[i].id);
        deletCartFromLocalStorage(cartDataArr[i].id);
        // Updating subtotal when an item is removed
        let button = event.currentTarget;
        let removedPrice = splitPrice(button.previousElementSibling.innerText).amount;
        subTotal -= removedPrice;
        subtotal.innerText = `$${subTotal}`;
        // getTotalOfPurchase();
        //Updating title of "You have # items in your cart"
        itemsNum.innerText = trashBtns.length;
        if (itemsNum.innerText == "0") {
          checkoutDelet.setAttribute("disabled", "");
        }
        // window.location.reload();
      });
    }
  }
  // Updating item price based on quantity input change (on change)
  for (let i = 0; i < quantity.length; i++) {
    // const priceofOne = splitPrice(price[i].innerText).amount;
    const priceofOne = splitPrice(cartDataArr[i].price).amount;
    if (quantity[i]) {
      quantity[i].addEventListener("change", function () {
        if (quantity[i].value <= 10) {
          let itemsPrice = Number(`${quantity[i].value * priceofOne}`);
          console.log(itemsPrice);
          price[i].innerText = `$${itemsPrice}`;
          subTotal = 0;
          getInitialSubTotal();
          // getTotalOfPurchase();
        }
      });
    }
  }
  // Updating item price based on quantity input change (using plus button)
  let count;
  for (let i = 0; i < plusBtns.length; i++) {
    // const priceofOne = splitPrice(price[i].innerText).amount;
    const priceofOne = splitPrice(cartDataArr[i].price).amount;
    if (plusBtns[i]) {
      plusBtns[i].addEventListener("click", function (event) {
        if (quantity[i].value < 10) {
          count = quantity[i].value++;
          let itemsPrice = Number(`${quantity[i].value * priceofOne}`);
          price[i].innerText = `$${itemsPrice}`;
          subTotal += Number(priceofOne);
          subtotal.innerText = `$${subTotal}`;
          // getTotalOfPurchase();
        }
      });
    }
  }
  // Updating item price based on quantity input change (using minus button)
  for (let i = 0; i < minusBtns.length; i++) {
    // const priceofOne = splitPrice(price[i].innerText).amount;
    const priceofOne = splitPrice(cartDataArr[i].price).amount;
    if (minusBtns[i]) {
      minusBtns[i].addEventListener("click", function () {
        if (quantity[i].value > 1) {
          quantity[i].value--;
          let itemsPrice = Number(`${quantity[i].value * priceofOne}`);
          price[i].innerText = `$${itemsPrice}`;
          subTotal -= Number(priceofOne);
          subtotal.innerText = `$${subTotal}`;
          // getTotalOfPurchase();
        }
      });
    }
  }
  // Retrieving shipping fee

  // let totalPrice1 = subTotal + shippingFee;
  // let totalPrice1 = subTotal;
  // console.log(totalPrice1);
  // Calculating total price of purchases
  // function getTotalOfPurchase() {

  // }
  // getTotalOfPurchase();

  // checkout page code by moghazy
  let productName = document.querySelectorAll(".product-name");
  let productPrice = document.querySelectorAll(".product-price");
  // let totalPrice = document.querySelector(".total-price");
  let productCount = document.querySelectorAll(".product-count");
  let checkoutBtn = document.querySelector(".checkout-btn");
  let productContainer = document.querySelectorAll(".product-container");
  let holderName = document.querySelector(".holder-name");
  let holderNameError = document.querySelector(".holder-error");
  let cardNumber = document.querySelector(".card-number");
  let cardNumberError = document.querySelector(".card-number-error");
  let cardExp = document.querySelector(".card-exp");
  let cardExpError = document.querySelector(".card-exp-error");
  let cardCvv = document.querySelector(".cart-cvv");
  let cardCvvError = document.querySelector(".cvv-error");
  let productArray = [];
  if (localStorage.getItem("product")) {
    productArray = JSON.parse(localStorage.getItem("product"));
  }
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function (e) {
      let message = [];
      // holderName
      if (holderName.value == "" || holderName.value == null) {
        message.push("Holder name is required");
        holderNameError.style.display = "block";
      } else {
        holderNameError.style.display = "none";
        holderName.style.border = "2px solid #5cb85c";
      }

      // Card Number
      if (cardNumber.value == "" || cardNumber.value == null) {
        message.push("Card-Number is required");
        cardNumberError.style.display = "block";
      } else {
        cardNumberError.style.display = "none";
        cardNumber.style.border = "2px solid #5cb85c";
      }

      // expiration
      if (cardExp.value == "" || cardExp.value == null) {
        message.push("Expiration date is required");
        cardExpError.style.display = "block";
      } else {
        cardExpError.style.display = "none";
        cardExp.style.border = "2px solid #5cb85c";
      }

      // cvv
      if (cardCvv.value == "" || cardCvv.value == null) {
        message.push("cvv is required");
        cardCvvError.style.display = "block";
      } else {
        cardCvvError.style.display = "none";
        cardCvv.style.border = "2px solid #5cb85c";
      }

      if (message.length > 0) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        for (let i = 0; i < productContainer.length; i++) {
          let name = productName[i].innerHTML;
          let price = productPrice[i].innerHTML;
          let count = productCount[i].value;
          addProductToArray(name, price, count);
          addProductToLS(productArray);

          // window.localStorage.removeItem("cart");
        }
      }
    });
  }
  function addProductToArray(name, price, count) {
    let productObject = {
      name: name,
      productprice: price,
      count: count,
    };
    productArray.push(productObject);
  }
  function addProductToLS(array) {
    window.localStorage.setItem("product", JSON.stringify(array));
  }
  // sending products added top cart into checkout page by moghazy
  let productInfo = document.querySelector(".prdouct-info");
  if (productInfo) {
    if (productLSData) {
      for (let i = 0; i < productLSData.length; i++) {
        let productBody = `<tr>
     <th scope="row">${i + 1}</th>
     <td>${productLSData[i].name}</td>
     <td>${cartDataArr[i].price}</td>
     <td>${productLSData[i].count}</td>
     <td>${productLSData[i].productprice}</td>
     </tr>`;
        productInfo.insertAdjacentHTML("beforeend", productBody);
      }
    }
  }
  let total = document.getElementById("total");
  if (shippingfee) {
    shippingfee.innerText = "$" + splitPrice(shippingfee.innerText).amount;
    let totalPrice = 0;
    for (let i = 0; i < productLSData.length; i++) {
      totalPrice += splitPrice(productLSData[i].productprice).amount;
      console.log(totalPrice);
    }
    total.innerText = `$${totalPrice + splitPrice(shippingfee.innerText).amount}`;
  }
};
//==================================================End Log In Page===========================================
//==================================================Start Cart Page===========================================
let cartHeader = document.querySelectorAll(".cart-title");
let cartInfo = document.querySelectorAll(".cart-info");
let cartImg = document.querySelectorAll(".cart-img");
let cartPrice = document.querySelectorAll(".cart-price");
let cartCount = document.querySelectorAll(".numTxt");
let cartArr = [];
if (localStorage.getItem("cart")) {
  cartArr = JSON.parse(localStorage.getItem("cart"));
}
if (conBtn) {
  for (let i = 0; i < conBtn.length; i++) {
    conBtn[i].addEventListener("click", function () {
      let price = cartPrice[i].innerHTML;
      let head = cartHeader[i].innerHTML;
      let info = cartInfo[i].innerHTML;
      let image = cartImg[i].src;
      let itemCount = cartCount[i].value;
      console.log(price);
      addCartToArray(price, head, info, image, itemCount);
      addCartToLocalStorage(cartArr);
    });
  }
}
function addCartToArray(price, head, info, image, itemCount) {
  let cartObject = {
    id: Date.now(),
    price: price,
    header: head,
    information: info,
    imageSrc: image,
    count: itemCount,
  };
  cartArr.push(cartObject);
}
function addCartToLocalStorage(array) {
  window.localStorage.setItem("cart", JSON.stringify(array));
}
function deletCartFromLocalStorage(cartId) {
  cartArr = cartArr.filter((cart) => cart.id != cartId);
  addCartToLocalStorage(cartArr);
}
//==================================================End Cart Page===========================================
let cartBack = document.getElementsByClassName("cart");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const country = document.getElementById("country");
const city = document.getElementById("city");
const zip = document.getElementById("zip");
const check = document.getElementById("check");
const form = document.getElementById("sellingForm");
const fnameErr = document.getElementById("fnameErr");
const lnameErr = document.getElementById("lnameErr");
const phoneErr = document.getElementById("phoneErr");
const addressErr = document.getElementById("addressErr");
const countryErr = document.getElementById("countryErr");
const cityErr = document.getElementById("cityErr");
const zipErr = document.getElementById("zipErr");
const checkErr = document.getElementById("checkErr");
const submitcheck = document.getElementById("submit");
let checkedSuccess = document.querySelector(".cheked-success");
let tableBody = document.querySelector(".table-conent");
if (submitcheck) {
  submitcheck.addEventListener("click", (e) => {
    let message = [];
    if (fname.value == "" || fname.value == null) {
      message.push("First name is required");
      fnameErr.innerText = "First name is required.";
      fname.style.border = "2px solid #df4759";
    } else {
      fnameErr.innerText = "";
      fname.style.border = "2px solid #5cb85c";
    }

    if (lname.value == "" || lname.value == null) {
      message.push("Last name is required");
      lnameErr.innerText = "Last name is required.";
      lname.style.border = "2px solid #df4759";
    } else {
      lnameErr.innerText = "";
      lname.style.border = "2px solid #5cb85c";
    }

    if (phone.value.length != 11) {
      message.push("Enter a valid phone number");
      phoneErr.innerText = "Must enter 11 digit Phone number.";
      phone.style.border = "2px solid #df4759";
    } else {
      phoneErr.innerText = "";
      phone.style.border = "2px solid #5cb85c";
    }

    if (address.value == "" || address.value == null) {
      message.push("Address is required");
      addressErr.innerText = "Address is required.";
      address.style.border = "2px solid #df4759";
    } else {
      addressErr.innerText = "";
      address.style.border = "2px solid #5cb85c";
    }

    if (city.value == "" || city.value == null) {
      message.push("City is required");
      cityErr.innerText = "City is required.";
      city.style.border = "2px solid #df4759";
    } else {
      cityErr.innerText = "";
      city.style.border = "2px solid #5cb85c";
    }

    if (country.value == "" || country.value == null) {
      message.push("Country is required");
      countryErr.innerText = "Country is required.";
      country.style.border = "2px solid #df4759";
    } else {
      countryErr.innerText = "";
      country.style.border = "2px solid #5cb85c";
    }

    if (zip.value == "" || zip.value == null) {
      message.push("Zip code is required");
      zipErr.innerText = "Zip code is required.";
      zip.style.border = "2px solid #df4759";
    } else {
      zipErr.innerText = "";
      zip.style.border = "2px solid #5cb85c";
    }

    if (check.checked == false) {
      message.push("You must agree before submitting.");
      checkErr.innerText = "You must agree before submitting.";
      check.style.border = "2px solid #df4759";
    } else {
      checkErr.innerText = "";
      check.style.border = "2px solid #5cb85c";
    }

    if (message.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      // error.innerText = message.join(', ')
    } else {
      window.localStorage.removeItem("product");
      window.localStorage.removeItem("cart");
      // window.location.reload();
      tableBody.style.display = "none";
      checkedSuccess.style.display = "block";
    }
  });
}
if (cartBack) {
  for (let i = 0; i < cartBack.length; i++) {
    cartBack[i].addEventListener("click", function () {
      window.localStorage.removeItem("product");
    });
  }
} //==================================================Start credit-card Page===========================================

//==================================================end credit-card Page===========================================
