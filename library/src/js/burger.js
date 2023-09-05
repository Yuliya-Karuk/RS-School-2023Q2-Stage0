export {BurgerClasses, Burger};

const BurgerClasses = {
    burgerMenu: "navigation_active",
    burgerButton: "burger_active",
    body: "no-scroll",
}

class Burger {
    constructor() {
        this.burgerButton = document.querySelector(".burger"); // кнопка бургер меню
        this.burgerMenu = document.querySelector(".navigation"); // меню навигации
        this.menuLinks = document.querySelectorAll(".navigation__link"); // ссылки в меню
        this.body =  document.querySelector("body");
        this.bindListeners();
    }

    toggleBurgerMenu() {
        this.burgerMenu.classList.add("navigation_start");
        this.burgerMenu.classList.toggle(BurgerClasses.burgerMenu);
        this.burgerButton.classList.toggle(BurgerClasses.burgerButton);
        this.body.classList.toggle(BurgerClasses.body);
    }

    bindListeners() {
        const context = this;

        /* показать/скрыть бургер меню при клике мышкой на кнопку */
        this.burgerButton.addEventListener("click", () => context.toggleBurgerMenu());

        /* закрыть окно при нажатии на эск*/
        window.addEventListener("keydown", function(e) {
            if (e.keyCode === 27 && context.burgerMenu.classList.contains(BurgerClasses.burgerMenu)) {
                context.toggleBurgerMenu();
            }
        });

        /* закрыть бургер-меню при нажатии на вне меню */
        document.addEventListener("click", function(e) {
            if (!e.target.classList.contains("navigation") && context.burgerMenu.classList.contains(BurgerClasses.burgerMenu) && !context.burgerButton.contains(e.target)) context.toggleBurgerMenu();
        });

        /* закрыть бургер-меню при нажатии на ссылку */
        for (let i = 0; i < this.menuLinks.length; i++) {
            this.menuLinks[i].addEventListener("click", () => context.toggleBurgerMenu());
        }
    }
}