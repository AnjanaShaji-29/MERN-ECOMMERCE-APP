const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// UPDATE 

router.put("/:id", verifyTokenAndAuthorization, async(req,res) =>{
    if(req.body.password){ 
        req.body.password = CryptoJS.AES.encrypt( // Encrypting password incase if the user changed
            req.body.password, 
            process.env.PASS_SEC
            ).toString();
    }

    try{
        const updateduser = await User.findByIdAndUpdate(req.params.id,
             {
            $set : req.body  // Updating the user
        },
        
        {new:true}); // Returning the updated user

        res.status(200).json(updateduser); 

    } catch(err){
        res.status(500).json(err); // Error
    }
   
});


// DELETE A SPECIFIC USER

router.delete("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id) // Deleting the user by passing the id
        res.status(200).json("User deleted succesfully");  //Delete Success message

    } catch(err){
        res.status(500).json(err); // Error
    }
});


// GET A SPECIFIC USER

router.get("/find/:id",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);// Finding the user by passing the id
        const { password, ...others } = user._doc; // Not sending the password 
            res.status(200).json(others); // Sending the user
    } catch(err){
        res.status(500).json(err); // Error
    }
});

// GET ALL USERS

router.get("/",verifyTokenAndAdmin, async(req,res)=>{
       const query = req.query.new // // Fetch users by createdAt
    try{
        const users = query ? await User.find().sort({_id: -1}).limit(5) :await User.find(); // Fetching latest 5 users if query is passed else returning all users
         
            res.status(200).json(users); // Sending the users
    } catch(err){
        res.status(500).json(err); // Error
    }
});


// GET USER STATS

router.get("/stats", verifyTokenAndAuthorization, async(req,res) =>{
   
    const date = new Date(); // Current Date
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1)); // Return last year

    try{
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month : { $month: "$createdAt" }, // Month Jan-Dec
                },
            },
            {
                $group: {
                    _id: "$month",  // Month Jan-Dec
                    total: { $sum: 1 }, // Total Number of users in a month
                }
            }

        ]);
        
        res.status(200).json(data);

    } catch(err){
        res.status(500).json(err); // Error
    }

});


module.exports = router;