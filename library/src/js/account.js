export {Account , newAccount};

const AccountClasses = {
    
}

class Account {
    constructor() {
        this.registerName = document.querySelector("#register-first-name");
        this.registerSurname = document.querySelector("#register-last-name");
        this.registerEmail = document.querySelector("#register-email");
        this.registerPassword = document.querySelector("#register-password");

        this.loginPassword = document.querySelector("#login-password");
        this.loginInputs = document.querySelectorAll(".auth__form_login .modal__input");
        this.loginErrors = document.querySelectorAll(".auth__form_login .modal__error");
        this.loginForm = document.querySelector(".auth__form_login");
    }

    generateCardNumber() {
        const number = Math.floor(Math.random() * (9999999999 - 10000000000) + 10000000000);
        const hexNumber = number.toString(16);
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
        }
        return data;
    }

    findAuthorized() {
        let userKey;
        for (let i = 0; i < localStorage.length; i++) {
            let user = JSON.parse(localStorage.getItem(String(i)));
            if (user.isAuthorized) {
                userKey = i;
            }
        }
        return userKey;
    }

}

const newAccount = new Account();