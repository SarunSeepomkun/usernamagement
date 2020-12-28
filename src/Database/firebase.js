import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPD_VwI_VDDHlmObOcseFKoQizYbr2_0M",
  authDomain: "user-management-c4d51.firebaseapp.com",
  projectId: "user-management-c4d51",
  storageBucket: "user-management-c4d51.appspot.com",
  messagingSenderId: "881201654011",
  appId: "1:881201654011:web:18c939fe8273fb1d49685e",
  measurementId: "G-XW7GKG0FWM",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();

export default firebase;
