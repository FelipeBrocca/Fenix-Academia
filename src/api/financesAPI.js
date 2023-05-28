import axios from "axios";

export const getFinancesReq = async () => await axios.get('https://serverfenix-acad.onrender.com/finances-admin')

export const financeDetailReq = async (id) => await axios.get(`https://serverfenix-acad.onrender.com/finances-admin/${id}`)

export const createFinanceReq = async (data) => await axios.post('https://serverfenix-acad.onrender.com/finances-admin', data)

export const updateFinanceReq = async (id, data) => await axios.put(`https://serverfenix-acad.onrender.com/finances-admin/${id}`, data)

export const deleteFinanceReq = async (id) => await axios.delete(`https://serverfenix-acad.onrender.com/finances-admin/${id}`)