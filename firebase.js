// firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyDaZHDJh8Jw4U1-QT2TYWAOxk3Xy57Sekk",
  authDomain: "testgithub-d13a2.firebaseapp.com",
  projectId: "testgithub-d13a2",
  storageBucket: "testgithub-d13a2.appspot.com",
  messagingSenderId: "225764043125",
  appId: "1:225764043125:web:d343399c3b3aa5b14a4b3c"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
