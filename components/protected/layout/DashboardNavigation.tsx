import { FC } from 'react';
import DashboardNavLink from './DashboardNavLink';

type Props = {
  navItemsArray: { href: string, displayName: string }[],
  className: string,
  activeClassName: string,
}

const DashboardNavigation : FC<Props> = (props: Props) => {
  const { navItemsArray, className, activeClassName } = props;
  return (
    <ul>
      {(navItemsArray.map((item) => (
        <DashboardNavLink className={className} activeClassName={activeClassName} href={item.href}>
          { item.displayName }
        </DashboardNavLink>
      )))}
    </ul>
  );
};

export default DashboardNavigation;
