// firebase.js
// Substitua os valores abaixo pelo SEU config do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDaZHDJh8Jw4U1-QT2TYWAOxk3Xy57Sekk",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "testgithub-d13a2",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "225764043125",
  appId: "1:225764043125:web:d343399c3b3aa5b14a4b3c"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
