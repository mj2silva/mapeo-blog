import firebase from 'firebase/app';

import { firestore, fromMillis, fromDate } from '../firebase';
import { PostData } from '../types';

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
    const postData : PostData = {
      id: post.id,
      authorUId: data?.autorId,
      createdDate: new Date(data.fechaDeCreacion.seconds * 1000),
      post: {
        blocks: Object.keys(data.post).map((key) => data.post[key]),
        time: new Date(data.fechaDeActualizacion),
        editorInfo: data.metadata?.editorInfo?.version,
      },
      slug: data?.slug,
      isPublic: data?.publicado || false,
      title: data?.titulo,
    };
    postsData.push(postData);
  });
  return postsData;
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
      createdDate: new Date(data.fechaDeCreacion.seconds * 1000),
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

// Create
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

const getPublicBlogPosts = async () : Promise<PostData[]> => {
  const ref = firestore.collection('blogPosts');
  const posts = await ref.where('publicado', '==', true)
    .orderBy('fechaDeCreacion', 'desc')
    .limit(3)
    .get();
  const postsData : PostData[] = [];
  posts.forEach((post) => {
    const data = post?.data();
    const postData : PostData = {
      id: post.id,
      authorUId: data?.autorId,
      createdDate: new Date(data.fechaDeCreacion.seconds * 1000),
      post: {
        blocks: Object.keys(data.post).map((key) => data.post[key]),
        time: new Date(data.fechaDeActualizacion),
        editorInfo: data.metadata?.editorInfo?.version,
      },
      slug: data?.slug,
      isPublic: data?.publicado || false,
      title: data?.titulo,
    };
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
  createBlogPost,
  getBlogPost,
  getUserBlogPosts,
  getBlogPostBySlug,
  getPublicBlogPosts,
  deletePost,
  updateBlogPost,
};
