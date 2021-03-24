import Head from 'next/head';
import { FC } from 'react';
import CustomLink from '../components/common/Link';

const Error404 : FC = () => (
  <main className="error404">
    <Head>
      <title>Error 404!</title>
    </Head>
    <div className="error404__message">
      <h1 className="error404__error">Ups Error 404</h1>
      <h3 className="error404__description">No se pudo encontrar la página...</h3>
      <h5 className="error404__description">
        <CustomLink href="/" className="error404__backlink">Volver a la página de inicio</CustomLink>
      </h5>
    </div>
  </main>
);

Error404.displayName = 'Error 404';

export default Error404;
