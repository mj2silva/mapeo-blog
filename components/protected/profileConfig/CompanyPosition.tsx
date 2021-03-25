import {
  ChangeEventHandler, FC, useContext, useState,
} from 'react';
import UserContext from '../../../lib/userContext';

const CompanyPosition : FC = () => {
  const { user } = useContext(UserContext);
  const [formValue, setFormValue] = useState<string>(user.companyPosition || '');
  const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormValue(event.target.value);
  };
  return (
    <form className="configuration__form">
      <label htmlFor="companyPosition" className="configuration__input">
        <div className="configuration__form-label">Tu puesto en MAPEO</div>
        <input name="companyPosition" type="text" value={formValue} onChange={handleChange} />
      </label>
      <button className="configuration__form-button" type="submit">Guardar</button>
    </form>
  );
};

export default CompanyPosition;
