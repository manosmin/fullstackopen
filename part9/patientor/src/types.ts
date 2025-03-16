export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
  }

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type PatientEntryNoSsn = Omit<PatientEntry, 'ssn'>;

export type PatientEntryNoId = Omit<PatientEntry, 'id'>;
