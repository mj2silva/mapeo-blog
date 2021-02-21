import {
  FC, ReactNode, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import InternalHeader from './Header';
import UserProvider from './UserContext';
import useUser from './hooks/useUser';

type Props = {
  children: ReactNode,
};

const defaultProps : Partial<Props> = {
};

const Layout : FC<Props> = ({ children } : Props) => {
  const { username } = useUser();
  const router = useRouter();
  const [accessGranted, setAccessGranted] = useState<boolean>(false);

  useEffect(() => {
    if (!username) {
      if (!router.pathname.endsWith('login')) {
        router.push('/internal/login');
      }
    } else if (username && router.pathname.endsWith('login')) {
      router.push('/internal/editor');
    } else {
      setAccessGranted(true);
    }
  }, [username, router]);

  return router.pathname.endsWith('login')
    ? (
      <UserProvider>
        <main id="app">
          { children }
        </main>
      </UserProvider>
    ) : ((accessGranted)
      ? (
        <UserProvider>
          <InternalHeader />
          <main id="app">
            { children }
          </main>
        </UserProvider>
      )
      : null);
};

Layout.defaultProps = defaultProps;

export default Layout;
