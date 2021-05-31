const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const appointmentService = require("./repositories/AppointmentRepository");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("create")
});

app.post("/create", async (req, res) => {
    var result = await appointmentService.Create(
        req.body.name,
        req.body.email,
        req.body.desc,
        req.body.cpf,
        req.body.date
    );

    if(result){
        res.redirect("/")
    } else {
        res.send("Ocorreu uma falha");
    }
});

mongoose.connect("mongodb://localhost:27017/scheduling", {useNewUrlParser: true, useUnifiedTopology: true})

app.listen(8080, () => {
    console.log("Server rodando");
})