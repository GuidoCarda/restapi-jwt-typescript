import app from "./app";
import config from "./config/config";
import "./db";

app.listen(app.get("port"), () => {
  console.log("server working on port " + app.get("port"));
  console.log(config.DB);
});
