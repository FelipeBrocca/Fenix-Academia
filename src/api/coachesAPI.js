import axios from "axios";

export const getCoachesRequest = async () => await axios.get('http://localhost:3500/coaches-hockey')

export const coachDetailRequest = async (id) => await axios.get(`http://localhost:3500/coaches-hockey/${id}`)

export const newCoachRequest = async(coach) => await axios.post('http://localhost:3500/coaches-hockey', coach)

export const updateCoachRequest = async(id, coach) => await axios.put(`http://localhost:3500/coaches-hockey/${id}`, coach)

export const deleteCoachRequest = async (id) => await axios.delete(`http://localhost:3500/coaches-hockey/${id}`)