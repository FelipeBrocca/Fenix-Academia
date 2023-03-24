import axios from 'axios';

export const loggedInAuth = async() => await axios.get(`http://localhost:3500/auth/loggedIn`)

export const loginRequest = async(user) => await axios.post(`http://localhost:3500/auth`, user)

export const logoutRequest = async() => await axios.post('http://localhost:3500/auth/logout')
