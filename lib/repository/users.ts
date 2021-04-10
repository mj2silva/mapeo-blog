import { firestore } from '../firebase';

const updateUserProfilePicture = async (imageUrl: string, userId: string) : Promise<void> => {
  const ref = firestore.doc(`blogUsers/${userId}`);
  await ref.update({
    photoUrl: imageUrl,
  });
};

const checkUsernameExists = async (username : string) : Promise<boolean> => {
  const ref = firestore.doc(`blogUsernames/${username}`);
  const { exists } = await ref.get();
  return !exists;
};

export {
  checkUsernameExists,
  updateUserProfilePicture,
};
