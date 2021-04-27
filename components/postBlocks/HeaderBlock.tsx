import { FC } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { HeaderBlock as HeaderBlockType } from '../../lib/types';

type Props = {
  data: HeaderBlockType,
}

const HeaderBlock: FC<Props> = ({ data } : Props) => {
  const content = ReactHtmlParser(data.text);
  switch (data.level) {
    case 1:
      return <h1>{content}</h1>;
    case 2:
      return <h2>{content}</h2>;
    case 3:
      return <h3>{content}</h3>;
    default:
      return <h4>{content}</h4>;
  }
};

export default HeaderBlock;
