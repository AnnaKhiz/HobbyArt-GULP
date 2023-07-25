export function loadUserContent() {
    const URL = 'http://localhost:3000/users/';
    const userDataTemplate = document.getElementById('user-data-template').innerHTML;
    const bonusesTemplate = document.getElementById('bonuses-template').innerHTML;
    const mailingTemplate = document.getElementById('mailing-template').innerHTML;
    const cancelMailing = document.getElementById('no-mailing-template').innerHTML;
    const favoritesTemplate = document.getElementById('favorites-template').innerHTML;
    const storyOrdersTemplate = document.getElementById('story-orders-template').innerHTML;
    const reviewTemplate = document.getElementById('review-template').innerHTML;
    const myData = document.getElementById('my-data');
    const bonuses = document.getElementById('bonuses');
    const mailing = document.getElementById('mailing');
    const favorites = document.getElementById('favorites');
    const storyOrders = document.getElementById('story-orders');
    const reviewButton = document.getElementById('review');
    const containerWithData = document.getElementById('user-page-date-block');
    const favProductHeader = document.getElementById('favorite-header');


    let newOrdersArr = [];
    let newListArr = [];
    let newItemListArray = [];
    let viewMoreStoryOrder = [];
// let orderItemsBlockContent = [];

//get user info - general
    function getUserData() {
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                containerWithData.innerHTML = '';
                // console.log('i got users data');
                data.forEach((element, i) => {
                    const newUserDataTemplate = userDataTemplate
                        .replace('{{user-name}}', element.firstName)
                        .replace('{{user-last-name}}', element.lastName)
                        .replace('{{user-sur-name}}', element.surName)
                        .replace('{{birth-date}}', element.birthDate)
                        .replace('{{phone-number}}', element.phone)
                        .replace('{{email}}', element.email)
                        .replace('{{address}}', element.address)
                        .replace('{{password}}', element.password);
                    containerWithData.insertAdjacentHTML('beforeend',
                        `${newUserDataTemplate}`);
                    const linksEdit = [...document.querySelectorAll('.main__user-page-content-user-edit-link')];
                    linksEdit.forEach((elem, index) => {
                        elem.id = `edit-link-${++index}`;
                    })
                })
            })
    }


    if (containerWithData && window.location.href === 'http://localhost:5000/main-user-page.html#favorite') {
        getFavoritesProducts();
    } else if (containerWithData && window.location.href === 'http://localhost:5000/main-user-page.html') {
        getUserData();
    }


    myData.addEventListener('click', (e) => {
        e.preventDefault();
        getUserData();

        containerWithData.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById(e.target.dataset.input).focus();
            // console.log(document.getElementById(e.target.dataset.input).focus());
            let editButtonClicked = document.getElementById(e.target.id);
            editButtonClicked.innerHTML = '<img src="../img/edit.svg" alt=\\"\\">';

            const saveEditedDataBtn = document.getElementById('save-edited-data-btn');
            //save editted data (button save)
            saveEditedDataBtn.addEventListener('click', (e) => {
                e.preventDefault();

                fetch(`${URL}1`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        firstName: document.getElementById('user-name').value,
                        lastName: document.getElementById('user-surname').value,
                        surName: document.getElementById('user-surname-2').value,
                        birthDate: document.getElementById('user-birth-date').value,
                        phone: document.getElementById('user-phone').value,
                        email: document.getElementById('user-page-email').value,
                        address: document.getElementById('user-address').value,
                        password: document.getElementById('user-page-password').value,
                    }),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(res => {
                        // editButtonClicked.innerText = 'Изменить';
                        editButtonClicked.innerHTML = '<img src="../img/edit.svg" alt=\\"\\">Изменить'
                        saveEditedDataBtn.innerText = 'Сохранено';
                        setTimeout(() => {
                            saveEditedDataBtn.innerText = 'Сохранить данные';
                        }, 2000);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        })

    });


    bonuses.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                containerWithData.innerHTML = '';
                console.log('i got users bonuses');
                data.forEach(element => {
                    console.log(element.bonuses);
                    const newBonusesTemplate = bonusesTemplate.replace('{{bonuses}}', element.bonuses);
                    containerWithData.insertAdjacentHTML('beforeend', `${newBonusesTemplate}`);
                })
            })
    })

    favorites.addEventListener('click', (e) => {
        e.preventDefault();
        getFavoritesProducts();
    })

    function getFavoritesProducts() {
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                const favArray = data[0].favorites.listItems;
                containerWithData.innerHTML = '';
                favArray.forEach(element => {
                    const newFavoritesTemplate = favoritesTemplate
                        .replace('{{id}}', element.id)
                        .replace('{{image}}', element.photo)
                        .replace('{{product-name}}', element.name)
                        .replace('{{product-price}}', element.price);
                    containerWithData.insertAdjacentHTML('beforeend', `${newFavoritesTemplate}`);
                    if (containerWithData.classList.contains('display-block')) {
                        containerWithData.classList.remove('display-block');
                    }
                })
            })
    }

    function getDataForMailing() {
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                data.forEach(el => {
                    if (el.mailing == 'false') {
                        containerWithData.innerHTML = mailingTemplate;
                        const subscribe = document.getElementById('subscribe');
                        subscribe.addEventListener('click', (e) => {
                            e.preventDefault();
                            changeMailingStatus(subscribe, "true", cancelMailing);
                        })
                    } else {
                        containerWithData.innerHTML = cancelMailing;
                        const cancelMailingBtn = document.getElementById('cancel-mailing');
                        cancelMailingBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            changeMailingStatus(cancelMailingBtn, "false", mailingTemplate);
                        })
                    }
                })
            })
    }

    mailing.addEventListener('click', (e) => {
        e.preventDefault();
        getDataForMailing();
    })

    function changeMailingStatus(button, status, template) {
        fetch(`${URL}1`, {
            method: 'PATCH',
            body: JSON.stringify({
                mailing: status,
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                containerWithData.innerHTML = template;
            })
            .then(res => {
                if (template == cancelMailing) {
                    const cancelMailingBtn = document.getElementById('cancel-mailing');
                    getDataForMailing(cancelMailingBtn);
                } else {
                    const subscribe = document.getElementById('subscribe');
                    getDataForMailing(subscribe);
                }
            })
            .catch(error => console.log(error));
    }

    storyOrders.addEventListener('click', (e) => {
        e.preventDefault();
        let orderItemsBlockContent = []
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                containerWithData.innerHTML = '';
                newOrdersArr = data.map(element => {
                    newListArr = element.orders.list;
                    return [...newListArr]
                })
                viewMoreStoryOrder = []

                newListArr.forEach(el => {
                    const newUserOrderTemplate = storyOrdersTemplate
                        .replaceAll('{{id}}', el.id)
                        .replace('{{number}}', el.number)
                        .replace('{{data}}', el.data)
                        .replace('{{timeCreated}}', el.timeCreated)
                        .replace('{{sumQuantity}}', el.sumQuantity)
                        .replace('{{total}}', el.total)
                        .replace('{{dataFinished}}', el.dataFinished);

                    containerWithData.insertAdjacentHTML('beforeend',
                        `${newUserOrderTemplate}`);

                    if (!containerWithData.classList.contains('display-block')) {
                        containerWithData.classList.add('display-block');
                    }

                    viewMoreStoryOrder.push(document.getElementById(`view-more-${el.id}`));
                    orderItemsBlockContent.push(document.getElementById(`order-items-block-template-${el.id}`));
                })

                let orderItemsTemplate = document.getElementById('order-items-template').innerHTML;

                //событие на каждую из ссылок подробнее
                viewMoreStoryOrder.forEach((element, i) => {
                    //присваиваю стрелке id. беру его из dataset arrow

                    let elementChildren = [...element.children]
                    elementChildren.forEach((e, index) => {
                        if (e.localName === 'img') {
                            elementChildren = index
                        }
                        return elementChildren
                    })
                    element.children[elementChildren].id = element.dataset.arrow;
                    let arrow = document.getElementById(`${element.dataset.arrow}`);

                    //вешаю событие клика на каждую из кнопок "подробнее"
                    element.addEventListener('click', (e) => {
                        arrow.classList.toggle("rotate");
                        e.preventDefault();

                        fetch(URL)
                            .then(res => res.json())
                            .then(data => {
                                //массив из заказов
                                newOrdersArr = data.map((element, index) => {
                                    newListArr = element.orders.list;
                                    return [...newListArr];
                                })
                                //делаю перебор по содержимому (товары-content) каждого заказа
                                if (element.dataset.orderItems === `order-items-${i + 1}`) {
                                    orderItemsBlockContent[i].classList.toggle("non-visible")
                                    orderItemsBlockContent[i].innerText = '';

                                    newListArr[i].content.forEach(elem => {

                                        const newContentTemplate = orderItemsTemplate
                                            .replaceAll('{{id}}', elem.id)
                                            .replace('{{image}}', elem.image)
                                            .replace('{{item-name}}', elem.name)
                                            .replace('{{quantity}}', elem.quantity)
                                            .replace('{{price}}', elem.price);
                                        orderItemsBlockContent[i].insertAdjacentHTML('beforeend',
                                            `${newContentTemplate}`);
                                    })
                                }
                            })
                    })
                })
            });
    })


//заголовок раздела
    // const blockHeaderTemplate = document.getElementById('block-header-template').innerHTML;
    // const newHeaderTemplate = blockHeaderTemplate
    //     .replace('{{header-template}}', data[0].orders.header);
    // containerWithData.insertAdjacentHTML('beforebegin',
    //     `${newHeaderTemplate}`);


    reviewButton.addEventListener('click', (e) => {
        e.preventDefault();
        containerWithData.innerHTML = reviewTemplate;
    })
}

// export function getFavProducts() {
//     const favProductHeader = document.getElementById('favorite-header');
//
//     favProductHeader.addEventListener('click', (e) => {
//         e.preventDefault();
//         // console.log('clicked')
//         if (localStorage.getItem('token')) {
//             // history.pushState(null, null, 'main-user-page.html')
//             window.location.replace('main-user-page.html');
//         } else {
//
//             return false
//         }
//         // if (location.href === 'https://www.anna-khizhniak.site/portfolio/store-HobbyArt/main-user-page.html') {
//         //     getFavoritesProducts();
//         // }
//
//     })
// }


