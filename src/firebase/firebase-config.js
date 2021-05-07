import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const firebaseui = require('firebaseui');



const firebaseConfig = {
    apiKey: "AIzaSyBVn-MJta-JXG5sjSMNHxp6Lh7p_qbyax4",
    authDomain: "react-app-journal-9e68f.firebaseapp.com",
    projectId: "react-app-journal-9e68f",
    storageBucket: "react-app-journal-9e68f.appspot.com",
    messagingSenderId: "105704958834",
    appId: "1:105704958834:web:88fcd377a8c8b0539fcbeb"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
const ui = new firebaseui.auth.AuthUI(firebase.auth());


export {
    db,
    googleAuthProvider,
    firebase,
    facebookAuthProvider,
    ui,

}