import { IAdminExtendsNextAPI } from "../../interfaces/backend";
import { NextApiResponse } from "next";
import authenticationMiddleware from "../../backend/middleware/authenticationMiddleware";

import connectDB from "../../backend/middleware/connectDB";
import decideMethod from "../../backend/middleware/decidemethodMiddleware";
import errorHanler from "../../backend/utils/errorHandler";

async function handler(req: IAdminExtendsNextAPI, res: NextApiResponse): Promise<unknown>{
    try{
        
        
        return res.status(200).json({
            ok : true,
            data: {
                username: req.admin?.username
            }
        })
    }catch(e){
        const newE = e as Error;
        return errorHanler(newE, res)
    }
}

export default decideMethod(connectDB(authenticationMiddleware(handler)), "get");