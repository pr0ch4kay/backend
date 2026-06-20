
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendCode } = require("../services/mail.service");

const gen = () => Math.floor(100000 + Math.random()*900000).toString();

exports.register = async (req,res)=>{
  const {name,email,password} = req.body;
  const exists = await User.findOne({email});
  if(exists) return res.status(400).json({msg:"exists"});

  const hash = await bcrypt.hash(password,10);
  const code = gen();

  await User.create({name,email,password:hash,verificationCode:code});
  console.log("📧 Сгенерированный код для пользователя", email, ":", code);
  // await sendCode(email,code);

  res.json({success:true,message:'code sent'});
};

exports.verify = async (req,res)=>{
  const {email,code} = req.body;
  const user = await User.findOne({email});

  if(!user || user.verificationCode !== code)
    return res.status(400).json({msg:"wrong code"});

  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  const token = jwt.sign({id:user._id,email:user.email}, "secret",{expiresIn:"7d"});
return res.json({success:true,token,user:{id:user._id,email:user.email}});
};

exports.login = async (req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});

  if(!user) return res.status(404).json({msg:"no user"});
  if(!user.isVerified) return res.status(403).json({msg:"not verified"});

  const ok = await bcrypt.compare(password,user.password);
  if(!ok) return res.status(400).json({msg:"wrong pass"});

  const token = jwt.sign({id:user._id,role:user.role},"secret",{expiresIn:"7d"});
  res.json({success:true,token,user:{id:user._id,email:user.email}});
};
