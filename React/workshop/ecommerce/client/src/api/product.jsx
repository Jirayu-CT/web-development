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

export const uploadFiles = async (token, from) => {
    //code body
    // console.log('uploadFiles', from)
    return axios.post('http://localhost:3000/api/images', {
        image: from
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}


export const removeFile = async (token, public_id) => {
    //code body
    // console.log('uploadFiles', from)
    return axios.post('http://localhost:3000/api/removeimage', {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}