    /*----------------------------------------
                        Preloader
    ------------------------------------------*/
     $('.js-preloader').preloadinator({
         minTime: 2000,
         scroll: false

     });

    $(document).ready(function () {
    /*----------------------------------------
                        Tooltip
    ------------------------------------------*/

    $('[data-toggle="tooltip"]').tooltip();
    /* ----------------------------------------
           datepicker
    ------------------------------------------- */
    $("#datepicker-from").datepicker({
        autoclose: true,
        todayHighlight: true
    });
    $("#datepicker-to").datepicker({
        autoclose: true,
        todayHighlight: true
    });

    /*=====================================
            sort by filter
    ======================================*/
    $('.filter-sort-menu li').on('click', function () {
        var getValue = $(this).text();
        $('.sort-filter-btn').text(getValue);
    });
    /*----------------------------------------
          Scroll to top
  ----------------------------------------*/
    function BackToTop() {
        $('.scrolltotop').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        $(document).scroll(function () {
            var y = $(this).scrollTop();
            if (y > 600) {
                $('.scrolltotop').fadeIn();
            } else {
                $('.scrolltotop').fadeOut();
            }
        });
        $(document).scroll(function () {
            var m = $(this).scrollTop();
            if (m > 400) {
                $('.chat-popup').fadeIn();
            } else {
                $('.chat-popup').fadeOut();
            }
        });
    }
    BackToTop();

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            $(".header-top-section").addClass("header-top-none");
        } else {
            $(".header-top-section").removeClass("header-top-none");
        }
    });
    
    /*---------------------------------------------------
        AutoComplete Search suggestion
    ------------------------------------------------------*/
    $(function () {
        var availableTags = [
      "New York",
      "Nampa",
      "Havana",
      "Las Vegas",
      "Milan",
      "Naperville",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Nashville ",
      "Fortran",
      "Groovy",
      "Haskell",
      "Nevada",
      "Japan",
      "Sweden",
      "Florida",
      "India",
      "France",
      "Russia",
      "Scotland",
      "England"
    ];
        $("#place-event").autocomplete({
            source: availableTags
        });
    });
    /*-------------------------------------------------*/
    /*    scroll between sections
    /*-------------------------------------------------*/

    // Add scrollspy to <body>
    $('body').scrollspy({
        target: ".list_menu",
        offset: 50
    });

    // Add smooth scrolling on all links inside the navbar
    $("#list-menu a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;


            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    $('.list-details-tab li, .hero_list li').on('click', (function () {
        $('li').removeClass("active");
        $(this).addClass("active");
    }));


    /* ----------------------------------------
          Hide Show Header on Scroll
    ------------------------------------------ */
    function HideShowHeader() {

        var didScroll;
        var lastScrollTop = 0;
        var delta = 50;
        var navbarHeight = 75;
        var navbarHideAfter = navbarHeight

        $(window).scroll(function (event) {
            didScroll = true;
        });

        if ($('.scroll-hide').length > 0) {

            setInterval(function () {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 100);
        }
        return false;

        function hasScrolled() {
            var st = $(this).scrollTop();

            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            if (st > lastScrollTop && st > navbarHideAfter) {
                if ($('.scroll-hide').length > 0) {
                    $('header').addClass('hide');
                }
            } else {
                if ($('.scroll-hide').length > 0) {
                    if (st + $(window).height() < $(document).height()) {
                        $('header').removeClass('hide');
                        $('.header.transparent').addClass('scroll');
                    }
                }

                if ($(window).scrollTop() < 300) {
                    $('.header.transparent').removeClass('scroll');
                }
            }

            lastScrollTop = st;
        }
    }
    HideShowHeader();

    /*------------------------------------------
          sticky single listing menu
    -------------------------------------------*/
    $(window).on('load resize', function () {
        var containerWidth = $(".container").width();
        $('.fixed_nav').css('width', containerWidth);
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 700) {
            $('.list_menu').addClass('fixed-header');
        } else {
            $('.list_menu').removeClass('fixed-header');
        }
    });

    /*------------------------------------------
          sticky sidebar
    -------------------------------------------*/

    $('#list-sidebar').stickySidebar({
        topSpacing: 60,
        bottomSpacing: 0
    });
    /* ----------------------------------------
          Counter animation
    ------------------------------------------*/
    $('.counter-text').appear(function () {
        var element = $(this);
        var timeSet = setTimeout(function () {
            if (element.hasClass('counter-text')) {
                element.find('.counter-value').countTo();
            }
        });
    });
    /*-------------------------------------------
            Count Down Timer
    ---------------------------------------------*/
    $('[data-countdown]').each(function () {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('<span class="cdown day"><span class="time-count">%-D</span> <p>Days</p></span> <span class="cdown hour"><span class="time-count">%-H</span> <p>Hours</p></span> <span class="cdown minutes"><span class="time-count">%M</span> <p>mins</p></span> <span class="cdown second"><span class="time-count">%S</span> <p>secs</p></span>'));
        });
    });

    /*--------------------------------------------
                       Video Player
     --------------------------------------------*/
    $(".player").mb_YTPlayer({
        containment: '#video-wrapper',
        mute: true,
        autoplay: true,
        showControls: false,
        quality: 'hd720'
    });


    jQuery(document).ready(function ($) {
        "use strict";


        /*-------------------------------------
                Magnific Popup js
        --------------------------------------*/
        $('.popup-yt, .property-yt').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            preloader: true,
        });

        $('a.btn-gallery').on('click', function (event) {
            event.preventDefault();

            var gallery = $(this).attr('href');

            $(gallery).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                }
            }).magnificPopup('open');
        });

        /* -------------------------------------
              Footer Accordion
        -------------------------------------- */
        $(".nav-folderized h2").on('click', (function () {
            $(this).parent(".nav").toggleClass("open");
            $('html, body').animate({
                scrollTop: $(this).offset().top - 170
            }, 1500);
        }));

        /* -------------------------------------
                Responsive menu
        -------------------------------------- */
        var siteMenuClone = function () {

            $('.js-clone-nav').each(function () {
                var $this = $(this);
                $this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
            });

            setTimeout(function () {

                var counter = 0;
                $('.site-mobile-menu .has-children').each(function () {
                    var $this = $(this);

                    $this.prepend('<span class="arrow-collapse collapsed">');

                    $this.find('.arrow-collapse').attr({
                        'data-toggle': 'collapse',
                        'data-target': '#collapseItem' + counter,
                    });

                    $this.find('> ul').attr({
                        'class': 'collapse',
                        'id': 'collapseItem' + counter,
                    });

                    counter++;

                });

            }, 1000);

            $('body').on('click', '.js-menu-toggle', function (e) {
                var $this = $(this);
                e.preventDefault();

                if ($('body').hasClass('offcanvas-menu')) {
                    $('body').removeClass('offcanvas-menu');
                    $this.removeClass('active');
                } else {
                    $('body').addClass('offcanvas-menu');
                    $this.addClass('active');
                }
            })

        };
        siteMenuClone();

        /*-------------------------------------------------
                    rating stars in reviews 
        /*-------------------------------------------------*/

        var rateLine = $('.contact-form__rate-bx'),
            rateActual = $('.rate-actual');

        rateLine.find('i').on('hover', function () {
            var indexStar = $(this).index();
            for (var j = 0; j <= 9; j++) {
                rateLine.find('i:lt(' + indexStar + 1 + ')').addClass('active');
                rateLine.find('i:gt(' + indexStar + ')').removeClass('active');
            }
        });

        rateLine.find('i').on('click', function () {
            var indexStar = $(this).index();
            for (var j = 0; j <= 9; j++) {
                rateLine.find('i:lt(' + indexStar + 1 + ')').addClass('selected');
                rateLine.find('i:gt(' + indexStar + ')').removeClass('selected');
            }
            rateActual.text(indexStar + 1);
        });

        rateLine.on('mouseout', function () {
            rateLine.find('i').removeClass('active');
        });

        /* -------------------------------------
                 range slider
        -------------------------------------- */
        /*========Area===========*/
        $("#slider-range_one").slider({
            range: true,
            min: 0,
            max: 8000,
            values: [1200, 4014],
            slide: function (event, ui) {
                $("#amount_one").val(ui.values[0] + " - " + ui.values[1] + " sq ft");
            }
        });
        $(" #amount_one").val($("#slider-range_one").slider("values", 0) +
            " - " + $("#slider-range_one").slider("values", 1) + " sq ft");
        /*==========Price===========*/
        $("#slider-range_two").slider({
            range: true,
            min: 0,
            max: 10000,
            values: [0, 5600],
            slide: function (event, ui) {
                $("#amount_two").val(ui.values[0] + " - $" + ui.values[1]);
            }
        });
        $(" #amount_two").val($("#slider-range_two").slider("values", 0) +
            " - $" + $("#slider-range_two").slider("values", 1));
        /* -------------------------------------
                 Category menu Activation
        -------------------------------------- */


        $(".chat-popup, .chat-close").click(function () {

            $(".agent-chat-form").toggle();

        });

        $(".dropdown-filter").on('click', function () {

            $(".explore__form-checkbox-list").toggleClass("filter-block");

        });
        /* -------------------------------------
                   Slider
        -------------------------------------- */
        //Trending place slider
        var trending_place = new Swiper('.trending-place-wrap', {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 1500,
            loop: true,
            pagination: {
                el: '.trending-pagination',
                clickable: true,
            },
            // Responsive breakpoints
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                1199: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            }
        });
        var single_property = new Swiper('.single-property-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 1500,
            loop: true,
            navigation: {
                nextEl: '.single-property-next',
                prevEl: '.single-property-prev',
            },

        });
        var single_property_two = new Swiper('.hero-slider-wrap', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 1500,
            loop: true,
            effect: 'fade',
            navigation: {
                nextEl: '.single-property_next',
                prevEl: '.single-property_prev',
            },

        });
        var featured_property = new Swiper('.featured-property-wrap.v1', {
            slidesPerView: 1,
            spaceBetween: 0,
            effect:'fade',
            speed: 1500,
            loop: true,
            navigation: {
                nextEl: '.featured-next',
                prevEl: '.featured-prev',
            }
        });
        var featured_property_two = new Swiper('.featured-property-wrap.v2', {
            slidesPerView: 3,
            spaceBetween: 30,
            speed: 1500,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.featured_next',
                prevEl: '.featured_prev',
            },
            // Responsive breakpoints
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 30

                },
                1199: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            }
        });
        var featured_property_three = new Swiper('.featured-property-wrap.v3', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 1500,
            effect:'fade',
            loop: true,
            navigation: {
                nextEl: '.feature-next',
                prevEl: '.feature-prev',
            },
            // Responsive breakpoints
            breakpoints: {
                991: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 10
                },
                1199: {
                    slidesPerView: 2,
                    spaceBetween: 30
                }
            }
        });

        //Trending place slider
        var propery_slider = new Swiper('.property-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 700,
            loop: true,
            navigation: {
                nextEl: '.property-next',
                prevEl: '.property-prev',
            },

        });
        //Similar Listing Slider
        var similar_property = new Swiper('.similar-list-wrap', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: false,
            speed: 1000,
            navigation: {
                nextEl: '.similar-next',
                prevEl: '.similar-prev',
            },
            // Responsive breakpoints
            breakpoints: {

                768: {
                    slidesPerView: 1,
                    spaceBetween: 30
                },

                1100: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
            }
        });
        //Featured Listing Slider
        var featured_list = new Swiper('.featured-list', {
            slidesPerView: 1,
            spaceBetween: 5,
            // autoplay: {
            //     delay: 3000,
            //     disableOnInteraction: false,
            // },
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.featured-next',
                prevEl: '.featured-prev',
            },
            // Responsive breakpoints
            breakpoints: {

                767: {
                    slidesPerView: 1,
                    spaceBetween: 30
                },
            }
        });
        //Single Featured List 
        var featured_list_two = new Swiper('.single-featured-list', {
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.single-featured-next',
                prevEl: '.single-featured-prev',
            },
           
        });
        //Popular place slider one
        var popular_place = new Swiper('.popular-place-wrap.v1', {
            slidesPerView: 3,
            spaceBetween: 30,
            loop: false,
            speed: 1000,
            navigation: {
                nextEl: '.popular-next',
                prevEl: '.popular-prev',
            },
            // Responsive breakpoints
            breakpoints: {

                768: {
                    slidesPerView: 1
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
        
        //Partner slider
        var partner_slider = new Swiper('.partner-wrap', {
            slidesPerView: 5,
            spaceBetween: 30,
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.partner-next',
                prevEl: '.partner-prev',
            },
            // Responsive breakpoints
            breakpoints: {

                575: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 30
                }
            }
        });
        //Testimonial slider
        var testimonial_slider = new Swiper('.testimonial-wrapper', {
            slidesPerView: 1,
            loop: true,
            speed: 1000,
            effect: 'fade',
            navigation: {
                nextEl: '.client-next',
                prevEl: '.client-prev',
            }
        });
        //Testimonial slider
        var testimonial_slider_two = new Swiper('.client-wrapper', {
            slidesPerView: 3,
            loop: false,
            spaceBetween: 30,
            speed: 1000,
            navigation: {
                nextEl: '.testimonial-next',
                prevEl: '.testimonial-prev',
            },
            // Responsive breakpoints
            breakpoints: {
                991: {
                    slidesPerView: 1,
                },
                1199: {
                    slidesPerView: 2,
                }
            }
        });

        //Team Slider
        var team_slider = new Swiper('.team-wrapper', {
            slidesPerView: 4,
            loop: true,
            speed: 1000,
            spaceBetween: 30,
            navigation: {
                nextEl: '.team_next',
                prevEl: '.team_prev',
            },
            // Responsive breakpoints
            breakpoints: {
                767: {
                    slidesPerView: 1,
                    spaceBetween: 50,

                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1025: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });

        //Listing details carousel
        var list_details = new Swiper('.listing-details-slider', {
            slidesPerView: 3,
            spaceBetween: 0,
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.listing-details-next',
                prevEl: '.listing-details-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {

                767: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                }
            }
        });

        // Single Property Agency Slider
         var list_details = new Swiper('.single-agency-slider', {
            slidesPerView: 1,
            spaceBetween: 0,
            effect:'fade',
            loop: true,
            speed: 1000,
            navigation: {
                nextEl: '.single-agency_next',
                prevEl: '.single-agency_prev',
            },
            // autoplay: {
            //     delay: 3000,
            //     disableOnInteraction: false,
            // },
            breakpoints: {

                767: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                }
            }
        });

        // var galleryThumbs = new Swiper('.gallery-thumbs', {
        //         spaceBetween: 10,
        //         slidesPerView: 3,
        //         loop: true,
        //         freeMode: true,
        //         loopedSlides: 5, //looped slides should be the same
        //         watchSlidesVisibility: true,
        //         watchSlidesProgress: true,
        //     });
            // var single_property_two = new Swiper('.gallery-top', {
            //     slidesPerView: 1,
            //     spaceBetween: 0,
            //     speed: 1500,
            //     loop: true,
            //     effect: 'fade',
            //     navigation: {
            //         nextEl: '.single-agency_next',
            //         prevEl: '.single-agency_prev',
            //     },
            //     thumbs: {
            //         swiper: galleryThumbs,
            //     },

            // });

        /*---------------------------------
                Date Picker
        ------------------------------------*/
        if ($("./*counter*/-widget").length > 0) {
            var countCurrent = $(".counter-widget").attr("data-countDate");
            $(".countdown").downCount({
                date: countCurrent,
                offset: 0
            });
        }

    });

    /*---------------------------------
               Nice select
    -----------------------------------*/
    $('select').niceSelect();

    /*-------------------------------------
              Quantity Slider
     -------------------------------------*/
    var quantitiy = 0;
    $('.quantity-right-plus').on("click", function (e) {
        e.preventDefault();
        var quantity = parseInt($(this).parent().siblings("input.input-number").val(), 10);
        $(this).parent().siblings("input.input-number").val(quantity + 1);
    });
    $('.quantity-left-minus').on("click", function (e) {
        e.preventDefault();
        var quantity = parseInt($(this).parent().siblings("input.input-number").val(), 10);
        if (quantity > 0) {
            $(this).parent().siblings("input.input-number").val(quantity - 1);
        }
    });


});
