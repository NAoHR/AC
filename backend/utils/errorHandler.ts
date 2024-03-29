import { NextApiResponse } from "next"

// solusi sementara
const errorHandler = (errorMessage: Record<any, any> , res: NextApiResponse) => {
    console.log(errorMessage.name, errorMessage.message)

    const errMess = (code=501,name="Internal Error",message="internal error occured") => {
        return res.status(code).json({
            ok : false,
            name : name,
            message : message
        })
    }
    

    switch(errorMessage?.name){
        case "ValidationError":
            const validatorKeys = Object.keys(errorMessage.errors) || []
            let message = `${errorMessage?._message || "validation error"} in ${validatorKeys.join(",")}`

            return errMess(403,errorMessage.name, message);
        case "MongoServerError":
            switch(errorMessage.code){
                case 11000:
                    let keyValue = Object.keys(errorMessage.keyValue);
                    let message = `there ${keyValue.length > 1 ? "are" : "is"} duplicate in ${keyValue.join(",")}`

                    return errMess(403,errorMessage.name,message);
                default:

                    return errMess();
            }
        case "CastError":

            return errMess(403,errorMessage.name,"request not valid")

        case "UNF":
            return errMess(403,errorMessage.name,"user not found")

        case "DNF":
            return errMess(403,errorMessage.name,"Data not found")

        case "Error":
            switch(errorMessage.message){
                case "OIA":
                    return errMess(403,errorMessage.message, "Only Images are allowed");

                case "FTL":
                    return errMess(403,errorMessage.message,"File too Large")

                default:
                    return errMess();

            }
        case "TokenExpiredError" :
            return res.status(401).json({
                ok : false,
                failedLoginRelated : true,
                message : "Session expired"
            });
        case "JsonWebTokenError":
            return res.status(401).json({
                ok : false,
                failedLoginRelated : true,
                message : errorMessage.message
            })
        case "PVF":
            return errMess(403, "Password validation failed", "password should contain lowercase,uppercase,number, and symbol")
        case "MongooseError":
            return errMess(501, errorMessage.name, "connection failed due to wrong database uri")
        default:
            return errMess();

    }
}

export default errorHandler;