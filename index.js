require('dotenv').config()

const express=require("express")
const mongoose=require("mongoose")

const app=express()

app.use(express.json())

const {userRouter} =require("./routes/user")
const { returnRouter } = require('./routes/return')

app.use("/user",userRouter)
app.use("/return",returnRouter)
app.use("/user", buyRouter)


async function main(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000)
    console.log("connected")
}

main()