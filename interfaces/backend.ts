import { NextApiRequest } from "next";

export interface ILogKontak {
    _id: string,
    tanggal: Date,
    status: "pending" | "mau" | "tidak"
}
export type TMonth = "januari" | "februari" | "maret" | "april" | "may" | "juni" | "juli" | "agustus" | "september" | "oktober" | "november" | "desember"

export interface ICustomer {
    _id: String,
    nama: String,
    telepon: String,
    alamat : String,
    bulan: TMonth,
    logKontak: Array<ILogKontak>,
    currentLog?: ILogKontak
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

export interface IFilter {
    text: String,
    isNonTouched: boolean
}
export interface IZustandStore {
    user : {
        username: String,
        isLoggedIn: boolean
    },
    contentEditables: boolean,
    filter: IFilter,
    query: "all" | String,
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
        method: "detail" | "edit" | "delete" | "add" | "message" |"",
        data: ICustomer | null
    },
    customers : ICustomer[] | boolean,
    customersStats: ICustStat[] | boolean,


    updateUser : (username: String, isLoggedIn: boolean) => void,
    updateCustomers: (data: ICustomer[]) => void
    updateStats: (isInit: boolean, data: ICustStat[] | ICustStat | boolean, num: number, month?: "januari" | "februari" | "maret" | "april" | "may" | "juni" | "juli" | "agustus" | "september" | "oktober" | "november" | "desember") => void,
    updateFilters: (filter: IFilter) => void,
    setCurrentModified: (status: boolean, method:"detail" | "edit" | "delete" | "add" | "message" | "", data: null | ICustomer) => void
    updateQuery: (months: "all" | String) => void,
    setPagination: (data: ICustPagination) => void
    updateEditable: (val: boolean) => void,
    addCustomer: (data: ICustomer) => void,
    deleteCustomer: (id: String) => void,
    editCustomer: (id: String, data: ICustomer) => void
}

export interface IAdminExtendsNextAPI extends NextApiRequest {
    admin? : IAdmin
}