import firebase from 'firebase';

// Información de las reuniones programadas
export type MeetingInfo = {
  id?: string,
  names: string,
  email:string,
  phoneNumber: string,
  company: string,
  subject: string,
  date: Date,
}

// Bloques de los posts
export type ImageBlock = {
  file: { url: string, name?: string },
  withBorder?: boolean,
  withBackground?: boolean,
  stretched?: boolean,
  caption?: string,
}

export type ParagraphBlock = {
  text?: string,
}

export type HeaderBlock = {
  level: number,
  text: string,
}

export type QuoteBlock = {
  alignment: string,
  text: string,
  caption?: string,
}

export type EmbedBlock = {
  embed: string,
  source: string,
  caption?: string,
  height?: number,
  width?: number,
}

export type PostBlock = {
  type: 'header',
  data: HeaderBlock,
} | {
  type: 'paragraph',
  data: ParagraphBlock,
} | {
  type: 'quote',
  data: QuoteBlock,
} | {
  type: 'embed',
  data: EmbedBlock,
} | {
  type: 'image',
  data: ImageBlock,
}

// Post
export type Post = {
  blocks: PostBlock[],
  time?: number,
  editorInfo?: {
    version?: string,
  }
}

export type Author = {
  uid: string,
  name: string,
  position: string,
  photoUrl: string,
}

export type PostData = {
  id?: string,
  title: string,
  author: Author,
  coverPictureUrl?: string,
  post: Post,
  slug?: string,
  createdDate?: Date,
  updatedDate?: Date,
  isPublic?: boolean,
  tags?: string[],
}

export type User = firebase.User & {
  username: string,
  companyPosition?: string,
  pictureUrl?: string,
}

// Información que viene del servidor
export type ServerPost = {
  [key: number]: PostBlock,
}

export type ServerPostData = {
  autorId?: string,
  fechaDeActualizacion: firebase.firestore.Timestamp,
  fechaDeCreacion: firebase.firestore.Timestamp,
  imagenDePortadaUrl?: string,
  autor?: {
    nombre: string,
    posicion?: string,
    fotoUrl?: string,
  },
  metadata?: {
    editorInfo?: {
      version?: string,
    }
  },
  post: ServerPost,
  publicado: boolean,
  slug: string,
  titulo: string,
  tags?: string[],
}

export type SerializedBlogPost = Omit<PostData, 'createdDate' | 'updatedDate'> & {
  createdDate: number,
  updatedDate: number,
}

export type UserCredential = firebase.auth.UserCredential;
export type FirebaseUser = firebase.User;
export type AuthError = firebase.auth.Error;
