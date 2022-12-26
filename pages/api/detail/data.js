import connectDB from "../../../backend/middleware/connectDB";
import decideMethod from "../../../backend/middleware/decidemethodMiddleware";
import authenticationMiddleware from "../../../backend/middleware/authenticationMiddleware";
import errorHandler from "../../../backend/utils/errorHandler";
import CustSchema from "../../../backend/models/Customer.model";

const mongoosePaginate = require("mongoose-paginate-v2");
import {models, model} from "mongoose";


const handler = async (req, res) => {
    try{
        const {page=1} = req.query;

        const options = {
            page: isNaN(Number(page)) ? 1 : page,
            limit: 100,
            collation: {
              locale: 'en',
            },
        };

        const cs = CustSchema.plugin(mongoosePaginate);

        const CustomerModel = models.Cust || model("Cust", cs);


        const customers = await CustomerModel.paginate({}, options);

        return res.status(200).json({
            ok: true,
            data: customers
        })
    }catch(e){
        return errorHandler(e, res);
    }
}

export default authenticationMiddleware(decideMethod(connectDB(handler), "get"))