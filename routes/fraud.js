const express=require("express")
const router=express.Router();
const {FraudSummary}=require("../db");

//fraud score of a customer
router.get("/score/:customerId",async(req,res)=>{
    const customerId=req.body.customerId;

    const id=await fraudModel.findone({
        _id:customerId
    })

    if(!id){
        res.status(501).json({
            message:"Error finding user"
        })
        return;
    }

    let thisMonth=new Date();
    thisMonth.setDate(thisMonth-30);

    const count=await fraudModel.collections('replacements').countDocuments({
        customerId,
        dateOfReplacement:{$gte:thisMonth}
    })

    if(count>5){ //count >5 flagg the customer
        //store flagg customer 
        await fraudModel.collections("fraudFlagSchema").updateOne({
            customerId:customerId,
            flaggedDate:thisMonth
        })

        res.json({
            message:"customer is not allowed to return anymore"
        })

        return;
    }
    res.json({
        message:"customer is safe and can return"
    })
})

//get all the flagged customer
router.get("/flagged-customers",async(req,res)=>{
    const fraud=await fraudModel.collections("fraudFlagSchema").find().toArray();

    res.json(fraud);
})

module.exports=router;
