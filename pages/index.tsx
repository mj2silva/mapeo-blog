import {
  FC, ReactNode, useEffect, useState,
} from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import BlogEntrieLink from '../components/BlogEntrieLink';
import ScheduleMeeting from '../components/ScheduleMeeting';
import { getPostTags, getPublicBlogPosts, getPublicBlogPostsByTag } from '../lib/repository/blogPosts';
import { PostData, SerializedBlogPost } from '../lib/types';
import { deserializeBlogPost, serializeBlogPost } from '../lib/utils';
import BlogHead from '../components/BlogHead';
import Spinner from '../components/common/Spinner';
import ReactPixel from '../components/ReactPixel';

const renderBlogLinks = (
  blogPostList: PostData[],
) : ReactNode[] => blogPostList.map((blog) => <BlogEntrieLink key={`blg-link-${blog.slug}`} post={blog} />);

export const getStaticProps : GetStaticProps = async () => {
  const blogPosts = await getPublicBlogPosts();
  const serializedBlogPosts = blogPosts.map((blog) => serializeBlogPost(blog));
  const tags = await getPostTags();
  return {
    props: { blogPosts: serializedBlogPosts, tags },
    revalidate: 600,
  };
};

type Props = {
  blogPosts: SerializedBlogPost[],
  tags: string[]
}

const Home: FC<Props> = (props: Props) => {
  const { blogPosts, tags } = props;
  const { query } = useRouter();
  const { tag } = query;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestedPosts, setRequestedPosts] = useState<PostData[]>(null);
  useEffect(() => {
    const initPixel = async () : Promise<void> => {
      const pixel = await ReactPixel();
      pixel.pageView();
    };
    initPixel();
  }, []);

  const onTagsChange = async (selectedTags: string[]): Promise<void> => {
    setIsLoading(true);
    if (selectedTags.length > 0) {
      const newPosts = await getPublicBlogPostsByTag(selectedTags);
      setRequestedPosts(newPosts);
    } else {
      setRequestedPosts([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (tag) onTagsChange([tag.toString().toUpperCase()]);
  }, [tag]);

  return (
    <main className="main">
      <Head>
        <title>Blog - Mapeo</title>
      </Head>
      <BlogHead
        selectedTag={tag?.toString().toUpperCase()}
        onTagsChange={onTagsChange}
        tags={tags}
      />
      <section className="blog-entries">
        <div className="blog-entries__row">
          {
            (!isLoading && (blogPosts || requestedPosts))
              ? (
                renderBlogLinks(
                  (requestedPosts?.length && requestedPosts)
                  || (blogPosts)?.map((post) => deserializeBlogPost(post)),
                )
              )
              : (
                <Spinner />
              )
          }
        </div>
        <div className="blog-entries__pagination">
          <ul>
            <li><a href="#">1</a></li>
          </ul>
        </div>
      </section>
      <ScheduleMeeting />
    </main>
  );
};

export default Home;
