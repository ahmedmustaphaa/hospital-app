import jwt from 'jsonwebtoken';

export const authUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(403).send({ message: 'Access denied' });

        const tokenDecoded = jwt.verify(token, process.env.SECRET_KEY_USER);
        req.body.userId = tokenDecoded.id; // تعيين userId في body

        next(); // استدعاء next() للانتقال إلى الدالة التالية
    } catch (error) {
        console.log(error.message);
        res.status(401).send({ message: error.message, success: false });
    }
};