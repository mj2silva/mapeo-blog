import { FC, ReactNode } from 'react';
import PrivateLayout from './protected/layout/PrivateLayout';
import PublicLayout from './layout/PublicLayout';

type Props = {
  children: ReactNode,
  isPublic?: boolean,
};

const defaultProps : Partial<Props> = {
  isPublic: true,
};

const Layout : FC<Props> = ({ children, isPublic } : Props) => (
  (isPublic)
    ? (
      <PublicLayout>
        { children }
      </PublicLayout>
    )
    : (
      <PrivateLayout>
        { children }
      </PrivateLayout>
    )
);

Layout.defaultProps = defaultProps;

export default Layout;
