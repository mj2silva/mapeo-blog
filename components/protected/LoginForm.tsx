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
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email:
        <input name="email" type="email" onChange={handleChange} />
      </label>
      <label htmlFor="password">
        Contraseña:
        <input name="password" type="password" onChange={handleChange} />
      </label>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;
