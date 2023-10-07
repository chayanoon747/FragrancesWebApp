const menuItems = document.querySelectorAll('.menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // ทำสิ่งที่คุณต้องการเมื่อคลิกที่เมนู
            alert(`คุณคลิกที่ ${item.textContent}`);
        });
    });