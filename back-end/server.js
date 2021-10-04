require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const bodyParser = require("body-parser");
// const cors = require("cors");
const app = express();
const port = process.env.PORT;
const morgan = require("morgan");
const eta=require("./eta")

app.use(express.static("public"))

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
  const { nome, cognome, giorno, mese, anno, sesso } = req.body;
  let etaUtente=eta.calcolaEta(Number(anno),Number(mese),Number(giorno))
  console.log(typeof(etaUtente))

  const result = new User({ nome, cognome, eta: etaUtente, giorno, mese, anno, sesso });
  result
    .save()
    .then((result) => {
      console.log("success: ", result);
    })
    .catch((err) => console.log(err));
});

app.get("/getallusers", async (req, res) => {
  const allUsers = await User.find();

  res.json(allUsers);
});

app.post("/getoneuser", (req, res) => {
  const { nome, cognome } = req.body;

  User.findOne({ nome, cognome }, (err, data) => {
    if (data) res.json(data);
    if (data == null) res.json({ stato: "non trovato" });
  });

  User.aggregate
});

app.post("/removeoneuser", (req, res) => {
  const { nome, cognome } = req.body;

  User.findOneAndRemove({ nome, cognome }, (err, data) => {
    if (data) {
      console.log("Removed user: ", data);
      res.json({ stato: "utente eliminato" });
    }
    if (data == null) res.json({ stato: "non trovato" });
  });
});