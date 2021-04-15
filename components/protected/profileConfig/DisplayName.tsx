import {
  ChangeEventHandler, FC, FormEventHandler, useContext, useState,
} from 'react';
import { updateDisplayName } from '../../../lib/repository/users';
import UserContext from '../../../lib/userContext';

const DisplayName : FC = () => {
  const { user } = useContext(UserContext);
  const [formValue, setFormValue] = useState<string>(user.displayName || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormValue(event.target.value);
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await updateDisplayName(user, formValue);
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="configuration__form">
      <label htmlFor="displayName" className="configuration__input">
        <div className="configuration__form-label">Tu nombre completo</div>
        <input name="displayName" type="text" value={formValue} onChange={handleChange} />
      </label>
      <button disabled={isLoading} className="configuration__form-button" type="submit">Guardar</button>
    </form>
  );
};

export default DisplayName;
