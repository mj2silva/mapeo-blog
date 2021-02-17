import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import blogPosts from '../../mock/blogPosts';
import BlogEntrie from '../../types/BlogEntrie';

const BlogPost : FC = () => {
  const [blogPost, setBlogPost] = useState<BlogEntrie>(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const loadedBlogPost = blogPosts.filter((blog) => blog.slug === slug)[0];
    setBlogPost(loadedBlogPost);
  }, [slug]);

  return (
    (!blogPost) ? <div>Loading...</div> : (
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
        <section className="blogpost__post">
          <div className="blogpost__tag">
            <h3>{ blogPost.topic }</h3>
          </div>
          <div className="blogpost__title">
            <h1>
              { blogPost.title }
            </h1>
          </div>
          <div className="blogpost__author">
            <div className="blogpost__author-image">
              <img src={blogPost.author.photoUrl} alt="Foto autor" />
            </div>
            <div className="blogpost__author-name">
              Por
              {' '}
              <strong>{ blogPost.author.name }</strong>
            </div>
            <div className="blogpost__date">{ blogPost.publicationDate.toUTCString() }</div>
          </div>
          <div className="blogpost__abstract">
            <summary>
              <p>
                { blogPost.abstract }
              </p>
            </summary>
          </div>
          <div className="blogpost__table-of-contents">
            <div className="blogpost__table-of-contents-title">
              <h3>Índice de contenido</h3>
            </div>
            <div className="blogpost__table-of-contents-list">
              <ul>
                <li><a href="#">1. ¿Cuál es la mejor estrategia para captar clientes tan grandes y exclusivos?</a></li>
                <li><a href="#">2. Los “test” en inbound marketing, una táctica efectiva para generar leads y posicionamiento de marca</a></li>
                <li><a href="#">3. ¿Cuándo invertir en publicidad en prensa especializada y cuándo no?</a></li>
              </ul>
            </div>
          </div>
          <div className="blogpost__content">
            { (blogPost.parragraphs.map((parragraph) => (<p>{parragraph}</p>))) }
          </div>
          <div className="blogpost__comment-form">
            <form>
              <h2>¿Y tú qué opinas? ¡Déjanos aquí tus comentarios!</h2>
              <input className="blogpost__comment-form-input" type="text" placeholder="Nombre" />
              <input className="blogpost__comment-form-input" type="text" placeholder="Apellido" />
              <input className="blogpost__comment-form-input" type="email" placeholder="Email" />
              <textarea className="blogpost__comment-form-input" placeholder="Mensaje" />
              <button className="button" type="submit">Enviar</button>
            </form>
          </div>
        </section>
      </main>
    )
  );
};

export default BlogPost;
