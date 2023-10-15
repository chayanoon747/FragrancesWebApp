const fetchAndGetData = ()=>{
    fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').innerHTML = data;
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
    });
}