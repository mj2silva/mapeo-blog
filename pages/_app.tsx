/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import Layout from '../components/Layout';
import { analitycs } from '../lib/firebase';
import '../styles/globals.scss';

function MyApp({ Component, pageProps } : AppProps) : ReactElement {
  const router = useRouter();
  const { asPath } = router;
  const isInternal = asPath.includes('/internal/');
  useEffect(() => {
    analitycs();
  }, []);
  return (Component.displayName !== 'Error 404') ? (
    <Layout isPublic={!isInternal}>
      <Component {...pageProps} />
    </Layout>
  ) : <Component {...pageProps} />;
}

export default MyApp;
