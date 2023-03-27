import React, { useEffect, useState } from 'react'
import { usePlayers } from '../../context/PlayersContext'
import Loader from '../Loader/Loader'
import ItemPlayer from './ItemPlayer'
import './PlayersList.css'

const PlayersList = () => {

    const { players, getPlayers } = usePlayers()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            await getPlayers()
                .then(() => {
                    setLoading(false)
                })
        })()
    }, [getPlayers])

    return (
        <>
            {
                loading
                    ? <Loader />
                    : <ul>
                        {
                            players?.map((player) => (
                                <ItemPlayer
                                    id={player._id}
                                    name={player.name}
                                    key={player._id}
                                />
                            ))
                        }
                    </ul>
            }
        </>
    )
}

export default PlayersList