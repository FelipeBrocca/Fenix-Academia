import axios from "axios";


//PROD

export const getClubsRequest = async () => await axios.get(`${process.env.REACT_APP_BASEURL}clubs-hockey`)

export const clubDetailRequest = async (id) => await axios.get(`${process.env.REACT_APP_BASEURL}clubs-hockey/${id}`)

export const newClubRequest = async(club) => await axios.post(`${process.env.REACT_APP_BASEURL}clubs-hockey`, club)

export const updateClubRequest = async(id, club) => await axios.put(`${process.env.REACT_APP_BASEURL}clubs-hockey/${id}`, club)

export const deleteClubRequest = async (id) => await axios.delete(`${process.env.REACT_APP_BASEURL}clubs-hockey/${id}`)


//DEV

// export const getClubsRequest = async () => await axios.get('http://localhost:3500/clubs-hockey')

// export const clubDetailRequest = async (id) => await axios.get(`http://localhost:3500/clubs-hockey/${id}`)

// export const newClubRequest = async(club) => await axios.post('http://localhost:3500/clubs-hockey', club)

// export const updateClubRequest = async(id, club) => await axios.put(`http://localhost:3500/clubs-hockey/${id}`, club)

// export const deleteClubRequest = async (id) => await axios.delete(`http://localhost:3500/clubs-hockey/${id}`)