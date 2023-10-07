import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB8wFVPluXKr_ifTYcJzQ6MhiNTtLx333I",
    authDomain: "fragrance-d2e8d.firebaseapp.com",
    projectId: "fragrance-d2e8d",
    storageBucket: "fragrance-d2e8d.appspot.com",
    messagingSenderId: "112317818428",
    appId: "1:112317818428:web:b5c3802add549fb6cfc539",
    measurementId: "G-J88V463RCG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth()

  var firstname = document.getElementById("firstname");
  var lastname = document.getElementById("lastname");
  var email = document.getElementById("email");
  var password = document.getElementById("password");