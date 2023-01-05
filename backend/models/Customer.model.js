import { Schema, ObjectId } from "mongoose";

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
        enum: ["januari", "februari", "maret", "april", "may", "juni", "juli", "agustus", "september", "oktober", "november", "desember"],
        required: [true, "bulan required"]
    },
    logKontak: [
        {
            id: ObjectId,
            tanggal: Date,
            status: {
                type: String,
                enum: ["pending", "mau", "tidak"]
            }
        }
    ]
})


export default CustSchema