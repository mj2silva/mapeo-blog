import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostData } from '../lib/types';
import { firsLetterToUpper, peruvianDateString } from '../lib/utils';

type Props = {
  post: Partial<PostData>,
  isPreview?: boolean,
}

const defaultProps: Partial<Props> = {
  isPreview: false,
};

const BlogEntrieLink : FC<Props> = (props : Props) => {
  const { post, isPreview } = props;

  return (
    <div className={`blog-entrie-link ${isPreview ? 'blog-entrie-link--preview' : ''}`}>
      <Link href={`/posts/${post.slug}`}>
        <a>
          <div className="blog-entrie-link__image">
            <Image src={post.coverPictureUrl || '/img/post-blog.png'} alt={post.title} layout="fill" objectFit="cover" objectPosition="center" />
          </div>
          <div className="blog-entrie-link__description">
            <div className="blog-entrie-link__profile-picture">
              <Image src={post.author?.photoUrl || '/img/writer.png'} alt={post.author.name} layout="fill" />
            </div>
            <div className="blog-entrie-link__tag">
              { post.tags?.map((tag, index) => {
                if (index === post.tags.length - 1) {
                  return (<span key={`be-${tag}`}>{firsLetterToUpper(tag)}</span>);
                }
                return (
                  <span key={`be-${tag}`}>
                    {firsLetterToUpper(tag)}
                    ,
                    {' '}
                  </span>
                );
              }) }
              {' '}
              -
              {' '}
              <span className="blog-entrie-link__date">{peruvianDateString(post.createdDate || new Date())}</span>
            </div>
            <div className="blog-entrie-link__title">
              <h3>
                {post.title}
              </h3>
            </div>
            <div className="blog-entrie-link__author">
              Por
              {' '}
              <strong>{post.author.name}</strong>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

BlogEntrieLink.defaultProps = defaultProps;

export default BlogEntrieLink;
