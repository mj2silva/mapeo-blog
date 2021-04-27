import {
  FC, useContext, useEffect, useState,
} from 'react';
import { getUserBlogPosts } from '../../lib/repository/blogPosts';
import { PostData } from '../../lib/types';
import UserContext from '../../lib/userContext';
import CustomLink from '../common/Link';
import Spinner from '../common/Spinner';
import GetMorePostsButton from './GetMorePostsButton';
import Metatags from './Metatags';
import UserPost from './UserPost';

const LIMIT = 3;

const UserPosts : FC = () => {
  const { user } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostData[]>(null);
  const [error, setError] = useState(null);
  const [userSubs, setUserSubs] = useState([]);
  // Efecto para cancelar las suscripciones cuando el componente es desmontado

  useEffect(() => {
    const loadUserPosts = async () : Promise<void> => {
      try {
        setIsLoading(true);
        const [loadedPosts, cancelPostSub] = await getUserBlogPosts(
          user.uid, { limit: LIMIT }, (data) => setPosts(data),
        );
        setPosts(loadedPosts);
        setIsLoading(false);
        setUserSubs((prev) => [...prev, cancelPostSub]);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    loadUserPosts();
    return userSubs.forEach((cancelSub) => {
      cancelSub();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getMorePosts = async () : Promise<boolean> => {
    const last = posts[posts.length - 1];
    const [newPosts, cancelPostSub] = await getUserBlogPosts(
      user.uid, { limit: LIMIT, cursor: last.createdDate }, (data) => setPosts(posts.concat(data)),
    );
    setUserSubs((prev) => [...prev, cancelPostSub]);
    setPosts(posts.concat(newPosts));
    return newPosts.length < LIMIT;
  };

  return (
    <div className={`user-posts ${isLoading && 'loading-container'}`}>
      <Metatags title={`Mis posts | ${user.username}`} />
      {
        (!isLoading && posts)
          ? posts.map(
            (post) => (
              <UserPost key={post.id} post={post} />
            ),
          )
          : <Spinner />
      }
      {
        (!error
          && !isLoading
          && (posts?.length > 0)
          && <GetMorePostsButton getMorePosts={getMorePosts} />
        )
      }
      { (!error && !isLoading && (posts?.length === 0 || !posts))
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
          Hubo un error al traer los datos, por favor, intente más tarde:
          {' '}
          { error.message }
        </h3>
      </div>
      ) }
    </div>
  );
};

export default UserPosts;
