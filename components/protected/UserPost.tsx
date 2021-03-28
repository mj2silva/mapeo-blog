import ReactHtmlParser from 'react-html-parser';
import { FC } from 'react';
import { PostData } from '../../lib/types';
import CustomLink from '../common/Link';
import DeletePostButton from './DeletePostButton';
import EditPostButton from './EditPostButton';

type Props = {
  post: PostData,
}

const UserPost : FC<Props> = (props : Props) => {
  const { post } = props;

  return (
    <div className="user-post">
      <div className="user-post__header">
        <CustomLink href={`/internal/posts/${post.slug}`} className="link user-post__title">{ post.title }</CustomLink>
        <div className="user-post__controls">
          <EditPostButton postSlug={post.slug} />
          <DeletePostButton postId={post.id} />
        </div>
      </div>
      <div className="user-post__date">{ `Creado el ${post.createdDate?.toLocaleDateString()} a las ${post.createdDate.toLocaleTimeString()}` }</div>
      <p className="user-post__summary">
        { ReactHtmlParser(`${post.post?.blocks?.reduce((prev, curr) => {
          if (curr.type === 'paragraph') {
            return `${prev + curr.data.text} `;
          }
          return prev;
        }, '').trim().slice(0, 250)}...`)}
      </p>
    </div>
  );
};

export default UserPost;
