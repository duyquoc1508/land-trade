(function ($) {
    "use strict";

    // Wow  animation
              new WOW().init();

    //Slider
    var featured_property = new Swiper('.search-demo-wrap', {
            slidesPerView: 1,
            spaceBetween: 30,
            speed: 2000,
            loop: true,
            // autoplay: {
            // delay: 3000,
            // disableOnInteraction: true
            // },
            navigation: {
                nextEl: '.search-demo-next',
                prevEl: '.search-demo-prev',
            }
        });
    
}(jQuery));
