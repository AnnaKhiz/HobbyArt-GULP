export function swipeSlider() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 15,
        loop: true,
        autoplay: true,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
    var swiperTwo = new Swiper(".mySwiper-2", {
        slidesPerView: 5,
        spaceBetween: 25,
        direction: 'horizontal',
        loop: true,
        autoplay: true,
        navigation: {
            nextEl: ".swiper-button-next-2",
            prevEl: ".swiper-button-prev-2",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            425: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1441: {
                slidesPerView: 4,
                spaceBetween: 25
            },
            1601: {
                slidesPerView: 5,
                spaceBetween: 25
            }
        }
    });
    var swiper3 = new Swiper(".mySwiper-3", {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next-3",
            prevEl: ".swiper-button-prev-3",
        },
        breakpoints: {
            300: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            945: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            1601: {
                slidesPerView: 3,
                spaceBetween: 15
            },
        }
    });
}