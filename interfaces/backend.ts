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
export interface ICustStat {
    _id: String,
    count: number
}

export interface ICustPagination {
    current: number,
    total: number,
    isDisabled: boolean
}
export interface IZustandStore {
    user : {
        username: String,
        isLoggedIn: boolean
    },
    contentEditables: boolean,
    pagination: {
        current: number,
        total: number,
        isDisabled: boolean
    }
    dataDetails: {
        pages: number,
        searchBar: String
    },
    currentModified: {
        display: boolean,
        method: "detail" | "edit" | "delete" | "add" | "",
        data: ICustomer | null
    },
    customers : ICustomer[] | boolean,
    customersStats: ICustStat[] | boolean,


    updateUser : (username: String, isLoggedIn: boolean) => void,
    updateCustomers: (data: ICustomer[]) => void
    updateStats: (isInit: boolean, data: ICustStat[] | ICustStat | boolean, num: number) => void,
    setCurrentModified: (status: boolean, method:"detail" | "edit" | "delete" | "add" | "", data: null | ICustomer) => void
    setPagination: (data: ICustPagination) => void
    updateEditable: (val: boolean) => void,
    addCustomer: (data: ICustomer) => void,
    deleteCustomer: (id: String) => void
}

export interface IAdminExtendsNextAPI extends NextApiRequest {
    admin? : IAdmin
}