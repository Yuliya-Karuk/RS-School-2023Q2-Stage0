export {newAuthMenu, AuthMenu};
import {newAccount} from './account.js';
import { newModal } from './modal.js';

const AuthMenuClasses = {
    authMenu: "menu-auth_active",
    loginIconActive: "header__login_active",
}

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
                <button class="link menu-auth__link menu-auth__link_logout" href="#">Log Out</button>`
            newAccount.bindListenersNewAuth();
            newModal.bindListenersNewAuth();
        }
    }

    bindListeners() {
        const context = this;

        this.loginButton.addEventListener("click", () => context.toggleAuthMenu());

        window.addEventListener("keydown", function(e) {
            if (e.keyCode === 27 && context.authMenu.classList.contains(AuthMenuClasses.authMenu)) {
                context.toggleAuthMenu();
            }
        });

        document.addEventListener("click", function(e) {
            if (!e.target.classList.contains("menu-auth") && !e.target.classList.contains("menu-auth__title") && context.authMenu.classList.contains(AuthMenuClasses.authMenu) && !context.loginButton.contains(e.target)) context.toggleAuthMenu();
        });
    }
}

const newAuthMenu = new AuthMenu();