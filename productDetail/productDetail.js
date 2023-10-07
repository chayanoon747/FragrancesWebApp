const sizeButtons = document.querySelectorAll('.size-button');

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // เมื่อคลิกปุ่ม
        sizeButtons.forEach(btn => btn.classList.remove('clicked')); // ลบ class 'clicked' ที่เคยถูกเพิ่มให้กับปุ่มทั้งหมด
        button.classList.add('clicked'); // เพิ่ม class 'clicked' ให้กับปุ่มที่ถูกคลิก
    });
});