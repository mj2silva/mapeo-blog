import { useRouter } from 'next/router';
import {
  FC, ReactNode, useEffect, useState,
} from 'react';
import useUser from '../hooks/useUser';
import UserProvider from '../UserContext';
import Header from './Header';
import LoadingScreen from '../LoadingScreen';

type Props = {
  children: ReactNode
}

const PrivateLayout : FC<Props> = (props: Props) => {
  const { children } = props;
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const isLogin = router.pathname.endsWith('login');
    if (user.username && isLogin) {
      router.push('/internal/home');
    } else if (!user.username && !isLogin) {
      router.push('/internal/login');
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [user, router]);

  return (
    <UserProvider>
      { (!isLoading)
        ? (
          <>
            <Header user={user} />
            <main id="app">
              { children }
            </main>
          </>
        )
        : (
          <LoadingScreen />
        )}
    </UserProvider>
  );
};

export default PrivateLayout;
