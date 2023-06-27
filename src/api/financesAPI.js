import axios from "axios";

//PROD

export const getFinancesReq = async () => await axios.get(`${process.env.REACT_APP_BASEURL}finances-admin`)

export const financeDetailReq = async (id) => await axios.get(`${process.env.REACT_APP_BASEURL}finances-admin/${id}`)

export const createFinanceReq = async (data) => await axios.post(`${process.env.REACT_APP_BASEURL}finances-admin`, data)

export const updateFinanceReq = async (id, data) => await axios.put(`${process.env.REACT_APP_BASEURL}finances-admin/${id}`, data)

export const deleteFinanceReq = async (id) => await axios.delete(`${process.env.REACT_APP_BASEURL}finances-admin/${id}`)


//DEV

// export const getFinancesReq = async () => await axios.get('http://localhost:3500/finances-admin')

// export const financeDetailReq = async (id) => await axios.get(`http://localhost:3500/finances-admin/${id}`)

// export const createFinanceReq = async (data) => await axios.post('http://localhost:3500/finances-admin', data)

// export const updateFinanceReq = async (id, data) => await axios.put(`http://localhost:3500/finances-admin/${id}`, data)

// export const deleteFinanceReq = async (id) => await axios.delete(`http://localhost:3500/finances-admin/${id}`)