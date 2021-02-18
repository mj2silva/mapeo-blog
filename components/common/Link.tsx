import Link from 'next/link';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode,
  href: string,
  className?: string,
  onClick?: (event) => void;
  tabIndex?: number;
}

const CustomLink : FC<Props> = ({
  children, href, className, onClick, tabIndex,
} : Props) => (
  <Link href={href}>
    <a
      onClick={onClick}
      className={className}
      role="button"
      tabIndex={tabIndex}
      onKeyUp={onClick}
    >
      { children }
    </a>
  </Link>
);

CustomLink.defaultProps = {
  className: null,
  onClick: null,
  tabIndex: 1,
};

export default CustomLink;
