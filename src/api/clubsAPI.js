import axios from "axios";

export const getClubsRequest = async () => await axios.get('https://serverfenix-acad.onrender.com/clubs-hockey')

export const clubDetailRequest = async (id) => await axios.get(`https://serverfenix-acad.onrender.com/clubs-hockey/${id}`)

export const newClubRequest = async(club) => await axios.post('https://serverfenix-acad.onrender.com/clubs-hockey', club)

export const updateClubRequest = async(id, club) => await axios.put(`https://serverfenix-acad.onrender.com/clubs-hockey/${id}`, club)

export const deleteClubRequest = async (id) => await axios.delete(`https://serverfenix-acad.onrender.com/clubs-hockey/${id}`)