import axios from 'axios'

const API = 'https://fakestoreapi.com/products'

export const fetchProducts = () => axios.get(API)
export const addProduct = (data) => axios.post(API, data)
export const updateProduct = (id, data) => axios.put(`${API}/${id}`, data)
export const deleteProduct = (id) => axios.delete(`${API}/${id}`)
export const fetchCategories = () => axios.get(`${API}/categories`)
export const fetchByCategory = (category) => axios.get(`${API}/category/${category}`)
