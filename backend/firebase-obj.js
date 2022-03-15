const firebase = require('firebase-admin');

firebase.initializeApp({
    apiKey: "AIzaSyCmuKQ4Vet-hgUg50PLrq_wFMbWlNtB0nA",
    authDomain: "iby-cv.firebaseapp.com",
    projectId: "iby-cv",
    storageBucket: "iby-cv.appspot.com",
    messagingSenderId: "698673614812",
    appId: "1:698673614812:web:53c8a43c57d674feff4919",
})

module.exports =  firebase;