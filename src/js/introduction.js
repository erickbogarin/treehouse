(function() {

    var loading = document.querySelectorAll('.loading')[0];    
    var btnIntro = document.getElementById('btn-intro');
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
                
                imgs[value].dataset.state = 'is-visible';
                btnIntro.dataset.state = 'is-visible';
                loading.dataset.state = 'is-hidden';                        
            }
        })(i);
        img.src= window.location.protocol + srcImage;
    }

})();
