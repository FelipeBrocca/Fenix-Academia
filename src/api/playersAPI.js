import axios from 'axios';

export const getPLayersRequest = async () => await axios.get('https://serverfenix-acad.onrender.com/players-hockey')

export const playerDetailRequest = async (id) => await axios.get(`https://serverfenix-acad.onrender.com/players-hockey/${id}`)

export const createPlayerRequest = async (player) => {
    const form = new FormData()

    for (let key in player) {
        let value = player[key];
        const keysToCheck = ["role", "ensurance", "pay", "createdAt", "assistances"];

        if (keysToCheck.includes(key)) {
            value = JSON.stringify(value);
        }

        form.append(key, value);
    }


    return await axios.post('https://serverfenix-acad.onrender.com/players-hockey', form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const updatePlayerRequest = async (id, player) => {
    const form = new FormData()

    for (let key in player) {
        let value = player[key];
        const keysToCheck = ["role", "ensurance", "pay", "createdAt", "assistances"];

        if (keysToCheck.includes(key)) {
            value = JSON.stringify(value);
        }

        form.append(key, value);
    }

    return await axios.put(`https://serverfenix-acad.onrender.com/players-hockey/${id}`, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deletePlayerRequest = async (id) => await axios.delete(`https://serverfenix-acad.onrender.com/players-hockey/${id}`)