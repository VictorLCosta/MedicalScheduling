var appointment = require("../models/Appointment");
var appointmentFactory = require("../factories/AppointmentFactory")
var moongose = require("mongoose");
const AppointmentFactory = require("../factories/AppointmentFactory");

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

    async GetAll(showFinished){
        if(showFinished){
            return await model.find();
        } else {
            var appos = await model.find({'finished': false});
            var appointments = [];

            appos.forEach(appo => {
                if(appo.date != undefined){
                    appointments.push(AppointmentFactory.Build(appo));
                }
            });

            return appointments;
        }
    }

    async GetById(id){
        try {
            var event = await model.findById(id);

            return event;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AppointmentRepository();