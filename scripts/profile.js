import { auth, app } from '../firebase/connect.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getFirestore, collection, doc, getDoc, setDoc, updateDoc, query, getDocs, where} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const userUID = localStorage.getItem('uid');
console.log(`uid: ${userUID}`);

const db = getFirestore(app)
const usersColl = collection(db, "users")
const ordersColl = collection(db, "orders")
const productsColl = collection(db, "products")

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

const findDoc = async()=>{
    const qry = query(ordersColl, where("userUID", "==", userUID));
    const querySnapshot = await getDocs(qry);
    const arrayOrdersDoc = [];

    querySnapshot.forEach((doc) => {
        const documentId = doc.id;
        arrayOrdersDoc.push(documentId);
    });

    if (arrayOrdersDoc.length > 0) {
        return arrayOrdersDoc;
    } else {
        console.log("ไม่พบเอกสารที่ตรงเงื่อนไข");
        return null; 
    }
}

const getDataOrders = async()=>{
    let orderNumber = 0;
    const arrayOrdersDoc = await findDoc();

    for (const docId of arrayOrdersDoc) {
        const ordersDocRef = doc(ordersColl, docId);
        try{
            const ordersDocSnap = await getDoc(ordersDocRef);
            if(ordersDocSnap.exists()) {
                const ordersData = ordersDocSnap.data();
                const itemList = ordersData.itemList;
    
                const ordersArray = [];
    
                for (const item of itemList) {
                    const productUID = item.productUID;
                    const quantity = item.quantity;
            
                    // เรียกฟังก์ชัน getDataProducts เพื่อดึงข้อมูลสินค้า
                    const productData = await getDataProducts(productUID);
    
                    // สร้างออบเจ็กต์ใหม่เพื่อใช้เก็บ quantity และ productData
                    const productInfo = {
                        quantity: quantity,
                        productData: productData,
                        productUID: productUID
                    };
    
                    // นำข้อมูลสินค้าลงในอาร์เรย์
                    ordersArray.push(productInfo);
                  }
                  console.log(ordersArray);

                    // สร้างตารางสำหรับแสดงข้อมูลใน ordersArray
                    orderNumber+=1;
                    const table = createTable(ordersArray, orderNumber);
                    // หา div ที่มีคลาส 'fetchtable'
                    const fetchTableNav = document.querySelector('.fetch-table');

                    // เพิ่มตารางลงใน div
                    fetchTableNav.appendChild(table);
            }else{
                console.error('ไม่พบเอกสาร orders');
            }
    
        }catch(error){
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล: ', error);
        }
    }
    
}

getDataOrders();

const getDataProducts = async(productUID)=>{
    try {
        
        const productRef = doc(productsColl, productUID);
    
        const productSnapshot = await getDoc(productRef);
    
        if (productSnapshot.exists) {
            const productData = productSnapshot.data();
            return productData;
            
        } else {
            // Handle the case when the product is not found
            console.error('Product not found: ');
        }
    } catch (error) {
        console.error('Error get product data:', error);
    }
}

// ฟังก์ชันสร้างตารางแสดงข้อมูล
function createTable(ordersArray, orderNumber) {
    let e = 0;
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // สร้างหัวตาราง
    const headerRow = thead.insertRow();
    const headers = ['Order Number', 'Product', 'Quantity', 'Price', 'Total'];
    headers.forEach((headerText) => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    // เพิ่มข้อมูลในตาราง
    ordersArray.forEach((order) => {
        const tr = tbody.insertRow();
        const { productData, quantity } = order;

        // เพิ่มหัวข้อ Order Number
        if(e == 0){
            const tdOrderNumber = tr.insertCell();
            tdOrderNumber.textContent = orderNumber;
            e = 1;
        }else{
            const tdOrderNumber = tr.insertCell();
            tdOrderNumber.textContent = "";
        }
        

        const tdProduct = tr.insertCell();
        const img = document.createElement('img');
        img.src = productData.photoURL;
        img.alt = productData.name;
        tdProduct.appendChild(img);
        tdProduct.appendChild(document.createTextNode(productData.name));

        const tdQuantity = tr.insertCell();
        tdQuantity.textContent = quantity;

        const tdPrice = tr.insertCell();
        tdPrice.textContent = `$${productData.price}`;

        const tdTotal = tr.insertCell();
        tdTotal.textContent = `$${quantity * productData.price}`;
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}