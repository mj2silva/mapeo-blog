import {
  FC, ReactNode, useContext,
} from 'react';
import UserContext from '../../../lib/userContext';
import CustomLink from '../../common/Link';
import LoadingScreen from '../LoadingScreen';

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
          <ul>
            <li className="internal-dash__tab internal-dash__tab--selected">
              <CustomLink href="/internal/home">Mis posts</CustomLink>
            </li>
            <li className="internal-dash__tab">
              <CustomLink href="/internal/nuevo-post">Crear post</CustomLink>
            </li>
            <li className="internal-dash__tab">
              <CustomLink href="/internal/configuracion">Configuración</CustomLink>
            </li>
          </ul>
        </div>
        <div className="internal-dash__content">
          { children }
        </div>
      </div>
    </main>
  ) : <>{ children }</>;
};

export default DashboardLayout;
