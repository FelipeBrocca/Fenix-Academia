import axios from 'axios';

//PROD

export const loggedInAuth = async() => await axios.get(`${process.env.REACT_APP_BASEURL}auth/loggedIn`)

export const loginRequest = async(user) => await axios.post(`${process.env.REACT_APP_BASEURL}auth`, user)

export const logoutRequest = async() => await axios.post(`${process.env.REACT_APP_BASEURL}auth/logout`)

//DEV

// export const loggedInAuth = async() => await axios.get(`http://localhost:3500/auth/loggedIn`)

// export const loginRequest = async(user) => await axios.post(`http://localhost:3500/auth`, user)

// export const logoutRequest = async() => await axios.post('http://localhost:3500/auth/logout')