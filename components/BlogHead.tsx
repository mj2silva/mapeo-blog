import { FC } from 'react';

type Props = {
  tags?: string[],
}

const defaultProps: Partial<Props> = {
  tags: [],
};

const BlogHead: FC<Props> = (props: Props) => {
  const { tags } = props;
  return (
    <section className="head">
      <div className="head__title">
        <h1>Blog</h1>
      </div>
      <div className="head__controls">
        <div className="head__controls-keywords">
          <h3>Palabras clave</h3>
          <ul>
            {
              tags.map((tag) => (<li>{tag}</li>))
            }
          </ul>
        </div>
        <div className="head__controls-search">
          <form>
            <input type="search" name="search" id="search" placeholder="Buscar..." />
          </form>
        </div>
      </div>
    </section>
  );
};

BlogHead.defaultProps = defaultProps;

export default BlogHead;
