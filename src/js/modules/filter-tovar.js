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

export function editLinkText() {
    const linkUp = document.getElementById('price-up-link');
    const linkDown = document.getElementById('price-down-link');
    const sidebarElement = document.getElementById('search-sidebar');
    if (window.screen.width <= 500 && sidebarElement) {
        linkUp.innerText = '↓';
        linkDown.innerText = '↑';
    }
}