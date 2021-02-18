import {
  Dispatch,
  SetStateAction, useState,
} from 'react';

interface PageHook {
  currentVisible: string,
  setCurrentVisible: Dispatch<SetStateAction<string>>
}

const useSliderContext = () : PageHook => {
  const [currentVisible, setCurrentVisible] = useState<string>(null);

  return {
    currentVisible,
    setCurrentVisible,
  };
};

export default useSliderContext;
