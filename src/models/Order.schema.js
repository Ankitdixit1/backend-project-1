import mongoose from "mongoose";
const orderSchema=new mongoose.Schema({
    product:{
        type:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Product"
                },
                Count:Number,
                Price:Number
            }
        ],
        required: true
    },
    user:{
        type:mongoose.Schema.type.ObjectId,
        ref:"User",
        required:true
    },
    Address:{
        type:String,
        required:true,
    },
    PhoneNumber:{
        required:true,
        type:Number
    },
    Amount:{
        type:Number,
        required:true
    },
    Coupons:String,
    TransacionId:string
},{timestamps:true})
export default mongoose.model("Order",orderSchema)