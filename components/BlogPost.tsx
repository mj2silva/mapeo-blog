import { FC } from 'react';
import { PostData } from '../lib/types';

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
        <div className="blogpost__author-name">
          Por
          {' '}
          <strong>{ postData.authorUId }</strong>
        </div>
        <div className="blogpost__date">{ postData.createdDate?.toUTCString() || new Date().toUTCString() }</div>
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
        { (postData.post.blocks?.map((block, index) => (
          <p
            key={block.data.text.slice(0, 3) + index.toString()}
          >
            {block.data.text}
          </p>
        ))) }
      </div>
    </section>
  );
};

BlogPost.defaultProps = defaultProps;

export default BlogPost;
