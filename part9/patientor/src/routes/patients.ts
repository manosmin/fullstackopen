import express from 'express';
import { Response } from 'express';

import patientService from '../services/patientService';
import { PatientEntryNoSsn, PatientEntryNoId, PatientEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientEntryNoSsn[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res: Response<PatientEntry>) => {
  const { name, ssn, dateOfBirth, occupation, gender } = req.body as PatientEntryNoId;
  const addedEntry = patientService.addEntry(name, ssn, dateOfBirth, occupation, gender);
  res.json(addedEntry);
});

export default router;