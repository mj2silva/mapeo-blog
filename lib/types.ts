import firebase from 'firebase';

export type MeetingInfo = {
  id?: string,
  names: string,
  email:string,
  phoneNumber: string,
  company: string,
  subject: string,
  date: Date,
}

export type User = firebase.User & {
  username: string,
}

export type UserCredential = firebase.auth.UserCredential;
export type FirebaseUser = firebase.User;
export type AuthError = firebase.auth.Error;
