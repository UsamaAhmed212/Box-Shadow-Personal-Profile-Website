"use strict";
window.addEventListener('load', function (event) {
    // Debounce Handler
    function debounce(fn, delay = 300, immediate = true) {
        let timeout;
        return function executedFunction(e) {
            e.stopPropagation();
            e.preventDefault();
            
            let context = this;
            let args = arguments;
            let callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(function() {
                timeout = null;
                if (!immediate) fn.apply(context, args);
                    
            }, delay);

            if (callNow) fn.apply(context, args);
        };
    }

    // Draw on Scroll
    var scroll_to_top = document.querySelector('.scroll-to-top');
    var scroll_to_top_svg_path = scroll_to_top.querySelector('svg path');
    if(scroll_to_top_svg_path != null) {
        var length  = scroll_to_top_svg_path.getTotalLength();
    }

    function drawOnScroll(e) {
        var windowScroll = document.body.scrollTop + document.documentElement.scrollTop; 
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if ( windowScroll > 0 ) {
            if(scroll_to_top != null) {
                scroll_to_top.classList.add('active');
            }

            var scrolled = windowScroll / height;
            var draw = length * scrolled;

            if(scroll_to_top_svg_path != null) {
                scroll_to_top_svg_path.style.strokeDashoffset = length - draw;
                scroll_to_top_svg_path.style.strokeDasharray = length;
            }
        } else {
            if(scroll_to_top != null) {
                scroll_to_top.classList.remove('active');
            }
        }
    }

    drawOnScroll();
    window.addEventListener('load', drawOnScroll);
    window.addEventListener("scroll", drawOnScroll);
    window.addEventListener("resize", drawOnScroll);
    window.addEventListener("wheel", drawOnScroll);

    if(scroll_to_top != null) {
        scroll_to_top.addEventListener("click", debounce(function(e) {
            if ( !window.requestAnimationFrame ) {
                window.scrollTo(0, 0);
            } else {
                Util.scrollTo(0, 700);
            }
        }));
    }

    // Utility function
        function Util () {};

    /* 
        Smooth Scroll
    */
    Util.scrollTo = function( final, duration ) {
        var start = window.scrollY || document.documentElement.scrollTop,
            currentTime = null;
        var animateScroll = function(timestamp) {
            if (!currentTime) currentTime = timestamp;        
            var progress = timestamp - currentTime;
            if(progress > duration) progress = duration;
            var value = Math.easeInOutQuad(progress, start, final-start, duration);
            window.scrollTo(0, value);
            if(progress < duration) {
                window.requestAnimationFrame(animateScroll);
            }
        };
        window.requestAnimationFrame(animateScroll);
    };


    /* 
        Animation curves
    */
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };
    
});
