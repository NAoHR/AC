import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const decideMethod = (handler: NextApiHandler, method: "get" | "post" | "put") => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try{

            if(req.method?.toLowerCase() == method){
                return handler(req, res)
            }
            return res.status(403).json({
                ok: "false",
                message: "invalid method"
            })
        }catch(e){
            return res.status(501).json({
                ok : false,
                message: "failed to connecto to db"
            })
        }
    }
}

export default decideMethod;