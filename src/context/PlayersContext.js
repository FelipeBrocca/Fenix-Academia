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
    useEffect(() => {
        getPlayers()
    }, [])

    const eliminatePlayer = async(id) => {
        await deletePlayerRequest(id)
        setPlayers(players.filter(player => player._id !== id))
    }


    return(
        <playersContext.Provider value={{
            players,
            setPlayers,
            getPlayers,
            eliminatePlayer
        }}>
            {children}
        </playersContext.Provider>
    )
}