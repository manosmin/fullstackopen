import express from 'express';
import { Response } from 'express';

import patientService from '../services/patientService';
import { PatientEntryNoSsn } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<PatientEntryNoSsn[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

export default router;