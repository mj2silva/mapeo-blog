import { FC } from 'react';

const UserPosts : FC = () => (
  <div className="user-posts">
    <div className="user-post">
      <h3 className="user-post__title">Mi primer post</h3>
      <div className="user-post__date">22/03/2021</div>
      <p className="user-post__summary">
        Este es el resumen del post Este es el resumen del post Este es el resumen del post
        Este es el resumen del post Este es el resumen del post Este es el resumen del post
      </p>
    </div>
    <div className="user-post">
      <h3 className="user-post__title">Mi segundo post</h3>
      <div className="user-post__date">20/03/2021</div>
      <p className="user-post__summary">
        Este es el resumen del post Este es el resumen del post Este es el resumen del post
        Este es el resumen del post Este es el resumen del post Este es el resumen del post
      </p>
    </div>
  </div>
);

export default UserPosts;
