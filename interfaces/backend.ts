import { NextApiRequest } from "next";

export interface ILogKontak {
    tanggal: Date,
    status: "pending" | "mau" | "tidak"
}

export interface ICustomer {
    _id: String,
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

export interface IZustandStore {
    user : {
        username: String
    },
    currentModified: {
        display: boolean,

    }
    ,customers : ICustomer[],
}

export interface IAdminExtendsNextAPI extends NextApiRequest {
    admin? : IAdmin
}