import { createContext, useContext, useEffect, useState } from "react"
import {
    getPLayersRequest,
    playerDetailRequest,
    createPlayerRequest,
    updatePlayerRequest,
    deletePlayerRequest
} from '../api/playersAPI'

const playersContext = createContext()

export const usePlayers = () => {
    const context = useContext(playersContext)
    return context
}

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState([])


    const getPlayers = async () => {
        const res = await getPLayersRequest()
        setPlayers(res.data)
    }
    
    const getPlayer = async (id) => {
        const player = await playerDetailRequest(id)
        return player.data
    }
    const createPlayer = async(player) => {
        const create = await createPlayerRequest(player)
        if(create){
            setPlayers([...players, create.data])
        } else {
            alert('No se pudo crear el nuevo jugador')
        }
    }
    const updatePlayer = async(id, player) => {
        const playerToEdit = await updatePlayerRequest(id, player)
        setPlayers(players.map(player => (player._id === id ? playerToEdit.data : player)))
    }
    const eliminatePlayer = async(id) => {
        await deletePlayerRequest(id)
        setPlayers(players.filter(player => player._id !== id))
    }
    

    return(
        <playersContext.Provider value={{
            players,
            setPlayers,
            getPlayers,
            getPlayer,
            createPlayer,
            updatePlayer,
            eliminatePlayer    
        }}>
            {children}
        </playersContext.Provider>
    )
}