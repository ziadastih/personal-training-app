// =========IMPORTING ENV FILE ================
require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// ================== express ================
const express = require("express");
const cookieParser = require("cookie-parser");
const server = express();
const bodyParser = require("body-parser");
// ==============importing routes ====================
const authRoute = require("./routes/pTrouteAuth");
const ptClientRoute = require("./routes/ptClientRoute");
const workoutProgramRoute = require("./routes/workoutProgramRoute");
const dietRoute = require("./routes/dietRoute");
const coachRouter = require("./routes/coachRoute");
const lengthRouter = require("./routes/dataLengthRoutes");
const dailyMacrosRouter = require("./routes/dailyMacrosRoute");
// ===============import connectdb ===========
const connectDB = require("./connectDb/connect");

//============= importing middleware error ======================================
const authCoach = require("./middleware/authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// =================trust proxy and rate limter function ============
// server.set("trust proxy", 1);
// server.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//   })
// );

// ==============security ===========================

server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// server.use(xss());
// server.use(helmet());
// server.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "cdn.jsdelivr.net/npm/axios/dist/axios.min.js "],
//     },
//   })
// );

// ================routes ==========
server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

server.use(cookieParser());
server.use(express.static("../client/public"));
server.use(express.json());

server.use("/api/v1/auth", authRoute);
server.use("/api/v1/coach", authCoach, coachRouter);
server.use("/api/v1/client", authCoach, ptClientRoute);
server.use("/api/v1/workoutProgram", authCoach, workoutProgramRoute);
server.use("/api/v1/diet", authCoach, dietRoute);
server.use("/api/v1/dataLength", authCoach, lengthRouter);
server.use("/api/v1/dailyMacros", authCoach, dailyMacrosRouter);
// ================= error handler =================== ================
server.use(notFoundMiddleware);
server.use(errorHandlerMiddleware);

// ==================connect to db =======================
const start = async () => {
  try {
    await connectDB(process.env.PT_URI);
    server.listen(5000, () => {
      console.log("server is listening");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
