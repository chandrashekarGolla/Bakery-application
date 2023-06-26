// import { initializeApp } from "firebase/app";
// import { getAuth} from 'firebase/auth';
// const firebaseConfig = {
  // apiKey: "AIzaSyDuXwdmxiXU529kX9WHCFc_mKhscIYyxio",
  // authDomain: "react-phone-auth-690ad.firebaseapp.com",
  // projectId: "react-phone-auth-690ad",
  // storageBucket: "react-phone-auth-690ad.appspot.com",
  // messagingSenderId: "534157114079",
  // appId: "1:534157114079:web:9b8b1c19941655f94c876a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth};
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  // Your Firebase config details here
  apiKey: "AIzaSyDuXwdmxiXU529kX9WHCFc_mKhscIYyxio",
  authDomain: "react-phone-auth-690ad.firebaseapp.com",
  projectId: "react-phone-auth-690ad",
  storageBucket: "react-phone-auth-690ad.appspot.com",
  messagingSenderId: "534157114079",
  appId: "1:534157114079:web:9b8b1c19941655f94c876a"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { auth };
