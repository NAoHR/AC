import axios, {AxiosRequestConfig} from "axios";
import {ICustomer} from "../interfaces/backend";

interface Ilogin {
    username: string
    password: string
}

type Id = String;

const getToken = () => {
    return window.localStorage.getItem("token")
}

const apiMethod = {
    // post
    login : function(body: AxiosRequestConfig<Ilogin>){
        const {data} = body;
        return axios.post("/api/login", data);
    },
    addData : function(body: AxiosRequestConfig<Omit<ICustomer, "_id" | "logKontak">>){
        const {data} = body;
        return axios.post("/api/data/add", data, {
            headers : {
                Authorization : getToken()
            }
        });
    },
    addlog : function(body: AxiosRequestConfig<Id>){
        const {data} = body;
        return axios.post(`/api/data/edit/${data}/addLog`, {}, {
            headers : {
                Authorization : getToken()
            }
        })
    },

    // get
    isLoggedIn : function(){
        return axios.get("/api/isLoggedIn", {
            headers : {
                Authorization : getToken()
            }
        })
    },
    getDatas: function(page=1, bulan: String="all"){
        return axios.get(`/api/data?page=${page}&bulan=${bulan}`, {
            headers : {
                Authorization : getToken()
            }
        })
    },
    getDetails: function(){
        return axios.get(`/api/data/detail`, {
            headers : {
                Authorization : getToken()
            }
        })
    },

    // delete
    deleteCustomer: function(body: AxiosRequestConfig<Id>){
        const {data} = body;

        return axios.delete(`/api/data/delete/${data}`, {
            headers : {
                Authorization : getToken()
            }
        })
    }
}

export default apiMethod