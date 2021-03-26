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
      <h3 className="user-post__title">{ post.title }</h3>
      <div className="user-post__date">{ post.createdDate?.toLocaleDateString() }</div>
      <p className="user-post__summary">
        { post.post?.blocks?.reduce((prev, curr) => {
          if (curr.type === 'paragraph') {
            return `${prev + curr.data.text} `;
          }
          return '';
        }, '')}
      </p>
    </CustomLink>
  );
};

export default UserPost;
