import usermodel from "../models/usermodel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary'
import Doctor from '../models/doctormodel.js'
import { appointment } from "../models/appoinment.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config(); 
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // التحقق من وجود جميع الحقول
        if (!name || !email || !password) {
            return res.status(400).send({ message: "جميع الحقول مطلوبة" });
        }

        // تشفير كلمة المرور
        const hashPassword = await bcrypt.hash(password, 10);

        // إنشاء مستخدم جديد
        const registerUser = new usermodel({
            name,
            email,
            password: hashPassword
        });

        // حفظ المستخدم في قاعدة البيانات
        const newUser = await registerUser.save();

        // إنشاء توكن JWT
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY_USER); // تأكد من وجود SECRET_KEY_USER في env

        res.status(201).send({ message: "تم تسجيل المستخدم بنجاح", token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // التحقق من وجود البريد الإلكتروني وكلمة المرور
        if (!email || !password) {
            return res.status(400).send({ message: "البريد الإلكتروني وكلمة المرور مطلوبان" });
        }

        // العثور على المستخدم بواسطة البريد الإلكتروني
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }

        // التحقق من كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
        }

        // إنشاء توكن JWT
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY_USER); // تأكد من وجود SECRET_KEY_USER في env

        res.status(200).send({ message: "تم تسجيل الدخول بنجاح", token });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};

//api to get profile user data


export const getProfile = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await usermodel.findById(userId).select('-password'); 
        if (!userData) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        res.json({ success: true, userData });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const { name, email, address, dob, gender, userId } = req.body;

        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        user.address = address;
        user.dob = dob;
        user.gender = gender;

        if (req.file) {
            const imageFile = req.file.path;

            try {
                const uploadImage = await cloudinary.uploader.upload(imageFile, {
                    resource_type: 'image'
                });
                user.image = uploadImage.secure_url;
                
    console.log("Uploaded Image URL:", uploadImage.secure_url); // تحقق من الرا
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError.message);
                return res.status(500).send({ message: "Image upload failed" });
            }
        }

        const updatedUser = await user.save();
        console.log("User updated successfully:", updatedUser); // تحقق من البيانات المحدثة

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
};
export const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body;

        const docData = await Doctor.findById(docId).select('-password');

        if (!docData) {
            return res.status(404).send({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.status(400).send({ success: false, message: "Doctor not available" });
        }

        let slot_booked = docData.slots_booked || {};

        if (slot_booked[slotDate]) {
            if (slot_booked[slotDate].includes(slotTime)) {
                return res.status(400).send({ success: false, message: "Slot not available" });
            } else {
                slot_booked[slotDate].push(slotTime);
            }
        } else {
            slot_booked[slotDate] = [slotTime];
        }

        const userData = await usermodel.findById(userId).select('-password');
        if (!userData) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        const newAppointment = new appointment({
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: 100,
            date: Date.now(),
        });
        await newAppointment.save();
        await Doctor.findByIdAndUpdate(docId, { slots_booked: slot_booked });

        res.json({ success: true, message: "Appointment booked successfully", appointment: newAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: error.message });
    }
};export const getAllAppointment = async (req, res) => {
    try {
        const getllAllAppointment = await appointment.find({});
        
        if (!getllAllAppointment.length) {
            return res.status(404).send({ message: "No appointments found." });
        }

        res.status(200).send({ message: "All appointments retrieved successfully.", getllAllAppointment });
    } catch (error) {
        res.status(500).send({ message: "There was an error.", error: error.message });
    }
};export const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
 

        // التحقق من وجود userId و appointmentId في الطلب
        if (!userId || !appointmentId) {
            return res.status(400).json({ success: false, message: "User ID and Appointment ID are required." });
        }

        // البحث عن الموعد
        const appointmentData = await appointment.findById(appointmentId);
   // التحقق من وجود appointmentData و userId
   
if (!appointmentData || !appointmentData.userId) {
    return res.status(404).json({ success: false, message: "Appointment data or user ID is missing." });
}

// التحقق من صحة الوصول
if (appointmentData.userId.toString() !== userId) {
    return res.status(403).json({ success: false, message: "Unauthorized access." });
}
        // إلغاء الموعد
        await appointment.findByIdAndUpdate(appointmentId, { cancelled: true }, { new: true });

        const { docId, slotDate, slotTime } = appointmentData;

        // الحصول على بيانات الطبيب
        const doctorData = await Doctor.findById(docId);
        if (!doctorData) {
            return res.status(404).json({ success: false, message: "Doctor not found." });
        }
        

        // تحديث مواعيد الطبيب
        let slots_booked = doctorData.slots_booked || {};

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
            // حذف التاريخ إذا لم يتبقى أوقات
            if (slots_booked[slotDate].length === 0) {
                delete slots_booked[slotDate];
            }
        }

        // تحديث بيانات الطبيب
        await Doctor.findByIdAndUpdate(docId, { slots_booked });

        // إرسال استجابة النجاح
        res.json({ success: true, message: "Appointment cancelled successfully." });
        console.log("User ID from request:", userId);
        console.log("User ID from appointment data:", appointmentData.userId.toString());

    } catch (error) {
        console.error("Error cancelling appointment:", error);
        res.status(500).json({ success: false, message: "There was an error.", error: error.message });
    }
};