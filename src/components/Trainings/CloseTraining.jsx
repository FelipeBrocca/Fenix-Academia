import React, { useEffect, useState } from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import { usePlayers } from '../../context/PlayersContext'
import { useCoaches } from '../../context/CoachesContext'
import Loader from '../Loader/Loader'
import { useFinances } from '../../context/FinancesContext'


const CloseTraining = ({ training, _id }) => {

    const { finances, updateFinance } = useFinances()
    const { updateTraining } = useTrainings()
    const { getPlayer } = usePlayers()
    const { updateCoach, coaches, getCoaches } = useCoaches()
    const [loading, setLoading] = useState(false)
    const [coachesToPay, setCoachesToPay] = useState([]);
    const [playersAssis, setPlayersAssis] = useState([])
    const [todayFinance, setTodayFinance] = useState({})


    useEffect(() => {
        let todayMonth = new Date(training.date.day).getMonth()
        let todayYear = new Date(training.date.day).getFullYear()
        let findFin = finances.find(fin => fin.month.value === todayMonth && fin.month.year === todayYear)
        setTodayFinance(findFin);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [training.date.day])


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


    useEffect(() => {
        (async () => {
            const updatedCoachesToPay = [];
            for (const coach of training.coaches) {
                const coachDebt = coaches.find(coa => coa.name == coach.label);
                if (coachDebt && !coachDebt.pay.trainingsMang.find(t => t.tr_id === training._id)) {
                    coachDebt.pay.trainingsMang.push({
                        tr_id: training._id,
                        statusPay: false
                    });
                }
                updatedCoachesToPay.push(coachDebt);
            }
            setCoachesToPay(updatedCoachesToPay);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [training.coaches]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        training.active = false;
        todayFinance.billing.others = todayFinance.billing.others + training.field.cost
        todayFinance.pays.playersXSession = todayFinance.pays.playersXSession + training.players.totalPay
        try {
            await Promise.all(coachesToPay.map(async (coach) => {
                await updateCoach(coach._id, coach)
            }));
            await updateFinance(todayFinance._id, todayFinance)
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