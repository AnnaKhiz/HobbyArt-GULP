export function logInFunction() {
    document.addEventListener('DOMContentLoaded', (e) => {
        const URL = 'http://localhost:3000/users/';
        let modalCallBtn = [...document.querySelectorAll(`a[data-modal="callModal"]`)];

        const modalTemplate = document.getElementById('modal');
        const modalCloseBtn = document.getElementById('closeModal');
        const contentInModalWindow = document.getElementById('scroll-on-content');
        const loginFormInnerContent = document.getElementById('login-inner-content');
        const loginFormTemplate = document.getElementById('login-form-template').innerHTML;
        const registrationFormTemplate = document.getElementById('regist-form-template').innerHTML;
        const bodyPage = document.getElementsByTagName('body')[0];
        const favProductHeader = document.getElementById('favorite-header');




        let modalRegistrationLogin;
        let registrationButton;

        if (document.getElementById('send-order')) {
            const sendOrderBtn = document.getElementById('send-order');
            const mainBasketBlock = document.getElementById('main-basket');
            const sentOrderTemplate = document.getElementById('sent-order-template').innerHTML;
            sendOrderBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mainBasketBlock.innerHTML = '';
                mainBasketBlock.innerHTML = sentOrderTemplate;
                window.scrollTo(0, 0);
                modalCallBtn = [...document.querySelectorAll(`a[data-modal="callModal"]`)];
                openLogInPage(modalCallBtn);
            })
        }

        function logIn() {

            // const callBurgerBtn = document.getElementById('callBurger');
            // callBurgerBtn.classList.add('bl-hidden');

            modalTemplate.classList.remove('show');
            bodyPage.classList.remove('fixed');
            window.location.replace('main-user-page.html');

        }

        function sendPostRequest(email, password, ifSaveUser) {
            const errorBlock = document.getElementById('enter-error-block');
            if (localStorage.getItem('token')) {
                logIn();
            } else {
                fetch('https://reqres.in/api/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(response => {
                        if (response.token) {
                            if (ifSaveUser) {
                                localStorage.setItem('token', response.token);
                            }
                            logIn();
                            return response.token;
                        } else {
                            errorBlock.innerText = 'Ошибка входа! Проверьте правильность данных или заполните все поля!'
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        errorBlock.innerText = 'Something gone wrong';
                    })
            }
        }

        function openLogInPage(element) {

            element.forEach(elem => {
                if (localStorage.getItem('token')) {
                    elem.innerText = "Кабинет";
                    favProductHeader.innerText = "Избранное";

                }
                elem.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (localStorage.getItem('token')) {
                        window.location.replace('main-user-page.html');
                    } else {
                        if (window.screen.width <= 768) {
                            const callBurgerBtn = document.getElementById('callBurger');
                            callBurgerBtn.classList.add('bl-hidden');
                        }
                        modalTemplate.classList.add('show');
                        bodyPage.classList.add('fixed');
                        logInSuccessful();
                    }

                });

            })
        }

        openLogInPage(modalCallBtn);

        function logInSuccessful() {
            modalRegistrationLogin = document.getElementById('modal-registration-login');
            modalRegistrationLogin.addEventListener('click', (e) => {
                e.preventDefault();

                const emailField = document.getElementById('user-email').value;
                const passwordField = document.getElementById('user-password').value;
                const ifSaveUser = document.getElementById('checkbox-save-user').checked;

                sendPostRequest(emailField, passwordField, ifSaveUser);
            })
        }

        function getElem() {
            contentInModalWindow.innerHTML = loginFormTemplate;
            return registrationButton = document.getElementById('regist-button');
        }

        function callRegistTemplate() {
            getElem();
            registrationButton.addEventListener('click', (e) => {
                e.preventDefault();
                contentInModalWindow.innerHTML = registrationFormTemplate;
                const loginButton = document.getElementById('login-button');
                loginButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    contentInModalWindow.innerHTML = loginFormTemplate;
                    callRegistTemplate();
                    callFormForgotPassword();
                });
            });
        }

        callRegistTemplate();

        function callFormForgotPassword() {
            const modalRegistrationForgotButton = document.getElementById('modal-registration-forgot-button');
            modalRegistrationForgotButton.addEventListener('click', (e) => {
                e.preventDefault();
                contentInModalWindow.innerHTML = forgotPasswordFormTemplate;
                const forgotPasswordButton = document.getElementById('forgot-password-button');
                sendEmail(forgotPasswordButton, contentInModalWindow);
            });
        };
        callFormForgotPassword();

        modalCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalTemplate.classList.remove('show');
            bodyPage.classList.remove('fixed');
            window.location.reload();
        });


        favProductHeader.addEventListener('click', (e) => {
            e.preventDefault();
            if (localStorage.getItem('token')) {
                window.location.replace('main-user-page.html#favorite');
            } else {
                openLogInPage(modalCallBtn);
            }
        })
    });

    const forgotPasswordFormTemplate = document.getElementById('forgot-password-form-template').innerHTML;

    function sendEmail(forgotPasswordButton, contentInModalWindow) {

        forgotPasswordButton.addEventListener('click', (e) => {
            e.preventDefault();
            const forgotPasswordEmail = document.getElementById('forgot-password-email');
            emailValidate(forgotPasswordEmail, contentInModalWindow);
        });
    }

    function emailValidate(forgotPasswordEmail, contentInModalWindow) {
        const regex = new RegExp('^[A-Za-z0-9\\.\\_\\-]+@[a-z\\.]+[a-z\\.]$');
        if (forgotPasswordEmail.value.length > 1 && forgotPasswordEmail.value !== '') {
            if (!regex.test(forgotPasswordEmail.value)) {
                console.error('email - entered forbidden symbols');
                setTimeout(() => {
                    contentInModalWindow.innerHTML = forgotPasswordFormTemplate;
                    const forgotPasswordButton = document.getElementById('forgot-password-button');
                    sendEmail(forgotPasswordButton, contentInModalWindow);
                }, 2000);
                contentInModalWindow.innerHTML = `<p class="error-message">Wrong email format.</p>
                    <p class="error-message">Example: name@gmail.com.</p>`;
            } else {
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                contentInModalWindow.innerHTML = `<p class="error-message">Your email successfully sent! Check your mailbox and try login again.</p>`;
            }
        } else {
            setTimeout(() => {
                contentInModalWindow.innerHTML = forgotPasswordFormTemplate;
                const forgotPasswordButton = document.getElementById('forgot-password-button');
                sendEmail(forgotPasswordButton, contentInModalWindow);
            }, 2000);
            contentInModalWindow.innerHTML = `<p class="error-message">Enter your email.</p>`;
        }
    }

    function exitUserPage() {
        const userPageExit = document.getElementById('user-page-exit');

        if (userPageExit) {
            userPageExit.addEventListener('click', (e) => {
                e.preventDefault();
                if (localStorage.getItem('token')) {
                    localStorage.removeItem('token');
                    window.location.replace('https://www.anna-khizhniak.site/portfolio/store-HobbyArt/');
                } else {
                    window.location.replace('https://www.anna-khizhniak.site/portfolio/store-HobbyArt/');
                }
            })
        }
    }

    exitUserPage();


}
