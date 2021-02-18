import { FC, ReactNode } from 'react';
import BlogEntrie from '../types/BlogEntrie';
import BlogEntrieLink from './BlogEntrieLink';

const renderBlogLinks = (
  blogPostList: BlogEntrie[],
) : ReactNode[] => blogPostList.map((blog) => <BlogEntrieLink key={`blg-link-${blog.slug}`} blogEntrie={blog} />);

type Props = {
  recomendedBlogPosts: BlogEntrie[]
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
