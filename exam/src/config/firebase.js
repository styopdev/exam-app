
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSR1jHyEpe3Cl8ZkThIwsXmYzADm37EMA",
  authDomain: "exam-282c8.firebaseapp.com",
  projectId: "exam-282c8",
  storageBucket: "exam-282c8.appspot.com",
  messagingSenderId: "56762171202",
  appId: "1:56762171202:web:7909666d3a4c47bcad52db",
  measurementId: "G-Y1BT8BXMLH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };