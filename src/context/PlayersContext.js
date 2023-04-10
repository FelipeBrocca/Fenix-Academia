import { createContext, useContext, useCallback, useState } from "react"
import {
    getPLayersRequest,
    playerDetailRequest,
    createPlayerRequest,
    updatePlayerRequest,
    deletePlayerRequest
} from '../api/playersAPI'

const playersContext = createContext()
const todayDate = new Date()
const todayMonth = todayDate.getMonth()

export const usePlayers = () => {
    const context = useContext(playersContext)
    return context
}

export const PlayersProvider = ({ children }) => {
    const [players, setPlayers] = useState([])


    const getPlayers = useCallback(async () => {
        const res = await getPLayersRequest();
        const playersToActive = res.data.map((player) => {
            const monthValue = player.pay.monthsPayed.map((month) => month.value);
            const isActive = monthValue.some((month) => month === todayMonth);
            return { ...player, active: isActive };
        });
        setPlayers(playersToActive)
    }, []);

    const getPlayer = useCallback(async (id) => {
        try {
            const playerFound = await playerDetailRequest(id);
            const equalPlayer = players.find(player => player._id === playerFound.data._id);
            return equalPlayer;
        } catch (error) {
            console.error(error);
            return null;
        }
    }, [players]);


    const createPlayer = async (player) => {
        const create = await createPlayerRequest(player)
        if (create) {
            const monthValue = player.pay.monthsPayed.map((month) => month.value);
            const isActive = monthValue.some((month) => month === todayMonth);
            create.data.active = isActive
            setPlayers([...players, create.data])
        } else {
            alert('No se pudo crear el nuevo jugador')
        }
    }

    const updatePlayer = async (id, player) => {
        const playerToEdit = await updatePlayerRequest(id, player)
        if(playerToEdit){
            const monthValue = player.pay.monthsPayed.map((month) => month.value);
            const isActive = monthValue.some((month) => month === todayMonth);
            playerToEdit.data.active = isActive

            setPlayers(players.map(player => (
                player._id === id
                    ? playerToEdit.data
                    : player)
            ))
        }
    }

    const eliminatePlayer = async (id) => {
        await deletePlayerRequest(id)
        setPlayers(players.filter(player => player._id !== id))
    }

    return (
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