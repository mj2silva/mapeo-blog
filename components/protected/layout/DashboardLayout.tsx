import {
  FC, ReactNode, useContext,
} from 'react';
import UserContext from '../../../lib/userContext';
import LoadingScreen from '../LoadingScreen';
import DashboardNavigation from './DashboardNavigation';

type Props = {
  children: ReactNode
}

const DashboardLayout : FC<Props> = ({ children } : Props) => {
  const { user, loading } = useContext(UserContext);
  if (loading) {
    return <LoadingScreen />;
  }
  return (user.uid) ? (
    <main>
      <div className="internal-dash">
        <div className="internal-dash__tabs">
          <DashboardNavigation
            className="internal-dash__tab"
            activeClassName="internal-dash__tab--selected"
            navItemsArray={[
              { displayName: 'Mis Posts', href: '/internal/posts' },
              { displayName: 'Crear Post', href: '/internal/nuevo-post' },
              { displayName: 'Configuración', href: '/internal/configuracion' },
            ]}
          />
        </div>
        <div className="internal-dash__content">
          { children }
        </div>
      </div>
    </main>
  ) : <>{ children }</>;
};

export default DashboardLayout;
