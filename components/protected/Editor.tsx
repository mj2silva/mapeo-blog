import {
  FC, useEffect, useState,
} from 'react';

import { Post, PostData } from '../../lib/types';
import BlogPost from '../BlogPost';
import ToggleButton from '../common/ToggleButton';

type Props = {
  post: PostData,
  editor: any,
  initEditor: (post?: Post) => void,
  holderId: string,
  save: () => Promise<Post>
}

const hiddenClassName = 'hidden';
const editorClassName = 'editorjs';
const blogPostClassName = 'editorjs';
const toggleActiveClassName = 'editor__toggle--active';
const toggleInactiveClassName = 'editor__toggle--inactive';

const Editor : FC<Props> = (props : Props) => {
  const { post } = props;
  const {
    editor, initEditor, holderId, save,
  } = props;
  const [isPreview, setIsPreview] = useState(false);
  // Efecto que inicializa el editor
  useEffect(() => {
    if (editor === null) return initEditor(post.post);
    return null;
  }, [editor, initEditor, post]);

  const handlePreviewChange = () : void => {
    setIsPreview(!isPreview);
  };

  return (
    <>
      <div className="editor__toggle">
        Cambiar a
        {' '}
        {(isPreview) ? 'Editor' : 'Vista previa' }
        <ToggleButton name="preview" onCheckedChange={handlePreviewChange} />
      </div>
      <div id={holderId} className={isPreview ? hiddenClassName : editorClassName} />
      <div className={!isPreview ? hiddenClassName : blogPostClassName}>
        { post && <BlogPost postData={post} isPreview /> }
      </div>
    </>
  );
};

export default Editor;
