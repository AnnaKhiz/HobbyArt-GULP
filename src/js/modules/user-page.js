export function loadUserContent() {
    const URL = 'https://anna-khizhniak.site/database/hobbyart/database-json.json';
    const APIURL = 'https://reqres.in/api/users/2';
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
    const userNameInfoBlock = document.getElementById('user-name-info');
    const userMenuList = document.getElementById('user-menu-list');


    let newOrdersArr = [];
    let newListArr = [];
    let viewMoreStoryOrder = [];

    if (window.screen.width <= 768 && containerWithData) {
        userMenuList.classList.add('bl-hidden');
        userNameInfoBlock.classList.add('user-block-header');
        const userPageExit = document.getElementById('user-page-exit');
        userPageExit.innerText = '';
        userNameInfoBlock.addEventListener('click', (e) => {
            e.preventDefault();
            userMenuList.classList.toggle('bl-hidden');
            userNameInfoBlock.classList.toggle('user-block-header');
        })
    }

    function getUserData() {
        fetch(URL)
            .then(res => res.json())
            .then(result => {
                containerWithData.innerHTML = '';
                let data = result.users;
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


    if (containerWithData && window.location.href === 'https://www.anna-khizhniak.site/portfolio/store-HobbyArt/main-user-page.html#favorite') {
        getFavoritesProducts();
    } else if (containerWithData && window.location.href === 'https://www.anna-khizhniak.site/portfolio/store-HobbyArt/main-user-page.html') {
        getUserData();
    }


    myData.addEventListener('click', (e) => {
        e.preventDefault();
        getUserData();
    });

    containerWithData.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById(e.target.dataset.input).focus();
        let editButtonClicked = document.getElementById(e.target.id);
        editButtonClicked.innerHTML = '<img src="img/edit.svg" alt=\\"\\">';

        const saveEditedDataBtn = document.getElementById('save-edited-data-btn');

        saveEditedDataBtn.addEventListener('click', (e) => {
            e.preventDefault();

            fetch(APIURL, {
                method: 'PATCH',
                body: JSON.stringify({
                    id: "1",
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
                    'content-type': 'application/json',
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        editButtonClicked.innerHTML = '<img src="img/edit.svg" alt=\\"\\">Изменить'
                        saveEditedDataBtn.innerText = 'Сохранено';
                        setTimeout(() => {
                            saveEditedDataBtn.innerText = 'Сохранить данные';
                        }, 2000);
                    }
                })
                .catch(err => console.log(err));
        })
    });


    bonuses.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(URL)
            .then(res => res.json())
            .then(result => {
                containerWithData.innerHTML = '';
                let data = result.users;
                data.forEach(element => {
                    const newBonusesTemplate = bonusesTemplate.replace('{{bonuses}}', element.bonuses);
                    containerWithData.insertAdjacentHTML('beforeend', `${newBonusesTemplate}`);
                })
            })
    });

    favorites.addEventListener('click', (e) => {
        e.preventDefault();
        getFavoritesProducts();
    });

    function getFavoritesProducts() {
        fetch(URL)
            .then(res => res.json())
            .then(result => {
                let data = result.users;
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
            .then(result => {
                let data = result.users;
                data.forEach(el => {
                    if (el.mailing == 'false') {
                        containerWithData.innerHTML = mailingTemplate;
                        const subscribe = document.getElementById('subscribe');
                        subscribe.addEventListener('click', (e) => {
                            e.preventDefault();
                            changeMailingStatus(subscribe, "true", cancelMailing);
                        })
                    }
                    //фрагмент кода для работы с БД, когда можно изменить данные клиента.
                    // else {
                    //     containerWithData.innerHTML = cancelMailing;
                    //     const cancelMailingBtn = document.getElementById('cancel-mailing');
                    //     cancelMailingBtn.addEventListener('click', (e) => {
                    //         e.preventDefault();
                    //         changeMailingStatus(cancelMailingBtn, "false", mailingTemplate);
                    //     })
                    // }
                })
            })
    }

    mailing.addEventListener('click', (e) => {
        e.preventDefault();
        getDataForMailing();
    })

    function changeMailingStatus(button, status, template) {
        fetch(APIURL, {
            method: 'PATCH',
            body: JSON.stringify({
                // mailing: status,
                "name": "morpheus",
                "job": "zion resident"
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    containerWithData.innerHTML = template;
                }
            })
            //фрагмент кода для работы с БД, когда можно изменить данные клиента.
            // .then(res => {
            //     if (template == cancelMailing) {
            //         const cancelMailingBtn = document.getElementById('cancel-mailing');
            //         getDataForMailing(cancelMailingBtn);
            //     } else {
            //         const subscribe = document.getElementById('subscribe');
            //         getDataForMailing(subscribe);
            //     }
            // })
            .catch(error => console.log(error));
    }

    storyOrders.addEventListener('click', (e) => {
        e.preventDefault();
        let orderItemsBlockContent = []
        fetch(URL)
            .then(res => res.json())
            .then(result => {
                let data = result.users;
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

                viewMoreStoryOrder.forEach((element, i) => {
                    let elementChildren = [...element.children]
                    elementChildren.forEach((e, index) => {
                        if (e.localName === 'img') {
                            elementChildren = index
                        }
                        return elementChildren
                    })
                    element.children[elementChildren].id = element.dataset.arrow;
                    let arrow = document.getElementById(`${element.dataset.arrow}`);

                    element.addEventListener('click', (e) => {
                        arrow.classList.toggle("rotate");
                        e.preventDefault();
                        fetch(URL)
                            .then(res => res.json())
                            .then(result => {
                                let data = result.users;
                                newOrdersArr = data.map((element, index) => {
                                    newListArr = element.orders.list;
                                    return [...newListArr];
                                })
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

    reviewButton.addEventListener('click', (e) => {
        e.preventDefault();
        containerWithData.innerHTML = reviewTemplate;
    })
}



