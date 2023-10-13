import { auth, app } from '../firebase/connect.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getFirestore, collection, doc, getDoc} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const db = getFirestore(app)
const productsColl = collection(db, "products")

const urlParams = new URLSearchParams(window.location.search);
const productUId = urlParams.get('id');

export const productDetail = async(productUID)=>{
    try {
        
        const productRef = doc(productsColl, productUID);
    
        const productSnapshot = await getDoc(productRef);
    
        if (productSnapshot.exists) {
            const productData = productSnapshot.data();
            const { photoURL, collection, name, size, type } = productData;
            // Display the data in the HTML elements
            const collectionPath = collection.slice(0, 1) + collection.slice(1, -1).toLowerCase() + collection.slice(-1).toLowerCase();
            document.getElementById('product-collection-path').textContent = 'FRAGRANCES > Collections >' + collectionPath;
            const image = document.getElementById('product-image');
            image.src = photoURL;
            document.getElementById('product-type').textContent = type;
            document.getElementById('product-collection').textContent = collection;
            document.getElementById('product-name').textContent = name;
            document.getElementById('product-size').textContent = size + 'ml';
        } else {
            // Handle the case when the product is not found
            productDataElement.innerHTML = 'Product not found';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

if(productUId){
    productDetail(productUId)
}


const sizeButtons = document.querySelectorAll('.size-button');
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // เมื่อคลิกปุ่ม
        sizeButtons.forEach(btn => btn.classList.remove('clicked')); // ลบ class 'clicked' ที่เคยถูกเพิ่มให้กับปุ่มทั้งหมด
        button.classList.add('clicked'); // เพิ่ม class 'clicked' ให้กับปุ่มที่ถูกคลิก
    });
});