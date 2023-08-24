import {Account, newAccount} from './account.js';
import {Auth} from './authorization.js';
export {Modal};

const newAuth = new Auth();

const ModalClasses = {
    activeForm: "auth__form_active",
    showModalError: "modal__error_active",
}

class Modal {
    constructor() {
        this.registerPassword = document.querySelector("#register-password");
        this.registerInputs = document.querySelectorAll(".auth__form_register .modal__input");
        this.registerErrors = document.querySelectorAll(".auth__form_register .modal__error");
        this.registerForm = document.querySelector(".auth__form_register");

        this.loginPassword = document.querySelector("#login-password");
        this.loginInputs = document.querySelectorAll(".auth__form_login .modal__input");
        this.loginErrors = document.querySelectorAll(".auth__form_login .modal__error");
        this.loginForm = document.querySelector(".auth__form_login");

        this.bindListeners();
    }

    bindListeners() {
        const context = this;

        this.registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            context.registerForm.classList.add(ModalClasses.activeForm)
            if (context.validateRegister()) {
                context.registerUser();
                newAuth.closeRegister();
                newAccount.findAuthorized();
                newAuth.changePage();
            }
        });

        this.loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            context.loginForm.classList.add(ModalClasses.activeForm);
            context.validateLogin();
        });
    }

    validateRegister() {
        return this.validateBlankInputs(this.registerInputs, this.registerErrors) && this.validatePassword(this.registerPassword);
    }

    validateLogin() {
        return this.validateBlankInputs(this.loginInputs, this.loginErrors) && this.validatePassword(this.loginPassword);
    }

    validateBlankInputs(inputs, errors) {
        let check = true;
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].checkValidity()) {
                errors[i].classList.add(ModalClasses.showModalError);
                check = false;
            } else {
                errors[i].classList.remove(ModalClasses.showModalError);
            }
        }
        return check;
    }

    validatePassword(password) {
        if (password.validity.tooShort) {
            password.nextElementSibling.classList.add(ModalClasses.showModalError);
            return false;
        }
        if (!password.validity.tooShort) {
            password.nextElementSibling.classList.remove(ModalClasses.showModalError);
            return true;
        }
    }

    registerUser() {
        const value = newAccount.setUser();
        localStorage.setItem(`${localStorage.length}`, JSON.stringify(value));
    }
}