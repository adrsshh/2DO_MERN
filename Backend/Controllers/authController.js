const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/generateTokens");
//REGISTER
const registerUser = async (req,res) => {
  const {name,email,password} = req.body; //Extracting Info from Frontend POST request
  try{
    const userExists = await User.findOne({email}); //Checking if the user already exists or not
    if(userExists){
       return res.status(400).json({ message: "User already exists" });
    }
     const hashedPassword = await bcrypt.hash(password, 10); //encrypting the password before storing it in the DB.
     const user = await User.create({ // Storing in DB
        name,
        email,
        password : hashedPassword //storing the hashed password in the DB instead of the plain text password for security reasons.
     })
      res.status(201).json({
            message: "User registered successfully"
        });
  }
  catch(error){
    res.status(500).json({message:error.message});
  }
}

//LOGIN
const loginUser = async (req,res) =>{
     const {email , password} = req.body;
     try{
      const user = await User.findOne({email});
      if(!user){
       return res.status(400).json({message :"User Does not Exists"});
      }
      const isMatch = await bcrypt.compare(password , user.password);
      if(!isMatch){
        return res.status(400).json({message : "Invalid Password!"})
      }
      res.json({
        token : generateToken(user._id),
        user : {
          id   : user.id,
          name : user.name,
          email: user.email
        }
      })
     }
     catch(error){
      res.status(500).json({message : error.message});
     }
}

const getMe = async (req, res) => {
    try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getMe };
