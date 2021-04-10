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

  useEffect(() => {
    const loadUserPosts = async () : Promise<void> => {
      try {
        setIsLoading(true);
        const loadedPosts = await getUserBlogPosts(user.uid, { limit: LIMIT });
        setPosts(loadedPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadUserPosts();
  }, [user]);

  const getMorePosts = async () : Promise<boolean> => {
    const last = posts[posts.length - 1];
    const newPosts = await getUserBlogPosts(user.uid, { limit: LIMIT, cursor: last.createdDate });
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
        !isLoading && <GetMorePostsButton getMorePosts={getMorePosts} />
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
