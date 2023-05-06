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
    const todayDate = new Date()

    useEffect(() => {
        const differenceInTime = todayDate.getTime() - birthPlayer.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        setAge(Math.floor(differenceInDays / 365))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [birthPlayer])

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
                    <Image src={player?.image.url} alt='img-jug' className='player-image' />
                    <span className={
                        `player-status ${player?.active ? 'active' : 'unactive'}`
                    }>
                    </span>
                </div>
                <h2>{player?.name}</h2>
                <li className='profile-data-item'>
                    <label>Club:</label>
                    <p>{player?.club}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Edad:</label>
                    <p>{age}</p>
                </li>
                <li className='profile-data-item'>
                    <label>DNI:</label>
                    <p>{player?.dni}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Alta:</label>
                    <p>{player?.createdAt?.day}/{player?.createdAt?.month}/{player?.createdAt?.year}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Teléfono: </label>
                    <p>{player?.phone}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Posiciones:</label>
                    <ul>
                        {
                            player?.role.map((role) => (
                                <li className='roles-in-profile' key={role}>- {role}</li>
                            ))
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
                    <label>Pago cuota:</label>
                    <p>
                        {
                            player?.pay.monthsPayed[0] && player?.active
                                ? <span className="ok-icon"></span>
                                : player?.pay.monthsPayed[0] && !player?.active
                                    ? <span className="red-cross-icon"></span>
                                    : '-'
                        }
                    </p>
                    {
                        player?.pay.monthsPayed[0]
                            ? <>
                                <label>Mes/es pagos:</label>
                                <ul className='months-payed-list'>
                                    {
                                        player?.pay.monthsPayed.map((month) => (
                                            <li key={month.value} className='months-payed-listed'>{month.label}</li>
                                        ))
                                    }
                                </ul>
                            </>
                            : ''
                    }
                </li>
                <li className='profile-data-item'>
                    <label>Pago por sesión:</label>
                    <p>
                        {
                            player?.pay.trainsPayed > 0
                                ? <span className="ok-icon"></span>
                                : '-'
                        }
                    </p>
                    {
                        player?.pay.trainsPayed > 0
                            ? <>
                                <label>Cantidad:</label>
                                <p>{player?.pay.trainsPayed}</p>
                            </>
                            : ''
                    }
                </li>
                <li className='profile-data-item'>
                    <label>Asistencias:</label>
                    {
                        player?.assistances > -1 && passedTrainings[0]
                            ? <>
                                <p>{player.assistances} / {passedTrainings.length}</p>
                                <p style={{color: 'var(--orange)'}}>% {Number((player.assistances / passedTrainings.length) * 100).toFixed(1)}</p>
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
