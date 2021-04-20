import { FC } from 'react';
import { PostData } from '../lib/types';
import PostBlock from './postBlocks/PostBlock';

type Props = {
  postData: PostData,
  isPreview?: boolean,
}

const defaultProps : Partial<Props> = {
  isPreview: false,
};

const BlogPost : FC<Props> = (props: Props) => {
  const { postData, isPreview } = props;
  return (
    <section className={`blogpost__post ${(isPreview) ? 'blogpost__post--preview' : ''}`}>
      <div className="blogpost__tag">
        <h3>Marketing Leaders</h3>
      </div>
      <div className="blogpost__title">
        <h1>
          { postData.title }
        </h1>
      </div>
      <div className="blogpost__author">
        <div className="blogpost__author-image">
          <img src={postData.author.photoUrl} alt="Foto autor" />
        </div>
        <div className="blogpost__author-name">
          Por
          {' '}
          <strong>{ postData.author?.name }</strong>
        </div>
        <div className="blogpost__date">
          { postData.createdDate?.toLocaleDateString('es-ES') || new Date().toLocaleDateString() }
          {' '}
          a las
          {' '}
          { postData.createdDate?.toLocaleTimeString('es-ES') || new Date().toLocaleTimeString() }
        </div>
      </div>
      <div className="blogpost__content">
        { (postData.post?.blocks?.map((block, index) => <PostBlock key={`${block.type}-${index * 2}`} block={block} />)) }
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
  );
};

BlogPost.defaultProps = defaultProps;

export default BlogPost;
