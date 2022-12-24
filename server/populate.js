require("dotenv").config();

const connectDB = require("./connectDb/connect");
const workouts = require("./models/workoutProgramSchema");
// const clients = require("./models/clientsModel");
const workoutPlans = require("./workouts.json");
// const clientsPop = require("./client.json");
// const dietPlans = require("./diet.json");
// const diets = require("./models/dietSchema");
const start = async () => {
  try {
    await connectDB(process.env.PT_URI);
    await workouts.deleteMany();
    await workouts.create(workoutPlans);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();