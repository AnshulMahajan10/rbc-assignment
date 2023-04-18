const express = require("express");
const app = express();
const port = 5000;

const Router = require("./routes/routes");
const mongoose = require("mongoose");
const dbConfig = require("./config/config.js");

const db =
  dbConfig.mongoUrl;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));


app.use("/api", Router);

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
