import {
  ChangeEventHandler, FC, FormEventHandler, useContext, useState,
} from 'react';
import { toast } from 'react-toastify';
import { updateCompanyPosition } from '../../../lib/repository/users';
import UserContext from '../../../lib/userContext';
import Spinner, { SpinnerColors } from '../../common/Spinner';

const CompanyPosition : FC = () => {
  const { user } = useContext(UserContext);
  const [formValue, setFormValue] = useState<string>(user.companyPosition || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormValue(event.target.value);
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await updateCompanyPosition(user, formValue);
      toast.success('Se actualizó tu puesto correctamente', {
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
  return (
    <form onSubmit={handleSubmit} className="configuration__form">
      <label htmlFor="companyPosition" className="configuration__input">
        <div className="configuration__form-label">Tu puesto en MAPEO</div>
        <input name="companyPosition" type="text" value={formValue} onChange={handleChange} />
      </label>
      <button disabled={isLoading} className="configuration__form-button" type="submit">
        { isLoading ? <Spinner width={10} height={10} color={SpinnerColors.yellow} /> : 'Guardar' }
      </button>
      { error && (
        <div>
          Error:
          {' '}
          {error}
        </div>
      )}
    </form>
  );
};

export default CompanyPosition;
