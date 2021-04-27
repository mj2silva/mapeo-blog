import { FC } from 'react';
import { EmbedBlock as EmbedBlockType } from '../../lib/types';

type Props = {
  data: EmbedBlockType,
}

const EmbedBlock: FC<Props> = ({ data } : Props) => (
  <figure className="blogpost__embed">
    <embed height={data.height} width={data.width} src={data.embed} />
    <figcaption>{data.caption}</figcaption>
  </figure>
);

export default EmbedBlock;
