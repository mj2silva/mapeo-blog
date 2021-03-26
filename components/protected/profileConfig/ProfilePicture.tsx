import {
  ChangeEventHandler, FC, FormEventHandler, useContext, useState,
} from 'react';
import {
  STATE_CHANGED, updateUserProfilePicture, uploadImage,
} from '../../../lib/firebase';
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
        setUploading(false);
      }).catch((err) => {
        setError(err.message);
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
      <button disabled={uploading} className="configuration__form-button" type="submit">Guardar</button>
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
