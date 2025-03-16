import patientsEntries from '../../data/patients';
import { PatientEntry, PatientEntryNoSsn } from '../types';
import toNewPatientEntry from '../utils';

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

const addEntry = (name: string, ssn: string, dateOfBirth: string, occupation: string, gender: string ): PatientEntry => {
  const newPatientEntry = toNewPatientEntry({name, ssn, dateOfBirth, occupation, gender});
  patientsEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};