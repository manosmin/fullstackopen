import express from "express";
import { Response, Request, NextFunction } from "express";
import { newEntrySchema, entrySchema } from "../utils";
import patientService from "../services/patientService";
import { PatientEntryNoSsn, PatientEntry, ErrorMessage, Entry } from "../types";
import z from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientEntryNoSsn[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res: Response<PatientEntry | ErrorMessage>) => {
  if (!patientService.getEntry(req.params.id)) {
    res.status(404).send({ error: "Patient not found." });
  }
  res.send(patientService.getEntry(req.params.id));
});

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    entrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, PatientEntry>,
    res: Response<PatientEntry>
  ) => {
    const addedEntry: PatientEntry = patientService.addEntry(req.body);
    res.json(addedEntry);
  }
);

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, Entry>,
    res: Response<PatientEntry | ErrorMessage>
  ) => {
    const patientId: string = req.params.id;
    const newPatient = patientService.addPatientEntries(
      patientId,
      req.body
    );
    if (!newPatient) {
      res.status(404).send({ error: "Patient not found." });
    }
    res.send(newPatient);
  }
);

router.use(errorMiddleware);

export default router;
