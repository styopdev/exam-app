import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMem57J1fWtEfWzUSU38OGk9JQCwZv0oM",
  authDomain: "exam-app-e70eb.firebaseapp.com",
  projectId: "exam-app-e70eb",
  storageBucket: "exam-app-e70eb.appspot.com",
  messagingSenderId: "1065464695754",
  appId: "1:1065464695754:web:298e4d8f8a8aa1add45d33",
  measurementId: "G-PH7K85XL1S"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
