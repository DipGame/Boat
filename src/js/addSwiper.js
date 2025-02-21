document.addEventListener("DOMContentLoaded", function () {

    let swiperPopular = new Swiper(".swiperPopular", {
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        // centeredSlides: true,
        // loop: true,
        slidesPerView: 'auto',
        spaceBetween: 15,
        breakpoints: {
            1610: {
                slidesPerView: 4,
                spaceBetween: 15
            },
        }
    });

    let swiperPride = new Swiper(".swiperPride", {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        pagination: {
            el: ".swiperPride-pagination",
            clickable: true, // Включение кликабельности пагинации
        },
    });
    let swiperFilters = new Swiper(".swiperFilters", {
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 8,
    });

    let swiperSimilar = new Swiper(".swiperSimilar", {
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        loop: false,
        slidesPerView: 'auto',
        spaceBetween: 15,
        navigation: {
            nextEl: ".swiperSimilar-button-next",
            prevEl: ".swiperSimilar-button-prev",
        },
        pagination: {
            el: ".swiperSimilar-pagination",
            clickable: true, // Включение кликабельности пагинации
        },
        breakpoints: {
            720: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            960: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 15
            },
        }
    });

    let swiperElementPrew = new Swiper(".swiperElementPrew", {
        spaceBetween: 10,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });

    let swiperElement = new Swiper(".swiperElement", {
        spaceBetween: 10,
        thumbs: {
            swiper: swiperElementPrew,
        },
        speed: 1500,            // added(slide speed)
        effect: 'fade',
    });




    console.log('addSwiper.js finish work');

});