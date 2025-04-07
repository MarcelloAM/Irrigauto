// Import the functions you need from the SDKs you need
import {  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app-compat.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import {} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth-compat.js";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDhvmBNtIXa4RNaUKa931cShhaiThwVKdE",
    authDomain: "irrigacaoautomatizada-35c19.firebaseapp.com",
    databaseURL: "https://irrigacaoautomatizada-35c19-default-rtdb.firebaseio.com",
    projectId: "irrigacaoautomatizada-35c19",
    storageBucket: "irrigacaoautomatizada-35c19.firebasestorage.app",
    messagingSenderId: "890032829410",
    appId: "1:890032829410:web:cc60674dcc54cdb8263fbb",
    measurementId: "G-B86QLF4MD8"
  };


  const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const analytics = getAnalytics(app);



    const db = getFirestore(app);