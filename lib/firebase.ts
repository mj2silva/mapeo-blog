import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { MeetingInfo } from './types';

const firebaseConfig = {
  apiKey: 'AIzaSyCIaCBF3zDOpPxWu52AGiXb_1iZYm-_bJY',
  authDomain: 'mapeo-web-a4a14.firebaseapp.com',
  projectId: 'mapeo-web-a4a14',
  storageBucket: 'mapeo-web-a4a14.appspot.com',
  messagingSenderId: '1054491243736',
  appId: '1:1054491243736:web:6ed9f5a3d0bd7de78993ad',
  measurementId: 'G-K142CRY7JD',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const createNewMeeting = async (meetingInfo : MeetingInfo) : Promise<void> => {
  const meetingsRef = firestore.collection('reunionesProgramadas');
  const meeting = {
    nombres: meetingInfo.names.toUpperCase(),
    email: meetingInfo.email.toUpperCase(),
    empresa: meetingInfo.company.toUpperCase(),
    telefono: meetingInfo.phoneNumber.toUpperCase(),
    asunto: meetingInfo.subject.toUpperCase(),
    fechaDeSolicitud: meetingInfo.date,
  };
  const meetingDoc = meetingsRef.doc();
  const companyDoc = firestore.doc(`empresas/${meeting.empresa}`);
  const batch = firestore.batch();
  batch.set(meetingDoc, meeting);
  batch.set(companyDoc, { meetingId: meetingDoc.id });
  await batch.commit();
};

const checkCompanyValid = async (company : string) : Promise<boolean> => {
  const ref = firestore.doc(`empresas/${company}`);
  const { exists } = await ref.get();
  return !exists;
};

const checkUsernameExists = async (username : string) : Promise<boolean> => {
  const ref = firestore.doc(`blogUsernames/${username}`);
  const { exists } = await ref.get();
  return !exists;
};

const signin = async (
  email : string, password : string,
) : Promise<firebase.auth.UserCredential> => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential;
};

export {
  createNewMeeting,
  checkCompanyValid,
  checkUsernameExists,
  signin,
};
