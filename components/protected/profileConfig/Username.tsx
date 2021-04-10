import {
  ChangeEventHandler, FC, useContext, useEffect, useState,
} from 'react';
import debounce from 'lodash.debounce';
import { checkUsernameExists } from '../../../lib/repository/users';
import UserContext from '../../../lib/userContext';

const Username : FC = () => {
  const { user } = useContext(UserContext);

  const [formValue, setFormValue] = useState(user.username || '');
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async () : Promise<void> => {

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
        <button className="configuration__form-button" type="submit" disabled={!isLoading && !isValid}>
          Guardar
        </button>
      </form>
    </section>
  );
};

export default Username;
