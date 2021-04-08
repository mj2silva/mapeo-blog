import { ChangeEventHandler, FC, useState } from 'react';

type Props = {
  name: string,
  onCheckedChange: ChangeEventHandler<HTMLInputElement>,
}

const activeClassName = 'label--checked';
const inactiveClassName = '';

const ToggleButton : FC<Props> = (props : Props) => {
  const { name, onCheckedChange } = props;
  const [active, setIsActive] = useState(false);
  const handleChange = (event) => {
    setIsActive((act) => !act);
    onCheckedChange(event);
  };
  return (
    <div className="toggle-wrapper">
      <div className="toggle checkcross">
        <label htmlFor={name} className={`toggle-item ${active ? activeClassName : inactiveClassName}`}>
          <input className="toggle-input" type="checkbox" name={name} id="checkcross" onChange={handleChange} />
          <div className="check" />
        </label>
      </div>
    </div>
  );
};

export default ToggleButton;
