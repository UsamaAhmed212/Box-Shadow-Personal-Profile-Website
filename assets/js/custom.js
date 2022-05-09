"use strict";
window.onload = function() {
    // .nav-link to Add Class .active and Others .nav-link to Remove Class .active
    const nav_link = document.querySelectorAll("#navbarNav .nav-link");
    nav_link.forEach( function (element) {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            nav_link.forEach(function (node) {
                node.classList.remove('active');
            });
            this.classList.add('active');
        });
    });


    // Print Current Year in a Website
    const copyright = document.querySelector("#copyright");
    copyright.appendChild(document.createTextNode(new Date().getFullYear()));
    
    // .sidebar-menu Toggle  
    const menu_toggle = document.querySelector("#menu-toggle");
    const sidebar_menu = document.querySelector(".sidebar-menu");

    menu_toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();

        this.classList.toggle("open");
        sidebar_menu.classList.toggle("active");
    });


    // .sidebar-menu Close  
    const sidebar_menu_close = document.querySelector(".sidebar-menu-close");

    sidebar_menu_close.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        const sidebar_menu_active = document.querySelector(".sidebar-menu.active");

        menu_toggle.classList.remove("open");
        sidebar_menu_active.classList.remove("active");
    });


    // Close or Hide .sidebar-menu when Click Outside 
    window.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();

        if ( menu_toggle.classList.contains("open") && sidebar_menu.classList.contains("active") ) {
            
            if ( sidebar_menu !== e.target && !sidebar_menu.contains(e.target) ) {
                menu_toggle.classList.remove('open');
                const sidebar_menu_active = document.querySelector(".sidebar-menu.active");
                sidebar_menu_active.classList.remove("active");
            }
        }

    });

    // beforebegin Method add new Element the HTML into the container before the element |& and &| Preview Element Class Add 
    var inner_value = `<span class="sub-toggle">
        <svg width="14" height="14" viewBox="0 0 8 16">
            <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z"></path>
        </svg>
    </span>`;

    const sub_menu = document.querySelectorAll('.sub-menu');
    sub_menu.forEach( function (element) {
        element.previousElementSibling.classList.add("dropdown-toggle");
        element.insertAdjacentHTML('beforebegin', inner_value);
    });


    // .sidebar-menu > .sub-toggle Class Toggle |& and &| .sidebar-menu > .sub-menu
    const sub_toggle_all = document.querySelectorAll(".sub-toggle");
    sub_toggle_all.forEach( function (element) {
        element.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            this.classList.toggle("open");

            var next_sub_menu = element.nextElementSibling;

            if (next_sub_menu.offsetHeight == "0px" || next_sub_menu.offsetHeight == "") {
                let id = null;
                clearInterval(id);
                let height = 0;

                id = setInterval(function () {
                    if (height >= next_sub_menu.scrollHeight) {
                        next_sub_menu.style.height = "auto";
                        clearInterval(id);
                    }else {
                        height += 5;
                        next_sub_menu.style.height = height + "px";
                    }
                }, 1);
            }else {
                let id = null;
                clearInterval(id);
                let height = next_sub_menu.scrollHeight;

                id = setInterval(function () {
                    if (height <= 0) {
                        next_sub_menu.style.height = "0px";
                        clearInterval(id);
                    }else {
                        height -= 5;
                        next_sub_menu.style.height = height + "px";
                    }
                }, 1);
            }

        });
    });
    

    // Type Js 01
    Typed('.typed_js_set_01', {
        stringsElement: '.typed_js_get_01',
        backDelay : 3000,
        showCursor : false
    });
    
    // Type Js 02
    Typed('.typed_js_set_02', {
        stringsElement: '.typed_js_get_02',
            backDelay: 3000,
    });


    // #contact-form > .send-btn  Click Effect
    const button = document.querySelector('#contact-section .send-btn');
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

}






    