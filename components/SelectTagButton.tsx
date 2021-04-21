import {
  FC, MouseEventHandler, useState,
} from 'react';
import { firsLetterToUpper } from '../lib/utils';

type Props = {
  tag: string,
  onClick: (tag: string, active: boolean) => void,
  initialSelected?: boolean,
}

const defaultProps: Partial<Props> = {
  initialSelected: false,
};

const SelectTagButton : FC<Props> = (props: Props) => {
  const { tag, onClick, initialSelected } = props;
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClick : MouseEventHandler<HTMLButtonElement> = () : void => {
    const selected = (!isClicked && initialSelected) || isSelected;
    onClick(tag, !selected);
    setIsClicked(true);
    setIsSelected(!selected);
  };
  return (
    <li
      className={((initialSelected && !isClicked) || isSelected) ? 'head__controls-keywords-tag head__controls-keywords-tag--active' : 'head__controls-keywords-tag'}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={isSelected}
        name={tag}
        value={tag}
        onClick={handleClick}
      >
        { firsLetterToUpper(tag) }
      </button>
    </li>
  );
};

SelectTagButton.defaultProps = defaultProps;

export default SelectTagButton;
