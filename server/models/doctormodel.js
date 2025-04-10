import mongoose from "mongoose";

const doctorSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },
    address: { type: Object, required: true },
    fees: { type: Number, required: true },
    date: { type: Number },
    slots_booked: { type: Object, default: {} }, // Fixed typo from 'slots_book' to 'slots_booked'
}, { minimize: false });

const Doctor = mongoose.model('doctor', doctorSchema);

export default Doctor;