const urlParams = new URLSearchParams(window.location.search);
const userUID = urlParams.get('uid');

document.querySelector('.banner-text').addEventListener('click', function() {
    window.location.href = `./collection.html?uid=${userUID}`;
});