import { IAdmin, IBodyLogin } from "../../interfaces/backend";
import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "../../backend/middleware/connectDB";
import decideMethod from "../../backend/middleware/decidemethodMiddleware";
import AdminModel from "../../backend/models/admin.model";
import errorHanler from "../../backend/utils/errorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


async function handler( 
req:NextApiRequest, 
res:NextApiResponse 
){
    try{
        const body: IBodyLogin = req.body;
        const {username, password} = body;

        if(username && password){
            let person: IAdmin | null;

            person = await AdminModel.findOne({username: username});

            if(person){
                const match = await bcrypt.compare(password, person.password as string);
                if(match){
                    
                    const acToken = await jwt.sign({
                        "uid" : person._id
                    },process.env.SECRET_AT as string,{
                        expiresIn : "2d"
                    });

                    return res.status(200).json({
                        ok: true,
                        data: {
                            token: acToken,
                            username : person.username
                        }
                    })
                }
                return res.status(401).json({
                    ok : false,
                    message: "wrong password"
                })
            }
            throw({name: "UNF"})
        }
        
        return res.status(403).json({
            ok: false,
            message: "invalid format"
        })

    }catch(e){
        const newE = e as Error;
        return errorHanler(newE, res)
    }
}


export default decideMethod(connectDB(handler), "post")

