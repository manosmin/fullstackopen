import diagnosisEntries from '../../data/diagnosis';
import { DiagnosisEntry } from '../types';

const getEntries = () : DiagnosisEntry[] => {
  return diagnosisEntries;
};

export default {
  getEntries
};