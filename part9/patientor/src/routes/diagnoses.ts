import express from 'express';
import { Response } from 'express';

import diagnosisService from '../services/diagnosisService';
import { DiagnosisEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<DiagnosisEntry[]>) => {
  res.send(diagnosisService.getEntries());
});

export default router;