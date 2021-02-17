import { FC, ReactNode } from 'react';
import BlogEntrieLink from '../components/BlogEntrieLink';
import ScheduleMeeting from '../components/ScheduleMeeting';
import BlogEntrie from '../types/BlogEntrie';
import blogPosts from '../mock/blogPosts';

const renderBlogLinks = (
  blogPostList: BlogEntrie[],
) : ReactNode[] => blogPostList.map((blog) => <BlogEntrieLink blogEntrie={blog} />);

const Home: FC = () => (
  <main className="main">
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
        { renderBlogLinks(blogPosts) }
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

export default Home;
