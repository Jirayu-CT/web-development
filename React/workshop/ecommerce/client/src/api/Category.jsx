import axios from 'axios'


export const createCategory = async (token, from) => {
    //code body
    return axios.post('http://localhost:3000/api/category', from, {
        headers: {
            Authorization: `Bearer ${token}`,

        }
    })
}


export const listCategory = async (token) => {
    //code body
    return axios.get('http://localhost:3000/api/category', {
        headers: {
            Authorization: `Bearer ${token}`,

        }
    })
}


export const removeCategory = async (token, id) => {
    //code body
    return axios.delete(`http://localhost:3000/api/category/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,

        }
    })
}