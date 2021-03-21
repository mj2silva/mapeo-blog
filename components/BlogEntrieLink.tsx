import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BlogPost from '../types/BlogPost';

type Props = {
  post: Partial<BlogPost>
}

const BlogEntrieLink : FC<Props> = (props : Props) => {
  const { post } = props;
  return (
    <div className="blog-entrie-link">
      <Link href={`/posts/${post.slug}`}>
        <a>
          <div className="blog-entrie-link__image">
            <Image src={post.coverImageUrl} alt="Post 1" layout="fill" objectFit="cover" objectPosition="center" />
          </div>
          <div className="blog-entrie-link__description">
            <img src={post.author.photoUrl} alt="post 1 author" width="50" height="50" />
            <div className="blog-entrie-link__tag">
              <span>Marketing Leaders (Placeholder para tags)</span>
              {' '}
              -
              <span className="blog-entrie-link__date">{post.publicationDate.toISOString()}</span>
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

export default BlogEntrieLink;
