/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps } : AppProps) : ReactElement {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
