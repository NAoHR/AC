import create from 'zustand';
import { ICustomer, IZustandStore } from '../interfaces/backend';

const init: IZustandStore = {
    user : {
        username: "",
        isLoggedIn: false
    },
    contentEditables: false,
    filter : {
        text: "",
        isNonTouched: false
    },
    pagination: {
        current: 0,
        total: 0,
        isDisabled: true
    },
    dataDetails: {
        pages: 1,
        searchBar: ""
    },
    currentModified: {
        display: false,
        method: "",
        data: null
    },
    customers : [],
    customersStats: [],
    updateCustomers() {},
    updateStats() {},
    setCurrentModified(){},
    updateFilters() {},
    setPagination() {},
    updateEditable(){},
    updateUser() {},
    addCustomer() {},
    deleteCustomer() {},
    editCustomer() {},
}

const useAdminStore = create<IZustandStore>(( set, get ) => ({
    // init
    ...init,

    // main
    updateUser(username, isLoggedIn) {
        set({user: {username: username, isLoggedIn: isLoggedIn}})
    },
    updateCustomers(data) {
        set({customers: data})
    },
    updateStats(isInit, data, num, month){
        const stats = get().customersStats;
        if(typeof stats !== "boolean"){
            if(isInit && Array.isArray(data)){
                set({customersStats: data})
            }else{
                set((state) => {
                    return {
                        ...state,
                        customersStats: stats.map((v)=> {
                            if(v._id == month){
                                return {_id: v._id, "count" : v.count + num}}
                            else {
                                return v
                            }
                        })
                    }
                })
            }
        }else{
            set({customersStats: false})
        }
    },
    setPagination(data) {
        set({pagination: data})
    },
    updateEditable(val) {
        set({contentEditables: val})
    },
    updateFilters(f) {
        set({filter: f})
    },
    setCurrentModified(status, method ,data) {
        return set({
            currentModified : {
                display: status,
                method: method,
                data: data
            }
        })        
    },

    // data manipulation related
    addCustomer(data) {
        const customers = get().customers;
        if(typeof customers !== 'boolean'){
            const newData = [data].concat(customers)
            set({customers: newData})
        }
    },
    deleteCustomer(id) {
        const customers = get().customers;
        if(typeof customers !== 'boolean'){
            set({customers: customers.filter((v) => v._id !== id)})
        }
    },
    editCustomer(id, data) {
        const customers = get().customers;
        if(typeof customers !== 'boolean'){
            set({customers: customers.map((v) => {
                if(v._id == id){
                    return data
                }
                return v
            })})
        }
    }
}))

export default useAdminStore