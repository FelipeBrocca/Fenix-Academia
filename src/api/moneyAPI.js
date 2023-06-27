import axios from "axios";

//PROD

export const moneyDetailReq = async (id) => await axios.get(`${process.env.BASEURL}money/${id}`)
export const createMoneyReq = async (data) => await axios.post(`${process.env.BASEURL}money`, data)
export const updateMoneyReq = async (id, data) => await axios.put(`${process.env.BASEURL}money/${id}`, data)
export const deleteMoneyReq = async (id) => await axios.delete(`${process.env.BASEURL}money/${id}`)


//DEV

// export const moneyDetailReq = async (id) => await axios.get(`http://localhost:3500/money/${id}`)
// export const createMoneyReq = async (data) => await axios.post('http://localhost:3500/money', data)
// export const updateMoneyReq = async (id, data) => await axios.put(`http://localhost:3500/money/${id}`, data)
// export const deleteMoneyReq = async (id) => await axios.delete(`http://localhost:3500/money/${id}`)