const handleEditBtn = ()=> {
    const editButtonSpan = document.getElementById('edit-button-span');
    const editButtonImg = document.getElementById('edit-button-img');
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const genderInput = document.getElementById('gender');
    const phoneInput = document.getElementById('phone-number');

    if (editButtonSpan.textContent.includes('Edit')) {
        editButtonSpan.textContent = 'Confirm';
        if (editButtonImg) {
            editButtonImg.src = '../assets/check.png'; 
        }
        firstNameInput.disabled = false;
        lastNameInput.disabled = false;
        genderInput.disabled = false;
        phoneInput.disabled = false;
    } else {
        editButtonSpan.textContent = 'Edit';
        if (editButtonImg) {
            editButtonImg.src = '../assets/edit.png'; 
        }
        firstNameInput.disabled = true;
        lastNameInput.disabled = true;
        genderInput.disabled = true;
        phoneInput.disabled = true;
    }
}