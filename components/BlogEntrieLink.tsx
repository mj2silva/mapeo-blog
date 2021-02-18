import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BlogEntrie from '../types/BlogEntrie';

type Props = {
  blogEntrie: Partial<BlogEntrie>
}

const BlogEntrieLink : FC<Props> = (props : Props) => {
  const { blogEntrie } = props;
  return (
    <div className="blog-entrie-link">
      <Link href={`/posts/${blogEntrie.slug}`}>
        <a>
          <div className="blog-entrie-link__image">
            <Image src={blogEntrie.coverImageUrl} alt="Post 1" layout="fill" objectFit="cover" objectPosition="center" />
          </div>
          <div className="blog-entrie-link__description">
            <img src={blogEntrie.author.photoUrl} alt="post 1 author" width="50" height="50" />
            <div className="blog-entrie-link__tag">
              <span>{blogEntrie.topic}</span>
              {' '}
              -
              <span className="blog-entrie-link__date">{blogEntrie.publicationDate.toISOString()}</span>
            </div>
            <div className="blog-entrie-link__title">
              <h3>
                {blogEntrie.title}
              </h3>
            </div>
            <div className="blog-entrie-link__author">
              Por
              {' '}
              <strong>{blogEntrie.author.name}</strong>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default BlogEntrieLink;
