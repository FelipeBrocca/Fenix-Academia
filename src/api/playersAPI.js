import axios from 'axios';

export const getPLayersRequest = async () => await axios.get('http://localhost:3500/players-hockey')

export const playerDetailRequest = async (id) => await axios.get(`http://localhost:3500/players-hockey/${id}`)

export const createPlayerRequest = async (player) => {
    const form = new FormData()

    for (let key in player) {
        let value = player[key];
        if (key === "role" || key === "ensurance") {
          value = JSON.stringify(value);
        }
        form.append(key, value);
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
        let value = player[key];
        if (key === "role" || key === "ensurance") {
            value = JSON.stringify(value);
          }
          form.append(key, value);
    }

    return await axios.put(`http://localhost:3500/players-hockey/${id}`, form, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export const deletePlayerRequest = async (id) => await axios.delete(`http://localhost:3500/players-hockey/${id}`)