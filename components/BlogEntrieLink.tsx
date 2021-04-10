import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PostData } from '../lib/types';

type Props = {
  post: Partial<PostData>
}

const BlogEntrieLink : FC<Props> = (props : Props) => {
  const { post } = props;

  return (
    <div className="blog-entrie-link">
      <Link href={`/posts/${post.slug}`}>
        <a>
          <div className="blog-entrie-link__image">
            <Image src="/image.png" alt="Post 1" layout="fill" objectFit="cover" objectPosition="center" />
          </div>
          <div className="blog-entrie-link__description">
            <img src="/author.png" alt="post 1 author" width="50" height="50" />
            <div className="blog-entrie-link__tag">
              <span>Marketing Leaders (Placeholder para tags)</span>
              {' '}
              -
              {' '}
              <span className="blog-entrie-link__date">{new Date(post.createdDate).toLocaleDateString()}</span>
            </div>
            <div className="blog-entrie-link__title">
              <h3>
                {post.title}
              </h3>
            </div>
            <div className="blog-entrie-link__author">
              Por
              {' '}
              <strong>{post.authorUId}</strong>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BlogEntrieLink;
