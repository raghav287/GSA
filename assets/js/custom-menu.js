document.addEventListener('DOMContentLoaded', function () {
    // Custom Side Menu Logic (Existing)
    const offcanvasBox = document.querySelector('.txa-offcanvas-box');
    const toggleBtn = document.querySelector('.offcanvas_toggle_custom');
    const closeBtn = document.querySelector('.txa-offcanvas-box-close');

    if (toggleBtn && offcanvasBox) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            offcanvasBox.classList.toggle('active');
        });
    }

    if (closeBtn && offcanvasBox) {
        closeBtn.addEventListener('click', () => {
            offcanvasBox.classList.remove('active');
        });
    }

    if (offcanvasBox) {
        // Prevent scroll inside menu from bubbling to window (keeps menu open)
        offcanvasBox.addEventListener('scroll', (e) => {
            e.stopPropagation();
        });
    }

    window.addEventListener('scroll', () => {
        // Close menu on scroll (optional, user wanted this)
        if (offcanvasBox && offcanvasBox.classList.contains('active')) {
            offcanvasBox.classList.remove('active');
        }
    });


    // Custom Sticky Header Logic (Overlay Method)
    const header = document.querySelector('.fx-header-1-area');
    let lastScrollTop = 0;

    if (header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const delta = scrollTop - lastScrollTop;
            const threshold = 200; // Trigger sticky behavior after 200px

            if (scrollTop > threshold) {
                // We are scrolled down past threshold -> Activate Fixed Sticky Mode
                header.classList.add('header-sticky-active');

                if (delta > 0) {
                    // Scrolling DOWN -> Hide Header
                    header.classList.add('header-hidden');
                } else {
                    // Scrolling UP -> Show Header
                    header.classList.remove('header-hidden');
                }
            } else {
                // Valid for top of page -> Reset to Absolute Overlay
                header.classList.remove('header-sticky-active');
                header.classList.remove('header-hidden');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
});
