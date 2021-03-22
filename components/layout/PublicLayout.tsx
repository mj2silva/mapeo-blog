import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import PageProvider from './PageProvider';

type Props = {
  children: ReactNode
}

const PublicLayout : FC<Props> = (props : Props) => {
  const { children } = props;
  return (
    <PageProvider>
      <Header />
      <main id="app">
        { children }
      </main>
      <Footer />
    </PageProvider>
  );
};

export default PublicLayout;
