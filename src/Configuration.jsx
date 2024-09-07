// Import the Firebase modules you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your Firebase configuration object (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyCzA_XuSGaKbJYcBEQPx_OvGJq36vpXVBc",
  authDomain: "foodyzonebyford9.firebaseapp.com",
  databaseURL: "https://foodyzonebyford9-default-rtdb.firebaseio.com",
  projectId: "foodyzonebyford9",
  storageBucket: "foodyzonebyford9.appspot.com",
  messagingSenderId: "1050697403114",
  appId: "1:1050697403114:web:f6b82b9c2737f0dce12593",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// Export the initialized Firebase app and Firestore
export { app, db, storage };
