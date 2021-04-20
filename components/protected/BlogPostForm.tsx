import {
  ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';

import { deleteImageAsync, uploadImageAsync } from '../../lib/repository/files';
import { createBlogPost, getBlogPostBySlug, updateBlogPost } from '../../lib/repository/blogPosts';
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

const getInitialPostData = (user: User) : PostData => {
  const initialData = {
    author: {
      uid: user.uid,
      name: user.displayName,
      photoUrl: user.pictureUrl,
      position: user.companyPosition,
    },
    post: {
      time: new Date().getTime(),
      blocks: null,
      editorInfo: { version: null },
    },
    slug: '',
    isPublic: false,
    title: '',
    createdDate: null,
  };
  return initialData;
};

const getImagesDataFromPostData = (postData: PostData) : {name?: string, url: string}[] => {
  const imageList = postData.post.blocks
    .filter((block) => block.type === 'image')
    .map((imageBlock) => imageBlock.type === 'image' && imageBlock.data?.file);
  return imageList;
};

const deleteUnusedImages = async (
  initialPostData: PostData,
  newPostData: PostData,
  uploadedImages: { name?: string, url: string }[],
  user: User,
) : Promise<void> => {
  const initialImages = getImagesDataFromPostData(initialPostData);
  const finalImages = getImagesDataFromPostData(newPostData);
  const initalImageNames = initialImages.map((imageData) => imageData?.name);
  const finalImageNames = finalImages.map((imageData) => imageData?.name);
  const uploadedImageNames = uploadedImages.map((imageData) => imageData?.name);
  const allImages = Array.from(new Set([...initalImageNames, ...uploadedImageNames]));
  const imagesToDelete = allImages.filter(
    (imageData) => !finalImageNames.includes(imageData),
  );
  await Promise.all(imagesToDelete.map((imageUrl) => deleteImageAsync(`blog/postsImages/${user.uid}/images/${imageUrl}`)));
};

const BlogPostForm : FC<Props> = (props: Props) => {
  const { postSlug } = props;
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [postData, setPostData] = useState<PostData>(getInitialPostData(user));
  const [selectedCover, setSelectedCover] = useState<File>(null);
  const [initialPostData, setInitialPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formError, setError] = useState(null);

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

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    event.preventDefault();
    const file = Array.from(event.target.files)[0];
    setSelectedCover(file);
  };

  const savePreview = async () : Promise<void> => {
    const newPostData = await save();
    const dataToSave = { ...postData, post: newPostData };
    setPostData(dataToSave);
  };

  const onSave : FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newPostData = await save();
      const coverPictureUrl = selectedCover !== null
        ? await uploadImageAsync(selectedCover, `blog/postsImages/${user.uid}/covers`)
        : null;
      const dataToSave: PostData = { ...postData, post: newPostData, coverPictureUrl };
      setPostData(dataToSave);
      await deleteUnusedImages(initialPostData, dataToSave, uploadedImages, user);
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
          const existingPostData = await getBlogPostBySlug(postSlug);
          setPostData((prevData) => ({
            ...existingPostData,
            author: existingPostData.author || prevData.author,
          }));
          setInitialPostData(existingPostData);
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
        <label htmlFor="coverPicture" className="editor__form-input editor__form-input--file">
          <div className="configuration__form-label">Cambiar foto de portada</div>
          <input name="coverPicture" type="file" onChange={handleFileChange} />
        </label>
        <label className="editor__form-input" htmlFor="slug">
          <span>Url personalizada (blog.mapeo.pe/post/[tu-url]):</span>
          <input value={postData.slug || ''} onChange={handleChange} type="text" name="slug" />
        </label>
        <label className="editor__form-input editor__form-input--checkbox" htmlFor="isPublic">
          <span>Publicar</span>
          <input checked={postData.isPublic} onChange={handleCheckedChange} type="checkbox" name="isPublic" />
        </label>
        { (!postData.post?.blocks && isLoading)
          ? <Spinner color={SpinnerColors.yellow} width={20} height={20} />
          : (
            <Editor
              editor={editor}
              initEditor={initEditor}
              post={postData}
              holderId={holderId}
              savePreview={savePreview}
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
