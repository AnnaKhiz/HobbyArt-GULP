import * as flsFunctions from "./modules/functions.js";
import * as basket from "./modules/basket.js";
import * as burger from "./modules/burger.js";
import * as likeCounter from "./modules/likes-counter-insta.js";
import * as logInFunc from "./modules/modal-registration.js";
import * as slider from "./modules/swiper.js";
import * as switcher from "./modules/switcher.js";
import * as userPage from "./modules/user-page.js";
import * as linksContent from "./modules/main-menu-pages.js";
import * as filterSearch from "./modules/filter-tovar.js";


flsFunctions.isWebp();
burger.callBurgerMenu();
burger.catalogAdapt();
filterSearch.showFilters();
filterSearch.editLinkText();
logInFunc.logInFunction();
// userPage.getFavProducts();







// popup.funcPopup();

if (document.getElementById('comments-popup')) {
    linksContent.changeMainPageContent();
}


if (document.getElementById('main-basket') || document.getElementById('product-details')) {
    basket.userBasket();
}

if (document.querySelector('.swiper')) {
    slider.swipeSlider();
}

if (document.getElementById('likes-btn')) {
    likeCounter.countLikesInsta();
}

if (document.getElementById('popular-new')) {
    switcher.switchPopularAndNew();
}

if (document.getElementById('user-page-content-block')) {
    userPage.loadUserContent();
}
