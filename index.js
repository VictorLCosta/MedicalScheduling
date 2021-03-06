const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const appointmentRepo = require("./repositories/AppointmentRepository");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/getcalendar", async (req, res) => {
    var consult = await appointmentRepo.GetAll(false);

    res.json(consult);
});

app.get("/search", async (req, res) => {
    var search = req.query.search;

    res.json(await appointmentRepo.Search(search));
});

app.get("/list", async (req, res) => {
    var appos = await appointmentRepo.GetAll(true);
    res.render("list", {appos})
});

app.get("/event/:id", async (req, res) => {
    var appointment = await appointmentRepo.GetById(req.params.id);

    res.render("event", {appo: appointment});
});

app.get("/create", (req, res) => {
    res.render("create")
});

app.post("/finish", async (req, res) => {
    var id = req.body.id;

    await appointmentRepo.Finish(id);

    res.redirect("/")
});

app.post("/create", async (req, res) => {
    var result = await appointmentRepo.Create(
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

var poolInterval = 3000;

setInterval(async () => {
    var appos = await appointmentRepo.SendNotification();
    appos.forEach(appo => {
        var date = appo.date.getTime();

        var hour = 1000 * 60 * 60;

        var gap = date - Date.now();

        if(gap <= hour){
            console.log(appo.title);
        }
    });

}, poolInterval);

mongoose.connect("mongodb://localhost:27017/scheduling", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useFindAndModify", false)

app.listen(8080, () => {
    console.log("Server rodando");
})