const express = require("express");
const connectMongoDB = require("./connection");
const urlRouter = require("./routes/Url");
const URL = require("./models/Url");
const path = require("path");

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/02project").then(() => {
  console.log("MongoDB Connected!");
});

//Set Templeting Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/test", (req, res) => {
  return res.render("home");
});

//Routes
app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitiHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(result.redirectUrl);
});

//Run App
app.listen(PORT, () => console.log(`App Is Listening on PORT: ${PORT}`));
