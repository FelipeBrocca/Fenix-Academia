import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayers } from '../../context/PlayersContext'
import Image from '../Image/Image'
import './Profile.css'

const PlayersProfile = ({player}) => {
    const { eliminatePlayer } = usePlayers()
    const [loadingDelete, setLoadingDelete] = useState(false)
    const navigation = useNavigate()


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
            <div className='player-image-container'>
                {
                    player.image
                        ? <Image src={player.image.url} alt='img-jug' className='player-image' />
                        : <Image src='https://res.cloudinary.com/dlah9v2do/image/upload/v1680549252/FotosPerfil/opkjqvstjmumhgz2azvw.png' className='player-image' />
                }
            </div>
            <p>{player.name}</p>
            <p>{player.club}</p>
            <p>{player.dni}</p>
            <p>{player.active ? 'Activo' : ''}</p>
            <p>{player?.createdAt?.day}/{player?.createdAt?.month}/{player?.createdAt?.year}</p>
            <p>{player.ensurance ? 'Asegurado' : ''}</p>
            <p>{player.pay ? 'Pago' : ''}</p>
            <p>{player.phone}</p>
            {
                player.role.map((role) => (
                    <p key={role}>{role}</p>
                ))
            }
            <p>{player.role2 ? player.role2 : ''}</p>
            <p>{player.birth}</p>
            <button onClick={() => deletePlayer(player._id)}>{loadingDelete ? 'Cargando' : 'Eliminar'}</button>
        </div>
    )
}

export default PlayersProfile