const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            console.log("hashedPassword");
            
            return res.status(401).json({ message: "User is not authenticated" });
        }

        const decoded = jwt.verify(token, "ajfhasfihfhaqrf");

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.id = decoded.userId;
        console.log("Authenticated user ID:", req.id);

        next();
    } catch (error) {
        console.error("Auth Error:", error);
        return res.status(401).json({ message: "Authentication failed" });
    }
};

module.exports = isAuthenticated;
