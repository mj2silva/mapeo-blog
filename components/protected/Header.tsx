import Image from 'next/image';
import { FC } from 'react';
import { auth } from '../../lib/firebase';

const Header : FC = () => {
  const logOut = async () : Promise<void> => {
    await auth.signOut();
  };
  return (
    <header>
      <div className="internal-header__logo">
        <Image src="/img/logo-mapeo" layout="fill" />
      </div>
      <div className="internal-header__logout">
        <button type="button" onClick={logOut}>Cerrar sesión</button>
      </div>
    </header>
  );
};

export default Header;
