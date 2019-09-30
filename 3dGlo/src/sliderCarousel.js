'use strict';
class sliderCarousel {

    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = []
    }) {
        if (!main || !wrap) {
            console.warn('slider-carousel: Небходимо 2 свойства, "main" и "wrap"!');
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow)
        };
        this.responsive = responsive;
    }

    init() {
        this.addGloClass();
        this.addStyles();
        if (this.prev && this.next) {
            this.controlSllider()
        } else {
            this.addArrow();
            this.controlSllider();
        }
        if (this.responsive) {
            this.responseInit();
        }
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for (const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    addStyles() {
        let style = document.getElementById('sliderCarousel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }

        style.textContent = `
.glo-slider{
    overflow:hidden  !important;
}
.glo-slider__wrap{
    display:flex !important;
    transition:transform 0.5s !important;
    will-cahnge: transform !important;
}
.glo-slider__item{
    display: flex !important;
    align-items:center;
    justify-content: center;
    flex: 0 0 ${this.options.widthSlide}% !important;
    margin:auto 0 !important;
}
`;
        document.head.appendChild(style);
    }
    controlSllider() {
        this.next.addEventListener('click', this.nextSlider.bind(this));
        this.prev.addEventListener('click', this.prevSlider.bind(this));
    }
    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);

        const style = document.createElement('style');
        style.textContent = `
.glo-slider__prev,
.glo-slider__next{
    margin: 0 10px;
    border: 20px solid transparent;
    background: transparent;
}
.glo-slider__next{
    border-left-color:#19b5fe
}
.glo-slider__prev{
    border-right-color:#19b5fe
}
.glo-slider__prev:hover,
.glo-slider__next:hover,
.glo-slider__prev:focus,
.glo-slider__next:focus{
background: transparent;
outline: transparent;
}
`;
        document.head.appendChild(style);
    }
    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.slides.length - this.slidesToShow;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            console.log(this.options.position);
        }
    }
    nextSlider() {
        if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
            ++this.options.position;
            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
            console.log(this.options.position);
        }
    }
    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allRespone = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allRespone);

        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            if (widthWindow < maxResponse) {
                for (let i = 0; i < allRespone.length; i++) {
                    if (widthWindow < allRespone[i]) {
                        this.slidesToShow = this.responsive[i].slidesToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyles();
                    }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyles();
            }
        };

        checkResponse();

        window.addEventListener('resize', checkResponse);
    }
}

export default sliderCarousel;