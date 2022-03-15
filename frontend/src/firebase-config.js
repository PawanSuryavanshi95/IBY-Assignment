import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCmuKQ4Vet-hgUg50PLrq_wFMbWlNtB0nA",
    authDomain: "iby-cv.firebaseapp.com",
    projectId: "iby-cv",
    storageBucket: "iby-cv.appspot.com",
    messagingSenderId: "698673614812",
    appId: "1:698673614812:web:53c8a43c57d674feff4919",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);