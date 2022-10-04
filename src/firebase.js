// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDuz9qmIUvhOkULPWj0PiyaGlAgw7tpXKQ',
  authDomain: 'math-ninja-11b89.firebaseapp.com',
  projectId: 'math-ninja-11b89',
  storageBucket: 'math-ninja-11b89.appspot.com',
  messagingSenderId: '1020734848291',
  appId: '1:1020734848291:web:6910d681555e3856a02096',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
