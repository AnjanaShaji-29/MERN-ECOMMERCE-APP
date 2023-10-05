const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER

router.post("/register", async(req,res)=> {
    const newUser = new User({ // Creating new user
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
            ).toString(), 
    });

    try{
        const savedUser = await newUser.save(); // Save the newUser to DB
        res.status(201).json(savedUser); // Sending the savedUSer in json format
    } catch(err){
       res.status(500).json(err); // Error
    }
});

// LOGIN

router.post("/login", async(req,res) =>{
    
    try{

        const user = await User.findOne({username: req.body.username}); // Finding the user from DB
       
        !user && res.status(401).json("Wrong credentials"); // No user found
        
        const hashedPassword = CryptoJS.AES.decrypt( // Decrypting the password
            user.password,  
            process.env.PASS_SEC
            );

            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8); // Converting hashedPassword to String
            
            OriginalPassword !== req.body.password && 
            res.status(401).json("Wrong credentials"); // Incorrect Password 

            const accessToken = jwt.sign( // Generating accessToken using jwt
                {
                id: user._id,
                isAdmin: user.isAdmin,
            }, 
            process.env.JWT_SEC, 
                {expiresIn: "3d"} // Expires in 3 days
            );


            const { password, ...others } = user._doc; // Not sending the password 

            res.status(200).json({...others, accessToken}); // Sending the user

    }catch(err){
        res.status(500).json(err); // Error
     }
});

module.exports = router;