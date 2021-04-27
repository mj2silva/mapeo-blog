import { FC } from 'react';

const BlogPostCommentForm: FC = () => (
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
);

export default BlogPostCommentForm;
