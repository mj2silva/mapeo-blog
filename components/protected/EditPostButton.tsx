import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';
import CustomLink from '../common/Link';

type Props = {
  postSlug: string,
}

const EditPostButton : FC<Props> = (props : Props) => {
  const { postSlug } = props;
  const basePath = '/internal/posts/';
  const className = 'link user-post__control user-post__control--edit';
  return (
    <CustomLink
      href={basePath + postSlug}
      className={className}
    >
      <FontAwesomeIcon icon={faEdit} />
    </CustomLink>
  );
};

export default EditPostButton;
