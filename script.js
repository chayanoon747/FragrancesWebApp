const banner = document.querySelector('.banner');
const bannerImages = banner.querySelectorAll('img');
bannerImages.forEach((image, index) => {
    const src = image.getAttribute('src');
    const alt = image.getAttribute('alt');
    console.log(`รูปที่ ${index + 1}:`);
    console.log(`URL: ${src}`);
    console.log(`ข้อความอธิบาย: ${alt}`);
});
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');
let currentImageIndex = 0;

// เรียกฟังก์ชันเมื่อคลิกที่ปุ่ม arrow-left
arrowLeft.addEventListener('click', () => {
    bannerImages[currentImageIndex].classList.add('hidden');
    currentImageIndex = (currentImageIndex - 1 + bannerImages.length) % bannerImages.length;
    bannerImages[currentImageIndex].classList.remove('hidden');
});

// เรียกฟังก์ชันเมื่อคลิกที่ปุ่ม arrow-right
arrowRight.addEventListener('click', () => {
    bannerImages[currentImageIndex].classList.add('hidden');
    currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
    bannerImages[currentImageIndex].classList.remove('hidden');
});