export {newModal};

const ModalClasses = {
    authMenu: "menu-auth_active",
    showModal: "modal_active",
    loginIconActive: "header__login_active",
}

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

    showLogin() {
        this.modalLogin.classList.add(ModalClasses.showModal);
    }

    showRegister() {
        this.modalRegister.classList.add(ModalClasses.showModal);
    }

    showProfile() {
        this.modalProfile.classList.add(ModalClasses.showModal);
    }

    showCard() {
        this.modalCard.classList.add(ModalClasses.showModal);
    }

    closeLogin() {
        this.modalLogin.classList.remove(ModalClasses.showModal);
    }

    closeRegister() {
        this.modalRegister.classList.remove(ModalClasses.showModal);
    }

    closeProfile() {
        this.modalProfile.classList.remove(ModalClasses.showModal);
    }

    closeCard() {
        this.modalCard.classList.remove(ModalClasses.showModal);
    }

    bindListeners() {
        const context = this;

        this.authLinkLogin.addEventListener("click", () => context.showLogin());
        this.authLinkRegister.addEventListener("click", () => context.showRegister());
        this.linkLoginFromRegister.addEventListener("click", () => {
            context.closeRegister();
            context.showLogin();
        });
        this.linkRegisterFromLogin.addEventListener("click", () => {
            context.closeLogin();
            context.showRegister();
        });
        this.cardLinkLogin.addEventListener("click", () => context.showLogin());
        this.cardLinkRegister.addEventListener("click", () => context.showRegister());
        this.cardButtonProfile.addEventListener("click", () => context.showProfile());

        document.addEventListener("click", function(e) {
            if (context.modalLogin.classList.contains(ModalClasses.showModal) && e.target.classList.contains("modal_login")) context.closeLogin();
            if (context.modalRegister.classList.contains(ModalClasses.showModal) && e.target.classList.contains("modal_register")) context.closeRegister();
            if (context.modalProfile.classList.contains(ModalClasses.showModal) && e.target.classList.contains("modal_profile")) context.closeProfile();
            if (context.modalCard.classList.contains(ModalClasses.showModal) && e.target.classList.contains("modal_card")) context.closeProfile();
        });


        for (let i = 0; i < this.closeButtons.length; i++) {
            this.closeButtons[i].addEventListener("click", () => {
                context.closeRegister();
                context.closeLogin();
                context.closeProfile();
                context.closeCard();
            });
        }
    }

    bindListenersNewAuth() {
        const context = this;
        this.authLinkProfile = document.querySelector(".menu-auth__link_profile");
        this.authLinkProfile.addEventListener("click", () => context.showProfile());
    }
}

const newModal = new Modal();