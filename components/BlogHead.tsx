import { FC } from 'react';
import BlogTags from './BlogTags';

type Props = {
  tags?: string[],
  selectedTag?: string,
  onTagsChange?: (tags: string[]) => Promise<void> | void
}

const defaultProps: Partial<Props> = {
  tags: [],
  selectedTag: null,
  onTagsChange: null,
};

const BlogHead: FC<Props> = (props: Props) => {
  const { tags, selectedTag, onTagsChange } = props;
  return (
    <section className="head">
      <div className="head__title">
        <h1>Blog</h1>
      </div>
      <BlogTags selectedTag={selectedTag} tags={tags} onTagsChange={onTagsChange} />
    </section>
  );
};

BlogHead.defaultProps = defaultProps;

export default BlogHead;
