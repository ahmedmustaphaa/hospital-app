import Doctor from "../models/doctormodel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
export const getDoctorData=async(req,res)=>{

    try{
        const getDoctor=await Doctor.find({});

        res.send({success:true,getDoctor})
    }catch(error){
        console.log(error.message)

        res.status(404).send({success:false,message:error.message})
    }
}
export const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        // Find the doctor by ID
        const doctor = await Doctor.findById(docId);
        
        if (!doctor) {
            return res.status(404).send({ message: "Doctor not found", success: false });
        }

       if(doctor){
        doctor.available = !doctor.available;

        // Save the updated doctor
        const updatedDoctor = await doctor.save();

        res.send({
            message: "Updated successfully",
            success: true,
            doctor: updatedDoctor
        });
       }
      
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ success: false, message: error.message });
    }
};

export const loginDoctor=async (req,res)=>{
    try{

        const {name,email,password}=req.body;
        const loginDoc=Doctor.find({email})

        if(!loginDoc){
            res.send({message:"not found until now ",success:false})
        }
        const isMatch=bcrypt.compare(password,loginDoc.password)

        if(isMatch){
            const token=jwt.sign({id:loginDoc._id},process.env.SECRET_KEY);
            res.send({success:true,token});
        }
           

    }catch(error){
        console.log(error.message)

        res.status(404).send({success:false,message:error.message})
    }
}