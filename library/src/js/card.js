import {newUtils} from './utils.js';
export {newCard};

const CardClasses = {
    buttonCardCheckInactive: "book-card__button_inactive",
    cardInfoBlockActive: "card-info_active",
    getCardButtonProfile: "get-card__button_profile_active",
}

class Card {
    constructor() {
        this.inputReaderName = document.querySelector("#reader-name");
        this.inputCardNumber = document.querySelector("#card-number");
        this.buttonCardCheck = document.querySelector(".book-card__button");

        this.findCardTitle = document.querySelector(".find-card__title");
        this.getCardTitle = document.querySelector(".get-card__title");
        this.getCardText = document.querySelector(".get-card__text");
        this.getCardButtons = document.querySelector(".get-card__buttons");
        this.getCardButtonProfile = document.querySelector(".get-card__button_profile");

        this.cardInfoBlock = document.querySelector(".card-info");
        this.cardInfoVisits = document.querySelector(".card-info__number_visits");
        this.cardInfoBonuses = document.querySelector(".card-info__number_bonuses");
        this.cardInfoBooks = document.querySelector(".card-info__number_books");

        this.bindListeners();
    }

    checkCard(e) {
        e.stopPropagation();
        e.preventDefault();
        for (let i = 0; i < localStorage.length; i++) {
            let user = JSON.parse(localStorage.getItem(String(i)));
            if ((newUtils.capitalizeFirstChar(this.inputReaderName.value) === `${user.userName} ${user.userSurname}` || newUtils.capitalizeFirstChar(this.inputReaderName.value) === `${user.userName}`) && this.inputCardNumber.value === user.userCardNumber) {
                this.showCardInfo(user);
                setTimeout(() => this.hideCardInfo(), 10000);
            }
        }
    }

    showCardInfo(user) {
        this.buttonCardCheck.classList.add(CardClasses.buttonCardCheckInactive);
        this.fillCardInfoBlock(user);
        this.cardInfoBlock.classList.add(CardClasses.cardInfoBlockActive);
    }

    fillCardInfoBlock(user) {
        this.cardInfoVisits.innerHTML = `${user.visits}`;
        this.cardInfoBonuses.innerHTML = `${user.bonuses}`;
        this.cardInfoBooks.innerHTML = `${user.rentedBooks.length}`;
    }

    hideCardInfo() {
        this.buttonCardCheck.classList.remove(CardClasses.buttonCardCheckInactive);
        this.cardInfoBlock.classList.remove(CardClasses.cardInfoBlockActive);
        this.inputReaderName.value = "";
        this.inputCardNumber.value = "";
    }

    changeCardSection(authorizedUser) {
        if (authorizedUser !== undefined) {
            this.findCardTitle.innerHTML = `Your Library card`;
            this.inputReaderName.setAttribute("disabled", "disabled");
            this.inputReaderName.placeholder = `${authorizedUser.userName} ${authorizedUser.userSurname}`;
            this.inputCardNumber.setAttribute("disabled", "disabled");
            this.inputCardNumber.placeholder = `${authorizedUser.userCardNumber}`;
            this.buttonCardCheck.style = `display: none`;
            this.cardInfoBlock.classList.add(CardClasses.cardInfoBlockActive);
            this.fillCardInfoBlock(authorizedUser);
            this.getCardTitle.innerHTML = `Visit your profile`;
            this.getCardText.innerHTML = `With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.`;
            this.getCardButtons.style = `display: none`;
            this.getCardButtonProfile.classList.add(CardClasses.getCardButtonProfile);
        }
    }

    bindListeners() {
        const context = this;

        this.buttonCardCheck.addEventListener("click", (event) => context.checkCard(event));
    }
}

const newCard = new Card();