const express= require("express");
const bcrypt = require("bcrypt");
const {UserModel,validteUser,validteLogin,createToken} = require("../models/userModel");
const { auth } = require("../middleweres/auth");
const router = express.Router();

router.get("/", async(req,res) => {
  res.json({msg:"Users work"});
})
router.get("/myInfo", auth, async(req,res) => {
  try{
    let data = await UserModel.find({_id:req.tokenData._id},{password:0})
    res.json(data);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})


router.post("/",async(req,res) => {
  let validBody = validteUser(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    user.password = "*****";
    res.status(201).json(user)
  }
  catch(err){
    if(err.code == 11000){
      return res.status(401).json({msg:"Email already in system, try log in",code:11000})
    }
    res.status(500).json(err);
  }
})
router.post("/login", async(req,res) => {
  let validBody = validteLogin(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = await UserModel.findOne({email:req.body.email})
    if(!user){
      return res.status(401).json({msg:"User or password not match , code:1"})
    }
    let passordValid = await bcrypt.compare(req.body.password,user.password)
    if(!passordValid){
     return res.status(401).json({msg:"User or password not match , code:2"})
    }
    let token = createToken(user._id);
    res.json({token:token})
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})


module.exports = router;