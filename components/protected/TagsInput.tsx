import { FC, useEffect, useState } from 'react';
import { ActionMeta, OptionsType, OptionTypeBase } from 'react-select';
import Creatable from 'react-select/creatable';
import { getPostTags } from '../../lib/repository/blogPosts';

const getAsyncOptionTags = async () : Promise<{ label: string, value: string }[]> => {
  const tags = await getPostTags();
  return tags.map((tag) => ({
    label: tag,
    value: tag,
  }));
};

export type TagsInputChangeHandler = (
  selected: OptionsType<OptionTypeBase>, actionMeta: ActionMeta<OptionTypeBase>
  ) => Promise<void> | void;

type Props = {
  initialOptions: OptionTypeBase[],
  onChange: TagsInputChangeHandler,
}

const TagsInput: FC<Props> = ({ initialOptions, onChange }: Props) => {
  const [options, setOptions] = useState(null);
  useEffect(() => {
    const loadOptions = async () : Promise<void> => {
      const loadedOptions = await getAsyncOptionTags();
      setOptions(loadedOptions);
    };
    loadOptions();
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className="editor__form-input" htmlFor="tags">
      <span>Etiquetas:</span>
      <Creatable value={initialOptions} onChange={onChange} isMulti inputId="tags" name="tags" options={options} />
    </label>
  );
};

export default TagsInput;
