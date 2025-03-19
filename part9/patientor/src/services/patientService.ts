import patientsEntries from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { PatientEntry, PatientEntryNoSsn } from '../types';

const getEntries = () : PatientEntry[] => {
  return patientsEntries;
};

const getEntry = (id: string) : PatientEntry | undefined => {
  const patient: PatientEntry | undefined = patientsEntries.find(patient => patient.id == id);
  return patient;
};

const getNonSensitiveEntries = () : PatientEntryNoSsn[] => {
  return patientsEntries.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    dateOfBirth,
    gender,
    id,
    name,
    occupation,
    entries: []
  }));
};

const addEntry = (newEntry: PatientEntry): PatientEntry => {
  const newEntryWithId = { ...newEntry, id: uuid() };
  patientsEntries.push(newEntryWithId);
  return newEntryWithId;
};

export default {
  getEntries,
  getEntry,
  getNonSensitiveEntries,
  addEntry
};