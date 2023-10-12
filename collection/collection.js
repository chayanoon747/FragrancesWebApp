import { auth, app } from '../firebase/connect.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getFirestore, collection, doc, getDocs, query, where} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const db = getFirestore(app)
const productsColl = collection(db, "products")

const fetchAndDisplayData1 = async()=>{
    try {
        const qry = query(productsColl, where("collection", "==", "COLONIA COLLECTION"));
        const querySnapshot = await getDocs(qry);
    
        querySnapshot.forEach((productDoc) => {
            if (productDoc.exists()) {
              const productData = productDoc.data();
              const { photoURL, name, type } = productData;
      
              // สร้าง HTML element และแสดงข้อมูลสินค้า
              const productElement = document.createElement('div');
              productElement.classList.add('product');
      
              productElement.innerHTML = `
                <img src="${photoURL}" alt="Product Image">
                <p class="product-type">${type}</p>
                <p class="product-name">${name}</p>
              `;
      
              const productGrid = document.getElementById('product-grid-1');
              productGrid.appendChild(productElement);
            }
          });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
const fetchAndDisplayData2 = async()=>{
    try {
        const qry = query(productsColl, where("collection", "==", "SIGNATURES OF THE SUN"));
        const querySnapshot = await getDocs(qry);
    
        querySnapshot.forEach((productDoc) => {
            if (productDoc.exists()) {
              const productData = productDoc.data();
              const { photoURL, name, type } = productData;
      
              // สร้าง HTML element และแสดงข้อมูลสินค้า
              const productElement = document.createElement('div');
              productElement.classList.add('product');
      
              productElement.innerHTML = `
                <img src="${photoURL}" alt="Product Image">
                <p class="product-type">${type}</p>
                <p class="product-name">${name}</p>
              `;
      
              const productGrid = document.getElementById('product-grid-2');
              productGrid.appendChild(productElement);
            }
          });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const fetchAndDisplayData3 = async()=>{
    try {
        const qry = query(productsColl, where("collection", "==", "BLU MEDITERRANEO"));
        const querySnapshot = await getDocs(qry);
    
        querySnapshot.forEach((productDoc) => {
            if (productDoc.exists()) {
              const productData = productDoc.data();
              const { photoURL, name, type } = productData;
      
              // สร้าง HTML element และแสดงข้อมูลสินค้า
              const productElement = document.createElement('div');
              productElement.classList.add('product');
      
              productElement.innerHTML = `
                <img src="${photoURL}" alt="Product Image">
                <p class="product-type">${type}</p>
                <p class="product-name">${name}</p>
              `;
      
              const productGrid = document.getElementById('product-grid-3');
              productGrid.appendChild(productElement);
            }
          });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const fetchAndDisplayData4 = async()=>{
    try {
        const qry = query(productsColl, where("collection", "==", "NOTE DI COLONIA"));
        const querySnapshot = await getDocs(qry);
    
        querySnapshot.forEach((productDoc) => {
            if (productDoc.exists()) {
              const productData = productDoc.data();
              const { photoURL, name, type } = productData;
      
              // สร้าง HTML element และแสดงข้อมูลสินค้า
              const productElement = document.createElement('div');
              productElement.classList.add('product');
      
              productElement.innerHTML = `
                <img src="${photoURL}" alt="Product Image">
                <p class="product-type">${type}</p>
                <p class="product-name">${name}</p>
              `;
      
              const productGrid = document.getElementById('product-grid-4');
              productGrid.appendChild(productElement);
            }
          });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const fetchAndDisplayData5 = async()=>{
    try {
        const qry = query(productsColl, where("collection", "==", "LE NOBILI"));
        const querySnapshot = await getDocs(qry);
    
        querySnapshot.forEach((productDoc) => {
            if (productDoc.exists()) {
              const productData = productDoc.data();
              const { photoURL, name, type } = productData;
      
              // สร้าง HTML element และแสดงข้อมูลสินค้า
              const productElement = document.createElement('div');
              productElement.classList.add('product');
      
              productElement.innerHTML = `
                <img src="${photoURL}" alt="Product Image">
                <p class="product-type">${type}</p>
                <p class="product-name">${name}</p>
              `;
      
              const productGrid = document.getElementById('product-grid-5');
              productGrid.appendChild(productElement);
            }
          });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndDisplayData1()
fetchAndDisplayData2()
fetchAndDisplayData3()
fetchAndDisplayData4()
fetchAndDisplayData5()