import { PatientEntry } from "./types";
import { v1 as uuid } from 'uuid';

enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseString = (string: unknown): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing string: ' + string);
    }
    return string;
};

const toNewPatientEntry = (object: unknown): PatientEntry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    if ('name' in object && 'gender' in object && 'dateOfBirth' in object && 'ssn' in object && 'occupation' in object) {
    const newEntry: PatientEntry = {
        name: parseString(object.name),
        gender: parseGender(object.gender),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        occupation: parseString(object.occupation),
        id: uuid()
    };
    return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatientEntry;