export {Auth};

const AuthClasses = {
    authMenu: "menu-auth_active",
    showModal: "modal_active",
}

class Auth {
    constructor() {
        this.loginButton = document.querySelector(".header__login");
        this.authMenu = document.querySelector(".menu-auth");
        this.authLinkLogin = document.querySelector(".menu-auth__link_login");
        this.authLinkRegister = document.querySelector(".menu-auth__link_register");
        this.cardLinkLogin = document.querySelector(".get-card__button_log");
        this.cardLinkRegister = document.querySelector(".get-card__button_sign");
        this.modalLogin = document.querySelector(".modal_login");
        this.modalRegister = document.querySelector(".modal_register");
        this.closeButtons = document.querySelectorAll(".modal__close-btn")

        this.bindListeners();
    }

    toggleAuthMenu() {
        this.authMenu.classList.toggle(AuthClasses.authMenu);
    }

    showLogin() {
        this.modalLogin.classList.add(AuthClasses.showModal);
    }

    showRegister() {
        this.modalRegister.classList.add(AuthClasses.showModal);
    }

    closeLogin() {
        this.modalLogin.classList.remove(AuthClasses.showModal);
    }

    closeRegister() {
        this.modalRegister.classList.remove(AuthClasses.showModal);
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
        });

        document.addEventListener("click", function(e) {
            if (context.modalRegister.classList.contains(AuthClasses.showModal) && e.target.classList.contains("modal_register")) context.closeRegister();
        });

        for (let i = 0; i < this.closeButtons.length; i++) {
            this.closeButtons[i].addEventListener("click", () => {
                context.closeRegister();
                context.closeLogin();
            });
        }
    }

}