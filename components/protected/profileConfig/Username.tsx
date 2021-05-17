import {
  ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState,
} from 'react';
import debounce from 'lodash.debounce';
import { toast } from 'react-toastify';
import Spinner, { SpinnerColors } from '../../common/Spinner';
import { checkUsernameExists, updateUserName } from '../../../lib/repository/users';
import UserContext from '../../../lib/userContext';

const Username : FC = () => {
  const { user } = useContext(UserContext);

  const [formValue, setFormValue] = useState(user.username || '');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUsernameValid = debounce(async () : Promise<void> => {
      if (formValue.length >= 3) {
        const exists = await checkUsernameExists(formValue);
        setIsValid(exists);
        setIsLoading(false);
      }
    }, 500);
    checkUsernameValid();
  }, [formValue]);

  const handleSubmit : FormEventHandler<HTMLFormElement> = async (event) : Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await updateUserName(user, formValue);
      toast.success('Se actualizó tu nombre de usuario correctamente', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      setError(err);
      toast.error('Hubo un error al actualizar los datos, intenta nuevamente más tarde', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange : ChangeEventHandler<HTMLInputElement> = async (e) : Promise<void> => {
    const usernameValue = e.target.value.toLowerCase();
    const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (usernameValue.length < 3) {
      setFormValue(usernameValue);
      setIsLoading(false);
      setIsValid(false);
    }

    if (regex.test(usernameValue)) {
      setFormValue(usernameValue);
      setIsLoading(true);
      setIsValid(false);
    }
  };
  return user.uid && (
    <section>
      <form className="configuration__form" onSubmit={handleSubmit}>
        <label className="configuration__input" htmlFor="username">
          <div className="configuration__form-label">Nombre de usuario:</div>
          <input type="text" name="username" onChange={handleChange} value={formValue} />
        </label>
        <button disabled={isLoading} className="configuration__form-button" type="submit">
          { isLoading ? <Spinner width={10} height={10} color={SpinnerColors.yellow} /> : 'Guardar' }
        </button>
        { (!isValid && formValue !== user.username)
        && <span>Nombre de usuario inválido o ya existe</span>}
        { error && (
        <div>
          Error:
          {' '}
          {error}
        </div>
        )}
      </form>
    </section>
  );
};

export default Username;
