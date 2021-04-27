import { FC } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { ParagraphBlock as ParagraphBlockType } from '../../lib/types';

type Props = {
  data: ParagraphBlockType,
}

const ParagraphBlock: FC<Props> = ({ data } : Props) => (
  <p className="blogpost__paragraph">
    { ReactHtmlParser(data.text.trim()) }
  </p>
);

export default ParagraphBlock;
