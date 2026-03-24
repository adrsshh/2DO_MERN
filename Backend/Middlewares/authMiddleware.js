const jwt = require("jsonwebtoken");

const protect = (req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]; //extracting token 
            const decoded = jwt.verify(token , process.env.JWT_SECRET); // checking if it matches or not
            req.user = decoded.id; //storing the user id in req.user.
            next();
        }
        catch(error){
            res.status(401).json({message : "Not Authorized , Token Failed"});
        }
    }
    if(!token){
        res.status(401).json({message: "Not Authorized , No Token"})
    }
}

module.exports = protect;