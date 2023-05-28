import axios from "axios";

export const moneyDetailReq = async (id) => await axios.get(`https://serverfenix-acad.onrender.com/money/${id}`)
export const createMoneyReq = async (data) => await axios.post('https://serverfenix-acad.onrender.com/money', data)
export const updateMoneyReq = async (id, data) => await axios.put(`https://serverfenix-acad.onrender.com/money/${id}`, data)
export const deleteMoneyReq = async (id) => await axios.delete(`https://serverfenix-acad.onrender.com/money/${id}`)