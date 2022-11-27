// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDhnnI1gmUgGmMW8RAlc_-HD9knjDxr_ls',
  authDomain: 'facebook-60d2c.firebaseapp.com',
  projectId: 'facebook-60d2c',
  storageBucket: 'facebook-60d2c.appspot.com',
  messagingSenderId: '92086482146',
  appId: '1:92086482146:web:718000f9fa78eca1f85abb',
  measurementId: 'G-2QEV2Z78R3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
