import { auth, app } from '../firebase/connect.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getFirestore, collection, doc, getDoc, getDocs, query, where, updateDoc, arrayUnion} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const urlParams = new URLSearchParams(window.location.search);
const productUID = urlParams.get('id');
const userUID = localStorage.getItem('uid');

const db = getFirestore(app)
const productsColl = collection(db, "products")
const shopbagsColl = collection(db, "shopbags")

export const productDetail = async(productUID)=>{
    try {
        //เข้าถึง collection products โดยมี productUID ในการระบุเอกสารที่เข้าถึง
        const productRef = doc(productsColl, productUID);
        // getDoc() ดึงเอกสาร
        const productSnapshot = await getDoc(productRef);
    
        // .exists ใช้เช็คว่าข้อมูลในเอกสารที่ถูกอ้างอิงมีอยู่หรือไม่
        if (productSnapshot.exists) {
            const productData = productSnapshot.data();
            const { photoURL, collection, name, size, type } = productData;
            // Display the data in the HTML elements
            //collection.slice(0, 1) ดึงอักษรแรก 
            //collection.slice(1, -1).toLowerCase() ดึงอักษรระหว่างตัวแรกกับตัวท้าย
            //collection.slice(-1) ดึงตัวท้าย
            const collectionPath = collection.slice(0, 1) + collection.slice(1, -1).toLowerCase() + collection.slice(-1).toLowerCase();
            document.getElementById('product-collection-path').textContent = 'FRAGRANCES > Collections >' + collectionPath;
            const image = document.getElementById('product-image');
            image.src = photoURL;
            // กำหนด value ของ id ต่างๆ
            document.getElementById('product-type').textContent = type;
            document.getElementById('product-collection').textContent = collection;
            document.getElementById('product-name').textContent = name;
            document.getElementById('product-size').textContent = size + 'ml';
        } else {
            productDataElement.innerHTML = 'Product not found';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

if(productUID){
    productDetail(productUID)
}

const sizeButtons = document.querySelectorAll('.size-button');
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // เมื่อคลิกปุ่ม
        sizeButtons.forEach(btn => btn.classList.remove('clicked')); // ลบ class 'clicked' ที่เคยถูกเพิ่มให้กับปุ่มทั้งหมด
        button.classList.add('clicked'); // เพิ่ม class 'clicked' ให้กับปุ่มที่ถูกคลิก
    });
});

const findDoc = async()=>{
    const qry = query(shopbagsColl, where("userUID", "==", userUID));
    const querySnapshot = await getDocs(qry);
    if (!querySnapshot.empty) {
        const shopbagsDoc = querySnapshot.docs[0];
        const documentId = shopbagsDoc.id;
        //console.log(documentId);
        return documentId;
    } else{
        console.log("ไม่พบเอกสารที่ตรงเงื่อนไข");
    }
}   

const addButtons = document.querySelectorAll('.add-button');
addButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const shopbagDocID = await findDoc();
        console.log(shopbagDocID);
    
        const quantity = 1;
        const itemData = {
            productUID: productUID,
            quantity: quantity,
        };
    
        const shopbagDocRef = doc(shopbagsColl, shopbagDocID);
    
        try {
            const shopbagDocSnap = await getDoc(shopbagDocRef);
    
            if (shopbagDocSnap.exists()) {
                const shopbagData = shopbagDocSnap.data();
                const itemList = shopbagData.itemList || [];
                
                // ค้นหา index ของ item ที่มี productUID เท่ากับ productUID ที่คุณต้องการ
                const existingItemIndex = itemList.findIndex(item => item.productUID === productUID);
    
                if (existingItemIndex !== -1) {
                    // ถ้ามี item ที่มี productUID เดียวกันใน itemList ให้เพิ่ม quantity ขึ้น 1
                    itemList[existingItemIndex].quantity += 1;
                } else {
                    // ถ้าไม่มี item ที่มี productUID เดียวกันใน itemList ให้เพิ่ม item ใหม่
                    itemList.push(itemData);
                }
    
                // อัปเดต itemList ในเอกสาร shopbagDoc
                await updateDoc(shopbagDocRef, { itemList });
    
                console.log('อัปเดตข้อมูลเอกสาร shopbags สำเร็จ');
                window.location.href = `./shopBag.html`;
            } else {
                console.error('ไม่พบเอกสาร shopbags');
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตข้อมูล: ', error);
        }
    });
});

 