import { FC } from 'react';

export enum SpinnerColors {
  darkBlue = '#0f1124',
  yellow = '#ffd216',
  yellowHover = '#cc9900',
  orange = '#f6ad48',
  softPurple = '#a891c6',
  skyblue = '#29abe2',
  violet = '#ff00ff',
  violetHover = '#cc00cc',
  blue = '#005797',
  blueHover = '#003366',
  black = '#0f1124',
  darkBlack = '#000033',
  gray = '#b3b3b3',
  grayText = '#666666',
  softGray = '#f2f2f2',
  skyblueHover = '#339999',
  purple = '#3417aa',
  purpleHover = '#330066',
  white = '#ffffff',
  red = '#ff553f',
}

type Props = {
  color?: SpinnerColors,
  width?: number | string,
  height?: number | string,
}

const defaultProps : Partial<Props> = {
  color: SpinnerColors.skyblue,
  width: '50px',
  height: '50px',
};

const Spinner : FC<Props> = (props : Props) => {
  const { color, width, height } = props;
  return (
    <div
      style={{
        borderTopColor: color.toString(),
        width,
        height,
      }}
      className="spinner"
    />
  );
};

Spinner.defaultProps = defaultProps;

export default Spinner;
