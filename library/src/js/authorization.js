import {Account, newAccount} from './account.js';
export {Auth};

const AuthClasses = {
    authMenu: "menu-auth_active",
    showModal: "modal_active",
    loginIconActive: "header__login_active",
}

class Auth {
    constructor() {
        this.loginButton = document.querySelector(".header__login");
        this.authMenu = document.querySelector(".menu-auth");
        this.authLinkLogin = document.querySelector(".menu-auth__link_login");
        this.authLinkRegister = document.querySelector(".menu-auth__link_register");
        this.authLinkProfile;
        this.authLinkLogout;
        this.cardLinkLogin = document.querySelector(".get-card__button_log");
        this.cardLinkRegister = document.querySelector(".get-card__button_sign");
        this.modalLogin = document.querySelector(".modal_login");
        this.modalRegister = document.querySelector(".modal_register");
        this.closeButtons = document.querySelectorAll(".modal__close-btn")

        this.loginIcon = document.querySelector(".header__icon");
        this.modalRegisterName = document.querySelector("#register-first-name");
        this.modalLoginEmail = document.querySelector("#login-email");

        this.modalProfile = document.querySelector(".modal_profile")

        // this.isAuthorized = false;
        this.userKey;
        this.authorizedUser;

        this.bindListeners();
    }

    toggleAuthMenu() {
        this.authMenu.classList.toggle(AuthClasses.authMenu);
    }

    showLogin() {
        this.modalLogin.classList.add(AuthClasses.showModal);
        this.modalLoginEmail.focus();
    }

    showRegister() {
        this.modalRegister.classList.add(AuthClasses.showModal);
        this.modalRegisterName.focus();
    }

    showProfile() {
        this.modalProfile.classList.add(AuthClasses.showModal);
    }

    closeLogin() {
        this.modalLogin.classList.remove(AuthClasses.showModal);
    }

    closeRegister() {
        this.modalRegister.classList.remove(AuthClasses.showModal);
    }

    closeProfile() {
        this.modalProfile.classList.remove(AuthClasses.showModal);
    }

    fillAuthMenu() {
        this.userKey = newAccount.findAuthorized();
        if (this.userKey !== undefined) {
            this.authorizedUser = JSON.parse(localStorage.getItem(String(this.userKey)));
            this.loginButton.classList.add(AuthClasses.loginIconActive);
            this.loginButton.title = `${this.authorizedUser.userName} ${this.authorizedUser.userSurname}`;
            this.loginIcon.innerHTML = `${this.authorizedUser.userName[0]}${this.authorizedUser.userSurname[0]}`;

            this.authMenu.innerHTML = `<h5 class="menu-auth__title">${this.authorizedUser.userCardNumber}</h5>
                <a class="link menu-auth__link menu-auth__link_profile" href="#">My profile</a>
                <a class="link menu-auth__link menu-auth__link_logout" href="#">Log Out</a>`
            this.bindListenersNewAuth();
        }
    }

    changePage() {
        location.reload();
    }

    logout() {
        this.authorizedUser.isAuthorized = false;
        localStorage.setItem(`${this.userKey}`, JSON.stringify(this.authorizedUser));
        this.authorizedUser = undefined;
        this.changePage();
    }

    bindListeners() {
        const context = this;

        this.loginButton.addEventListener("click", () => context.toggleAuthMenu());

        window.addEventListener("keydown", function(e) {
            if (e.keyCode === 27 && context.authMenu.classList.contains(AuthClasses.authMenu)) {
                context.toggleAuthMenu();
            }
        });

        document.addEventListener("click", function(e) {
            if (!e.target.classList.contains("menu-auth") && !e.target.classList.contains("menu-auth__title") && context.authMenu.classList.contains(AuthClasses.authMenu) && !context.loginButton.contains(e.target)) context.toggleAuthMenu();
        });

        this.authLinkLogin.addEventListener("click", () => context.showLogin());
        this.authLinkRegister.addEventListener("click", () => context.showRegister());
        this.cardLinkLogin.addEventListener("click", () => context.showLogin());
        this.cardLinkRegister.addEventListener("click", () => context.showRegister());

        document.addEventListener("click", function(e) {
            if (context.modalLogin.classList.contains(AuthClasses.showModal) && e.target.classList.contains("modal_login")) context.closeLogin();
            if (context.modalRegister.classList.contains(AuthClasses.showModal) && e.target.classList.contains("modal_register")) context.closeRegister();
            if (context.modalProfile.classList.contains(AuthClasses.showModal) && e.target.classList.contains("modal_profile")) context.closeProfile();
        });


        for (let i = 0; i < this.closeButtons.length; i++) {
            this.closeButtons[i].addEventListener("click", () => {
                context.closeRegister();
                context.closeLogin();
                context.closeProfile();
            });
        }

        document.addEventListener("DOMContentLoaded", () => context.fillAuthMenu());
    }

    bindListenersNewAuth() {
        const context = this;
        this.authLinkProfile = document.querySelector(".menu-auth__link_profile");
        this.authLinkLogout = document.querySelector(".menu-auth__link_logout");
        this.authLinkLogout.addEventListener("click", () => context.logout());
        this.authLinkProfile.addEventListener("click", () => context.showProfile());
    }

}