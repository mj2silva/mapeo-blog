import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import PageProvider from './PageProvider';

type Props = {
  children: ReactNode,
};

const Layout : FC<Props> = ({ children } : Props) => (
  <PageProvider>
    <Header />
    <main id="app">
      { children }
    </main>
    <Footer />
  </PageProvider>
);

export default Layout;
