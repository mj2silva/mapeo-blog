import {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import { auth } from '../../lib/firebase';

type SignInData = {
  email: string,
  password: string,
}

const LoginForm : FC = () => {
  const [formValues, setFormValues] = useState<SignInData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');

  const signin = async () : Promise<void> => {
    const { email, password } = formValues;
    await auth.signInWithEmailAndPassword(email, password);
  };
  const handleChange = (event : ChangeEvent<HTMLInputElement>) : void => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) : Promise<void> => {
    event.preventDefault();
    try {
      signin();
    } catch (e) {
      setError(e.message);
      // alert(error.message);
    }
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
