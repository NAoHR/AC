import {Model} from "mongoose"

export interface ILogKontak {
    tanggal: Date,
    status: "pending" | "mau" | "tidak"
}

export interface ICustomer {
    nama: String,
    telepon: String,
    alamat : String,
    bulan: String,
    logKontak: Array<ILogKontak>
}

export interface IAdmin {
    username : String,
    password: String,
    _id: string
}

export interface IBodyLogin {
    username: String,
    password: string
}