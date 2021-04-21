import { FC, ReactNode } from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import BlogEntrieLink from '../components/BlogEntrieLink';
import ScheduleMeeting from '../components/ScheduleMeeting';
// import { blogPosts } from '../mock/blogPosts';
import { getPostTags, getPublicBlogPosts } from '../lib/repository/blogPosts';
import { PostData, SerializedBlogPost } from '../lib/types';
import { deserializeBlogPost, serializeBlogPost } from '../lib/utils';
import BlogHead from '../components/BlogHead';

const renderBlogLinks = (
  blogPostList: PostData[],
) : ReactNode[] => blogPostList.map((blog) => <BlogEntrieLink key={`blg-link-${blog.slug}`} post={blog} />);

export const getStaticProps : GetStaticProps = async () => {
  const blogPosts = await getPublicBlogPosts();
  const serializedBlogPosts = blogPosts.map((blog) => serializeBlogPost(blog));
  const tags = await getPostTags();
  return {
    props: { blogPosts: serializedBlogPosts, tags },
    revalidate: 10,
  };
};

type Props = {
  blogPosts: SerializedBlogPost[],
  tags: string[]
}

const Home: FC<Props> = (props: Props) => {
  const { blogPosts, tags } = props;
  const { query } = useRouter();
  const { tag: selectedTag } = query;
  return (
    <main className="main">
      <Head>
        <title>Blog - Mapeo</title>
      </Head>
      <BlogHead tags={tags} />
      <section className="blog-entries">
        <div className="blog-entries__row">
          { renderBlogLinks(blogPosts?.filter((post) => {
            if (selectedTag) {
              return post.tags.includes(selectedTag.toString().toUpperCase());
            }
            return true;
          })
            .map((post) => deserializeBlogPost(post))) }
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
