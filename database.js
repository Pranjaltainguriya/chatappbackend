const mongoose=require("mongoose")
const dotenv = require("dotenv");

dotenv.config(); 


const dataConnections = () => {
    mongoose.connect(process.env.MONGOOSE_URI , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
};

module.exports=dataConnections