import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import passport from "passport";
import passportMiddleware from "./middlewares/passport";

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.get("/", (req, res) => {
  res.send(`The api is at http://localhost/${app.get("port")}`);
});

app.use(authRoutes);
app.use(protectedRoutes);

export default app;
