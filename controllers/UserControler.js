const bcryptjs = require("bcryptjs");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config()

const register = async (req, res) => {
    try {
        const { username, fullname, password, gender } = req.body;

        if (!username || !fullname || !password || !gender) {
            return res.status(400).json({ message: "Some fields are missing" });
        }

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: "Username already exists. Try another." });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const profilePhoto = "https://pic.re/image";

        const newUser = await User.create({
            username,
            fullname,
            password: hashedPassword,
            profileimage: profilePhoto,
            gender,
        });

        res.status(200).json({ message: "Account created successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User does not exist. Please register." });
        }

        const isMatched = await bcryptjs.compare(password, user.password);

        if (!isMatched) {
            return res.status(400).json({ message: "Incorrect username or password" });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.jwt_seceret_key, {
            expiresIn: "1d"
        });

        res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            })
            .json({
                _id:user._id,
                username: user.username,
                fullname: user.fullname,
                profileimage: user.profileimage,
                gender: user.gender,
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
const logout=async(req,res)=>{
    try {
 return res.status(200) .cookie("token", "", {
                httpOnly: true,
                maxAge: 0
            }).json({massage: "user logout successfully"})
        
    } catch (error) {
        console.log(error);
        
    }
}
const getotheruser=async(req,res)=>{
    try {
        const loginuser=req.id
        const otherUser=await User.find({_id:{$ne:loginuser}}).select("-password")
        return res.status(200).json(otherUser)
    } catch (error) {
        console.log();
        
    }
}

module.exports = { register, login  , logout ,getotheruser};
