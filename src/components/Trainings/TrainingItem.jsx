import React, { useEffect, useState } from 'react'
import { useTrainings } from '../../context/TrainingsContext'
import Loader from '../Loader/Loader'
import EditModalTr from './EditModalTr'
import { usePlayers } from '../../context/PlayersContext'
import AssitancePastTrainings from './AssitancePastTrainings'

const TrainingItem = ({ training, active }) => {

    const { deleteTraining, getTrainings } = useTrainings()
    const { getPlayer, players } = usePlayers()
    // const [loading, setLoading] = useState(false)
    // const [elimModal, setElimModal] = useState(false)
    const [seeTraining, setSeeTraining] = useState(false)
    const [dayFormatted, setDayFormatted] = useState('')
    const [seeAssis, setSeeAssis] = useState(false)
    const [playersAssisted, setPlayersAssisted] = useState([])


    useEffect(() => {
        const date = training.date.day;
        const newDate = new Date(date)
        const formatDate = `${newDate.getUTCDate()}/${newDate.getUTCMonth() + 1}/${newDate.getUTCFullYear()}`;
        setDayFormatted(formatDate)
    }, [training.date.day])

    useEffect(() => {
        if (seeAssis) {
            (async () => {
                await training.players.assist.map(async (id) => {
                    const playersA = players.find(pid => id === pid)
                    console.log(playersA);
                    if (playersA) {
                        setPlayersAssisted(players => [...players, playersA.name])
                    } else {
                        setPlayersAssisted(players => [...players, 'Jugador eliminado'])
                    }
                })
            })()
        } else {
            setPlayersAssisted([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seeAssis])

    const handleSeeTraining = () => {
        setSeeTraining(seeTraining => !seeTraining)
    }

    const handleSeeAssis = () => {
        setSeeAssis(seeAssis => !seeAssis)
    }

    // const handleDelete = async (e) => {
    //     e.preventDefault()
    //     setLoading(true)
    //     try {
    //         await deleteTraining(training._id)
    //         await getTrainings()
    //         setLoading(false)
    //         setElimModal(false)
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false)
    //     }
    // }

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
                <div className='training-contain-in-list'>
                    {
                        active
                            ? ''
                            : <div className='assist-container-training-item-list'>
                                <p>Asistencias: {training.players.assist.length}</p>
                                <p onClick={handleSeeAssis} className='assis-item-passed'>Ver asistencias</p>
                            </div>
                    }
                    <ul className='list-coaches-designated'>
                        <h4>ENTRENADORES</h4>
                        {training.coaches.map(({ value, label }) => (
                            <li key={value}>{label}</li>
                        ))}
                    </ul>
                    <pre>
                        <h4>TÉCNICAS A ENTRENAR</h4>
                        {training.techniques}
                    </pre>
                </div>
                <div className='buttons-item-training-container'>
                    {/* <button className='button-eliminate-training' onClick={() => setElimModal(!elimModal)}>Eliminar</button> */}
                    <EditModalTr training={training} id={training._id} />
                </div>
                {/* {
                    elimModal
                        ? <>
                            <div className='backdropPopUp' onClick={() => setElimModal(!elimModal)}></div>
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
                        </>
                        : ''
                } */}
            </div>
            {
                seeAssis
                    ? <>
                        <div className='backdropPopUp' onClick={handleSeeAssis}></div>
                        <AssitancePastTrainings players={playersAssisted} handleClose={setSeeAssis} />
                    </>
                    : ''
            }
        </>
    )
}

export default TrainingItem