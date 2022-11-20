const express = require("express");
const app = express();

require("dotenv").config();

const noteRoute = require("./routes/notes");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("mongodb connection succesful");
  app.listen(process.env.PORT, () => {
    console.log(`app started on port ${process.env.PORT}`);
  });
}).catch(err=> console.log(err)) ;

app.use((req, res, next) => {
  console.log(req.path, req.method);
  return next();
});

app.use(express.json());

app.use("/api/notes", noteRoute);
app.use("/api/user", userRoute);
