import React, { useEffect, useState } from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import { usePlayers } from '../../context/PlayersContext'
import { useCoaches } from '../../context/CoachesContext'
import Loader from '../Loader/Loader'

const CloseTraining = ({ training, _id }) => {

    const { updateTraining } = useTrainings()
    const { updatePlayer, getPlayer } = usePlayers()
    const { updateCoach } = useCoaches()
    const [loading, setLoading] = useState(false)
    const [playersToRestSession, setPlayersToRestSession] = useState([])

    useEffect(() => {
        (async () => {
            const players = await Promise.all(training.players.map(async (id) => {
                const player = await getPlayer(id);
                return player;
            }));
            const playersWithSess = players.filter((player) => !player.active && player.pay.trainsPayed > 0)
            setPlayersToRestSession(playersWithSess)
        })()
    }, [training.players]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        training.active = false;
        try {
            playersToRestSession?.map(async (player) => {
                player.pay.trainsPayed = player.pay.trainsPayed - 1
                await updatePlayer(player._id, player)
            })
            await updateTraining(_id, training)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                loading
                    ? <Loader />
                    : <button className='close-training-form-button' onClick={handleSubmit}>Cerrar entrenamiento</button>
            }
        </>
    )
}

export default CloseTraining