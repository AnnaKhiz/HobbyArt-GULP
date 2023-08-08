
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

        modalTemplate.classList.add('scroll');


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
                        window.location.replace('https://www.anna-khizhniak.site/portfolio/store-HobbyArt/main-user-page.html');
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
                validationUserData();
                const sendRegisteredData = document.getElementById('send-registered-data');
                sendRegisteredData.addEventListener('click', (e) => {
                   e.preventDefault();
                   fetch('https://reqres.in/api/register', {
                       method: 'POST',
                       body: JSON.stringify({
                           // userName: document.getElementById('user-name-reg').value,
                           // userLastName: document.getElementById('user-last-name-reg').value,
                           // userSurName: document.getElementById('user-sur-name-reg').value,
                           // phone: document.getElementById('regist-user-phone-reg').value,
                           // email: document.getElementById('user-email-reg').value,
                           // password: document.getElementById('regist-user-password-reg').value,
                           // confirmPassword: document.getElementById('user-confirm-password-reg').value,
                           "email": "eve.holt@reqres.in",
                           "password": "pistol"
                       }),
                       headers: {
                           'content-type': 'application/json'
                       }
                   })
                       .then(response => response.json())
                       .then(res => {
                           console.log(res)
                           if (res.token) {
                               setTimeout(() => {
                                   contentInModalWindow.innerHTML = forgotPasswordFormTemplate;
                                   const innerContent = document.getElementById('forgot-password-inner-content');
                                   innerContent.innerText = '';
                                   innerContent.innerHTML = '<p class="error-message">Регистрация прошла успешно!</p>';
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1500);
                               }, 100);
                           }
                       })
                })
                const loginButton = document.getElementById('login-button');
                loginButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    contentInModalWindow.innerHTML = '';
                    contentInModalWindow.innerHTML = loginFormTemplate;
                    callRegistTemplate();
                    callFormForgotPassword();
                    logInSuccessful();
                });
            });
        }
        callRegistTemplate();

        function validationUserData() {
            const regexName = new RegExp('^[A-Za-zА-Яа-яЁёЁЇїІіЄєҐґ]{2,15}$');
            const regexTelephone = new RegExp('^(\\+)[\\d]{10,13}\\d$');
            const regexEmail = new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$');
            const regexPassword = new RegExp('^(?=(?:[^A-Z]*[A-Z]){1,}[^A-Z]*$)(?=(?:[^a-z]*[a-z]){1,}[^a-z]*$)(?=(?:\\D*\\d){1,}\\D*$)[A-Za-z\\d]{6,}$');
            const sendRegisteredData = document.getElementById('send-registered-data');
            const userName = document.getElementById('user-name-reg');
            const userLastName = document.getElementById('user-last-name-reg');
            const userSurName = document.getElementById('user-sur-name-reg');
            const userPhone = document.getElementById('regist-user-phone-reg');
            const userEmail = document.getElementById('user-email-reg');
            const userPassword = document.getElementById('regist-user-password-reg');
            const userConfirmPassword = document.getElementById('user-confirm-password-reg');
            const regErrorBlock = document.getElementById('reg-error-block');

            function checkUserData(field, regex) {
                field.addEventListener('keyup', (e) => {
                    e.preventDefault();
                    if (field.value.length > 1 && field.value !== '') {
                        if(!regex.test(field.value)) {
                            field.setAttribute('style', 'background-color:#f9ebeb');
                        } else {
                            field.setAttribute('style', 'background-color:#edf9eb');
                        }
                        checkUserPassword();
                        checkFilledFields();
                    }
                })
            }

            checkUserData(userName, regexName);
            checkUserData(userLastName, regexName);
            checkUserData(userSurName, regexName);
            userPhone.addEventListener('focus', (e) => {
                e.preventDefault();
                if (userPhone.value === '') {
                    userPhone.value = '+';
                    checkUserData(userPhone, regexTelephone);
                } else {
                    checkUserData(userPhone, regexTelephone);
                }
            });
            checkUserData(userEmail, regexEmail);
            checkUserData(userPassword, regexPassword);
            checkUserData(userConfirmPassword, regexPassword);

            function checkUserPassword() {
                if (userPassword.value !== '' && userConfirmPassword.value !== '' && userPassword.value.length >= 6 && userConfirmPassword.value.length >= 6) {
                    if (userPassword.value !== userConfirmPassword.value && !regexPassword.test(userPassword.value) || !regexPassword.test(userConfirmPassword.value)) {
                        regErrorBlock.innerText = 'Пароли не совпадают или не соответствуют формату!';
                    } else {
                        regErrorBlock.innerText = 'Пароли совпадают';
                    }
                }
                // else if (!regexPassword.test(userPassword.value) && !regexPassword.test(userConfirmPassword.value)){
                //     regErrorBlock.innerText = 'Пароль не соответствует формату!';
                // }
            }

            function checkFilledFields() {
                const allFilledFields = [...document.querySelectorAll('input[style="background-color:#edf9eb"]')];
                if (allFilledFields.length === 7) {
                    sendRegisteredData.disabled = false;
                } else if (allFilledFields.length < 7) {
                    sendRegisteredData.disabled = true;
                }
            }
        }

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
                window.location.replace('https://www.anna-khizhniak.site/portfolio/store-HobbyArt/main-user-page.html#favorite');
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
        const regex = new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$');
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
