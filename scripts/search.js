import { app } from '../firebase/connect.js'
import {getFirestore, collection, doc, getDocs, query, where} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const db = getFirestore(app)
const productsColl = collection(db, "products")

const searchInput = document.getElementById('searchInput');

// รับค่า input จากผู้ใช้
var inputElement = document.getElementById('searchInput'); // เปลี่ยน ID เป็น ID ของ input ของคุณ

// อัพเดตรายการเมื่อปุ่ม Enter ถูกกด
inputElement.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    var searchValue = inputElement.value;
    searchInFirestore(searchValue);
  }
});

// ฟังก์ชันค้นหาข้อมูลใน Firestore
const searchInFirestore = async(searchValue)=> {
    const searchValueText = searchValue.toLowerCase();
    var results = [];
    

    const qry = query(productsColl);
    const querySnapshot = await getDocs(qry);

    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const nameProduct = productData.name.toLowerCase().trim();
        if (nameProduct.includes(searchValueText)) {
          results.push(productData.name);
        }
      });
    const headerContent = document.getElementById('header-content');
    headerContent.innerText = `Search Result (${results.length})`;
    console.log(results);
    clearOldDataAndDisplayNewData(results);
}

const clearOldDataAndDisplayNewData = async (results) => {
    try {
        // ลบข้อมูลเก่าก่อน
        const productGrid = document.getElementById('product-grid-1');
        productGrid.innerHTML = ''; // เคลียร์คอลเลกชัน HTML

        // ดึงข้อมูลใหม่และแสดง
        await fetchAndDisplayData(results);
    } catch (error) {
        console.error('Error clearing old data and fetching new data:', error);
    }
}

const fetchAndDisplayData = async(results)=>{
    try {
        const qry = query(productsColl, where("name", "in", results));
        const querySnapshot = await getDocs(qry);
    
        querySnapshot.forEach((productDoc) => {
            if (productDoc.exists()) {
                const productData = productDoc.data();
                const { photoURL, name, type } = productData;
      
                const productElement = document.createElement('div');
                productElement.classList.add('product');
      
                productElement.innerHTML = `
                    <img src="${photoURL}" alt="Product Image">
                    <p class="product-type">${type}</p>
                    <p class="product-name">${name}</p>
                `;

                productElement.addEventListener('click', () => {
                    const productDetailURL = `./productDetail.html?id=${productDoc.id}&uid=${userUID}`;
                    window.location.href = productDetailURL;
                });
      
                const productGrid = document.getElementById('product-grid-1');
                productGrid.appendChild(productElement);
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
  
  

