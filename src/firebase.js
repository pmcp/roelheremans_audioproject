import firebase from "firebase";

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: "AIzaSyAu2Xq9C0prgVAqns8qP9IHAFcmH2t380I",
    authDomain: "toestand-calendar.firebaseapp.com",
    databaseURL: "https://toestand-calendar.firebaseio.com",
    projectId: "toestand-calendar",
    storageBucket: "toestand-calendar.appspot.com",
    messagingSenderId: "369570259406",
    appId: "1:369570259406:web:987620a58ca724d7"
  })
  .firestore();
