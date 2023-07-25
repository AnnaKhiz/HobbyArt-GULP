export function callBurgerMenu() {
    $(document).ready(function () {

        $("#callBurger").on('click', (event) => {
            $('#burger').toggleClass('show');
            $('body').toggleClass('fixed');
            $('.burger__list-menu').toggleClass('scroll');
            event.preventDefault();
        });
    });

    let menuBtn = document.querySelector('.menu__btn');
    let menu = document.querySelector('.burger');
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    });
}
