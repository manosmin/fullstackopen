import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercises, ExerciseResult } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({ error: "Malformatted parameters." });
  }
  return res.send({ result: calculateBMI(height, weight) });
});

interface ExerciseRequest {
  daily_exercises: number[];
  target: number;
}

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseRequest;
  if (daily_exercises.length < 7) {
    return res.status(400).send({ error: "Parameters missing." });
  }
  if (daily_exercises.some(isNaN)) {
    return res
      .status(400)
      .send({ error: "Malformatted exercises parameters." });
  }
  if (isNaN(target)) {
    return res.status(400).send({ error: "Malformatted target parameter." });
  }
  const result: ExerciseResult = calculateExercises(daily_exercises, target);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
