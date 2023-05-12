import React, { useEffect, useState } from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import { usePlayers } from '../../context/PlayersContext'
import { useCoaches } from '../../context/CoachesContext'
import Loader from '../Loader/Loader'
import { useMoney } from '../../context/MoneyContext'

const CloseTraining = ({ training, _id }) => {

    const { money } = useMoney()
    const { updateTraining } = useTrainings()
    const { updatePlayer, getPlayer } = usePlayers()
    const { updateCoach, getCoach, getCoaches } = useCoaches()
    const [loading, setLoading] = useState(false)
    const [coachesToPay, setCoachesToPay] = useState([]);
    const [playersAssis, setPlayersAssis] = useState([])

    useEffect(() => {
        (async () => {
            if (training.players.assist) {
                const players = await Promise.all(training.players.assist.map(async (id) => {
                    const player = await getPlayer(id);
                    return player;
                }));
                setPlayersAssis(players)
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [training.players.assist]);


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
                    money: money.money.coachesSalary * diffHs,
                });
                coachDebt.pay.totalDebt.hours = coachDebt.pay.totalDebt.hours + diffHs
                coachDebt.pay.totalDebt.money = coachDebt.pay.totalDebt.money + (money.money.coachesSalary * diffHs)
                updatedCoachesToPay.push(coachDebt);
            }
            setCoachesToPay(updatedCoachesToPay);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [training.coaches, training.date.day, diffHs]);


    const handleGiveAssistance = async () => {
        if (playersAssis[0]) {
            playersAssis.map(async (player) => {
                player.assistances = player.assistances + 1
                await updatePlayer(player._id, player)
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        training.active = false;
        try {
            await handleGiveAssistance()
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