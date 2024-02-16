const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkAuthCookie } = require("./middleware/auth");
const Blog = require("./models/blog");

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
app.use(cookieParser());
app.use(checkAuthCookie("token"));
app.use(express.static("./public"));

app.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  return res.render("home", {
    user: req.user,
    blogs: blogs,
  });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
