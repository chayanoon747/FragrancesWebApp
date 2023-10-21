import { auth, app } from '../firebase/connect.js'
import {getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const urlParams = new URLSearchParams(window.location.search);
const userUID = urlParams.get('uid');
console.log(`uid: ${userUID}`);

const db = getFirestore(app)
const shopbagsColl = collection(db, "shopbags")
const productsColl = collection(db, "products")

const findDoc = async()=>{
    const qry = query(shopbagsColl, where("userUID", "==", userUID));
    const querySnapshot = await getDocs(qry);
    if (!querySnapshot.empty) {
        const shopbagsDoc = querySnapshot.docs[0];
        const documentId = shopbagsDoc.id;
        return documentId;
    } else{
        console.log("ไม่พบเอกสารที่ตรงเงื่อนไข");
    }
}

const getDataShopbags = async()=>{
    const shopbagDocID = await findDoc();
    const shopbagDocRef = doc(shopbagsColl, shopbagDocID);
    try {
        const shopbagDocSnap = await getDoc(shopbagDocRef);

        if (shopbagDocSnap.exists()) {
            const shopbagData = shopbagDocSnap.data();
            const itemList = shopbagData.itemList;

            const shopbagsArray = [];

            for (const item of itemList) {
                const productUID = item.productUID;
                const quantity = item.quantity;
        
                // เรียกฟังก์ชัน getDataProducts เพื่อดึงข้อมูลสินค้า
                const productData = await getDataProducts(productUID);

                // สร้างออบเจ็กต์ใหม่เพื่อใช้เก็บ quantity และ productData
                const productInfo = {
                    quantity: quantity,
                    productData: productData
                };

                // นำข้อมูลสินค้าลงในอาร์เรย์
                shopbagsArray.push(productInfo);
              }
              console.log(shopbagsArray);
              fetchdataShopBag(shopbagsArray);
        } else {
            console.error('ไม่พบเอกสาร shopbags');
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล: ', error);
    }
}

getDataShopbags();

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

const fetchdataShopBag = (shopbagsArray)=>{
    const tableBody = document.querySelector('.table-content');
    let totalPrice = 0;

    // ลูปผ่าน shopbagsArray และสร้าง <tr> สำหรับแต่ละรายการสินค้า
    shopbagsArray.forEach((productInfo) => {
        const tr = document.createElement('tr');
    
        // สร้าง <td> สำหรับรูปภาพสินค้า
        const tdProduct = document.createElement('td');
        const img = document.createElement('img');
        img.src = productInfo.productData.photoURL;
        img.alt = productInfo.productData.name;
        tdProduct.appendChild(img);
        const productName = document.createTextNode(productInfo.productData.name);
        tdProduct.appendChild(productName);
        
        // สร้าง <td> สำหรับจำนวน (quantity)
        const tdQuantity = document.createElement('td');
        tdQuantity.className = 'td-quantity';
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'quantity';
        const minusButton = document.createElement('button');
        minusButton.textContent = '-';
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = productInfo.quantity;
        const plusButton = document.createElement('button');
        plusButton.textContent = '+';
        quantityDiv.appendChild(minusButton);
        quantityDiv.appendChild(quantityInput);
        quantityDiv.appendChild(plusButton);
        tdQuantity.appendChild(quantityDiv);
        
        // สร้าง <td> สำหรับราคา
        const tdPrice = document.createElement('td');
        tdPrice.textContent = `$${productInfo.productData.price}`;
        tdPrice.className = 'td-price';
        
        // สร้าง <td> สำหรับรวม (total)
        const tdTotal = document.createElement('td');
        tdTotal.textContent = `$${(productInfo.quantity * productInfo.productData.price)}`;
        tdPrice.className = 'td-total';
        
        // เพิ่ม <td> ทั้ง 4 ลงใน <tr>
        tr.appendChild(tdProduct);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdPrice);
        tr.appendChild(tdTotal);
        
        // เพิ่ม <tr> ลงใน tbody ของตาราง
        tableBody.appendChild(tr);

        //
        totalPrice = totalPrice+=(productInfo.quantity * productInfo.productData.price);
    });
    console.log(totalPrice);
    getOrderSummary(totalPrice);
}

const getOrderSummary = (totalPrice)=>{
    let shippingCost = 5;
    // เข้าถึงองค์ประกอบ HTML โดยใช้คลาสหรือ id
    const subtotalElement = document.querySelector('.subtotal');
    const shippingCostElement = document.querySelector('.shipping-cost');
    const totalElement = document.querySelector('.total');

    // เปลี่ยนเนื้อหาขององค์ประกอบ HTML เป็นราคาที่คุณต้องการ
    subtotalElement.textContent = `$${totalPrice}`; // ราคา Subtotal
    shippingCostElement.textContent = `$${shippingCost}`; // ราคา Shipping cost
    const total = totalPrice+shippingCost;
    totalElement.textContent = `$${total}`; // ราคา Total
}






