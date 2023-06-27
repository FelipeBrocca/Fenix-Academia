import axios from 'axios'

//PROD

export const getTrainingsReq = async () => await axios.get(`${process.env.REACT_APP_BASEURL}trainings-hockey`)

export const trainingDetailReq = async (id) => await axios.get(`${process.env.REACT_APP_BASEURL}trainings-hockey/${id}`)

export const createTrainingReq = async (training) => await axios.post(`${process.env.REACT_APP_BASEURL}trainings-hockey`, training)

export const updateTrainingReq = async (id, training) => await axios.put(`${process.env.REACT_APP_BASEURL}trainings-hockey/${id}`, training)

export const deleteTrainingReq = async (id) => await axios.delete(`${process.env.REACT_APP_BASEURL}trainings-hockey/${id}`)


//DEV


// export const getTrainingsReq = async () => await axios.get('http://localhost:3500/trainings-hockey')

// export const trainingDetailReq = async (id) => await axios.get(`http://localhost:3500/trainings-hockey/${id}`)

// export const createTrainingReq = async (training) => await axios.post('http://localhost:3500/trainings-hockey', training)

// export const updateTrainingReq = async (id, training) => await axios.put(`http://localhost:3500/trainings-hockey/${id}`, training)

// export const deleteTrainingReq = async (id) => await axios.delete(`http://localhost:3500/trainings-hockey/${id}`)