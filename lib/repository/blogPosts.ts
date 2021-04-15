import firebase from 'firebase/app';

import { firestore, fromMillis, fromDate } from '../firebase';
import { PostData, ServerPostData } from '../types';

const mapServerPostToAppPost = (data: ServerPostData, postId: string) : PostData => {
  const updatedDate = new Date(data.fechaDeActualizacion.toMillis());
  const createdDate = new Date(data.fechaDeCreacion.toMillis());
  const postData : PostData = {
    id: postId,
    coverPictureUrl: data.imagenDePortadaUrl || null,
    author: (data.autor && {
      name: data.autor.nombre,
      photoUrl: data.autor.fotoUrl || null,
      position: data.autor.posicion || null,
      uid: data.autorId,
    }) || null,
    post: {
      time: data.fechaDeActualizacion.toMillis(),
      blocks: Object.keys(data.post).map((key) => data.post[key]),
      editorInfo: {
        version: data.metadata?.editorInfo?.version,
      },
    },
    slug: data.slug,
    isPublic: data.publicado,
    title: data.titulo,
    createdDate,
    updatedDate,
  };
  return postData;
};

const mapAppPostToServerPost = (appPost: PostData) : ServerPostData => {
  const serverPostData : ServerPostData = {
    titulo: appPost.title,
    autor: appPost.author && {
      nombre: appPost.author.name,
      fotoUrl: appPost.author.photoUrl || null,
      posicion: appPost.author.position || null,
    },
    autorId: appPost.author?.uid,
    publicado: appPost.isPublic,
    slug: appPost.slug,
    imagenDePortadaUrl: appPost.coverPictureUrl,
    post: appPost.post?.blocks,
    metadata: {
      editorInfo: appPost.post.editorInfo,
    },
    fechaDeActualizacion: firebase.firestore.Timestamp.fromDate(appPost.updatedDate),
    fechaDeCreacion: firebase.firestore.Timestamp.fromDate(appPost.createdDate),
  };
  return serverPostData;
};

const getBlogPost = async (postId: string) : Promise<PostData> => {
  const ref = firestore.collection('blogPosts');
  const post = await ref.doc(postId).get();
  const data = post.data();
  const postData = mapServerPostToAppPost(data as ServerPostData, post.id);
  return postData;
};

type getBlogPostsOptions = {
  limit?: number,
  cursor?: number | Date
}

const getUserBlogPosts = async (
  uid: string, options: getBlogPostsOptions,
) : Promise<PostData[]> => {
  const cursor = options.cursor && (typeof options.cursor === 'number' ? fromMillis(options?.cursor) : fromDate(options?.cursor));
  const ref = firestore.collection('blogPosts');
  const posts = await ref.where('autorId', '==', uid)
    .orderBy('fechaDeCreacion', 'desc')
    .startAfter(cursor || fromDate(new Date()))
    .limit(options?.limit || 100)
    .get();
  const postsData : PostData[] = [];
  posts.forEach((post) => {
    const data = post?.data();
    const postData = mapServerPostToAppPost(data as ServerPostData, post.id);
    postsData.push(postData);
  });
  return postsData;
};

const getBlogPostBySlug = async (slug: string) : Promise<PostData> => {
  const ref = firestore.collection('blogPosts');
  const posts = await ref.where('slug', '==', slug).limit(1).get();
  const postsData = [];
  posts.forEach((post) => {
    const data = post.data() as ServerPostData;
    const postData = mapServerPostToAppPost(data, post.id);
    postsData.push(postData);
  });
  return postsData[0];
};

const getPublicBlogPostBySlug = async (slug: string) : Promise<PostData> => {
  const ref = firestore.collection('blogPosts');
  const posts = await ref
    .where('publicado', '==', true)
    .where('slug', '==', slug)
    .limit(1)
    .get();
  const postsData = [];
  posts.forEach((post) => {
    const data = post.data() as ServerPostData;
    const postData = mapServerPostToAppPost(data, post.id);
    postsData.push(postData);
  });
  return postsData[0];
};

// Create
const createBlogPost = async (postData: PostData) : Promise<void> => {
  const ref = firestore.collection('blogPosts');
  const blogPost = mapAppPostToServerPost(postData);
  const blogPostDoc = ref.doc();
  const batch = firestore.batch();
  batch.set(blogPostDoc, blogPost);
  await batch.commit();
};

const getPublicBlogPosts = async () : Promise<PostData[]> => {
  const ref = firestore.collection('blogPosts');
  const query = ref.where('publicado', '==', true)
    .orderBy('fechaDeCreacion', 'desc')
    .limit(3);
  const posts = await query.get();
  const postsData : PostData[] = [];
  posts.forEach((post) => {
    const data = post?.data() as ServerPostData;
    const postData = mapServerPostToAppPost(data, post.id);
    postsData.push(postData);
  });
  return postsData;
};

// Delete
const deletePost = async (postId : string) : Promise<string> => {
  const promise = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(postId);
    }, 3000);
  });
  return promise;
};

// Update
const updateBlogPost = async (postId: string, postData: PostData) : Promise<void> => {
  const ref = firestore.collection('blogPosts');
  const blogPost = mapAppPostToServerPost(postData);
  const blogPostDoc = ref.doc(postId);
  const batch = firestore.batch();
  batch.update(blogPostDoc, blogPost);
  await batch.commit();
};

export {
  createBlogPost,
  getBlogPost,
  getUserBlogPosts,
  getBlogPostBySlug,
  getPublicBlogPostBySlug,
  getPublicBlogPosts,
  deletePost,
  updateBlogPost,
};
