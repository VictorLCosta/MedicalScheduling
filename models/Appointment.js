const mongoose = require("mongoose");

const appointment = new mongoose.Schema({
    name: String,
    email: String,
    desc: String,
    cpf: String,
    date: Date,
    finished: Boolean,
    notified: Boolean
});

module.exports = appointment;