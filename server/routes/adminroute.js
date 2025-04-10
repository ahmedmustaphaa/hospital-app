import express from 'express';
import { addDoctor, DDashboard, deleteDoctor, getAllAppointment, getAllDoctors, loginAdmin } from '../controllers/admincontroller.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { loginDoctor } from '../controllers/doctorcontroller.js';


const addminRouter = express.Router();
addminRouter.post('/add-doctor', authAdmin,upload.single('image'), addDoctor);
addminRouter.post('/login',  loginAdmin);

addminRouter.get('/get-doctors', getAllDoctors);
addminRouter.delete('/delete-doctor/:id', deleteDoctor);

addminRouter.get('/dashboard', DDashboard);
addminRouter.get('/get-appointment', getAllAppointment);



export default addminRouter;