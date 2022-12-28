import axios, {AxiosRequestConfig} from "axios";

interface Ilogin {
    username: string
    password: string
}

const getToken = () => {
    return window.localStorage.getItem("token")
}

const apiMethod = {
    // post
    login : function(body: AxiosRequestConfig<Ilogin>){
        const {data} = body;
        return axios.post("/api/login", data);
    },

    // get
    isLoggedIn : function(){
        return axios.get("/api/isLoggedIn", {
            headers : {
                Authorization : getToken()
            }
        })
    },
    getDatas: function(page=1){
        return axios.get(`/api/data?page=${page}`, {
            headers : {
                Authorization : getToken()
            }
        })
    },
    getDetails: function(page=1){
        return axios.get(`/api/data/detail`, {
            headers : {
                Authorization : getToken()
            }
        })
    }
}

export default apiMethod