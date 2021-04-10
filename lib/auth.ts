import firebase from 'firebase/app';
import { auth } from './firebase';

const signin = async (
  email : string, password : string,
) : Promise<firebase.auth.UserCredential> => {
  const userCredential = await auth.signInWithEmailAndPassword(email, password);
  return userCredential;
};

const signOut = async () : Promise<void> => {
  await auth.signOut();
};

export {
  signin,
  signOut,
};
