var appointment = require("../models/Appointment");
var moongose = require("mongoose");

const model = moongose.model("Appointment", appointment)

class AppointmentRepository
{
    async Create(name, email, desc, cpf, date){
        var appo = new model({
            name, 
            email,
            desc,
            cpf,
            date,
            finished: false
        });

        try {
            await appo.save();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new AppointmentRepository();