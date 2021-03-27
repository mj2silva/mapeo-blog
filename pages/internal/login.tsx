import { FC } from 'react';
import CustomLink from '../../components/common/Link';
import LoginForm from '../../components/protected/LoginForm';
import Metatags from '../../components/protected/Metatags';

const Login : FC = () => (
  <main>
    <Metatags title="Iniciar sesión | Mapeo" />
    <div className="login-form">
      <h1 className="login-form__title">Bienvenido</h1>
      <p className="login-form__message">Para continuar, por favor ingresa tus credenciales de acceso</p>
      <LoginForm />
      <p className="login-form__no-user-message">
        ¿Estás aquí por error? No te preocupes, puedes visitar nuestro
        {' '}
        <CustomLink className="login-form__no-user-link" href="https://blog.mapeo.pe">blog</CustomLink>
        {' '}
        o puedes ir a conocernos en nuestra
        {' '}
        <CustomLink className="login-form__no-user-link" href="https://mapeo.pe">página principal</CustomLink>
      </p>
    </div>
  </main>
);

export default Login;
