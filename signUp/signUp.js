import { auth } from '../firebase/auth.js'
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

signUp.addEventListener('click',(e)=>{
    e.preventDefault(); // ป้องกันการโหลดหน้าใหม่เมื่อผู้ใช้กดปุ่ม "Sign Up"
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const user = userCredential.user;
      alert('User created');
      window.location.href = '../index.html';
    })
    .catch((error)=>{
      alert(error.message);
    });
});