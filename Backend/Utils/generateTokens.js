const jwt = require("jsonwebtoken");

const generateToken = (id) =>{
    return jwt.sign(
        {id: id},
        process.env.JWT_SECRET,
        {expiresIn : "7d"}
    )  
}

module.exports = generateToken;


//jwt.sign(payload, secretKey, options)

// jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

// payload  -> data stored in token (user id)
// secretKey -> used to sign token
// expiresIn -> token expiry time

// Why store user id in token?
// So backend knows which user is making request.

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  Secret Key
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// JWT_SECRET is used to sign the token.

// Token = payload + secretKey -> signature

// When token comes back:
// Server verifies token using same secret key.

// If signature matches -> token valid
// Else -> token fake

// So secret key is very important for security.
