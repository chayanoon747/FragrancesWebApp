const urlParams = new URLSearchParams(window.location.search);
const userUID = urlParams.get('uid');

document.querySelector('.continue-page').addEventListener('click', function() {
    window.location.href = `./home.html?uid=${userUID}`;
});