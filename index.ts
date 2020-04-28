import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator'

const app = express();
app.use(express.json())

app.get("/bmi", (_req, res) => {

  const {height, weight} = _req.query;

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.send({
      error: "malformatted parameters"
    });
  };

  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight)
  });
});

app.post("/exercises", (req, res) => {
  const exercises = req.body.daily_exercises
  const target = req.body.target

  if (!exercises || !target) {
      res.send({ error:"parameters missing"
    })
  }

  const isArrayValid = () => {
    let isValid: boolean = true
    exercises.forEach(day => {
      if (isNaN(Number(day))) {
        console.log(day)
        isValid = false
      }
    })
    return isValid
  }

  console.log("VAlid", isArrayValid())

  if (isNaN(Number(target)) || !isArrayValid()) {
    res.send({ error: "malformatted parameters"})
  }

  res.send(calculateExercises(exercises, target))

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
