/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/account.js":
/*!***************************!*\
  !*** ./src/js/account.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newAccount: () => (/* binding */ newAccount)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./src/js/modal.js");
/* harmony import */ var _auth_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.js */ "./src/js/auth.js");
/* harmony import */ var _card_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./card.js */ "./src/js/card.js");
/* harmony import */ var _profile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile.js */ "./src/js/profile.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");






const AccountClasses = {
  inactiveBuyButton: "books__button_inactive"
};
class Account {
  constructor() {
    this.registerName = document.querySelector("#register-first-name");
    this.registerSurname = document.querySelector("#register-last-name");
    this.registerEmail = document.querySelector("#register-email");
    this.registerPassword = document.querySelector("#register-password");
    this.loginLogin = document.querySelector("#login-login");
    this.loginPassword = document.querySelector("#login-password");
    this.userKey;
    this.AuthorizedUser;
    this.authLinkLogout;
    this.buttonsBuy = document.querySelectorAll(".books__button");
    this.bindListeners();
  }
  setUser() {
    const cardNumber = _utils_js__WEBPACK_IMPORTED_MODULE_4__.newUtils.generateCardNumber();
    const data = {
      userName: _utils_js__WEBPACK_IMPORTED_MODULE_4__.newUtils.capitalizeFirstChar(this.registerName.value),
      userSurname: _utils_js__WEBPACK_IMPORTED_MODULE_4__.newUtils.capitalizeFirstChar(this.registerSurname.value),
      userEmail: this.registerEmail.value,
      userPassword: this.registerPassword.value,
      userCardNumber: cardNumber,
      isAuthorized: true,
      isRegistered: true,
      rentedBooks: [],
      visits: 1,
      bonuses: 0,
      boughtCard: false
    };
    return data;
  }
  registerUser() {
    const value = this.setUser();
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(value));
  }
  findAuthorized() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.getItem(String(i)) !== null) {
        let user = JSON.parse(localStorage.getItem(String(i)));
        if (user.isAuthorized) {
          this.authorizedUser = JSON.parse(localStorage.getItem(String(i)));
          this.userKey = i;
        }
      }
    }
  }
  fillPage() {
    this.findAuthorized();
    _auth_js__WEBPACK_IMPORTED_MODULE_1__.newAuthMenu.fillAuthMenu(this.authorizedUser);
    _card_js__WEBPACK_IMPORTED_MODULE_2__.newCard.changeCardSection(this.authorizedUser);
    _profile_js__WEBPACK_IMPORTED_MODULE_3__.newProfile.fillProfileInfo(this.authorizedUser);
    this.fillBooksInfo(this.authorizedUser);
  }
  bindListenersNewAuth() {
    const context = this;
    this.authLinkLogout = document.querySelector(".menu-auth__link_logout");
    this.authLinkLogout.addEventListener("click", () => context.logout());
  }
  logout() {
    this.authorizedUser.isAuthorized = false;
    localStorage.setItem(`${this.userKey}`, JSON.stringify(this.authorizedUser));
    this.authorizedUser = undefined;
    this.userKey = undefined;
    location.reload();
  }
  checkUserIsRegistered(inputEmail) {
    let isRegistered = false;
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(String(i)) !== null) {
          let user = JSON.parse(localStorage.getItem(String(i)));
          if (inputEmail.value === user.userEmail || inputEmail.value === user.userCardNumber) {
            isRegistered = true;
          }
        }
      }
    }
    return isRegistered;
  }
  loginUser() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.getItem(String(i)) !== null) {
        let user = JSON.parse(localStorage.getItem(String(i)));
        if ((this.loginLogin.value === user.userEmail || this.loginLogin.value === user.userCardNumber) && this.loginPassword.value === user.userPassword) {
          user.isAuthorized = true;
          user.visits += 1;
          localStorage.setItem(`${i}`, JSON.stringify(user));
        }
      }
    }
  }
  fillBooksInfo(authorizedUser) {
    if (authorizedUser !== undefined) {
      for (let i = 0; i < this.buttonsBuy.length; i++) {
        if (authorizedUser.rentedBooks.includes(this.buttonsBuy[i].id)) {
          _profile_js__WEBPACK_IMPORTED_MODULE_3__.newProfile.addRentedBook(this.buttonsBuy[i].id);
          this.changeButtonBook(this.buttonsBuy[i]);
        }
      }
    }
  }
  changeButtonBook(element) {
    element.classList.add(AccountClasses.inactiveBuyButton);
    element.innerHTML = `Own`;
    element.setAttribute("disabled", "disabled");
    element.blur();
  }
  buyBook(element) {
    this.changeButtonBook(element);
    this.changeUserData(element.id);
    _profile_js__WEBPACK_IMPORTED_MODULE_3__.newProfile.addRentedBook(element.id);
    _profile_js__WEBPACK_IMPORTED_MODULE_3__.newProfile.changeProfileInfo(this.authorizedUser);
    _card_js__WEBPACK_IMPORTED_MODULE_2__.newCard.fillCardInfoBlock(this.authorizedUser);
  }
  changeUserData(bookId) {
    this.authorizedUser.rentedBooks.push(bookId);
    this.authorizedUser.bonuses = `${this.authorizedUser.rentedBooks.length * 2}`;
    localStorage.setItem(`${this.userKey}`, JSON.stringify(this.authorizedUser));
  }
  buyLibraryCard() {
    this.authorizedUser.boughtCard = true;
    localStorage.setItem(`${this.userKey}`, JSON.stringify(this.authorizedUser));
  }
  bindListeners() {
    const context = this;
    for (let i = 0; i < this.buttonsBuy.length; i++) {
      this.buttonsBuy[i].addEventListener("click", () => {
        if (context.authorizedUser !== undefined) {
          if (context.authorizedUser.boughtCard === true) {
            const element = this.buttonsBuy[i];
            context.buyBook(element);
          } else {
            _modal_js__WEBPACK_IMPORTED_MODULE_0__.newModal.showModal(_modal_js__WEBPACK_IMPORTED_MODULE_0__.newModal.modalCard);
          }
        } else {
          _modal_js__WEBPACK_IMPORTED_MODULE_0__.newModal.showModal(_modal_js__WEBPACK_IMPORTED_MODULE_0__.newModal.modalLogin);
        }
      });
    }
    document.addEventListener("DOMContentLoaded", () => context.fillPage());
  }
}
const newAccount = new Account();

