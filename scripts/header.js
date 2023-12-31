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
        handleMenuOurHouse();
        handleMenuBoutiques();
        handleMenuClassicEssential();
    });
}

const handleHeaderContent = ()=>{
    const headerContent = document.querySelector('.header-content-p');
    if (headerContent) {
        headerContent.addEventListener('click', () => {
            const uid = localStorage.getItem('uid');

            if (uid) {
                const homeURL = `../pages/home.html`;
                    window.location.href = homeURL;
                }
            });
    }
}

const handleIconSearch = ()=>{
    const iconSearch = document.querySelector('.icon-search');
    if (iconSearch) {
        iconSearch.addEventListener('click', () => {
            const uid = localStorage.getItem('uid');

            if (uid) {
                const searchURL = `../pages/search.html`;
                    window.location.href = searchURL;
            }
        });
    }
}

const handleIconProfile = ()=>{
    const iconProfile = document.querySelector('.icon-profile');
    if (iconProfile) {
        iconProfile.addEventListener('click', () => {
            const uid = localStorage.getItem('uid');

            if (uid) {
                const profileURL = `../pages/profile.html`;
                    window.location.href = profileURL;
            }
        });
    }
}

const handleIconShopBag = ()=>{
    const iconShopBag = document.querySelector('.icon-shopBag');
    if (iconShopBag) {
        iconShopBag.addEventListener('click', () => {
            const uid = localStorage.getItem('uid');

            if (uid) {
                const shopBagURL = `../pages/shopBag.html`;
                    window.location.href = shopBagURL;
            }
        });
    }
}

const handleMenuCollections = ()=>{
    const menuCollections = document.querySelector('.menu-collections');
    if (menuCollections) {
        menuCollections.addEventListener('click', () => {
            const uid = localStorage.getItem('uid');

            if (uid) {
                const menuCollectionsURL = `../pages/collection.html`;
                    window.location.href = menuCollectionsURL;
            }
        });
    }
}

const handleMenuFragrances = ()=>{
    const menuFragrances = document.querySelector('.menu-fragrances');
    if (menuFragrances) {
        menuFragrances.addEventListener('click', () => {
            const uid = localStorage.getItem('uid');

            if (uid) {
                const menuFragrancesURL = `../pages/home.html`;
                    window.location.href = menuFragrancesURL;
            }
        });
    }
}

const handleMenuOurHouse = ()=>{
    const menuOurHouse = document.querySelector('.menu-ourHouse');
    
    if (menuOurHouse) {
        menuOurHouse.addEventListener('click', () => {
            const uid = localStorage.getItem('uid');

            if (uid) {
                const menuOurHouseURL = `../pages/ourHouse.html`;
                    window.location.href = menuOurHouseURL;
            }
        });
    }
}

const handleMenuBoutiques = ()=>{
    const menuBoutiques = document.querySelector('.menu-boutiques');
    if (menuBoutiques) {
        menuBoutiques.addEventListener('click', () => {
            const uid = localStorage.getItem('uid');

            if (uid) {
                const menuBoutiquesURL = `../pages/boutiques.html`;
                    window.location.href = menuBoutiquesURL;
            }
        });
    }
}

const handleMenuClassicEssential = ()=>{
    const menuClassicEssential = document.querySelector('.menu-classicEssential');
    if (menuClassicEssential) {
        menuClassicEssential.addEventListener('click', () => {
            const uid = localStorage.getItem('uid');

            if (uid) {
                const menuClassicEssentialURL = `../pages/classicEssential.html`;
                    window.location.href = menuClassicEssentialURL;
            }
        });
    }
}
