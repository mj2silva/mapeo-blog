import {
  FC, useState,
} from 'react';
import SelectTagButton from './SelectTagButton';

type Props = {
  tags: string[],
  selectedTag?: string,
  onTagsChange: (tags: string[]) => void,
}

const defaultProps: Partial<Props> = {
  selectedTag: null,
};

const BlogTags : FC<Props> = (props: Props) => {
  const { onTagsChange, tags, selectedTag } = props;
  const [currentSelected, setCurrentSelected] = useState<string[]>([selectedTag]);

  const handleClick = (tag: string, active: boolean) : void => {
    if (active) {
      const newSelected = [
        ...currentSelected,
        tag,
      ];
      setCurrentSelected(newSelected);
      onTagsChange(newSelected);
    } else {
      const newSelected = [
        ...currentSelected.filter((currTag) => currTag !== tag),
      ];
      setCurrentSelected(newSelected);
      onTagsChange(newSelected);
    }
  };
  return (
    <div className="head__controls">
      <div className="head__controls-keywords">
        <h3>Palabras clave</h3>
        <ul>
          <li className="head__controls-keywords-tag">Todo</li>
          { tags.map((tag) => (
            <SelectTagButton
              key={`tagbt-${tag}`}
              initialSelected={selectedTag?.toUpperCase() === tag.toUpperCase()}
              tag={tag}
              onClick={handleClick}
            />
          )) }
        </ul>
      </div>
      <div className="head__controls-search">
        <form>
          <input type="search" name="search" id="search" placeholder="Buscar..." />
        </form>
      </div>
    </div>
  );
};

BlogTags.defaultProps = defaultProps;

export default BlogTags;
