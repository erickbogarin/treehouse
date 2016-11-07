(function() {

    var imgs = document.querySelectorAll('section[data-src]'),
        img = new Image(),
        srcImage = '';

    for(var i = 0 ; i < imgs.length; i++) {
        srcImage = imgs[i].getAttribute('data-src');

        img.onload = (function(value) {
            return function() {
                // Applies background-image style only when the image is loaded
                imgs[value]
                    .style.backgroundImage =
                        "linear-gradient(" +
                            "rgba(0, 0, 0, 0.6)," +
                            "rgba(0, 0, 0, 0.6))," +
                        "url("+srcImage+")";
            }
        })(i);
        img.src= window.location.protocol + srcImage;
    }

})();
