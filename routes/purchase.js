const {Router}=require("express")
// const bcrypt=require("bcrypt")
// const {z}=require("zod")
const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config")

const {Customer,Order,Return,FraudSummary}=require("../db")
const { userAuth } = require("../middlewares/userMiddleware")
const user = require("./user")

const buyRouter=router();

buyRouter.post("/purchase",userAuth,async(req,res)=>{
    const {product_id,transaction_value,quantity}=req.body;
    const custid=req.user.id;

    if(!product_id){
        return res.status(400).json({
            message: "product doesnt exist"
        })
    };

    if(quantity==0){
        return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    try {
        const newOrder = await Order.create({
            custid,
            product_id,
            transaction_value, 
            quantity
        });

        res.status(201).json({
            message: "Purchase successful",
            order: newOrder
        })
    }

    catch (err) {
        res.status(500).json({ message: "Error while ordering", error: err.message });
    }
})

module.exports = { buyRouter }