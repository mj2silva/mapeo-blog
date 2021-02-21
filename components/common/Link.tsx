import Link from 'next/link';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode,
  href: string,
  className?: string,
  onClick?: (event) => void;
  tabIndex?: number;
  isBlank?: boolean;
}

const CustomLink : FC<Props> = ({
  children, href, className, onClick, tabIndex, isBlank,
} : Props) => (
  <Link href={href} passHref={isBlank}>
    <a
      onClick={onClick}
      className={className}
      role="button"
      tabIndex={tabIndex}
      onKeyUp={onClick}
      target={(isBlank) ? '_blank' : ''}
      rel={(isBlank) ? 'noreferrer' : ''}
    >
      { children }
    </a>
  </Link>
);

CustomLink.defaultProps = {
  className: null,
  onClick: null,
  tabIndex: 1,
  isBlank: false,
};

export default CustomLink;
