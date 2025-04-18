import axios from 'axios';

export const createProduct = async (token, from) => {
    //code body
    return axios.post('http://localhost:3000/api/product', from, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}


export const listProduct = async (token, count = 20) => {
    //code body
    return axios.get(`http://localhost:3000/api/products/${count}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}