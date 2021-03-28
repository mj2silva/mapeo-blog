import { faExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deletePost } from '../../lib/firebase';
import { SpinnerColors } from '../common/Spinner';

const mapeoSwal = Swal.mixin({
  confirmButtonText: 'Sip',
  denyButtonText: 'Nop',
  confirmButtonColor: SpinnerColors.skyblue,
  denyButtonColor: SpinnerColors.red,
  buttonsStyling: false,
  showLoaderOnConfirm: true,
  customClass: {
    popup: 'alert__popup',
    confirmButton: 'alert__button alert__button--confirm',
    denyButton: 'alert__button alert__button--deny',
  },
  showClass: {
    popup: 'alert__fade-in',
  },
  hideClass: {
    popup: 'alert__fade-out',
    backdrop: 'alert__fade-out',
    icon: 'alert__fade-out',
  },
});

const RMapeoSwal = withReactContent(mapeoSwal);

const WarningIcon : FC = () => (
  <div className="alert__icon--warning">
    <FontAwesomeIcon icon={faExclamation} />
  </div>
);

type Props = {
  postId: string,
}

const DeletePostButton : FC<Props> = (props : Props) => {
  const { postId } = props;
  const className = 'user-post__control user-post__control--delete';
  const handleDeletePost = async () : Promise<void> => {
    const swalResponse = await RMapeoSwal.fire({
      preConfirm: async () => {
        const deletedPost = await deletePost(postId);
        return deletedPost;
      },
      title: (
        <h3 className="alert__title">
          ¿Estás seguro de que deseas eliminar el post
          {' '}
          {postId}
          ?
        </h3>),
      html: <p className="alert__text">Una vez que borres, el post no podrá ser recuperado</p>,
      icon: 'warning',
      iconHtml: <WarningIcon />,
      iconColor: SpinnerColors.yellow,
      showDenyButton: true,
    });
    if (swalResponse.isConfirmed) {
      RMapeoSwal.fire({
        confirmButtonText: 'OK',
        title: (
          <h3 className="alert__title">
            Eliminado
          </h3>),
        html: (
          <p className="alert__text">
            Se ha eliminado correctamente el post con el id:
            {' '}
            {swalResponse.value}
          </p>),
      });
    }
  };
  return (
    <button onClick={handleDeletePost} type="button" className={className}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
};

export default DeletePostButton;
