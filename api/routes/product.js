const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE

router.post("/", verifyTokenAndAdmin, async(req,res)=>{
    const newProduct = new Product(req.body); // Reading the new product

    try{
        const savedProduct = await newProduct.save(); // Saving the new product into DB
        res.status(200).json(savedProduct); // Returning the new product
    } catch(err){
        res.status(500).json(err); // Error
    }
});


// UPDATE 

router.put("/:id", verifyTokenAndAdmin, async(req,res) =>{
   
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
             {
            $set : req.body  // Updating the Product
        },
        
        {new:true}); // Returning the updated Product

        res.status(200).json(updatedProduct); 

    } catch(err){
        res.status(500).json(err); // Error
    }
   
});


// DELETE A SPECIFIC PRODUCT

router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id) // Deleting the product by passing the id
        res.status(200).json("Product deleted succesfully");  //Delete Success message

    } catch(err){
        res.status(500).json(err); // Error
    }
});


// GET A SPECIFIC PRODUCT

router.get("/find/:id", async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);// Finding the user by passing the id
            res.status(200).json(product); // Sending the user
    } catch(err){
        res.status(500).json(err); // Error
    }
});

// GET ALL PRODUCTS

router.get("/", async(req,res)=>{
       const qNew = req.query.new // Fetch products by createdAt
       const qCategory = req.query.category; // Fetch by category
    try{
       
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt: -1} ).limit(1) // Fetching latest 5 products
        } else if(qCategory){
            products = await Product.find({categories: {
                $in : [qCategory], // Sorting the products with the querycategory
            },
        });
        } else{
            products = await Product.find(); // Fetching all products
        }
         
            res.status(200).json(products); // Sending the products
    } catch(err){
        res.status(500).json(err); // Error
    }
});


module.exports = router;