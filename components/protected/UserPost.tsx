import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser from 'react-html-parser';
import { FC } from 'react';
import { PostData } from '../../lib/types';
import CustomLink from '../common/Link';

type Props = {
  post: PostData,
}

const UserPost : FC<Props> = (props : Props) => {
  const { post } = props;
  return (
    <CustomLink href={`/internal/posts/${post.slug}`} className="user-post">
      <div className="user-post__header">
        <h3 className="user-post__title">{ post.title }</h3>
        <div className="user-post__controls">
          <button type="button" className="user-post__delete">
            <FontAwesomeIcon icon={faEraser} />
          </button>
        </div>
      </div>
      <div className="user-post__date">{ `Creado el ${post.createdDate?.toLocaleDateString()} a las ${post.createdDate.toLocaleTimeString()}` }</div>
      <p className="user-post__summary">
        { ReactHtmlParser(`${post.post?.blocks?.reduce((prev, curr) => {
          if (curr.type === 'paragraph') {
            return `${prev + curr.data.text} `;
          }
          return '';
        }, '').trim().slice(0, 250)}...`)}
      </p>
    </CustomLink>
  );
};

export default UserPost;
