import { FC, ReactNode } from 'react';

enum SectionClassName {
  section = 'section',
  sectionWithTitle = 'section--with-title',
  sectionReversable = 'section--reversable',
  sectionReversableWithTitle = 'section--with-title section--reversable-with-title',
}

enum ColumnClassName {
  column = 'section__column',
  columnTitle = 'section__column--title'
}

export enum GridType {
  normal = 'normal',
  withTitle = 'withTitle',
  reversable = 'reversable',
  reversableWithTitle = 'reversable-with-title',
}

export type SectionProps = {
  gridType?: GridType,
  title?: ReactNode,
  firstColumn?: ReactNode,
  secondColumn?: ReactNode,
  className?: string,
  targetId?: string,
  sliderControls?: ReactNode
}

const defaultProps : Partial<SectionProps> = {
  gridType: GridType.normal,
  title: null,
  firstColumn: null,
  secondColumn: null,
  className: null,
  targetId: null,
  sliderControls: null,
};

const getClassName = (gridType : GridType) : SectionClassName => {
  switch (gridType) {
    case GridType.normal:
      return SectionClassName.section;
    case GridType.withTitle:
      return SectionClassName.sectionWithTitle;
    case GridType.reversable:
      return SectionClassName.sectionReversable;
    case GridType.reversableWithTitle:
      return SectionClassName.sectionReversableWithTitle;
    default:
      return SectionClassName.section;
  }
};

const Section : FC<SectionProps> = (props : SectionProps) => {
  const {
    gridType, title, firstColumn, secondColumn, className, targetId, sliderControls,
  } = props;
  const sectionClassName = getClassName(gridType);
  return (
    <section className={`${SectionClassName.section} ${sectionClassName} ${className}`}>
      {(gridType === GridType.withTitle || gridType === GridType.reversableWithTitle) ? (
        <div className={ColumnClassName.columnTitle}>
          { title }
        </div>
      ) : null}
      <div className={ColumnClassName.column}>
        { firstColumn }
      </div>
      <div className={ColumnClassName.column}>
        { secondColumn }
      </div>
      { (targetId) ? <aside className="target" id={targetId} /> : null}
      { sliderControls }
    </section>
  );
};

Section.defaultProps = defaultProps;

export default Section;
