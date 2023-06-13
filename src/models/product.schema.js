import mongoose from "mongoose";

const   productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:["true","plz provide a product name" ],
        trim:true,
        maxleng:[120,"product name should look "]
    },
    price:{
        type:String,
        required:["true","plz provide a product price" ],
        maxleng:[5,"product price shoulde be not more   5 "]
    },
    Description:{
        type:String,

    },
    photo:[
        {
            Secure_url:{
                type:String,
                required:true
            }
        }
    ],
    Stock:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    },
    CollectionID:{
        ref: "Collection"
    }
},{timestanps: true})

export default mongoose.model("Product",productSchema)