import axios from 'axios'

export const getTrainingsReq = async () => await axios.get('https://serverfenix-acad.onrender.com/trainings-hockey')

export const trainingDetailReq = async (id) => await axios.get(`https://serverfenix-acad.onrender.com/trainings-hockey/${id}`)

export const createTrainingReq = async (training) => await axios.post('https://serverfenix-acad.onrender.com/trainings-hockey', training)

export const updateTrainingReq = async (id, training) => await axios.put(`https://serverfenix-acad.onrender.com/trainings-hockey/${id}`, training)

export const deleteTrainingReq = async (id) => await axios.delete(`https://serverfenix-acad.onrender.com/trainings-hockey/${id}`)