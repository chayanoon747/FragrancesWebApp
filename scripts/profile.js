import { auth, app } from '../firebase/connect.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getFirestore, collection, doc, getDoc} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const urlParams = new URLSearchParams(window.location.search);
const userUID = urlParams.get('uid');
console.log(`uid: ${userUID}`);

const db = getFirestore(app)
const usersColl = collection(db, "users")

export const profileData = async(userUID)=>{
    try {
        
        const userRef = doc(usersColl, userUID);
    
        const userSnapshot = await getDoc(userRef);
    
        if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            const { email, firstname, lastname } = userData;
            // Display the data in the HTML elements
            document.getElementById('firstname').textContent = firstname;
            document.getElementById('lastname').textContent = lastname;
            document.getElementById('email').textContent = email;
        } else {
            productDataElement.innerHTML = 'User not found';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

if(userUID){
    profileData(userUID)
}