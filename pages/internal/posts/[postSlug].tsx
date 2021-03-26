import { useRouter } from 'next/router';
import { FC } from 'react';
import Editor from '../../../components/protected/Editor';

const PostEditor : FC = () => {
  const router = useRouter();
  const { postSlug } = router.query;
  return <Editor postSlug={postSlug.toString()} />;
};

export default PostEditor;
