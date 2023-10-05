const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) =>{
   
    const authHeader = req.headers.token;

    if(authHeader){

        const token = authHeader.split(" ")[1]; // Splitting the authHeader by space
        jwt.verify(token,process.env.JWT_SEC, (err, user)=>{ // Verifying
            if(err) res.status(403).json("Token is not valid"); // Invalid Token
            req.user = user; // Request a user
            next(); // Leave the function & move to the router
        })  
    }else{
        return res.status(401).json("You are not authenticated"); // Not authenticated message
    }
};

const verifyTokenAndAuthorization = (req, res, next) =>{
    verifyToken(req,res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next(); // Go to route
        } else{
            res.status(403).json("You are not allowed to do that!"); // Not Authorized message
        }
    });

}


const verifyTokenAndAdmin = (req, res, next) =>{ // Only admin can add products
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){
            next(); // Go to route
        } else{
            res.status(403).json("You are not allowed to do that!"); // Not Authorized message
        }
    });

}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };