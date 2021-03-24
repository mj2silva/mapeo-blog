/* eslint-disable react/jsx-props-no-spreading */
import Link, { LinkProps } from 'next/link';
import { FC, ReactNode } from 'react';

type Props = LinkProps & {
  children: ReactNode,
  className?: string,
  onClick?: (event) => void;
  tabIndex?: number;
  isBlank?: boolean;
}

const CustomLink : FC<Props> = (props : Props) => {
  const {
    children, href, className, onClick, tabIndex, isBlank,
  } = props;
  return (
    <Link {...props} href={href} passHref={isBlank}>
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
};

CustomLink.defaultProps = {
  className: null,
  onClick: null,
  tabIndex: 1,
  isBlank: false,
};

export default CustomLink;
