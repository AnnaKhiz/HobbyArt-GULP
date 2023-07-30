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

export function showFilters() {
    const filterShowButton = document.getElementById('filter-show-button')
    const searchSidebarContent = document.getElementById('search-sidebar');
    if (window.screen.width <= 768 && searchSidebarContent) {
        searchSidebarContent.classList.add('bl-hidden');
        filterShowButton.addEventListener('click', (e) => {
            e.preventDefault();
            searchSidebarContent.classList.toggle('bl-hidden');
        });
    }
}
