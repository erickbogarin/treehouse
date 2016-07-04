function scrollBanner() {
  var scrollPos;
  var headerText = document.querySelector('.introdution');
  scrollPos = window.scrollY;


  headerText.style.opacity = 1 - (scrollPos/600);

}
window.addEventListener('scroll', scrollBanner);
