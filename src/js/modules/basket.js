export function userBasket() {
    const URL = 'http://localhost:3000/tovar/';
// const buyButton = document.getElementById('add-to-basket-btn');


    let dataPrice;
    let searchElem = [];
    let searchPrice = [];
    const regexp = /[^0-9]/g;

    // const elTotalSum = document.getElementById('total-sum');
    // let totalSumDigit = +elTotalSum.innerText.replace(regexp, "");
    const elDeliveryPrice = document.getElementById('delivery-price');
    let deliveryPriceDigit = elDeliveryPrice.innerText.replace(regexp, "");

    const elDiscount = document.getElementById('discount');
    let discountDigit = elDiscount.innerText.replace(regexp, "");

    const elTotalSumDiscount = document.getElementById('total-sum-discount');
    let totalSumDiscountDigit = elTotalSumDiscount.innerText.replace(regexp, "");
    console.log(totalSumDiscountDigit);

    document.addEventListener('DOMContentLoaded', (e) => {
        const elTotalSum = document.getElementById('total-sum');
        let totalSumDigit = +elTotalSum.innerText.replace(regexp, "");

        const headerBlock = document.getElementById('header');
        headerBlock.classList.add('bg-white');

        const itemsArray = [...document.querySelectorAll('[data-check="count-block"]')];
        console.log(itemsArray);
        countTotalPrice(itemsArray);
        console.log(totalSumDigit);

        document.addEventListener('click', (e) => {
            // e.preventDefault();
            let dataId = e.target.dataset.name;
            totalSumDigit = +0;
            let count = document.querySelector(dataId);
            // console.log(count)
            let element = document.querySelector(`[data-name="${dataId}"]>span.result`);
            // console.log(element)
            //беру из строки сумму товара без обозначения валюты
            let elPrice = document.querySelector(`[data-name="${dataId}"]+[data-price="basket-item-price"]`);
            let priceDigit = elPrice.innerText.replace(regexp, "");

            // console.log(elPrice)

            //записываю в дата атрибут блока изначальную стоимость товара
            if (!elPrice.dataset.currentCount) {
                elPrice.dataset.currentCount = priceDigit;
                dataPrice = elPrice.dataset.currentCount;
            } else {
                dataPrice = elPrice.dataset.currentCount
            }


            // console.log(dataPrice)

            // console.log(epPriceTotal)
            //считаю + и - и вывожу итоговую сумму по каждому товару
            if (e.target.classList.contains('plus')) {
                // console.log(e.target.classList)
                element.innerText = ++element.innerText;
                let multPrices = dataPrice * element.innerText;
                elPrice.innerText = `${multPrices} ₽`;
                countTotalPrice(itemsArray);
            } else if (e.target.classList.contains('minus')) {
                console.log(e.target.classList)
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
                // console.log([...element.children])
                searchElem = [...element.children];
                searchElem.forEach((el) => {
                    if (el.dataset.price) {
                        searchPrice = +el.innerText.replace(regexp, "");
                        // console.log(searchPrice);
                        totalSumDigit += +searchPrice;
                        // console.log(totalSumDigit);
                        elTotalSum.innerText = `${totalSumDigit} ₽`;//получила сумму товаров в корзине при загрузке страницы
                    }
                })
            })
        }

    });

}











