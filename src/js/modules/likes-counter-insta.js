export function countLikesInsta() {
    const likesBtn = document.getElementById('likes-btn');
    const likesDigit = document.getElementById('likes-digit');
    let myStorage = window.localStorage;
    const likesButton = document.getElementById('svg-path');

    function clickLikes(nameItem, nameButton) {
        let counter;
        if (!myStorage.getItem(nameItem)) {
            counter = 0;
            likesDigit.innerText = '0';
        } else {
            counter = myStorage.getItem(nameItem);
            nameButton.innerText = myStorage.getItem(nameItem);
        }
        return () => {
            if (likesButton.classList.contains('clicked-like')) {
                likesButton.classList.remove('clicked-like');
                nameButton.innerText = myStorage.getItem(nameItem);
                return --counter;
            } else {
                likesButton.classList.add('clicked-like');
                myStorage.setItem(nameItem, nameButton.innerText);
                return ++counter;
            }
        }
    }

    let buttonInst;
    buttonInst = clickLikes('counterResultsInsta', likesDigit);

    likesBtn.addEventListener('click', () => {
        likesDigit.innerText = buttonInst();
        myStorage.setItem('counterResultsInsta', likesDigit.innerText);
    });
}
