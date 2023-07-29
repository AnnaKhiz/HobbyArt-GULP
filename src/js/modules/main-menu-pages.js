export function changeMainPageContent() {
    const API_URL = 'https://reqres.in/api/users/2';
    const commentInsta = document.getElementById('comments-popup');
    // console.log(commentInsta)


    commentInsta.addEventListener('click', (e) => {
        e.preventDefault();

        const windowParam = 'width=700px, height=400px, left=500, top=500';
        let popUpWindow = window.open('', '_blank', windowParam);
        const curDocument = popUpWindow.document;

        const popupTemplate = document.getElementById('popup-template');

        curDocument.write(`${popupTemplate.innerHTML}`)


        let head = curDocument.getElementsByTagName('head')[0]


        function includeCSS() {
            let style = curDocument.createElement('link');
            style.href = 'css/style.css';
            style.rel = 'stylesheet';
            head.appendChild(style)
        }
        includeCSS()

        const systemMessages = curDocument.getElementById('system-messages');
        const popupTextarea = curDocument.getElementById('popup-textarea');
        let symbolCount = curDocument.getElementById('symbol-count');

        popupTextarea.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (symbolCount.innerText >= '1') {
                symbolCount.innerText = --symbolCount.innerText;
            } else {
                symbolCount.innerText = '0';
                return false
            }
        })

        const popupSubmit = curDocument.getElementById('popup-submit');

        popupSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            fetch(API_URL, {
                method: 'PATCH',
                body: JSON.stringify({
                    text: popupTextarea.value,
                }),
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => {
                    checkField(res.status, popupTextarea.value)
                })
        })

        function checkField(res, value) {
            if (res == '200' && value != '' && value.length >= '10') {
                systemMessages.innerHTML = "Комментарий успешно отправлен!";
                setTimeout(() => {
                    popUpWindow.close();
                }, 2000)
            } else if (value.length == '0' || value.length < '10')  {
                systemMessages.innerHTML = "Введите ваш комментарий! Длина сообщения должна быть больше 10 символов!";
            } else if (res != '200') {
                systemMessages.innerHTML = "Ошибка отправки!";
            }
        }

    })


}