/***/ }),

/***/ "./src/js/auth.js":
/*!************************!*\
  !*** ./src/js/auth.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthMenu: () => (/* binding */ AuthMenu),
/* harmony export */   newAuthMenu: () => (/* binding */ newAuthMenu)
/* harmony export */ });
/* harmony import */ var _account_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account.js */ "./src/js/account.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./src/js/modal.js");



const AuthMenuClasses = {
  authMenu: "menu-auth_active",
  loginIconActive: "header__login_active"
};
class AuthMenu {
  constructor() {
    this.loginButton = document.querySelector(".header__login");
    this.authMenu = document.querySelector(".menu-auth");
    this.loginIcon = document.querySelector(".header__icon");
    this.bindListeners();
  }
  toggleAuthMenu() {
    this.authMenu.classList.toggle(AuthMenuClasses.authMenu);
  }
  fillAuthMenu(authorizedUser) {
    if (authorizedUser !== undefined) {
      this.loginButton.classList.add(AuthMenuClasses.loginIconActive);
      this.loginButton.title = `${authorizedUser.userName} ${authorizedUser.userSurname}`;
      this.loginIcon.innerHTML = `${authorizedUser.userName[0]}${authorizedUser.userSurname[0]}`;
      this.authMenu.innerHTML = `<h5 class="menu-auth__title menu-auth__title_active">${authorizedUser.userCardNumber}</h5>
                <button class="link menu-auth__link menu-auth__link_profile" href="#">My profile</button>
                <button class="link menu-auth__link menu-auth__link_logout" href="#">Log Out</button>`;
      _account_js__WEBPACK_IMPORTED_MODULE_0__.newAccount.bindListenersNewAuth();
      _modal_js__WEBPACK_IMPORTED_MODULE_1__.newModal.bindListenersNewAuth();
    }
  }
  bindListeners() {
    const context = this;
    this.loginButton.addEventListener("click", () => context.toggleAuthMenu());
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 27 && context.authMenu.classList.contains(AuthMenuClasses.authMenu)) {
        context.toggleAuthMenu();
      }
    });
    document.addEventListener("click", function (e) {
      if (!e.target.classList.contains("menu-auth") && !e.target.classList.contains("menu-auth__title") && context.authMenu.classList.contains(AuthMenuClasses.authMenu) && !context.loginButton.contains(e.target)) context.toggleAuthMenu();
    });
  }
}
const newAuthMenu = new AuthMenu();

/***/ }),

/***/ "./src/js/burger.js":
/*!**************************!*\
  !*** ./src/js/burger.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Burger: () => (/* binding */ Burger),
/* harmony export */   BurgerClasses: () => (/* binding */ BurgerClasses)
/* harmony export */ });

const BurgerClasses = {
  burgerMenu: "navigation_active",
  burgerButton: "burger_active",
  body: "no-scroll"
};
class Burger {
  constructor() {
    this.burgerButton = document.querySelector(".burger"); // кнопка бургер меню
    this.burgerMenu = document.querySelector(".navigation"); // меню навигации
    this.menuLinks = document.querySelectorAll(".navigation__link"); // ссылки в меню
    this.body = document.querySelector("body");
    this.bindListeners();
  }
  toggleBurgerMenu() {
    this.burgerMenu.classList.add("navigation_start");
    this.burgerMenu.classList.toggle(BurgerClasses.burgerMenu);
    this.burgerButton.classList.toggle(BurgerClasses.burgerButton);
    this.body.classList.toggle(BurgerClasses.body);
  }
  bindListeners() {
    const context = this;

    /* показать/скрыть бургер меню при клике мышкой на кнопку */
    this.burgerButton.addEventListener("click", () => context.toggleBurgerMenu());

    /* закрыть окно при нажатии на эск*/
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 27 && context.burgerMenu.classList.contains(BurgerClasses.burgerMenu)) {
        context.toggleBurgerMenu();
      }
    });

    /* закрыть бургер-меню при нажатии на вне меню */
    document.addEventListener("click", function (e) {
      if (!e.target.classList.contains("navigation") && context.burgerMenu.classList.contains(BurgerClasses.burgerMenu) && !context.burgerButton.contains(e.target)) context.toggleBurgerMenu();
    });

    /* закрыть бургер-меню при нажатии на ссылку */
    for (let i = 0; i < this.menuLinks.length; i++) {
      this.menuLinks[i].addEventListener("click", () => context.toggleBurgerMenu());
    }
  }
}

/***/ }),

/***/ "./src/js/card.js":
/*!************************!*\
  !*** ./src/js/card.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newCard: () => (/* binding */ newCard)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/utils.js");


