import Image from 'next/image';
import { FC } from 'react';
import { PostData } from '../lib/types';
import PostBlock from './postBlocks/PostBlock';

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
        <h3>
          { postData.tags?.map((tag, index) => {
            if (index === postData.tags.length - 1) {
              return (<span key={`blp-${tag}`}>{tag}</span>);
            }
            return (
              <span key={`blp-${tag}`}>
                {tag}
                ,
                {' '}
              </span>
            );
          }) }
        </h3>
      </div>
      <div className="blogpost__title">
        <h1>
          { postData.title }
        </h1>
      </div>
      <div className="blogpost__author">
        <div className="blogpost__author-image">
          <Image src={postData.author?.photoUrl} alt="Foto autor" layout="fill" />
        </div>
        <div className="blogpost__author-name">
          Por
          {' '}
          <strong>{ postData.author?.name }</strong>
        </div>
        <div className="blogpost__date">
          { postData.createdDate?.toLocaleDateString('es-ES') || new Date().toLocaleDateString() }
        </div>
      </div>
      <div className="blogpost__content">
        { (postData.post?.blocks?.map((block, index) => <PostBlock key={`${block.type}-${index * 2}`} block={block} />)) }
      </div>
    </section>
  );
};

BlogPost.defaultProps = defaultProps;

export default BlogPost;
