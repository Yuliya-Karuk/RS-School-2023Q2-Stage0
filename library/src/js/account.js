import {newModal} from './modal.js';
import {newAuthMenu} from './auth.js';
import {newCard} from './card.js';
import {newProfile} from './profile.js';
import {newUtils} from './utils.js';
export {newAccount};

const AccountClasses = {
    inactiveBuyButton: "books__button_inactive",
}

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
        const cardNumber = newUtils.generateCardNumber();
        const data = {
            userName: newUtils.capitalizeFirstChar(this.registerName.value),
            userSurname: newUtils.capitalizeFirstChar(this.registerSurname.value),
            userEmail: this.registerEmail.value,
            userPassword: this.registerPassword.value,
            userCardNumber: cardNumber,
            isAuthorized: true,
            isRegistered: true,
            rentedBooks: [],
            visits: 1,
            bonuses: 0,
            boughtCard: false,
        }
        return data;
    }

    registerUser() {
        const value = this.setUser();
        localStorage.setItem(`${localStorage.length}`, JSON.stringify(value));
    }

    findAuthorized() {
        for (let i = 0; i < localStorage.length; i++) {
            let user = JSON.parse(localStorage.getItem(String(i)));
            if (user.isAuthorized) {
                this.authorizedUser = JSON.parse(localStorage.getItem(String(i)));
                this.userKey = i;
            }
        }
    }

    changePage() {
        location.reload();
    }

    fillPage() {
        this.findAuthorized();
        newAuthMenu.fillAuthMenu(this.authorizedUser);
        newCard.changeCardSection(this.authorizedUser);
        newProfile.fillProfileInfo(this.authorizedUser);
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
        this.changePage();
    }

    checkUserIsRegistered(inputEmail) {
        let isRegistered = false;
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                let user = JSON.parse(localStorage.getItem(String(i)));
                if (inputEmail.value === user.userEmail || inputEmail.value === user.userCardNumber) {
                    isRegistered = true;
                }
            }
        }
        return isRegistered;
    }

    loginUser() {
        for (let i = 0; i < localStorage.length; i++) {
            let user = JSON.parse(localStorage.getItem(String(i)));
            if ((this.loginLogin.value === user.userEmail || this.loginLogin.value === user.userCardNumber) && this.loginPassword.value === user.userPassword) {
                user.isAuthorized = true;
                user.visits += 1;
                localStorage.setItem(`${i}`, JSON.stringify(user));
            }
        }
    }

    fillBooksInfo(authorizedUser) {
        if (authorizedUser !== undefined) {
            for (let i = 0; i < this.buttonsBuy.length; i++) {
                if(authorizedUser.rentedBooks.includes(this.buttonsBuy[i].id)) {
                    newProfile.addRentedBook(this.buttonsBuy[i].id);
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
        newProfile.addRentedBook(element.id);
        newProfile.changeProfileInfo(this.authorizedUser);
        newCard.fillCardInfoBlock(this.authorizedUser);
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
                    if(context.authorizedUser.boughtCard === true) {
                        const element = this.buttonsBuy[i];
                        context.buyBook(element);
                    } else {
                        newModal.showModal(newModal.modalCard);
                    }
                } else {
                    newModal.showModal(newModal.modalLogin);
                }
            });
        }

        document.addEventListener("DOMContentLoaded", () => context.fillPage());
    }
}

const newAccount = new Account();