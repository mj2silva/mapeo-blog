import { useState, FC, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import CustomLink from './common/Link';
import HeaderNavLink from './HeaderNavLink';
import HeaderNavDropDown from './HeaderNavDropDown';

const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL || '';

const HeaderMenu : FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const visibleClassName = 'navigation__list--mobile';
  const hiddenClassName = 'navigation__list--hidden';
  const [currentClassName, setCurrentClassName] = useState<string>(hiddenClassName);

  const onClick = () : void => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) setCurrentClassName(visibleClassName);
    else setCurrentClassName(hiddenClassName);
  }, [isOpen]);
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        id="headerMenuIcon"
        className="header__menu-icon"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div id="headerNavigation" className={`navigation ${currentClassName}`}>
        <ul className={`navigation__list ${currentClassName}`}>
          <button
            type="button"
            onClick={onClick}
            id="closeMenuNav"
            className="header__menu-close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <HeaderNavLink
            tags={['nosotros']}
            id="navItem2"
            className="navigation__item navigation__item--orange"
            activeClassName="navigation__item--active"
          >
            <CustomLink href={`${landingUrl}/#nosotros`} onClick={onClick} tabIndex={-1}>Nosotros</CustomLink>
          </HeaderNavLink>
          <div className="navigation__dropdown">
            <HeaderNavDropDown
              tags={['soluciones', 'marketing', 'personas']}
              id="navItem2"
              className="navigation__item navigation__item--purple"
              activeClassName="navigation__item--active"
              text="Soluciones"
            >
              <li className="navigation__dropdown-item">
                <CustomLink href={`${landingUrl}/#marketing`} onClick={onClick} tabIndex={-1}>Marketing</CustomLink>
              </li>
              <li className="navigation__dropdown-item">
                <CustomLink href={`${landingUrl}/#personas`} onClick={onClick} tabIndex={-1}>Personas</CustomLink>
              </li>
            </HeaderNavDropDown>
          </div>
          <HeaderNavLink
            tags={['portafolio']}
            id="navItem3"
            className="navigation__item navigation__item--skyblue"
            activeClassName="navigation__item--active"
          >
            <CustomLink href={`${landingUrl}/portafolio`} onClick={onClick} tabIndex={-1}>Portafolio</CustomLink>
          </HeaderNavLink>
          <HeaderNavLink
            tags={['blog']}
            id="navItem4"
            className="navigation__item navigation__item--yellow"
            activeClassName="navigation__item--active"
          >
            <CustomLink href="/" onClick={onClick} tabIndex={-1}>Blog</CustomLink>
          </HeaderNavLink>
          <HeaderNavLink
            tags={['tu-primer-mapeo']}
            id="navItem5"
            className="navigation__item navigation__item--violet"
            activeClassName="navigation__item--active"
          >
            <CustomLink href={`${landingUrl}/#primer-mapeo`} onClick={onClick} tabIndex={-1}>Tu primer Mapeo</CustomLink>
          </HeaderNavLink>
        </ul>
      </div>
    </>
  );
};

export default HeaderMenu;
