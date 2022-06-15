"use strict";
window.addEventListener('load', function (event) {
    var lastScroll = document.documentElement.scrollTop || document.body.scrollTop;
    let header = document.querySelector('#header');
    let sticky = header.offsetTop;

    function stickyHeader(e) {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if ( currentScroll > 0 ) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    function stickyHeaderHidden(e) {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if ( currentScroll > sticky + 200 && lastScroll <= currentScroll ){
            lastScroll = currentScroll;
            header.classList.add("header-hidden");
        } else {
            lastScroll = currentScroll;
            header.classList.remove("header-hidden");
        }

        if (header.getAttribute('class') == '') {
            header.removeAttribute('class');
        }
    }

    stickyHeader();
    window.addEventListener('scroll', stickyHeader);
    window.addEventListener('scroll', stickyHeaderHidden);
});