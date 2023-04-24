import axios from 'axios'

export const getTrainingsReq = async () => await axios.get('http://localhost:3500/trainings-hockey')

export const trainingDetailReq = async (id) => await axios.get(`http://localhost:3500/trainings-hockey/${id}`)

export const createTrainingReq = async (training) => {
    const form = new FormData()

    for (let key in training) {
        let value = training[key];

        const keysToCheck = ["date", "createdAt", "players", "coaches"]

        if (keysToCheck.includes(key)) {
            value = JSON.stringify(value)
        }
        form.append(key, value)
    }

    
    return await axios.post('http://localhost:3500/trainings-hockey', form, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}
export const updateTrainingReq = async (id, training) => {
    const form = new FormData()

    for (let key in training) {
        let value = training[key];

        const keysToCheck = ["date", "createdAt", "players", "coaches"]

        if (keysToCheck.includes(key)) {
            value = JSON.stringify(value)
        }
        form.append(key, value)
    }

    
    return await axios.put(`http://localhost:3500/trainings-hockey/${id}`, form, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const deleteTrainingReq = async (id) => await axios.delete(`http://localhost:3500/trainings-hockey/${id}`)