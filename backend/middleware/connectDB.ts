import mongoose from "mongoose";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const connectDB = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try{
            await mongoose.connect(process.env.DB as string);

            return handler(req, res)
        }catch(e){
            return res.status(501).json({
                ok : false,
                message: "failed to connecto to db"
            })
        }
    }
}

export default connectDB;