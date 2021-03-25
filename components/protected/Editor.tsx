import { FC, useEffect, useState } from 'react';

enum LogLevels {
  ERROR = 'ERROR'
}

type Props = {
  save?: (data) => void,
  data?: []
}

const defaultProps = {
  save: null,
  data: null,
};

const Editor : FC<Props> = (props : Props) => {
  const { save, data } = props;
  const [editor, setEditor] = useState(null);

  const onSave = async () : Promise<void> => {
    const newData = await editor.save();
    if (save) save(newData);
    console.log({ editordata: newData });
  };

  useEffect(() => {
    const initEditor = async () : Promise<void> => {
      const EditorJS = (await (import('@editorjs/editorjs'))).default;
      const Header = (await import('@editorjs/header')).default;
      const Table = (await import('@editorjs/table')).default;
      const Quotes = (await import('@editorjs/quote')).default;
      const List = (await import('@editorjs/list')).default;
      const Embed = (await import('@editorjs/embed')).default;
      let content = null;
      if (data !== undefined) {
        content = data;
      }

      const newEditor = new EditorJS({
        holder: 'editorjs',
        logLevel: LogLevels.ERROR,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          quote: Quotes,
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
        },
        placeholder: 'Empieza a editar tu blog!',
        data: content,
      });

      setEditor(newEditor);
    };
    initEditor();
  }, [data]);

  return (
    <>
      <div className="editor">
        <form className="editor__form">
          <label className="editor__form-input" htmlFor="title">
            <span>Título del post:</span>
            <input type="text" name="title" />
          </label>
          <label className="editor__form-input" htmlFor="slug">
            <span>Url personalizada (blog.mapeo.pe/post/[tu-url]):</span>
            <input type="text" name="slug" />
          </label>
          <div id="editorjs" key="editor" />
          <button type="button" onClick={onSave}>Save</button>
        </form>

      </div>
    </>
  );
};

Editor.defaultProps = defaultProps;

export default Editor;
