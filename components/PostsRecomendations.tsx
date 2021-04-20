import { FC, ReactNode } from 'react';
import { PostData } from '../lib/types';
import BlogEntrieLink from './BlogEntrieLink';

const renderBlogLinks = (
  blogPostList: PostData[],
) : ReactNode[] => blogPostList.map((blog) => <BlogEntrieLink key={`blg-link-${blog.slug}`} post={blog} />);

type Props = {
  recomendedBlogPosts: PostData[]
}

const PostRecomendations : FC<Props> = ({ recomendedBlogPosts } : Props) => (
  <section className="blogpost__recomendations">
    <h2>También te puede interesar...</h2>
    <div className="blog-entries__row">
      { renderBlogLinks(recomendedBlogPosts) }
    </div>
  </section>
);

export default PostRecomendations;
