import Image from 'next/image';
import { FC } from 'react';
import { PostData } from '../lib/types';

type Props = {
  postData: PostData,
  isPreview?: boolean,
}

const defaultProps : Partial<Props> = {
  isPreview: false,
};

const BlogPost : FC<Props> = (props: Props) => {
  const { postData, isPreview } = props;
  return (
    <section className={`blogpost__post ${(isPreview) ? 'blogpost__post--preview' : ''}`}>
      <div className="blogpost__tag">
        <h3>Marketing Leaders</h3>
      </div>
      <div className="blogpost__title">
        <h1>
          { postData.title }
        </h1>
      </div>
      <div className="blogpost__author">
        <div className="blogpost__author-name">
          Por
          {' '}
          <strong>{ postData.authorUId }</strong>
        </div>
        <div className="blogpost__date">
          { postData.createdDate.toLocaleDateString('es-ES') || new Date().toLocaleDateString() }
          {' '}
          a las
          {' '}
          { postData.createdDate.toLocaleTimeString('es-ES') || new Date().toLocaleTimeString() }
        </div>
      </div>
      <div className="blogpost__content">
        { (postData.post?.blocks?.map((block, index) => {
          if (block.type === 'paragraph') {
            return (
              <p
                key={block.data.text.slice(0, 3) + index.toString()}
              >
                {block.data.text}
              </p>
            );
          }
          if (block.type === 'header') {
            return (
              <h3
                key={block.data.text.slice(0, 3) + index.toString()}
              >
                {block.data.text}
              </h3>
            );
          }
          if (block.type === 'image') {
            return (
              <div className="blogpost__image-container" style={{ width: '40rem', height: '20rem', position: 'relative' }}>
                <Image src={block.data.file.url} layout="fill" objectFit="contain" />
              </div>
            );
          }
          return null;
        })) }
      </div>
    </section>
  );
};

BlogPost.defaultProps = defaultProps;

export default BlogPost;
