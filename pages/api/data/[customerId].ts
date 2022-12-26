import errorHandler from "../../../backend/utils/errorHandler";
import CustSchema from "../../../backend/models/Customer.model";
import decideMethod from "../../../backend/middleware/decidemethodMiddleware";
import authenticationMiddleware from "../../../backend/middleware/authenticationMiddleware";
import connectDB from "../../../backend/middleware/connectDB";

import { NextApiRequest, NextApiResponse } from "next";
import { model, models } from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const {customerId} = req.query;

        const CustomerModel = models.Cust || model("Cust", CustSchema);

        const customer = await CustomerModel.findOne({_id: customerId});
        if(customer){
            return res.status(200).json({
                ok: true,
                message: customer
            })
        }
        throw("DNF")
    }catch(e){
        const newE = e as Error;
        return errorHandler(newE, res)
    }
}

export default decideMethod(connectDB(authenticationMiddleware(handler)), "get")