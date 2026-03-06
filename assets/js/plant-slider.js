(function ($) {
    "use strict";
    $(document).ready(function () {

        // Plant Product Slider Initialization
        var swiper = new Swiper(".fx-plant-product-active", {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 5,
                }
            },
        });

    });
})(jQuery);
