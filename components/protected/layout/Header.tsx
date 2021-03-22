import Image from 'next/image';
import { FC } from 'react';
import { User } from '../../../lib/types';

type Props = {
  user: User,
}

const Header : FC<Props> = (props : Props) => {
  const { user } = props;
  return (
    <header className="internal-header">
      <div className="internal-header__logo-container">
        <Image src="/img/logo-mapeo.svg" layout="fill" />
      </div>
      <div className="internal-header__controls">
        {
          (user)
            ? (
              <div>
                <div>
                  {user.username}
                </div>
                <button type="button">Cerrar sesión</button>
              </div>
            )
            : (
              <div>
                <button type="button">Iniciar sesión</button>
              </div>
            )
        }
      </div>
    </header>
  );
};

export default Header;
