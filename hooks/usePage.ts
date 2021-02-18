import {
  useContext,
} from 'react';
import { PageContext } from '../components/PageProvider';

const usePage = () => {
  const {
    currentVisible,
    setCurrentVisible,
  } = useContext(PageContext);

  return {
    currentVisible,
    setCurrentVisible,
  };
};

export default usePage;
