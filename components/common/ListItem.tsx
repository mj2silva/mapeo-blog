import { FC } from 'react';
import { ListItemProps } from '../../lib/types';

const ListItem : FC<ListItemProps> = ({ children } : ListItemProps) => (
  <li>
    { children }
  </li>
);

export default ListItem;
