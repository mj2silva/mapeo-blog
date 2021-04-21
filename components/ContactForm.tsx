/* eslint-disable no-nested-ternary */
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ChangeEventHandler, FC, FormEventHandler, useState,
} from 'react';
import { checkCompanyValid, createNewMeeting } from '../lib/repository/meetings';
import { MeetingInfo } from '../lib/types';
import Spinner from './common/Spinner';
import ReactPixel from './ReactPixel';

const ContactForm : FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successSubmit, setSuccessSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    names: null,
    email: null,
    phoneNumber: null,
    company: null,
    form: null,
    subject: null,
  });
  const [formValues, setFormValues] = useState<MeetingInfo>({
    names: '',
    email: '',
    phoneNumber: '',
    company: '',
    subject: '',
    date: null,
  });
  const handleSubmit : FormEventHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const pixelFormSuccess = async () : Promise<void> => {
      const pixel = await ReactPixel();
      pixel.trackCustom('Formulario lleno', formValues);
    };
    const pixelFormError = async () : Promise<void> => {
      const pixel = await ReactPixel();
      pixel.trackCustom('Empresa repetida', formValues);
    };
    try {
      const isCompanyValid = await checkCompanyValid(formValues.company.toUpperCase());
      const isPhoneValid = formValues.phoneNumber.match(new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/));
      if (isCompanyValid && isPhoneValid) {
        setErrors({
          ...errors,
          company: null,
          phoneNumber: null,
          form: null,
        });
        setIsSubmitting(true);
        await createNewMeeting({
          ...formValues,
          date: new Date(),
        });
        await pixelFormSuccess();
        setSuccessSubmit(true);
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
        if (!isCompanyValid) {
          setErrors({
            ...errors,
            company: 'Tu empresa ya ha sido registrada, si deseas más información puedes comunicarte con nosotros a través de nuestro WhatsApp',
          });
          await pixelFormError();
        }
        if (!isPhoneValid) {
          setErrors({
            ...errors,
            phoneNumber: 'El número de teléfono ingresado no es válido',
          });
        }
      }
    } catch (e) {
      setSuccessSubmit(false);
      setIsSubmitting(false);
      setErrors({
        names: null,
        email: null,
        phoneNumber: null,
        company: null,
        subject: null,
        form: `Error al enviar el formulario: ${e.message}`,
      });
    }
  };
  const handleInputChange : ChangeEventHandler<
  HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };
  return (isSubmitting)
    ? (
      <div className="schedule-meeting__contact">
        <Spinner />
      </div>
    )
    : (
      (successSubmit)
        ? (
          <div className="schedule-meeting__contact">
            <FontAwesomeIcon className="schedule-meeting__contact-success-icon" icon={faCheckCircle} />
            <p className="schedule-meeting__contact-success-message">¡Genial! Hemos recibido tu solicitud y nos pondremos en contacto contigo en breve.</p>
          </div>
        )
        : (
          <div className="schedule-meeting__contact">
            <form onSubmit={handleSubmit} className="schedule-meeting__form">
              <label className="schedule-meeting__element" htmlFor="names">
                <span className="schedule-meeting__input-text">
                  Nombres y apellidos
                </span>
                <input
                  placeholder="Nombres y apellidos"
                  required
                  onChange={handleInputChange}
                  className="schedule-meeting__input"
                  type="text"
                  name="names"
                  value={formValues.names}
                />
                { errors.names ? <div className="schedule-meeting__form-error">{errors.names}</div> : null }
              </label>
              <label className="schedule-meeting__element schedule-meeting__element--medium" htmlFor="email">
                <span className="schedule-meeting__input-text">
                  Email
                </span>
                <input
                  placeholder="Email"
                  required
                  onChange={handleInputChange}
                  className="schedule-meeting__input"
                  type="email"
                  name="email"
                  value={formValues.email}
                />
                { errors.email ? <div className="schedule-meeting__form-error">errors.email</div> : null }
              </label>
              <label className="schedule-meeting__element schedule-meeting__element--medium" htmlFor="phoneNumber">
                <span className="schedule-meeting__input-text">
                  Celular
                </span>
                <input
                  placeholder="Celular"
                  required
                  onChange={handleInputChange}
                  className="schedule-meeting__input"
                  type="tel"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                />
                { errors.phoneNumber ? <div className="schedule-meeting__form-error">{errors.phoneNumber}</div> : null }
              </label>
              <label className="schedule-meeting__element" htmlFor="company">
                <span className="schedule-meeting__input-text">
                  Empresa
                </span>
                <input
                  placeholder="Empresa"
                  required
                  onChange={handleInputChange}
                  className="schedule-meeting__input"
                  type="text"
                  name="company"
                  value={formValues.company}
                />
                { errors.company ? <div className="schedule-meeting__form-error">{errors.company}</div> : null }
              </label>
              <label className="schedule-meeting__element" htmlFor="subject">
                <span className="schedule-meeting__input-text">
                  Asunto
                </span>
                <textarea
                  placeholder="¿Cuál es tu consulta?"
                  required
                  onChange={handleInputChange}
                  className="schedule-meeting__input"
                  rows={4}
                  name="subject"
                  value={formValues.subject}
                />
                { errors.subject ? <div className="schedule-meeting__form-error">{errors.subject}</div> : null }
              </label>
              { errors.form
                ? (
                  <div
                    className="schedule-meeting__form-error schedule-meeting__form-error--form"
                  >
                    {errors.form}
                  </div>
                )
                : null }
              <button type="submit" disabled={isSubmitting} className="button schedule-meeting__button">
                Agendar una reunión aquí
              </button>
            </form>
          </div>
        )
    );
};

export default ContactForm;

/* match /{document=**} {
  allow read: if true;
  allow write: if request.auth != null;
} */
