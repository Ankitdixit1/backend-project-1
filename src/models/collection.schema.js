import mongoose from "mongoose";
const collectionschema = new mongoose.Schema(
    {
        name:{
            type: string,
            required:["true","please provide a collection name"],
            trim: true,
            maxLenght:[
                120,
                "collection should not be more than 150 chars"
            ]
        }
    },{timestamps: ture}
)
export default mongoose.model("Collection",collectionschema)