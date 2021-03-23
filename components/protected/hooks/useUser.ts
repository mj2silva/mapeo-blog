import {
  useContext,
} from 'react';
import { User } from '../../../lib/types';
import { UserContext } from '../UserContext';

const useUser = () : User => {
  const {
    username,
    email,
  } = useContext<User>(UserContext);

  return {
    username,
    email,
  };
};

export default useUser;
