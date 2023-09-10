export {newModal};

const ModalClasses = {
    authMenu: "menu-auth_active",
    showModal: "modal_active",
    loginIconActive: "header__login_active",
    bodyNoScroll: "no-scroll",
}

class Modal {
    constructor() {
        this.body =  document.querySelector("body");
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
        this.body.classList.add(ModalClasses.bodyNoScroll);
    }

    closeModal(modal) {
        modal.classList.remove(ModalClasses.showModal);
        this.body.classList.remove(ModalClasses.bodyNoScroll);
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
            context.closeModal(context.modalLogin)
            context.showModal(context.modalRegister);
        });
        this.cardLinkLogin.addEventListener("click", () => context.showModal(context.modalLogin));
        this.cardLinkRegister.addEventListener("click", () => context.showModal(context.modalRegister));
        this.cardButtonProfile.addEventListener("click", () => context.showModal(context.modalProfile));

        document.addEventListener("click", function(e) {
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