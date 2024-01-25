const express = require("express");
const connectMongoDB = require("./connection");
const logRequest = require("./middlewares/requestLogs");
const userRouter = require("./routes/User");

const app = express();
const PORT = 8000;

// Connect to DB
connectMongoDB("mongodb://127.0.0.1:27017/01project").then(
  console.log("MongoDB Connected!")
);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logRequest);

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
