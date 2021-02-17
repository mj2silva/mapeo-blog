import { FC } from 'react';
import { openPopupWidget } from 'react-calendly';
import Section, { GridType } from './common/Section';

const ScheduleMeeting : FC = () => {
  const onClick = () : void => {
    openPopupWidget({
      url: 'https://calendly.com/manuelsilvag/reunion-de-ejemplo',
    });
  };
  return (
    <Section
      gridType={GridType.normal}
      className="schedule-meeting"
      firstColumn={(
        <div className="section__column">
          <div className="schedule-meeting__title appear_left">
            <h1>
              ¡Tu primer Mapeo
              <span>ES GRATIS!</span>
            </h1>
          </div>
        </div>
      )}
      secondColumn={(
        <div className="schedule-meeting__message appear_right">
          <p>
            Tengamos una reunión virtual de consultoría para conocernos y conversar sobre los
            objetivos y retos de tu empresa
          </p>
          <button
            type="button"
            className="button schedule-meeting__button"
            onClick={onClick}
          >
            Agendar una reunión aquí
          </button>
        </div>
      )}
      targetId="primer-mapeo"
    />
  );
};

export default ScheduleMeeting;
