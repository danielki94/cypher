import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyDdmgp81Ib7sER4-6etGrUWS30QSUs_-Ns",
    authDomain: "cypher-957a6.firebaseapp.com",
    projectId: "cypher-957a6",
    storageBucket: "cypher-957a6.appspot.com",
    messagingSenderId: "688235788013",
    appId: "1:688235788013:web:030b5c4f2ac421fe7b3ee4",
    measurementId: "G-Z08DTSQ86R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default }