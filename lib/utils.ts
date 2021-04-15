import deburr from 'lodash.deburr';
import kebabCase from 'lodash.kebabcase';
import { PostData, SerializedBlogPost } from './types';

const twoCiphersString = (num: number) : string => (num > 9 ? `${num}` : `0${num}`);

export const createSlug = (text: string) : string => kebabCase(deburr(text));

export const peruvianDateString = (date: Date) : string => {
  const month = twoCiphersString(date.getMonth());
  const day = twoCiphersString(date.getDate());
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const serializeBlogPost = (blog: PostData) : SerializedBlogPost => ({
  ...blog,
  createdDate: blog.createdDate.getTime(),
  updatedDate: blog.updatedDate.getTime(),
});

export const deserializeBlogPost = (serializedBlog: SerializedBlogPost) : PostData => ({
  ...serializedBlog,
  createdDate: new Date(serializedBlog.createdDate),
  updatedDate: new Date(serializedBlog.updatedDate),
});
