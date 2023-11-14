import express from "express";
import morgan from "morgan";
import cors from "cors";

import authRouter from "./routes/auth.routes";

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`The api is at http://localhost/${app.get("port")}`);
});

app.use(authRouter);

export default app;
