import app from "./app";
import "./db";

app.listen(app.get("port"), () => {
  console.log("server working on port " + app.get("port"));
});
