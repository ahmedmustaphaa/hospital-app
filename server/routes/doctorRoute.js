import express from 'express';
import { changeAvailability, getDoctorData, loginDoctor } from '../controllers/doctorcontroller.js';

const doctorRouter=express.Router();

doctorRouter.get('/list',getDoctorData);
doctorRouter.post('/logindoc',loginDoctor);
doctorRouter.post('/change-availability', changeAvailability);

export default doctorRouter;
