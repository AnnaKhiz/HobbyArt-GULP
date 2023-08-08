export function userBasket() {

    let dataPrice;
    let searchElem = [];
    let searchPrice = [];
    const regexp = /[^0-9]/g;

    document.addEventListener('DOMContentLoaded', (e) => {
        if (document.getElementById('product-details')) {
            const currentPage = document.getElementById('about-details');
            currentPage.addEventListener('click', (e) => {
                let element = document.querySelector(`[data-name="${e.target.dataset.name}"]>span.result`);
                let elPrice = document.querySelector(`[data-name="${e.target.dataset.name}"]+[data-price="basket-item-price"]`);
                let priceDigit = elPrice.innerText.replace(regexp, "");
                if (!elPrice.dataset.currentCount) {
                    elPrice.dataset.currentCount = priceDigit;
                    dataPrice = elPrice.dataset.currentCount;
                } else {
                    dataPrice = elPrice.dataset.currentCount;
                }

                if (e.target.dataset.name) {
                    if (e.target.classList.contains('plus')) {
                        element.innerText = ++element.innerText;
                        let multPrices = dataPrice * element.innerText;
                        elPrice.innerText = `${multPrices} ₽`;
                    } else if (e.target.classList.contains('minus')) {
                        if (element.innerText <= 1) {
                            element.innerText = '1';
                            elPrice.innerText = `${dataPrice} ₽`;
                        } else {
                            element.innerText = element.innerText - 1;
                            elPrice.innerText = `${priceDigit - dataPrice} ₽`;
                        }
                    }
                }
            })
        } else {
            const countProducts = document.getElementById('count-products');
            const elDeliveryPrice = document.getElementById('delivery-price');
            let deliveryPriceDigit = elDeliveryPrice.innerText.replace(regexp, "");

            const elDiscount = document.getElementById('discount');
            let discountDigit = elDiscount.innerText.replace(regexp, "");

            const elTotalSumDiscount = document.getElementById('total-sum-discount');
            let totalSumDiscountDigit = elTotalSumDiscount.innerText.replace(regexp, "");


            const elTotalSum = document.getElementById('total-sum');
            let totalSumDigit = +elTotalSum.innerText.replace(regexp, "");

            const headerBlock = document.getElementById('header');
            headerBlock.classList.add('bg-white');

            let itemsArray = [...document.querySelectorAll('[data-count="count-block"]')];
            countTotalPrice(itemsArray);

            let delButtonsArray = [...document.querySelectorAll('[data-delete="basket-item-delete"]')];
            deleteItem(delButtonsArray);

            let countButton = [...document.querySelectorAll('button>span.result')];
            countTotalItems(countButton);

            document.addEventListener('click', (e) => {
                let dataId = e.target.dataset.name;
                totalSumDigit = +0;

                let element = document.querySelector(`[data-name="${dataId}"]>span.result`);
                let elPrice = document.querySelector(`[data-name="${dataId}"]+[data-price="basket-item-price"]`);
                let priceDigit = elPrice.innerText.replace(regexp, "");

                if (!elPrice.dataset.currentCount) {
                    elPrice.dataset.currentCount = priceDigit;
                    dataPrice = elPrice.dataset.currentCount;
                } else {
                    dataPrice = elPrice.dataset.currentCount
                }

                if (e.target.dataset.name) {
                    itemsArray = [...document.querySelectorAll('[data-count="count-block"]')];
                    countButton = [...document.querySelectorAll('button>span.result')];
                    if (e.target.classList.contains('plus')) {
                        element.innerText = ++element.innerText;
                        let multPrices = dataPrice * element.innerText;
                        elPrice.innerText = `${multPrices} ₽`;
                        countTotalPrice(itemsArray);
                        countTotalItems(countButton);
                    } else if (e.target.classList.contains('minus')) {
                        if (element.innerText <= 1) {
                            element.innerText = '1';
                            elPrice.innerText = `${dataPrice} ₽`;
                            countTotalPrice(itemsArray);
                            countTotalItems(countButton);
                        } else {
                            element.innerText = element.innerText - 1;
                            elPrice.innerText = `${priceDigit - dataPrice} ₽`;
                            countTotalPrice(itemsArray);
                            countTotalItems(countButton);
                        }
                    }
                }
            });

            function countTotalPrice(array) {
                if (array.length === 0) {
                    elTotalSum.innerText = '0';
                    elTotalSumDiscount.innerText = '229 ₽';
                    countProducts.innerText = '0';
                } else {
                    array.forEach((element) => {
                        searchElem = [...element.children];
                        searchElem.forEach((el) => {
                            if (el.dataset.price) {
                                searchPrice = +el.innerText.replace(regexp, "");
                                totalSumDigit += +searchPrice;
                                elTotalSum.innerText = `${totalSumDigit} ₽`;
                                elTotalSumDiscount.innerText = `${(+deliveryPriceDigit + +totalSumDigit) - discountDigit} ₽`
                            }
                        })
                    })
                }

            }

            function countTotalItems(array) {
                countProducts.innerText = +0;
                array.forEach((element) => {
                    let countProductDigit = +countProducts.innerText
                    countProductDigit += +element.innerText;
                    countProducts.innerText = `${countProductDigit}`;
                })
            }

            function deleteItem(array) {
                let itemsDelArray;
                    array.forEach((element) => {
                        element.addEventListener('click', (e) => {
                            totalSumDigit = +0;
                            e.preventDefault();
                            searchElem = element.parentElement.parentElement;
                            searchElem.remove();
                            if (!searchElem.isConnected) {
                                let delButtonsArray = [...document.querySelectorAll('[data-delete="basket-item-delete"]')];
                                if (delButtonsArray.length < 3) {
                                    itemsDelArray = [...document.querySelectorAll('[data-count="count-block"]')];
                                    countTotalPrice(itemsDelArray);
                                    let delCountButton = [...document.querySelectorAll('button>span.result')];
                                    countTotalItems(delCountButton);
                                }
                            }
                        })
                    })
            }
        }
    });

}