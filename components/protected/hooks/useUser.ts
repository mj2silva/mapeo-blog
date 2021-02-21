import {
  useContext,
} from 'react';
import { UserContext } from '../UserContext';

const useUser = () => {
  const {
    username,
    email,
  } = useContext(UserContext);

  return {
    username,
    email,
  };
};

export default useUser;
