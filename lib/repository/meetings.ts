import { firestore } from '../firebase';
import { MeetingInfo } from '../types';

const createNewMeeting = async (meetingInfo : MeetingInfo) : Promise<void> => {
  const meetingsRef = firestore.collection('reunionesProgramadas');
  const meeting = {
    nombres: meetingInfo.names.toUpperCase(),
    email: meetingInfo.email.toUpperCase(),
    empresa: meetingInfo.company.toUpperCase(),
    telefono: meetingInfo.phoneNumber.toUpperCase(),
    asunto: meetingInfo.subject.toUpperCase(),
    fechaDeSolicitud: meetingInfo.date,
  };
  const meetingDoc = meetingsRef.doc();
  const companyDoc = firestore.doc(`empresas/${meeting.empresa}`);
  const batch = firestore.batch();
  batch.set(meetingDoc, meeting);
  batch.set(companyDoc, { meetingId: meetingDoc.id });
  await batch.commit();
};

const checkCompanyValid = async (company : string) : Promise<boolean> => {
  const ref = firestore.doc(`empresas/${company}`);
  const { exists } = await ref.get();
  return !exists;
};

export {
  createNewMeeting,
  checkCompanyValid,
};
