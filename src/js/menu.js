$headerMenuOpen = document.querySelector('.header-menu-open');

$headerMenuOpen.onclick = function() {
    document.documentElement.classList.add('menu-active');
};

document.querySelector('.header-menu-close').onclick = function() {
    document.documentElement.classList.remove('menu-active');
};

document.documentElement.onclick = function(event) {
    if (event.target === document.documentElement) {
        document.documentElement.classList.remove('menu-active');
    }
};
