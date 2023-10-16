import { auth, app } from '../firebase/connect.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getFirestore, collection, doc, getDoc, setDoc, updateDoc} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const urlParams = new URLSearchParams(window.location.search);
const userUID = urlParams.get('uid');
console.log(`uid: ${userUID}`);

const db = getFirestore(app)
const usersColl = collection(db, "users")

const profileData = async(userUID)=>{
    try {
        
        const userRef = doc(usersColl, userUID);
        const userSnapshot = await getDoc(userRef);
    
        if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            const { firstname, lastname, gender, email, phone } = userData;
            document.getElementById('firstname').value = firstname;
            document.getElementById('lastname').value = lastname;
            document.getElementById('gender').value = gender;
            document.getElementById('email').value = email;
            document.getElementById('phone-number').value = phone;
        } else {
            
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

if(userUID){
    profileData(userUID)
}

const updateUserData = async (userUID) => {
    const updatedData = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone-number").value,
    };
    
    try {
        const userRef = doc(usersColl, userUID);
        await setDoc(userRef, updatedData, { merge: true });
        console.log("User data updated successfully");
    } catch (error) {
        console.error("Error updating user data:", error);
    }
};

document.getElementById("edit-button").addEventListener("click", () => {
    const editButtonSpan = document.getElementById('edit-button-span');
    if (editButtonSpan.textContent.includes('Confirm')) {
        updateUserData(userUID);
    }
});

const addressForm = (userUID, valueButton)=>{
    const recipientForm = document.getElementById('recipient-info');
    recipientForm.innerHTML = `
    <form class="form" id="address-form">
        <span>Receiver</span>
        <nav class="input-group">
            <input type="text" id="form-firstname" placeholder="First Name"/>
            <input type="text" id="form-lastname" placeholder="Last Name"/>
        </nav>
        <input type="text" id="form-phone-number" placeholder="Phone Number"/>
        <span>Shipping Address</span>
        <nav class="input-group">
            <input type="text" id="form-address" placeholder="Address"/>
            <input type="text" id="form-sub-district" placeholder="Sub-District"/>
        </nav>
        <nav class="input-group">
            <input type="text" id="form-district" placeholder="District"/>
            <input type="text" id="form-province" placeholder="Province"/>
        </nav>
        <input type="text" id="form-postcode" placeholder="Postcode"/>
        <span>Country</span>
        <input type="text" id="form-country" placeholder="Country"/>
        <button type="submit" id="submit">${valueButton}</button>
    </form>
    `;

    const form = document.getElementById('address-form');
    form.addEventListener('submit', async(e) => {
        e.preventDefault();

        
        const firstName = document.getElementById('form-firstname').value;
        const lastName = document.getElementById('form-lastname').value;
        const phoneNumber = document.getElementById('form-phone-number').value;
        const address = document.getElementById('form-address').value;
        const subDistrict = document.getElementById('form-sub-district').value;
        const district = document.getElementById('form-district').value;
        const province = document.getElementById('form-province').value;
        const postcode = document.getElementById('form-postcode').value;
        const country = document.getElementById('form-country').value;

        
        const userRef = doc(usersColl, userUID);

        const newAddress = {
        firstName,
        lastName,
        phoneNumber,
        address,
        subDistrict,
        district,
        province,
        postcode,
        country,
        };
        console.log(newAddress);

        await updateDoc(userRef, {
            address: newAddress
        })
        .then(() => {
            handleUserAddress(userUID);
            console.log("Recipient's information added to Firestore");
        })
        .catch((error) => {
        console.error("Error updating recipient's information: ", error);
        });
    });
}

const showAddress = async(userUID)=>{
    const userRef = doc(usersColl, userUID);
    const userSnapshot = await getDoc(userRef);
    try{
        if(userSnapshot.exists){
            const userData = userSnapshot.data();
            const address = userData.address;
            const recipientForm = document.getElementById('recipient-info');
            recipientForm.innerHTML = `
                <nav class="nav-show-address">
                    <nav class="column-address">
                        <p class="column-text-header">Receiver Information</p>
                        <p class="column-text-body">${address.firstName} ${address.lastName}</p>
                    </nav>
                            
                    <nav class="column-address">
                        <p class="column-text-header">Mobile</p>
                        <p class="column-text-body">${address.phoneNumber}</p>
                    </nav>
    
                    <nav class="column-address">
                        <p class="column-text-header">Country</p>
                        <p class="column-text-body">${address.country}</p>
                    </nav>
    
                    <nav class="column-address">
                        <p class="column-text-header-last">Shipping Address</p>
                        <nav class="column-text-body">
                            <p>${address.address}</p>
                            <p>${address.subDistrict}</p>
                            <p>${address.district}</p>
                            <p>${address.province}</p>
                            <p>${address.postcode}</p>
                        </nav>
                    </nav>
                </nav>
                <button class="button-submit" type="submit" id="submit">Edit</button>
            `;
            const editButton = document.getElementById('submit');
            editButton.addEventListener('click', () => {
                recipientForm.style.display = 'flex';
                addressForm(userUID, 'Save Information');
            });
        }
    }catch(error){
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูล: ", error);
    }
}

const handleUserAddress = async(userUID)=>{
    try {
        const userRef = doc(usersColl, userUID);
        const userSnapshot = await getDoc(userRef);
        const recipientForm = document.getElementById('recipient-info');
        
        if (userSnapshot.exists && userSnapshot.data().address) {
            recipientForm.style.display = 'block';
            showAddress(userUID);
        } else {
            recipientForm.style.display = 'flex';
            addressForm(userUID, "Add Recipient's Information");
        }
    } catch (error) {
        console.error('Error checking user address:', error);
    }
}

handleUserAddress(userUID);