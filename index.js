const express = require("express");

 const databaseConnection = require("./database.js");
 const routes=require("./routes/Userrputes.js")
 const massagerout=require("./routes/massageroute.js")
const dotenv = require("dotenv");
const cookiesPaser=require("cookie-parser")
const cors=require("cors")
const {server ,app}=require("./socket/socket.js")
const { Server } = require("socket.io");  // Destructure 'Server' from 'socket.io'
const http = require("http");
const { disconnect } = require("process");



app.use(cors({ origin: "http://localhost:5173", credentials: true }));
dotenv.config(); 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookiesPaser())

const port = process.env.PORT || 3000; 


databaseConnection();

//
app.use("/api/user",routes)
app.use("/api/massage",massagerout)





server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});