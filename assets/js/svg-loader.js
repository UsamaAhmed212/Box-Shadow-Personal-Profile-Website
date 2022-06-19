document.addEventListener("DOMContentLoaded", function () {
    /*
    * Replace all SVG images with inline SVG
    */
    document.querySelectorAll('img.svg').forEach(function(img) {
        var imgURL = img.src;
        var imgAttributes = img.attributes;
        var imgAttributesObj = {};

        Array.from(imgAttributes).forEach( function({name, value}) {
            if ( name != "src" && name != "alt" ) {
                imgAttributesObj[name] = value;
            }
        });

        // Creating Our XMLHttpRequest object 
        var xhr = new XMLHttpRequest();
        
        // Making our connection
        xhr.open("GET", imgURL);

        // function execute after request is successful 
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var text = this.responseText;
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(text, "text/xml");

                // Get the SVG tag, ignore the rest
                var svg = xmlDoc.getElementsByTagName('svg')[0];

                // Set Attributes
                setAttributes(svg, imgAttributesObj);
                function setAttributes(element, attributes) {
                    Object.keys(attributes).forEach(function(key) {
                        element.setAttribute(key, attributes[key]);
                    });
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                svg.removeAttribute('xmlns:a');

                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
                    svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('height') + ' ' + svg.getAttribute('width'))
                }
                
                // Replace image with new SVG
                img.parentNode.replaceChild(svg, img);
            }
        }

        // Sending our request 
        xhr.send();
    }); 
});