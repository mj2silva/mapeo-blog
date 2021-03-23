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
          (user.username)
            ? (
              <>
                <div className="internal-header__profile">
                  {user.username}
                </div>
                <button className="internal-header__button" type="button">Cerrar sesión</button>
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
