import {
  ChangeEvent, FC, FormEvent, useContext, useState,
} from 'react';
import UserContext from '../../lib/userContext';

type SignInData = {
  email: string,
  password: string,
}

const LoginForm : FC = () => {
  const [formValues, setFormValues] = useState<SignInData>({ email: '', password: '' });
  const { signInWithEmailAndPassword, error } = useContext(UserContext);
  const handleChange = (event : ChangeEvent<HTMLInputElement>) : void => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) : Promise<void> => {
    event.preventDefault();
    const { email, password } = formValues;
    await signInWithEmailAndPassword(email, password);
  };
  return (
    <form className="login-form__form" onSubmit={handleSubmit}>
      <label className="login-form__element" htmlFor="email">
        Email:
        <input
          placeholder="hola@mapeo.pe"
          className="login-form__input"
          name="email"
          type="email"
          onChange={handleChange}
        />
      </label>
      <label className="login-form__element" htmlFor="password">
        Contraseña:
        <input
          placeholder="*********"
          className="login-form__input"
          name="password"
          type="password"
          onChange={handleChange}
        />
      </label>
      { (error) ? (
        <div className="login-form__error">
          Nombre de usuario y/o contraseña inválidos.
        </div>
      ) : null }
      <button
        className="login-form__button"
        type="submit"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default LoginForm;
