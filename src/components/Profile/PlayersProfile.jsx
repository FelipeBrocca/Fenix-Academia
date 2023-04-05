import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayers } from '../../context/PlayersContext'
import Image from '../Image/Image'
import './Profile.css'

const PlayersProfile = ({ player }) => {
    const { eliminatePlayer } = usePlayers()
    const [loadingDelete, setLoadingDelete] = useState(false)
    const navigation = useNavigate()
    const birthPlayer = player.birth instanceof Date ? player.birth : new Date(player.birth)
    const [age, setAge] = useState('')


    useEffect(() => {
        const today = new Date();
        const differenceInTime = today.getTime() - birthPlayer.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        setAge(Math.floor(differenceInDays / 365))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [player.birth])

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
                    <Image src={player.image.url} alt='img-jug' className='player-image' />
                    <p>{player.active ? 'Activo' : ''}</p>
                </div>
                <h2>{player.name}</h2>
                <li className='profile-data-item'>
                    <label>Club:</label>
                    <p>{player.club}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Edad:</label>
                    <p>{age}</p>
                </li>
                <li className='profile-data-item'>
                    <label>DNI:</label>
                    <p>{player.dni}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Alta:</label>
                    <p>{player?.createdAt?.day}/{player?.createdAt?.month}/{player?.createdAt?.year}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Teléfono: </label>
                    <p>{player.phone}</p>
                </li>
                <li className='profile-data-item'>
                    <label>Posiciones:</label>
                    <ul>
                        {
                            player.role.map((role) => (
                                <li className='roles-in-profile' key={role}>- {role}</li>
                            ))
                        }
                    </ul>
                </li>
                <li className='profile-data-item ensurance'>
                    <label>Pago del seguro: {player.ensurance.paysec ? <span className="ok-icon"></span>
                        : <span className="red-cross-icon"></span>
                    }</label>
                    <label>Seguro activo: {player.ensurance.secured ? <span className="ok-icon"></span>
                        : <span className="red-cross-icon"></span>
                    }</label>
                    {
                        player.ensurance.paysec && player.ensurance.secured
                            ? <label>Hasta:
                                <p>{player.ensurance.until.month} de {player.ensurance.until.year}</p>
                            </label>
                            : ''
                    }
                </li>
                <li className='profile-data-item'>
                    <label>Pago hasta: {player.pay ? 'Pago' : ''}</label>
                </li>
            </ul>
            <button onClick={() => deletePlayer(player._id)}>{loadingDelete ? 'Cargando' : 'Eliminar'}</button>
        </div>
    )
}

export default PlayersProfile