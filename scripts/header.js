const fetchAndGetData = ()=>{
    fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').innerHTML = data;
        handleHeaderContent();
        handleIconSearch();
        handleIconProfile();
        handleIconShopBag();
        handleMenuCollections();
        handleMenuFragrances();
    });
}

const handleHeaderContent = ()=>{
    const headerContent = document.querySelector('.header-content-p');
    if (headerContent) {
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

const handleIconSearch = ()=>{
    const iconSearch = document.querySelector('.icon-search');
    if (iconSearch) {
        iconSearch.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const uid = urlParams.get('uid');
            if (uid) {
                const searchURL = `../pages/search.html?uid=${uid}`;
                    window.location.href = searchURL;
            }
        });
    }
}

const handleIconProfile = ()=>{
    const iconProfile = document.querySelector('.icon-profile');
    if (iconProfile) {
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

const handleIconShopBag = ()=>{
    const iconShopBag = document.querySelector('.icon-shopBag');
    if (iconShopBag) {
        iconShopBag.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const uid = urlParams.get('uid');
            if (uid) {
                const shopBagURL = `../pages/shopBag.html?uid=${uid}`;
                    window.location.href = shopBagURL;
            }
        });
    }
}

const handleMenuCollections = ()=>{
    const menuCollections = document.querySelector('.menu-collections');
    if (menuCollections) {
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

const handleMenuFragrances = ()=>{
    const menuFragrances = document.querySelector('.menu-fragrances');
    if (menuFragrances) {
        menuFragrances.addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const uid = urlParams.get('uid');
            if (uid) {
                const menuFragrancesURL = `../pages/home.html?uid=${uid}`;
                    window.location.href = menuFragrancesURL;
            }
        });
    }
}