const CardClasses = {
  buttonCardCheckInactive: "book-card__button_inactive",
  cardInfoBlockActive: "card-info_active",
  getCardButtonProfile: "get-card__button_profile_active"
};
class Card {
  constructor() {
    this.inputReaderName = document.querySelector("#reader-name");
    this.inputCardNumber = document.querySelector("#card-number");
    this.buttonCardCheck = document.querySelector(".book-card__button");
    this.findCardTitle = document.querySelector(".find-card__title");
    this.getCardTitle = document.querySelector(".get-card__title");
    this.getCardText = document.querySelector(".get-card__text");
    this.getCardButtons = document.querySelector(".get-card__buttons");
    this.getCardButtonProfile = document.querySelector(".get-card__button_profile");
    this.cardInfoBlock = document.querySelector(".card-info");
    this.cardInfoVisits = document.querySelector(".card-info__number_visits");
    this.cardInfoBonuses = document.querySelector(".card-info__number_bonuses");
    this.cardInfoBooks = document.querySelector(".card-info__number_books");
    this.bindListeners();
  }
  checkCard(e) {
    e.stopPropagation();
    e.preventDefault();
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.getItem(String(i)) !== null) {
        let user = JSON.parse(localStorage.getItem(String(i)));
        if ((_utils_js__WEBPACK_IMPORTED_MODULE_0__.newUtils.capitalizeFirstChar(this.inputReaderName.value) === `${user.userName} ${user.userSurname}` || _utils_js__WEBPACK_IMPORTED_MODULE_0__.newUtils.capitalizeFirstChar(this.inputReaderName.value) === `${user.userName}`) && this.inputCardNumber.value === user.userCardNumber) {
          this.showCardInfo(user);
          setTimeout(() => this.hideCardInfo(), 10000);
        }
      }
    }
  }
  showCardInfo(user) {
    this.buttonCardCheck.classList.add(CardClasses.buttonCardCheckInactive);
    this.fillCardInfoBlock(user);
    this.cardInfoBlock.classList.add(CardClasses.cardInfoBlockActive);
  }
  fillCardInfoBlock(user) {
    this.cardInfoVisits.innerHTML = `${user.visits}`;
    this.cardInfoBonuses.innerHTML = `${user.bonuses}`;
    this.cardInfoBooks.innerHTML = `${user.rentedBooks.length}`;
  }
  hideCardInfo() {
    this.buttonCardCheck.classList.remove(CardClasses.buttonCardCheckInactive);
    this.cardInfoBlock.classList.remove(CardClasses.cardInfoBlockActive);
    this.inputReaderName.value = "";
    this.inputCardNumber.value = "";
  }
  changeCardSection(authorizedUser) {
    if (authorizedUser !== undefined) {
      this.findCardTitle.innerHTML = `Your Library card`;
      this.inputReaderName.setAttribute("disabled", "disabled");
      this.inputReaderName.placeholder = `${authorizedUser.userName} ${authorizedUser.userSurname}`;
      this.inputCardNumber.setAttribute("disabled", "disabled");
      this.inputCardNumber.placeholder = `${authorizedUser.userCardNumber}`;
      this.buttonCardCheck.style = `display: none`;
      this.cardInfoBlock.classList.add(CardClasses.cardInfoBlockActive);
      this.fillCardInfoBlock(authorizedUser);
      this.getCardTitle.innerHTML = `Visit your profile`;
      this.getCardText.innerHTML = `With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.`;
      this.getCardButtons.style = `display: none`;
      this.getCardButtonProfile.classList.add(CardClasses.getCardButtonProfile);
    }
  }
  bindListeners() {
    const context = this;
    this.buttonCardCheck.addEventListener("click", event => context.checkCard(event));
  }
}
const newCard = new Card();

/***/ }),

/***/ "./src/js/fade.js":
/*!************************!*\
  !*** ./src/js/fade.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fade: () => (/* binding */ Fade),
/* harmony export */   FadeClasses: () => (/* binding */ FadeClasses)
/* harmony export */ });

const FadeClasses = {
  ANIMATE_FADE: "animate-fade",
  ACTIVE_CLASS: "books_active",
  NO_DISPLAY: "visually-hidden"
};
class Fade {
  constructor() {
    this.fadeTabs = document.querySelectorAll(".filter__label");
    this.fadeLists = document.querySelectorAll(".books");
    this.prevList = document.querySelector(".books_active");
    this.bindListeners();
  }
  handlerAnimation(prevEl, currentEl, callback) {
    const context = this;
    prevEl.classList.add(FadeClasses.ANIMATE_FADE);
    prevEl.addEventListener("animationend", () => {
      for (let i = 0; i < context.fadeLists.length; i++) {
        context.fadeLists[i].classList.remove(FadeClasses.ANIMATE_FADE);
        context.fadeLists[i].classList.add(FadeClasses.NO_DISPLAY);
        context.fadeLists[i].classList.remove(FadeClasses.ACTIVE_CLASS);
      }
      currentEl.classList.toggle(FadeClasses.ACTIVE_CLASS);
      currentEl.classList.toggle(FadeClasses.NO_DISPLAY);
      callback(currentEl, context);
    });
  }
  changePrev(currentEl, context) {
    context.prevList = currentEl;
  }
  bindListeners() {
    const context = this;
    for (let i = 0; i < this.fadeTabs.length; i++) {
      this.fadeTabs[i].addEventListener("click", () => {
        context.currentList = this.fadeLists[i];
        context.handlerAnimation(this.prevList, this.currentList, this.changePrev);
      });
    }
  }
}

/***/ }),

