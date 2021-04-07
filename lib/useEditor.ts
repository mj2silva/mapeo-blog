import { useCallback, useState } from 'react';
import {
  uploadImageAsync,
} from './firebase';
import { Post, User } from './types';

type UseEditorHook = {
  editor: any,
  initEditor: any,
  save: () => Promise<Post>,
  loading: boolean,
  holderId: string,
  newPost: Post,
  error: any,
}

enum LogLevels {
  ERROR = 'ERROR'
}

const useEditor = (user : User, post?: Post) : UseEditorHook => {
  const [loading, setIsLoading] = useState(true);
  const [editor, setEditor] = useState(null);
  const [error, setError] = useState(null);
  const [holderId] = useState(new Date().getTime().toString());
  const [newPost, setNewPost] = useState<Post>(post || {
    time: new Date(),
    blocks: null,
    editorInfo: {
      version: null,
    },
  });

  const initEditor = useCallback(async (oldPost: Post) : Promise<() => void> => {
    if (editor === null) {
      setIsLoading(true);
      const EditorJS = (await (import('@editorjs/editorjs'))).default;
      const Header = (await import('@editorjs/header')).default;
      const Quotes = (await import('@editorjs/quote')).default;
      const List = (await import('@editorjs/list')).default;
      const Embed = (await import('@editorjs/embed')).default;
      const Image = (await import('./ImageEditor/bundle')).default;

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
          time: oldPost?.time.getTime(),
          blocks: oldPost?.blocks,
        },
        onReady: () => {
          setIsLoading(false);
        },
      });
      setEditor(newEditor);
      setIsLoading(false);
      return newEditor.destroy;
    }
    return null;
  }, [editor, holderId, user]);

  const save = async () : Promise<Post> => {
    try {
      setIsLoading(true);
      const newData = await editor.save();
      const dataToSave : Post = {
        ...post,
        time: new Date(newData.time),
        blocks: newData.blocks,
        editorInfo: { version: newData.version },
      };
      setNewPost(dataToSave);
      setError(null);
      setIsLoading(false);
      return dataToSave;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };

  return {
    editor,
    save,
    loading,
    newPost,
    holderId,
    error,
    initEditor,
  };
};

export default useEditor;