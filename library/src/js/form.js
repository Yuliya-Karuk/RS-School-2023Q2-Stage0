import {newAccount} from './account.js';
import {newModal} from './modal.js';
export {Form};

const FormClasses = {
    activeInput: "modal__input_active",
    showModalError: "modal__error_active",
}

class Form {
    constructor() {
        this.registerInputs = document.querySelectorAll(".modal__form_register .modal__input");
        this.registerInputEmail = document.querySelector("#register-email");
        this.registerErrors = document.querySelectorAll(".modal__form_register .modal__error");
        this.registerForm = document.querySelector(".modal__form_register");
        this.registerUserRegisteredError = document.querySelector(".modal__form_register .modal__error_registered")

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
        };

        this.registerForm.addEventListener("submit", (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (context.checkValidityForm(this.registerInputs, this.registerErrors)) {
                if(newAccount.checkUserIsRegistered(context.registerInputEmail) === false) {
                    newAccount.registerUser();
                    newModal.closeModal(newModal.modalRegister);
                    newAccount.changePage();
                } else {
                    this.registerUserRegisteredError.classList.add(FormClasses.showModalError);
                }

            }
        });

        for (let i = 0; i < this.loginInputs.length; i++) {
            this.loginInputs[i].addEventListener("blur", () => {
                context.checkValidityInput(context.loginInputs[i], context.loginErrors[i]);
            });
        };


        this.loginForm.addEventListener("submit", (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (context.checkValidityForm(this.loginInputs, context.loginErrors)) {
                if (newAccount.checkUserIsRegistered(context.loginInputEmail)) {
                    newAccount.loginUser();
                    newModal.closeModal(newModal.modalLogin);
                    newAccount.changePage();
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

        this.cardForm.addEventListener("submit", (e) => {
            e.preventDefault();
            newModal.closeModal(newModal.modalCard);
            newAccount.buyLibraryCard();
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
        const patternFirst = /([\d]{4}[\s]){3}[\d]{4}/g;
        const patternSecond = /([\d]{16})/g;
        if (!input.value.match(patternFirst) && !input.value.match(patternSecond)) {
            check = false;
        }
        return check;
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
        const value = newAccount.setUser();
        localStorage.setItem(`${localStorage.length}`, JSON.stringify(value));
    }
}