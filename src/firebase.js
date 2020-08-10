import firebase from 'firebase/app';
import 'firebase/database'

const firebaseProjectId = process.env.PREACT_APP_FIREBASE_PROJECT_ID;

const firebaseConfig = {
  apiKey: process.env.PREACT_APP_FIREBASE_API_KEY,
  authDomain: `${firebaseProjectId}.firebaseapp.com`,
  databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
  projectId: `${firebaseProjectId}`,
  storageBucket: `${firebaseProjectId}.appspot.com`,
  messagingSenderId: process.env.PREACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.PREACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase