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


        const updateCreds = await CustomerModel.findOneAndUpdate({
            _id : String(customerID)
        },body,{
            runValidators : true,
            new: true
        })

        
        
        if(updateCreds){
            const objectifyCus = updateCreds.toObject();

            if(objectifyCus.logKontak.length > 0){
                objectifyCus.currentLog = objectifyCus.logKontak[objectifyCus.logKontak.length -1]
            }
            return res.status(200).json({
                ok : true,
                message : "data updated",
                data: objectifyCus
            })
        }
        throw({name: "DNF"})


    }catch(e){
        const newE = e as Error;
        return errorHandler(newE, res)
    }
}

export default decideMethod(connectDB(authenticationMiddleware(handler)), "put");