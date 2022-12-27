import create from 'zustand';
import { IZustandStore } from '../interfaces/backend';

const init: IZustandStore = {
    user : {
        username: "",
        isLoggedIn: false
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
        data: ""
    },
    customers : [],
    customersStats: [],
    updateCustomers() {},
    updateStats() {},
    setPagination() {},
    updateUser() {},
    addCustomer() {},
    deleteCustomer() {}
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
    updateStats(isInit, data, num){
        if(isInit && Array.isArray(data)){
            set({customersStats: data})
        }else{
            set((state) => {
                return {
                    ...state,
                    customersStats: state.customersStats.map((v)=> {
                        if(v._id == "maret"){
                            return {_id: v._id, "count" : v.count + num}}
                        else {
                            return v
                        }
                    })
                }
            })
        }
    },
    setPagination(data) {
        set({pagination: data})
    },

    // data manipulation related
    addCustomer(data) {
        const customers = get().customers;
        if(typeof customers !== 'boolean'){
            set({customers: [data].concat(customers)})
        }
    },
    deleteCustomer(id) {
        const customers = get().customers;
        if(typeof customers !== 'boolean'){
            set({customers: customers.filter((v) => v._id !== id)})
        }
    }
}))

export default useAdminStore