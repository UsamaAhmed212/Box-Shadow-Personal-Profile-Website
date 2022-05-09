"use strict";
function Typed(name, values) {
    const {
        stringsElement = null,
            startDelay = 10,
            typeSpeed = 75,
            smartBackspace = true,
            backSpeed = 75,
            backDelay = 800,
            showCursor = true
    } = values;

    const typedCursor = document.querySelector(name + " + .cursor");
    const typedTextget = document.querySelector(stringsElement);
    const typedTextSet = document.querySelector(name);
    const elements = typedTextget.children;
    const textArray = [];

    
    for (const element of elements) {
        let str = element.innerHTML;
        str = str.replace(/<br ?\/?>/g, "\n");
        textArray.push(str);
    }

    let textArrayIndex = 0;
    let charIndex = 0;
    let eraseLength = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (showCursor) {
                typedCursor.classList.add("blink");
            }

            if (textArray[textArrayIndex].charAt(charIndex)  != "\n") {
                typedTextSet.innerHTML += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed);
                
            }
            else {
                typedTextSet.innerHTML += "<br/>";
                charIndex++;
                setTimeout(type, typeSpeed);
            }
        }
        else {
            typedCursor.classList.remove("typing");
            setTimeout(erase, backDelay);
        }
    }

    function erase() {
        if (charIndex > eraseLength) {
            if (showCursor) {
                typedCursor.classList.add("blink");
            }

            if (smartBackspace) {
                if (!textArrayIndex > eraseLength && textArray.length > 1) {
                    let preStr = textArray[textArrayIndex].substring(0, charIndex - 1);
                    let nextStr = textArray[textArrayIndex + 1].substring(0, charIndex - 1);
                    if (preStr == nextStr) {
                        eraseLength = preStr.length;
                    }
                }
            }
            

            const substring = textArray[textArrayIndex].substring(0, charIndex-1);
            const regex = /\n/i;
            const string =  substring.replace(regex, '<br/>');
            typedTextSet.innerHTML = string;
            charIndex--;
            setTimeout(erase, backSpeed);
        } 
        else {
            typedCursor.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) {
                textArrayIndex = 0;
            }
            setTimeout(type, typeSpeed);
        }
    }

    if(textArray.length) {
        setTimeout(type, startDelay);
    };

}

