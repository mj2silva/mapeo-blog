import { FC, useContext } from 'react';
import Metatags from '../../components/protected/Metatags';
import CompanyPosition from '../../components/protected/profileConfig/CompanyPosition';
import DisplayName from '../../components/protected/profileConfig/DisplayName';
import ProfilePicture from '../../components/protected/profileConfig/ProfilePicture';
import Username from '../../components/protected/profileConfig/Username';
import UserContext from '../../lib/userContext';

const Configuracion : FC = () => {
  const { user } = useContext(UserContext);
  return (
    <main>
      <Metatags title={`Configuración | ${user.username}`} />
      <Username />
      <DisplayName />
      <ProfilePicture />
      <CompanyPosition />
    </main>
  );
};

export default Configuracion;
