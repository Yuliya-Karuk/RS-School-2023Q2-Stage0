export {newProfile};
import booksJSON from '../data/books.json' assert { type: 'json' }

class Profile {
    constructor() {
        this.profileNameShort = document.querySelector(".profile__name_short");
        this.profileNameLong = document.querySelector(".profile__name_long");
        this.profileInfoVisits = document.querySelector(".profile-info__number_visits");
        this.profileInfoBonuses = document.querySelector(".profile-info__number_bonuses");
        this.profileInfoBooks = document.querySelector(".profile-info__number_books");
        this.profileBooksList = document.querySelector(".profile-books__list");
        this.profileCardNumber = document.querySelector(".profile-card__number");
        this.profileButtonCopy = document.querySelector(".profile-card__copy");

        this.bindListeners();
    }

    fillProfileInfo(authorizedUser) {
        if (authorizedUser !== undefined) {
            this.profileNameLong.innerHTML = `${authorizedUser.userName} ${authorizedUser.userSurname}`;
            this.profileNameShort.innerHTML = `${authorizedUser.userName[0]}${authorizedUser.userSurname[0]}`;
            this.profileInfoVisits.innerHTML = `${authorizedUser.visits}`;
            this.profileInfoBonuses.innerHTML = `${authorizedUser.bonuses}`;
            this.profileInfoBooks.innerHTML = `${authorizedUser.rentedBooks.length}`;
            this.profileCardNumber.innerHTML = `${authorizedUser.userCardNumber}`;
        }
    }

    changeProfileInfo(authorizedUser) {
        this.profileInfoBonuses.innerHTML = `${authorizedUser.bonuses}`;
        this.profileInfoBooks.innerHTML = `${authorizedUser.rentedBooks.length}`;
    }

    addRentedBook(bookId) {
        const book = booksJSON[bookId];

        const bookElement = document.createElement("li");
        bookElement.classList.add("modal__text");
        bookElement.classList.add("profile-books__item");
        bookElement.innerHTML = `${book.books__title}, ${book.books__author}`;
        this.profileBooksList.append(bookElement);
    }

    async copyLibraryCardNumber(text) {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Error in copying text: ', err);
        }
    }

    bindListeners() {
        const context = this;
        this.profileButtonCopy.addEventListener("click", () => context.copyLibraryCardNumber(this.profileCardNumber.innerHTML));
    }
}

const newProfile = new Profile();