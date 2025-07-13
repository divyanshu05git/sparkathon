const {Router}=require("express")
const bcrypt=require("bcrypt")
const {z}=require("zod")
const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config")

const {Customer,Order,Returns,FraudSummary}=require("../db")
const { userAuth } = require("../middlewares/userMiddleware")//

const returnRouter=Router();

returnRouter.post('/',userAuth,async(req,res)=>{
    const {order_id,reason}=req.body;
    const userId=req.user.id;

    if(!product_id){
        return res.status(400).json({
            message:"product not found"
        })
    }

    try{
        const newReturn=await Returns.create({
            custid:userId,
            order_id:order_id
        })
        res.status(201).json({
        message: "Item has been returned ",
        return: newReturn
    });
    }
    catch(err){
        res.status(500).json({
        message:"Error returning item",
        error: err.message
        });
    }
})

module.exports={
    returnRouter
}