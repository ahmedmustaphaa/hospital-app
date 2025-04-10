import express from 'express';
import { authUser } from '../middleware/authUser.js';
import upload from '../middleware/multer.js';
import stripe from 'stripe'; // تأكد من استيراد مكتبة Stripe
import { appointment } from '../models/appoinment.js';
import {
    bookAppointment,
    cancelAppointment,
    getAllAppointment,
    getProfile,
    loginUser,
    registerUser,
    updateProfile
} from '../controllers/usercontrollers.js';

const userRouter = express.Router();
const stripeClient = stripe('sk_test_51Q5bi709J47FAh4sVswfmC4NmWQRYuDQbj1hwMg1e8jCqBgEveiigV1FYg7Nf0991jnL7NvAvq8TjzmqLVZSA4bd00jr6relRx'); // استخدم مفتاحك السري

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);
userRouter.get('/get-appointment', getAllAppointment);
userRouter.post('/appointment', authUser, bookAppointment);

// نقطة النهاية للدفع
userRouter.post('/payment', authUser, async (req, res) => {
    try {
        const { appointmentId } = req.body;
        console.log("Received appointmentId:", appointmentId); 

        const appointmentData = await appointment.findById(appointmentId);
        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // إنشاء PaymentIntent لـ Stripe
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: appointmentData.amount * 100, // تحويل المبلغ إلى أصغر وحدة عملة (سنت)
            currency: process.env.CURRENCY, // تأكد من أن هذه هي العملة الصحيحة
            description: `Appointment payment for ${appointmentId}`, // استخدام القالب الصحيح
            metadata: { appointmentId }, // إضافة البيانات الوصفية (appointmentId)
        });

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,  // إرسال client secret إلى الواجهة الأمامية لمعالجتها
        });
    } catch (error) {
        console.error("Error creating Stripe payment:", error);
        res.status(500).send({ message: "There was an error.", error: error.message });
    }
});

userRouter.post('/cancel-appointment', authUser, cancelAppointment);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);

export default userRouter;
