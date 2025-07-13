const express = require("express");
const { register, login ,logout ,getotheruser}=require("../controllers/UserControler")
const isAunthicated=require("../mideleware/isAunthaticated")
const router=express.Router()
router.route("/ragister").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/").get(isAunthicated,getotheruser)
module.exports=router