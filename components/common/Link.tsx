import Link from 'next/link';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode,
  href: string,
  className?: string,
}

const CustomLink : FC<Props> = ({ children, href, className } : Props) => (
  <Link href={href}>
    <a className={className}>
      { children }
    </a>
  </Link>
);

CustomLink.defaultProps = {
  className: null,
};

export default CustomLink;
