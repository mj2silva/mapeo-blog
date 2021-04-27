import { useRouter } from 'next/router';
import { FC } from 'react';
import BlogPostForm from '../../../components/protected/BlogPostForm';

const PostEditor : FC = () => {
  const router = useRouter();
  const { postSlug } = router.query;
  return <BlogPostForm postSlug={postSlug.toString()} />;
};

export default PostEditor;
