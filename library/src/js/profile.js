export {newProfile, Profile};
import booksJSON from '../data/books.json' assert { type: 'json' }

const ProfileClasses = {

}

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

        // this.bindListeners();
    }

    fillProfileInfo(userKey) {
        if (userKey !== undefined) {
            const authorizedUser = JSON.parse(localStorage.getItem(String(userKey)));
            this.profileNameLong.innerHTML = `${authorizedUser.userName} ${authorizedUser.userSurname}`;
            this.profileNameShort.innerHTML = `${authorizedUser.userName[0]}${authorizedUser.userSurname[0]}`;
            this.profileInfoVisits.innerHTML = `${authorizedUser.visits}`;
            this.profileInfoBonuses.innerHTML = `${authorizedUser.bonuses}`;
            this.profileInfoBooks.innerHTML = `${authorizedUser.rentedBooks.length}`;
            this.profileCardNumber.innerHTML = `${authorizedUser.userCardNumber}`;
        }
    }

    fillRentedBooks(id) {
        console.log(booksJSON[id]);
        const book = booksJSON[id];
        const newBook = document.createElement("li");
        newBook.classList.add("modal__text");
        newBook.classList.add("profile-books__item");
        newBook.innerHTML = `${book.books__title}, ${book.books__author}`;
        profileBooksList.append(newLi);
    }
}

const newProfile = new Profile();