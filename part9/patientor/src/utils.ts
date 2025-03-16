import { z } from 'zod';

enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
};

const newEntrySchema = z.object({
    name: z.string(),
    gender: z.nativeEnum(Gender),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    occupation: z.string(),
    id: z.string().optional()
  });

export default newEntrySchema;