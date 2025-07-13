const {Router}=require("express")
const bcrypt=require("bcrypt")
const {z}=require("zod")
const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config")

const {Customer,Order,Return,FraudSummary}=require("../db")
const { userAuth } = require("../middlewares/userMiddleware")

const userRouter=Router();
userRouter.post("/signup",async(req,res)=>{
    const requiredBody=z.object({
        email:z.string().email(),
        password: z.string().min(6),
        name: z.string().min(1),
        phoneNumber: z.string().min(10)
    })

    const { email, password, phoneNumber, name}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    const date=new Date();

    const parsedDataWithSuccess=requiredBody.safeParse(req.body)

    if(!parsedDataWithSuccess.success){
        res.json({
            message:"Incorrect format"
        })
        return
    }

    try{
        await Customer.create({
            email:email,
            password:hashedPassword,
            name:name,
            phone_no:phoneNumber,
            createdDate:date
        })
        res.json({
            message:"account created"
        })
    }
    catch(err){
        res.json({
            message:"error while signing up"
        })
    }
})

userRouter.post("/signin",async(req,res)=>{
    const {email ,password}=req.body

    const user= await Customer.findOne({
        email:email
    })

    if(!user){
        res.json({
            message:"user doesnt exist"
        })
        return;
    }

    const passwordMatch=await bcrypt.compare(password,user.password)

    if(user&&passwordMatch){
        const token=jwt.sign({
                id:user._id.toString() //.id is unique ..check in the database
            },JWT_SECRET)
        
        res.json({
            token 
        })
    }
})



module.exports={
    userRouter:userRouter
}