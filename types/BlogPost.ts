import Author from './Author';
import BlogEntrie from './BlogEntrie';
import BlogTag from './BlogTag';

interface BlogPost {
  id?: string,
  author: Author,
  entrie: BlogEntrie,
  publicationDate: Date,
  title: string,
  abstract?: string,
  slug?: string,
  coverImageUrl?: string,
  tags?: BlogTag[],
  comments?: Comment[],
}

export default BlogPost;
