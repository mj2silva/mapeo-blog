import { FC, useEffect } from 'react';
import usePage from '../hooks/usePage';

import CustomLink from './common/Link';
import HeaderMenu from './HeaderMenu';

const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL || '';

const Header : FC = () => {
  const { setCurrentVisible } = usePage();

  useEffect(() => {
    setCurrentVisible('blog');
  }, [setCurrentVisible]);
  return (
    <header className="header" id="header">
      <div className="header__logo">
        <CustomLink href={`${landingUrl}/`}>
          <img src="/img/logo-mapeo.svg" alt="Logo mapeo" width="92" />
        </CustomLink>
      </div>
      <HeaderMenu />
    </header>
  );
};

export default Header;
