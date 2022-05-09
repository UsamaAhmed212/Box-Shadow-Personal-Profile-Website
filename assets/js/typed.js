"use strict";
function Typed() {
    document.querySelectorAll('.typed').forEach( function (element) {
        const attributes = Array.from(element.querySelector('.typed-texts').attributes);
        const attributesObj = {};
        attributes.forEach(function (attribute) {
            let name = attribute.name;
            let value = attribute.value;
            if( name.startsWith(/typed-[a-z][a-z]*/i.exec(name)) && (name.endsWith(/-[a-z][a-z]*/i.exec(name)) || name.endsWith(/-[a-z][a-z]*-[a-z]*/i.exec(name))) && (!value == '') && value == /[a-z0-9]*/i.exec(value) ) {
                name = name.replace(/typed-/i, '').replace(/-([a-z])/gi, i => i.slice(1).toUpperCase());
                attributesObj[name] = (value == /[0-9]*/.exec(value)) ? parseInt(value) : value;
            }
        });

        typed(element, attributesObj);
    });

    function typed(element, attributes) {
        const {
                startPoint = 'end',
                startDelay = 2500,
                typeSpeed  = 0,
                backDelay  = 1500,
                backSpeed  = 0,
                nextDelay  = 50,
                showCursor = 'true',
                cursorBlink = 'true',
                inEffect   = '',
                outEffect  = '',
        } = attributes;

        const typedTexts = element.querySelector('.typed-texts');

        if (showCursor == 'false') {
            typedTexts.classList.add('cursor-hide');
        }

        if (showCursor == 'true' && cursorBlink == 'true') {
            typedTexts.classList.add('blink');
        }

        if (!element.querySelector('.typed-texts span.type')) {
            element.querySelector('.typed-texts span').classList.add('type');
        }

        const typedTextsWidth = element.querySelector('.typed-texts span.type').scrollWidth + 10;
        (startPoint == 'end') ? typedTexts.style.width = typedTextsWidth +'px' : typedTexts.style.width = 0 +'px'; 
        
        const typeStart = setInterval(() => {
            (startPoint == 'end') ? erase() : type();
            clearInterval(typeStart);
        }, startDelay);

        function type () {
            const typedTextsWidth = element.querySelector('.typed-texts span.type').scrollWidth + 10;
            let width = 0;
            const type = setInterval(() => {
                if (inEffect == 'clipIn') {
                    let percent = Math.floor((width / typedTextsWidth) * 100);
                    if (percent <= 30) {
                        width += 1.40;
                    } else if (percent <= 35) {
                        width += 1.35;
                    } else if (percent <= 40) {
                        width += 1.30;
                    } else if (percent <= 45) {
                        width += 1.25;
                    } else if (percent <= 50) {
                        width += 1.20;
                    } else if (percent <= 55) {
                        width += 1.15;
                    } else if (percent <= 60) {
                        width += 1.10;
                    }  else if (percent <= 65) {
                        width += 1.05;
                    } else {
                        width += 1;
                    }
                } else {
                    width += 1;
                }

                if (typedTextsWidth >= width) {
                    typedTexts.style.width = width +'px';
                } else {
                    clearInterval(type);
                    setTimeout(() => {
                        erase();
                    }, backDelay);
                }
            }, typeSpeed);
        }

        function erase () {
            const typedTextsWidth = element.querySelector('.typed-texts span.type').scrollWidth + 10;
            let width = typedTextsWidth;
            const erase = setInterval(() => {
                if (outEffect == 'clipOut') {
                    let percent = Math.floor((width / typedTextsWidth) * 100);
                    if (percent >= 70) {
                        width -= 1.40;
                    } else if (percent >= 65) {
                        width -= 1.35;
                    } else if (percent >= 60) {
                        width -= 1.30;
                    } else if (percent >= 55) {
                        width -= 1.25;
                    } else if (percent >= 50) {
                        width -= 1.20;
                    } else if (percent >= 45) {
                        width -= 1.15;
                    } else if (percent <= 40) {
                        width -= 1.10;
                    } else if (percent <= 35) {
                        width -= 1.05;
                    } else {
                        width -= 1;
                    }
                }  else {
                    width -= 1;
                }

                if (width > 0) {
                    typedTexts.style.width = width +'px';
                } else {
                    clearInterval(erase);
                    const typedText = element.querySelector('.typed-texts span.type');

                    typedText.classList.add("hide");

                    setTimeout(() => {
                        takeNext();
                        type();
                    }, nextDelay);
                }
            }, backSpeed);
        }
        
        function takeNext () {
            const typedTexts = element.querySelectorAll('.typed-texts span');
            const typedText = element.querySelector('.typed-texts span.type');

            typedText.classList.remove('hide');
            
            if (typedText.nextElementSibling) {
                typedText.classList.remove('type');
                if (typedText.getAttribute('class') == '') {
                    typedText.removeAttribute('class');
                }
                typedText.nextElementSibling.classList.add('type');
            } else {
                typedText.classList.remove('type');
                if (typedText.getAttribute('class') == '') {
                    typedText.removeAttribute('class');
                }
                typedTexts[0].classList.add('type');
            }
        }

    }
}