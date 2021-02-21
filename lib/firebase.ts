import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBJLnIr7D1jHWMwF6bsNE6kakgBTwAjbvI',
  authDomain: 'mapeo-web.firebaseapp.com',
  projectId: 'mapeo-web',
  storageBucket: 'mapeo-web.appspot.com',
  messagingSenderId: '1019523843748',
  appId: '1:1019523843748:web:9a377e47aab02b7d48c831',
  measurementId: 'G-RXLDHZKZ81',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
