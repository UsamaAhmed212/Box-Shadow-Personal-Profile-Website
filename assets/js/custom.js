// Type Js 01
var typed = new Typed('.type_js_01', {
    stringsElement: '.type_js_get_01',
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 3000,
        loop: true,
        smartBackspace: true,
        showCursor: false
});

// Type Js 02
var typed = new Typed('.type_js_02', {
    stringsElement: '.type_js_get_02',
        typeSpeed: 100,
        backSpeed: 100,
        startDelay: 1500,
        backDelay: 5000,
        loop: true,
        smartBackspace: true,
        showCursor: false
});

// Banner Owl Carousel
$(document).ready(function(){
    $(".banner-owl-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        autoplayHoverPause:true,
        smartSpeed: 2000,
        loop: true,
        nav: false,
        dots: false,
        margin: 30,
        responsive: {
            0: {
                items: 1,
            },
            420: {
                items: 1,
            },
            480: {
                items: 3,
            },
            768: {
                items: 4,
            }
        }
    });
});


// #contact-form > .send-btn  Click Effect
const button = document.querySelector('#contact-section .send-btn');
const submit = document.querySelector('#contact-section .submit');
const contactForm   = document.getElementById("contact-form");

function toggleClass(e) {
    e.preventDefault();
    if(!this.classList.contains("finished")) {
        this.classList.toggle('active');
        button.disabled = true;
    }
}
function addClass() {
    if(!this.classList.contains("finished")) {
        this.classList.add('finished');

        setTimeout(function(){
            button.disabled = false;
            contactForm.reset();
            button.classList.remove("finished");
        }, 1000);
    }
}


button.addEventListener('click', toggleClass);
button.addEventListener('transitionend', toggleClass);
button.addEventListener('transitionend', addClass);

