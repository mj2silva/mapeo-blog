import Image from 'next/image';
import { FC } from 'react';
import { ImageBlock as ImageBlockType } from '../../lib/types';

type Props = {
  data: ImageBlockType,
}

const ImageBlock: FC<Props> = ({ data } : Props) => {
  const prefixClassName = 'blogpost__image-container';
  const strechedClassName = data.stretched ? `${prefixClassName}--streched` : '';
  const borderClassName = data.withBorder ? `${prefixClassName}--with-border` : '';
  const backgroundClassName = data.withBackground ? `${prefixClassName}--with-background` : '';
  const className = `${prefixClassName} ${borderClassName} ${backgroundClassName} ${strechedClassName}`.trim();
  return (
    <div className={className}>
      <figure>
        <Image src={data.file.url} layout="fill" />
        <figcaption>{data.caption}</figcaption>
      </figure>
    </div>
  );
};

export default ImageBlock;
