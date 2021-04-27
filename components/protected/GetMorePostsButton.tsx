import { FC, useState } from 'react';
import Spinner, { SpinnerColors } from '../common/Spinner';

type Props = {
  getMorePosts: () => Promise<void | boolean>;
}

const GetMorePostsButton : FC<Props> = (props : Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postsEnd, setPostsEnd] = useState<boolean>(false);
  const { getMorePosts } = props;

  const handleGetMorePosts = async () : Promise<void> => {
    setIsLoading(true);
    const isEnd = await getMorePosts();
    setPostsEnd(isEnd || false);
    setIsLoading(false);
  };

  return (
    <div className="user-posts__loader">
      {
        isLoading && <Spinner width={20} height={20} color={SpinnerColors.violet} />
      }
      {
        !isLoading && !postsEnd
        && <button className="user-posts__button" type="button" onClick={handleGetMorePosts}>Cargar más posts</button>
      }
      { postsEnd && 'Has llegado al final de los posts :)' }
    </div>
  );
};

export default GetMorePostsButton;
