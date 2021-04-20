import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostData } from '../lib/types';
import { peruvianDateString } from '../lib/utils';

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
            <Image src={post.coverPictureUrl || '/img/post-blog.png'} alt="Post 1" layout="fill" objectFit="cover" objectPosition="center" />
          </div>
          <div className="blog-entrie-link__description">
            <div className="blog-entrie-link__profile-picture">
              <Image src={post.author.photoUrl} alt="post 1 author" layout="fill" />
            </div>
            <div className="blog-entrie-link__tag">
              <span>Marketing Leaders (Placeholder para tags)</span>
              {' '}
              -
              {' '}
              <span className="blog-entrie-link__date">{peruvianDateString(post.createdDate)}</span>
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
