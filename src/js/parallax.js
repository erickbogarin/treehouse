(function () {

    // fires events every 200ms
    function throttle(fn) {
        fn.running = false;

        return function() {
            if(fn.run) return;
            fn.running = true;
            setTimeout(function() {
                fn.running = false;
            }, 200);

            fn();
        };
    }

    if(screen && screen.width > 900) {
        // header parallax
        function scrollHeader() {
          var header = document.querySelector('.introdution');
          var headerText = document.querySelector('.introdution-title');
          var scrollPos = window.scrollY;

          if (scrollPos <= 600) {
              header.style.transform =  "translateY(" + (-scrollPos/3) +"px" + ")";
              header.style.opacity = 1 - (scrollPos/600);
              headerText.style.transform = "translateX(" + (scrollPos/3) +"px" + ")";
              headerText.style.opacity = 1 - (scrollPos/600);
          }
        }
        window.addEventListener('scroll', throttle(scrollHeader));

        // float parallax in .service .item-x
        function scrollItems() {

            var wScroll = window.scrollY;
            var styleItemLeft = document.querySelector('.item-1').style;
            var styleItemRight = document.querySelector('.item-3').style;

            var elementTop =  document.querySelector('.service').getBoundingClientRect().top;
            if(wScroll > elementTop - window.innerHeight){
                var offset = (Math.min(0, wScroll - elementTop + window.innerHeight - 350)).toFixed();

                styleItemLeft.transform = 'translate('+ offset +'px, '+ Math.abs(offset * 0.2) +"px" + ")";
                styleItemRight.transform = 'translate('+ Math.abs(offset) +'px, '+ Math.abs(offset * 0.2) +"px" + ")";
            }

        }
        window.addEventListener('scroll', throttle(scrollItems));
    }

})();
