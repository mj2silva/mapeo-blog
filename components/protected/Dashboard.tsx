import { FC } from 'react';

const Dashboard : FC = () => (
  <main>
    <div className="internal-dash">
      <div className="internal-dash__tabs">
        <ul>
          <li className="internal-dash__tab internal-dash__tab--selected">
            <button type="button">Mis posts</button>
          </li>
          <li className="internal-dash__tab">
            <button type="button">Crear post</button>
          </li>
          <li className="internal-dash__tab">
            <button type="button">Configuración</button>
          </li>
        </ul>
      </div>
      <div className="internal-dash__content">
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
      </div>
    </div>
  </main>
);

export default Dashboard;
