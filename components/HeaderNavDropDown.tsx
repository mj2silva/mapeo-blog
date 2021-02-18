import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FC, ReactNode, useEffect, useState,
} from 'react';
import HeaderNavLink from './HeaderNavLink';

type Props = {
  children: ReactNode,
  text: string,
  className: string,
  activeClassName: string,
  id: string,
  tags: string[],
}

const HeaderNavDropDown : FC<Props> = ({
  children, text, className, activeClassName, id, tags,
} : Props) => {
  const openClassName = 'navigation__dropdown--open';
  const closedClassName = 'navigation__dropdown--closed';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentClassName, setCurrentClassName] = useState<string>(closedClassName);
  useEffect(() => {
    if (isOpen) setCurrentClassName(openClassName);
    else setCurrentClassName(closedClassName);
  }, [isOpen]);
  const onClick = () : void => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <HeaderNavLink
        tags={tags}
        id={id}
        className={className}
        activeClassName={activeClassName}
      >
        <button onClick={onClick} type="button">
          {text}
          {'   '}
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </HeaderNavLink>
      <ul className={`navigation__dropdown-list ${currentClassName}`}>
        { children }
      </ul>
    </>
  );
};

export default HeaderNavDropDown;
