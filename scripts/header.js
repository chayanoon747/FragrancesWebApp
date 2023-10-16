const fetchAndGetData = ()=>{
    fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').innerHTML = data;
        handleHeaderContent();
        handleIconProfile();
        handleMenuCollections();
    });
}

const handleHeaderContent = ()=>{
    const headerContent = document.querySelector('.header-content-p');
    if (headerContent) {
        console.log('1')
        headerContent.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const uid = urlParams.get('uid');
            if (uid) {
                const homeURL = `../pages/home.html?uid=${uid}`;
                    window.location.href = homeURL;
                }
            });
    }
}

const handleIconProfile = ()=>{
    const iconProfile = document.querySelector('.icon-profile');
    if (iconProfile) {
        console.log('1')
        iconProfile.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const uid = urlParams.get('uid');
            if (uid) {
                const profileURL = `../pages/profile.html?uid=${uid}`;
                    window.location.href = profileURL;
                }
            });
    }
}

const handleMenuCollections = ()=>{
    const menuCollections = document.querySelector('.menu-collections');
    if (menuCollections) {
        console.log('5')
        menuCollections.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const uid = urlParams.get('uid');
            if (uid) {
                const menuCollectionsURL = `../pages/collection.html?uid=${uid}`;
                    window.location.href = menuCollectionsURL;
                }
            });
    }
}
