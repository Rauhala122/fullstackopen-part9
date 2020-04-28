type Result = "Normal weight" | "Underweight" | "Overweight";

interface BMI {
  height: number,
  weight: number
}

const parseArguments = (args: Array<string>): BMI => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): Result => {
  const heightInCm = height / 100
  const bmi = (weight / (heightInCm * heightInCm));

  if (18.5 < bmi && bmi < 25) {
    return "Normal weight";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi > 25) {
    return "Overweight"
  }

  return "Normal weight"
}

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

export default calculateBmi
