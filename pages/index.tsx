import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import BlogEntrieLink from '../components/BlogEntrieLink';
import ScheduleMeeting from '../components/ScheduleMeeting';
// import { blogPosts } from '../mock/blogPosts';
import { getPublicBlogPosts } from '../lib/repository/blogPosts';
import { PostData, SerializedBlogPost } from '../lib/types';
import { deserializeBlogPost, serializeBlogPost } from '../lib/utils';

const renderBlogLinks = (
  blogPostList: PostData[],
) : ReactNode[] => blogPostList.map((blog) => <BlogEntrieLink key={`blg-link-${blog.slug}`} post={blog} />);

export const getStaticProps : GetStaticProps = async () => {
  const blogPosts = await getPublicBlogPosts();
  const serializedBlogPosts = blogPosts.map((blog) => serializeBlogPost(blog));
  return {
    props: { blogPosts: serializedBlogPosts },
    revalidate: 5000,
  };
};

type Props = {
  blogPosts: SerializedBlogPost[]
}

const Home: FC<Props> = (props: Props) => {
  const { blogPosts } = props;
  return (
    <main className="main">
      <Head>
        <title>Blog - Mapeo</title>
      </Head>
      <section className="head">
        <div className="head__title">
          <h1>Blog</h1>
        </div>
        <div className="head__controls">
          <div className="head__controls-keywords">
            <h3>Palabras clave</h3>
            <ul>
              <li>Marketing</li>
              <li>Leads</li>
              <li>Estrategia</li>
            </ul>
          </div>
          <div className="head__controls-search">
            <form>
              <input type="search" name="search" id="search" placeholder="Buscar..." />
            </form>
          </div>
        </div>
      </section>
      <section className="blog-entries">
        <div className="blog-entries__row">
          { renderBlogLinks(blogPosts.map((post) => deserializeBlogPost(post))) }
        </div>

        <div className="blog-entries__pagination">
          <ul>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">...</a></li>
            <li><a href="#">30</a></li>
          </ul>
        </div>
      </section>
      <ScheduleMeeting />
    </main>
  );
};

export default Home;
