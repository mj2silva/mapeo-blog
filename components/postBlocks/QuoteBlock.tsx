import { FC } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { QuoteBlock as QuoteBlockType } from '../../lib/types';

type Props = {
  data: QuoteBlockType,
}

const QuoteBlock: FC<Props> = ({ data } : Props) => {
  const alignmentClassName = (data.alignment === 'center') ? 'blogpost__quote--center' : '';
  const content = ReactHtmlParser(data.text.trim());
  return (
    <figure className={`blogpost__quote ${alignmentClassName}`}>
      <blockquote>
        {content}
      </blockquote>
      <figcaption>{data.caption}</figcaption>
    </figure>
  );
};

export default QuoteBlock;
