import { useRouter } from 'next/router';
import {
  useCallback, useEffect, useState,
} from 'react';
import { auth, firestore } from '../../../lib/firebase';
import { AuthError, FirebaseUser, User } from '../../../lib/types';

type UserData = {
  user: User,
  loading: boolean,
  error: AuthError,
  signInWithEmailAndPassword: (email : string, password: string) => Promise<void>,
  signOut: () => Promise<void>
}

const useUserData = () : UserData => {
  const router = useRouter();
  const [username, setUsername] = useState<string>(null);
  const [displayName, setDisplayName] = useState<string>(null);
  const [pictureUrl, setPictureUrl] = useState<string>(null);
  const [companyPosition, setCompanyPosition] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError>(null);
  const [user, setUser] = useState<FirebaseUser>(auth.currentUser);
  const [userChecked, setUserChecked] = useState<boolean>(false);
  const isLogin = useCallback<() => boolean>(() : boolean => router.pathname.includes('login'), [router]);

  const checkRedirect = useCallback(() => {
    if (userChecked) {
      const isLoginPath = isLogin();
      if (user && isLoginPath) router.push('/internal/home');
      else if (!user && !isLoginPath) router.push('/internal/login');
      else if (isLoginPath && !user) setIsLoading(false);
    }
  }, [router, user, isLogin, userChecked]);

  const signInWithEmailAndPassword = async (email : string, password : string) : Promise<void> => {
    try {
      setIsLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      setError(null);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const signOut = async () : Promise<void> => {
    setIsLoading(true);
    await auth.signOut();
  };

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setUserChecked(true);
    },
    (firebaseError) => {
      if (firebaseError) setError(firebaseError);
    });
  }, []);

  useEffect(() => {
    let unsubscribe : () => void;
    if (userChecked) {
      if (user) {
        const ref = firestore.collection('blogUsers').doc(user.uid);
        unsubscribe = ref.onSnapshot((doc) => {
          const data = doc.data();
          setUsername(data?.username);
          setDisplayName(data?.displayName);
          setCompanyPosition(data?.companyPosition);
          setPictureUrl(data?.photoUrl);
          setIsLoading(false);
        });
      } else {
        setUsername(null);
      }
    }
    return unsubscribe;
  }, [user, userChecked]);

  useEffect(() => {
    checkRedirect();
  }, [checkRedirect]);

  return {
    user: {
      ...user,
      username,
      displayName,
      companyPosition,
      pictureUrl,
    },
    error,
    loading: isLoading,
    signInWithEmailAndPassword,
    signOut,
  };
};

export default useUserData;
