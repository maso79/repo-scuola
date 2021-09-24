require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bodyParser = require("body-parser");
// const cors = require("cors");
const app = express();
const port = process.env.PORT;
const morgan = require("morgan");

// app.use(cors());
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/registernewuser", (req, res) => {
  const { nome, cognome } = req.body;

  const result = new User({ nome, cognome });
  result
    .save()
    .then((result) => {
      console.log("success: ", result);
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});

app.get("/getallusers", async (req, res) => {
  const allUsers = await User.find();

  res.json(allUsers);
});
