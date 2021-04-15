import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FC, useState } from 'react';
import BlogPost from '../../components/BlogPost';
import { getPublicBlogPostBySlug, getPublicBlogPosts } from '../../lib/repository/blogPosts';
import { SerializedBlogPost } from '../../lib/types';
import { deserializeBlogPost, serializeBlogPost } from '../../lib/utils';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  try {
    const blogPost = typeof slug === 'string' ? await getPublicBlogPostBySlug(slug) : await getPublicBlogPostBySlug(slug[0]);
    const path = blogPost.slug;
    return {
      props: {
        postData: serializeBlogPost(blogPost),
        path,
      },
      revalidate: 5000,
    };
  } catch (err) {
    return {
      props: {
        postData: null,
      },
      revalidate: 5000,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await getPublicBlogPosts();
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (err) {
    return null;
  }
};

type Props = {
  postData: SerializedBlogPost;
}

const BlogPostPage : FC<Props> = (props: Props) => {
  const { postData } = props;
  const [blogPost] = useState(deserializeBlogPost(postData));
  return (
    (!blogPost) ? <div>Loading...</div> : (
      <main className="main">
        <Head>
          <title>
            {blogPost.title}
            {' '}
            - Mapeo
          </title>
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
        <BlogPost postData={blogPost} isPreview={false} />
        {/* <div className="blogpost__abstract">
            <summary>
              <p>
                { blogPost.abstract }
              </p>
            </summary>
          </div> */}
        {/* <div className="blogpost__content">
            { (blogPost.post.blocks.map((parragraph, index) => (
              <p
                key={parragraph.data.(0, 3) + index.toString()}
              >
                {parragraph}
              </p>
            ))) }
          </div> */}
        {/* <PostRecomendations recomendedBlogPosts={recomendedBlogPosts} /> */}
      </main>
    )
  );
};

export default BlogPostPage;
