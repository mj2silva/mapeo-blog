import { useRouter } from 'next/router';
import {
  ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState,
} from 'react';
import {
  createBlogPost, deleteImageAsync, getBlogPostBySlug, updateBlogPost,
} from '../../lib/firebase';
import { PostData, User } from '../../lib/types';
import useEditor from '../../lib/useEditor';
import UserContext from '../../lib/userContext';
import { createSlug } from '../../lib/utils';
import Spinner, { SpinnerColors } from '../common/Spinner';
import Editor from './Editor';
import Metatags from './Metatags';

type Props = {
  postSlug?: string,
}

const defaultProps : Partial<Props> = {
  postSlug: null,
};

const getInitialPostData = (user: User) : PostData => ({
  authorUId: user.uid,
  post: {
    time: new Date(),
    blocks: null,
    editorInfo: { version: null },
  },
  slug: '',
  createdDate: null,
  isPublic: false,
  title: '',
});

const BlogPostForm : FC<Props> = (props: Props) => {
  const { postSlug } = props;
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [postData, setPostData] = useState<PostData>(getInitialPostData(user));
  const [isLoading, setIsLoading] = useState(true);
  const [formError, setError] = useState(null);

  const [initialImages, setInitialImages] = useState(null);

  const {
    editor, initEditor, holderId, error, save, uploadedImages,
  } = useEditor(user, null, postData.post);

  const handleTitleChange : ChangeEventHandler<HTMLInputElement> = async (event) => {
    const title = event.target.value;
    const slug = createSlug(title);
    setPostData({
      ...postData,
      title,
      slug,
    });
  };

  const handleChange : ChangeEventHandler<HTMLInputElement> = async (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckedChange : ChangeEventHandler<HTMLInputElement> = async (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.checked,
    });
  };

  const onSave : FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newPostData = await save();
      const dataToSave = { ...postData, post: newPostData };
      setPostData(dataToSave);
      // Se obtienen la lista de imágenes que van en el blog
      const finalImages = dataToSave.post.blocks
        .filter((block) => block.type === 'image')
        .map((imageBlock) => imageBlock.data?.file);
      const finalImageNames = finalImages.map((imageData) => imageData?.name);
      // Las imagenes que habían al principio
      const initalImageNames = initialImages.map((imageData) => imageData?.name);
      // Las que se han subido
      const uploadedImageNames = uploadedImages.map((imageData) => imageData?.name);
      // La suma de todas, las subidas y las que estaban
      const allImages = Array.from(new Set([...initalImageNames, ...uploadedImageNames]));
      // Se busca las imágenes que sobran para borrarlas
      const imagesToDelete = allImages.filter(
        (imageData) => !finalImageNames.includes(imageData),
      );
      // Se borran las imágenes descartadas
      await Promise.all(imagesToDelete.map((imageUrl) => deleteImageAsync(`blog/postsImages/${user.uid}/images/${imageUrl}`)));
      if (postData.id) await updateBlogPost(dataToSave.id, dataToSave);
      else {
        await createBlogPost(dataToSave);
        router.push(`/internal/posts/${dataToSave.slug}`);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const retrieveDataToEdit = async () : Promise<void> => {
      if (postSlug) {
        setIsLoading(true);
        try {
          const oldPostData = await getBlogPostBySlug(postSlug);
          setPostData(oldPostData);
          const usedImages = oldPostData.post.blocks
            .filter((block) => block.type === 'image')
            .map((imageBlock) => imageBlock.data?.file);
          setInitialImages(usedImages);
        } catch (err) {
          setError(err);
          router.push('/internal/nuevo-post');
        }
      }
      setIsLoading(false);
    };
    retrieveDataToEdit();
  }, [postSlug, router]);

  return (
    <div className="editor">
      { postSlug
        ? <Metatags title={`Editar post | ${postData.title}`} />
        : <Metatags title={`Nuevo post | ${user.username}`} /> }
      <form onSubmit={onSave} className="editor__form">
        <label className="editor__form-input" htmlFor="title">
          <span>Título del post:</span>
          <input value={postData.title || ''} onChange={handleTitleChange} type="text" name="title" required />
        </label>
        <label className="editor__form-input" htmlFor="slug">
          <span>Url personalizada (blog.mapeo.pe/post/[tu-url]):</span>
          <input value={postData.slug || ''} onChange={handleChange} type="text" name="slug" />
        </label>
        <label className="editor__form-input editor__form-input--checkbox" htmlFor="isPublic">
          <span>Publicar</span>
          <input onChange={handleCheckedChange} type="checkbox" name="isPublic" />
        </label>
        { (!postData.post?.blocks && isLoading)
          ? <Spinner color={SpinnerColors.yellow} width={20} height={20} />
          : (
            <Editor
              editor={editor}
              initEditor={initEditor}
              post={postData}
              holderId={holderId}
            />
          )}
        { (formError || error) && (
          <div className="editor__error">
            Hubo un error al guardar el post:
            {' '}
            {formError || error}
          </div>
        ) }
        { (isLoading)
          ? <div className="loading-button"><Spinner color={SpinnerColors.yellow} width={20} height={20} /></div>
          : <button disabled={isLoading} className="editor__button" type="submit">Guardar post</button>}
      </form>
    </div>
  );
};

BlogPostForm.defaultProps = defaultProps;

export default BlogPostForm;
