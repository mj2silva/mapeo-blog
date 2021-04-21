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
    tags: appPost.tags?.map((tag) => tag.toUpperCase()) || null,
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
  if (postData.tags) {
    const { tags } = postData;
    const tagsRef = firestore.collection(blogTagsCollection);
    tags.forEach(async (tag) => {
      const doc = tagsRef.doc(tag.toUpperCase());
      const tagPosts = doc.collection('tagPosts');
      const postId = blogPostDoc.id;
      const postDoc = tagPosts.doc(postId);
      batch.set(postDoc, { postId }, { merge: true });
    });
  }
  batch.set(blogPostDoc, blogPost);
  await batch.commit();
};

export const getPublicBlogPosts = async () : Promise<PostData[]> => {
  const ref = firestore.collection(blogPostsCollection);
  const query = ref.where('publicado', '==', true)
    .orderBy('fechaDeCreacion', 'desc')
    .limit(9);
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
export const deleteTagsFromPost = async (tags: string[], postId: string) : Promise<void> => {
  const deleteTag = async (tag: string) : Promise<void> => {
    const ref = firestore.collection(blogTagsCollection);
    const doc = ref.doc(tag.toUpperCase());
    const postsRef = doc.collection('tagPosts');
    const postDoc = postsRef.doc(postId);
    const { exists } = await postDoc.get();
    if (exists) await doc.delete();
  };
  const deletePostPromises = tags.map((tag) => deleteTag(tag));
  await Promise.all(deletePostPromises);
};

export const updateBlogPost = async (
  postId: string, postData: PostData, tagsToDelete: string[] = null,
) : Promise<void> => {
  const ref = firestore.collection(blogPostsCollection);
  const batch = firestore.batch();
  const blogPost = mapAppPostToServerPost(postData);
  const blogPostDoc = ref.doc(postId);
  const tagsRef = firestore.collection(blogTagsCollection);
  tagsToDelete?.forEach((tag) => {
    const doc = tagsRef.doc(tag.toUpperCase());
    const postsRef = doc.collection('tagPosts');
    const postDoc = postsRef.doc(postId);
    batch.delete(postDoc);
  });
  postData.tags?.forEach((tag) => {
    const doc = tagsRef.doc(tag.toUpperCase());
    const postsRef = doc.collection('tagPosts');
    const postDoc = postsRef.doc(postId);
    batch.set(doc, { name: tag }, { merge: true });
    batch.set(postDoc, { postId });
  });
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

export const updateTagPostsList = async (tag: string, postId: string) : Promise<void> => {
  const ref = firestore.collection(blogTagsCollection);
  const doc = ref.doc(tag.toUpperCase());
  const tagPosts = doc.collection('tagPosts');
  const postDoc = tagPosts.doc(postId);
  await postDoc.set({
    postId,
  });
};

export const savePostTags = async (tags: string[], postId: string) : Promise<void> => {
  const updateTasks = tags.map((tag) => updateTagPostsList(tag, postId));
  await Promise.all(updateTasks);
};

export const getPostTags = async () : Promise<string[]> => {
  const ref = firestore.collection(blogTagsCollection);
  const tags = [];
  const tagsDocuments = await ref.get();
  tagsDocuments.forEach((tag) => tags.push(tag.id));
  return tags;
};

export const getRelatedPosts = async (post: PostData) : Promise<PostData[]> => {
  if (post.tags?.length > 0) {
    const ref = firestore.collection(blogPostsCollection);
    const query = ref
      .where('publicado', '==', true)
      .where('tags', 'array-contains-any', post.tags)
      .orderBy('fechaDeCreacion', 'desc')
      .limit(4);
    const posts = await query.get();
    const relatedPostsData : PostData[] = [];
    posts.forEach((relatedPost) => {
      if (relatedPost.id !== post.id && relatedPostsData.length < 3) {
        const data = relatedPost?.data() as ServerPostData;
        const relatedPostData = mapServerPostToAppPost(data, relatedPost.id);
        relatedPostsData.push(relatedPostData);
      }
    });
    return relatedPostsData;
  }
  return [];
};
