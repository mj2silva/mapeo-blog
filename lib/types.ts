import firebase from 'firebase';

export type MeetingInfo = {
  id?: string,
  names: string,
  email:string,
  phoneNumber: string,
  company: string,
  subject: string,
  date: Date,
}

export type PostBlock = {
  type: 'header' | 'quote' | 'paragraph' | 'table',
  data: {
    text?: string,
    caption?: string,
    alignment?: string,
    level?: number,
  }
}

export type Post = {
  blocks: PostBlock[],
  time?: Date,
  editorInfo?: {
    version?: string,
  }
}

export type PostData = {
  id?: string,
  title: string,
  authorUId: string,
  post: Post,
  slug?: string,
  createdDate?: Date,
  isPublic?: boolean,
}

export type User = firebase.User & {
  username: string,
  companyPosition?: string,
  pictureUrl?: string,
}

export type UserCredential = firebase.auth.UserCredential;
export type FirebaseUser = firebase.User;
export type AuthError = firebase.auth.Error;
