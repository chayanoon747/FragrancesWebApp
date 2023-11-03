const urlParams = new URLSearchParams(window.location.search);
const userUID = urlParams.get('uid');

document.querySelector('.banner-text').addEventListener('click', function() {
    window.location.href = `./productDetail.html?id=Z0hRS6zGXBITv1Oro41O&uid=${userUID}`;
});