/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps } : AppProps) : ReactElement {
  const router = useRouter();
  const { asPath } = router;
  const isInternal = asPath.includes('/internal/');
  return (Component.displayName !== 'Error 404') ? (
    <Layout isPublic={!isInternal}>
      <Component {...pageProps} />
    </Layout>
  ) : <Component {...pageProps} />;
}

export default MyApp;
