import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayers } from '../../context/PlayersContext'
import Image from '../Image/Image'
import Loader from '../Loader/Loader'
import './Profile.css'
import { useTrainings } from '../../context/TrainingsContext'

const PlayersProfile = ({ player }) => {
    const { eliminatePlayer } = usePlayers()
    const { passedTrainings } = useTrainings()
    const [loadingDelete, setLoadingDelete] = useState(false)
    const navigation = useNavigate()
    const birthPlayer = player?.birth instanceof Date ? player?.birth : new Date(player?.birth)
    const [age, setAge] = useState('')
    const [elimModal, setElimModal] = useState(false)
    const [lastTrain, setLastTrain] = useState({})
    const todayDate = new Date()

    useEffect(() => {
        const differenceInTime = todayDate.getTime() - birthPlayer.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        setAge(Math.floor(differenceInDays / 365))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [birthPlayer])

    const handleLastTraining = (id) => {
        let last = passedTrainings.find(train => train._id === id)
        setLastTrain(last)
    }

    useEffect(() => {
        if (player.pay.trainsPayed[0]) {
            handleLastTraining(player.pay.trainsPayed[player.pay.trainsPayed.length - 1].tr_id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.pay.trainsPayed])

    const deletePlayer = async (id) => {
        try {
            setLoadingDelete(true)
            await eliminatePlayer(id)
            setLoadingDelete(false)
            navigation('/jugador/listado')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='player-card'>
            <ul className='profile-data-list'>
                <div className='player-image-container'>
                    <Image src={
                        player.image && player.image.url
                            ? player.image.url
                            : 'https://res.cloudinary.com/dlah9v2do/image/upload/v1684277158/userimage_wmdcqv.png'
                    } alt='img-jug' className='player-image' />
                </div>
                <h2>{player?.name}</h2>
                <li className='profile-data-item'>
                    <label>Club:</label>
                    <p>{
                        player.club
                            ? player.club
                            : ''
                    }</p>
                </li>
                <li className='profile-data-item'>
                    <label>Edad:</label>
                    <p>{age ? age : ''}</p>
                </li>
                <li className='profile-data-item'>
                    <label>DNI:</label>
                    <p>{player.dni ? player.dni : ''}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Alta:</label>
                    <p>{player?.createdAt?.day}/{player?.createdAt?.month}/{player?.createdAt?.year}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Teléfono: </label>
                    <p>{player.phone ? player.phone : ''}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Posiciones:</label>
                    <ul>
                        {
                            player.role[0]
                                ? player?.role.map((role) => (
                                    <li className='roles-in-profile' key={role}>- {role}</li>
                                ))
                                : ''
                        }
                    </ul>
                </li>
                <li className='profile-data-item ensurance'>
                    {
                        !player?.ensurance.secured
                            ? <label>Pago del seguro: {player?.ensurance.paysec ? <span className="ok-icon"></span>
                                : <span className="red-cross-icon"></span>
                            }</label>
                            : ''
                    }
                    <label>Seguro activo: {player?.ensurance.secured ? <span className="ok-icon"></span>
                        : <span className="red-cross-icon"></span>
                    }</label>
                    {
                        player?.ensurance.paysec && player?.ensurance.secured
                            ? <label>Hasta:
                                <p>{player?.ensurance.until.month} de {player?.ensurance.until.year}</p>
                            </label>
                            : ''
                    }
                </li>
                <li className='profile-data-item'>
                    <label>Último entrenamiento:</label>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        {
                            lastTrain && lastTrain.date
                                ? <p style={{ fontSize: '13px' }}>{lastTrain.date.day}</p>
                                : ''
                        }
                    </span>
                </li>
                <li className='profile-data-item'>
                    <label>Asistencias:</label>
                    {
                        player?.pay?.trainsPayed[0] && passedTrainings[0]
                            ? <>
                                <p>{player.pay.trainsPayed.length} / {passedTrainings.length}</p>
                            </>
                            : ''
                    }
                </li>
                <button className='button-eliminate-player' onClick={() => setElimModal(!elimModal)}>Eliminar jugador</button>
                {
                    elimModal
                        ? <div className='modal-eliminate'>
                            <div className='elim-confirmation'>
                                <h3>Estás seguro de querer eliminar a {player?.name}?</h3>
                                {
                                    loadingDelete
                                        ? <Loader />
                                        : <div>
                                            <button className='button-eliminate-confirm' onClick={() => deletePlayer(player?._id)}>Eliminar</button>
                                            <button className='button-eliminate-cancel' onClick={() => setElimModal(!elimModal)}>Cancelar</button>
                                        </div>
                                }
                            </div>
                        </div>
                        : ''
                }
            </ul>
        </div>
    )
}

export default PlayersProfile
