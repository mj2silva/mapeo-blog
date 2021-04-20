import firebase from 'firebase/app';

import { firestore, fromMillis, fromDate } from '../firebase';
import { PostData, ServerPostData } from '../types';
import DatabaseCollections from './collections';

const blogPostsCollection = DatabaseCollections.blogPosts;
const blogTagsCollection = DatabaseCollections.blogTags;

export const mapServerPostToAppPost = (data: ServerPostData, postId: string) : PostData => {
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
    tags: data.tags || null,
    createdDate,
    updatedDate,
  };
  return postData;
};

export const mapAppPostToServerPost = (appPost: PostData) : ServerPostData => {
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
    tags: appPost.tags || null,
    fechaDeActualizacion: firebase.firestore.Timestamp.fromDate(appPost.updatedDate || new Date()),
    fechaDeCreacion: firebase.firestore.Timestamp.fromDate(appPost.createdDate || new Date()),
  };
  return serverPostData;
};

export const getBlogPost = async (postId: string) : Promise<PostData> => {
  const ref = firestore.collection(blogPostsCollection);
  const post = await ref.doc(postId).get();
  const data = post.data();
  const postData = mapServerPostToAppPost(data as ServerPostData, post.id);
  return postData;
};

type getBlogPostsOptions = {
  limit?: number,
  cursor?: number | Date
}

export const getUserBlogPosts = async (
  uid: string, options: getBlogPostsOptions,
) : Promise<PostData[]> => {
  const cursor = options.cursor && (typeof options.cursor === 'number' ? fromMillis(options?.cursor) : fromDate(options?.cursor));
  const ref = firestore.collection(blogPostsCollection);
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

export const getBlogPostBySlug = async (slug: string) : Promise<PostData> => {
  const ref = firestore.collection(blogPostsCollection);
  const posts = await ref.where('slug', '==', slug).limit(1).get();
  const postsData = [];
  posts.forEach((post) => {
    const data = post.data() as ServerPostData;
    const postData = mapServerPostToAppPost(data, post.id);
    postsData.push(postData);
  });
  return postsData[0];
};

export const getPublicBlogPostBySlug = async (slug: string) : Promise<PostData> => {
  const ref = firestore.collection(blogPostsCollection);
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
export const createBlogPost = async (postData: PostData) : Promise<void> => {
  const ref = firestore.collection(blogPostsCollection);
  const createdDate = new Date();
  const blogPost = mapAppPostToServerPost({
    ...postData,
    createdDate,
    updatedDate: createdDate,
  });
  const blogPostDoc = ref.doc();
  const batch = firestore.batch();
  batch.set(blogPostDoc, blogPost);
  await batch.commit();
};

export const getPublicBlogPosts = async () : Promise<PostData[]> => {
  const ref = firestore.collection(blogPostsCollection);
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
export const deletePost = async (postId : string) : Promise<string> => {
  const promise = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(postId);
    }, 3000);
  });
  return promise;
};

// Update
export const updateBlogPost = async (postId: string, postData: PostData) : Promise<void> => {
  const ref = firestore.collection(blogPostsCollection);
  const blogPost = mapAppPostToServerPost(postData);
  const blogPostDoc = ref.doc(postId);
  const batch = firestore.batch();
  batch.update(blogPostDoc, blogPost);
  await batch.commit();
};

// BlogPostTags
export const verifyTagExists = async (tag: string) : Promise<boolean> => {
  const ref = firestore.doc(`${blogTagsCollection}/${tag}`);
  const { exists } = await ref.get();
  return exists;
};

export const createTag = async (tag: string, postId: string = null) : Promise<void> => {
  const ref = firestore.collection(blogTagsCollection);
  const doc = ref.doc(tag.toUpperCase());
  await doc.set({
    post: postId ? [postId] : null,
  });
};
