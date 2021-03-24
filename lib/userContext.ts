import {
  createContext,
} from 'react';
import { User } from './types';

type UserContextReturn = {
  user: User,
  loading: boolean,
  error: any,
  signInWithEmailAndPassword: (username: string, password: string) => Promise<void>,
  signOut: () => Promise<void>
}

const UserContext = createContext<UserContextReturn>(
  {
    user: null,
    loading: false,
    signInWithEmailAndPassword: null,
    signOut: null,
    error: null,
  },
);

export default UserContext;
