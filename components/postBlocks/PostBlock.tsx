import { FC } from 'react';
import { PostBlock as PostBlockType } from '../../lib/types';
import EmbedBlock from './EmbedBlock';
import HeaderBlock from './HeaderBlock';
import ImageBlock from './ImageBlock';
import ParagraphBlock from './ParagraphBlock';
import QuoteBlock from './QuoteBlock';

type Props = {
  block: PostBlockType,
}

const PostBlock: FC<Props> = ({ block } : Props) => {
  switch (block.type) {
    case 'paragraph':
      return <ParagraphBlock data={block.data} />;
    case 'header':
      return <HeaderBlock data={block.data} />;
    case 'image':
      return <ImageBlock data={block.data} />;
    case 'quote':
      return <QuoteBlock data={block.data} />;
    case 'embed':
      return <EmbedBlock data={block.data} />;
    default:
      return null;
  }
};

export default PostBlock;
