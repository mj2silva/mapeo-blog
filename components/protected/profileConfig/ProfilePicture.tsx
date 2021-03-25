import {
  ChangeEventHandler, FC, useContext, useState,
} from 'react';
import UserContext from '../../../lib/userContext';

const ProfilePicture : FC = () => {
  const { user } = useContext(UserContext);
  const [formValue, setFormValue] = useState<string>(user.pictureUrl || '');
  const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
    setFormValue(event.target.value);
  };
  return (
    <form className="configuration__form">
      <label htmlFor="profilePicture" className="configuration__input configuration__input--file">
        <div className="configuration__form-label">Tu foto de perfil</div>
        <input name="profilePicture" type="file" value={formValue} onChange={handleChange} />
      </label>
      <button className="configuration__form-button" type="submit">Guardar</button>
    </form>
  );
};

export default ProfilePicture;
