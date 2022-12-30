import errorHandler from "../../../../../backend/utils/errorHandler";
import CustSchema from "../../../../../backend/models/Customer.model";
import decideMethod from "../../../../../backend/middleware/decidemethodMiddleware";
import authenticationMiddleware from "../../../../../backend/middleware/authenticationMiddleware";
import connectDB from "../../../../../backend/middleware/connectDB";

import { NextApiRequest, NextApiResponse } from "next";
import { model, models } from "mongoose";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        
        const {customerID} = req.query;

        const CustomerModel  = models.Cust || model("Cust", CustSchema);

        const customer = await CustomerModel.findOne({_id: customerID});

        if(customer){
            customer.logKontak.push({
                tanggal: new Date(),
                status: "pending"
            })

            await customer.save();
            
            return res.status(200).json({
                ok: true
            })
        }
        throw({name: "DNF"})
    }catch(e){
        const newE = e as Error;
        return errorHandler(newE, res)
    }
}


export default decideMethod(connectDB(authenticationMiddleware(handler)), "post");