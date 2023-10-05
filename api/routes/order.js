const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE

router.post("/", verifyToken, async(req,res)=>{
    const newOrder = new Order(req.body); // Reading the order

    try{
        const savedOrder = await newOrder.save(); // Saving the order into DB
        res.status(200).json(savedOrder); // Returning the order
    } catch(err){
        res.status(500).json(err); // Error
    }
});


// UPDATE 

router.put("/:id", verifyTokenAndAdmin, async(req,res) =>{
   
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
             {
            $set : req.body  // Updating the Order
        },
        
        {new:true}); // Returning the updated order

        res.status(200).json(updatedOrder); 

    } catch(err){
        res.status(500).json(err); // Error
    }
   
});


// DELETE 

router.delete("/:id", verifyTokenAndAdmin, async(req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id) // Deleting the Order by passing the id
        res.status(200).json("Order deleted succesfully");  //Delete Success message

    } catch(err){
        res.status(500).json(err); // Error
    }
});


// GET USER Orders

router.get("/find/:userId", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const orders = await Order.find( { userId : req.params.userId} );// Finding the order by passing the userid
            res.status(200).json(orders); // Returning the order
    } catch(err){
        res.status(500).json(err); // Error
    }
});

// GET ALL ORDERS

router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    try{
        const orders = await Order.find(); // Finding all orders
        res.status(200).json(orders) // Returning all orders
    }
    catch(err){
        res.status(500).json(err); // Error
    }

});

// GET MONTHLY INCOME 

router.get("/income", verifyTokenAndAdmin, async(req,res)=>{
    
    const date = new Date(); // Current Date
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1)); // Return last month
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); // Return previous month
    


    try{
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month : { $month: "$createdAt" },  // Month Jan-Dec
                    sales : "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",  // Month Jan-Dec
                    total: { $sum: "$sales" }, //  Total amount 
                }
            }

        ]);
        
        res.status(200).json(income);

    } catch(err){
        res.status(500).json(err); // Error
    }

});


module.exports = router;