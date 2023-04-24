import axios from "axios";

export const getCoachesRequest = async () => await axios.get('http://localhost:3500/coaches-hockey')

export const coachDetailRequest = async (id) => await axios.get(`http://localhost:3500/coaches-hockey/${id}`)

export const newCoachRequest = async (coach) => {
    const form = new FormData()

    for (let key in coach) {
        let value = coach[key];
        const keysToCheck = ["role", "pay", "createdAt", "ensurance"];

        if (keysToCheck.includes(key)) {
            value = JSON.stringify(value);
        }

        form.append(key, value);
    }

    return await axios.post('http://localhost:3500/coaches-hockey', form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const updateCoachRequest = async (id, coach) => {
    const form = new FormData()

    for (let key in coach) {
        let value = coach[key];
        const keysToCheck = ["role", "pay", "createdAt", "ensurance"];

        if (keysToCheck.includes(key)) {
            value = JSON.stringify(value);
        }
        form.append(key, value);
    }

    return await axios.put(`http://localhost:3500/coaches-hockey/${id}`, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deleteCoachRequest = async (id) => await axios.delete(`http://localhost:3500/coaches-hockey/${id}`)