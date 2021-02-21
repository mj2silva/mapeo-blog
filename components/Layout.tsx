import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import PageProvider from './PageProvider';
import InternalLayout from '../components/protected/Layout';

type Props = {
  children: ReactNode,
  isPublic?: boolean,
};

const defaultProps : Partial<Props> = {
  isPublic: true,
};

const Layout : FC<Props> = ({ children, isPublic } : Props) => (
  (isPublic) ? (
    <PageProvider>
      <Header />
      <main id="app">
        { children }
      </main>
      <Footer />
    </PageProvider>
  ) : (
    <>
      <InternalLayout>
        { children }
      </InternalLayout>
    </>
  ));

Layout.defaultProps = defaultProps;

export default Layout;
