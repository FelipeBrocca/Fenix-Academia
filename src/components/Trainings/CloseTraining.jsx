import React, { useEffect, useState } from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import { usePlayers } from '../../context/PlayersContext'
import { useCoaches } from '../../context/CoachesContext'
import Loader from '../Loader/Loader'

const CloseTraining = ({ training, _id }) => {

    const { updateTraining } = useTrainings()
    const { updatePlayer, getPlayer } = usePlayers()
    const { updateCoach, getCoach, getCoaches } = useCoaches()
    const [loading, setLoading] = useState(false)
    const [playersToRestSession, setPlayersToRestSession] = useState([])
    const [coachesToPay, setCoachesToPay] = useState([]);

    useEffect(() => {
        (async () => {
            const players = await Promise.all(training.players.map(async (id) => {
                const player = await getPlayer(id);
                return player;
            }));
            const playersWithSess = players.filter((player) => !player.active && player.pay.trainsPayed > 0)
            setPlayersToRestSession(playersWithSess)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [training.players]);

    const sinceDate = new Date(`${training.date.day} ${training.date.since}`)
    const untilDate = new Date(`${training.date.day} ${training.date.until}`)
    const diffInMs = untilDate - sinceDate;
    const diffHs = Number((diffInMs / (1000 * 60 * 60)).toFixed(1))


    useEffect(() => {
        (async () => {
            const updatedCoachesToPay = [];
            for (const coach of training.coaches) {
                const coachDebt = await getCoach(coach.value);
                coachDebt.pay.dateDebt.push({
                    date: training.date.day,
                    hours: diffHs,
                    money: 10 * diffHs,
                });
                coachDebt.pay.totalDebt.hours = coachDebt.pay.totalDebt.hours + diffHs
                coachDebt.pay.totalDebt.money = coachDebt.pay.totalDebt.money + (10 * diffHs)
                updatedCoachesToPay.push(coachDebt);
            }
            setCoachesToPay(updatedCoachesToPay);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [training.coaches, training.date.day, diffHs]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        training.active = false;
        try {
            playersToRestSession?.map(async (player) => {
                player.pay.trainsPayed = player.pay.trainsPayed - 1
                await updatePlayer(player._id, player)
            })
            await Promise.all(coachesToPay.map(async (coach) => {
                await updateCoach(coach._id, coach)
            }));            
            await updateTraining(_id, training)
            await getCoaches()
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