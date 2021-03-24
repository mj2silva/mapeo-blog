import { FC, useContext } from 'react';
import UserContext from '../../../lib/userContext';

const SignOutButton : FC = () => {
  const { signOut } = useContext(UserContext);

  const logOut = async () : Promise<void> => {
    await signOut();
  };
  return (
    <button onClick={logOut} className="internal-header__button" type="button">Cerrar sesión</button>
  );
};

export default SignOutButton;
