import { Schema, models, model } from "mongoose";

const CustSchema = new Schema({
    nama: {
        type: String,
        required: [true, "nama required"]
    },
    telepon: {
        type: String,
        required: [true, "telepon required"]
    },
    alamat : {
        type: String,
        required: [true, "alamat required"]
    },
    bulan: {
        type: String,
        required: [true, "bulan required"]
    },
    logKontak: [
        {
            tanggal: Date,
            status: {
                type: String,
                enum: ["pending", "mau", "tidak"]
            }
        }
    ]
})


export default CustSchema