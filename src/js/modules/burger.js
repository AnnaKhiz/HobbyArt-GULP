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

export function catalogAdapt(){
    const sidebar = document.getElementById('sidebar');
    const sidebarMenu = document.getElementById('sidebar-menu');

    if (window.screen.width <= 768 && sidebar) {
        sidebarMenu.classList.add('bl-hidden');
        sidebar.addEventListener('click', (e) => {
            e.preventDefault();
            sidebarMenu.classList.toggle('bl-hidden');
            sidebar.classList.toggle('sidebar-button');
        })
    }
}
