import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';

export const deleteBooking = async (req, res) => {
 

    const id = req.params.id
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.userId;

   

    try {
        
        const book = await Booking.findByIdAndDelete(id);


        
        await Doctor.findOneAndUpdate(
            { _id: book.doctor._id, "timeSlots.date": book.book[0].date, "timeSlots.startingTime": book.book[0].startingTime, "timeSlots.endingTime": book.book[0].endingTime },
            { $set: { "timeSlots.$.status": false } },
            { $pull: { appointments: id } }
        );

        await Doctor.findOneAndUpdate(
            { _id: book.doctor._id },
            { $pull: { appointments: id } }
        );


        res.status(200).json({ success: true, message: "Booking delete" });
    } catch (err) {
        
        res.status(500).json({ success: false, message: err.message });
    }
}

export const createBooking = async (req, res) => {

    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.userId;

    // creer une booking
    const newBooking = new Booking(req.body);

    try {
        
        const savedBooking = await newBooking.save();

        await Doctor.findByIdAndUpdate(req.body.doctor, { $push: { appointments: savedBooking._id } });

        const { book } = req.body;
        //MaJ le creneau horaire correspondant pour le docteur en modifiant son statut a true, pour indiquer que le rendez-vous est reserver
        await Doctor.findOneAndUpdate(
            { _id: req.body.doctor, "timeSlots.date": book.date, "timeSlots.startingTime": book.startingTime, "timeSlots.endingTime": book.endingTime },
            { $set: { "timeSlots.$.status": true } }
        );

        
        res.status(200).json({ success: true, message: "Booking submitted", data: savedBooking });
    } catch (err) {
        
        res.status(500).json({ success: false, message: err.message });
    }
}
