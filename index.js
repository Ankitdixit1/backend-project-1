import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";

(async()=>{
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB connected !");

        app.on('error',(error)=>{
            console.log("error:",error);
            throw error
        })
        const onlistening = ()=>{
            console.log(`listening on port ${config.PORT}`);
        }
        app.listen(config.PORT,onlistening)
    } catch (error) {
        console.error("error:",error);
    }
})()
