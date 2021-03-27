import Head from 'next/head';
import { FC } from 'react';

type Props = {
  title: string,
  description?: string,
  imageUrl?: string,
  isPublic?: boolean,
}

const defaultProps : Partial<Props> = {
  description: null,
  imageUrl: null,
  isPublic: false,
};

const Metatags : FC<Props> = (props : Props) => {
  const {
    title, description, imageUrl, isPublic,
  } = props;
  return (
    <Head>
      <title>{title || 'Mapeo'}</title>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta charSet="utf-8" />
      {(isPublic) && (
      <>
        <meta
          name="description"
          content={
            description
            || 'Creamos soluciones que desafían lo tradicional, humanizando marcas que generen resultados de gran impacto'
          }
        />
        <meta
          property="og:image"
          content={imageUrl || 'https://mapeo.pe/img/mapeo-sharing.png'}
        />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          property="og:image:width"
          content="1200"
        />
        <meta
          property="og:image:height"
          content="630"
        />
        <meta
          property="og:title"
          content={title || 'MAPEO: Soluciones a medida para tu empresa'}
        />
        <meta
          property="og:description"
          content={
            description
            || 'Creamos soluciones que desafían lo tradicional, humanizando marcas que generen resultados de gran impacto'
          }
        />
      </>
      )}
    </Head>
  );
};

Metatags.defaultProps = defaultProps;

export default Metatags;
