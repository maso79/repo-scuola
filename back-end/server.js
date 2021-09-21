const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/registernewuser", async (req, res) => {
  const { nome, cognome } = req.body;

  const user = new User({ nome, cognome });

  try {
    const result = await user.save();
    console.log("success: ", result);
  } catch (err) {
    console.log(err);
  }
});

//database connection
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
);
