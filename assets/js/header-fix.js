(function ($) {
    "use strict";

    var lastScrollTop = 0;
    var delta = 5;
    var header = $('.fx-sticky-header-custom');

    // Check if header exists
    if (header.length) {
        var navbarHeight = header.outerHeight();

        $(window).scroll(function (event) {
            var st = $(this).scrollTop();

            // Make sure they scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            if (st > lastScrollTop && st > 40) {
                // Scroll Down
                header.addClass('txa_sticky');
                header.removeClass('txa_sticky_show');
            } else {
                // Scroll Up
                if (st + $(window).height() < $(document).height()) {
                    header.addClass('txa_sticky_show');

                    // Specific Logic:
                    // If near top (e.g. within 20px), we can remove sticky to dock it.
                    // But if we want it to just show, let's keep it consistent.
                    if (st < 20) {
                        header.removeClass('txa_sticky');
                        header.removeClass('txa_sticky_show');
                    }
                }
            }

            lastScrollTop = st;
        });
    }

})(jQuery);
