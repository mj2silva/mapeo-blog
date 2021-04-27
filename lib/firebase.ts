import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCIaCBF3zDOpPxWu52AGiXb_1iZYm-_bJY',
  authDomain: 'mapeo-web-a4a14.firebaseapp.com',
  projectId: 'mapeo-web-a4a14',
  storageBucket: 'mapeo-web-a4a14.appspot.com',
  messagingSenderId: '1054491243736',
  appId: '1:1054491243736:web:cf29aee650947f8b8993ad',
  measurementId: 'G-4Q3DB92NL8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const analitycs = firebase.analytics;
export const { STATE_CHANGED } = firebase.storage.TaskEvent;
export const { fromMillis } = firebase.firestore.Timestamp;
export const { fromDate } = firebase.firestore.Timestamp;
