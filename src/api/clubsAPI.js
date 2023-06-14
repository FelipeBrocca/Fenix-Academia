import axios from "axios";


//PROD

export const getClubsRequest = async () => await axios.get('https://serverfenix-acad.onrender.com/clubs-hockey')

export const clubDetailRequest = async (id) => await axios.get(`https://serverfenix-acad.onrender.com/clubs-hockey/${id}`)

export const newClubRequest = async(club) => await axios.post('https://serverfenix-acad.onrender.com/clubs-hockey', club)

export const updateClubRequest = async(id, club) => await axios.put(`https://serverfenix-acad.onrender.com/clubs-hockey/${id}`, club)

export const deleteClubRequest = async (id) => await axios.delete(`https://serverfenix-acad.onrender.com/clubs-hockey/${id}`)


//DEV

// export const getClubsRequest = async () => await axios.get('http://localhost:3500/clubs-hockey')

// export const clubDetailRequest = async (id) => await axios.get(`http://localhost:3500/clubs-hockey/${id}`)

// export const newClubRequest = async(club) => await axios.post('http://localhost:3500/clubs-hockey', club)

// export const updateClubRequest = async(id, club) => await axios.put(`http://localhost:3500/clubs-hockey/${id}`, club)

// export const deleteClubRequest = async (id) => await axios.delete(`http://localhost:3500/clubs-hockey/${id}`)