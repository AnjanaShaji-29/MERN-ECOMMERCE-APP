const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE

router.post("/", verifyToken, async(req,res)=>{
    const newCart = new Cart(req.body); // Reading the cart

    try{
        const savedCart = await newCart.save(); // Saving the cart into DB
        res.status(200).json(savedCart); // Returning the cart
    } catch(err){
        res.status(500).json(err); // Error
    }
});


// UPDATE 

router.put("/:id", verifyTokenAndAuthorization, async(req,res) =>{
   
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,
             {
            $set : req.body  // Updating the Cart
        },
        
        {new:true}); // Returning the updated Cart

        res.status(200).json(updatedCart); 

    } catch(err){
        res.status(500).json(err); // Error
    }
   
});


// DELETE 

router.delete("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id) // Deleting the Cart by passing the id
        res.status(200).json("Cart deleted succesfully");  //Delete Success message

    } catch(err){
        res.status(500).json(err); // Error
    }
});


// GET USER CART

router.get("/find/:userId", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const cart = await Cart.findOne( { userId : req.params.userId} ); // Finding the cart by passing the userid
            res.status(200).json(cart); // Returning the cart
    } catch(err){
        res.status(500).json(err); // Error
    }
});

// GET ALL 

router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const carts = await Cart.find(); // Finding all carts
        res.status(200).json(carts) // Returning all carts
    }
    catch(err){
        res.status(500).json(err); // Error
    }

});

module.exports = router;