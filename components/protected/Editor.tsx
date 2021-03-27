import { useRouter } from 'next/router';
import {
  ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState,
} from 'react';
import {
  createBlogPost, getBlogPostBySlug, updateBlogPost, uploadImageAsync,
} from '../../lib/firebase';
import { PostData } from '../../lib/types';
import UserContext from '../../lib/userContext';
import Spinner, { SpinnerColors } from '../common/Spinner';
import Metatags from './Metatags';

enum LogLevels {
  ERROR = 'ERROR'
}

type Props = {
  postSlug?: string,
}

const defaultProps : Partial<Props> = {
  postSlug: null,
};

const Editor : FC<Props> = (props : Props) => {
  const { postSlug } = props;
  const { user } = useContext(UserContext);
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [holderId] = useState(new Date().getTime().toString());
  const [postData, setPostData] = useState<PostData>({
    authorUId: user.uid,
    post: {
      time: new Date(),
      blocks: null,
      editorInfo: {
        version: null,
      },
    },
    slug: '',
    createdDate: null,
    isPublic: false,
    title: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInitialPost = async () : Promise<void> => {
      if (postSlug) {
        setIsLoading(true);
        try {
          const actualPostData = await getBlogPostBySlug(postSlug);
          setPostData(actualPostData);
          setIsLoading(false);
        } catch (err) {
          router.push('/internal/nuevo-post');
        }
      } else {
        setIsLoading(false);
      }
    };
    getInitialPost();
  }, [postSlug, router]);

  const onSave : FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newData = await editor.save();
      const dataToSave = {
        ...postData,
        post: {
          time: new Date(newData.time),
          blocks: newData.blocks,
          editorInfo: {
            version: newData.version,
          },
        },
      };
      setPostData(dataToSave);
      if (postData.id) {
        await updateBlogPost(dataToSave.id, dataToSave);
      } else {
        await createBlogPost(dataToSave);
        router.push(`/internal/posts/${dataToSave.slug}`);
      }
      await editor.render(newData);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
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

  useEffect(() => {
    const initEditor = async () : Promise<void> => {
      if (editor === null) {
        if (!isLoading) {
          setIsLoading(true);
          const EditorJS = (await (import('@editorjs/editorjs'))).default;
          const Header = (await import('@editorjs/header')).default;
          const Quotes = (await import('@editorjs/quote')).default;
          const List = (await import('@editorjs/list')).default;
          const Embed = (await import('@editorjs/embed')).default;
          const Image = (await import('../../lib/ImageEditor/bundle')).default;

          const newEditor = new EditorJS({
            autofocus: true,
            holder: holderId,
            logLevel: LogLevels.ERROR,
            tools: {
              header: {
                class: Header,
                inlineToolbar: true,
              },
              quote: {
                class: Quotes,
                config: {
                  quotePlaceholder: 'Ingresa una cita de autor',
                  captionPlaceholder: 'Ingresa la fuente y/o autor',
                },
              },
              list: List,
              embed: {
                class: Embed,
                inlineToolbar: true,
                config: {
                  services: {
                    youtube: true,
                  },
                },
              },
              image: {
                class: Image,
                config: {
                  buttonContent: 'Selecciona una imagen',
                  captionPlaceholder: 'Ingresa el título de la imagen',
                  uploader: {
                    uploadByFile: async (file : File) => {
                      const downloadUrl = await uploadImageAsync(file, `blog/postsImages/${user.uid}/images`);
                      return {
                        success: 1,
                        file: { url: downloadUrl },
                      };
                    },
                  },
                },
              },
            },
            placeholder: 'Empieza a editar tu post!',
            data: {
              time: postData.post.time.getTime(),
              blocks: postData.post.blocks,
            },
            onReady: () => {
              setIsLoading(false);
            },
          });

          setEditor(newEditor);
        }
      }
    };
    if (initEditor) initEditor();
  }, [postData, isLoading, editor, holderId, user]);

  return (
    <>
      <div className="editor">
        { postSlug
          ? <Metatags title={`Editar post | ${postData.title}`} />
          : <Metatags title={`Nuevo post | ${user.username}`} />}
        <form onSubmit={onSave} className="editor__form">
          <label className="editor__form-input" htmlFor="title">
            <span>Título del post:</span>
            <input value={postData.title || ''} onChange={handleChange} type="text" name="title" required />
          </label>
          <label className="editor__form-input" htmlFor="slug">
            <span>Url personalizada (blog.mapeo.pe/post/[tu-url]):</span>
            <input value={postData.slug || ''} onChange={handleChange} type="text" name="slug" />
          </label>
          <label className="editor__form-input editor__form-input--checkbox" htmlFor="isPublic">
            <span>Publicar</span>
            <input onChange={handleCheckedChange} type="checkbox" name="isPublic" />
          </label>
          <div id={holderId} className="editorjs" />
          { error && (
          <div className="editor__error">
            Hubo un error al guardar el post:
            {' '}
            {error}
          </div>
          ) }
          { (isLoading)
            ? <div className="loading-button"><Spinner color={SpinnerColors.yellow} width={20} height={20} /></div>
            : <button disabled={isLoading} className="editor__button" type="submit">Guardar post</button>}
        </form>
      </div>
    </>
  );
};

Editor.defaultProps = defaultProps;

export default Editor;
