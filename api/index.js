const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

dotenv.config();

// stripe route 


mongoose
.connect(process.env.MONGO_URL) // Passing the mongoDB connection URL from .env file
.then(() => console.log("DB Connection Succesfull")) //Success message
.catch((err) => {
    console.log(err); // Error
});

app.use(cors());
app.use(express.json()); // Enabling JSON values 

app.use("/api/auth", authRoute); // auth routes
app.use("/api/users", userRoute); // user routes
app.use("/api/products", productRoute); // product routes
app.use("/api/carts", cartRoute); // cart routes
app.use("/api/orders", orderRoute); // order routes

app.listen(process.env.PORT || 5000, () =>{
    console.log("Server is running!"); 
})