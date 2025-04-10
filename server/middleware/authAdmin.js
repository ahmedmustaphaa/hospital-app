import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).send({ message: "Token is required" });
        }

     
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

     
        req.admin = decoded;
        console.log("Token verified successfully:", decoded);
        next();
    } catch (error) {
        console.error('Error in token verification:', error.message);
        return res.status(403).send({ message: "Unauthorized access, invalid token", error: error.message });
    }
};

export default authAdmin;
