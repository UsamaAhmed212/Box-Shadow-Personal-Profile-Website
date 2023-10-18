"use strict";

// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
    /*
    * Replace all SVG images with inline SVG
    */
   
    // Get all image elements with class "svg"
    var svgImg = document.querySelectorAll('img.svg');

    // If no SVG images are found or their count is zero (is empty), stop the script's execution
    if (!svgImg || svgImg.length === 0) return;

    // Iterate through each SVG image
    svgImg.forEach(function (img) {
        // Get the URL of the SVG image
        var imgURL = img.src;
        
        var imgAttributes = img.attributes;
        var imgAttributesObj = {};
        
        // Collect attributes from the original image except "src" and "alt"
        for (var i = 0; i < imgAttributes.length; i++) {
            var attribute = imgAttributes[i];
            var name = attribute.name;
            var value = attribute.value;

            if (name !== "src" && name !== "alt") imgAttributesObj[name] = value;
        }

        // Create an XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Making our connection
        xhr.open("GET", imgURL);

        // Define a function to execute after the request is successful 
        xhr.onreadystatechange = function () {
            // Check if the request is complete and successful
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                 // Get the fetched SVG content and parse it
                var svgContent = xhr.responseText;

                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(svgContent, "image/svg+xml");

                // Get the SVG tag, ignore the rest of the content
                var svg = xmlDoc.getElementsByTagName('svg')[0];

                // Set attributes from the original image on the SVG
                setAttributes(svg, imgAttributesObj);
                
                // Function to set attributes on an element
                function setAttributes(element, attributes) {
                    for (var key in attributes) {
                        element.setAttribute(key, attributes[key]);
                    }
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                svg.removeAttribute('xmlns:a');

                // Check if the viewBox is set; if not, set it for scaling
                if (!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
                    svg.setAttribute('viewBox', '0 0 ' + svg.getAttribute('width') + ' ' + svg.getAttribute('height'));
                }

                // Replace the original <img> with the new inline SVG
                if (img.parentNode) img.parentNode.replaceChild(svg, img);
            }
        };

        // Send the XMLHttpRequest to fetch the SVG content
        xhr.send();
    });
});