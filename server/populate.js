require("dotenv").config();

const connectDB = require("./connectDb/connect");
const workouts = require("./models/workoutProgramSchema");
const clients = require("./models/clientsModel");
const workoutPlans = require("./workouts.json");
const clientsPop = require("./client.json");
const dietPlans = require("./diets.json");
const diets = require("./models/dietSchema");
const dataLength = require("./dataLength.json");
const dataLengthSchema = require("./models/dataLengthSchema");
const start = async () => {
  try {
    await connectDB(process.env.PT_URI);
    await dataLengthSchema.deleteMany();
    await dataLengthSchema.create(dataLength);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
