import axios from "axios";

export const moneyDetailReq = async (id) => await axios.get(`http://localhost:3500/money/${id}`)
export const createMoneyReq = async (data) => await axios.post('http://localhost:3500/money', data)
export const updateMoneyReq = async (id, data) => await axios.put(`http://localhost:3500/money/${id}`, data)
export const deleteMoneyReq = async (id) => await axios.delete(`http://localhost:3500/money/${id}`)