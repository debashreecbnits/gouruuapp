

import firebase from 'firebase';
import firestore from 'firebase/firestore'// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const settings = { timestampsInSnapshots: true };
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: "AIzaSyDWjqwvvRv6dfZVCgcldFZIZ0R2X54yb34",
    authDomain: "gouruuchat-f5558.firebaseapp.com",
    projectId: "gouruuchat-f5558",
    storageBucket: "gouruuchat-f5558.appspot.com",
    messagingSenderId: "843267640062",
    appId: "1:843267640062:web:f2a4c3b7484fec78a133af",
    measurementId: "G-P3JL22ZB18"

 

//     apiKey: "AIzaSyDceUwhtt1b5_iL1LmnBsr2lOt-Y0oTxd4",
//   authDomain: "gouruu-2.firebaseapp.com",
//   projectId: "gouruu-2",
//   storageBucket: "gouruu-2.appspot.com",
//   messagingSenderId: "400573091302",
//   appId: "1:400573091302:web:8ea20cec58a2809e909a27",
//   measurementId: "G-NP8F1CMZ7B"
};

// Initialize Firebase
firebase.initializeApp(config);
// var database = firebase.database();
firebase.firestore().settings(settings);

export default firebase;