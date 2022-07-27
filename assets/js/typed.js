"use strict";
jQuery( document ).ready( function($) {
    function Typed() {
        $('.typed').each(function() {
            const element = $(this);
            const attributes = Array.from((element.context || element[0]).querySelector('.typed-texts').attributes);
            const attributesObj = {};
            attributes.forEach(function (attribute) {
                let name = attribute.name;
                let value = attribute.value;
                
                if( name.startsWith(/typed-[a-z][a-z]*/i.exec(name)) && (name.endsWith(/-[a-z][a-z]*/i.exec(name)) || name.endsWith(/-[a-z][a-z]*-[a-z]*/i.exec(name))) && (!value == '') && value == /[a-z0-9]*/i.exec(value) ) {
                    name = name.replace(/typed-/i, '').replace(/-([a-z])/gi, i => i.slice(1).toUpperCase());
                    attributesObj[name] = (value == /[0-9]*/.exec(value)) ? parseInt(value) : value;
                }
            });

            typed(element,attributesObj);
        });

        function typed($word,attributes) {
            const {
                startDelay = 2000,
                typeSpeed = 600,
                backDelay = 2000,
                backSpeed = 600,
                nextDelay  = 50,
                showCursor = 'true',
                cursorBlink = 'true',
            } = attributes;

            if (showCursor == 'false') {
                $word.find('.typed-texts').eq(0).addClass('cursor-hide');
            }
    
            if (showCursor == 'true' && cursorBlink == 'true') {
                $word.find('.typed-texts').eq(0).addClass('blink');
            }

            if (!$word.find('.typed-texts span').eq(0).hasClass('type')) {
                $word.find('.typed-texts span').eq(0).addClass('type');
            }

            const spanWrapper = $word.find('.typed-texts');
            const newWidth = spanWrapper.width() + 10;
            spanWrapper.css('width', newWidth);

            //trigger animation
            setTimeout(function() {
                hideWord($word.find('.type').eq(0));
            }, startDelay);

            function hideWord($word) {
                var nextWord = takeNext($word);
                $word.parents('.typed-texts').animate({
                    width: '1px'
                }, backSpeed, function() {
                    $word.addClass('hide');

                    setTimeout(function() {
                        switchWord($word, nextWord);
                        showWord(nextWord);
                    }, nextDelay);
                });
            }

            function showWord($word) {
                $word.parents('.typed-texts').animate({
                'width': $word.width() + 10
                }, typeSpeed, function() {
                    setTimeout(function() {
                        hideWord($word)
                        }, backDelay);
                });
            }

            function takeNext($word) {
                return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
            }
            
            function switchWord($oldWord, $newWord) {
                $oldWord.removeClass('hide');

                $oldWord.removeClass('type');
                if ($oldWord.attr('class') == '') {
                    $oldWord.removeAttr('class');
                }
                $newWord.addClass('type');
            }
        }
    }

    // Typed.js Function Call
    Typed();
});
