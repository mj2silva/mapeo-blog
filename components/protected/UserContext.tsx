import {
  createContext, FC, ReactNode,
} from 'react';
import useUserContext from './hooks/useUserContext';

type UserContextReturn = {
  email: string,
  username: string,
}

export const UserContext = createContext<UserContextReturn>({ username: 'Manuel', email: null });

type Props = {
  children: ReactNode,
}

const defaultProps : Partial<Props> = {
};

const UserProvider : FC<Props> = ({ children } : Props) => {
  const {
    username, email,
  } = useUserContext();

  return (
    <UserContext.Provider
      value={{
        username,
        email,
      }}
    >
      { children }
    </UserContext.Provider>
  );
};

UserProvider.defaultProps = defaultProps;

export default UserProvider;
