const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.render("create")
});

mongoose.connect("mongodb://localhost:27017/scheduling", {useNewUrlParser: true, useUnifiedTopology: true})

app.listen(8080, () => {
    console.log("Server rodando");
})