import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { MeetingInfo, PostData } from './types';

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
export const { STATE_CHANGED } = firebase.storage.TaskEvent;

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

const getBlogPost = async (postId: string) : Promise<PostData> => {
  const ref = firestore.collection('blogPosts');
  const post = await ref.doc(postId).get();
  const data = post.data();
  const postData : PostData = {
    id: post.id,
    authorUId: data.autorId,
    createdDate: data.fechaDeCreacion,
    post: {
      blocks: data.post,
      editorInfo: data.metadata?.editorInfo?.version,
    },
    slug: data.slug,
    isPublic: data.publicado,
    title: data.titulo,
  };
  return postData;
};

const getUserBlogPosts = async (uid: string) : Promise<PostData[]> => {
  const ref = firestore.collection('blogPosts');
  const posts = await ref.where('autorId', '==', uid).get();
  const postsData : PostData[] = [];
  posts.forEach((post) => {
    const data = post?.data();
    const postData : PostData = {
      id: post.id,
      authorUId: data?.autorId,
      createdDate: data?.fechaDeCreacion,
      post: {
        blocks: data?.post,
        editorInfo: data?.metadata?.editorInfo?.version,
      },
      slug: data?.slug,
      isPublic: data?.publicado || false,
      title: data?.titulo,
    };
    postsData.push(postData);
  });
  return postsData;
};

// Blog
const createBlogPost = async (postData: PostData) : Promise<void> => {
  const ref = firestore.collection('blogPosts');
  const blogPost = {
    autorId: postData.authorUId,
    fechaDeCreacion: postData.createdDate || new Date(),
    fechaDeActualizacion: postData.post.time || new Date(),
    post: {
      ...postData.post.blocks,
    },
    slug: postData.slug,
    metadata: {
      editorInfo: {
        version: postData.post.editorInfo?.version,
      },
    },
    publicado: postData.isPublic || false,
    titulo: postData.title,
  };
  const blogPostDoc = ref.doc();
  const batch = firestore.batch();
  batch.set(blogPostDoc, blogPost);
  await batch.commit();
};

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
  return downloadUrl;
};

const updateUserProfilePicture = async (imageUrl: string, userId: string) : Promise<void> => {
  const ref = firestore.doc(`blogUsers/${userId}`);
  await ref.update({
    photoUrl: imageUrl,
  });
};

const getBlogPostBySlug = async (slug: string) : Promise<PostData> => {
  const ref = firestore.collection('blogPosts');
  const posts = await ref.where('slug', '==', slug).limit(1).get();
  const postsData = [];
  posts.forEach((post : firebase.firestore.QueryDocumentSnapshot) => {
    const data = post.data();
    const postData : PostData = {
      id: post.id,
      authorUId: data.autorId,
      createdDate: data.fechaDeCreacion,
      post: {
        blocks: Object.keys(data.post).map((key) => data.post[key]),
        time: new Date(data.fechaDeActualizacion),
        editorInfo: data.metadata?.editorInfo?.version,
      },
      slug: data.slug,
      isPublic: data.publicado,
      title: data.titulo,
    };
    postsData.push(postData);
  });
  return postsData[0];
};

const updateBlogPost = async (postId: string, postData: Partial<PostData>) : Promise<void> => {
  const ref = firestore.collection('blogPosts');
  const blogPost = {
    fechaDeActualizacion: postData.post.time || new Date(),
    post: {
      ...postData.post.blocks,
    },
    slug: postData.slug,
    metadata: {
      editorInfo: {
        version: postData.post.editorInfo?.version,
      },
    },
    publicado: postData.isPublic || false,
    titulo: postData.title,
  };
  const blogPostDoc = ref.doc(postId);
  const batch = firestore.batch();
  batch.update(blogPostDoc, blogPost);
  await batch.commit();
};

export {
  createNewMeeting,
  checkCompanyValid,
  checkUsernameExists,
  createBlogPost,
  signin,
  getBlogPost,
  getUserBlogPosts,
  updateUserProfilePicture,
  uploadImage,
  getBlogPostBySlug,
  updateBlogPost,
  uploadImageAsync,
};
