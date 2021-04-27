import { firestore } from '../firebase';
import { User } from '../types';

export const updateUserProfilePicture = async (
  imageUrl: string, userId: string,
) : Promise<void> => {
  const ref = firestore.doc(`blogUsers/${userId}`);
  await ref.update({
    photoUrl: imageUrl,
  });
};

export const checkUsernameExists = async (username : string) : Promise<boolean> => {
  const ref = firestore.doc(`blogUsernames/${username}`);
  const { exists } = await ref.get();
  return !exists;
};

export const updateUserName = async (user: User, username: string) : Promise<void> => {
  const userRef = firestore.doc(`blogUsers/${user.uid}`);
  const userNameRef = firestore.doc(`blogUsernames/${user.username}`);
  const newUsernameRef = firestore.collection('blogUsernames').doc(username);
  const batch = firestore.batch();
  batch.set(newUsernameRef, { uid: user.uid });
  batch.delete(userNameRef);
  batch.update(userRef, { username });
  await batch.commit();
};

export const updateDisplayName = async (user: User, displayName: string) : Promise<void> => {
  const userRef = firestore.doc(`blogUsers/${user.uid}`);
  await userRef.update({
    displayName,
  });
};

export const updateCompanyPosition = async (
  user: User, companyPosition: string,
) : Promise<void> => {
  const userRef = firestore.doc(`blogUsers/${user.uid}`);
  await userRef.update({
    companyPosition,
  });
};
