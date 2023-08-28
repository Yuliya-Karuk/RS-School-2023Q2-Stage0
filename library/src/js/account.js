export {Account , newAccount};
import {newModal, Modal} from './modal.js';
import {newForm, Form} from './form.js';
import {newAuthMenu, AuthMenu} from './auth.js';
import {newCard, Card} from './card.js';
import {newProfile, Profile} from './profile.js';

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

    generateCardNumber() {
        const number = Math.floor(Math.random() * (68719476736 - 4294967296) + 4294967296);
        const hexNumber = number.toString(16).toUpperCase();
        return hexNumber;
    }

    setUser() {
        const cardNumber = this.generateCardNumber();
        const data = {
            userName: this.registerName.value,
            userSurname: this.registerSurname.value,
            userEmail: this.registerEmail.value,
            userPassword: this.registerPassword.value,
            userCardNumber: cardNumber,
            isAuthorized: true,
            isRegistered: true,
            rentedBooks: [],
            visits: 1,
            bonuses: `${rentedBooks.length * 2}`,
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
                return this.userKey;
            }
        }
    }

    changePage() {
        location.reload();
    }

    fillPage() {
        const userKey = this.findAuthorized();
        newAuthMenu.fillAuthMenu(userKey);
        newCard.changeCardSection(userKey);
        newProfile.fillProfileInfo(userKey);
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

    buyBook(element) {
        element.classList.add(AccountClasses.inactiveBuyButton);
        element.innerHTML = `Own`;
        element.setAttribute("disabled", "disabled");
        element.blur();
        const parent = element.closest(".books__item");
        this.changeUser(parent.id);
        newProfile.fillRentedBooks(parent.id);

    }

    changeUser(bookId) {
        this.authorizedUser.rentedBooks.push(bookId);
        localStorage.setItem(`${this.userKey}`, JSON.stringify(this.authorizedUser));
    }

    bindListeners() {
        const context = this;
        for (let i = 0; i < this.buttonsBuy.length; i++) {
            this.buttonsBuy[i].addEventListener("click", () => {
                if (context.userKey !== undefined) {
                    const element = this.buttonsBuy[i];
                    context.buyBook(element);
                } else {
                    newModal.showLogin();
                }
            });
        }

        document.addEventListener("DOMContentLoaded", () => context.fillPage());
    }

}

const newAccount = new Account();