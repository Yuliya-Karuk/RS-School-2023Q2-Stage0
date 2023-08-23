export {Slider};

class Slider {
    constructor() {
        this.sliderButtonLeft = document.querySelector(".slider__btn_left");
        this.sliderButtonRight = document.querySelector(".slider__btn_right");
        this.slider = document.querySelector(".slider__images");
        this.paginationBtns =  document.querySelectorAll(".pgn__button");
        this.paginationBtnActive =  document.querySelector(".pgn__button_active");
        this.bindListeners();
        this.sliderItems = 4;
        this.currentSlide = 0;
        this.offset;
    }

    generateConst() {
        if (window.innerWidth <= 768) {
            this.offset = 100;
        };
        if (window.innerWidth <= 1024 && window.innerWidth > 768) {
            this.offset = 50;
        };
        if (window.innerWidth > 1024) {
            this.offset = 34;
        };
    }

    fillPagination() {
        for (let i = 0; i < this.paginationBtns.length; i++) {
            this.paginationBtns[i].removeAttribute("disabled");
        }
        this.paginationBtns[this.currentSlide].setAttribute("disabled", "disabled");
    }

    move() {
        if (this.currentSlide > 0 || this.currentSlide < 4) {
            this.sliderButtonLeft.removeAttribute("disabled");
            this.sliderButtonRight.removeAttribute("disabled");
        }
        if (this.currentSlide === 4) {
            this.sliderButtonRight.setAttribute("disabled", "disabled");
        }
        if (this.currentSlide === 0) {
            this.sliderButtonLeft.setAttribute("disabled", "disabled");
        }
        this.slider.style.transform = `translateX(-${this.currentSlide * this.offset}%)`;
    }

    restartSlider() {
        this.generateConst();
        this.currentSlide = 0;
        this.fillPagination();
        this.move();
    }

    bindListeners() {
        const context = this;
        document.addEventListener("DOMContentLoaded", () => context.generateConst());
        window.addEventListener('resize', () => context.restartSlider());

        for (let i = 0; i < this.paginationBtns.length; i++) {
            this.paginationBtns[i].addEventListener("click", function(e) {
                context.currentSlide = i;
                context.move();
                context.fillPagination();
            });
        };

        this.sliderButtonRight.addEventListener("click", function() {
            context.currentSlide += 1;
            context.move();
            context.fillPagination();
        });

        this.sliderButtonLeft.addEventListener("click", function() {
            context.currentSlide -= 1;
            context.move();
            context.fillPagination();
        });
    }
}