import {
  ChangeEventHandler, FC, useContext, useState,
} from 'react';
import UserContext from '../../../lib/userContext';

const DisplayName : FC = () => {
  const { user } = useContext(UserContext);
  const [formValue, setFormValue] = useState<string>(user.displayName || '');
  const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormValue(event.target.value);
  };
  return (
    <form className="configuration__form">
      <label htmlFor="displayName" className="configuration__input">
        <div className="configuration__form-label">Tu nombre completo</div>
        <input name="displayName" type="text" value={formValue} onChange={handleChange} />
      </label>
      <button className="configuration__form-button" type="submit">Guardar</button>
    </form>
  );
};

export default DisplayName;
