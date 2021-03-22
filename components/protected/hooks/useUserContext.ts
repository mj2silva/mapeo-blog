import {
  useState,
} from 'react';

interface PageHook {
  username: string,
  email: string,
  setUsername,
  setEmail,
}

const useSliderContext = () : PageHook => {
  const [username, setUsername] = useState<string>('manuel');
  const [email, setEmail] = useState<string>(null);

  return {
    email,
    username,
    setUsername,
    setEmail,
  };
};

export default useSliderContext;
