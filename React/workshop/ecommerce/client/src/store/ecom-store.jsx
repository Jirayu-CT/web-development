import axios from 'axios'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware' //set localStorage 
import { listCategory } from '../api/Category'
import { listProduct } from '../api/product'

const ecomStore = (set) => ({
    user: null,
    token: null,
    categories: [],
    products: [],
    actionLogin: async (form) => {
        const res = await axios.post('http://localhost:3000/api/login', form)
        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    },
    getCategory: async (token) => {
        try {
            const res = await listCategory(token)
            set({
                categories: res.data
            })
        } catch (error) {
            console.log(error)
        }
    },
    getProduct: async (token, count) => {
        try {
            const res = await listProduct(token, count)
            set({
                products: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
})

const userPersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage),
}

const useEcomStore = create(persist(ecomStore, userPersist))

export default useEcomStore