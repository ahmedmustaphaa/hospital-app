import Doctor from "../models/doctormodel.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'   
import { appointment } from "../models/appoinment.js";
import usermodel from "../models/usermodel.js";
export const addDoctor = async (req, res) => {
    try {
        const { name, email, address, password, speciality, degree, experience, about, available, fees } = req.body;
        const imageFile = req.file; // استقبال ملف واحد فقط

        console.log({ name, email, address, password, speciality, degree, experience, about, available, fees }, imageFile);

        // تحقق من وجود جميع الحقول المطلوبة
        if (!name || !address || !email || !password || !speciality || !degree || !experience || !about  ||available === undefined || !fees || !imageFile) {
            return res.status(400).json({ message: "All fields are required." });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        const uploadedImage = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });

        const newDoctor = new Doctor({
            name,
            email,
            address,
            password: hashedPassword, // استخدم كلمة المرور المشفرة
            speciality,
            degree,
            experience,
            about,
            available,
            fees,
            date: new Date(), // تاريخ اليوم
            image: uploadedImage.secure_url
        });

      
        await newDoctor.save();

        res.status(201).send({ message: "Doctor added successfully", newDoctor });
        
    } catch (error) {
        console.error('Error adding doctor:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body; // تصحيح اسم الحقل من passowrd إلى password

       
        
    
        console.log( process.env.PASSWORD_ADMIN,process.env.EMAIL_ADMIN)

        // تحقق من صحة بيانات الاعتماد
        if (email === process.env.EMAIL_ADMIN && password === process.env.PASSWORD_ADMIN) {
            const token = jwt.sign(email+password, process.env.SECRET_KEY); // تأكد من استخدام _id من كائن الطبيب
            
            return res.status(200).send({ message: "Login successfully", token });
        }

        return res.status(401).send({ message: "Invalid email or password" });
    } catch (error) {
        console.error('Error logging in admin:', error.message);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const getDoctors = await Doctor.find({});  // استرجاع جميع الأطباء من قاعدة البيانات

        if (getDoctors.length > 0) {  // التأكد من أن هناك أطباء في القاعدة
            res.status(200).send({  // إ
                message: "Doctors retrieved successfully",
                doctors: getDoctors
            });
        } else {
            res.status(404).send({ message: "No doctors found" });  // في حال عدم وجود أطباء
        }
    } catch (error) {
        console.error(error);  // طباعة الخطأ في السيرفر
        res.status(500).send({ message: "Error retrieving doctors", error: error.message });  // إرسال استجابة مع الخطأ
    }
};

export const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params; 
        if (!id) {
            return res.status(400).send({ message: "Doctor ID is required" });
        }

       
        const deleteResult = await Doctor.findByIdAndDelete(id);

        if (deleteResult) {
            return res.status(200).send({ message: "Doctor deleted successfully", deleteResult });
        } else {
            return res.status(404).send({ message: "Doctor not found" });
        }
    } catch (error) {
        console.error(error);  
        res.status(500).send({ message: "Error deleting doctor", error: error.message });  
    }
};

export const getAllAppointment=async(req,res)=>{
 try{
    const getAllappointment=await appointment.find({});

    if(!getAllappointment){
        res.send({message:"appointment not found" ,success:false})
    }
    else{

        res.send({success:true ,message:"all appointment retreived succcessfully" ,getAllappointment})
    }
 }catch(error){
    
    console.error(error);  // طباعة الخطأ في السيرفر
    res.status(500).send({ message: "Error deleting doctor", error: error.message });
 }
}
export const DDashboard = async (req, res) => {
    try {
        const [DoctorData, userData, appointmentData] = await Promise.all([
            Doctor.find({}),
            usermodel.find({}),
            appointment.find({})
        ]);

        // Check if any of the data arrays are empty
        if (!DoctorData.length && !userData.length && !appointmentData.length) {
            return res.send({ message: "There are no entries", success: false });
        }

        const allData = {
            DoctorData:DoctorData.length,
            userData:userData.length,
            appointmentData:appointmentData.length,
            latestappointmentData:appointmentData.reverse().slice(0,5)
        };

        res.send({ message: "All data retrieved successfully", success: true, allData });
    } catch (error) {
        res.status(500).send({ message: "An error occurred", success: false, error: error.message });
    }
};