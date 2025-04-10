import mongoose from 'mongoose';

const appointmentSchema = mongoose.Schema({
    userId: { type: String, required: true }, // User ID
    docId: { type: String, required: true }, // Doctor ID
    slotDate: { type: String,  }, // Appointment date
    slotTime: { type: String,  }, // Appointment time
    userData: { type: Object, required: true }, // User data
    docData: { type: Object, required: true }, // Doctor data
    amount: { type: Number, required: true }, // Amount (cost of appointment)
    date: { type: Number, required: true }, // Booking date and time
    cancelled: { type: Boolean, default: false }, // Cancellation status (default: false)
    payment: { type: Boolean, default: false }, // Payment status (default: false)
    isCompleted: { type: Boolean, default: false }, // Completion status (default: false)
});

export const appointment = mongoose.model('appointment', appointmentSchema);