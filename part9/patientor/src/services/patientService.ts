import patientsEntries from '../../data/patients';
import { PatientEntry, PatientEntryNoSsn } from '../types';
import { v1 as uuid } from 'uuid';

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
  const newPatientEntry = {
    id: uuid(),
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender
  };
  patientsEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};