/***/ "./src/js/form.js":
/*!************************!*\
  !*** ./src/js/form.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Form: () => (/* binding */ Form)
/* harmony export */ });
/* harmony import */ var _account_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./account.js */ "./src/js/account.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./src/js/modal.js");



const FormClasses = {
  activeInput: "modal__input_active",
  showModalError: "modal__error_active"
};
class Form {
  constructor() {
    this.registerInputs = document.querySelectorAll(".modal__form_register .modal__input");
    this.registerInputEmail = document.querySelector("#register-email");
    this.registerErrors = document.querySelectorAll(".modal__form_register .modal__error");
    this.registerForm = document.querySelector(".modal__form_register");
    this.registerUserRegisteredError = document.querySelector(".modal__form_register .modal__error_registered");
    this.loginInputs = document.querySelectorAll(".modal__form_login .modal__input");
    this.loginInputEmail = document.querySelector("#login-login");
    this.loginErrors = document.querySelectorAll(".modal__form_login .modal__error");
    this.loginForm = document.querySelector(".modal__form_login");
    this.loginUserRegisteredError = document.querySelector(".modal__form_login .modal__error_registered");
    this.cardInputs = document.querySelectorAll(".modal__form_card .modal__input");
    this.cardErrors = document.querySelectorAll(".modal__form_card .modal__error");
    this.cardNumber = document.querySelector("#bank-card-number");
    this.cardForm = document.querySelector(".modal__form_card");
    this.cardSubmitButton = document.querySelector(".modal__form_card .modal__button");
    this.bindListeners();
  }
  bindListeners() {
    const context = this;
    for (let i = 0; i < this.registerInputs.length; i++) {
      this.registerInputs[i].addEventListener("blur", () => {
        context.checkValidityInput(context.registerInputs[i], context.registerErrors[i]);
      });
    }
    ;
    this.registerForm.addEventListener("submit", e => {
      e.stopPropagation();
      e.preventDefault();
      if (context.checkValidityForm(this.registerInputs, this.registerErrors)) {
        if (_account_js__WEBPACK_IMPORTED_MODULE_0__.newAccount.checkUserIsRegistered(context.registerInputEmail) === false) {
          _account_js__WEBPACK_IMPORTED_MODULE_0__.newAccount.registerUser();
          _modal_js__WEBPACK_IMPORTED_MODULE_1__.newModal.closeModal(_modal_js__WEBPACK_IMPORTED_MODULE_1__.newModal.modalRegister);
          _account_js__WEBPACK_IMPORTED_MODULE_0__.newAccount.fillPage();
        } else {
          this.registerUserRegisteredError.classList.add(FormClasses.showModalError);
        }
      }
    });
    for (let i = 0; i < this.loginInputs.length; i++) {
      this.loginInputs[i].addEventListener("blur", () => {
        context.checkValidityInput(context.loginInputs[i], context.loginErrors[i]);
      });
    }
    ;
    this.loginForm.addEventListener("submit", e => {
      e.stopPropagation();
      e.preventDefault();
      if (context.checkValidityForm(this.loginInputs, context.loginErrors)) {
        if (_account_js__WEBPACK_IMPORTED_MODULE_0__.newAccount.checkUserIsRegistered(context.loginInputEmail)) {
          _account_js__WEBPACK_IMPORTED_MODULE_0__.newAccount.loginUser();
          _modal_js__WEBPACK_IMPORTED_MODULE_1__.newModal.closeModal(_modal_js__WEBPACK_IMPORTED_MODULE_1__.newModal.modalLogin);
          _account_js__WEBPACK_IMPORTED_MODULE_0__.newAccount.fillPage();
        } else {
          this.loginUserRegisteredError.classList.add(FormClasses.showModalError);
        }
      }
    });
    for (let i = 0; i < this.cardInputs.length; i++) {
      this.cardInputs[i].addEventListener("blur", () => {
        context.checkValidityInput(context.cardInputs[i], context.cardErrors[i]);
        if (i === this.cardInputs.length - 1) {
          context.checkValidityCardForm(context.cardInputs, context.cardErrors);
        }
      });
    }
    this.cardNumber.addEventListener('input', e => context.listenCardNumber(e));
    this.cardForm.addEventListener("submit", e => {
      e.preventDefault();
      _modal_js__WEBPACK_IMPORTED_MODULE_1__.newModal.closeModal(_modal_js__WEBPACK_IMPORTED_MODULE_1__.newModal.modalCard);
      _account_js__WEBPACK_IMPORTED_MODULE_0__.newAccount.buyLibraryCard();
    });
  }
  checkValidityInput(input, error) {
    input.classList.add(FormClasses.activeInput);
    let check = true;
    if (!input.checkValidity()) {
      check = false;
    } else {
      if (input.id === "bank-card-number") {
        check = this.checkInputCardNumber(check, input);
      }
      if (input.id === "register-email") {
        check = this.checkInputEmail(check, input);
      }
    }
    this.checkError(check, error);
    return check;
  }
  checkError(check, error) {
    if (check === true) {
      error.classList.remove(FormClasses.showModalError);
    } else {
      error.classList.add(FormClasses.showModalError);
    }
  }
  checkInputEmail(check, input) {
    const pattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$/;
    if (!input.value.match(pattern)) {
      check = false;
    }
    return check;
  }
  checkInputCardNumber(check, input) {
    const patternFirst = /([\d]{4}[\s]{1}){3}[\d]{4}/g;
    const patternSecond = /([\d]{16})/g;
    if (!input.value.match(patternFirst) && !input.value.match(patternSecond)) {
      check = false;
    }
    return check;
  }
  listenCardNumber(e) {
    const cardInputNumber = e.target;
    const digitValue = cardInputNumber.value.replace(/\D/g, '');
    const formattedValue = digitValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    cardInputNumber.value = formattedValue;
  }
  checkValidityForm(inputs, errors) {
    let check = true;
    for (let i = 0; i < inputs.length; i++) {
      if (!this.checkValidityInput(inputs[i], errors[i])) {
        check = false;
      }
    }
    return check;
  }
  checkValidityCardForm(inputs, errors) {
    let check = this.checkValidityForm(inputs, errors);
    if (check) {
      this.cardSubmitButton.removeAttribute("disabled");
    }
  }
  registerUser() {
    const value = _account_js__WEBPACK_IMPORTED_MODULE_0__.newAccount.setUser();
    localStorage.setItem(`${localStorage.length}`, JSON.stringify(value));
  }
}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selfAssessment3: () => (/* binding */ selfAssessment3)
/* harmony export */ });

