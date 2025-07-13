const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const customerSchema=new Schema({
    email:{type:String,unique:true},
    name:String,
    phone_no:String,
    createdDate:Date,
    password:String
    
})

const ordersSchema=new Schema({
    custid:{type:ObjectId,ref:'customers'},
    transaction_value:String,
    order_date:Date,
    return_label:Boolean,
    return_date:Date,
    return_item_id:ObjectId,
    return_category:String,
    return_reason:String
})

const returnSchema=new Schema({
    custid:{type:ObjectId,ref:'customers'},
    order_id:{type:ObjectId,ref:'orders'}
})

const fraudFlagSchema=new Schema({
    custId:{type:ObjectId,ref:'customers'},
    Cluster:Number,
    FraudRisk:String,
    FraudScore:Number
})

module.exports={
    Customer: mongoose.model('customers', customerSchema),
    Order: mongoose.model('orders', ordersSchema),
    Return: mongoose.model('returns', returnSchema),
    FraudSummary: mongoose.model('finalfraudsummary', fraudFlagSchema),
}
