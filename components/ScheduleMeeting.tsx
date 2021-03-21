import { FC } from 'react';
import Section, { GridType } from './common/Section';
import ContactForm from './ContactForm';

const ScheduleMeeting : FC = () => (
  <Section
    gridType={GridType.normal}
    className="schedule-meeting"
    firstColumn={(
      <div className="section__column">
        <div className="schedule-meeting__title appear_left">
          <h2>
            ¡Tu primer Mapeo
            {' '}
            <span>ES GRATIS!</span>
          </h2>
          <p>
            Tengamos una reunión virtual de consultoría para conocernos y conversar sobre los
            objetivos y retos de tu empresa
          </p>
        </div>
      </div>
      )}
    secondColumn={(
      <ContactForm />
      )}
    targetId="primer-mapeo"
  />
);

export default ScheduleMeeting;
