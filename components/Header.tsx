import { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

import CustomLink from './common/Link';

const Header : FC = () => (
  <header className="header" id="header">
    <div className="header__logo">
      <CustomLink href="/#">
        <img src="/img/logo-mapeo.svg" alt="Logo mapeo" width="92" />
      </CustomLink>
    </div>
    <div id="headerMenuIcon" className="header header__menu-icon">
      <i>
        <FontAwesomeIcon icon={faBars} />
      </i>
    </div>
    <div id="headerNavigation" className="navigation">
      <ul className="navigation__list">
        <div id="closeMenuNav" className="header__menu-close">
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <li id="navItem1" className="navigation__item navigation__item--orange">
          <CustomLink href="/#nosotros">Nosotros</CustomLink>
        </li>
        <div className="navigation__dropdown">
          <li id="navItem2" className="navigation__item navigation__item--purple">
            Soluciones
            {'  '}
            <FontAwesomeIcon icon={faChevronDown} />
          </li>
          <ul className="navigation__dropdown-list">
            <li className="navigation__dropdown-item">
              <CustomLink href="/#marketing">Marketing</CustomLink>
            </li>
            <li className="navigation__dropdown-item">
              <CustomLink href="/#personas">Personas</CustomLink>
            </li>
          </ul>
        </div>
        <li id="navItem3" className="navigation__item navigation__item--skyblue">
          <CustomLink href="/portafolio">Portafolio</CustomLink>
        </li>
        <li id="navItem4" className="navigation__item navigation__item--yellow">
          <CustomLink href="/blog">Blog</CustomLink>
        </li>
        <li id="navItem5" className="navigation__item navigation__item--violet">
          <CustomLink href="/#primer-mapeo">Tu primer Mapeo</CustomLink>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
