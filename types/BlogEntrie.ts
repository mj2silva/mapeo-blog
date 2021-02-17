import Author from './Author';
import Comment from './Comment';

interface BlogEntrie {
  id: string | number,
  slug: string,
  author: Author,
  title: string,
  topic: string,
  coverImageUrl: string,
  parragraphs: string[],
  publicationDate: Date,
  abstract?: string,
  comments?: Comment[],
}

export default BlogEntrie;
