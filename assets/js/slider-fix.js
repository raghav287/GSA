(function ($) {
    "use strict";
    $(document).ready(function () {

        // Fix for data-background images
        $("[data-background]").each(function () {
            $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
        });

        // Custom Counter Logic
        var counters = $(".counter");
        if (counters.length) {
            counters.each(function () {
                var $this = $(this);
                $this.attr("data-target", $this.text()); // Save target number
                $this.text("0"); // Reset to 0 immediately to prevent glitch
            });

            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var $target = $(entry.target);
                    var targetValue = parseInt($target.attr("data-target"));

                    if (entry.isIntersecting) {
                        // Element entered viewport
                        if (entry.boundingClientRect.top > 0) {
                            // Entered from bottom (scrolling down) -> Animate
                            $({ countNum: 0 }).animate({ countNum: targetValue }, {
                                duration: 2000,
                                easing: 'swing',
                                step: function () {
                                    $target.text(Math.floor(this.countNum));
                                },
                                complete: function () {
                                    $target.text(this.countNum);
                                }
                            });
                        } else {
                            // Entered from top (scrolling up) -> Show full number immediately
                            $target.text(targetValue);
                        }
                    } else {
                        // Element left viewport
                        if (entry.boundingClientRect.top > 0) {
                            // Left via bottom (scrolling up) -> Reset to 0
                            $target.text("0");
                        }
                        // If left via top (scrolling down), do nothing (keep number)
                    }
                });
            }, {
                threshold: 0.5 // Trigger when 50% visible
            });

            counters.each(function () {
                observer.observe(this);
            });
        }

        // Auto-play Video on Scroll
        var $videoIframe = $(".fx-video-1 iframe");
        if ($videoIframe.length) {
            var videoObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var iframe = entry.target;
                        var src = iframe.getAttribute("src"); // Use getAttribute to ensure we get the string

                        // Remove srcdoc if present (overrides src)
                        if (iframe.hasAttribute("srcdoc")) {
                            iframe.removeAttribute("srcdoc");
                        }

                        // Avoid re-triggering if already autoplay
                        if (src && src.indexOf("autoplay") === -1) {
                            var newSrc = src + (src.indexOf("?") > -1 ? "&" : "?") + "autoplay=1&mute=1";
                            iframe.src = newSrc;
                        }
                        videoObserver.unobserve(iframe); // Play only once
                    }
                });
            }, {
                threshold: 0.5
            });

            $videoIframe.each(function () {
                videoObserver.observe(this);
            });
        }

        // Client Slider Initialization
        var swiper = new Swiper(".fx-c1-active", {
            slidesPerView: 5,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: ".fx-c1-slider-next",
                prevEl: ".fx-c1-slider-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                },
                1400: {
                    slidesPerView: 5,
                }
            },
        });


        // Footer Marquee Initialization
        if ($(".js-marquee-wrapper").length) {
            $(".js-marquee-wrapper").marquee({
                speed: 100,
                gap: 0,
                delayBeforeStart: 0,
                direction: "left",
                duplicated: true,
                pauseOnHover: true,
            });
        }


        // Go Top Button Initialization
        var $backToTop = $(".scroll_top");
        if ($backToTop.length) {
            $backToTop.on("click", function (e) {
                e.preventDefault();
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);
            });

            $(window).on("scroll", function () {
                if ($(this).scrollTop() > 300) {
                    $backToTop.addClass("active");
                } else {
                    $backToTop.removeClass("active");
                }
            });
        }


        // Certification 3D Slider Initialization
        var certSwiper = new Swiper(".fx-certification-active", {
            slidesPerView: "auto", // Allows CSS width/aspect-ratio to dictate slide width
            centeredSlides: true,
            spaceBetween: 30, // Space between certificates
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            loop: true,
            speed: 800, // Smooth transition
        });

    });
})(jQuery);
