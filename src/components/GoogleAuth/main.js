import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth , GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAVg2o6XAUE05cIl5s09KhLfxMNH56aeKE",
    authDomain: "authentication-51789.firebaseapp.com",
    projectId: "authentication-51789",
    storageBucket: "authentication-51789.appspot.com",
    messagingSenderId: "921096435188",
    appId: "1:921096435188:web:12c9a200a2374035eb35a1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en'
  const provider = new GoogleAuthProvider();

  const GoogleLogin = document.getElementsByClassName("text-red-500");
  GoogleLogin.addEventListener("click", function(){
    alert(5);
  })