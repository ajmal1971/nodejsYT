const express = require("express");
const connectMongoDB = require("./connection");
const logRequest = require("./middlewares/requestLogs");
const userRouter = require("./routes/User");
const path = require("path");

const app = express();
const PORT = 8000;

// Connect to DB
connectMongoDB("mongodb://127.0.0.1:27017/01project").then(
  console.log("MongoDB Connected!")
);

//Set Templeting Engine
express.set("view engine", "ejs");
express.set("views", path.resolve("./views"));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(logRequest);

app.get("/test", (req, res) => {
  return res.render("home");
});

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