const selfAssessment = "Library#1 - Фиксированная вёрстка (100/100)\n 1. Вёрстка валидная (10/10)\n 2. Вёрстка семантическая (16/16)\n - <header>, <main>, <footer> +2\n - шесть элементов <section> +2\n - только один заголовок <h1> +2\n - пять заголовков <h2> +2\n - один элемент <nav> +2\n - два списка ul > li > a (панель навигации, ссылки на соцсети в футере) +2\n - семь кнопок <button> +2\n - два инпута <input> +2\n 3. Вёрстка соответствует макету (54/54)\n Блок <header> +8\n - расстояние между элементами меню было одинаковое, 30px\n - элементы меню работают как якоря\n - элементы меню интерактивные\n - расстояние от самого меню до иконки пользователя - 40px. Иконка является отдльным элементом, и не входит в <nav>\n - текст 'Brooklyn Public Library' находится в <h1>\n Секция Welcome +4\n Секция About +6\n - расстояния между кнопками пагинации 10px\n - интерактивная область размером +5px в каждую сторону\n Секция Favorites +8\n - интерактивные кнопки дожны иметь структуру input type='radio' + label\n - интерактивная область вокруг кнопки и надписи +5px в каждую сторону\n - картинки и описания добавить на страницу, и скрыть с помощью CSS свойств\n - кнопки 'buy' должны быть интерактивными, плавно менять свой цвет при наведении на них, как указано в макете styleguides\n - кнопка 'own' не должна быть интерактивной, не должна нажиматься. И на ней должен присутствовать атрибут disabled\n Секция CoffeShop +6\n Секция Contacts +6\n - цифры в виде телефонного номера сделаны ссылками с типом 'tel' и номером\n - текст с именем контактного лица оформлен ссылкой с типом 'mailto' и адресом почты\n Секция LibraryCard +8\n - 'Find your Library card' - это форма с полями input\n - все 3 кнопки должны быть интерактивными, плавно менять свой цвет при наведении на них, как указано в макете styleguides\n Блок <footer> +8\n - адрес библиотеки оформлен ссылкой\n - иконки соцсетей также ссылки\n - вместо Username должно быть ваше имя, как оно пишется на английском языке и ссылка на GitHub\n 4. Общие требования к верстке (20/20)\n - для построения сетки используются флексы или гриды +2\n - при уменьшении масштаба страницы браузера вся вёрстка (контент и фоны) размещается по центру, а не сдвигается в сторону +2\n - иконки добавлены в формате .svg +2\n - изображения добавлены в формате .jpg (.jpeg) или .png +2\n - есть favicon. Иконка должна содержать 3 буквы 'BPL' +2\n - плавная прокрутка по якорям +2\n - в футере название ссылки Username заменено и ведет на GitHub студента +2\n - в футере ссылка The Rolling Scopes School ведет на страницу курса https://rs.school/js-stage0/ +2.\n - интерактивность элементов согласно макету.Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +2\n - плавное изменение внешнего вида элемента при наведении и клике не влияет на соседние элементы +2";
const selfAssessment2 = "Library#2 - Адаптивная вёрстка (50/50)\n1. Вёрстка соответствует макету на ширине экрана 768 (26/26)\n - блок <header> +2\n - секция Welcome +2\n - секция About, есть стрелки и 5 точек на странице +4\n - секция Favorites +2\n - сделана кнопка Own для последней книги +2\n - секция CoffeShop +4\n - секция Contacts +4\n секция LibraryCard +4\n - блок <footer> +2\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется (12/12)\n - нет полосы прокрутки при ширине страницы от 1440рх до 640рх +4\n - элементы не выходят за пределы окна браузера при ширине страницы от 1440рх до 640рх +4\n - элементы не наезжают друг на друга при ширине страницы от 1440рх до 640рх +4\n3. На ширине экрана 768рх реализовано адаптивное меню (12/12)\n - иконка юзера не прыгает +2\n - при нажатии на бургер-иконку плавно появляется адаптивное меню +4\n - при нажатии на крестик, или на область вне меню, адаптивное меню плавно скрывается, уезжая за экран +2\n - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям при нажатии, а само адаптивное меню при этом плавно скрывается +2\n - размеры открытого бургер-меню соответствуют макету и PixelPerfect +2";
const selfAssessment3 = "Library#3 - (204/204)\nЭтап 1: Пользователь не зарегистрирован - (50/50)\n 1. Ограниченная карусель в блоке About +25\n 2. Слайдер в блоке Favorites +23\n 3. Нажатие на кнопку Check the card ни к чему не приведёт.\n 4. Иконка юзера в хедере отображается в виде силуэта.\n 5. В блоке Favorites все кнопки должны иметь имя Buy, а не Own. +2\n\nЭтап 2: Пользователь на этапе регистрации - (49/49) \n 1. Меню авторизации при нажатии на иконку пользователя +8\n 2. Модальное окно REGISTER +29\n 3. Окончание регистрации +8\n 4. При наличии регистрации, но будучи не авторизованным - изменение блока Digital Library Cards +4\n\nЭтап 3: Пользователь на этапе входа в учётную запись после регистрации - (29/29)\n 1. Модальное окно LOGIN +27\n 2. Блок Favorites. Если пользователь ещё не вошёл в учётную запись, то при нажатии на любую кнопку Buy открывается модальное окно LOGIN. +2\n\nЭтап 4: Пользователь после входа в учётную запись - (76/76)\n 1. Меню профиля при нажатии на иконку с инициалами пользователя +16\n 2. Модальное окно MY PROFILE +25\n 3. Блок Favorites +6\n 4. Модальное окно BUY A LIBRARY CARD +27\n 5. Блок Digital Library Cards. При наличии авторизации вместо кнопки Check the Card будут отображаться данные пользователя и бейджи, как на дизайне LibraryCard after login in account. +2";

