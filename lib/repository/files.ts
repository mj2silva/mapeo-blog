import firebase from 'firebase/app';
import { storage } from '../firebase';

const uploadImage = (
  file: File, filePath: string, fileName: string = null,
) : [firebase.storage.Reference, firebase.storage.UploadTask] => {
  const extension = file.type.split('/')[1];
  const ref = storage.ref(`${filePath}/${fileName || Date.now()}.${extension}`);
  const task = ref.put(file);
  return [ref, task];
};

const uploadImageAsync = async (
  file: File, filePath: string, fileName: string = null,
) : Promise<string> => {
  const extension = file.type.split('/')[1];
  const ref = storage.ref(`${filePath}/${fileName || Date.now()}.${extension}`);
  await ref.put(file);
  const downloadUrl = await ref.getDownloadURL();
  return downloadUrl.toString();
};

const deleteImageAsync = async (refPath: string) : Promise<void> => {
  const imageRef = storage.ref(refPath);
  await imageRef.delete();
};

export {
  uploadImage,
  uploadImageAsync,
  deleteImageAsync,
};
