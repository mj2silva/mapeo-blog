import {
  ChangeEventHandler, FC, FormEventHandler, useContext, useState,
} from 'react';

import { toast } from 'react-toastify';
import Spinner, { SpinnerColors } from '../../common/Spinner';

import { STATE_CHANGED } from '../../../lib/firebase';
import { updateUserProfilePicture } from '../../../lib/repository/users';
import { uploadImage } from '../../../lib/repository/files';
import UserContext from '../../../lib/userContext';

const ProfilePicture : FC = () => {
  const { user } = useContext(UserContext);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<string>('0');
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [error, setError] = useState(null);

  const handleSubmit : FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (selectedFile) {
      setUploading(true);
      const filePath = `blog/users/${user.uid}/profile-picture`;
      const [ref, task] = uploadImage(selectedFile, filePath);
      task.on(STATE_CHANGED, (snapshot) => {
        const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
        setProgress(percentage);
      });
      task.then(async () => {
        const newDownloadUrl = await ref.getDownloadURL();
        await updateUserProfilePicture(newDownloadUrl, user.uid);
        toast.success('Se actualizó tu foto de perfil correctamente', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setUploading(false);
      }).catch((err) => {
        setError(err.message);
        toast.error('Hubo un error al actualizar los datos, intenta nuevamente más tarde', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setUploading(false);
      });
    }
  };
  const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const file = Array.from(event.target.files)[0];
    setSelectedFile(file);
  };
  return (
    <form onSubmit={handleSubmit} className="configuration__form">
      <label htmlFor="profilePicture" className="configuration__input configuration__input--file">
        <div className="configuration__form-label">Cambiar foto de perfil</div>
        <input name="profilePicture" type="file" onChange={handleChange} />
      </label>
      <button disabled={uploading} className="configuration__form-button" type="submit">
        { uploading ? <Spinner width={10} height={10} color={SpinnerColors.yellow} /> : 'Guardar' }
      </button>
      {uploading && (
      <div>
        Subiendo:
        {' '}
        {progress}
      </div>
      ) }
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

export default ProfilePicture;