/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newModal: () => (/* binding */ newModal)
/* harmony export */ });

const ModalClasses = {
  authMenu: "menu-auth_active",
  showModal: "modal_active",
  loginIconActive: "header__login_active"
};
class Modal {
  constructor() {
    this.authLinkLogin = document.querySelector(".menu-auth__link_login");
    this.authLinkRegister = document.querySelector(".menu-auth__link_register");
    this.cardLinkLogin = document.querySelector(".get-card__button_log");
    this.cardLinkRegister = document.querySelector(".get-card__button_sign");
    this.modalLogin = document.querySelector(".modal_login");
    this.modalRegister = document.querySelector(".modal_register");
    this.linkLoginFromRegister = document.querySelector(".modal_register .modal__link");
    this.linkRegisterFromLogin = document.querySelector(".modal_login .modal__link");
    this.authLinkProfile;
    this.cardButtonProfile = document.querySelector(".get-card__button_profile");
    this.modalProfile = document.querySelector(".modal_profile");
    this.modalCard = document.querySelector(".modal_card");
    this.closeButtons = document.querySelectorAll(".modal__close-btn");
    this.bindListeners();
  }
  showModal(modal) {
    modal.classList.add(ModalClasses.showModal);
  }
  closeModal(modal) {
    modal.classList.remove(ModalClasses.showModal);
  }
  bindListeners() {
    const context = this;
    this.authLinkLogin.addEventListener("click", () => context.showModal(context.modalLogin));
    this.authLinkRegister.addEventListener("click", () => context.showModal(context.modalRegister));
    this.linkLoginFromRegister.addEventListener("click", () => {
      context.closeModal(context.modalRegister);
      context.showModal(context.modalLogin);
    });
    this.linkRegisterFromLogin.addEventListener("click", () => {
      context.closeModal(context.modalLogin);
      context.showModal(context.modalRegister);
    });
    this.cardLinkLogin.addEventListener("click", () => context.showModal(context.modalLogin));
    this.cardLinkRegister.addEventListener("click", () => context.showModal(context.modalRegister));
    this.cardButtonProfile.addEventListener("click", () => context.showModal(context.modalProfile));
    document.addEventListener("click", function (e) {
      if (context.modalLogin.classList.contains(ModalClasses.showModal) && e.target.classList.contains("modal_login")) context.closeModal(context.modalLogin);
      if (context.modalRegister.classList.contains(ModalClasses.showModal) && e.target.classList.contains("modal_register")) context.closeModal(context.modalRegister);
      if (context.modalProfile.classList.contains(ModalClasses.showModal) && e.target.classList.contains("modal_profile")) context.closeModal(context.modalProfile);
      if (context.modalCard.classList.contains(ModalClasses.showModal) && e.target.classList.contains("modal_card")) context.closeModal(context.modalCard);
    });
    for (let i = 0; i < this.closeButtons.length; i++) {
      this.closeButtons[i].addEventListener("click", () => {
        context.closeModal(context.modalRegister);
        context.closeModal(context.modalLogin);
        context.closeModal(context.modalProfile);
        context.closeModal(context.modalCard);
      });
    }
  }
  bindListenersNewAuth() {
    const context = this;
    this.authLinkProfile = document.querySelector(".menu-auth__link_profile");
    this.authLinkProfile.addEventListener("click", () => context.showModal(context.modalProfile));
  }
}
const newModal = new Modal();

/***/ }),

/***/ "./src/js/profile.js":
/*!***************************!*\
  !*** ./src/js/profile.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newProfile: () => (/* binding */ newProfile)
/* harmony export */ });
/* harmony import */ var _data_books_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/books.json */ "./src/data/books.json");


