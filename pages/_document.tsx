import Document, {
  Html, Head, Main, NextScript, DocumentContext,
} from 'next/document';
import { ReactElement } from 'react';

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() : ReactElement {
    return (
      <Html lang="es">
        <Head>
          <title>Blog - Mapeo</title>
          <script defer src="/animations/animateInViewport.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
