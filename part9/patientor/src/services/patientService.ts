import patientsEntries from '../../data/patients';
import { PatientEntry, PatientEntryNoSsn } from '../types';

const getEntries = () : PatientEntry[] => {
  return patientsEntries;
};

const getNonSensitiveEntries = () : PatientEntryNoSsn[] => {
  return patientsEntries.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    dateOfBirth,
    gender,
    id,
    name,
    occupation
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries
};