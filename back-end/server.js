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
  let meseStringa
  if (mese==0) meseStringa="Gennaio"
  if (mese==1) meseStringa="Febbaio"
  if (mese==2) meseStringa="Marzo"
  if (mese==3) meseStringa="Aprile"
  if (mese==4) meseStringa="Maggio"
  if (mese==5) meseStringa="Giugno"
  if (mese==6) meseStringa="Luglio"
  if (mese==7) meseStringa="Agosto"
  if (mese==8) meseStringa="Settembre"
  if (mese==9) meseStringa="Ottobre"
  if (mese==10) meseStringa="Novembre"
  if (mese==11) meseStringa="Dicembre"
  console.log(typeof(etaUtente))

  const result = new User({ nome, cognome, eta: etaUtente, giorno, mese, meseStringa, anno, sesso });
  result
    .save()
    .then((result) => {
      console.log("success: ", result);
      res.json({stato: "successo"})
    })
    .catch((err) => {
      console.log(err)
      res.json({stato: "errore"})
    });
});

app.post("/getallusers", async (req, res) => {
  const ordinamento=req.body.ordinamento
  const ordine=req.body.ordine
  console.log(ordine)
  let allUsers

  if (ordinamento==0) allUsers = await User.find().sort({ cognome: ordine, nome: ordine});
  if (ordinamento==1) allUsers = await User.find().sort({ nome: ordine});
  if (ordinamento==2) allUsers = await User.find().sort({ cognome: ordine});
  if (ordinamento==3) allUsers = await User.find().sort({ eta: ordine, cognome: 1, nome: 1});
  if (ordinamento==4) allUsers = await User.find().sort({ giorno: ordine, cognome: 1, nome: 1});
  if (ordinamento==5) allUsers = await User.find().sort({ mese: ordine, cognome: 1, nome: 1});
  if (ordinamento==6) allUsers = await User.find().sort({ anno: ordine, cognome: 1, nome: 1});

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

app.get("/removeallusers",(req,res)=>{
  User.deleteMany({$or: [{sesso: "maschio"}, {sesso: "femmina"}]},(err,data)=>{
    console.log(data)
    console.log("err: "+err)
    if (data){
      res.json({stato: "Tutti gli utenti eliminati"})
    }
    if (data == null) res.json({ stato: "errore" });
  })
})