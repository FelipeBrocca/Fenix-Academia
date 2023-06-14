import axios from "axios";

//PROD

export const moneyDetailReq = async (id) => await axios.get(`https://serverfenix-acad.onrender.com/money/${id}`)
export const createMoneyReq = async (data) => await axios.post('https://serverfenix-acad.onrender.com/money', data)
export const updateMoneyReq = async (id, data) => await axios.put(`https://serverfenix-acad.onrender.com/money/${id}`, data)
export const deleteMoneyReq = async (id) => await axios.delete(`https://serverfenix-acad.onrender.com/money/${id}`)


//DEV

// export const moneyDetailReq = async (id) => await axios.get(`http://localhost:3500/money/${id}`)
// export const createMoneyReq = async (data) => await axios.post('http://localhost:3500/money', data)
// export const updateMoneyReq = async (id, data) => await axios.put(`http://localhost:3500/money/${id}`, data)
// export const deleteMoneyReq = async (id) => await axios.delete(`http://localhost:3500/money/${id}`)