interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((h) => h > 0).length;
  const totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "Great job! You met or exceeded the target.";
  } else if (average >= target * 0.5) {
    rating = 2;
    ratingDescription = "Not too bad but could be better.";
  } else {
    rating = 1;
    ratingDescription = "You need to put in more effort.";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (
  args: string[]
): { target: number; dailyHours: number[] } => {
  if (args.length < 10) {
    throw new Error("Not enough arguments");
  }
  if (args.length > 10) {
    throw new Error("Too many arguments");
  }

  const target = Number(args[0]);
  const dailyHours = args.slice(1).map(Number);

  if (isNaN(target) || dailyHours.some(isNaN)) {
    throw new Error("Provided values were not numbers!");
  }

  return { target, dailyHours };
};

try {
  const { target, dailyHours } = parseArguments(process.argv.slice(2));
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
