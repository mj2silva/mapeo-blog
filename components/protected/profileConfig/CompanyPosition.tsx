import {
  ChangeEventHandler, FC, FormEventHandler, useContext, useState,
} from 'react';
import { updateCompanyPosition } from '../../../lib/repository/users';
import UserContext from '../../../lib/userContext';

const CompanyPosition : FC = () => {
  const { user } = useContext(UserContext);
  const [formValue, setFormValue] = useState<string>(user.companyPosition || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormValue(event.target.value);
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await updateCompanyPosition(user, formValue);
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="configuration__form">
      <label htmlFor="companyPosition" className="configuration__input">
        <div className="configuration__form-label">Tu puesto en MAPEO</div>
        <input name="companyPosition" type="text" value={formValue} onChange={handleChange} />
      </label>
      <button disabled={isLoading} className="configuration__form-button" type="submit">Guardar</button>
    </form>
  );
};

export default CompanyPosition;
