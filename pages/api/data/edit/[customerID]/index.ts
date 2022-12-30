import errorHandler from "../../../../../backend/utils/errorHandler";
import CustSchema from "../../../../../backend/models/Customer.model";
import decideMethod from "../../../../../backend/middleware/decidemethodMiddleware";
import authenticationMiddleware from "../../../../../backend/middleware/authenticationMiddleware";
import connectDB from "../../../../../backend/middleware/connectDB";

import { NextApiRequest, NextApiResponse } from "next";
import { model, models } from "mongoose";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const body = req.body;
        const {customerID} = req.query;

        const CustomerModel = models.Cust || model("Cust", CustSchema);

        const updateCreds = await CustomerModel.updateOne({
            _id : String(customerID)
        },body,{
            runValidators : true,
            new: true
        })

        if(updateCreds.matchedCount !== 0){
            if(updateCreds.modifiedCount){
                return res.status(200).json({
                    ok : true,
                    message : "data updated"
                })
            }
            return res.status(200).json({
                ok : true,
                message : "0 updated"
            })
        }
        throw({name: "DNF"})


    }catch(e){
        const newE = e as Error;
        return errorHandler(newE, res)
    }
}

export default decideMethod(connectDB(authenticationMiddleware(handler)), "put");