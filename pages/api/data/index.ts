import { NextApiRequest, NextApiResponse } from "next";

import decideMethod from "../../../backend/middleware/decidemethodMiddleware";
import authenticationMiddleware from "../../../backend/middleware/authenticationMiddleware";

import connectDB from "../../../backend/middleware/connectDB";
import errorHandler from "../../../backend/utils/errorHandler";
import CustSchema from "../../../backend/models/Customer.model";
import {models, model} from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try{
        const CustomerModel = models.Cust || model("Cust", CustSchema)

        const custs = await CustomerModel.aggregate([
            {
                $group : {
                    _id : '$bulan',
                    count: {$sum: 1}
                }
            }
        ])

        return res.status(200).json({
            ok: true,
            data: custs
        })

    }catch(e){
        console.log(e)
        const newE = e as Error;
        return errorHandler(newE, res);
    }
}

export default authenticationMiddleware(decideMethod(connectDB(handler), "get"))