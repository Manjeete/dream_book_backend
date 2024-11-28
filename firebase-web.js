// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyBsVFB6o1iKHwjBxbdRR6PX7VZQ6zGEHMw",
    authDomain: "staging-capella.firebaseapp.com",
    projectId: "staging-capella",
    storageBucket: "staging-capella.firebasestorage.app",
    messagingSenderId: "475463058626",
    appId: "1:475463058626:web:daa26b74d4aff8293de75b",
    measurementId: "G-C86MK3SNXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);