import axios from 'axios';

//PROD

export const loggedInAuth = async() => await axios.get(`https://serverfenix-acad.onrender.com/auth/loggedIn`)

export const loginRequest = async(user) => await axios.post(`https://serverfenix-acad.onrender.com/auth`, user)

export const logoutRequest = async() => await axios.post('https://serverfenix-acad.onrender.com/auth/logout')

//DEV

// export const loggedInAuth = async() => await axios.get(`http://localhost:3500/auth/loggedIn`)

// export const loginRequest = async(user) => await axios.post(`http://localhost:3500/auth`, user)

// export const logoutRequest = async() => await axios.post('http://localhost:3500/auth/logout')