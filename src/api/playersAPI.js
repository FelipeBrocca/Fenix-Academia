import axios from 'axios';

export const getPLayersRequest = async () => await axios.get('/players-hockey')

export const playerDetailRequest = async (id) => await axios.get(`/players-hockey/${id}`)

export const createPlayerRequest = async (player) => {
    const form = new FormData()

    for(let key in player){
        form.append(key, player[key])
    }

    return await axios.post('http://localhost:3500/players-hockey', form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const updatePlayerRequest = async (id, player) => {
    const form = new FormData()

    for(let key in player){
        form.append(key, player[key])
    }

    return await axios.put(`/players-hockey/${id}`, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deletePlayerRequest = async (id) => await axios.delete(`/players-hockey/${id}`)