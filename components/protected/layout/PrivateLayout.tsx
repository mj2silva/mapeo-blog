import {
  FC, ReactNode,
} from 'react';
import UserContext from '../../../lib/userContext';
import Header from './Header';
import useUserData from '../hooks/useUser';
import DashboardLayout from './DashboardLayout';

type Props = {
  children: ReactNode
}

const PrivateLayout : FC<Props> = ({ children }: Props) => {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <>
        <Header />
        <DashboardLayout>
          { children }
        </DashboardLayout>
      </>
    </UserContext.Provider>
  );
};

export default PrivateLayout;
