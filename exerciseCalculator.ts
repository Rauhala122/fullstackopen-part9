interface ExerciseFeedback {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ratingFeedback {
  rating: number,
  ratingDescription: string
}

const parseArguments = (args: Array<string>): Array<number> => {
  const days: Array<number> = []

  args.forEach((arg, i) => {
    if (i > 1) {
      if (!isNaN(Number(arg))) {
        days.push(Number(arg))
      } else {
        throw new Error('All of the provided values were not numbers!');
      }
    }
  })

  return days
}

const exerciserRating = (target: number, average: number): ratingFeedback => {
  if (average === target) {
    return {
      rating: 3,
      ratingDescription: "Awesome, you met the target"
    }
  } else if (average > target) {
    return {
      rating: 3,
      ratingDescription: "Awesome, you met the target and did even more"
    }
  } else if((target - average) > 0 && (target - average) < 1) {
    return {
      rating: 2,
      ratingDescription: "not too bad but could be better"
    }
  } else if ((target - average) > 1) {
    return {
      rating: 1,
      ratingDescription: "you have to work harder the next period"
    }
  }

  return {
    rating: 1,
    ratingDescription: "you have to work harder the next period"
  }
}

const calculateExercises = (args: Array<number>, target: number): ExerciseFeedback | string => {
  if (!args) throw new Error('Provide an array of hours')

  const exercisesAverage = args.reduce((a, b) => a+b, 0) / args.length
  const exerciseTarget = target

  if (args) {
    return {
      periodLength: args.length,
      trainingDays: args.filter(d => d !== 0).length,
      success: exercisesAverage === exerciseTarget || exercisesAverage > exerciseTarget,
      rating: exerciserRating(exerciseTarget, exercisesAverage).rating,
      ratingDescription: exerciserRating(exerciseTarget, exercisesAverage).ratingDescription,
      target: exerciseTarget,
      average: exercisesAverage
    }
  }
  return " "
}

try {
  const days = parseArguments(process.argv);
  console.log(calculateExercises(days))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

export default calculateExercises

// console.log(calculateExercises([0, 0, 2, 0, 0, 3, 1]))
