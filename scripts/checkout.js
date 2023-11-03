import { auth, app } from '../firebase/connect.js'
import {getFirestore, collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const confirmPaymentButton = document.getElementById("confirmPaymentButton");
const paymentForm = document.getElementById("paymentDetailsForm");

const urlParams = new URLSearchParams(window.location.search);
const userUID = urlParams.get('uid');

const db = getFirestore(app)
const shopbagsColl = collection(db, "shopbags")
const productsColl = collection(db, "products")

confirmPaymentButton.addEventListener("click", (event) => {
    event.preventDefault(); 

    if (paymentForm.checkValidity()) {
        window.location.href = `./paymentSuccess.html?uid=${userUID}`;
    } else {
        
    }
});

window.addEventListener("click", (event) => {
    if (event.target === paymentForm) {
        paymentForm.style.display = "none";
    }
});

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
                    productData: productData,
                    productUID: productUID
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
        tdProduct.className = 'td-product';
        
        // สร้าง <td> สำหรับจำนวน (quantity)
        const tdQuantity = document.createElement('td');
        tdQuantity.className = 'td-quantity';
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'quantity';
        const minusButton = document.createElement('button');
        minusButton.addEventListener('click', () => {
            if(quantityInput.value > 1){
                quantityInput.value-=1;
                productInfo.quantity = quantityInput.value
                changeQuantity(productInfo.productUID, productInfo.quantity);
                totalPrice-=parseInt(productInfo.productData.price)
                tdTotal.textContent = `$${(productInfo.quantity * productInfo.productData.price)}`;
                getOrderSummary(totalPrice);
            }
        });
        minusButton.textContent = '-';
        minusButton.className = 'minus';
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = productInfo.quantity;
        const plusButton = document.createElement('button');
        plusButton.addEventListener('click', () => {
            const quantityValue = parseInt(quantityInput.value);
            quantityInput.value = quantityValue + 1;
            productInfo.quantity = quantityInput.value;
            changeQuantity(productInfo.productUID, productInfo.quantity);
            totalPrice+=parseInt(productInfo.productData.price)
            tdTotal.textContent = `$${(productInfo.quantity * productInfo.productData.price)}`;
            getOrderSummary(totalPrice);
        });
        plusButton.textContent = '+';
        plusButton.className = 'plus';
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
        tdTotal.className = 'td-total';

        //สร้าง <td> สำหรับ remove
        const tdRemove = document.createElement('td');
        const removeIMG = document.createElement('img');
        removeIMG.src = '../assets/remove.png';
        removeIMG.alt = 'remove image';
        removeIMG.className = 'remove-img';
        removeIMG.addEventListener('click', () => {
            // เมื่อคลิกที่ไอคอน remove
            // ลบ <tr> ที่เป็นหน่วยของสินค้านี้
            tr.remove();

            // ลบข้อมูลจาก Firestore
            removeProduct(productInfo.productUID);
          
            // คำนวณราคาใหม่หลังจากลบ
            totalPrice -= productInfo.quantity * productInfo.productData.price;
            console.log(totalPrice);
            getOrderSummary(totalPrice);
        });

        tdRemove.appendChild(removeIMG);
        tdRemove.className = 'td-remove';
        
        // เพิ่ม <td> ทั้ง 4 ลงใน <tr>
        tr.appendChild(tdProduct);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdPrice);
        tr.appendChild(tdTotal);
        tr.appendChild(tdRemove);
        
        // เพิ่ม <tr> ลงใน tbody ของตาราง
        tableBody.appendChild(tr);

        // คำนวณราคา total
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

const removeProduct = async(productUID)=>{
    const shopbagDocID = await findDoc();
    const shopbagDocRef = doc(shopbagsColl, shopbagDocID);
    try {
        const shopbagDocSnap = await getDoc(shopbagDocRef);
    
        if (shopbagDocSnap.exists()) {
            // ดึงข้อมูล shopbag จากเอกสาร Firestore
            const shopbagData = shopbagDocSnap.data();
        
            // ค้นหา index ของรายการสินค้าที่ตรงกับ productUID ใน itemList
            const index = shopbagData.itemList.findIndex(item => item.productUID === productUID);
        
            if (index !== -1) {
                // ถ้าพบรายการที่ตรง, ให้ลบรายการนั้นออกจาก itemList
                shopbagData.itemList.splice(index, 1);
        
                // อัปเดตข้อมูลใน Firestore
                await updateDoc(shopbagDocRef, {
                    itemList: shopbagData.itemList
                });
                console.log(`ลบรายการสินค้าที่มี productUID: ${productUID}`);
            } else {
                console.log(`ไม่พบรายการสินค้าที่มี productUID: ${productUID}`);
            }
        } else {
          console.error('ไม่พบเอกสาร shopbags');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลบรายการสินค้า: ', error);
      }
}

const changeQuantity = async(productUID, quantity)=>{
    const shopbagDocID = await findDoc();
    const shopbagDocRef = doc(shopbagsColl, shopbagDocID);
    try {
        const shopbagDocSnap = await getDoc(shopbagDocRef);
    
        if (shopbagDocSnap.exists()) {
            // ดึงข้อมูล shopbag จากเอกสาร Firestore
            const shopbagData = shopbagDocSnap.data();
        
            // ค้นหา index ของรายการสินค้าที่ตรงกับ productUID ใน itemList
            const index = shopbagData.itemList.findIndex(item => item.productUID === productUID);
        
            if (index !== -1) {
                // หากพบรายการที่ตรง, ให้อัปเดตค่า quantity ของรายการนั้น
                shopbagData.itemList[index].quantity = parseInt(quantity);
                // อัปเดตข้อมูลใน Firestore
                await updateDoc(shopbagDocRef, {
                    itemList: shopbagData.itemList
                });
                console.log(`change quantity productUID: ${productUID}`);
            } else {
                console.log(`ไม่พบรายการสินค้าที่มี productUID: ${productUID}`);
            }
        } else {
          console.error('ไม่พบเอกสาร shopbags');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการ change quantity product: ', error);
      }
}

