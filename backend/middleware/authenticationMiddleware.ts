import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

import AdminModel from "../models/admin.model";
import errorHandler from "../utils/errorHandler";
import jwt from "jsonwebtoken";

const authenticationMiddleware = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try{

            const {authorization} = req.headers;
            
            
            if(authorization){
                
                const verifyJwt = jwt.verify(authorization.split(" ")[1], process.env.SECRET_AT as string);
                const token = typeof(verifyJwt) == "string" ? verifyJwt : verifyJwt.uid

                const admin = await AdminModel.findOne({_id: token})
                if(admin){
                    return handler(req, res);
                }
                return res.status(403).json({
                    ok: false,
                    message: "account not found"
                })
                
            }
            return res.status(403).json({
                ok: false,
                message: "token not found"
            })

        }catch(e){
            const newE = e as Error;
            
            return errorHandler(newE, res)
        }
    }
}

export default authenticationMiddleware;