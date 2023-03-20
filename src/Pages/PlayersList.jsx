import React from 'react'
import { usePlayers } from '../context/PlayersContext'
import { Link } from 'react-router-dom'
import CreateModal from '../components/CreatePlayer/CreateModal'


const PlayersList = () => {

    const { players } = usePlayers()


    return (
        <>
        <div className='players-list'>
            <ul>
            {
                players?.map((player) => (
                    <li key={player._id}>
                         <p>{player.name}</p>
                         <Link to={`/jugador/listado/${player._id}`}>Ver jugador</Link>
                    </li>
                ))
            }
            </ul>
        </div>
        <CreateModal />
        </>
    )
}

export default PlayersList