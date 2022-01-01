import Rebase from "re-base";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDoVOP1GV6af781FHHHEiLB3kxd6i5L-lk",
  authDomain: "catch-of-the-day-sbhat.firebaseapp.com",
  databaseURL:
    "https://catch-of-the-day-sbhat-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "catch-of-the-day-sbhat",
  storageBucket: "catch-of-the-day-sbhat.appspot.com",
  messagingSenderId: "432081187019",
  appId: "1:432081187019:web:ed8f2db98ea73f12276b4e",
};

const fireBasApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(fireBasApp.database());

//this is a named export
export { fireBasApp };

export default base;
