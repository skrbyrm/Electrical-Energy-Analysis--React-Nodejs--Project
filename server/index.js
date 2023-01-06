import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import SummaryRoute from "./routes/SummaryRoute.js";
import WeekslyRoute from "./routes/WeekslyRoute.js";
import DailyRoute from "./routes/Daily.js";
import HourlyRoute from "./routes/Hourly.js";
import User from "./models/UserModel.js";
import bcrypt from "bcrypt";
dotenv.config();
const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async (req, res) => {
  await db.sync();
  const existingAdmin = await User.findOne({
    where: {
      role: "admin",
    },
  });
  if (existingAdmin) {
    return;
  }
  const passwords = "admin";
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(passwords, salt);
  try {
    await User.create({
      name: "admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
  } catch (error) {}
})();

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(SummaryRoute);
app.use(WeekslyRoute);
app.use(DailyRoute);
app.use(HourlyRoute);

//store.sync();

app.listen(process.env.PORT, () => {
  console.log("Server up and running...");
});
