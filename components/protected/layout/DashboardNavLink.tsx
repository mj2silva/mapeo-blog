/* eslint-disable react/jsx-props-no-spreading */
import { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import {
  FC, ReactNode, useEffect, useState,
} from 'react';
import CustomLink from '../../common/Link';

type Props = LinkProps & {
  className: string,
  activeClassName: string,
  children: ReactNode,
}

const DashboardNavLink : FC<Props> = (props : Props) => {
  const {
    className, activeClassName, href, children, ...linkProps
  } = props;
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (router.pathname.startsWith(href.toString())) setIsActive(true);
    else setIsActive(false);
  }, [router.pathname, href]);
  return (
    <li className={`${className} ${isActive && activeClassName}`}>
      <CustomLink href={href} {...linkProps}>{ children }</CustomLink>
    </li>
  );
};

export default DashboardNavLink;
