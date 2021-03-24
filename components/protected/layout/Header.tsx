import Image from 'next/image';
import { FC, useContext } from 'react';
import UserContext from '../../../lib/userContext';
import SignOutButton from './SignOutButton';

const Header : FC = () => {
  const { user, loading } = useContext(UserContext);
  return !loading && (
    <header className="internal-header">
      <div className="internal-header__logo-container">
        <Image src="/img/logo-mapeo.svg" layout="fill" />
      </div>
      <div className="internal-header__controls">
        {
          (user.uid)
            ? (
              <>
                <div className="internal-header__profile">
                  {user.username || ''}
                </div>
                <SignOutButton />
              </>
            )
            : (
              null
            )
        }
      </div>
    </header>
  );
};

export default Header;
