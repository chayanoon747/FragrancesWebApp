import { auth } from '../firebase/connect.js'
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

signIn.addEventListener('click',(e)=>{
    e.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      const user = userCredential.user;
      console.log(user.email, user.uid);
      alert('Sign in successfully');
      window.location.href = `./pages/home.html?uid=${user.uid}`;
    })
    .catch((error)=>{
      alert(error.message);
    });
});
  