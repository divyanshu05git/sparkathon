const {Router}=require("express")
const bcrypt=require("bcrypt")
const {z}=require("zod")
const jwt=require("jsonwebtoken")
const {JWT_SECRET} =require("../config")

const {Customer,Order,Return,FraudSummary}=require("../db")
const { userAuth } = require("../middlewares/userMiddleware")