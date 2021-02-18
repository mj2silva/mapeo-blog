import {
  FC, ReactNode, useEffect, useState,
} from 'react';
import usePage from '../hooks/usePage';

export type Props = {
  id: string,
  className: string,
  activeClassName: string,
  tags: string[],
  children: ReactNode,
  isInViewport?: boolean,
}

const hasTagInUrl = (tags: string[], url: string) : boolean => {
  let hasTag : boolean = false;
  tags.forEach((tag) => {
    if (url.includes(tag)) hasTag = true;
  });
  return hasTag;
};

const HeaderNavLink : FC<Props> = ({
  id, tags, className, activeClassName, children,
} : Props) => {
  const [currentClassName, setCurrentClassName] = useState('');
  const { currentVisible } = usePage();

  useEffect(() => {
    if (currentVisible && hasTagInUrl(tags, currentVisible)) setCurrentClassName(activeClassName);
    else setCurrentClassName('');
  }, [currentVisible, tags, activeClassName]);

  return (
    <li id={id} className={`${className} ${currentClassName}`}>
      {children}
    </li>
  );
};

export default HeaderNavLink;
