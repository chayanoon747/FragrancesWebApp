import { auth, app } from '../firebase/connect.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import {getFirestore, collection, doc, setDoc, addDoc} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

const db = getFirestore(app)
const usersColl = collection(db, "users")
const shopbagsColl = collection(db, "shopbags")

const updateUserData = (user, firstname, lastname, email) => {
  setDoc(doc(usersColl, user.uid), {
      firstname: firstname,
      lastname: lastname,
      email: email,
  })
  .then(() => {
      alert('Update data successfully');
      alert(`User created ${user.uid}`);
      window.location.href = '../index.html';
  })
  .catch((error) => {
      alert(error.message);
  });
};

const createUserShopBag = (user) => {
  addDoc(shopbagsColl, {
    userUID: user.uid
  })
  .catch((error) => {
    alert(error.message);
  });
};


signUp.addEventListener('click',(e)=>{
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่เมื่อผู้ใช้กดปุ่ม "Sign Up"
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const user = userCredential.user;
      createUserShopBag(user);
      updateUserData(user, firstname, lastname, email);
      
    })
    .catch((error)=>{
      alert(error.message);
    });

    
});