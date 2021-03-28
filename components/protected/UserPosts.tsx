import {
  FC, useContext,
} from 'react';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import { firestore } from '../../lib/firebase';
import { PostData } from '../../lib/types';
import UserContext from '../../lib/userContext';
import CustomLink from '../common/Link';
import Spinner from '../common/Spinner';
import Metatags from './Metatags';
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
  const postsRef = firestore.collection('blogPosts').where('autorId', '==', user.uid).orderBy('fechaDeCreacion', 'desc');
  const [posts, loading, error] = useCollectionDataOnce<PostData>(postsRef, {
    idField: 'id',
  });
  return (
    <div className={`user-posts ${loading && 'loading-container'}`}>
      <Metatags title={`Mis posts | ${user.username}`} />
      {
        (!loading && posts)
          ? mapFirebasePostsToPostsData(posts).map(
            (post) => (
              <UserPost key={post.id} post={post} />
            ),
          )
          : <Spinner />
      }
      { (!error && !loading && (posts?.length === 0 || !posts))
         && (
         <div className="user-posts__no-posts">
           <h3>
             ¡Hey! Parece que aún no has escrito ningún post. Empieza creando el primero
             {' '}
             <CustomLink className="user-posts__no-posts-link" href="/internal/nuevo-post">aquí</CustomLink>
           </h3>
         </div>
         )}
      { error && (
      <div className="user-posts__error">
        <h3>
          Hubo un error al traer los datos, por favor, intente más tarde
          {' '}
          { error.message }
        </h3>
      </div>
      ) }
    </div>
  );
};

export default UserPosts;
