const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then((res) => console.log("MongoDB Connected!"));

// Set view engine and view path
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