class Profile {
  constructor() {
    this.profileNameShort = document.querySelector(".profile__name_short");
    this.profileNameLong = document.querySelector(".profile__name_long");
    this.profileInfoVisits = document.querySelector(".profile-info__number_visits");
    this.profileInfoBonuses = document.querySelector(".profile-info__number_bonuses");
    this.profileInfoBooks = document.querySelector(".profile-info__number_books");
    this.profileBooksList = document.querySelector(".profile-books__list");
    this.profileCardNumber = document.querySelector(".profile-card__number");
    this.profileButtonCopy = document.querySelector(".profile-card__copy");
    this.bindListeners();
  }
  fillProfileInfo(authorizedUser) {
    if (authorizedUser !== undefined) {
      this.profileNameLong.innerHTML = `${authorizedUser.userName} ${authorizedUser.userSurname}`;
      this.profileNameShort.innerHTML = `${authorizedUser.userName[0]}${authorizedUser.userSurname[0]}`;
      this.profileInfoVisits.innerHTML = `${authorizedUser.visits}`;
      this.profileInfoBonuses.innerHTML = `${authorizedUser.bonuses}`;
      this.profileInfoBooks.innerHTML = `${authorizedUser.rentedBooks.length}`;
      this.profileCardNumber.innerHTML = `${authorizedUser.userCardNumber}`;
    }
  }
  changeProfileInfo(authorizedUser) {
    this.profileInfoBonuses.innerHTML = `${authorizedUser.bonuses}`;
    this.profileInfoBooks.innerHTML = `${authorizedUser.rentedBooks.length}`;
  }
  addRentedBook(bookId) {
    const book = _data_books_json__WEBPACK_IMPORTED_MODULE_0__[bookId];
    const bookElement = document.createElement("li");
    bookElement.classList.add("modal__text");
    bookElement.classList.add("profile-books__item");
    bookElement.innerHTML = `${book.books__title}, ${book.books__author}`;
    this.profileBooksList.append(bookElement);
  }
  async copyLibraryCardNumber(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Error in copying text: ', err);
    }
  }
  bindListeners() {
    const context = this;
    this.profileButtonCopy.addEventListener("click", () => context.copyLibraryCardNumber(this.profileCardNumber.innerHTML));
  }
}
const newProfile = new Profile();

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slider: () => (/* binding */ Slider)
/* harmony export */ });

class Slider {
  constructor() {
    this.sliderButtonLeft = document.querySelector(".slider__btn_left");
    this.sliderButtonRight = document.querySelector(".slider__btn_right");
    this.slider = document.querySelector(".slider__images");
    this.paginationBtns = document.querySelectorAll(".pgn__button");
    this.paginationBtnActive = document.querySelector(".pgn__button_active");
    this.bindListeners();
    this.sliderItems = 4;
    this.currentSlide = 0;
    this.offset;
  }
  generateConst() {
    if (window.innerWidth <= 768) {
      this.offset = 100;
    }
    ;
    if (window.innerWidth <= 1024 && window.innerWidth > 768) {
      this.offset = 50;
    }
    ;
    if (window.innerWidth > 1024) {
      this.offset = 34;
    }
    ;
  }
  fillPagination() {
    for (let i = 0; i < this.paginationBtns.length; i++) {
      this.paginationBtns[i].removeAttribute("disabled");
    }
    this.paginationBtns[this.currentSlide].setAttribute("disabled", "disabled");
  }
  move() {
    if (this.currentSlide > 0 || this.currentSlide < 4) {
      this.sliderButtonLeft.removeAttribute("disabled");
      this.sliderButtonRight.removeAttribute("disabled");
    }
    if (this.currentSlide === 4) {
      this.sliderButtonRight.setAttribute("disabled", "disabled");
    }
    if (this.currentSlide === 0) {
      this.sliderButtonLeft.setAttribute("disabled", "disabled");
    }
    this.slider.style.transform = `translateX(-${this.currentSlide * this.offset}%)`;
  }
  restartSlider() {
    this.generateConst();
    this.currentSlide = 0;
    this.fillPagination();
    this.move();
  }
  bindListeners() {
    const context = this;
    document.addEventListener("DOMContentLoaded", () => context.generateConst());
    window.addEventListener('resize', () => context.restartSlider());
    for (let i = 0; i < this.paginationBtns.length; i++) {
      this.paginationBtns[i].addEventListener("click", function (e) {
        context.currentSlide = i;
        context.move();
        context.fillPagination();
      });
    }
    ;
    this.sliderButtonRight.addEventListener("click", function () {
      context.currentSlide += 1;
      context.move();
      context.fillPagination();
    });
    this.sliderButtonLeft.addEventListener("click", function () {
      context.currentSlide -= 1;
      context.move();
      context.fillPagination();
    });
  }
}

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newUtils: () => (/* binding */ newUtils)
/* harmony export */ });

class Utils {
  generateCardNumber() {
    const number = Math.floor(Math.random() * (68719476736 - 4294967296) + 4294967296);
    const hexNumber = number.toString(16).toUpperCase();
    return hexNumber;
  }
  capitalizeFirstChar(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
  }
}
const newUtils = new Utils();

/***/ }),

