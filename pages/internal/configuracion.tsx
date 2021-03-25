import { FC } from 'react';
import CompanyPosition from '../../components/protected/profileConfig/CompanyPosition';
import DisplayName from '../../components/protected/profileConfig/DisplayName';
import ProfilePicture from '../../components/protected/profileConfig/ProfilePicture';
import Username from '../../components/protected/profileConfig/Username';

const Configuracion : FC = () => (
  <main>
    <Username />
    <DisplayName />
    <ProfilePicture />
    <CompanyPosition />
  </main>
);

export default Configuracion;
