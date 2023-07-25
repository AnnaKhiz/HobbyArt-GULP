export function userBasket() {

    let dataPrice;
    let searchElem = [];
    let searchPrice = [];
    const regexp = /[^0-9]/g;

    const elDeliveryPrice = document.getElementById('delivery-price');
    let deliveryPriceDigit = elDeliveryPrice.innerText.replace(regexp, "");

    const elDiscount = document.getElementById('discount');
    let discountDigit = elDiscount.innerText.replace(regexp, "");

    const elTotalSumDiscount = document.getElementById('total-sum-discount');
    let totalSumDiscountDigit = elTotalSumDiscount.innerText.replace(regexp, "");

    document.addEventListener('DOMContentLoaded', (e) => {
        const elTotalSum = document.getElementById('total-sum');
        let totalSumDigit = +elTotalSum.innerText.replace(regexp, "");

        const headerBlock = document.getElementById('header');
        headerBlock.classList.add('bg-white');

        const itemsArray = [...document.querySelectorAll('[data-check="count-block"]')];
        countTotalPrice(itemsArray);

        document.addEventListener('click', (e) => {
            let dataId = e.target.dataset.name;
            totalSumDigit = +0;
            let count = document.querySelector(dataId);
            let element = document.querySelector(`[data-name="${dataId}"]>span.result`);
            //беру из строки сумму товара без обозначения валюты
            let elPrice = document.querySelector(`[data-name="${dataId}"]+[data-price="basket-item-price"]`);
            let priceDigit = elPrice.innerText.replace(regexp, "");
            //записываю в дата атрибут блока изначальную стоимость товара
            if (!elPrice.dataset.currentCount) {
                elPrice.dataset.currentCount = priceDigit;
                dataPrice = elPrice.dataset.currentCount;
            } else {
                dataPrice = elPrice.dataset.currentCount
            }

            //считаю + и - и вывожу итоговую сумму по каждому товару
            if (e.target.classList.contains('plus')) {
                element.innerText = ++element.innerText;
                let multPrices = dataPrice * element.innerText;
                elPrice.innerText = `${multPrices} ₽`;
                countTotalPrice(itemsArray);
            } else if (e.target.classList.contains('minus')) {
                if (element.innerText <= 1) {
                    element.innerText = '1';
                    elPrice.innerText = `${dataPrice} ₽`;
                    countTotalPrice(itemsArray);
                } else {
                    element.innerText = element.innerText - 1;
                    elPrice.innerText = `${priceDigit - dataPrice} ₽`;
                    countTotalPrice(itemsArray);
                }
            }

        });

        function countTotalPrice(array) {
            array.forEach((element) => {
                searchElem = [...element.children];
                searchElem.forEach((el) => {
                    if (el.dataset.price) {
                        searchPrice = +el.innerText.replace(regexp, "");
                        totalSumDigit += +searchPrice;
                        elTotalSum.innerText = `${totalSumDigit} ₽`;//получила сумму товаров в корзине при загрузке страницы
                        elTotalSumDiscount.innerText = `${(+deliveryPriceDigit + +totalSumDigit) - discountDigit} ₽`
                    }
                })
            })
        }

    });

}











