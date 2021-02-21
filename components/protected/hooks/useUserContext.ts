import {
  useState,
} from 'react';

interface PageHook {
  username: string,
  email: string
}

const useSliderContext = () : PageHook => {
  const [username, setUsername] = useState<string>('manuel');
  const [email, setEmail] = useState<string>(null);

  return {
    email,
    username,
  };
};

export default useSliderContext;
