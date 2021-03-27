import {
  FC, useContext,
} from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../../lib/firebase';
import { PostData } from '../../lib/types';
import UserContext from '../../lib/userContext';
import Spinner from '../common/Spinner';
import UserPost from './UserPost';

const mapFirebasePostsToPostsData = (firebasePost) : PostData[] => firebasePost.map((post) => ({
  id: post.id,
  authorUId: post.autorId,
  createdDate: new Date(post.fechaDeCreacion.seconds * 1000),
  post: {
    blocks: Object.keys(post.post).map((key) => post.post[key]),
    editorInfo: post.metadata?.editorInfo?.version,
  },
  slug: post.slug,
  isPublic: post.publicado || false,
  title: post.titulo,
}));

const UserPosts : FC = () => {
  const { user } = useContext(UserContext);
  const postsRef = firestore.collection('blogPosts').where('autorId', '==', user.uid);
  const [posts, loading, error] = useCollectionDataOnce<PostData>(postsRef);
  return (
    <div className={`user-posts ${loading && 'loading-container'}`}>
      {
        (!loading && posts)
          ? mapFirebasePostsToPostsData(posts).map(
            (post) => (
              <UserPost post={post} />
            ),
          )
          : <Spinner />
      }
      { error && <div>Hubo un error al traer los datos</div> }
    </div>
  );
};

export default UserPosts;
