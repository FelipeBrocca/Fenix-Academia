import React, { useEffect, useState } from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import Loader from '../Loader/Loader'
import EditModalTr from './EditModalTr'

const TrainingItem = ({ training }) => {

    const { deleteTraining } = useTrainings()
    const [loading, setLoading] = useState(false)
    const [elimModal, setElimModal] = useState(false)
    const [seeTraining, setSeeTraining] = useState(false)
    const [dayFormatted, setDayFormatted] = useState('')

    const todayDate = new Date()
    const sinceDate = new Date(`${training.date.day} ${training.date.since}`)
    const untilDate = new Date(`${training.date.day} ${training.date.until}`)
    const diffInMs = untilDate - sinceDate;
    const diffHs = diffInMs / (1000 * 60 * 60)

    useEffect(() => {
        const date = training.date.day;
        const newDate = new Date(date)
        const formatDate = `${newDate.getUTCDate()}/${newDate.getUTCMonth() + 1}/${newDate.getUTCFullYear()}`;
        setDayFormatted(formatDate)
    }, [training.date.day])

    const handleSeeTraining = () => {
        setSeeTraining(seeTraining => !seeTraining)
    }
    const handleDelete = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await deleteTraining(training._id)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    return (
        <>
            <li className='training-list-item'>
                <div className='item-contain-data'>
                    <p>{dayFormatted}</p>
                    <p>{training.date.since} hs.</p>
                    <p>- {training.date.until} hs.</p>
                </div>
                <button className='watch-training-item' onClick={() => handleSeeTraining()}>Ver</button>
            </li>

            <div className={`detail-training-item ${seeTraining ? 'active' : ''}`}>
                <pre>
                    {training.techniques}
                </pre>
                <div className='buttons-item-training-container'>
                    <button className='button-eliminate-training' onClick={() => setElimModal(!elimModal)}>Eliminar</button>
                    <EditModalTr training={training} id={training._id} />
                </div>
                {
                    elimModal
                        ? <div className='modal-eliminate'>
                            <div className='elim-confirmation'>
                                <h3>Eliminar este entrenamiento? {dayFormatted}</h3>
                                {
                                    loading
                                        ? <Loader />
                                        : <div>
                                            <button className='button-eliminate-cancel' onClick={() => setElimModal(!elimModal)}>Cancelar</button>
                                            <button className='button-eliminate-confirm' onClick={handleDelete}>Eliminar</button>
                                        </div>
                                }
                            </div>
                        </div>
                        : ''
                }
            </div>
        </>
    )
}

export default TrainingItem