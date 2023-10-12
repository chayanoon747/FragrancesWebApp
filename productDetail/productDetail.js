import { auth, app } from '../firebase/connect.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getFirestore, collection, doc, getDoc} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const db = getFirestore(app)
const productsColl = collection(db, "products")

const fetchAndDisplayData = async()=>{
    try {
        const productRef = doc(productsColl, 'WvWvI9WXBARW9V7Z3CNF');
    
        const productSnapshot = await getDoc(productRef);
    
        if (productSnapshot.exists) {
            const productData = productSnapshot.data();
            const { photoURL, collection, name, size, type } = productData;
            // Display the data in the HTML elements
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

fetchAndDisplayData()

const sizeButtons = document.querySelectorAll('.size-button');
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // เมื่อคลิกปุ่ม
        sizeButtons.forEach(btn => btn.classList.remove('clicked')); // ลบ class 'clicked' ที่เคยถูกเพิ่มให้กับปุ่มทั้งหมด
        button.classList.add('clicked'); // เพิ่ม class 'clicked' ให้กับปุ่มที่ถูกคลิก
    });
});