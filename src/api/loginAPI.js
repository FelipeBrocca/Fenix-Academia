import axios from 'axios';

export const loggedInAuth = async() => await axios.get(`https://serverfenix-acad.onrender.com/auth/loggedIn`)

export const loginRequest = async(user) => await axios.post(`https://serverfenix-acad.onrender.com/auth`, user)

export const logoutRequest = async() => await axios.post('https://serverfenix-acad.onrender.com/auth/logout')
