
const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(401).json({msg:"no token"});

  try{
    req.user = jwt.verify(token,"secret");
    next();
  }catch{
    res.status(401).json({msg:"bad token"});
  }
};
