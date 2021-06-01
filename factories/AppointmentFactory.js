class AppointmentFactory{
    Build(appointment){
        var day = appointment.date.getDate();
        var month = appointment.date.getMonth();
        var year = appointment.date.getFullYear();

        var minutes = appointment.date.getMinutes();
        var hours = appointment.date.getHours();

        var startDate = new Date(year, month, day, hours, minutes, 0, 0);

        var appo = {
            id: appointment._id,
            title: appointment.name + " - " + appointment.desc,
            start: startDate,
            end: startDate
        }

        return appo;
    }
}

module.exports = new AppointmentFactory();