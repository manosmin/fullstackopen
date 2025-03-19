import { z } from "zod";
import { Gender, HealthCheckRating } from "./types";

export const diagnosisEntrySchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export const baseEntrySchema = z.object({
  id: z.string(),
  date: z.string().nonempty(),
  specialist: z.string().nonempty(),
  description: z.string().nonempty(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().optional(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }).optional(),
});

export const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
});

export const entrySchema = z.union([
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
  healthCheckEntrySchema,
]);

export const newEntrySchema = z.object({
  name: z.string(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string(),
  ssn: z.string(),
  occupation: z.string(),
  id: z.string().optional(),
  entries: z.array(entrySchema).optional(),
});