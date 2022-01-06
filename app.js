const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound=require('./middlewares/not-found');
const errorHandler=require('./middlewares/error-handler');
const tasks = require("./routes/tasks");

//middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);


app.use(notFound);
app.use(errorHandler);
const port =process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server started on ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