/***/ "./src/data/books.json":
/*!*****************************!*\
  !*** ./src/data/books.json ***!
  \*****************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"id":0,"books__title":"The Book Eaters","books__author":"Sunyi Dean","books__short":"An unusual sci-fi story about a book eater woman who tries desperately to save her dangerous mind-eater son from tradition and certain death. Complete with dysfunctional family values, light Sapphic romance, and a strong, complex protagonist. Not for the faint of heart.","books__img":"src/img/favorites/book_winter_1.jpg"},{"id":1,"books__title":"Cackle","books__author":"Rachel Harrison","books__short":"Are your Halloween movies of choice The Witches of Eastwick and Practical Magic? Look no further than here - where a woman recovering from a breakup moves to a quaint town in upstate New York and befriends a beautiful witch.","books__img":"src/img/favorites/book_winter_2.jpg"},{"id":2,"books__title":"Dante: Poet of the Secular World","books__author":"Erich Auerbach","books__short":"Auerbach\'s engaging book places the \'Comedy\' within the tradition of epic, tragedy, and philosophy in general, arguing for Dante\'s uniqueness as one who raised the individual and his drama of soul into something of divine significance—an inspired introduction to Dante\'s main themes.","books__img":"src/img/favorites/book_winter_3.jpg"},{"id":3,"books__title":"The Last Queen","books__author":"Clive Irving","books__short":"A timely and revelatory new biography of Queen Elizabeth (and her family) exploring how the Windsors have evolved and thrived as the modern world has changed around them.","books__img":"src/img/favorites/book_winter_4.jpg"},{"id":4,"books__title":"The Body","books__author":"Stephen King","books__short":"Powerful novel that takes you back to a nostalgic time, exploring both the beauty and danger and loss of innocence that is youth.","books__img":"src/img/favorites/book_spring_1.jpg"},{"id":5,"books__title":"Carry: A Memoir of Survival on Stolen Land","books__author":"Toni Jenson","books__short":"This memoir about the author\'s relationship with gun violence feels both expansive and intimate, resulting in a lyrical indictment of the way things are.","books__img":"src/img/favorites/book_spring_2.jpg"},{"id":6,"books__title":"Days of Distraction","books__author":"Alexandra Chang","books__short":"A sardonic view of Silicon Valley culture, a meditation on race, and a journal of displacement and belonging, all in one form-defying package of spare prose.","books__img":"src/img/favorites/book_spring_3.jpg"},{"id":7,"books__title":"Dominicana","books__author":"Angie Cruz","books__short":"A fascinating story of a teenage girl who marries a man twice her age with the promise to bring her to America. Her marriage is an opportunity for her family to eventually immigrate. For fans of Isabel Allende and Julia Alvarez.","books__img":"src/img/favorites/book_spring_4.jpg"},{"id":8,"books__title":"Crude: A Memoir","books__author":"Pablo Fajardo & ​​Sophie Tardy-Joubert","books__short":"Drawing and color by Damien Roudeau | This book illustrates the struggles of a group of indigenous Ecuadoreans as they try to sue the ChevronTexaco company for damage their oil fields did to the Amazon and her people","books__img":"src/img/favorites/book_summer_1.jpg"},{"id":9,"books__title":"Let My People Go Surfing","books__author":"Yvon Chouinard","books__short":"Chouinard—climber, businessman, environmentalist—shares tales of courage and persistence from his experience of founding and leading Patagonia, Inc. Full title: Let My People Go Surfing: The Education of a Reluctant Businessman, Including 10 More Years of Business Unusual.","books__img":"src/img/favorites/book_summer_2.jpg"},{"id":10,"books__title":"The Octopus Museum: Poems","books__author":"Brenda Shaughnessy","books__short":"This collection of bold and scathingly beautiful feminist poems imagines what comes after our current age of environmental destruction, racism, sexism, and divisive politics.","books__img":"src/img/favorites/book_summer_3.jpg"},{"id":11,"books__title":"Shark Dialogues: A Novel","books__author":"Kiana Davenport","books__short":"An epic saga of seven generations of one family encompasses the tumultuous history of Hawaii as a Hawaiian woman gathers her four granddaughters together in an erotic tale of villains and dreamers, queens and revolutionaries, lepers and healers.","books__img":"src/img/favorites/book_summer_4.jpg"},{"id":12,"books__title":"Casual Conversation","books__author":"Renia White","books__short":"White\'s impressive debut collection takes readers through and beyond the concepts of conversation and the casual - both what we say to each other and what we don\'t, examining the possibilities around how we construct and communicate identity.","books__img":"src/img/favorites/book_autumn_1.jpg"},{"id":13,"books__title":"The Great Fire","books__author":"Lou Ureneck","books__short":"The harrowing story of an ordinary American and a principled Naval officer who, horrified by the burning of Smyrna, led an extraordinary rescue effort that saved a quarter of a million refugees from the Armenian Genocide","books__img":"src/img/favorites/book_autumn_2.jpg"},{"id":14,"books__title":"Rickey: The Life and Legend","books__author":"Howard Bryant","books__short":"With the fall rolling around, one can\'t help but think of baseball\'s postseason coming up! And what better way to prepare for it than reading the biography of one of the game\'s all-time greatest performers, the Man of Steal, Rickey Henderson?","books__img":"src/img/favorites/book_autumn_3.jpg"},{"id":15,"books__title":"Slug: And Other Stories","books__author":"Megan Milks","books__short":"Exes Tegan and Sara find themselves chained together by hairballs of codependency. A father and child experience the shared trauma of giving birth to gods from their wounds.","books__img":"src/img/favorites/book_autumn_4.jpg"}]');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_burger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/burger.js */ "./src/js/burger.js");
/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/slider.js */ "./src/js/slider.js");
/* harmony import */ var _js_fade_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/fade.js */ "./src/js/fade.js");
/* harmony import */ var _js_form_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/form.js */ "./src/js/form.js");
/* harmony import */ var _js_account_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/account.js */ "./src/js/account.js");
/* harmony import */ var _js_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/index.js */ "./src/js/index.js");






const newBurger = new _js_burger_js__WEBPACK_IMPORTED_MODULE_0__.Burger();
const newSlider = new _js_slider_js__WEBPACK_IMPORTED_MODULE_1__.Slider();
const newFade = new _js_fade_js__WEBPACK_IMPORTED_MODULE_2__.Fade();
const newForm = new _js_form_js__WEBPACK_IMPORTED_MODULE_3__.Form();
console.log(_js_index_js__WEBPACK_IMPORTED_MODULE_5__.selfAssessment3);
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=script.js.map