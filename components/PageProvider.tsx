import {
  createContext, Dispatch, FC, ReactNode, SetStateAction,
} from 'react';
import usePageContext from '../hooks/usePageContext';

type PageContextReturn = {
  currentVisible: string,
  setCurrentVisible: Dispatch<SetStateAction<string>>
}

export const PageContext = createContext<PageContextReturn>(null);

type Props = {
  children: ReactNode,
}

const defaultProps : Partial<Props> = {
};

const PageProvider : FC<Props> = ({ children } : Props) => {
  const {
    currentVisible, setCurrentVisible,
  } = usePageContext();

  return (
    <PageContext.Provider
      value={{
        currentVisible,
        setCurrentVisible,
      }}
    >
      { children }
    </PageContext.Provider>
  );
};

PageProvider.defaultProps = defaultProps;

export default PageProvider;
