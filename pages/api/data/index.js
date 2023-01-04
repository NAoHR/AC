import connectDB from "../../../backend/middleware/connectDB";
import decideMethod from "../../../backend/middleware/decidemethodMiddleware";
import authenticationMiddleware from "../../../backend/middleware/authenticationMiddleware";
import errorHandler from "../../../backend/utils/errorHandler";
import CustSchema from "../../../backend/models/Customer.model";

const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
import {models, model} from "mongoose";


const handler = async (req, res) => {
    try{
        const {page=1, bulan="all"} = req.query;

        const options = {
            page: isNaN(Number(page)) ? 1 : page,
            limit: 100,
            collation: {
              locale: 'en',
            },
        };
        let CustomerModel = models.Cust || model("Cust", CustSchema);

        const aggregate = [
            {
                $addFields : {
                    currentLog: {
                        $last: "$logKontak"
                    }
                }
            }
        ]
        

        if(bulan && bulan !== "all") {
            aggregate.push({
                $match: {
                    bulan : {
                        $in : bulan.split(",")
                    }
                }
            })
        }
        
        const aggregation = CustomerModel.aggregate(aggregate);

        CustomerModel.aggregatePaginate = aggregatePaginate.aggregatePaginate;

        const customers = await CustomerModel.aggregatePaginate(aggregation, options);

        return res.status(200).json({
            ok: true,
            data: customers
        })


    }catch(e){
        return errorHandler(e, res);
    }
}

export default decideMethod(connectDB(authenticationMiddleware(handler)), "get")