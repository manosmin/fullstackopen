import patientsEntries from '../../data/patients';
import { v1 as uuid } from 'uuid';
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

const addEntry = (newEntry: PatientEntry): PatientEntry => {
  const newEntryWithId = { ...newEntry, id: uuid() };
  patientsEntries.push(newEntryWithId);
  return newEntryWithId;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry
};