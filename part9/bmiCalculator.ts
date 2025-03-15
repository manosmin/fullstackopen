interface MultiplyValues {
  value1: number;
  value2: number;
}

export const calculateBMI = (height: number, weight: number): string => {
  if (weight <= 0 || height <= 0) {
    return "Invalid input. Weight and height must be positive numbers.";
  }
  const bmi = weight / (height * height * 0.0001);

  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 24.9) {
    category = "Normal";
  } else if (bmi < 29.9) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  return category;
};

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBMI(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
